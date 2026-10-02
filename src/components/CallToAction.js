import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';

export default function CallToAction() {
  return <section className="footer-callout"><div className="container footer-callout__inner"><div><span className="eyebrow eyebrow--light">Have a surface in mind?</span><h2>Let's get the details <em>right.</em></h2></div><Link to="/contact" className="button button--light">Talk to a coatings specialist <FiArrowUpRight /></Link></div></section>;
}
