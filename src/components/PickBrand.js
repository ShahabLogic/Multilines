import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';

export default function PickBrand() {
  return <section className="section system-note"><div className="container system-note__grid"><div><span className="system-note__badge">MATERIALS / SYSTEMS / FINISHES</span><h2>Choose by use.<br /><em>Build from the base.</em></h2></div><div><p>Explore epoxy, polyurethane, acrylic sports coatings, EPDM and rubber systems. Each recommendation starts with the site and the intended service conditions.</p><Link to="/systems" className="button button--dark">Explore coating systems <FiArrowUpRight /></Link></div></div></section>;
}
