// Central content config — edit placeholder business details here.
// (social handles are placeholders until real profiles are supplied)

import rudraniWideView2 from '../assets/portfolio/rudrani-wide-view-2.jpg'
import rudraniLounge from '../assets/portfolio/rudrani-lounge.jpg'
import rudraniSignage from '../assets/portfolio/rudrani-signage.jpg'
import rudraniDisplayCabinet from '../assets/portfolio/rudrani-display-cabinet.jpg'
import rudraniHeritageConsole from '../assets/portfolio/rudrani-heritage-console.jpg'
import rudraniWideView1 from '../assets/portfolio/rudrani-wide-view-1.jpg'
import residenceMarbleTvWall from '../assets/portfolio/residence-marble-tv-wall.jpg'
import residenceRibbedTvUnit from '../assets/portfolio/residence-ribbed-tv-unit.jpg'
import residenceCrockeryBarUnit from '../assets/portfolio/residence-crockery-bar-unit.jpg'
import residenceModularKitchenWhite from '../assets/portfolio/residence-modular-kitchen-white.jpg'
import residenceOpenKitchenCounter from '../assets/portfolio/residence-open-kitchen-counter.jpg'
import residencePoojaUnit from '../assets/portfolio/residence-pooja-unit.jpg'
import residenceWoodenPartition from '../assets/portfolio/residence-wooden-partition.jpg'
import residencePastelKitchen from '../assets/portfolio/residence-pastel-kitchen.jpg'
import residenceFoyerPartition from '../assets/portfolio/residence-foyer-partition.jpg'
import residenceSlidingWardrobe from '../assets/portfolio/residence-sliding-wardrobe.jpg'
import residenceGeometricWardrobe from '../assets/portfolio/residence-geometric-wardrobe.jpg'
import residenceBedroomTvWall from '../assets/portfolio/residence-bedroom-tv-wall.jpg'

const MAPS_QUERY = '3-20-44, Opposite Hallmark, Puppalaguda, Narsingi Road, Hyderabad 500089'

export const BRAND = {
  name: 'VELQORASPACES',
  tagline: 'Interiors Designing Studio',
  shortName: 'VS',
  phoneDisplay: '+91 99899 95865',
  phoneRaw: '919989995865',
  email: 'interiors@velqoraspaces.com',
  address: '#3-20-44, Opposite Hallmark, Puppalaguda, Narsingi Road, Hyderabad, Telangana 500089',
  // Map links search the address text; swap in exact studio coordinates once pinned on Google Maps.
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`,
  mapsEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&z=16&hl=en&output=embed`,
}

export const SOCIALS = [
  { name: 'Instagram', href: 'https://www.instagram.com/velqoraspaces/', icon: 'instagram' },
  { name: 'Pinterest', href: 'https://in.pinterest.com/velqoraspaces/', icon: 'pinterest' },
  { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61592090964552', icon: 'facebook' },
  { name: 'YouTube', href: 'https://youtube.com/@velqoraspaces', icon: 'youtube' },
  { name: 'WhatsApp', href: 'https://wa.me/919989995865', icon: 'whatsapp' },
] as const

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Blog', to: '/blog' },
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
    title: 'Residential Interiors',
    desc: 'End-to-end home interiors — from first sketch to final handover — designed around how your family actually lives.',
    icon: 'residential',
  },
  {
    title: 'Modular Kitchens',
    desc: 'Precision-engineered kitchens blending functionality with quiet luxury.',
    icon: 'kitchen',
  },
  {
    title: 'Carpentry Works',
    desc: 'Custom wardrobes, cabinetry and joinery, crafted in-house to a flawless, factory-finish standard.',
    icon: 'carpentry',
  },
  {
    title: 'Home Theaters',
    desc: 'Immersive home cinema rooms engineered for acoustics, ambient lighting and effortless comfort.',
    icon: 'theater',
  },
  {
    title: 'Commercial Interiors',
    desc: 'Workplace and retail interiors that reflect your brand and work as hard as you do.',
    icon: 'commercial',
  },
  {
    title: 'Office / Showrooms',
    desc: 'Functional, elegant offices and showrooms designed to impress clients and boost productivity.',
    icon: 'showroom',
  },
  {
    title: 'Cafes / Restaurants',
    desc: 'Hospitality interiors balancing ambience, flow and durability — built to handle the daily rush.',
    icon: 'cafe',
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
  { label: 'Projects Delivered', value: 200, suffix: '+' },
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
  { id: 7, title: 'Marble TV Wall Panel', category: 'Living Room', city: 'Hyderabad', img: residenceMarbleTvWall },
  { id: 8, title: 'Ribbed Wood TV Unit', category: 'Living Room', city: 'Hyderabad', img: residenceRibbedTvUnit },
  { id: 9, title: 'Crockery & Bar Unit', category: 'Dining', city: 'Hyderabad', img: residenceCrockeryBarUnit },
  { id: 10, title: 'Modular Kitchen', category: 'Kitchen', city: 'Hyderabad', img: residenceModularKitchenWhite },
  { id: 11, title: 'Open Kitchen Counter', category: 'Kitchen', city: 'Hyderabad', img: residenceOpenKitchenCounter },
  { id: 12, title: 'Pooja Unit', category: 'Decor Detail', city: 'Hyderabad', img: residencePoojaUnit },
  { id: 13, title: 'Wooden Partition Display', category: 'Living Room', city: 'Hyderabad', img: residenceWoodenPartition },
  { id: 14, title: 'Pastel Kitchen Cabinets', category: 'Kitchen', city: 'Hyderabad', img: residencePastelKitchen },
  { id: 15, title: 'Foyer Partition', category: 'Entrance', city: 'Hyderabad', img: residenceFoyerPartition },
  { id: 16, title: 'Sliding Wardrobe', category: 'Bedroom', city: 'Hyderabad', img: residenceSlidingWardrobe },
  { id: 17, title: 'Geometric Wardrobe', category: 'Bedroom', city: 'Hyderabad', img: residenceGeometricWardrobe },
  { id: 18, title: 'Bedroom TV Wall', category: 'Bedroom', city: 'Hyderabad', img: residenceBedroomTvWall },
]
