import React, { useContext, useEffect, useState, useCallback } from 'react';
import { ConfigContext } from '../../context/ConfigContext';
import '../../styles/servicePage.css';

/* ------------------------------------------------------------------
   DATA
------------------------------------------------------------------ */
const galleryImages = [
    { src: 'https://knoveo.co/wp-content/uploads/2025/01/banner.jpg', alt: 'EPDM running track surface' },
    { src: 'https://knoveo.co/wp-content/uploads/2025/01/background-running-track.jpg', alt: 'Athlete running on EPDM track' },
    { src: '/wp-content/uploads/2024/09/Picture62.png', alt: 'EPDM rubber granules detail' },
    { src: '/wp-content/uploads/2024/09/Picture61.png', alt: 'Finished EPDM running track lane' },
    { src: '/wp-content/uploads/2024/09/Picture60.png', alt: 'Outdoor EPDM track colour coating' },
    { src: '/wp-content/uploads/2024/09/Picture59.jpg', alt: 'EPDM track line marking' },
    { src: '/wp-content/uploads/2024/09/Picture58.jpg', alt: 'Close-up of rubber surface texture' },
    { src: '/wp-content/uploads/2024/09/Picture57.png', alt: 'Curved EPDM running track section' },
];

const quickFacts = [
    { value: 'IAAF', label: 'Certified' },
    { value: '10+ yr', label: 'Lifespan' },
    { value: '100%', label: 'Weatherproof' },
    { value: 'High', label: 'Energy Return' },
];

const performanceMetrics = [
    { label: 'Shock Absorption', rating: 'High', percent: 80, score: '8/10' },
    { label: 'Slip Resistance', rating: 'Outstanding', percent: 90, score: '9/10' },
    { label: 'Weather Resistance', rating: 'Excellent', percent: 100, score: '10/10' },
    { label: 'Energy Return', rating: 'High', percent: 85, score: '8.5/10' },
    { label: 'Colour Retention', rating: 'Excellent', percent: 95, score: '9.5/10' },
    { label: 'Impact Durability', rating: 'Outstanding', percent: 92, score: '9/10' },
];

const specifications = [
    { label: 'Material', value: 'EPDM (Ethylene Propylene Diene Monomer) rubber granules' },
    { label: 'System Types', value: 'Full-pour, sandwich, and spray-coat systems available' },
    { label: 'Thickness Options', value: '9 mm, 13 mm, and 15 mm competition standards' },
    { label: 'Granule Size', value: '1–4 mm graded for grip and drainage' },
    { label: 'Base Compatibility', value: 'Asphalt, concrete, or approved synthetic base' },
    { label: 'UV Stability', value: 'Colour-fast pigments rated for sustained sun exposure' },
    { label: 'Standards', value: 'IAAF / World Athletics compliant systems available' },
    { label: 'Colour Range', value: 'Standard reds and blues plus full custom palette' },
];

const applications = [
    { title: 'Athletics Tracks', desc: 'IAAF-rated surfaces engineered for competitive sprint, hurdle and distance events.' },
    { title: 'School Sports Tracks', desc: 'Durable, low-maintenance running lanes built for daily student use.' },
    { title: 'Recreational Jogging Paths', desc: 'Comfortable shock-absorbing paths for parks and residential communities.' },
    { title: 'Fitness Trails', desc: 'Weatherproof surfaces for outdoor fitness circuits and warm-up areas.' },
    { title: 'Warm-Up Areas', desc: 'Training-grade zones beside main tracks for athletes to prepare.' },
    { title: 'Multi-Sport Complexes', desc: 'EPDM lanes integrated alongside courts and field facilities.' },
];

const processSteps = [
    { step: '01', title: 'Site Assessment', desc: 'We inspect the base, drainage, slope and existing surface to confirm it meets EPDM specification.' },
    { step: '02', title: 'Base Preparation', desc: 'Cleaning, crack repair and priming of the substrate so the rubber system bonds correctly.' },
    { step: '03', title: 'Rubber Base Layer', desc: 'A resilient base layer of bonded EPDM granules is laid for shock absorption and stability.' },
    { step: '04', title: 'Top Wear Layer', desc: 'A coloured, UV-stable EPDM wear layer is applied for grip, aesthetics and durability.' },
    { step: '05', title: 'Line Marking & Handover', desc: 'Lane lines and markings are precision-installed and the track is checked before handover.' },
];

