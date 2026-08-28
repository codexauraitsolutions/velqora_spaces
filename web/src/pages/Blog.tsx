import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Calendar, Clock } from 'lucide-react'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import { usePopup } from '../context/PopupContext'
import { BLOG_POSTS } from '../data/blog'

const CATEGORIES = ['All', ...Array.from(new Set(BLOG_POSTS.map((p) => p.category)))]

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function Blog() {
  const { openPopup } = usePopup()
  const [filter, setFilter] = useState('All')

  const filtered = useMemo(
    () => (filter === 'All' ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === filter)),
    [filter],
  )

  return (
    <div className="bg-obsidian-900 pt-32">
      <Seo
        title="Journal"
        description="Design guides and studio notes from VELQORASPACES — kitchens, home theaters, carpentry, commercial fit-outs and residential planning advice."
        path="/blog"
      />
      <section className="mx-auto max-w-4xl px-6 text-center sm:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-gold-400/70">Journal</p>
          <h1 className="mt-5 font-display text-5xl leading-tight text-ivory sm:text-6xl">
            Notes on <span className="text-gold-foil italic">design.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-ivory/55">
            Guides, studio lessons and honest advice on planning interiors — for homes and for
            businesses.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-6 sm:px-8">
        <Reveal className="flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full border px-5 py-2 text-xs uppercase tracking-widest transition ${
                filter === cat
                  ? 'border-gold-400 bg-gold-400/15 text-gold-200'
                  : 'border-white/10 text-ivory/60 hover:border-gold-400/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 pb-28 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.06}>
              <Link to={`/blog/${post.slug}`} className="group card-glass flex h-full flex-col overflow-hidden rounded-2xl">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={post.cover}
                    alt={post.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/70 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-gold-400/30 bg-obsidian-900/80 px-3 py-1 text-[10px] uppercase tracking-widest text-gold-300">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-4 text-[11px] uppercase tracking-widest text-ivory/40">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" /> {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl leading-tight text-ivory group-hover:text-gold-200 transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ivory/50">{post.excerpt}</p>
                  <span className="mt-5 flex items-center gap-2 text-xs uppercase tracking-widest text-gold-300">
                    Read Article <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="pointer-events-none absolute inset-0 bg-radial-fade" />
        <Reveal className="relative mx-auto max-w-3xl px-6 text-center sm:px-8">
          <h2 className="font-display text-4xl text-ivory sm:text-5xl">Have a project in mind?</h2>
          <p className="mx-auto mt-4 max-w-md text-ivory/55">
            Turn the ideas into a real space. A free consultation is the fastest way to start.
          </p>
          <button
            onClick={openPopup}
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-gold-gradient px-8 py-4 text-sm font-semibold uppercase tracking-widest text-obsidian-900 transition hover:shadow-gold"
          >
            Book a Free Consultation
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </button>
        </Reveal>
      </section>
    </div>
  )
}
