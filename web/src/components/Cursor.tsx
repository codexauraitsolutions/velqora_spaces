import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const ring = { x: 0, y: 0 }
    let mouseX = 0
    let mouseY = 0
    let scale = 1
    let raf = 0

    function onMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`
      }
    }

    function onOver(e: MouseEvent) {
      const target = e.target as HTMLElement
      const interactive = target.closest('a, button, input, select, [role="button"]')
      scale = interactive ? 1.8 : 1
      ringRef.current?.classList.toggle('bg-gold-400/10', !!interactive)
    }

    function loop() {
      ring.x += (mouseX - ring.x) * 0.18
      ring.y += (mouseY - ring.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${scale})`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[150] hidden mix-blend-difference lg:block">
      <div ref={dotRef} className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-gold-300" />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-8 w-8 rounded-full border border-gold-300 transition-[background-color] duration-200 ease-out"
      />
    </div>
  )
}
