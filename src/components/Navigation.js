import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { ConfigContext } from '../context/ConfigContext';
import "../styles/Navigation.css";
import { HiLocationMarker } from 'react-icons/hi';
import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosClose } from 'react-icons/io';
import logo from '../assets/logo.webp';

function Navigation() {
    const { config } = useContext(ConfigContext);
    // for hamburger/responsive nav menu
    const [clicked, setClicked] = useState(false);

    const handlePress = (e) => {
        if (e.key === 'Enter') {
            setClicked(!clicked);
        }
    };

    return (
        <nav className="nav">
            <div className="wrapper">
                <div className="nav--location--wrapper">
                    <div className="nav--location">
                        <div className="nav--flex--location">
                            <HiLocationMarker />
                            <p>{config.address}</p>
                        </div>
                        <a className="nav--flex--location underline" href={"tel:" + config.phone.replace(/[^0-9]/g, '')}>{config.phone}</a>
                    </div>
                </div>
                <div className="nav--flex--main">
                    <Link to="/" onClick={() => setClicked(false)} className="nav--brand">
                        <img src={config.logoUrl || logo} alt={`${config.companyName} Logo`} className="nav--logo" />
                        {config.companyName && (
                            <span className="nav--company-name">{config.companyName}</span>
                        )}
                    </Link>
                    {clicked ? <IoIosClose size="50px" onKeyDown={(e) => handlePress(e)} onClick={() => setClicked(!clicked)} className="menu--icons" tabIndex="0" /> : <GiHamburgerMenu size="30px" className="menu--icons" onKeyDown={(e) => handlePress(e)} onClick={() => setClicked(!clicked)} tabIndex="0" />}
                    <div className={clicked ? "nav--flex--main--links active--menu" : "nav--flex--main--links"}>
                        <Link to="/" onClick={() => setClicked(false)}>Home</Link>
                        <Link to="/about" onClick={() => setClicked(false)}>About</Link>
                        <Link to="/contact" onClick={() => setClicked(false)}>Contact</Link>
                        {/* Drop down menu on Products */}
                        {(config.clientType === 'both' || config.clientType === 'products') && (
                            <div className="dropdown">
                                <div className="dropdown--products">
                                    <Link to="/products" className="products" onClick={() => setClicked(false)}>Products</Link>
                                    <VscTriangleDown className="icon--up" />
                                    <VscTriangleUp className="icon--down" />
                                </div>
                                <div className="dropdown--menu">
                                    <Link to="/products/hardwood" onClick={() => setClicked(false)}>Hardwood</Link>
                                    <Link to="/products/laminate" onClick={() => setClicked(false)}>Laminate</Link>
                                    <Link to="/products/vinyl" onClick={() => setClicked(false)}>Vinyl</Link>
                                </div>
                            </div>
                        )}
                        {/* Drop down menu on Services */}
                        {(config.clientType === 'both' || config.clientType === 'services') && (
                            <div className="dropdown">
                                <div className="dropdown--products">
                                    <Link to="/services" className="products" onClick={() => setClicked(false)}>Services</Link>
                                    <VscTriangleDown className="icon--up" />
                                    <VscTriangleUp className="icon--down" />
                                </div>
                                <div className="dropdown--menu mega-menu">
                                    <div className="mega-menu-col">
                                        <h4>Indoor Courts</h4>
                                        <Link to="/services/indoor-badminton-courts-flooring" onClick={() => setClicked(false)}>Badminton</Link>
                                        <Link to="/services/indoor-basketball-courts-flooring" onClick={() => setClicked(false)}>Basketball</Link>
                                        <Link to="/services/indoor-futsal-flooring" onClick={() => setClicked(false)}>Futsal</Link>
                                        <Link to="/services/indoor-paddle-tennis-flooring" onClick={() => setClicked(false)}>Paddle Tennis</Link>
                                        <Link to="/services/indoor-pickleball-flooring" onClick={() => setClicked(false)}>Pickleball</Link>
                                        <Link to="/services/indoor-volleyball-court-flooring" onClick={() => setClicked(false)}>Volleyball</Link>
                                    </div>
                                    <div className="mega-menu-col">
                                        <h4>Outdoor Courts</h4>
                                        <Link to="/services/outdoor-basketball-courts-flooring" onClick={() => setClicked(false)}>Basketball</Link>
                                        <Link to="/services/epdm-running-tracks" onClick={() => setClicked(false)}>Running Track</Link>
                                        <Link to="/services/outdoor-futsal-flooring" onClick={() => setClicked(false)}>Futsal</Link>
                                        <Link to="/services/outdoor-paddle-tennis-flooring" onClick={() => setClicked(false)}>Paddle Tennis</Link>
                                        <Link to="/services/outdoor-pickleball-flooring" onClick={() => setClicked(false)}>Pickleball</Link>
                                        <Link to="/services/outdoor-tennis-courts-flooring" onClick={() => setClicked(false)}>Tennis</Link>
                                        <Link to="/services/outdoor-volleyball-court-flooring" onClick={() => setClicked(false)}>Volleyball</Link>
                                        <Link to="/services/sports-courts" onClick={() => setClicked(false)}>Sports Courts</Link>
                                    </div>
                                    <div className="mega-menu-col">
                                        <h4>Commercial & Gym</h4>
                                        <Link to="/services/epoxy-flooring" onClick={() => setClicked(false)}>Epoxy Flooring</Link>
                                        <Link to="/services/polyurethane-floor" onClick={() => setClicked(false)}>Polyurethane Floor</Link>
                                        <Link to="/services/polyurethane-pu-sports-flooring" onClick={() => setClicked(false)}>PU Sports Flooring</Link>
                                        <Link to="/services/gym-flooring" onClick={() => setClicked(false)}>Gym Flooring</Link>
                                        <Link to="/services/rubber-gym-flooring" onClick={() => setClicked(false)}>Rubber Gym</Link>
                                        <Link to="/services/play-area-flooring" onClick={() => setClicked(false)}>Play Area</Link>
                                    </div>
                                    <div className="mega-menu-col">
                                        <h4>Tracks & Specialty</h4>
                                        <Link to="/services/acrylic-sports-flooring" onClick={() => setClicked(false)}>Acrylic Sports</Link>
                                        <Link to="/services/epdm-running-tracks" onClick={() => setClicked(false)}>EPDM Tracks</Link>
                                        <Link to="/services/running-track" onClick={() => setClicked(false)}>Running Track</Link>
                                        <Link to="/services/heat-resistant-and-uv-protected-flooring" onClick={() => setClicked(false)}>UV Flooring</Link>
                                        <Link to="/services/shock-absorbing-flooring" onClick={() => setClicked(false)}>Shock Absorbing</Link>
                                        <Link to="/services/sports-flooring" onClick={() => setClicked(false)}>Sports Flooring</Link>
                                        <Link to="/services/rubber-sports-flooring" onClick={() => setClicked(false)}>Rubber Sports</Link>
                                        <Link to="/services/multi-purpose-courts-flooring" onClick={() => setClicked(false)}>Multi-Purpose</Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        {config.customLinks && config.customLinks.map((link, idx) => (
                            <Link key={`custom-${idx}`} to={link.path} onClick={() => setClicked(false)}>{link.name}</Link>
                        ))}
                        <Link to="/gallery" onClick={() => setClicked(false)}>Gallery</Link>
                        <Link to="https://www.roomvo.com/my/multisurface_demo" title="Roomvo Room Visualizer" className="btn" target="_blank" rel="noopener noreferrer">Room Visualizer</Link>
                    </div>
                </div>
            </div>
        </nav>

    );
}

export default Navigation;