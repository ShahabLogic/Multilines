import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiChevronLeft, FiChevronRight, FiX, FiZoomIn, FiCamera } from 'react-icons/fi';

const projectImages = [
  { src: '/images/projects/129630419_199520691712129_3634453926784757723_n.jpg',  label: 'Flooring project installation',   category: 'Flooring' },
  { src: '/images/projects/129979646_199520508378814_2306330965378185821_n.jpg',  label: 'Surface preparation work',        category: 'Preparation' },
  { src: '/images/projects/139657244_225619095768955_7729929713011800627_n.jpg',  label: 'Completed resin floor',           category: 'Flooring' },
  { src: '/images/projects/139986355_225619092435622_222913958513365386_n.jpg',   label: 'Coating application',             category: 'Flooring' },
  { src: '/images/projects/140036385_225610949103103_3970295486630304988_n.jpg',  label: 'Project site overview',           category: 'Site' },
  { src: '/images/projects/149016264_242399017424296_7745133879021267945_n.jpg',  label: 'Floor installation detail',       category: 'Flooring' },
  { src: '/images/projects/149724167_242399004090964_876500959364563657_n.jpg',   label: 'Industrial floor surface',        category: 'Industrial' },
  { src: '/images/projects/149852910_241767484154116_4225723873362978298_n.jpg',  label: 'Seamless coating finish',         category: 'Flooring' },
  { src: '/images/projects/150134645_241767477487450_4802727211642718034_n.jpg',  label: 'Surface texture detail',          category: 'Flooring' },
  { src: '/images/projects/150408441_241767480820783_6452618882395085604_n.jpg',  label: 'Completed project',               category: 'Site' },
  { src: '/images/projects/482059114_1198189095647215_5553565269521027189_n.jpg', label: 'Sports court installation',       category: 'Sports' },
  { src: '/images/projects/489987430_1229670559165735_3689474475460943011_n.jpg', label: 'Court marking and lines',         category: 'Sports' },
  { src: '/images/projects/490142773_1230685682397556_8399292662101284777_n.jpg', label: 'Outdoor sports surface',          category: 'Sports' },
  { src: '/images/projects/490235597_1229670632499061_6106977580366082924_n.jpg', label: 'Court colour application',        category: 'Sports' },
  { src: '/images/projects/490297283_1229670665832391_1427835776583430237_n.jpg', label: 'Court layout overview',           category: 'Sports' },
  { src: '/images/projects/490471022_1229670519165739_5286301038449740840_n.jpg', label: 'Surface application progress',    category: 'Flooring' },
  { src: '/images/projects/490570424_1229670655832392_1536126022276090621_n.jpg', label: 'Basketball court markings',       category: 'Sports' },
  { src: '/images/projects/490776819_1230685665730891_8492589139342378917_n.jpg', label: 'Completed sports facility',       category: 'Sports' },
  { src: '/images/projects/492517459_1245853564214101_7776406751143090716_n.jpg', label: 'Industrial flooring project',     category: 'Industrial' },
  { src: '/images/projects/492696592_1245853877547403_3242108149821157621_n.jpg', label: 'Epoxy floor detail',              category: 'Flooring' },
  { src: '/images/projects/493312766_1246314020834722_6881818508168744929_n.jpg', label: 'Site completion photo',           category: 'Site' },
  { src: '/images/projects/493330809_1246314007501390_5920210529529358215_n.jpg', label: 'Floor installation complete',     category: 'Flooring' },
  { src: '/images/projects/493535085_1246314010834723_3251019412779944959_n.jpg', label: 'Protective coating application',  category: 'Protection' },
  { src: '/images/projects/493731422_1245853810880743_5121339361677367971_n.jpg', label: 'Surface quality check',           category: 'Flooring' },
  { src: '/images/projects/493844049_1248403503959107_5711786868958642903_n.jpg', label: 'Finished project handover',       category: 'Site' },
  { src: '/images/projects/756525566_1672443518221768_1872788740938167713_n.jpg', label: 'Recent sports court project',     category: 'Sports' },
];

const CATS = ['All', 'Flooring', 'Sports', 'Industrial', 'Protection', 'Site', 'Preparation'];

