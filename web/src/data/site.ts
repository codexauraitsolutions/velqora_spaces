// Central content config — edit placeholder business details here.
// (social handles are placeholders until real profiles are supplied)

import rudraniWideView2 from '../assets/portfolio/rudrani-wide-view-2.jpg'
import rudraniLounge from '../assets/portfolio/rudrani-lounge.jpg'
import rudraniSignage from '../assets/portfolio/rudrani-signage.jpg'
import rudraniDisplayCabinet from '../assets/portfolio/rudrani-display-cabinet.jpg'
import rudraniHeritageConsole from '../assets/portfolio/rudrani-heritage-console.jpg'
import rudraniWideView1 from '../assets/portfolio/rudrani-wide-view-1.jpg'

export const BRAND = {
  name: 'VELQORASPACES',
  tagline: 'Interiors Designing Studio',
  shortName: 'VS',
  phoneDisplay: '+91 99899 95865',
  phoneRaw: '919989995865',
  email: 'interiors@velqoraspaces.com',
  address: '1-37, Mirzaguda, Janwada Main Road, Rangareddy, Telangana 500075',
  mapsUrl: 'https://www.google.com/maps?q=17.4075929,78.2630545&z=17&hl=en',
  mapsEmbedUrl: 'https://maps.google.com/maps?q=17.4075929,78.2630545&z=16&hl=en&output=embed',
  lat: 17.4075929,
  lng: 78.2630545,
}

export const SOCIALS = [
  { name: 'Instagram', href: 'https://instagram.com/velqoraspaces', icon: 'instagram' },
  { name: 'Pinterest', href: 'https://pinterest.com/velqoraspaces', icon: 'pinterest' },
  { name: 'Facebook', href: 'https://facebook.com/velqoraspaces', icon: 'facebook' },
  { name: 'YouTube', href: 'https://youtube.com/@velqoraspaces', icon: 'youtube' },
  { name: 'WhatsApp', href: 'https://wa.me/919989995865', icon: 'whatsapp' },
] as const

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Process', to: '/#process' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export const PROPERTY_TYPES = ['1 BHK', '2 BHK', '3 BHK', '4+ BHK / Duplex', 'Villa', 'Commercial']

export const CITIES = [
  'Hyderabad',
  'Bengaluru',
  'Chennai',
  'Mumbai',
  'Pune',
  'Vizag',
  'Ahmedabad',
  'Gurugram',
]

export const SERVICES = [
  {
    title: 'Living & Dining',
    desc: 'Statement living rooms and dining spaces designed around how you actually gather.',
    icon: 'sofa',
  },
  {
    title: 'Modular Kitchens',
    desc: 'Precision-engineered kitchens blending functionality with quiet luxury.',
    icon: 'kitchen',
  },
  {
    title: 'Master Bedrooms',
    desc: 'Serene, sculpted retreats built for rest — from wardrobes to lighting scenes.',
    icon: 'bed',
  },
  {
    title: "Kids' & Study Rooms",
    desc: 'Playful yet purposeful spaces that grow with your family.',
    icon: 'study',
  },
  {
    title: 'Home Office',
    desc: 'Focused, elegant work-from-home environments that feel nothing like an office.',
    icon: 'office',
  },
  {
    title: 'Turnkey Execution',
    desc: 'One studio, one warranty — design, civil, electrical and decor delivered together.',
    icon: 'turnkey',
  },
]

export const PROCESS_STEPS = [
  { step: '01', title: 'Discover', desc: 'A free consultation to understand your space, lifestyle and budget.' },
  { step: '02', title: 'Design', desc: '3D visualisation and material moodboards refined until it feels right.' },
  { step: '03', title: 'Craft', desc: 'In-house manufacturing with factory-finish precision, zero surprises.' },
  { step: '04', title: 'Install', desc: 'On-site execution managed end-to-end by a single project owner.' },
  { step: '05', title: 'Live', desc: 'Handover with a 30-year structural warranty, and support that stays.' },
]

export const STATS = [
  { label: 'Projects Delivered', value: 60, suffix: '+' },
  { label: 'Client Rating', value: 4.9, suffix: '/5' },
  { label: 'Years of Craft', value: 9, suffix: '+' },
  { label: 'Design Warranty', value: 10, suffix: ' yrs' },
]

export const TESTIMONIALS = [
  {
    name: 'Ananya Rao',
    city: 'Hyderabad',
    quote:
      'VELQORASPACES turned a blank 3BHK shell into something that felt like us within eight weeks. The gold detailing in our living room is still the first thing guests mention.',
  },
  {
    name: 'Karthik Iyer',
    city: 'Bengaluru',
    quote:
      'What struck us was the precision — every drawer, every light scene was exactly as visualised. Zero surprises on site, which is rare in this industry.',
  },
  {
    name: 'Meera & Arjun Nair',
    city: 'Chennai',
    quote:
      'A single point of contact throughout, transparent costing, and a design language that felt genuinely bespoke rather than templated.',
  },
]

export const PORTFOLIO = [
  { id: 1, title: 'Rudrani Silks Showroom', category: 'Retail Interior', city: 'Hyderabad', img: rudraniWideView2 },
  { id: 2, title: 'The Lotus Lounge', category: 'Seating & Display', city: 'Hyderabad', img: rudraniLounge },
  { id: 3, title: 'Brand Signage Wall', category: 'Brand Wall', city: 'Hyderabad', img: rudraniSignage },
  { id: 4, title: 'Gilded Display Cabinet', category: 'Display Furniture', city: 'Hyderabad', img: rudraniDisplayCabinet },
  { id: 5, title: 'Heritage Prayer Console', category: 'Decor Detail', city: 'Hyderabad', img: rudraniHeritageConsole },
  { id: 6, title: 'Showroom Floor', category: 'Retail Interior', city: 'Hyderabad', img: rudraniWideView1 },
]
