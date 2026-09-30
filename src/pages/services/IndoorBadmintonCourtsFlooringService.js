import React, { useContext }  from 'react';
import '../../styles/services.css';
import { ConfigContext } from '../../context/ConfigContext';

const IndoorBadmintonCourtsFlooringService = () => {
    const { config } = useContext(ConfigContext);
    return (
        <div className="svc-page">
            <div className="svc-hero">
                <h1>Indoor Badminton Courts Flooring</h1>
                <p className="svc-breadcrumb">Services &rsaquo; Indoor Badminton Courts Flooring</p>
            </div>

            <div className="svc-body">
                <div className="svc-intro">
                    <p>Upgrade your badminton facility with the high-quality Indoor Badminton Courts Flooring of {config.companyName} which gives an unparalleled performance. The system is designed to offer grip at the maximum, reduce shock, and ensure consistent ball bounce.</p>
                <p>Invest in high-quality, low-maintenance flooring, which will stay as good as new. Our flooring is robust and can handle rough use which is why we can guarantee that the playing surface will last for many years. The price and quality we offer are unrivaled.</p>
                <p>We use material that eliminates the risk of injury and creates security and flexibility for the players. At {config.companyName} Solutions, we provide the support that players need to be at their best in every game.</p>
                <p>Durability is the only aim, therefore, we use only excellent materials.</p>
                </div>

                <div className="svc-gallery">
                    
                <div key={0} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2025/01/1e2538ad99.png' alt='Indoor Badminton Courts Flooring 1' />
                </div>
                <div key={1} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2025/01/61ed4625b6.jpg' alt='Indoor Badminton Courts Flooring 2' />
                </div>
                <div key={2} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2025/01/ac572e2dc7-e1739020869485.jpg' alt='Indoor Badminton Courts Flooring 3' />
                </div>
                <div key={3} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture62.png' alt='Indoor Badminton Courts Flooring 4' />
                </div>
                <div key={4} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture61.png' alt='Indoor Badminton Courts Flooring 5' />
                </div>
                <div key={5} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture60.png' alt='Indoor Badminton Courts Flooring 6' />
                </div>
                <div key={6} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture59.jpg' alt='Indoor Badminton Courts Flooring 7' />
                </div>
                <div key={7} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture58.jpg' alt='Indoor Badminton Courts Flooring 8' />
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
                <h3>Why Choose Our Badminton Court Flooring?</h3>
                
            </div>
            <div className="svc-section card">
                <h3>Best Quality Materials</h3>
                <p>Durability is the only aim, therefore, we use only excellent materials.</p>
            </div>
            <div className="svc-section card">
                <h3>Zero-Slip Flooring</h3>
                <p>Athletes will have better control while playing fast if they feel confident to grip.</p>
            </div>
            <div className="svc-section card">
                <h3>Customizations</h3>
                <p>Paintball, finish, and, color, patterns are among the things you can personalize with.</p>
            </div>
            <div className="svc-section card">
                <h3>Longevity</h3>
                <p>The mats are made for high-impact activities and to handle heavy weight.</p>
            </div>
                </div>
            </div>
        </div>
    );
};

export default IndoorBadmintonCourtsFlooringService;
