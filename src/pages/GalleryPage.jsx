import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiX, FiChevronLeft, FiChevronRight, FiZoomIn, FiArrowUpRight, FiGrid, FiLayers } from 'react-icons/fi';

/* ── Image catalogue ─────────────────────────────────────────── */
const galleryImages = [
  { src: '/images/gallery/138473436_226829195647945_7606773812209404996_n.jpg', span: 'wide', label: 'Project installation' },
  { src: '/images/gallery/139226753_226157115715153_7528985794792746339_n.jpg', span: 'normal', label: 'Floor surface' },
  { src: '/images/gallery/157929689_254550746209123_840470792967931003_n.jpg', span: 'normal', label: 'Coating work' },
  { src: '/images/gallery/160296703_258868109110720_1294123937405277363_n.jpg', span: 'tall', label: 'Application detail' },
  { src: '/images/gallery/160500754_258868052444059_725991327531615463_n.jpg', span: 'normal', label: 'Court surface' },
  { src: '/images/gallery/207535323_323177299346467_8327527553968997063_n.jpg', span: 'wide', label: 'Site overview' },
  { src: '/images/gallery/472715206_1110570757273780_1987051295558583664_n.jpg', span: 'normal', label: 'Recent project' },
  { src: '/images/gallery/473037711_1109848360679353_8719798132673126580_n.jpg', span: 'normal', label: 'Sports court' },
  { src: '/images/gallery/490710726_1230685565730901_8402617556087578048_n.jpg', span: 'tall', label: 'Flooring system' },
  { src: '/images/gallery/490823179_1236054668527324_7628931044510625509_n.jpg', span: 'wide', label: 'Surface finish' },
  { src: '/images/gallery/491556068_1236034361862688_2775266643686165892_n.jpg', span: 'normal', label: 'Coating detail' },
  { src: '/images/gallery/491998967_1243052287827562_2861375905525505996_n.jpg', span: 'normal', label: 'Installation' },
  { src: '/images/gallery/492002846_1242391027893688_4643945501467639607_n.jpg', span: 'normal', label: 'Floor design' },
  { src: '/images/gallery/492120106_1243498517782939_3058602397724820343_n.jpg', span: 'wide', label: 'Court marking' },
  { src: '/images/gallery/492195250_1242391094560348_7482032272343878377_n.jpg', span: 'tall', label: 'Site work' },
  { src: '/images/gallery/492605556_1243498477782943_5308465474519367762_n.jpg', span: 'normal', label: 'Resin floor' },
  { src: '/images/gallery/493556435_1247951977337593_8412999547934162726_n.jpg', span: 'normal', label: 'Surface texture' },
  { src: '/images/gallery/493706384_1246339554165502_5633319597710166254_n.jpg', span: 'wide', label: 'Outdoor court' },
  { src: '/images/gallery/749330040_1668807811918672_4058649805619479008_n.jpg', span: 'normal', label: 'Project finish' },
  { src: '/images/gallery/749330092_1667692352030218_7367124533794303639_n.jpg', span: 'tall', label: 'Court surface' },
  { src: '/images/gallery/751071335_1670759598390160_5205643614962188936_n.jpg', span: 'normal', label: 'Installation work' },
  { src: '/images/gallery/751643131_1667687318697388_2157820621030422451_n.jpg', span: 'normal', label: 'Floor coating' },
  { src: '/images/gallery/753267066_1670452161754237_5244671406231355593_n.jpg', span: 'wide', label: 'Site completion' },
  { src: '/images/gallery/755228492_1670766145056172_1829619901702798230_n.jpg', span: 'normal', label: 'Sports surface' },
  { src: '/images/gallery/756525566_1672443518221768_1872788740938167713_n (1).jpg', span: 'normal', label: 'Court markings' },
  { src: '/images/gallery/759199775_1676832667782853_1655715725912221930_n.jpg', span: 'tall', label: 'Finished floor' },
  { src: '/images/gallery/764855168_1683036130495840_268628298850771745_n.jpg', span: 'wide', label: 'Project reference' },
  { src: '/images/gallery/766304832_1685470280252425_7689038677921959654_n.jpg', span: 'normal', label: 'Application photo' },
  { src: '/images/gallery/767190349_1688682683264518_6041133007089221832_n.jpg', span: 'normal', label: 'Coating system' },
  { src: '/images/gallery/769324448_1690804279719025_7743151136671284679_n.jpg', span: 'wide', label: 'Surface close-up' },
  { src: '/images/gallery/93841623_117812443216288_101288557338951680_n.jpg', span: 'normal', label: 'Early work' },
  { src: '/images/gallery/94213614_120933569570842_8061047096490328064_n.jpg', span: 'normal', label: 'Floor preparation' },
  { src: '/images/gallery/94612989_119105953086937_4357803565188644864_n.jpg', span: 'tall', label: 'Resin detail' },
  { src: '/images/gallery/94687768_119981812999351_362691871975145472_n.jpg', span: 'normal', label: 'Finished surface' },
];

