import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowDownRight, FiArrowRight, FiArrowUpRight, FiCheck, FiChevronLeft, FiChevronRight, FiImage, FiInfo, FiLayers, FiPackage, FiPlay, FiShield, FiTarget } from 'react-icons/fi';
import { useSite } from '../context/SiteContext';
import { services } from '../data/services';
import ServiceCard from '../components/ServiceCard';

const slides = [
  {
    eyebrow: 'Industrial & commercial flooring',
    lineOne: 'Floors that work',
    lineTwo: 'as hard as you do.',
    copy: 'Seamless epoxy and PU flooring, specified around traffic, cleaning and the demands of your operation.',
    image: '/images/services/warehouse-large.jpg',
    imageAlt: 'Large modern industrial space with a clean resin-coated floor',
    label: 'Jotafloor® systems · Industrial ready'
  },
  {
    eyebrow: 'Sports surfaces & tracks',
    lineOne: 'Built to move.',
    lineTwo: 'Ready for play.',
    copy: 'Acrylic, polyurethane, SBR and EPDM sports surfacing for courts, gyms, play areas and running tracks.',
    image: '/images/service-references/outdoor-basketball.webp',
    imageAlt: 'Colourful outdoor sports court with a smooth, marked playing surface',
    label: 'Acrylic · PU · SBR · EPDM'
  },
  {
    eyebrow: 'Concrete repair & protection',
    lineOne: 'Protection from',
    lineTwo: 'the ground up.',
    copy: 'Repair damaged concrete and protect roofs, floors and industrial assets with the right coating system.',
    image: '/images/services/car-showroom.webp',
    imageAlt: 'Bright, high-gloss coated floor in an automotive showroom',
    label: 'Repair · Waterproof · Protect'
  }
];

const capabilityCards = [
  { icon: <FiLayers />, title: 'Industrial flooring', text: 'Epoxy and PU systems for manufacturing, warehousing, food spaces, workshops and commercial interiors.', slug: 'epoxy-flooring', image: '/images/services/warehouse-application.jpg', eyebrow: '01 / Heavy-duty surfaces' },
  { icon: <FiTarget />, title: 'Sports surfaces', text: 'Court, gym, play area and track systems shaped around the sport, substrate and environment.', slug: 'sports-flooring', image: '/images/service-references/sports-flooring.webp', eyebrow: '02 / Courts & tracks' },
  { icon: <FiShield />, title: 'Repair & protection', text: 'Concrete repair, protective paint and waterproofing services that help keep your asset in service.', slug: 'concrete-repair-maintenance', image: '/images/services/concrete-prep.png', eyebrow: '03 / Protect the substrate' }
];

const processSteps = [
  { n: '01', title: 'Understand the site', text: 'We discuss how the space is used, what is failing and what the finished surface needs to do.' },
  { n: '02', title: 'Specify the system', text: 'Substrate, traffic, exposure, cleaning and programme inform the proposed coating build-up.' },
  { n: '03', title: 'Prepare & apply', text: 'Preparation, detailing and installation are planned together to support a sound finished surface.' },
  { n: '04', title: 'Handover with care', text: 'The finish is reviewed and care guidance is shared so your team knows how to maintain it.' }
];

