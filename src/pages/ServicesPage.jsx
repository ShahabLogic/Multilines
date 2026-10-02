import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiSearch, FiSliders } from 'react-icons/fi';
import { services, serviceGroups } from '../data/services';
import ServiceCard from '../components/ServiceCard';

export default function ServicesPage() {
  const [group, setGroup] = useState('All services');
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();
    return services.filter((service) => {
      const inGroup = group === 'All services' || service.group === group;
      const haystack = `${service.title} ${service.group} ${service.excerpt} ${service.applications.join(' ')}`.toLowerCase();
      return inGroup && (!searchTerm || haystack.includes(searchTerm));
    });
  }, [group, query]);

  return (
    <main className="inner-page services-page">
      <section className="page-hero page-hero--services">
        <div className="container page-hero__grid">
          <div className="page-hero__copy"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>Services</span></div><p className="eyebrow">OUR SERVICES · BUILT AROUND YOUR SITE</p><h1>Every surface<br /><em>has a job to do.</em></h1><p>Explore our industrial, commercial and sports flooring services. We assess the base, understand the use and recommend a system that fits the project.</p><div className="page-hero__actions"><Link to="/contact" className="button button--accent">Book a site discussion <FiArrowUpRight /></Link><span className="location-chip">{services.length} specialist service pages</span></div></div>
          <div className="services-hero-photo"><img src="/images/service-references/industrial-warehouse-reference.webp" alt="Illustrative industrial flooring reference for Multilines services" loading="lazy" /><span>INDUSTRIAL / SPORTS / PROTECTION</span></div>
        </div>
      </section>

      <section className="section services-catalog" data-reveal><div className="container">
        <div className="catalog-tools"><div className="catalog-tools__heading"><div className="section-index"><span>01</span><i /> FIND YOUR SERVICE</div><h2>Choose the right<br /><em>starting point.</em></h2></div><label className="catalog-search"><FiSearch /><span className="sr-only">Search services</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search floors, courts, tracks…" /></label></div>
        <div className="catalog-filter" role="group" aria-label="Filter services"><FiSliders />{serviceGroups.map((item) => <button key={item} type="button" className={group === item ? 'is-active' : ''} onClick={() => setGroup(item)} aria-pressed={group === item}>{item}</button>)}</div>
        <div className="catalog-result-line"><span>{filtered.length} {filtered.length === 1 ? 'service' : 'services'}</span><span>{group === 'All services' ? 'All capabilities' : group}</span></div>
        {filtered.length ? <div className="service-grid service-grid--catalog">{filtered.map((service, index) => <ServiceCard key={service.slug} service={service} index={index} />)}</div> : <div className="catalog-empty"><h3>No services found.</h3><p>Try a different word or browse all services.</p><button className="button button--outline" onClick={() => { setQuery(''); setGroup('All services'); }}>Reset filters <FiArrowUpRight /></button></div>}
      </div></section>
    </main>
  );
}