function GalleryLightbox({ images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div className="glb-overlay" onClick={(e) => e.target === e.currentTarget && onClose()} role="dialog" aria-modal="true" aria-label="Image lightbox">
      <button className="glb-close" onClick={onClose} aria-label="Close"><FiX /></button>
      <button className="glb-arrow glb-arrow--left" onClick={onPrev} aria-label="Previous"><FiChevronLeft /></button>
      <div className="glb-content">
        <img src={images[index].src} alt={images[index].label} className="glb-img" />
        <div className="glb-caption">
          <span>{images[index].label}</span>
          <span className="glb-counter">{index + 1} / {images.length}</span>
        </div>
      </div>
      <button className="glb-arrow glb-arrow--right" onClick={onNext} aria-label="Next"><FiChevronRight /></button>
    </div>
  );
}

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const open = useCallback((i) => setLightboxIndex(i), []);
  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => setLightboxIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length), []);
  const next = useCallback(() => setLightboxIndex((i) => (i + 1) % galleryImages.length), []);

  return (
    <main className="gallery-page">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="glp-hero">
        <div className="glp-hero__bg">
          <img src="/images/gallery/753267066_1670452161754237_5244671406231355593_n.jpg" alt="" aria-hidden="true" />
          <div className="glp-hero__gradient" />
        </div>
        <div className="container glp-hero__inner">
          <div className="glp-hero__breadcrumb"><Link to="/">Home</Link><span>/</span><span>Gallery</span></div>
          <p className="glp-hero__eyebrow"><FiGrid /> OUR WORK · SURFACE GALLERY</p>
          <h1 className="glp-hero__title">Every surface<br /><em>tells a story.</em></h1>
          <p className="glp-hero__sub">Browse real photos from our installations — epoxy floors, sports courts, running tracks, and protective coatings — all applied by our team across Pakistan.</p>
          <div className="glp-hero__actions">
            <Link to="/contact" className="button button--accent">Start your project <FiArrowUpRight /></Link>
            <Link to="/projects" className="glp-hero__alt-link">View Projects <FiArrowUpRight /></Link>
          </div>
          <div className="glp-hero__stats">
            <div><strong>60+</strong><span>Photos</span></div>
            <div><strong>100+</strong><span>Projects</span></div>
            <div><strong>15+</strong><span>Years</span></div>
          </div>
        </div>
      </section>

      {/* ── Masonry Grid ─────────────────────────────────────────── */}
      <section className="glp-grid-section">
        <div className="container">
          <div className="glp-section-header">
            <div>
              <p className="glp-eyebrow"><FiLayers /> SURFACE GALLERY</p>
              <h2 className="glp-section-title">Real work.<br /><em>Real results.</em></h2>
            </div>
            <p className="glp-section-desc">Each photo captures the precision and quality we bring to every project. Click any image to explore it in full.</p>
          </div>
          <div className="glp-masonry">
            {galleryImages.map((img, i) => (
              <button
                key={img.src}
                className={`glp-tile glp-tile--${img.span}`}
                onClick={() => open(i)}
                aria-label={`View photo: ${img.label}`}
                type="button"
              >
                <img src={img.src} alt={img.label} loading="lazy" />
                <div className="glp-tile__overlay">
                  <FiZoomIn className="glp-tile__zoom" />
                  <span className="glp-tile__label">{img.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="glp-cta">
        <div className="container glp-cta__inner">
          <div>
            <h2>Ready to transform<br /><em>your space?</em></h2>
            <p>From industrial floors to sports courts, we deliver surfaces built to last.</p>
          </div>
          <div className="glp-cta__actions">
            <Link to="/contact" className="button button--light">Request a free survey <FiArrowUpRight /></Link>
            <Link to="/projects" className="glp-cta__secondary">See completed projects <FiArrowUpRight /></Link>
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <GalleryLightbox images={galleryImages} index={lightboxIndex} onClose={close} onPrev={prev} onNext={next} />
      )}
    </main>
  );
}
