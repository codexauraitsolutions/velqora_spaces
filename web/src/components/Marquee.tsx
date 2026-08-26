export default function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items]
  return (
    <div className="relative overflow-hidden border-y border-gold-400/10 bg-obsidian-900 py-4">
      <div className="flex w-max animate-marquee gap-10">
        {loop.map((item, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-2xl italic text-ivory/20">
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400/50" />
          </span>
        ))}
      </div>
    </div>
  )
}
