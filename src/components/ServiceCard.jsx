import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';

export default function ServiceCard({ service, index = 0, featured = false }) {
  return (
    <Link to={`/services/${service.slug}`} className={`service-card${featured ? ' service-card--featured' : ''}`} style={{ '--card-index': index }}>
      <div className="service-card__image"><img src={service.image} alt={`${service.title} illustrative surface reference`} loading="lazy" /></div>
      <div className="service-card__body">
        <span className="service-card__eyebrow">{service.group}</span>
        <h3>{service.title}</h3>
        <p>{service.excerpt}</p>
        <span className="service-card__link">Explore service <FiArrowUpRight /></span>
      </div>
    </Link>
  );
}
