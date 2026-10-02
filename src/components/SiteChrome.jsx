import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  FiArrowUpRight, FiChevronDown, FiMenu, FiMoon, FiPhoneCall, FiSettings, FiShoppingBag, FiSun, FiX
} from 'react-icons/fi';
import { FaWhatsapp, FaFacebookF } from 'react-icons/fa';
import { useSite } from '../context/SiteContext';
import { useCart } from '../context/CartContext';
import { services } from '../data/services';
import BrandMark from './BrandMark';

const phoneLink = (phone) => `tel:${String(phone || '').replace(/[^0-9+]/g, '')}`;
const whatsappNumber = (phone) => {
  const digits = String(phone || '').replace(/\D/g, '');
  return digits.startsWith('0') ? `92${digits.slice(1)}` : digits;
};

const indoorService = (service) => service.slug.startsWith('indoor-');
const outdoorService = (service) => service.slug.startsWith('outdoor-');
const serviceNavigationGroups = [
  { title: 'Industrial & protective', items: services.filter((service) => service.group === 'Industrial & Protective') },
  { title: 'Sports surfacing', items: services.filter((service) => service.group === 'Sports & Recreation' && !indoorService(service) && !outdoorService(service)) },
  { title: 'Indoor courts', items: services.filter(indoorService) },
  { title: 'Outdoor courts', items: services.filter(outdoorService) }
];

export function SiteHeader() {
  const { settings, updateSettings } = useSite();
  const { cartCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  const toggleGlobalTheme = async () => {
    try {
      await updateSettings({ themeMode: settings.themeMode === 'dark' ? 'light' : 'dark' });
    } catch (error) {
      // If shared editing is protected, take the visitor to the editor for sign-in or an admin key.
      window.location.assign('/admin/config');
    }
  };

  return (
    <>
      <div className="topline">
        <div className="container topline__inner">
          <span className="topline__location"><span className="topline__dot" /> {settings.address}</span>
          <span className="topline__note">Industrial flooring · sports surfaces · protective coatings</span>
          <a href={phoneLink(settings.phone)} className="topline__phone"><FiPhoneCall aria-hidden="true" /> {settings.phone}</a>
        </div>
      </div>
      <header className="site-header">
        <div className="container site-header__inner">
          <Link to="/" className="site-header__brand" aria-label={`${settings.companyName} home`}>
            <BrandMark companyName={settings.companyName} />
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link is-active' : 'nav-link'}>Home</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link is-active' : 'nav-link'}>About</NavLink>
            <div className="nav-dropdown" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <div className="nav-dropdown__head">
                <NavLink to="/services" className={({ isActive }) => isActive ? 'nav-link is-active' : 'nav-link'}>Services</NavLink>
                <button className="nav-dropdown__toggle" type="button" aria-label="Open services menu" aria-expanded={servicesOpen} onClick={() => setServicesOpen((open) => !open)}><FiChevronDown /></button>
              </div>
              <div className={`nav-dropdown__panel${servicesOpen ? ' is-open' : ''}`}>
                <div className="nav-dropdown__intro"><span className="eyebrow">Surfaces, specified</span><strong>Explore every service.</strong><Link to="/services">View all 30 services <FiArrowUpRight /></Link></div>
                <div className="nav-dropdown__groups">{serviceNavigationGroups.map((group) => <section className="nav-service-group" key={group.title}><strong>{group.title}</strong><div>{group.items.map((service) => <Link key={service.slug} to={`/services/${service.slug}`}>{service.title}<FiArrowUpRight /></Link>)}</div></section>)}</div>
              </div>
            </div>
            <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-link is-active' : 'nav-link'}>Products</NavLink>
            <NavLink to="/paints" className={({ isActive }) => isActive ? 'nav-link is-active' : 'nav-link'}>Paints</NavLink>
            <NavLink to="/systems" className={({ isActive }) => isActive ? 'nav-link is-active' : 'nav-link'}>Systems</NavLink>
            <NavLink to="/projects" className={({ isActive }) => isActive ? 'nav-link is-active' : 'nav-link'}>Projects</NavLink>
            <NavLink to="/gallery" className={({ isActive }) => isActive ? 'nav-link is-active' : 'nav-link'}>Gallery</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link is-active' : 'nav-link'}>Contact</NavLink>
          </nav>
          <div className="site-header__actions">
            <Link to="/cart" className="cart-header-link" aria-label={`Open cart, ${cartCount} items`} title="Open your product order list"><FiShoppingBag /><span>Cart</span><b>{cartCount}</b></Link>
            <button className="theme-toggle" type="button" onClick={toggleGlobalTheme} aria-label={`Switch global theme to ${settings.themeMode === 'dark' ? 'light' : 'dark'}`} title="Change the shared website theme">
              {settings.themeMode === 'dark' ? <FiSun /> : <FiMoon />}<span>Theme</span>
            </button>
            <Link to="/contact" className="button button--small button--dark header-cta">Request a survey <FiArrowUpRight /></Link>
            <button className="mobile-menu-trigger" type="button" aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen} onClick={() => setMobileOpen((open) => !open)}>{mobileOpen ? <FiX /> : <FiMenu />}</button>
          </div>
        </div>
      </header>
      <div className={`mobile-menu${mobileOpen ? ' is-open' : ''}`} aria-hidden={!mobileOpen}>
        <nav className="mobile-menu__nav" aria-label="Mobile navigation">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <div className="mobile-menu__services-head"><NavLink to="/services">Services</NavLink><button type="button" aria-label="Expand service links" aria-expanded={servicesOpen} onClick={() => setServicesOpen((open) => !open)}><FiChevronDown /></button></div>
          {servicesOpen && <div className="mobile-menu__subnav">{serviceNavigationGroups.map((group) => <section className="mobile-service-group" key={group.title}><strong>{group.title}</strong>{group.items.map((service) => <Link key={service.slug} to={`/services/${service.slug}`}>{service.title}</Link>)}</section>)}</div>}
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/paints">Paints & coatings</NavLink>
          <NavLink to="/systems">Systems</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
          <Link to="/cart" className="mobile-menu__cart"><FiShoppingBag /> Product cart ({cartCount})</Link>
          <NavLink to="/contact">Contact</NavLink>
          <Link to="/admin/config" className="mobile-menu__settings"><FiSettings /> Global appearance</Link>
          <Link to="/admin/products" className="mobile-menu__settings"><FiSettings /> Product admin</Link>
          <a href={phoneLink(settings.phone)} className="mobile-menu__phone"><FiPhoneCall /> {settings.phone}</a>
        </nav>
      </div>
      {mobileOpen && <button className="mobile-menu__scrim" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
    </>
  );
}

