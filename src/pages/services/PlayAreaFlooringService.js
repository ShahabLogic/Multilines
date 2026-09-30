import React, { useContext }  from 'react';
import '../../styles/services.css';
import { ConfigContext } from '../../context/ConfigContext';

const PlayAreaFlooringService = () => {
    const { config } = useContext(ConfigContext);
    return (
        <div className="svc-page">
            <div className="svc-hero">
                <h1>Play Area Flooring</h1>
                <p className="svc-breadcrumb">Services &rsaquo; Play Area Flooring</p>
            </div>

            <div className="svc-body">
                <div className="svc-intro">
                    <p>Play area flooring provides a safe, cushioned, and durable surface designed to protect children from falls and injuries while ensuring long-lasting performance in high-traffic play environments.</p>
                <p>At {config.companyName}, we offer specialized Play Area Flooring that combines safety with durability. Our flooring is impact-resistant, non-toxic, and designed to withstand heavy use, ensuring a safe environment for children. Available in a variety of vibrant colors and patterns, {config.companyName} Play Area Flooring enhances the aesthetic of playgrounds, schools, and recreational areas while providing reliable protection and comfort.</p>
                <p>Play areas are supposed to be where fun happens, but a day of fun can go horribly wrong when play areas are unsafe. One of the leading causes of injuries in playgrounds is incorrect surfacing which can cause minor and serious injuries.</p>
                <p>{config.companyName} EPDM playground flooring systems absorb shock and are non-slip to protect against injuries. EPDM rubber granules are the best playground safety material. Widely used in all kinds of tracks, kindergartens, parks, children’s play areas.</p>
                </div>

                <div className="svc-gallery">
                    
                <div key={0} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2024/08/Banner-image.webp' alt='Play Area Flooring 1' />
                </div>
                <div key={1} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2024/08/EPDM-Floori-ng.webp' alt='Play Area Flooring 2' />
                </div>
                <div key={2} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2024/08/Kids-Flooring.webp' alt='Play Area Flooring 3' />
                </div>
                <div key={3} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2024/08/Banner.webp' alt='Play Area Flooring 4' />
                </div>
                </div>

                
                <div className="svc-stats-grid">
                    <div className="stat-card">
                        <span className="stat-num">10+ yr</span>
                        <span className="stat-label">Lifespan</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-num">100%</span>
                        <span className="stat-label">Seamless</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-num">Eco</span>
                        <span className="stat-label">Friendly</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-num">High</span>
                        <span className="stat-label">Durability</span>
                    </div>
                </div>

                <div className="svc-sections">
                    <div className="svc-section card">
                        <h3>Performance Metrics</h3>
                        <p>Our flooring systems are scientifically formulated to provide optimal conditions:</p>
                        <div className="svc-graph-bar">
                            <div className="svc-graph-bar-label"><span>Durability</span> <span>Excellent (9/10)</span></div>
                            <div className="svc-graph-bar-track"><div className="svc-graph-bar-fill" style={{width: '90%'}}></div></div>
                        </div>
                        <div className="svc-graph-bar">
                            <div className="svc-graph-bar-label"><span>Maintenance</span> <span>Low (3/10)</span></div>
                            <div className="svc-graph-bar-track"><div className="svc-graph-bar-fill" style={{width: '30%'}}></div></div>
                        </div>
                        <div className="svc-graph-bar">
                            <div className="svc-graph-bar-label"><span>Aesthetics</span> <span>High (8/10)</span></div>
                            <div className="svc-graph-bar-track"><div className="svc-graph-bar-fill" style={{width: '80%'}}></div></div>
                        </div>
                    </div>

                    
            <div className="svc-section card">
                <h3>BEST SAFETY IN KID S PLAYGROUND WITH {config.companyName} EPDM PLAY AREA FLOORING</h3>
                
            </div>
            <div className="svc-section card">
                <h3>WHY EPDM FLOORING?</h3>
                
            </div>
            <div className="svc-section card">
                <h3>{config.companyName} EPDM PLAY AREA / KINDERGARTEN FLOORING</h3>
                
            </div>
            <div className="svc-section card">
                <h3>HIGH-DENSITY EPDM PLAY AREA SYSTEM 20 MM – 30 MM</h3>
                
            </div>
            <div className="svc-section card">
                <h3>The Ideal Choice for Kindergartens and Playgrounds</h3>
                
            </div>
            <div className="svc-section card">
                <h3>Frequently Ask Question</h3>
                
            </div>
                </div>
            </div>
        </div>
    );
};

export default PlayAreaFlooringService;
