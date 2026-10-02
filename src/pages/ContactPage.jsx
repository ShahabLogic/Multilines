import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiArrowUpRight, FiCheckCircle, FiClock, FiFacebook, FiMail, FiMapPin, FiPhoneCall, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useSite } from '../context/SiteContext';
import { services } from '../data/services';

const digitsOnly = (value) => String(value || '').replace(/\D/g, '');
const whatsappNumber = (phone) => {
  const digits = digitsOnly(phone);
  return digits.startsWith('0') ? `92${digits.slice(1)}` : digits;
};

export default function ContactPage() {
  const { settings } = useSite();
  const [params] = useSearchParams();
  const requestedService = params.get('service') || '';
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: requestedService, message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (requestedService) setForm((current) => ({ ...current, service: requestedService }));
  }, [requestedService]);

  const change = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    if (result) setResult(null);
  };

  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setResult(null);
    try {
      const response = await fetch('/api/inquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Your message could not be sent. Please try WhatsApp or email instead.');
      setResult({ type: 'success', message: `Thanks, ${form.name.trim()}. Your enquiry has been received. Reference: ${data.inquiryId}.` });
      setForm({ name: '', phone: '', email: '', service: '', message: '' });
    } catch (error) {
      setResult({ type: 'error', message: error.message || 'Something went wrong. Please contact us by phone or email.' });
    } finally {
      setSubmitting(false);
    }
  };

  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(settings.mapQuery || settings.address)}&z=12&output=embed`;
  const emailSubject = encodeURIComponent('Project enquiry — Multilines Coating Solutions');
  const emailBody = encodeURIComponent('Hello Multilines Coating Solutions,\n\nI would like to discuss a flooring or coating project.\n');

  return (
    <main className="inner-page contact-page">
      <section className="page-hero page-hero--contact"><div className="container page-hero__grid"><div className="page-hero__copy"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>Contact</span></div><p className="eyebrow">LET'S TALK ABOUT YOUR PROJECT</p><h1>Let's make the<br /><em>next step clear.</em></h1><p>Tell us what you are working on. We will help you understand the right starting point for your floor, court, track or coating scope.</p><div className="page-hero__actions"><a className="button button--accent" href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}>Call {settings.phone} <FiPhoneCall /></a><a className="location-chip" href={`https://wa.me/${whatsappNumber(settings.phone)}?text=${encodeURIComponent('Hello, I would like to discuss a project.')}`} target="_blank" rel="noreferrer"><FaWhatsapp /> WhatsApp us</a></div></div><div className="contact-hero-art"><div className="contact-hero-art__circle contact-hero-art__circle--one" /><div className="contact-hero-art__circle contact-hero-art__circle--two" /><img src="/images/services/roller-closeup.jpg" alt="A resin floor coating being carefully applied" /><span className="contact-hero-art__label">PROJECT ENQUIRIES / LAHORE</span></div></div></section>

      <section className="section contact-main" data-reveal><div className="container contact-main__grid">
        <div className="contact-form-wrap"><div className="section-index"><span>01</span><i /> SEND A PROJECT ENQUIRY</div><h2>What would you<br /><em>like to surface?</em></h2><p>Share a few details and we will get back to you to discuss the site and next steps.</p>
          {result && <div className={`form-feedback form-feedback--${result.type}`} role="status">{result.type === 'success' ? <FiCheckCircle /> : <FiMail />}<span>{result.message}</span></div>}
          <form className="contact-form" onSubmit={submit}>
            <div className="form-row"><label>Your name<input name="name" value={form.name} onChange={change} minLength="2" maxLength="100" required placeholder="Name" autoComplete="name" /></label><label>Phone / WhatsApp<input name="phone" type="tel" value={form.phone} onChange={change} minLength="7" maxLength="60" required placeholder="03xx-xxxxxxx" autoComplete="tel" /></label></div>
            <div className="form-row"><label>Email address <span>(optional)</span><input name="email" type="email" value={form.email} onChange={change} maxLength="120" placeholder="you@company.com" autoComplete="email" /></label><label>I'm interested in<select name="service" value={form.service} onChange={change}><option value="">Select a service</option>{services.map((service) => <option key={service.slug} value={service.title}>{service.title}</option>)}<option value="Other / not sure yet">Other / not sure yet</option></select></label></div>
            <label>Tell us a little about the site<textarea name="message" value={form.message} onChange={change} minLength="10" maxLength="2200" required rows="5" placeholder="Location, approximate area, surface condition, type of use, preferred timeline…" /></label>
            <div className="contact-form__bottom"><span>We will only use these details to respond to your enquiry.</span><button className="button button--dark" type="submit" disabled={submitting}>{submitting ? 'Sending…' : 'Send enquiry'} <FiSend /></button></div>
          </form>
          <div className="contact-form__fallback">Prefer email? <a href={`mailto:${settings.email}?subject=${emailSubject}&body=${emailBody}`}>{settings.email} <FiArrowUpRight /></a></div>
        </div>
        <aside className="contact-info-card"><span className="contact-info-card__overline">DIRECT CONTACT</span><h3>We are here<br /><em>to help.</em></h3><div className="contact-info-card__details"><a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}><span><FiPhoneCall /></span><div><small>PHONE / WHATSAPP</small><strong>{settings.phone}</strong></div><FiArrowUpRight /></a><a href={`mailto:${settings.email}`}><span><FiMail /></span><div><small>EMAIL</small><strong>{settings.email}</strong></div><FiArrowUpRight /></a><div><span><FiMapPin /></span><div><small>LOCATION</small><strong>{settings.address}</strong></div></div><div><span><FiClock /></span><div><small>SITE VISITS</small><strong>By appointment</strong></div></div></div><div className="contact-info-card__social"><span>Connect with our team</span><a href={settings.facebookUrl} target="_blank" rel="noreferrer"><FiFacebook /> Facebook <FiArrowUpRight /></a></div></aside>
      </div></section>

      <section className="section contact-map-section" data-reveal><div className="container contact-map-head"><div><div className="section-index"><span>02</span><i /> FIND MULTILINES</div><h2>Based in Lahore.<br /><em>Ready to talk.</em></h2></div><a href={`https://maps.google.com/?q=${encodeURIComponent(settings.mapQuery || settings.address)}`} target="_blank" rel="noreferrer" className="text-link text-link--dark">Open in Google Maps <FiArrowUpRight /></a></div><div className="container"><div className="contact-map-frame"><iframe title="Map showing Lahore, Pakistan" src={mapUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /><div className="contact-map-pin"><FiMapPin /><div><strong>{settings.companyName}</strong><span>{settings.address}</span></div></div></div></div></section>
    </main>
  );
}
