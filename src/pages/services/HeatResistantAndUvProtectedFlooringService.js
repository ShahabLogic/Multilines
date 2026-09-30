import React, { useContext, useEffect, useState, useCallback } from 'react';
import { ConfigContext } from '../../context/ConfigContext';
import '../../styles/servicePage.css';

/* ------------------------------------------------------------------
   DATA
   All image URLs verified and sourced from working stock/industry pages.
------------------------------------------------------------------ */

// Cover image — shiny epoxy floor coating being applied
const coverImage = 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=2400&q=80';

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1600&q=80', alt: 'Shiny epoxy resin floor reflecting light' },
  { src: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1600&q=80', alt: 'Worker applying epoxy coating to a floor' },
  { src: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80', alt: 'Glossy polyurethane floor finish detail' },
  { src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1600&q=80', alt: 'Sunlit outdoor patio with durable UV-stable flooring' },
  { src: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1600&q=80', alt: 'Modern commercial space with UV-protected floor' },
  { src: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80', alt: 'Close-up of seamless resin floor coating texture' },
  { src: 'https://images.unsplash.com/photo-1562113530-57ba467cea38?auto=format&fit=crop&w=1600&q=80', alt: 'Industrial epoxy floor coating in progress' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=80', alt: 'Polished concrete and epoxy hybrid surface' },
];

const quickFacts = [
  { value: '10+ yr', label: 'Average lifespan' },
  { value: '100%', label: 'Seamless finish' },
  { value: 'Eco', label: 'Low-VOC friendly' },
  { value: 'High', label: 'Impact durability' },
];

const performanceMetrics = [
  { label: 'Durability', rating: 'Excellent', percent: 90, score: '9/10' },
  { label: 'UV / Fade Resistance', rating: 'Outstanding', percent: 100, score: '10/10' },
  { label: 'Heat Resistance', rating: 'Excellent', percent: 92, score: '9.2/10' },
  { label: 'Slip Resistance', rating: 'Very Good', percent: 85, score: '8.5/10' },
  { label: 'Maintenance', rating: 'Very Low', percent: 30, score: '3/10' },
  { label: 'Aesthetics', rating: 'High', percent: 88, score: '8.8/10' },
];

const specifications = [
  { label: 'System Types', value: 'Polyurethane, epoxy, and hybrid UV-stable coating systems' },
  { label: 'UV Protection', value: 'Embedded UV-blocking technology for long-term colour retention' },
  { label: 'Heat Reflectivity', value: 'Formulated to reduce solar heat absorption and surface temperature' },
  { label: 'Surface Finish', value: 'Seamless, non-porous, matte to high-gloss options available' },
  { label: 'Base Compatibility', value: 'Concrete, asphalt, tile, and approved synthetic substrates' },
  { label: 'Slip Resistance', value: 'Textured or aggregate-broadcast finishes for wet-area safety' },
  { label: 'Colour Range', value: 'Standard RAL palette plus custom colour matching' },
  { label: 'Applications', value: 'Indoor and outdoor — pool decks, courts, patios, commercial floors' },
];

const applications = [
  { title: 'Sports Courts', desc: 'UV-stable surfaces for tennis, basketball and multipurpose outdoor courts.' },
  { title: 'Poolside Areas', desc: 'Slip-resistant, heat-reflective finishes around pools and splash zones.' },
  { title: 'Playgrounds', desc: 'Safe, cool-to-touch flooring that resists sun damage and heavy play.' },
  { title: 'Commercial Spaces', desc: 'Showrooms, walkways and patios that keep their colour under direct sun.' },
  { title: 'Industrial Floors', desc: 'Heat-resistant coatings for warehouses and factories with solar exposure.' },
  { title: 'Residential Patios', desc: 'Low-maintenance outdoor flooring that stays comfortable and attractive.' },
];

const processSteps = [
  { step: '01', title: 'Site Assessment', desc: 'We evaluate sun exposure, surface temperature and substrate condition to specify the right system.' },
  { step: '02', title: 'Surface Preparation', desc: 'Cleaning, crack repair, grinding and priming so the UV-stable coating bonds permanently.' },
  { step: '03', title: 'Coating Application', desc: 'Heat-reflective and UV-protected layers are applied in precise thickness tolerances.' },
  { step: '04', title: 'Finish & Texture', desc: 'Aggregate or textured finishes are broadcast where slip resistance is required.' },
  { step: '05', title: 'Cure & Inspection', desc: 'Controlled curing followed by a final quality check before handover.' },
];

const faqs = [
  { q: 'How does UV protection extend the life of my flooring?', a: 'UV-stable pigments and additives prevent the sun\'s ultraviolet rays from breaking down the coating\'s molecular structure. Without this protection, colours fade, surfaces chalk and the material becomes brittle over time.' },
  { q: 'Will the flooring stay cool under direct sunlight?', a: 'Our heat-resistant formulations reduce solar heat absorption, keeping the surface significantly cooler than standard dark coatings. Light colours and reflective pigments further improve comfort underfoot.' },
  { q: 'Can this flooring be used in wet areas like poolside?', a: 'Yes. We offer textured and aggregate-broadcast finishes specifically designed for wet environments, providing reliable slip resistance even when the surface is wet.' },
  { q: 'How long does the coating last outdoors?', a: 'With proper installation and routine care, our heat-resistant and UV-protected systems typically perform well for 10 or more years before a surface refresh is needed.' },
  { q: 'Is maintenance difficult for outdoor UV-protected floors?', a: 'No. Routine sweeping and occasional washing is usually sufficient. The seamless, non-porous finish resists stains, algae and most cleaning chemicals.' },
];

const relatedServices = [
  { title: 'Acrylic Sports Flooring', desc: 'Seamless acrylic court systems for tennis, basketball and multi-sport use.' },
  { title: 'EPDM Running Tracks', desc: 'High-performance rubber track systems for athletics and schools.' },
  { title: 'Gym Flooring', desc: 'Impact-absorbing SBR rubber surfaces for commercial and home gyms.' },
  { title: 'Indoor Sports Flooring', desc: 'Wood, vinyl and composite flooring solutions for indoor courts and arenas.' },
];

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'performance', label: 'Performance' },
  { id: 'specs', label: 'Specs' },
  { id: 'applications', label: 'Applications' },
  { id: 'process', label: 'Process' },
  { id: 'faq', label: 'FAQ' },
];

/* ------------------------------------------------------------------
   HOOKS
------------------------------------------------------------------ */
function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('.svc-page [data-reveal]'));
    if (!nodes.length) return undefined;
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-revealed'));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-revealed');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
}

