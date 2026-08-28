import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Clock, User } from 'lucide-react'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import { usePopup } from '../context/PopupContext'
import { BLOG_POSTS, getBlogPost } from '../data/blog'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogPost() {
  const { openPopup } = usePopup()
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getBlogPost(slug) : undefined

  if (!post) return <Navigate to="/blog" replace />

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category === post.category)
    .concat(BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category !== post.category))
    .slice(0, 3)

  return (
    <div className="bg-obsidian-900 pt-32">
      <Seo title={post.title} description={post.excerpt} path={`/blog/${post.slug}`} />

      <article className="mx-auto max-w-3xl px-6 sm:px-8">
        <Reveal>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold-300 hover:gap-3 transition-all"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Journal
          </Link>

          <p className="mt-6 text-xs uppercase tracking-[0.4em] text-gold-400/70">{post.category}</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-ivory sm:text-5xl">{post.title}</h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs uppercase tracking-widest text-ivory/40">
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" /> {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {post.readTime}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 aspect-[16/9] overflow-hidden rounded-2xl">
            <img src={post.cover} alt={post.title} className="h-full w-full object-cover" />
          </div>
        </Reveal>

        <div className="mt-12 space-y-10 pb-24">
          {post.sections.map((section, i) => (
            <Reveal key={section.heading} delay={i * 0.05}>
              <h2 className="font-display text-2xl text-ivory sm:text-3xl">{section.heading}</h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((para, j) => (
                  <p key={j} className="text-[15px] leading-relaxed text-ivory/60">
                    {para}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </article>

      <section className="relative overflow-hidden py-20">
        <div className="pointer-events-none absolute inset-0 bg-radial-fade" />
        <Reveal className="relative mx-auto max-w-2xl px-6 text-center sm:px-8">
          <h2 className="font-display text-3xl text-ivory sm:text-4xl">Ready to plan your own space?</h2>
          <p className="mx-auto mt-3 max-w-md text-ivory/55">
            Book a free consultation with a VELQORASPACES design lead.
          </p>
          <button
            onClick={openPopup}
            className="group mt-7 inline-flex items-center gap-2 rounded-full bg-gold-gradient px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-obsidian-900 transition hover:shadow-gold"
          >
            Book a Free Consultation
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </button>
        </Reveal>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-28 sm:px-8">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.4em] text-gold-400/70">Continue Reading</p>
            <h2 className="mt-4 font-display text-3xl text-ivory sm:text-4xl">More from the Journal</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <Link to={`/blog/${p.slug}`} className="group card-glass flex h-full flex-col overflow-hidden rounded-2xl">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={p.cover}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[10px] uppercase tracking-widest text-gold-400/70">{p.category}</p>
                    <h3 className="mt-2 font-display text-lg leading-tight text-ivory group-hover:text-gold-200 transition-colors">
                      {p.title}
                    </h3>
                    <span className="mt-4 flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-gold-300">
                      Read Article <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
