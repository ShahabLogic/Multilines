import React, { useContext, useEffect, useState, useCallback } from 'react';
import { ConfigContext } from '../../context/ConfigContext';
import '../../styles/servicePage.css';

/* ------------------------------------------------------------------
   DATA
------------------------------------------------------------------ */
const galleryImages = [
    { src: 'https://knoveo.co/wp-content/uploads/2024/08/930a1d4b3d.jpg', alt: 'SBR rubber gym flooring installed' },
    { src: 'https://knoveo.co/wp-content/uploads/2024/08/19405e3ec0.jpg', alt: 'Weight room with rubber flooring' },
    { src: 'https://knoveo.co/wp-content/uploads/2024/08/1b519ec7bb.jpg', alt: 'EPDM colour blend gym surface' },
    { src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=80', alt: 'Commercial fitness centre floor' },
    { src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1400&q=80', alt: 'Free weights area flooring detail' },
    { src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1400&q=80', alt: 'Functional training zone' },
    { src: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=1400&q=80', alt: 'Rubber tile seam close-up' },
    { src: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1400&q=80', alt: 'Home gym with rubber flooring' },
];

const quickFacts = [
    { value: '45%', label: 'Impact absorption' },
    { value: '15+ yr', label: 'Average lifespan' },
    { value: '100%', label: 'Slip resistant' },
    { value: 'Low', label: 'VOC emissions' },
];

const performanceMetrics = [
    { label: 'Force Reduction', rating: 'Excellent', percent: 90, score: '9/10' },
    { label: 'Durability', rating: 'Outstanding', percent: 100, score: '10/10' },
    { label: 'Slip Resistance', rating: 'Outstanding', percent: 95, score: '9.5/10' },
    { label: 'Maintenance', rating: 'Very Low', percent: 30, score: '3/10' },
    { label: 'Abrasion Resistance', rating: 'Excellent', percent: 92, score: '9/10' },
    { label: 'Acoustic Damping', rating: 'Very Good', percent: 80, score: '8/10' },
];

const specifications = [
    { label: 'Material', value: '100% black SBR rubber or SBR + EPDM colour blends' },
    { label: 'Format', value: 'Rolls, tiles, and interlocking puzzle mats' },
    { label: 'Thickness Options', value: '4 mm, 6 mm, 8 mm, 10 mm, 15 mm, 20 mm' },
    { label: 'Surface Finish', value: 'Textured, non-slip, dotted EPDM accents available' },
    { label: 'Base Compatibility', value: 'Concrete, plywood, or existing hard floors' },
    { label: 'Fire Rating', value: 'Tested to standard commercial fire classifications' },
    { label: 'Colour Range', value: 'Solid black plus EPDM colour blends on request' },
    { label: 'Installation', value: 'Loose-lay, adhesive-bonded, or interlocking tiles' },
];

const applications = [
    { title: 'Commercial Gyms', desc: 'High-traffic weight rooms, cardio zones and functional training areas.' },
    { title: 'CrossFit Boxes', desc: 'Extreme impact resistance for dropped barbells and plyometric work.' },
    { title: 'Home Gyms', desc: 'Compact, easy-to-install tiles and rolls for garage and basement setups.' },
    { title: 'Fitness Studios', desc: 'Quiet, low-vibration surfacing for yoga, pilates and group classes.' },
    { title: 'Sports Halls', desc: 'Multi-use rubber flooring for indoor courts and training areas.' },
    { title: 'Hotel & Resort Gyms', desc: 'Aesthetic rubber surfaces with EPDM colour accents that match interiors.' },
];

const processSteps = [
    { step: '01', title: 'Site Assessment', desc: 'We measure the space, check the substrate, and confirm thickness and format requirements.' },
    { step: '02', title: 'Subfloor Preparation', desc: 'Cleaning, levelling and moisture-testing the base so the rubber sits perfectly flat.' },
    { step: '03', title: 'Material Selection', desc: 'Choose from SBR, EPDM blends, tile sizes and thicknesses to fit each zone.' },
    { step: '04', title: 'Installation', desc: 'Loose-lay, adhesive-bonded or interlocking tiles installed with precise seam alignment.' },
    { step: '05', title: 'Trim & Handover', desc: 'Edge trims, transitions and a final inspection before the space is ready to use.' },
];

const faqs = [
    { q: 'What is the difference between SBR and EPDM gym flooring?', a: 'SBR is a tough, economical black rubber made from recycled tyres — ideal for high-impact weight zones. EPDM is a coloured, UV-stable virgin rubber used for decorative accents and colour blends. Most premium gyms combine both.' },
    { q: 'How thick should gym flooring be?', a: 'For general fitness areas, 6–8 mm is sufficient. For free weights and CrossFit zones, 15–20 mm is recommended to absorb impact from dropped barbells.' },
    { q: 'Can it be installed over my existing floor?', a: 'Yes. In most cases SBR gym flooring can go directly over a level concrete or plywood subfloor. We confirm suitability during the site survey.' },
    { q: 'Is the flooring easy to clean?', a: 'Very. Routine sweeping and damp mopping is usually enough. The non-porous surface resists sweat, chalk and most cleaning chemicals.' },
    { q: 'Does it reduce noise and vibration?', a: 'Yes. Rubber gym flooring significantly dampens impact noise and vibration from dropped weights, treadmills and other equipment.' },
    { q: 'How long does installation take?', a: 'Most commercial gym floors are completed within 2–4 days depending on total area, format and access. Home gyms can often be finished in a single day.' },
];

const relatedServices = [
    { title: 'Acrylic Sports Flooring', desc: 'Seamless acrylic court systems for tennis, basketball and multi-sport use.' },
    { title: 'EPDM Running Tracks', desc: 'High-performance rubber track systems for athletics and schools.' },
    { title: 'Synthetic Turf', desc: 'Durable artificial grass systems for multi-sport fields and recreational areas.' },
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
const GymFlooringService = () => {
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
                    <p className="svc-eyebrow">Services · Fitness Surfaces</p>
                    <h1>
                        Gym <em>Flooring</em>
                    </h1>
                    <p className="svc-hero__lede">
                        High-performance SBR rubber and EPDM gym flooring engineered for dropped
                        weights, high foot traffic and moisture — durable enough for commercial
                        facilities, beautiful enough for premium studios.
                    </p>

                    <div className="svc-hero__actions">
                        <a href="#contact" className="svc-btn svc-btn--gold">Request a gym survey</a>
                        <a href="#gallery" className="svc-btn svc-btn--ghost">View completed gyms</a>
                    </div>

                    <nav className="svc-crumbs" aria-label="Breadcrumb">
                        <a href="/">Home</a>
                        <span aria-hidden="true">›</span>
                        <a href="/services">Services</a>
                        <span aria-hidden="true">›</span>
                        <span className="svc-crumbs__current">Gym Flooring</span>
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
                            Built for the <em>heaviest sessions.</em>
                        </h2>
                        <p>
                            Rubber flooring is a versatile, durable and slip-resistant solution ideal
                            for gyms, fitness centres and high-traffic areas. Its resilience to heavy
                            impact and wear makes it perfect for both commercial and home gym
                            environments.
                        </p>
                        <p>
                            At {companyName}, we specialise in providing SBR Gym Flooring designed to
                            meet the demands of professional fitness facilities. Resistant to dropped
                            weights, high foot traffic and moisture, our hard-wearing flooring ensures
                            a safe and long-lasting surface for intense workouts. Available in 100%
                            black SBR rubber and vibrant EPDM colour blends, our flooring solutions
                            are tailored to enhance your gym's aesthetic while delivering unparalleled
                            performance.
                        </p>
                        <p>
                            {companyName} SBR Rubber Gym Flooring material is extremely tough, making it
                            more resistant to vibrations, abrasion and tearing. Its extreme strength
                            also allows it to withstand repetitive force impact, such as when dropping
                            weights and dumbbells.
                        </p>
                        <p>
                            Dotted with sprinkled accents, {companyName} Gym Flooring adapts to various
                            decorative requirements. It is possible to extend the options by combining
                            different colours to create an arrangement with a strong visual appeal and
                            impact.
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
                        <h2 className="svc-title">Gyms finished <em>for the long haul.</em></h2>
                        <p className="svc-lede">
                            A selection of completed installations — commercial weight rooms, CrossFit
                            boxes and home gyms.
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
                            <h2 className="svc-title">Engineered for <em>every drop.</em></h2>
                        </div>
                        <p className="svc-lede">
                            Every SBR and EPDM layer is formulated to deliver measurable performance —
                            from force reduction to acoustic damping and long-term colour retention.
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
                            represent our standard SBR and EPDM gym flooring systems.
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
                        <h2 className="svc-title">One surface, <em>every training style.</em></h2>
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
                        <h2 className="svc-title">From bare slab to <em>ready to lift.</em></h2>
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
                        Ready to build a gym floor that <em>takes a beating?</em>
                    </h2>
                    <p>
                        Contact {companyName} today for a free consultation and a clear, itemised
                        quote for your gym flooring project.
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

export default GymFlooringService;