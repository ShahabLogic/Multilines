import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowRight, FiArrowUpRight, FiCheck, FiChevronDown, FiMapPin, FiShield } from 'react-icons/fi';
import { getService, services } from '../data/services';
import { useSite } from '../context/SiteContext';
import ServiceCard from '../components/ServiceCard';

const sharedProcess = [
  ['01', 'Survey & assess', 'We look at the substrate, use conditions, access and project constraints before confirming a recommendation.'],
  ['02', 'Prepare the base', 'Preparation and repair are planned as part of the floor system, not treated as an afterthought.'],
  ['03', 'Install the system', 'Compatible materials are applied in a planned sequence, with detailing and cure time considered.'],
  ['04', 'Review & hand over', 'The completed surface is checked and care guidance is shared with the people responsible for it.']
];

function optionPhotoPool(service) {
  const slug = service.slug;
  if (service.group === 'Sports & Recreation') {
    if (/track/.test(slug)) return ['/images/service-references/epdm-running-tracks.webp', '/images/service-references/running-track.webp', '/images/service-references/shock-absorbing-flooring.webp', '/images/service-references/sports-flooring.webp'];
    if (/gym|rubber|shock/.test(slug)) return ['/images/service-references/gym-flooring.webp', '/images/service-references/rubber-gym-flooring.webp', '/images/service-references/rubber-sports-flooring.webp', '/images/service-references/shock-absorbing-flooring.webp'];
    if (/play/.test(slug)) return ['/images/service-references/play-area-flooring.webp', '/images/service-references/rubber-sports-flooring.webp', '/images/service-references/epdm-running-tracks.webp', '/images/service-references/multi-purpose-courts.webp'];
    if (/basketball/.test(slug)) return ['/images/service-references/indoor-basketball.webp', '/images/service-references/outdoor-basketball.webp', '/images/service-references/sports-courts.webp', '/images/service-references/multi-purpose-courts.webp'];
    if (/badminton/.test(slug)) return ['/images/service-references/indoor-badminton.webp', '/images/service-references/pu-sports-flooring.webp', '/images/service-references/indoor-volleyball.webp'];
    if (/futsal/.test(slug)) return ['/images/service-references/indoor-futsal.webp', '/images/service-references/outdoor-futsal.webp', '/images/service-references/sports-flooring.webp', '/images/service-references/multi-purpose-courts.webp'];
    if (/padel|paddle/.test(slug)) return ['/images/service-references/indoor-padel.webp', '/images/service-references/outdoor-padel.webp', '/images/service-references/acrylic-sports-flooring.webp', '/images/service-references/sports-courts.webp'];
    if (/pickleball/.test(slug)) return ['/images/service-references/indoor-pickleball.webp', '/images/service-references/outdoor-pickleball.webp', '/images/service-references/multi-purpose-courts.webp'];
    if (/volleyball/.test(slug)) return ['/images/service-references/indoor-volleyball.webp', '/images/service-references/outdoor-volleyball.webp', '/images/service-references/sports-courts.webp', '/images/service-references/pu-sports-flooring.webp'];
    if (/tennis/.test(slug)) return ['/images/service-references/outdoor-tennis.webp', '/images/service-references/acrylic-sports-flooring.webp', '/images/service-references/sports-courts.webp'];
    if (/acrylic/.test(slug)) return ['/images/service-references/acrylic-sports-flooring.webp', '/images/service-references/outdoor-basketball.webp', '/images/service-references/outdoor-tennis.webp', '/images/service-references/sports-courts.webp'];
    return ['/images/service-references/sports-flooring.webp', '/images/service-references/pu-sports-flooring.webp', '/images/service-references/sports-courts.webp', '/images/service-references/multi-purpose-courts.webp'];
  }
  if (/epoxy/.test(slug)) return ['/images/service-references/industrial-floor-reference.webp', '/images/services/warehouse-application.jpg', '/images/services/gray-matte.jpg', '/images/services/metallic-1.webp', '/images/services/garage-flake-1.jpg'];
  if (/polyurethane|\bpu\b/.test(slug)) return ['/images/services/gray-matte.jpg', '/images/services/food-meat.jpg', '/images/services/food-soybean.jpg', '/images/services/pharma-cleanroom.jpg', '/images/services/worker-roller.jpg'];
  if (/heat|uv/.test(slug)) return ['/images/services/yellow-coat.jpg', '/images/services/car-showroom.webp', '/images/services/warehouse-steel.jpg', '/images/services/roller-closeup.jpg'];
  if (/concrete/.test(slug)) return ['/images/service-references/concrete-floor-repair-reference.webp', '/images/services/concrete-prep.png', '/images/service-references/industrial-floor-reference.webp', '/images/services/warehouse-application.jpg'];
  if (/waterproof/.test(slug)) return ['/images/roof-waterproofing.webp', '/images/service-references/industrial-warehouse-reference.webp', '/images/service-references/concrete-floor-repair-reference.webp', '/images/services/worker-roller.jpg'];
  if (/paint/.test(slug)) return ['/images/services/roller-closeup.jpg', '/images/services/warehouse-steel.jpg', '/images/services/yellow-coat.jpg', '/images/services/concrete-prep.png'];
  return ['/images/service-references/industrial-floor-reference.webp', '/images/services/warehouse-application.jpg', '/images/services/concrete-prep.png', '/images/services/roller-closeup.jpg'];
}

