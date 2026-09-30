import React, { useContext, useEffect, useState, useCallback } from 'react';
import { ConfigContext } from '../../context/ConfigContext';
import '../../styles/AcrylicSportsFlooringService.css';

/* ------------------------------------------------------------------
   DATA
------------------------------------------------------------------ */
const galleryImages = [
    { src: 'https://knoveo.co/wp-content/uploads/2025/01/6eb501da05.jpg', alt: 'Acrylic sports court surface' },
    { src: 'https://knoveo.co/wp-content/uploads/2025/01/f554cc3be2.jpg', alt: 'Acrylic court colour coating' },
    { src: '/wp-content/uploads/2024/09/Picture62.png', alt: 'Finished acrylic sports floor' },
    { src: '/wp-content/uploads/2024/09/Picture61.png', alt: 'Acrylic court line marking' },
    { src: '/wp-content/uploads/2024/09/Picture60.png', alt: 'Multipurpose acrylic court' },
    { src: '/wp-content/uploads/2024/09/Picture59.jpg', alt: 'Outdoor acrylic sports surface' },
    { src: '/wp-content/uploads/2024/09/Picture58.jpg', alt: 'Textured acrylic finish close-up' },
    { src: '/wp-content/uploads/2024/09/Picture57.png', alt: 'Acrylic court installation detail' },
];

const performanceMetrics = [
    { label: 'Shock Absorption', rating: 'Excellent', percent: 80, score: '8/10' },
    { label: 'Slip Resistance', rating: 'Outstanding', percent: 90, score: '9/10' },
    { label: 'Ball Bounce', rating: 'Consistent', percent: 100, score: '10/10' },
    { label: 'Maintenance', rating: 'Very Low', percent: 20, score: '2/10' },
    { label: 'UV / Fade Resistance', rating: 'Excellent', percent: 90, score: '9/10' },
    { label: 'Water Drainage', rating: 'Very Good', percent: 80, score: '8/10' },
];

const specifications = [
    { label: 'System Build-Up', value: 'Cushion base coat + acrylic resurfacer + textured color coats + line marking' },
    { label: 'Thickness Options', value: 'Standard, Cushioned, and Extra-Cushioned systems available' },
    { label: 'Surface Finish', value: 'Textured, non-slip, seamless acrylic coating' },
    { label: 'Base Compatibility', value: 'Asphalt, concrete, or approved synthetic sports base' },
    { label: 'UV Stability', value: 'UV-stable pigments for long-term colour retention' },
    { label: 'Standards', value: 'Meets ITF pace ratings and international sports-surface benchmarks' },
    { label: 'Color Range', value: 'Wide standard palette plus custom colour matching' },
    { label: 'Drainage', value: 'Designed to shed surface water and resist pooling' },
];

const applications = [
    { title: 'Tennis Courts', desc: 'Consistent ball bounce and ITF-rated pace for club and tournament play.' },
    { title: 'Basketball Courts', desc: 'High-traction textured finish built for quick cuts and repeated impact.' },
    { title: 'Multi-Purpose Courts', desc: 'One surface configured for tennis, basketball, volleyball, and more.' },
    { title: 'Pickleball Courts', desc: 'Smooth, consistent bounce tuned for the growing pickleball community.' },
    { title: 'Badminton Courts', desc: 'Even, low-glare surface suited to indoor and covered outdoor courts.' },
    { title: 'School & Community', desc: 'Durable, low-maintenance flooring built for heavy daily use.' },
];

const installationSteps = [
    { step: '01', title: 'Site Assessment', desc: 'We inspect the existing base for cracks, drainage issues, and slope to confirm it meets specification.' },
    { step: '02', title: 'Surface Preparation', desc: 'The base is cleaned, repaired, and primed so the acrylic system bonds properly and lasts for years.' },
    { step: '03', title: 'Cushion & Resurfacing', desc: 'Acrylic resurfacer and, where selected, cushion layers are applied to level the court and add shock absorption.' },
    { step: '04', title: 'Colour & Texture Coats', desc: 'Textured acrylic colour coats are applied in your chosen palette for grip, brightness, and UV resistance.' },
    { step: '05', title: 'Line Marking & Curing', desc: 'Precision lines are marked for your chosen sports, and the surface is left to cure before play begins.' },
];

