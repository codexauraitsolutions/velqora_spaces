// Feedback photos: shrink in the browser, then upload straight to S3 using
// short-lived forms from /api/feedback-upload-url. Shown via CloudFront.

export const MAX_PHOTOS = 5
const MAX_EDGE = 1600
const QUALITY = 0.82

// Photos are served straight from the bucket's public feedback/ folder.
// VITE_PHOTOS_CDN_URL can point at a CDN later without a code change.
const CDN_URL = ((import.meta.env.VITE_PHOTOS_CDN_URL as string | undefined) || 'https://velqora-spaces.s3.ap-south-1.amazonaws.com').replace(/\/+$/, '')

/** Public URL for a stored photo key, or '' until the CDN is configured. */
export function photoUrl(key: string) {
  return CDN_URL ? `${CDN_URL}/${key}` : ''
}

/** Resizes to at most 1600px and re-encodes as JPEG (~200–500 KB). */
export async function compressPhoto(file: File): Promise<Blob> {
  // createImageBitmap applies the phone's EXIF rotation, so photos stay upright.
  const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' }).catch(() => {
    throw new Error(`"${file.name}" isn't a supported photo. Please use JPG or PNG.`)
  })
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  bitmap.close()
  return new Promise((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('Could not process a photo.'))), 'image/jpeg', QUALITY),
  )
}

type UploadForm = { key: string; url: string; fields: Record<string, string> }

/** Uploads the photos and returns their storage keys, in order. */
export async function uploadPhotos(blobs: Blob[], onProgress?: (done: number) => void) {
  const res = await fetch('/api/feedback-upload-url', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ files: blobs.map(() => ({ type: 'image/jpeg' })) }),
  })
  const data = (await res.json().catch(() => ({}))) as { uploads?: UploadForm[]; error?: string }
  if (!res.ok || !data.uploads) throw new Error(data.error ?? 'Could not prepare the photo upload.')

  let done = 0
  return Promise.all(
    data.uploads.map(async ({ key, url, fields }, i) => {
      const form = new FormData()
      for (const [k, v] of Object.entries(fields)) form.append(k, v)
      form.append('file', blobs[i]) // S3 requires the file to be the last field
      const upload = await fetch(url, { method: 'POST', body: form })
      if (!upload.ok) throw new Error('A photo failed to upload. Please try again.')
      onProgress?.(++done)
      return key
    }),
  )
}