function getOptionPhoto(service, index) {
  if (index === 0) return service.image;
  const pool = [...new Set(optionPhotoPool(service))].filter((image) => image !== service.image);
  const seed = Array.from(service.slug).reduce((sum, character) => sum + character.charCodeAt(0), 0);
  return pool[(seed + index - 1) % pool.length] || service.image;
}

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = getService(slug);
  const { settings } = useSite();
  const [openFaq, setOpenFaq] = useState(0);

  if (!service) return <ServiceNotFound />;

  const related = services.filter((item) => item.group === service.group && item.slug !== service.slug).slice(0, 3);
  const faqs = [
    { question: `How do you select the right ${service.title.toLowerCase()} system?`, answer: `We start with the site and the intended use: substrate condition, traffic or activity, exposure, cleaning, drainage and programme. Those details guide the recommendation. The final specification is confirmed against the relevant product data and project requirements.` },
    { question: 'Can a new system go over an existing surface?', answer: 'Sometimes. The current surface needs to be sound, well-bonded and compatible with the new system. We inspect it and may recommend testing, mechanical preparation or full removal before proceeding.' },
    { question: 'How much site disruption should we plan for?', answer: 'Access, preparation, application sequence and curing requirements all affect the programme. We discuss the operational window during the site review and confirm the product-specific cure guidance before work begins.' },
    { question: 'What information helps you prepare a proposal?', answer: `A location, approximate area, photos of the surface, the type of activity or traffic, and any known issues are a useful starting point. For ${service.title.toLowerCase()}, a site inspection helps confirm the substrate and details.` }
  ];

  return (
    <main className="inner-page service-detail-page">
      <section className="service-detail-hero">
        <div className="container service-detail-hero__grid">
          <div className="service-detail-hero__copy">
            <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/services">Services</Link><span>/</span><span>{service.title}</span></div>
            <p className="eyebrow">{service.eyebrow || service.group}</p>
            <h1>{service.title}<br /><em>specified to perform.</em></h1>
            <p className="service-detail-hero__lead">{service.intro}</p>
            <div className="service-detail-hero__actions"><Link className="button button--accent" to={`/contact?service=${encodeURIComponent(service.title)}`}>Discuss this service <FiArrowUpRight /></Link><a className="text-link" href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}>Call {settings.phone} <FiArrowRight /></a></div>
            <div className="service-detail-hero__notes"><span><FiMapPin /> {settings.address}</span><span><FiShield /> Site-led specification</span></div>
          </div>
          <div className="service-detail-hero__visual"><img src={service.image} alt={`${service.title} illustrative surface reference`} /><div className="service-detail-hero__shade" /><div className="service-detail-hero__visual-top"><span>APPLICATION / {service.group.includes('Sports') ? 'SPORT' : 'COATING'}</span><span>ILLUSTRATIVE REFERENCE</span></div><div className="service-detail-hero__visual-label"><span className="service-detail-hero__reference-number">MCS / FIELD NOTE</span><span className="service-detail-hero__reference-type">SURFACE / SYSTEM / DETAIL</span></div><div className="service-detail-hero__visual-note"><span>01</span><b>Assess the base.<br />Design the system.</b></div></div>
        </div>
      </section>

      <section className="service-detail-quickbar"><div className="container service-detail-quickbar__inner"><span>WHAT THIS SERVICE COVERS</span><div>{service.outcomes.slice(0, 3).map((item) => <span key={item}><FiCheck /> {item}</span>)}</div><Link to="/contact">Plan a site visit <FiArrowUpRight /></Link></div></section>

      <section className="section service-overview" data-reveal><div className="container service-overview__grid"><div className="service-overview__intro"><div className="section-index"><span>01</span><i /> THE RIGHT STARTING POINT</div><h2>Every layer has<br /><em>a reason to be there.</em></h2></div><div className="service-overview__body"><p className="lead-paragraph">{service.excerpt}</p><p>{service.projectNote}</p><div className="service-overview__signature"><span className="signature-rule" /><span>Multilines Coating Solutions · {settings.address}</span></div></div></div></section>

      <section className="section system-options" data-reveal><div className="container"><div className="section-heading-row"><div><div className="section-index"><span>02</span><i /> SYSTEM OPTIONS</div><h2>Choose by use.<br /><em>Finish with confidence.</em></h2></div><p>These are system families to guide the conversation. Final build-up and product selection depend on the site assessment and project brief.</p></div><div className="system-option-grid">{service.systems.map((system, index) => <article className="system-option" key={system.name}><span className="system-option__index">0{index + 1}</span><div className="system-option__visual"><img src={getOptionPhoto(service, index)} alt={`${service.title}: ${system.name} surface reference`} loading="lazy" /><small>{service.group.includes('Sports') ? 'SPORT FINISH' : 'COATING DETAIL'}</small></div><div className="system-option__copy"><h3>{system.name}</h3><p>{system.detail}</p></div><Link to={`/contact?service=${encodeURIComponent(service.title)}`} aria-label={`Ask about ${system.name}`}><FiArrowUpRight /></Link></article>)}</div></div></section>

      <section className="section service-applications" data-reveal><div className="container service-applications__grid"><div><div className="section-index section-index--light"><span>03</span><i /> WHERE IT WORKS</div><h2>Designed around<br /><em>the environment.</em></h2><p>We look at the whole operating picture, from the surface and the people using it to the equipment, cleaning and maintenance needs.</p><Link to="/contact" className="button button--light">Talk through your site <FiArrowUpRight /></Link></div><div className="application-list">{service.applications.map((item, index) => <div className="application-item" key={item}><span>0{index + 1}</span><strong>{item}</strong><FiArrowUpRight /></div>)}</div></div></section>

      <section className="section detail-process" data-reveal><div className="container"><div className="section-heading-row"><div><div className="section-index"><span>04</span><i /> DELIVERY</div><h2>From first look<br /><em>to final handover.</em></h2></div><p>Installation is only one part of a successful surface. Preparation, sequence and use after handover are considered from the outset.</p></div><div className="detail-process__steps">{sharedProcess.map((step) => <article className="detail-process__step" key={step[0]}><span>{step[0]}</span><h3>{step[1]}</h3><p>{step[2]}</p></article>)}</div></div></section>

      <section className="section service-faq" data-reveal><div className="container service-faq__grid"><div><div className="section-index"><span>05</span><i /> GOOD TO KNOW</div><h2>Questions worth<br /><em>asking early.</em></h2><p>Every site has a different brief. If you are weighing up a coating, floor repair or sports surface, our team can help clarify the next step.</p><Link to="/contact" className="text-link text-link--dark">Ask us directly <FiArrowUpRight /></Link></div><div className="faq-list">{faqs.map((faq, index) => <div className={`faq-item${openFaq === index ? ' is-open' : ''}`} key={faq.question}><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span><i>0{index + 1}</i>{faq.question}</span><FiChevronDown /></button>{openFaq === index && <div className="faq-item__answer"><p>{faq.answer}</p></div>}</div>)}</div></div></section>

      {related.length > 0 && <section className="section related-services" data-reveal><div className="container"><div className="section-heading-row section-heading-row--compact"><div><div className="section-index"><span>06</span><i /> RELATED SERVICES</div><h2>More ways we<br /><em>can support your site.</em></h2></div><Link to="/services" className="text-link text-link--dark">All services <FiArrowRight /></Link></div><div className="service-grid service-grid--three">{related.map((item, index) => <ServiceCard key={item.slug} service={item} index={index} />)}</div></div></section>}
    </main>
  );
}

function ServiceNotFound() {
  return <main className="inner-page not-found-page"><div className="container not-found-page__inner"><p className="eyebrow">SERVICE NOT FOUND</p><h1>Let's find the<br /><em>right surface.</em></h1><p>The service you are looking for may have moved. Browse our capabilities or contact us and we will point you in the right direction.</p><div><Link to="/services" className="button button--dark">Browse services <FiArrowRight /></Link><Link to="/contact" className="text-link text-link--dark">Contact Multilines <FiArrowUpRight /></Link></div></div></main>;
}