/* span pattern cycles: wide / normal / normal / tall / normal / wide / normal / tall … */
const SPAN_PATTERN = ['wide', 'normal', 'normal', 'tall', 'normal', 'wide', 'tall', 'normal', 'normal', 'wide', 'normal', 'tall'];

function Lightbox({ images, index, onClose, onPrev, onNext }) {
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
    <div className="glb-overlay" onClick={(e) => e.target === e.currentTarget && onClose()} role="dialog" aria-modal="true">
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

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = activeFilter === 'All' ? projectImages : projectImages.filter((p) => p.category === activeFilter);
  const open = useCallback((i) => setLightboxIndex(i), []);
  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => setLightboxIndex((i) => (i - 1 + filtered.length) % filtered.length), [filtered.length]);
  const next = useCallback(() => setLightboxIndex((i) => (i + 1) % filtered.length), [filtered.length]);

  return (
    <main className="prj-page">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="prj-hero">
        <div className="prj-hero__mosaic">
          {[projectImages[12], projectImages[16], projectImages[18], projectImages[2], projectImages[9]].map((img) => (
            <div className="prj-hero__mosaic-cell" key={img.src}>
              <img src={img.src} alt="" aria-hidden="true" />
            </div>
          ))}
          <div className="prj-hero__mosaic-overlay" />
        </div>
        <div className="container prj-hero__inner">
          <div className="prj-hero__breadcrumb"><Link to="/">Home</Link><span>/</span><span>Projects</span></div>
          <p className="prj-hero__eyebrow"><FiCamera /> COMPLETED PROJECTS</p>
          <h1 className="prj-hero__title">Work that<br /><em>speaks for itself.</em></h1>
          <p className="prj-hero__sub">From industrial warehouses to world-class sports courts — browse our portfolio of completed installations across Pakistan.</p>
          <div className="prj-hero__actions">
            <Link to="/contact" className="button button--accent">Get a free quote <FiArrowUpRight /></Link>
            <Link to="/gallery" className="prj-hero__alt">Browse Gallery <FiArrowUpRight /></Link>
          </div>
          <div className="prj-hero__chips">
            <span>Epoxy & PU</span><span>Sports courts</span><span>Running tracks</span><span>Waterproofing</span>
          </div>
        </div>
      </section>

      {/* ── Filter Bar ────────────────────────────────────────── */}
      <section className="prj-grid-section">
        <div className="container">
          <div className="prj-header">
            <div>
              <h2 className="prj-section-title">Our<br /><em>projects.</em></h2>
              <p className="prj-section-desc">Real installations by our team. Click any photo to view it in full detail.</p>
            </div>
            <div className="prj-filters" role="group" aria-label="Filter projects by category">
              {CATS.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`prj-filter-btn${activeFilter === cat ? ' is-active' : ''}`}
                  onClick={() => { setActiveFilter(cat); setLightboxIndex(null); }}
                  aria-pressed={activeFilter === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* ── Premium grid ─── */}
          <div className="prj-grid">
            {filtered.map((item, i) => {
              const span = SPAN_PATTERN[i % SPAN_PATTERN.length];
              return (
                <button
                  key={item.src}
                  type="button"
                  className={`prj-tile prj-tile--${span}`}
                  onClick={() => open(i)}
                  aria-label={`View: ${item.label}`}
                >
                  <img src={item.src} alt={item.label} loading="lazy" />
                  <div className="prj-tile__overlay">
                    <span className="prj-tile__cat">{item.category}</span>
                    <span className="prj-tile__label">{item.label}</span>
                    <FiZoomIn className="prj-tile__zoom" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="prj-cta">
        <div className="container prj-cta__inner">
          <div>
            <h2>Your project could be<br /><em>next.</em></h2>
            <p>Let's discuss your requirements and build something exceptional.</p>
          </div>
          <div className="prj-cta__btns">
            <Link to="/contact" className="button button--light">Request a site survey <FiArrowUpRight /></Link>
            <Link to="/gallery" className="prj-cta__link">View full gallery <FiArrowUpRight /></Link>
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox images={filtered} index={lightboxIndex} onClose={close} onPrev={prev} onNext={next} />
      )}
    </main>
  );
}
