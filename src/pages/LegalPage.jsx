import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import { useSite } from '../context/SiteContext';

export default function LegalPage() {
  const { settings } = useSite();
  return <main className="inner-page legal-page"><div className="container legal-page__inner"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>Privacy</span></div><p className="eyebrow">YOUR INFORMATION</p><h1>Privacy, handled<br /><em>with care.</em></h1><p className="lead-paragraph">When you send an enquiry through this website, the information you provide is used to respond to your project request.</p><h2>Information we collect</h2><p>The enquiry form may collect your name, phone number, email address, selected service and project message. Enquiries are stored on the website server so the Multilines team can follow up. Do not include sensitive personal information in the form.</p><h2>Contact</h2><p>For questions about an enquiry or this notice, contact {settings.companyName} at <a href={`mailto:${settings.email}`}>{settings.email}</a> or {settings.phone}.</p><Link to="/contact" className="button button--dark">Contact the team <FiArrowUpRight /></Link></div></main>;
}

export function NotFoundPage() {
  return <main className="inner-page not-found-page"><div className="container not-found-page__inner"><p className="eyebrow">404 · PAGE NOT FOUND</p><h1>Not all paths<br /><em>lead to a floor.</em></h1><p>This page may have moved. Find your way back to our services, systems and project references.</p><div><Link to="/services" className="button button--dark">Browse services <FiArrowUpRight /></Link><Link to="/" className="text-link text-link--dark">Back to home <FiArrowUpRight /></Link></div></div></main>;
}
