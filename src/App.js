import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useSite } from './context/SiteContext';
import SiteShell from './components/SiteChrome';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import SystemsPage from './pages/SystemsPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import AppearancePage from './pages/AppearancePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import PaintsPage from './pages/PaintsPage';
import AdminProductsPage from './pages/AdminProductsPage';
import LegalPage, { NotFoundPage } from './pages/LegalPage';
import { getService } from './data/services';
import './styles/site.css';
import './styles/commerce-base.css';
import './styles/commerce.css';

function RouteEffects() {
  const location = useLocation();
  const { settings } = useSite();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    const routeSlug = location.pathname.startsWith('/services/') ? location.pathname.split('/')[2] : null;
    const service = routeSlug ? getService(routeSlug) : null;
    const titles = {
      '/': settings.companyName,
      '/about': `About | ${settings.companyName}`,
      '/services': `Flooring & Coating Services | ${settings.companyName}`,
      '/systems': `Coating Systems | ${settings.companyName}`,
      '/projects': `Gallery | ${settings.companyName}`,
      '/products': `Products | ${settings.companyName}`,
      '/cart': `Product Order List | ${settings.companyName}`,
      '/paints': `Paints & Coatings | ${settings.companyName}`,
      '/contact': `Contact | ${settings.companyName}`,
      '/admin/products': `Product Admin | ${settings.companyName}`,
      '/admin/config': `Global Appearance | ${settings.companyName}`,
      '/appearance': `Global Appearance | ${settings.companyName}`,
      '/privacy': `Privacy | ${settings.companyName}`
    };
    document.title = service ? `${service.title} | ${settings.companyName}` : (titles[location.pathname] || settings.companyName);

    const description = service
      ? service.excerpt
      : location.pathname === '/contact'
        ? `Contact ${settings.companyName} in ${settings.address} about industrial flooring, epoxy, sports courts, tracks, concrete repair and protective coatings.`
        : `${settings.companyName} provides industrial and commercial flooring, epoxy and PU systems, sports surfaces, concrete repair and protective coatings in Lahore, Pakistan.`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);

    const revealItems = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [location.pathname, location.search, settings.address, settings.companyName]);

  return null;
}

export default function App() {
  return (
    <SiteShell>
      <RouteEffects />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/systems" element={<SystemsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/gallery" element={<Navigate to="/projects" replace />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/paints" element={<PaintsPage />} />
        <Route path="/admin/products" element={<AdminProductsPage />} />
        <Route path="/appearance" element={<AppearancePage />} />
        <Route path="/admin/config" element={<AppearancePage />} />
        <Route path="/privacy" element={<LegalPage />} />
        <Route path="/products/*" element={<Navigate to="/products" replace />} />
        <Route path="/materials" element={<Navigate to="/paints" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SiteShell>
  );
}