function useActiveSection() {
  const [active, setActive] = useState(SECTIONS[0].id);
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!els.length) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

/* ------------------------------------------------------------------
   COMPONENT
------------------------------------------------------------------ */
const HeatResistantAndUvProtectedFlooringService = () => {
  const { config } = useContext(ConfigContext);
  const companyName = config?.companyName || 'Multilines Coating Solution';

  const [lightbox, setLightbox] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);
  const activeSection = useActiveSection();

  useReveal();

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const stepLightbox = useCallback(
    (dir) =>
      setLightbox((i) =>
        i === null ? i : (i + dir + galleryImages.length) % galleryImages.length
      ),
    []
  );

  useEffect(() => {
    if (lightbox === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') stepLightbox(1);
      if (e.key === 'ArrowLeft') stepLightbox(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, closeLightbox, stepLightbox]);

  return (
    <div className="svc-page">
      {/* ============ HERO ============ */}
      <header className="svc-hero">
        <div className="svc-hero__bg">
          <img src={coverImage} alt="" aria-hidden="true" />
        </div>
        <div className="svc-hero__scrim" />

        <div className="svc-hero__inner svc-wrapper">
          <p className="svc-eyebrow">Services · Protective Surfaces</p>
          <h1>
            Heat-Resistant &amp; <em>UV-Protected</em> Flooring
          </h1>
          <p className="svc-hero__lede">
            Engineered epoxy and polyurethane coatings that resist solar heat build-up
            and UV degradation — keeping outdoor and sun-exposed floors cool, colourful
            and structurally sound for years.
          </p>

          <div className="svc-hero__actions">
            <a href="#contact" className="svc-btn svc-btn--gold">Request a survey</a>
            <a href="#gallery" className="svc-btn svc-btn--ghost">View installations</a>
          </div>

          <nav className="svc-crumbs" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">›</span>
            <a href="/services">Services</a>
            <span aria-hidden="true">›</span>
            <span className="svc-crumbs__current">Heat-Resistant &amp; UV-Protected Flooring</span>
          </nav>
        </div>
      </header>

      {/* ============ STICKY SUBNAV ============ */}
      <nav className="svc-subnav" aria-label="Page sections">
        <div className="svc-wrapper svc-subnav__inner">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`svc-subnav__link${activeSection === s.id ? ' is-active' : ''}`}
            >
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ============ OVERVIEW ============ */}
      <section id="overview" className="svc-section svc-section--dark">
        <div className="svc-wrapper svc-overview">
          <div className="svc-overview__copy" data-reveal>
            <p className="svc-eyebrow">The Overview</p>
            <h2 className="svc-title">
              Cool under pressure, <em>beautiful under sun.</em>
            </h2>
            <p>
              The materials for outdoor floors have to be tough and have the ability to
              withstand high temperatures and exposure to the sun. Ordinary floorings
              can be affected by high temperatures and direct sunlight, causing them to
              fade, crack or disintegrate over time. For this reason, {companyName} has
              produced heat-resistant and UV-protected flooring, combining the highest
              resistance to extreme weather with the best appearance.
            </p>
            <p>
              Our specialists have been developing our flooring materials so that they
              can be resistant to heat build-up, which would make for a cool and pleasant
              surface to walk on, even when the sun is shining. The floors that they use
              are embedded with UV protection technology that allows them to stay looking
              new for years. For this reason, these floors are perfect for sports courts,
              playgrounds, poolside areas and commercial spaces.
            </p>
            <p>
              The installation of the product is guaranteed to last for years, whether it
              be in outdoor areas or in spaces exposed to the sun. Our floors stand up to
              heavy usage, exposure to the sun and enduring the toughest weather, as well
              as showing the greatest performance, being the top choice for investors and
              homeowners overload.
            </p>
            <p>
              Decreases the absorption of solar heat, thus lowering the temperature of
              the surface even under the direct sun.
            </p>
          </div>

          <aside className="svc-overview__aside" data-reveal style={{ '--reveal-delay': '140ms' }}>
            <h4>Quick Facts</h4>
            <ul className="svc-facts">
              {quickFacts.map((f) => (
                <li key={f.label}>
                  <span>{f.value}</span>
                  <em>{f.label}</em>
                </li>
              ))}
            </ul>
            <a href="#contact" className="svc-btn svc-btn--gold">Book a survey</a>
          </aside>
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section id="gallery" className="svc-section svc-section--dark-2">
        <div className="svc-wrapper">
          <header className="svc-head svc-head--center" data-reveal>
            <p className="svc-eyebrow svc-eyebrow--center">The Work</p>
            <h2 className="svc-title">Floors that <em>keep their cool.</em></h2>
            <p className="svc-lede">
              Completed installations — outdoor courts, pool decks, patios and commercial
              spaces built to withstand the sun.
            </p>
          </header>

          <div className="svc-gallery" data-reveal>
            {galleryImages.map((img, i) => (
              <button
                type="button"
                key={img.src}
                className={`svc-gallery__item${i === 0 ? ' is-feature' : ''}`}
                onClick={() => setLightbox(i)}
                aria-label={`Open image: ${img.alt}`}
              >
                <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
                <span className="svc-gallery__hover" aria-hidden="true">⤢</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PERFORMANCE ============ */}
      <section id="performance" className="svc-section svc-section--cream">
        <div className="svc-wrapper">
          <header className="svc-head svc-head--split" data-reveal>
            <div>
              <p className="svc-eyebrow">Performance</p>
              <h2 className="svc-title">Tested against <em>the elements.</em></h2>
            </div>
            <p className="svc-lede">
              Every coating layer is formulated to deliver measurable performance — from
              UV fade resistance to heat reflection and long-term durability.
            </p>
          </header>

          <div className="svc-metrics">
            {performanceMetrics.map((m, i) => (
              <article
                className="svc-metric"
                key={m.label}
                data-reveal
                style={{ '--reveal-delay': `${i * 60}ms` }}
              >
                <header>
                  <h3>{m.label}</h3>
                  <span className="svc-metric__score">{m.score}</span>
                </header>
                <div className="svc-metric__track">
                  <span className="svc-metric__fill" style={{ '--w': `${m.percent}%` }} />
                </div>
                <p>{m.rating}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SPECS ============ */}
      <section id="specs" className="svc-section svc-section--dark">
        <div className="svc-wrapper svc-specs">
          <header className="svc-head" data-reveal>
            <p className="svc-eyebrow">Technical Data</p>
            <h2 className="svc-title">System <em>specifications.</em></h2>
            <p className="svc-lede">
              Final values are confirmed after the site survey — the figures below
              represent our standard heat-resistant and UV-protected flooring systems.
            </p>
          </header>

          <div className="svc-specs__table" data-reveal>
            {specifications.map((row) => (
              <div className="svc-specs__row" key={row.label}>
                <span className="svc-specs__label">{row.label}</span>
                <span className="svc-specs__value">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ APPLICATIONS ============ */}
      <section id="applications" className="svc-section svc-section--dark-2">
        <div className="svc-wrapper">
          <header className="svc-head svc-head--center" data-reveal>
            <p className="svc-eyebrow svc-eyebrow--center">Applications</p>
            <h2 className="svc-title">Wherever the sun <em>hits hardest.</em></h2>
          </header>

          <div className="svc-apps">
            {applications.map((a, i) => (
              <article
                className="svc-app"
                key={a.title}
                data-reveal
                style={{ '--reveal-delay': `${i * 60}ms` }}
              >
                <span className="svc-app__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section id="process" className="svc-section svc-section--cream">
        <div className="svc-wrapper">
          <header className="svc-head svc-head--center" data-reveal>
            <p className="svc-eyebrow svc-eyebrow--center">The Process</p>
            <h2 className="svc-title">From bare slab to <em>sun-proof finish.</em></h2>
          </header>

          <ol className="svc-steps">
            {processSteps.map((s, i) => (
              <li
                className="svc-step"
                key={s.step}
                data-reveal
                style={{ '--reveal-delay': `${i * 80}ms` }}
              >
                <span className="svc-step__num">{s.step}</span>
                <div className="svc-step__body">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ FAQ + RELATED ============ */}
      <section id="faq" className="svc-section svc-section--dark">
        <div className="svc-wrapper svc-faq-grid">
          <header className="svc-head" data-reveal>
            <p className="svc-eyebrow">Questions</p>
            <h2 className="svc-title">Everything you <em>wanted to ask.</em></h2>
            <p className="svc-lede">
              Still unsure about something? Our team answers every enquiry personally.
            </p>
            <a href="#contact" className="svc-btn svc-btn--ghost" style={{ marginTop: '2rem' }}>
              Talk to a specialist
            </a>
          </header>

          <div className="svc-faq" data-reveal style={{ '--reveal-delay': '140ms' }}>
            {faqs.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div className={`svc-faq__item${isOpen ? ' is-open' : ''}`} key={item.q}>
                  <button
                    type="button"
                    className="svc-faq__q"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                  >
                    <span>{item.q}</span>
                    <i className="svc-faq__icon" aria-hidden="true" />
                  </button>
                  <div className="svc-faq__a" role="region">
                    <div className="svc-faq__a-inner">
                      <p>{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Related services */}
        <div className="svc-wrapper svc-related" data-reveal>
          <header className="svc-head svc-head--split">
            <div>
              <p className="svc-eyebrow">Explore More</p>
              <h2 className="svc-title">Related <em>services.</em></h2>
            </div>
          </header>
          <div className="svc-related__grid">
            {relatedServices.map((s) => (
              <a className="svc-related__card" href="/services" key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="svc-related__cta">
                  Learn more <i aria-hidden="true">→</i>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section id="contact" className="svc-cta">
        <div className="svc-wrapper svc-cta__inner" data-reveal>
          <p className="svc-eyebrow svc-eyebrow--center">Get Started</p>
          <h2 className="svc-title">
            Ready for flooring that <em>survives the sun?</em>
          </h2>
          <p>
            Contact {companyName} today for a free consultation and a clear, itemised
            quote for your heat-resistant and UV-protected flooring project.
          </p>
          <div className="svc-cta__actions">
            <a href="/contact" className="svc-btn svc-btn--gold">Request a consultation</a>
            <a href="/services" className="svc-btn svc-btn--ghost">Browse all services</a>
          </div>
        </div>
      </section>

      {/* ============ LIGHTBOX ============ */}
      {lightbox !== null && (
        <div
          className="svc-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="svc-lightbox__close"
            onClick={closeLightbox}
            aria-label="Close viewer"
          >
            ×
          </button>
          <button
            type="button"
            className="svc-lightbox__arrow svc-lightbox__arrow--prev"
            onClick={(e) => { e.stopPropagation(); stepLightbox(-1); }}
            aria-label="Previous image"
          >
            ‹
          </button>

          <figure className="svc-lightbox__figure" onClick={(e) => e.stopPropagation()}>
            <img src={galleryImages[lightbox].src} alt={galleryImages[lightbox].alt} />
            <figcaption>
              <span>{galleryImages[lightbox].alt}</span>
              <i>
                {String(lightbox + 1).padStart(2, '0')} / {String(galleryImages.length).padStart(2, '0')}
              </i>
            </figcaption>
          </figure>

          <button
            type="button"
            className="svc-lightbox__arrow svc-lightbox__arrow--next"
            onClick={(e) => { e.stopPropagation(); stepLightbox(1); }}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
};

export default HeatResistantAndUvProtectedFlooringService;