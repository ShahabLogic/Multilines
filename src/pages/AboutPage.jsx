import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiCheck, FiLayers, FiMapPin, FiTarget, FiTool } from 'react-icons/fi';
import { useSite } from '../context/SiteContext';

const values = [
  { icon: <FiTarget />, title: 'Specify for the space', text: 'The right system depends on the substrate, traffic, exposure and cleaning routine—not a one-size-fits-all promise.' },
  { icon: <FiLayers />, title: 'Think in complete systems', text: 'Preparation, repair, primer, coating and detailing are considered together for a more dependable finish.' },
  { icon: <FiTool />, title: 'Stay close to the work', text: 'Clear communication, realistic planning and care at handover are part of the service.' }
];

export default function AboutPage() {
  const { settings } = useSite();
  return (
    <main className="inner-page about-page">
      <section className="page-hero page-hero--about">
        <div className="container page-hero__grid">
          <div className="page-hero__copy"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>About</span></div><p className="eyebrow">WHO WE ARE · LAHORE, PAKISTAN</p><h1>Surface work,<br /><em>done with intent.</em></h1><p>Multilines Coating Solutions is a specialist contractor for industrial and commercial floors, sports surfaces, concrete repair and protective coatings.</p><div className="page-hero__actions"><Link to="/contact" className="button button--accent">Start a conversation <FiArrowUpRight /></Link><span className="location-chip"><FiMapPin /> {settings.address}</span></div></div>
          <div className="page-hero__visual"><img src="/images/services/warehouse-steel.jpg" alt="A clean coated floor inside an industrial facility" /><div className="page-hero__visual-card"><span>OUR POINT OF VIEW</span><strong>The surface should fit<br />the way the space works.</strong></div></div>
        </div>
      </section>

      <section className="section about-statement" data-reveal><div className="container about-statement__grid"><div className="section-index"><span>01</span><i /> OUR PURPOSE</div><div className="about-statement__body"><h2>From concrete to<br /><em>the final coat.</em></h2><p className="lead-paragraph">We help businesses and institutions create surfaces that are easier to maintain, ready for everyday use and specified with the needs of the site in mind.</p><p>Whether it is a seamless floor in a production area, a new court for a school or repairs to a weathered concrete slab, the same questions matter: what is the substrate, what will it face and what does a successful handover look like? Our work connects those answers to an appropriate material system and a carefully planned installation.</p><figure className="about-statement__photo"><img src="/images/service-references/concrete-floor-repair-reference.webp" alt="Illustrative reference of a prepared concrete floor ready for a protective surface system" loading="lazy" /><figcaption>CONCRETE PREPARATION / FINISHING REFERENCE</figcaption></figure></div></div></section>

      <section className="section about-values" data-reveal><div className="container"><div className="section-heading-row"><div><div className="section-index"><span>02</span><i /> OUR APPROACH</div><h2>Practical thinking.<br /><em>Technical detail.</em></h2></div><p>High-quality coating work is built in the details—especially the parts you stop noticing once the project is finished.</p></div><div className="values-grid">{values.map((item, index) => <article className="value-card" key={item.title}><span className="value-card__index">0{index + 1}</span><div className="value-card__icon">{item.icon}</div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div></section>

      <section className="section about-jotun" data-reveal><div className="container about-jotun__grid"><div className="about-jotun__image"><img src="/images/services/roller-closeup.jpg" alt="Close-up of a resin floor coating being applied" loading="lazy" /><span className="image-caption">SURFACE PREPARATION / APPLICATION</span></div><div className="about-jotun__copy"><div className="section-index"><span>03</span><i /> MATERIAL PARTNERSHIP</div><p className="eyebrow">JOTUN · JOTAFLOOR®</p><h2>A product system<br /><em>with a purpose.</em></h2><p>Multilines Coating Solutions works with Jotun Jotafloor® epoxy and polyurethane flooring systems. Product selection is matched to the project brief and supported by the applicable technical information from the manufacturer.</p><ul className="check-list"><li><FiCheck /> Epoxy and polyurethane floor systems</li><li><FiCheck /> System selection for the operating environment</li><li><FiCheck /> Surface preparation and application planning</li></ul><Link to="/systems" className="text-link text-link--dark">Explore our systems <FiArrowUpRight /></Link></div></div></section>

      <section className="section about-scope" data-reveal><div className="container about-scope__inner"><div><div className="section-index section-index--light"><span>04</span><i /> WHAT WE COVER</div><h2>One conversation.<br /><em>More than one surface.</em></h2><p>We coordinate connected scopes—from repairing concrete and applying a seamless coating to installing sports surfacing and court markings.</p></div><div className="about-scope__list"><Link to="/services/epoxy-flooring"><span>01</span> Epoxy & PU flooring <FiArrowUpRight /></Link><Link to="/services/sports-flooring"><span>02</span> Sports courts & tracks <FiArrowUpRight /></Link><Link to="/services/concrete-repair-maintenance"><span>03</span> Concrete repair <FiArrowUpRight /></Link><Link to="/services/waterproofing-coatings"><span>04</span> Waterproof & protective coatings <FiArrowUpRight /></Link></div></div></section>
    </main>
  );
}
