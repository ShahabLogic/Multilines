import React, { useContext }  from 'react';
import '../../styles/services.css';
import { ConfigContext } from '../../context/ConfigContext';

const IndoorPickleballFlooringService = () => {
    const { config } = useContext(ConfigContext);
    return (
        <div className="svc-page">
            <div className="svc-hero">
                <h1>Indoor Pickleball Flooring</h1>
                <p className="svc-breadcrumb">Services &rsaquo; Indoor Pickleball Flooring</p>
            </div>

            <div className="svc-body">
                <div className="svc-intro">
                    <p>Pickleball is a rapidly growing sport, and to play successfully and comfortably, you need to have appropriate floors. {config.companyName} meets the standards for the best indoor pickleball flooring court by providing great performance, durability, and safety. Pickleball flooring can be applied by a professional organization, a school gymnasium, or some recreational space, thus flooring solutions cover the area and it is resistant to damage for a long time.</p>
                <p>With the usage of high-quality materials; engineered to meet the requirements of international standards, our flooring systems are the best on the market. Thus, natural grip, shock absorption, and ball bounce are significantly improved, so the chances of getting injured are minimized and it leaves you and others with an unforgettable experience.</p>
                <p>We have a configurable range of products that includes synthetic surfaces and cushioned floors. At {config.companyName} Solutions, we only use the best raw materials and technology of the highest quality. Moreover, whether it is a competitive game or just a casual one, our flooring solutions will establish a surface where champions win.</p>
                <p>We are using the best materials to meet the quality standard and to avoid wear and tear.</p>
                </div>

                <div className="svc-gallery">
                    
                <div key={0} className="svc-img-card">
                    <img src='/wp-content/uploads/2025/01/f1a551948a.jpg' alt='Indoor Pickleball Flooring 1' />
                </div>
                <div key={1} className="svc-img-card">
                    <img src='/wp-content/uploads/2025/01/2606ae176e.jpg' alt='Indoor Pickleball Flooring 2' />
                </div>
                <div key={2} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture62.png' alt='Indoor Pickleball Flooring 3' />
                </div>
                <div key={3} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture61.png' alt='Indoor Pickleball Flooring 4' />
                </div>
                <div key={4} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture60.png' alt='Indoor Pickleball Flooring 5' />
                </div>
                <div key={5} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture59.jpg' alt='Indoor Pickleball Flooring 6' />
                </div>
                <div key={6} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture58.jpg' alt='Indoor Pickleball Flooring 7' />
                </div>
                <div key={7} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture57.png' alt='Indoor Pickleball Flooring 8' />
                </div>
                </div>

                
                <div className="svc-stats-grid">
                    <div className="stat-card">
                        <span className="stat-num">FIBA</span>
                        <span className="stat-label">Compliant</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-num">25%</span>
                        <span className="stat-label">Shock Absorb</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-num">100%</span>
                        <span className="stat-label">Non-Glare</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-num">Low</span>
                        <span className="stat-label">Friction</span>
                    </div>
                </div>

                <div className="svc-sections">
                    <div className="svc-section card">
                        <h3>Performance Metrics</h3>
                        <p>Our flooring systems are scientifically formulated to provide optimal conditions:</p>
                        <div className="svc-graph-bar">
                            <div className="svc-graph-bar-label"><span>Ball Bounce</span> <span>Consistent (10/10)</span></div>
                            <div className="svc-graph-bar-track"><div className="svc-graph-bar-fill" style={{width: '100%'}}></div></div>
                        </div>
                        <div className="svc-graph-bar">
                            <div className="svc-graph-bar-label"><span>Force Reduction</span> <span>Good (7/10)</span></div>
                            <div className="svc-graph-bar-track"><div className="svc-graph-bar-fill" style={{width: '70%'}}></div></div>
                        </div>
                        <div className="svc-graph-bar">
                            <div className="svc-graph-bar-label"><span>Maintenance</span> <span>Low (2/10)</span></div>
                            <div className="svc-graph-bar-track"><div className="svc-graph-bar-fill" style={{width: '20%'}}></div></div>
                        </div>
                    </div>

                    
            <div className="svc-section card">
                <h3>Introduction</h3>
                
            </div>
            <div className="svc-section card">
                <h3>Why Choose Our Basketball Court Flooring?</h3>
                
            </div>
            <div className="svc-section card">
                <h3>Premium Quality Materials</h3>
                <p>We are using the best materials to meet the quality standard and to avoid wear and tear.</p>
            </div>
            <div className="svc-section card">
                <h3>Non-Slip Surface</h3>
                <p>The well-being of the players is one of the general principles and as such, the courts will feature the non-slip surface, that way the players will have an easier time standing thus enhancing their quick games at a slow pace.</p>
            </div>
            <div className="svc-section card">
                <h3>Custom Designs</h3>
                <p>Unique designs are among the various choices we present through our use of materials and craftsmanship, which often reflects on the client s aspiration to either create a new court or fix the existing one.</p>
            </div>
            <div className="svc-section card">
                <h3>Cost-Effective</h3>
                <p>Purchase first-class flooring that delivers in terms of performance, durability, and value for your investment.</p>
            </div>
                </div>
            </div>
        </div>
    );
};

export default IndoorPickleballFlooringService;
