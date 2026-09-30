import React, { useContext }  from 'react';
import '../../styles/services.css';
import { ConfigContext } from '../../context/ConfigContext';

const OutdoorTennisCourtsFlooringService = () => {
    const { config } = useContext(ConfigContext);
    return (
        <div className="svc-page">
            <div className="svc-hero">
                <h1>Outdoor Tennis Courts Flooring</h1>
                <p className="svc-breadcrumb">Services &rsaquo; Outdoor Tennis Courts Flooring</p>
            </div>

            <div className="svc-body">
                <div className="svc-intro">
                    <p>Upgrade your tennis court with {config.companyName}’ outdoor tennis courts flooring, well-thought-out and tested to bring toughness, high quality, and resistance regardless of the weather. It does not matter whether your court is a professional facility, a school court, or a recreational association, we provide flooring that will add efficiency to the players and at the same time, will minimize the risk of injury.</p>
                <p>The flooring is so tough that it can easily withstand extreme outdoor conditions including brutal sunshine, heavy rainfall, and temperature fluctuations, thus, the performance is kept at the highest level from year to year.</p>
                <p>The prevention of the effect of sun rays on the material is only one of the numerous benefits of the UV-resistant material. The floor will remain alive and kicking and your court will be a perfect place for events and training sessions. Moreover, {config.companyName} can design bespoke products with fast installation options and low maintenance costs for any outdoor tennis court to make it perfect.</p>
                <p>Our products can endure the harshest weather conditions. The surfaces we build are designed to last and will not be affected by weather extremes.</p>
                </div>

                <div className="svc-gallery">
                    
                <div key={0} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2025/01/614e92c5b6.jpg' alt='Outdoor Tennis Courts Flooring 1' />
                </div>
                <div key={1} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2025/01/e310a6aa98.jpg' alt='Outdoor Tennis Courts Flooring 2' />
                </div>
                <div key={2} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture62.png' alt='Outdoor Tennis Courts Flooring 3' />
                </div>
                <div key={3} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture61.png' alt='Outdoor Tennis Courts Flooring 4' />
                </div>
                <div key={4} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture60.png' alt='Outdoor Tennis Courts Flooring 5' />
                </div>
                <div key={5} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture59.jpg' alt='Outdoor Tennis Courts Flooring 6' />
                </div>
                <div key={6} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture58.jpg' alt='Outdoor Tennis Courts Flooring 7' />
                </div>
                <div key={7} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture57.png' alt='Outdoor Tennis Courts Flooring 8' />
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
                <h3>Why Choose Our Outdoor Tennis Courts Flooring?</h3>
                
            </div>
            <div className="svc-section card">
                <h3>High-Quality Materials</h3>
                <p>Our products can endure the harshest weather conditions. The surfaces we build are designed to last and will not be affected by weather extremes.</p>
            </div>
            <div className="svc-section card">
                <h3>Cost-Effective</h3>
                <p>You do not have to choose between the quality of products and price as we remain the cheapest. You will always have high performance in our products without the need to spend less.</p>
            </div>
            <div className="svc-section card">
                <h3>Safety First</h3>
                <p>Our system incorporates high-friction materials that have been proven to reduce injuries on the court..</p>
            </div>
            <div className="svc-section card">
                <h3>Non-Slip Surface</h3>
                <p>The core principle behind our product design philosophy is the safety of the athletes. It hence follows that the product we are offering is the one that contains the anti-slip surface to help the athletes maintain balance even under high-speed conditions.</p>
            </div>
                </div>
            </div>
        </div>
    );
};

export default OutdoorTennisCourtsFlooringService;