const faqs = [
    { q: 'How long does an EPDM running track last?', a: 'With proper installation and routine care, a well-maintained EPDM running track typically performs for 10 or more years before a surface refresh is needed.' },
    { q: 'Can EPDM tracks be installed over an existing surface?', a: 'Yes, in most cases EPDM can be laid over sound asphalt or concrete after inspection and any necessary repairs are completed.' },
    { q: 'Is EPDM suitable for all weather conditions?', a: 'Yes. EPDM is inherently UV-stable and water-resistant, and remains playable across a wide range of climates, from hot summers to wet seasons.' },
    { q: 'What thickness should I choose for a running track?', a: 'Thickness depends on use. 9 mm suits general training, 13 mm is standard for competitions, and 15 mm is preferred for high-performance athletics.' },
    { q: 'How much maintenance does an EPDM track need?', a: 'Maintenance is minimal — routine sweeping, occasional washing and periodic inspection for debris or drainage issues are generally sufficient.' },
];

const relatedServices = [
    { title: 'Acrylic Sports Flooring', desc: 'Seamless acrylic court systems for tennis, basketball and multi-sport use.' },
    { title: 'Synthetic Turf', desc: 'Durable artificial grass systems for multi-sport fields and recreational areas.' },
    { title: 'Rubber Sports Flooring', desc: 'Impact-absorbing rubber surfacing for gyms, playgrounds and fitness areas.' },
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
const EpdmRunningTracksService = () => {
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
                    <img src={galleryImages[0].src} alt="" aria-hidden="true" />
                </div>
                <div className="svc-hero__scrim" />

                <div className="svc-hero__inner svc-wrapper">
                    <p className="svc-eyebrow">Services · Athletics Surfaces</p>
                    <h1>
                        EPDM Running <em>Tracks</em>
                    </h1>
                    <p className="svc-hero__lede">
                        High-performance EPDM rubber track systems engineered for durability, impact
                        resistance and all-weather play — from school lanes to IAAF-certified
                        athletics venues.
                    </p>

                    <div className="svc-hero__actions">
                        <a href="#contact" className="svc-btn svc-btn--gold">Request a track survey</a>
                        <a href="#gallery" className="svc-btn svc-btn--ghost">View completed tracks</a>
                    </div>

                    <nav className="svc-crumbs" aria-label="Breadcrumb">
                        <a href="/">Home</a>
                        <span aria-hidden="true">›</span>
                        <a href="/services">Services</a>
                        <span aria-hidden="true">›</span>
                        <span className="svc-crumbs__current">EPDM Running Tracks</span>
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
                            Rubber engineered for <em>every stride.</em>
                        </h2>
                        <p>
                            EPDM (Ethylene Propylene Diene Monomer) flooring is a high-performance
                            rubber flooring solution commonly used in EPDM running tracks. It is
                            recognised for its durability, impact resistance and weather resistance.
                            EPDM rubber flooring is made of a synthetic compound that resists weather
                            patterns and environmental challenges while providing safety and comfort
                            for users. This versatile flooring solution can be used in both indoor and
                            outdoor running tracks because of its exceptional impact resistance.
                        </p>
                        <p>
                            At {companyName}, we provide the best quality customised EPDM flooring
                            solutions, vibrant colour options and the use of top-quality materials. Our
                            flooring systems meet international safety and performance standards which
                            guarantee a superior and long-lasting surface. EPDM running tracks put the
                            issue of sleek application and low upkeep to bed as the most cost-effective
                            sports facilities, schools and recreational areas enjoy a long-time
                            experience.
                        </p>
                        <p>
                            Every track is manufactured using high-quality rubber granules for longer
                            durability, and the improved friction of the surface ensures safety while
                            preventing slips and accidents even in wet places.
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
                        <h2 className="svc-title">Tracks built to <em>perform.</em></h2>
                        <p className="svc-lede">
                            Completed EPDM installations — indoor and outdoor, school and competition
                            grade.
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
                            <h2 className="svc-title">Scientifically <em>tuned for athletes.</em></h2>
                        </div>
                        <p className="svc-lede">
                            Every EPDM layer is formulated to deliver measurable performance — from
                            shock absorption to energy return and long-term colour retention.
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
                            represent our standard EPDM track system.
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
                        <h2 className="svc-title">One surface, <em>every venue.</em></h2>
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
                        <h2 className="svc-title">From bare base to <em>ready to run.</em></h2>
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
                        Ready to build a track that <em>performs for years?</em>
                    </h2>
                    <p>
                        Contact {companyName} today for a free consultation and a clear, itemised
                        quote for your EPDM running track project.
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

export default EpdmRunningTracksService;