export default function HomePage() {
  const { settings } = useSite();
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const selected = slides[activeSlide];
  const featuredServices = ['epoxy-flooring', 'sports-flooring', 'epdm-running-tracks'];
  const selectedServices = featuredServices.map((slug) => services.find((service) => service.slug === slug)).filter(Boolean);
  const heroCards = [
    { title: 'About', note: 'Our story & approach', to: '/about', icon: <FiInfo />, image: '/images/services/warehouse-steel.jpg' },
    { title: 'Services', note: 'Explore all 30 services', to: '/services', icon: <FiLayers />, image: '/images/service-references/outdoor-basketball.webp' },
    { title: 'Products', note: 'Coatings & systems', to: '/products', icon: <FiPackage />, image: '/images/services/worker-roller.jpg' },
    { title: 'Gallery', note: 'Surface references', to: '/projects', icon: <FiImage />, image: '/images/services/metallic-1.webp' }
  ];
  const facebookVideoUrl = 'https://www.facebook.com/reel/1587397435736849';

  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setInterval(() => setActiveSlide((index) => (index + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const stepSlide = (direction) => setActiveSlide((index) => (index + direction + slides.length) % slides.length);

  return (
    <main className="home-page">
      <section className="home-cover" aria-label="Multilines Coating Solutions epoxy flooring">
        <img className="home-cover__photo" src="/images/hero-epoxy-floor.webp" alt="" fetchPriority="high" />
        <div className="home-cover__shade" />
        <div className="container home-cover__content">
          <div className="home-cover__headline">
            <div className="home-cover__overline"><span /> MULTILINES COATING SOLUTIONS <i /> LAHORE, PAKISTAN</div>
            <p className="eyebrow eyebrow--light">INDUSTRIAL FLOORING · SPORTS SURFACES · PROTECTIVE COATINGS</p>
            <h1>Surfaces with<br /><em>lasting presence.</em></h1>
            <p className="home-cover__lead">High-performance epoxy and PU floors, courts, concrete repair and waterproof coatings—specified for the way your space works.</p>
            <div className="home-cover__actions"><Link to="/contact" className="button button--accent">Talk to a coatings specialist <FiArrowUpRight /></Link><a href="tel:03034446027" className="home-cover__call">Call 0303-4446027 <FiArrowUpRight /></a></div>
          </div>
          <div className="home-cover__bottom"><div className="home-cover__caption"><span>01 / 30</span><i /> EPOXY FLOORING / JOTAFLOOR® SYSTEMS</div><nav className="home-cover__cards" aria-label="Explore Multilines"><span className="sr-only">Explore Multilines</span>{heroCards.map((card, index) => <Link to={card.to} className="home-cover-card" key={card.title}><img className="home-cover-card__photo" src={card.image} alt="" loading="eager" /><span className="home-cover-card__scrim" aria-hidden="true" /><span className="home-cover-card__number">0{index + 1}</span><span className="home-cover-card__icon">{card.icon}</span><span className="home-cover-card__text"><b>{card.title}</b><small>{card.note}</small></span><FiArrowUpRight className="home-cover-card__arrow" /></Link>)}</nav></div>
        </div>
        <span className="home-cover__side-label">SURFACE / SYSTEM / DETAIL</span>
      </section>

      <section className="hero-slider" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} aria-label="Featured Multilines services">
        <div className="hero-slider__wash" />
        <div className="container hero-slider__inner">
          <div className="hero-slider__copy" aria-live="polite">
            <div className="hero-slider__count"><span>0{activeSlide + 1}</span><i />0{slides.length}<span className="hero-slider__rule" /></div>
            <p className="eyebrow">{selected.eyebrow}</p>
            <h1>{selected.lineOne}<br /><em>{selected.lineTwo}</em></h1>
            <p className="hero-slider__description">{selected.copy}</p>
            <div className="hero-slider__actions">
              <Link className="button button--accent" to="/contact">Discuss your project <FiArrowUpRight /></Link>
              <Link className="text-link" to="/services">Explore our services <FiArrowRight /></Link>
            </div>
            <div className="hero-slider__controls">
              <button type="button" onClick={() => stepSlide(-1)} aria-label="Previous slide"><FiChevronLeft /></button>
              <div className="hero-slider__dots" role="tablist" aria-label="Choose a featured service">
                {slides.map((slide, index) => <button key={slide.eyebrow} role="tab" type="button" aria-label={`Show slide ${index + 1}`} aria-selected={activeSlide === index} className={activeSlide === index ? 'is-active' : ''} onClick={() => setActiveSlide(index)} />)}
              </div>
              <button type="button" onClick={() => stepSlide(1)} aria-label="Next slide"><FiChevronRight /></button>
              <span className="hero-slider__control-label">Drag / click to explore</span>
            </div>
          </div>
          <div className="hero-slider__visual" aria-label={selected.imageAlt} role="img">
            <img key={selected.image} src={selected.image} alt={selected.imageAlt} className="hero-slider__image" />
            <div className="hero-slider__image-shade" />
            <div className="hero-slider__image-mark"><span className="hero-slider__image-mark-dot" /><div><b>{selected.label}</b><small>{settings.address} · Project-led service</small></div></div>
            <div className="hero-slider__side-label">SURFACES / SYSTEMS / SOLUTIONS</div>
          </div>
        </div>
        <div className="hero-slider__bottom-line"><span /></div>
        <div className="hero-slider__corner"><FiArrowDownRight /><span>Scroll to discover</span></div>
      </section>

      <div className="trust-strip">
        <div className="container trust-strip__inner">
          <span className="trust-strip__lead">One surface partner</span>
          <span><i className="trust-strip__dot" /> Industrial & commercial floors</span>
          <span><i className="trust-strip__dot" /> Sports courts & tracks</span>
          <span><i className="trust-strip__dot" /> Concrete repair & protection</span>
          <span><i className="trust-strip__dot" /> Lahore, Pakistan</span>
        </div>
      </div>

      <section className="section section--intro home-intro" data-reveal>
        <div className="container home-intro__grid">
          <div className="section-index"><span>01</span><i /> WHAT WE DO</div>
          <div className="home-intro__content">
            <h2>Surface performance,<br /><em>from the ground up.</em></h2>
            <p>Multilines Coating Solutions is a specialist contractor for industrial and commercial flooring, sports surfacing, concrete repair and protective coatings. We bring materials and installation together—so each system fits the site, the service conditions and the people who use it.</p>
            <Link className="text-link text-link--dark" to="/about">Get to know Multilines <FiArrowUpRight /></Link>
          </div>
          <div className="home-intro__photo"><img src="/images/service-references/industrial-warehouse-reference.webp" alt="Illustrative industrial floor reference with a clean coated surface" loading="lazy" /><span>A considered system.<br />A lasting finish.</span></div>
        </div>
      </section>

      <section className="section section--capabilities" data-reveal>
        <div className="container">
          <div className="section-heading-row">
            <div><div className="section-index"><span>02</span><i /> OUR EXPERTISE</div><h2>Made for the work<br /><em>happening on top.</em></h2></div>
            <p>From a busy production floor to a school athletics track, the right finish starts with understanding how the surface will be used.</p>
          </div>
          <div className="capability-grid">
            {capabilityCards.map((card) => (
              <Link className="capability-card" key={card.title} to={`/services/${card.slug}`}>
                <div className="capability-card__image"><img src={card.image} alt="" loading="lazy" /><span>{card.eyebrow}</span><div className="capability-card__icon">{card.icon}</div></div>
                <div className="capability-card__body"><h3>{card.title}</h3><p>{card.text}</p><span className="capability-card__link">Discover the approach <FiArrowUpRight /></span></div>
              </Link>
            ))}
          </div>
          <div className="all-services-link"><span>Need a specific surface?</span><Link to="/services" className="text-link text-link--dark">Browse all services <FiArrowRight /></Link></div>
        </div>
      </section>

      <section className="section section--partner" data-reveal>
        <div className="container partner-panel">
          <div className="partner-panel__copy">
            <div className="section-index section-index--light"><span>03</span><i /> SPECIFICATION PARTNER</div>
            <span className="partner-panel__overline">A system, not just a surface.</span>
            <h2>Jotafloor® systems,<br /><em>thoughtfully specified.</em></h2>
            <p>We work with Jotun Jotafloor® epoxy and polyurethane flooring systems for industrial and commercial spaces. We help select a system around the substrate, traffic, chemical exposure and cleaning needs—then plan the preparation and application as part of one scope.</p>
            <Link to="/systems" className="button button--light">Explore coating systems <FiArrowUpRight /></Link>
          </div>
          <div className="partner-panel__art">
            <img className="partner-panel__photo" src="/images/service-references/industrial-floor-reference.webp" alt="Illustrative reference of a seamless resin floor" loading="lazy" />
            <div className="partner-panel__photo-shade" />
            <div className="partner-panel__label"><span>FLOORING SYSTEMS</span><b>JOTUN</b><small>Jotafloor® epoxy & PU</small></div>
            <div className="partner-panel__spec"><span>01</span><i /> SURFACE / SYSTEM / DETAIL</div>
          </div>
        </div>
      </section>

      <section className="section home-video" data-reveal>
        <div className="container home-video__grid">
          <div className="home-video__copy"><div className="section-index"><span>04</span><i /> FROM THE FIELD</div><p className="eyebrow">MULTILINES · VIDEO</p><h2>See surfaces<br /><em>come to life.</em></h2><p>Watch the video shared on our Facebook page for a closer look at the work, materials and finish behind high-performance coating systems.</p><a className="text-link text-link--dark" href={facebookVideoUrl} target="_blank" rel="noreferrer">Open video on Facebook <FiArrowUpRight /></a><span className="home-video__privacy">The player is hosted by Facebook. If it does not load in your browser, use the direct link.</span></div>
          <div className="home-video__frame"><iframe title="Multilines Coating Solutions Facebook video" src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(facebookVideoUrl)}&show_text=false&width=1280`} width="1280" height="720" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen /><a className="home-video__fallback" href={facebookVideoUrl} target="_blank" rel="noreferrer"><FiPlay /> Watch the video on Facebook <FiArrowUpRight /></a></div>
        </div>
      </section>

      <section className="section home-paints" data-reveal>
        <div className="container home-paints__panel">
          <div className="home-paints__copy"><div className="section-index section-index--light"><span>05</span><i /> PREMIUM PAINTS & COATINGS</div><p className="eyebrow eyebrow--light">PROTECTION / PERFORMANCE / DETAIL</p><h2>Premium coating<br /><em>systems, thoughtfully applied.</em></h2><p>Explore Jotafloor® epoxy and PU floors, protective industrial paints and waterproof coatings for roofs, terraces and basements. The right system is selected around the substrate, exposure and work happening on top.</p><div className="home-paints__actions"><Link to="/paints" className="button button--light">Discover paints & coatings <FiArrowUpRight /></Link><Link to="/products" className="text-link">Browse products <FiArrowRight /></Link></div></div>
          <div className="home-paints__visual"><img src="/images/services/worker-roller.jpg" alt="Illustrative reference of a coating being applied to a floor" loading="lazy" /><div className="home-paints__visual-shade" /><div className="home-paints__visual-caption"><span>01 / MATERIAL</span><i /> SPECIFIED FOR THE SITE</div></div>
        </div>
      </section>

      <section className="section section--featured-services" data-reveal>
        <div className="container">
          <div className="section-heading-row section-heading-row--compact">
            <div><div className="section-index"><span>04</span><i /> FOCUS AREAS</div><h2>Engineered for<br /><em>different demands.</em></h2></div>
            <Link to="/services" className="button button--outline">All services <FiArrowUpRight /></Link>
          </div>
          <div className="service-grid service-grid--three">{selectedServices.map((service, index) => <ServiceCard key={service.slug} service={service} index={index} />)}</div>
        </div>
      </section>

      <section className="section section--process" data-reveal>
        <div className="container process-layout">
          <div className="process-intro"><div className="section-index"><span>05</span><i /> HOW WE WORK</div><h2>Good work starts<br /><em>with good questions.</em></h2><p>We bring clarity to a technical scope—then keep the details connected from the first site visit to the finished surface.</p><Link to="/about" className="text-link text-link--dark">Our approach <FiArrowUpRight /></Link><div className="process-photo"><img src="/images/service-references/concrete-floor-repair-reference.webp" alt="Illustrative reference of concrete surface preparation" loading="lazy" /><span>PREPARATION / REPAIR / FINISH</span></div></div>
          <div className="process-list">{processSteps.map((step) => <div className="process-step" key={step.n}><span className="process-step__number">{step.n}</span><div><h3>{step.title}</h3><p>{step.text}</p></div><FiCheck className="process-step__check" /></div>)}</div>
        </div>
      </section>

      <section className="section section--project-teaser" data-reveal>
        <div className="container project-teaser">
          <div className="project-teaser__copy"><div className="section-index"><span>06</span><i /> SELECTED SURFACES</div><h2>See the finish.<br /><em>Picture the potential.</em></h2><p>Explore a selection of coating, sports and flooring references. Every space is different—our team can help translate a reference into a system suited to your project.</p><div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}><Link to="/projects" className="button button--dark">View projects <FiArrowUpRight /></Link><Link to="/gallery" className="button button--outline">Browse gallery <FiArrowUpRight /></Link></div></div>
          <div className="project-teaser__visual"><img src="/images/services/metallic-1.webp" alt="Reflective metallic resin floor with a custom marbled finish" loading="lazy" /><div className="project-teaser__small"><img src="/images/service-references/pu-sports-flooring.webp" alt="Indoor sports hall surface reference" loading="lazy" /></div><span className="project-teaser__caption">MATERIAL / MOTION / LIGHT</span></div>
        </div>
      </section>

      {/* Gallery snapshot strip */}
      <section className="section home-gallery-strip" data-reveal>
        <div className="container">
          <div className="home-gallery-strip__header">
            <div>
              <div className="section-index"><span>07</span><i /> OUR GALLERY</div>
              <h2>Real photos.<br /><em>Real results.</em></h2>
            </div>
            <Link to="/gallery" className="button button--outline">View all photos <FiArrowUpRight /></Link>
          </div>
          <div className="home-gallery-strip__grid">
            <Link to="/gallery" className="hgs-tile hgs-tile--tall"><img src="/images/gallery/753267066_1670452161754237_5244671406231355593_n.jpg" alt="Flooring project" loading="lazy" /><span>Gallery</span></Link>
            <Link to="/gallery" className="hgs-tile"><img src="/images/gallery/490823179_1236054668527324_7628931044510625509_n.jpg" alt="Surface installation" loading="lazy" /></Link>
            <Link to="/gallery" className="hgs-tile"><img src="/images/gallery/492120106_1243498517782939_3058602397724820343_n.jpg" alt="Court marking" loading="lazy" /></Link>
            <Link to="/gallery" className="hgs-tile hgs-tile--wide"><img src="/images/gallery/764855168_1683036130495840_268628298850771745_n.jpg" alt="Project reference" loading="lazy" /></Link>
            <Link to="/gallery" className="hgs-tile"><img src="/images/gallery/749330040_1668807811918672_4058649805619479008_n.jpg" alt="Finished floor" loading="lazy" /></Link>
            <Link to="/projects" className="hgs-tile hgs-tile--cta"><span className="hgs-tile__cta-inner"><strong>26+ Projects</strong><small>See completed work</small><FiArrowUpRight /></span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}