const faqs = [
    { q: 'How long does an acrylic sports court take to install?', a: 'Most courts are fully playable within about two days of starting work, depending on size, weather, and the number of coats specified.' },
    { q: 'Can acrylic flooring be installed over an existing court?', a: 'Yes, in most cases it can be applied over sound existing asphalt or concrete, provided the base passes inspection and any repairs are completed first.' },
    { q: 'How long does acrylic sports flooring last?', a: 'With proper installation and routine care, acrylic surfaces typically perform well for 10 or more years before recoating is needed.' },
    { q: 'Does the surface work for multiple sports?', a: 'Yes. Multi-purpose line marking lets a single court support tennis, basketball, pickleball, and other sports on the same surface.' },
    { q: 'How much maintenance does it need?', a: 'Maintenance is minimal — routine sweeping, occasional washing, and periodic inspection are generally enough to keep the surface performing well.' },
];

const relatedServices = [
    { title: 'Synthetic Turf', desc: 'Durable artificial grass systems for multi-sport fields and recreational areas.' },
    { title: 'Rubber Sports Flooring', desc: 'Impact-absorbing rubber surfacing for gyms, playgrounds, and fitness areas.' },
    { title: 'Running Track Surfacing', desc: 'Purpose-built track systems engineered for speed, safety, and durability.' },
    { title: 'Indoor Sports Flooring', desc: 'Wood, vinyl, and composite flooring solutions for indoor courts and arenas.' },
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
        const nodes = Array.from(document.querySelectorAll('.asf [data-reveal]'));
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
const AcrylicSportsFlooringService = () => {
    const { config } = useContext(ConfigContext);
    const companyName = config?.companyName || 'Multilines Coating Solution';

    const [lightbox, setLightbox] = useState(null);
    const [openFaq, setOpenFaq] = useState(0);
    const activeSection = useActiveSection();

    useReveal();

    const closeLightbox = useCallback(() => setLightbox(null), []);
    const stepLightbox = useCallback(
        (dir) => setLightbox((i) => (i === null ? i : (i + dir + galleryImages.length) % galleryImages.length)),
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
        <div className="asf">
            {/* ============ HERO ============ */}
            <header className="asf-hero">
                <div className="asf-hero__bg">
                    <img
                        src={galleryImages[0].src}
                        alt=""
                        aria-hidden="true"
                    />
                </div>
                <div className="asf-hero__scrim" />

                <div className="asf-hero__inner wrapper">
                    <p className="asf-eyebrow">Services · Court Surfaces</p>
                    <h1>
                        Acrylic Sports <em>Flooring</em>
                    </h1>
                    <p className="asf-hero__lede">
                        A seamless, high-performance acrylic court system engineered for indoor and
                        outdoor play — consistent grip, weather resistance and international-standard
                        finish.
                    </p>

                    <div className="asf-hero__actions">
                        <a href="#contact" className="asf-btn asf-btn--gold">Request a court survey</a>
                        <a href="#gallery" className="asf-btn asf-btn--ghost">View completed courts</a>
                    </div>

                    <nav className="asf-crumbs" aria-label="Breadcrumb">
                        <a href="/">Home</a>
                        <span aria-hidden="true">›</span>
                        <a href="/services">Services</a>
                        <span aria-hidden="true">›</span>
                        <span className="asf-crumbs__current">Acrylic Sports Flooring</span>
                    </nav>
                </div>
            </header>

            {/* ============ STICKY SUBNAV ============ */}
            <nav className="asf-subnav" aria-label="Page sections">
                <div className="wrapper asf-subnav__inner">
                    {SECTIONS.map((s) => (
                        <a
                            key={s.id}
                            href={`#${s.id}`}
                            className={`asf-subnav__link${activeSection === s.id ? ' is-active' : ''}`}
                        >
                            {s.label}
                        </a>
                    ))}
                </div>
            </nav>

            {/* ============ OVERVIEW ============ */}
            <section id="overview" className="asf-section asf-section--dark">
                <div className="wrapper asf-overview">
                    <div className="asf-overview__copy" data-reveal>
                        <p className="asf-eyebrow">The Overview</p>
                        <h2 className="asf-title">
                            Strength, precision and <em>beauty</em> — in one surface.
                        </h2>
                        <p>
                            Acrylic sports flooring is a top choice in sports flooring because of its
                            strength, the amount of work done, and of course, its beauty. It is
                            engineered for outdoor and indoor installation with good friction and
                            weather resistance, and the playing surface stays smooth and true.
                        </p>
                        <p>
                            Without any marks, it can be used for international sports events and in many
                            situations. The flooring surface is seamless and offers a high-performance
                            solution that satisfies global standards.
                        </p>
                        <p>
                            At {companyName}, we produce premium acrylic sports flooring for ultimate
                            grip, long-term use and low maintenance. This flooring can drastically
                            increase the speed of play and consequently minimise injuries to players. We
                            offer different colours, textures and thickness levels for customisation of
                            the court — providing great on-court performance across different sports.
                        </p>
                        <p>
                            Every system is engineered from the base up — combining a cushioned or
                            standard build-up, multiple textured acrylic coats and precision line
                            marking — so the finished court performs consistently from the first game
                            to the thousandth.
                        </p>
                    </div>

                    <aside className="asf-overview__aside" data-reveal style={{ '--reveal-delay': '140ms' }}>
                        <h4>Quick Facts</h4>
                        <ul className="asf-facts">
                            <li><span>35%</span><em>Force reduction</em></li>
                            <li><span>10+ yr</span><em>Average lifespan</em></li>
                            <li><span>100%</span><em>UV resistant</em></li>
                            <li><span>ITF</span><em>Certified pace</em></li>
                            <li><span>2–5</span><em>Coat system options</em></li>
                            <li><span>24–48 hr</span><em>Cure time per coat</em></li>
                        </ul>
                        <a href="#contact" className="asf-btn asf-btn--gold">Book a survey</a>
                    </aside>
                </div>
            </section>

            {/* ============ GALLERY ============ */}
            <section id="gallery" className="asf-section asf-section--dark-2">
                <div className="wrapper">
                    <header className="asf-head asf-head--center" data-reveal>
                        <p className="asf-eyebrow asf-eyebrow--center">The Work</p>
                        <h2 className="asf-title">Courts finished <em>to the millimetre.</em></h2>
                        <p className="asf-lede">
                            A selection of completed acrylic installations — indoor and outdoor,
                            single-sport and multi-purpose.
                        </p>
                    </header>

                    <div className="asf-gallery" data-reveal>
                        {galleryImages.map((img, i) => (
                            <button
                                type="button"
                                key={img.src}
                                className={`asf-gallery__item${i === 0 ? ' is-feature' : ''}`}
                                onClick={() => setLightbox(i)}
                                aria-label={`Open image: ${img.alt}`}
                            >
                                <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
                                <span className="asf-gallery__hover" aria-hidden="true">⤢</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ PERFORMANCE ============ */}
            <section id="performance" className="asf-section asf-section--cream">
                <div className="wrapper">
                    <header className="asf-head asf-head--split" data-reveal>
                        <div>
                            <p className="asf-eyebrow">Performance</p>
                            <h2 className="asf-title">Scientifically <em>tuned for play.</em></h2>
                        </div>
                        <p className="asf-lede">
                            Every acrylic layer is formulated to deliver predictable, measurable
                            performance — from shock absorption to ball bounce consistency.
                        </p>
                    </header>

                    <div className="asf-metrics">
                        {performanceMetrics.map((m, i) => (
                            <article
                                className="asf-metric"
                                key={m.label}
                                data-reveal
                                style={{ '--reveal-delay': `${i * 60}ms` }}
                            >
                                <header>
                                    <h3>{m.label}</h3>
                                    <span className="asf-metric__score">{m.score}</span>
                                </header>
                                <div className="asf-metric__track">
                                    <span
                                        className="asf-metric__fill"
                                        style={{ '--w': `${m.percent}%` }}
                                    />
                                </div>
                                <p>{m.rating}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ SPECS ============ */}
            <section id="specs" className="asf-section asf-section--dark">
                <div className="wrapper asf-specs">
                    <header className="asf-head" data-reveal>
                        <p className="asf-eyebrow">Technical Data</p>
                        <h2 className="asf-title">System <em>specifications.</em></h2>
                        <p className="asf-lede">
                            Final values are confirmed after the site survey — the figures below
                            represent our standard acrylic system.
                        </p>
                    </header>

                    <div className="asf-specs__table" data-reveal>
                        {specifications.map((row) => (
                            <div className="asf-specs__row" key={row.label}>
                                <span className="asf-specs__label">{row.label}</span>
                                <span className="asf-specs__value">{row.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ APPLICATIONS ============ */}
            <section id="applications" className="asf-section asf-section--dark-2">
                <div className="wrapper">
                    <header className="asf-head asf-head--center" data-reveal>
                        <p className="asf-eyebrow asf-eyebrow--center">Applications</p>
                        <h2 className="asf-title">Built for every <em>kind of play.</em></h2>
                    </header>

                    <div className="asf-apps">
                        {applications.map((a, i) => (
                            <article
                                className="asf-app"
                                key={a.title}
                                data-reveal
                                style={{ '--reveal-delay': `${i * 60}ms` }}
                            >
                                <span className="asf-app__num">{String(i + 1).padStart(2, '0')}</span>
                                <h3>{a.title}</h3>
                                <p>{a.desc}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ PROCESS ============ */}
            <section id="process" className="asf-section asf-section--cream">
                <div className="wrapper">
                    <header className="asf-head asf-head--center" data-reveal>
                        <p className="asf-eyebrow asf-eyebrow--center">The Process</p>
                        <h2 className="asf-title">From bare base to <em>ready for play.</em></h2>
                    </header>

                    <ol className="asf-steps">
                        {installationSteps.map((s, i) => (
                            <li
                                className="asf-step"
                                key={s.step}
                                data-reveal
                                style={{ '--reveal-delay': `${i * 80}ms` }}
                            >
                                <span className="asf-step__num">{s.step}</span>
                                <div className="asf-step__body">
                                    <h3>{s.title}</h3>
                                    <p>{s.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* ============ FAQ + RELATED ============ */}
            <section id="faq" className="asf-section asf-section--dark">
                <div className="wrapper asf-faq-grid">
                    <header className="asf-head" data-reveal>
                        <p className="asf-eyebrow">Questions</p>
                        <h2 className="asf-title">Everything you <em>wanted to ask.</em></h2>
                        <p className="asf-lede">
                            Still unsure about something? Our team answers every enquiry personally.
                        </p>
                        <a href="#contact" className="asf-btn asf-btn--ghost" style={{ marginTop: '2rem' }}>
                            Talk to a specialist
                        </a>
                    </header>

                    <div className="asf-faq" data-reveal style={{ '--reveal-delay': '140ms' }}>
                        {faqs.map((item, i) => {
                            const isOpen = openFaq === i;
                            return (
                                <div className={`asf-faq__item${isOpen ? ' is-open' : ''}`} key={item.q}>
                                    <button
                                        type="button"
                                        className="asf-faq__q"
                                        aria-expanded={isOpen}
                                        onClick={() => setOpenFaq(isOpen ? -1 : i)}
                                    >
                                        <span>{item.q}</span>
                                        <i className="asf-faq__icon" aria-hidden="true" />
                                    </button>
                                    <div className="asf-faq__a" role="region">
                                        <div className="asf-faq__a-inner">
                                            <p>{item.a}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Related services */}
                <div className="wrapper asf-related" data-reveal>
                    <header className="asf-head asf-head--split">
                        <div>
                            <p className="asf-eyebrow">Explore More</p>
                            <h2 className="asf-title">Related <em>services.</em></h2>
                        </div>
                    </header>
                    <div className="asf-related__grid">
                        {relatedServices.map((s) => (
                            <a className="asf-related__card" href="/services" key={s.title}>
                                <h3>{s.title}</h3>
                                <p>{s.desc}</p>
                                <span className="asf-related__cta">
                                    Learn more <i aria-hidden="true">→</i>
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ CTA ============ */}
            <section id="contact" className="asf-cta">
                <div className="wrapper asf-cta__inner" data-reveal>
                    <p className="asf-eyebrow asf-eyebrow--center">Get Started</p>
                    <h2 className="asf-title">
                        Ready to build a court that <em>plays as good as it looks?</em>
                    </h2>
                    <p>
                        Contact {companyName} today for a free consultation and a clear, itemised
                        quote for your acrylic sports flooring project.
                    </p>
                    <div className="asf-cta__actions">
                        <a href="/contact" className="asf-btn asf-btn--gold">Request a consultation</a>
                        <a href="/services" className="asf-btn asf-btn--ghost">Browse all services</a>
                    </div>
                </div>
            </section>

            {/* ============ LIGHTBOX ============ */}
            {lightbox !== null && (
                <div
                    className="asf-lightbox"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image viewer"
                    onClick={closeLightbox}
                >
                    <button
                        type="button"
                        className="asf-lightbox__close"
                        onClick={closeLightbox}
                        aria-label="Close viewer"
                    >
                        ×
                    </button>
                    <button
                        type="button"
                        className="asf-lightbox__arrow asf-lightbox__arrow--prev"
                        onClick={(e) => { e.stopPropagation(); stepLightbox(-1); }}
                        aria-label="Previous image"
                    >
                        ‹
                    </button>

                    <figure className="asf-lightbox__figure" onClick={(e) => e.stopPropagation()}>
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
                        className="asf-lightbox__arrow asf-lightbox__arrow--next"
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

export default AcrylicSportsFlooringService;