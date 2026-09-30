import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { BsLinkedin, BsInstagram, BsFacebook } from 'react-icons/bs';
import logo from '../assets/logo.webp';
import '../styles/Footer.css';
import { ConfigContext } from '../context/ConfigContext';

function Footer() {
    const { config } = useContext(ConfigContext);

    return(
        <footer>
            <div className="wrapper footer--wrapper">
                <div className="footer--spacing">
                    {/* Footer Nav */}
                    <div className="footer--nav">
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/contact">Contact</Link>
                        <Link to="/"><img src={config.logoUrl || logo} alt={`${config.companyName} Logo`}/></Link>
                        
                        {(config.clientType === 'both' || config.clientType === 'products') && (
                            <Link to="/products">Products</Link>
                        )}
                        {(config.clientType === 'both' || config.clientType === 'services') && (
                            <Link to="/services">Services</Link>
                        )}
                        
                        {config.customLinks && config.customLinks.map((link, idx) => (
                            <Link key={`custom-footer-${idx}`} to={link.path}>{link.name}</Link>
                        ))}
                        
                        <Link to="/gallery">Gallery</Link>
                    </div>
                    <div className="footer--nav--small">
                        <Link to="/"><img src={config.logoUrl || logo} alt={`${config.companyName} Logo`} className="footer-nav-img"/></Link>
                    </div>
                    <div className="footer--flex">
                        {/* Floors Like Glass Info */}
                        <div className="footer--hours">
                            <h3 className="footer--hours--title">Hours</h3>
                            <h4 className="footer--hours--bold">Monday - Friday</h4>
                            <h5>9am - 3pm</h5>
                            <h4 className="footer--hours--bold">Saturday</h4>
                            <h5>By Appointment Only</h5>
                            <h4 className="footer--hours--bold">Sunday</h4>
                            <h5>Closed</h5>
                        </div>
                        <div className="footer--info">
                            <h2 className="title">{config.companyName}</h2>
                            <h3>{config.footerAddress}</h3>
                            <h3>{config.phone}</h3>
                            <h3>{config.footerEmail}</h3>
                        </div>
                        <div className="footer--socials--main">
                            <h4 className="footer--socials--title">Follow us on social media</h4>
                            <div className="footer--socials">
                                {config.footerFacebook && <Link className="footer--social" to={config.footerFacebook} title={`${config.companyName} Facebook Page`} target="_blank" rel="noopener noreferrer"><BsFacebook size="35px"/></Link>}
                                {config.footerInstagram && <Link className="footer--social" to={config.footerInstagram} title={`${config.companyName} Instagram Page`} target="_blank" rel="noopener noreferrer"><BsInstagram size="35px"/></Link>}
                                {config.footerLinkedin && <Link className="footer--social" to={config.footerLinkedin} title={`${config.companyName} Linkedin Page`} target="_blank" rel="noopener noreferrer"><BsLinkedin  size="35px"/></Link>}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="copyright">
                    <p>{config.footerCopyrightText} | Designed & built by <Link to="https://wabby404.github.io/portfolio-redo/" title="Abby Waddells Portfolio Site" className="copyright--link" target="_blank" rel="noopener noreferrer">Abby Waddell</Link></p>
                </div>
        </footer>
    );
}

export default Footer;