export function SiteFooter() {
  const { settings } = useSite();
  const footerServices = services.filter((service) => [
    'epoxy-flooring', 'polyurethane-floor', 'sports-flooring', 'epdm-running-tracks', 'concrete-repair-maintenance', 'waterproofing-coatings'
  ].includes(service.slug));
  return (
    <footer className="site-footer">
      <div className="footer-callout">
        <div className="container footer-callout__inner">
          <div><span className="eyebrow eyebrow--light">Have a surface in mind?</span><h2>Let's get the details <em>right.</em></h2></div>
          <Link to="/contact" className="button button--light">Talk to a coatings specialist <FiArrowUpRight /></Link>
        </div>
      </div>
      <div className="container footer-main">
        <div className="footer-brand">
          <Link to="/" aria-label={`${settings.companyName} home`}><BrandMark light companyName={settings.companyName} /></Link>
          <p className="footer-brand__tagline">{settings.tagline}</p>
          <p>Industrial and commercial flooring, sports surfaces, concrete repair and protective coatings—planned for the way your space works.</p>
          <a className="footer-social" href={settings.facebookUrl} target="_blank" rel="noreferrer" aria-label="Visit Multilines Coating Solutions on Facebook"><FaFacebookF /> Follow our work <FiArrowUpRight /></a>
        </div>
        <div className="footer-column"><span className="footer-heading">Explore</span><Link to="/about">About us</Link><Link to="/services">All services</Link><Link to="/products">Products</Link><Link to="/paints">Paints &amp; coatings</Link><Link to="/systems">Coating systems</Link><Link to="/projects">Projects</Link><Link to="/gallery">Gallery</Link><Link to="/contact">Contact</Link></div>
        <div className="footer-column"><span className="footer-heading">Expertise</span>{footerServices.map((service) => <Link key={service.slug} to={`/services/${service.slug}`}>{service.title}</Link>)}</div>
        <div className="footer-column footer-contact"><span className="footer-heading">Get in touch</span><a href={phoneLink(settings.phone)}>{settings.phone}</a><a href={`mailto:${settings.email}`}>{settings.email}</a><span>{settings.address}</span><a className="footer-map-link" href={`https://maps.google.com/?q=${encodeURIComponent(settings.mapQuery)}`} target="_blank" rel="noreferrer">Open location <FiArrowUpRight /></a><Link to="/admin/config" className="footer-settings"><FiSettings /> Global appearance</Link><Link to="/admin/products" className="footer-settings"><FiSettings /> Product admin</Link></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} {settings.companyName}. All rights reserved.</span><span>Specified with care. Applied with precision.</span><Link to="/privacy">Privacy</Link></div>
    </footer>
  );
}

export function WhatsAppButton() {
  const { settings } = useSite();
  const text = encodeURIComponent('Hello Multilines Coating Solutions, I would like to discuss a flooring or coating project.');
  return <a className="whatsapp-float" href={`https://wa.me/${whatsappNumber(settings.phone)}?text=${text}`} target="_blank" rel="noreferrer" aria-label="Chat with Multilines Coating Solutions on WhatsApp"><FaWhatsapp /><span>WhatsApp</span></a>;
}

export function EpoxyLoader() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 950);
    return () => window.clearTimeout(timer);
  }, []);
  if (!visible) return null;
  return (
    <div className="site-loader" aria-label="Loading Multilines Coating Solutions" role="status">
      <div className="site-loader__object">
        <div className="paint-can-3d paint-can-3d--loader"><span className="paint-can-3d__handle" /><span className="paint-can-3d__rim" /><span className="paint-can-3d__label"><b>MC</b><small>RESIN<br />SYSTEM</small></span><span className="paint-can-3d__base" /></div>
        <span className="loader-puddle" />
      </div>
      <div className="site-loader__wordmark"><BrandMark compact /><span>Surface systems, considered.</span></div>
      <span className="site-loader__progress" />
    </div>
  );
}

export default function SiteShell({ children }) {
  return <><EpoxyLoader /><SiteHeader /><div className="site-main">{children}</div><SiteFooter /><WhatsAppButton /></>;
}
