// Vercel Function: hands the browser short-lived S3 upload forms for feedback
// photos. AWS keys stay here on the server and never reach the visitor.

import { randomUUID } from 'node:crypto'
import { S3Client } from '@aws-sdk/client-s3'
import { createPresignedPost } from '@aws-sdk/s3-presigned-post'

const MAX_PHOTOS = 5
const MAX_BYTES = 2 * 1024 * 1024 // photos are compressed in the browser first
const EXTENSIONS: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
}

let client: S3Client | null = null
function s3() {
  client ??= new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: (process.env.AWS_ACCESS_KEY_ID ?? '').trim(),
      secretAccessKey: (process.env.AWS_SECRET_ACCESS_KEY ?? '').trim(),
    },
  })
  return client
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}

export async function POST(request: Request) {
  const bucket = process.env.AWS_S3_BUCKET
  if (!bucket || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_REGION) {
    return json({ error: 'Photo uploads are not configured.' }, 500)
  }

  let files: { type?: unknown }[]
  try {
    const body = (await request.json()) as { files?: { type?: unknown }[] }
    files = Array.isArray(body.files) ? body.files : []
  } catch {
    return json({ error: 'Invalid request.' }, 400)
  }
  if (files.length === 0 || files.length > MAX_PHOTOS) {
    return json({ error: `Send between 1 and ${MAX_PHOTOS} photos.` }, 400)
  }
  if (!files.every((f) => typeof f.type === 'string' && f.type in EXTENSIONS)) {
    return json({ error: 'Only JPG, PNG or WebP photos are allowed.' }, 400)
  }

  const month = new Date().toISOString().slice(0, 7) // e.g. 2026-10
  try {
    const uploads = await Promise.all(
      files.map(async (f) => {
        const type = f.type as string
        const key = `feedback/${month}/${randomUUID()}.${EXTENSIONS[type]}`
        const { url, fields } = await createPresignedPost(s3(), {
          Bucket: bucket,
          Key: key,
          // S3 itself rejects anything over the size limit or of another type.
          Conditions: [
            ['content-length-range', 1, MAX_BYTES],
            ['eq', '$Content-Type', type],
          ],
          Fields: { 'Content-Type': type, 'Cache-Control': 'public, max-age=31536000, immutable' },
          Expires: 120,
        })
        return { key, url, fields }
      }),
    )
    return json({ uploads })
  } catch (err) {
    console.error('Could not create upload links', err)
    return json({ error: 'Could not prepare the upload. Please try again.' }, 500)
  }
}
