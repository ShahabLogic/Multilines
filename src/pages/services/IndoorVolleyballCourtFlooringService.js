import React, { useContext }  from 'react';
import '../../styles/services.css';
import { ConfigContext } from '../../context/ConfigContext';

const IndoorVolleyballCourtFlooringService = () => {
    const { config } = useContext(ConfigContext);
    return (
        <div className="svc-page">
            <div className="svc-hero">
                <h1>Indoor Volleyball Court Flooring</h1>
                <p className="svc-breadcrumb">Services &rsaquo; Indoor Volleyball Court Flooring</p>
            </div>

            <div className="svc-body">
                <div className="svc-intro">
                    <p>Every indoor volleyball court flooring demands a specific flooring system that caters to international standards, boosts player performance, and optimizes safety. As a professional in sports flooring solutions, {config.companyName} is dedicated to providing premium indoor volleyball solutions for sports academies, schools, universities, and professional stadiums. Our specialized indoor flooring delivers the best combination of durability, shock absorption, and grip, all while guaranteeing a superb game.</p>
                <p>With volleyball’s quick movements and sudden jumps accompanied by directional changes, anti-skid, and well-cushioned flooring is crucial. We deliver a variety of flooring systems, such as cushioned vinyl, synthetic PVC, and wooden flooring. All of our options are constructed to withstand heavy use while remaining low maintenance. Our professionals mark and install the smoothest, most seamless courts to meet industry and professional standards. Regardless of whether it is training, a professional match, or a friendly game, {config.companyName} provides impeccable and customizable indoor volleyball courts for all your needs.</p>
                <p>Our PVC synthetic and cushioned vinyl as well as wooden flooring perform remarkably.</p>
                <p>Our solutions guarantee safe movement for all players while at the game.</p>
                </div>

                <div className="svc-gallery">
                    
                <div key={0} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2025/02/65cd102ed7.png' alt='Indoor Volleyball Court Flooring 1' />
                </div>
                <div key={1} className="svc-img-card">
                    <img src='/wp-content/uploads/2025/01/3ec2d78725.jpg' alt='Indoor Volleyball Court Flooring 2' />
                </div>
                <div key={2} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture62.png' alt='Indoor Volleyball Court Flooring 3' />
                </div>
                <div key={3} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture61.png' alt='Indoor Volleyball Court Flooring 4' />
                </div>
                <div key={4} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture60.png' alt='Indoor Volleyball Court Flooring 5' />
                </div>
                <div key={5} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture59.jpg' alt='Indoor Volleyball Court Flooring 6' />
                </div>
                <div key={6} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture58.jpg' alt='Indoor Volleyball Court Flooring 7' />
                </div>
                <div key={7} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture57.png' alt='Indoor Volleyball Court Flooring 8' />
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
                <h3>Why Choose Our Indoor Volleyball Court Flooring ?</h3>
                
            </div>
            <div className="svc-section card">
                <h3>Best Materials</h3>
                <p>Our PVC synthetic and cushioned vinyl as well as wooden flooring perform remarkably.</p>
            </div>
            <div className="svc-section card">
                <h3>Anti Slip</h3>
                <p>Our solutions guarantee safe movement for all players while at the game.</p>
            </div>
            <div className="svc-section card">
                <h3>Shock Absorbing Quality</h3>
                <p>All options help lift the impact of the joints and help prevent injuries.</p>
            </div>
            <div className="svc-section card">
                <h3>Long Lasting</h3>
                <p>Our products can withstand the test of time, and are easy to maintain and clean.</p>
            </div>
                </div>
            </div>
        </div>
    );
};

export default IndoorVolleyballCourtFlooringService;
