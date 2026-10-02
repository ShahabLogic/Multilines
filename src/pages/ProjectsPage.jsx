import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';

const references = [
  { src: '/images/service-references/industrial-floor-reference.webp', category: 'Epoxy & PU', title: 'High-gloss industrial flooring', note: 'Reflective resin finish' },
  { src: '/images/services/warehouse-application.jpg', category: 'Epoxy & PU', title: 'Seamless warehouse floor', note: 'Industrial floor reference' },
  { src: '/images/services/gray-matte.jpg', category: 'Epoxy & PU', title: 'Decorative resin detail', note: 'Colour and sheen options' },
  { src: '/images/services/car-showroom.webp', category: 'Epoxy & PU', title: 'Commercial showroom floor', note: 'Smooth coated surface' },
  { src: '/images/services/roller-closeup.jpg', category: 'Application', title: 'Floor coating application', note: 'Illustrative application reference' },
  { src: '/images/service-references/concrete-floor-repair-reference.webp', category: 'Application', title: 'Concrete preparation', note: 'Repair and substrate preparation' },
  { src: '/images/roof-waterproofing.webp', category: 'Protection', title: 'Roof waterproofing', note: 'Continuous membrane application' },
  { src: '/images/services/metallic-1.webp', category: 'Decorative', title: 'Metallic resin finish', note: 'Custom marbled effect' },
  { src: '/images/services/garage-flake-1.jpg', category: 'Decorative', title: 'Decorative flake flooring', note: 'Broadcast finish reference' },
  { src: '/images/service-references/sports-courts.webp', category: 'Sports surfaces', title: 'Multi-court layout', note: 'Court colours and markings' },
  { src: '/images/service-references/acrylic-sports-flooring.webp', category: 'Sports surfaces', title: 'Acrylic sports court', note: 'Colour-zoned surface reference' },
  { src: '/images/service-references/epdm-running-tracks.webp', category: 'Sports surfaces', title: 'EPDM running track', note: 'Lane texture and markings' },
  { src: '/images/service-references/pu-sports-flooring.webp', category: 'Sports surfaces', title: 'Indoor sports hall', note: 'Resilient court surface' },
  { src: '/images/service-references/indoor-padel.webp', category: 'Sports surfaces', title: 'Indoor racket court', note: 'Court colour and play zones' },
  { src: '/images/service-references/play-area-flooring.webp', category: 'Sports surfaces', title: 'Play area surfacing', note: 'Colourful recreation zone' },
  { src: '/images/service-references/outdoor-volleyball.webp', category: 'Sports surfaces', title: 'Outdoor volleyball setting', note: 'Sport and surface reference' },
  { src: '/images/services/pharma-cleanroom.jpg', category: 'Epoxy & PU', title: 'Hygienic interior floor', note: 'Seamless cleanable finish' },
  { src: '/images/services/food-meat.jpg', category: 'Epoxy & PU', title: 'Process-area floor', note: 'Commercial coating reference' }
];
const filters = ['All', 'Epoxy & PU', 'Sports surfaces', 'Application', 'Protection', 'Decorative'];

export default function ProjectsPage() {
  const [filter, setFilter] = useState('All');
  const [active, setActive] = useState(null);
  const visible = useMemo(() => filter === 'All' ? references : references.filter((item) => item.category === filter), [filter]);
  const shift = (direction) => setActive((index) => (index + direction + visible.length) % visible.length);

  return (
    <main className="inner-page projects-page">
      <section className="page-hero page-hero--projects"><div className="container page-hero__grid"><div className="page-hero__copy"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>Gallery</span></div><p className="eyebrow">SURFACE REFERENCES · MATERIAL INSPIRATION</p><h1>Look closer.<br /><em>Think beyond.</em></h1><p>Explore industrial floors, coating application and sports-surface references to help you picture materials, colours and finishes for your own site.</p><div className="page-hero__actions"><Link to="/contact" className="button button--accent">Discuss a project <FiArrowUpRight /></Link><span className="location-chip">Epoxy · Sports · Protection</span></div><p className="projects-reference-note">Images are illustrative references and are not represented as verified Multilines installations.</p></div><div className="projects-hero-mosaic"><img src="/images/services/metallic-1.webp" alt="Illustrative metallic resin surface reference" /><div><img src="/images/service-references/sports-courts.webp" alt="Illustrative outdoor sport court reference" /><img src="/images/service-references/industrial-floor-reference.webp" alt="Illustrative high-gloss industrial floor reference" /></div><span>FINISH / COLOUR / APPLICATION</span></div></div></section>

      <section className="section project-gallery-section" data-reveal><div className="container"><div className="section-heading-row"><div><div className="section-index"><span>01</span><i /> SURFACE GALLERY</div><h2>Surfaces in<br /><em>their element.</em></h2></div><p>Filter by surface family to explore application examples. Final finishes depend on the site, selected products and installation specification.</p></div><div className="gallery-filters" role="group" aria-label="Filter image references">{filters.map((item) => <button key={item} className={filter === item ? 'is-active' : ''} type="button" aria-pressed={filter === item} onClick={() => { setFilter(item); setActive(null); }}>{item}</button>)}</div><div className="project-gallery-grid">{visible.map((reference, index) => <button className={`project-tile project-tile--${index % 5}`} key={reference.src} type="button" onClick={() => setActive(index)} aria-label={`View ${reference.title}`}><img src={reference.src} alt={`${reference.title} illustrative reference`} loading="lazy" /><span className="project-tile__overlay"><small>{reference.category}</small><strong>{reference.title}</strong><i>{reference.note} <FiArrowUpRight /></i></span></button>)}</div></div></section>

      {active !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label={visible[active].title} onClick={(event) => { if (event.target === event.currentTarget) setActive(null); }}><button className="lightbox__close" type="button" onClick={() => setActive(null)} aria-label="Close image"><FiX /></button><button className="lightbox__arrow lightbox__arrow--left" type="button" onClick={() => shift(-1)} aria-label="Previous image"><FiChevronLeft /></button><figure><img src={visible[active].src} alt={`${visible[active].title} illustrative reference`} /><figcaption><small>{visible[active].category}</small><strong>{visible[active].title}</strong><span>{visible[active].note} · Illustrative reference</span></figcaption></figure><button className="lightbox__arrow lightbox__arrow--right" type="button" onClick={() => shift(1)} aria-label="Next image"><FiChevronRight /></button></div>}
    </main>
  );
}
