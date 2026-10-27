import Seo from '../components/Seo'
import Testimonials from '../components/Testimonials'

export default function TestimonialsPage() {
  return (
    <div className="bg-obsidian-900">
      <Seo
        title="Client Testimonials"
        description="Reviews and photos from VELQORASPACES clients — homes and commercial spaces designed by our interiors studio in Hyderabad."
        path="/testimonials"
      />
      <Testimonials page />
    </div>
  )
}
