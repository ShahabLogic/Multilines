import React, { useContext }  from 'react';
import '../../styles/services.css';
import { ConfigContext } from '../../context/ConfigContext';

const SportsCourtsService = () => {
    const { config } = useContext(ConfigContext);
    return (
        <div className="svc-page">
            <div className="svc-hero">
                <h1>Sports Courts</h1>
                <p className="svc-breadcrumb">Services &rsaquo; Sports Courts</p>
            </div>

            <div className="svc-body">
                <div className="svc-intro">
                    <p>Our {config.companyName} Acrylic Sports Flooring is available in various colors to complement your facility’s aesthetic. Designed for durability, these floors are UV and weather resistant, ensuring long-lasting elasticity for sports like basketball, badminton, volleyball, and tennis. Additionally, {config.companyName} Acrylic Flooring is cost-efficient, requiring minimal maintenance while delivering top-tier performance.</p>
                <p>Consistency in performance and play is a major factor when it comes to sports. That’s why {config.companyName} Acrylic Sports Flooring offers the right degree of support and resilience needed for high level play. If you’re looking for durable sports court flooring that will continue to perform year after year – {config.companyName} has the right flooring surface for you.</p>
                <p>Design your own court with {config.companyName} Acrylic Sports Flooring to eliminate safety hazards, and maximize athletic potential where pivoting and sprinting during play will never be a problem. ​{config.companyName} Acrylic Sports Flooring products are excellent for sports courts because they provide natural ball rebound and superior traction.</p>
                <p>{config.companyName} can provide a sports court with multiple game lines painted on to allow basketball and volleyball teams to practice and play on the same surface, saving money and space. Lines for sports like, badminton, soccer, can be added on {config.companyName} Acrylic Sports Flooring. Your floor is a blank canvas, and {config.companyName} will work with you to paint it exactly the way you want.</p>
                </div>

                <div className="svc-gallery">
                    
                <div key={0} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/08/Tanis.webp' alt='Sports Courts 1' />
                </div>
                <div key={1} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2024/08/{config.companyName}-outdoor-sports-flooring.webp' alt='Sports Courts 2' />
                </div>
                <div key={2} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2024/09/Picture1.jpg' alt='Sports Courts 3' />
                </div>
                <div key={3} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2024/08/0c22e0_1f8f9b0981a141ee9a4d4f80ba78c040mv2.webp' alt='Sports Courts 4' />
                </div>
                <div key={4} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2024/08/0c22e0_36147b6529274883a785809a50ea8206mv2.webp' alt='Sports Courts 5' />
                </div>
                <div key={5} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2024/08/0c22e0_d77e60ae651e45b1810dc9ea615aa8f0mv2.webp' alt='Sports Courts 6' />
                </div>
                <div key={6} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2024/08/134.webp' alt='Sports Courts 7' />
                </div>
                <div key={7} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2024/08/4355dzc.webp' alt='Sports Courts 8' />
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
                <h3>BEST FLOORING SURFACES FOR SPORTS COURTS</h3>
                
            </div>
            <div className="svc-section card">
                <h3>{config.companyName} PROVIDES THE HIGHEST QUALITY SYNTHETIC INDOOR AND OUTDOOR SPORTS COURT FLOORING</h3>
                
            </div>
            <div className="svc-section card">
                <h3>INDOOR & OUTDOOR COURTS</h3>
                
            </div>
            <div className="svc-section card">
                <h3>PERFORMANCE & DURABILITY</h3>
                <p>Consistency in performance and play is a major factor when it comes to sports. That’s why {config.companyName} Acrylic Sports Flooring offers the right degree of support and resilience needed for high level play. If you’re looking for durable sports court flooring that will continue to perform year after year – {config.companyName} has the right flooring surface for you.</p>
            </div>
            <div className="svc-section card">
                <h3>SPORTS FLOORING YOU CAN COUNT ON</h3>
                <p>Design your own court with {config.companyName} Acrylic Sports Flooring to eliminate safety hazards, and maximize athletic potential where pivoting and sprinting during play will never be a problem. ​{config.companyName} Acrylic Sports Flooring products are excellent for sports courts because they provide natural ball rebound and superior traction.</p>
            </div>
            <div className="svc-section card">
                <h3>PLAY MULTIPLE SPORTS ON ONE FLOOR</h3>
                <p>{config.companyName} can provide a sports court with multiple game lines painted on to allow basketball and volleyball teams to practice and play on the same surface, saving money and space. Lines for sports like, badminton, soccer, can be added on {config.companyName} Acrylic Sports Flooring. Your floor is a blank canvas, and {config.companyName} will work with you to paint it exactly the way you want.</p>
            </div>
                </div>
            </div>
        </div>
    );
};

export default SportsCourtsService;
