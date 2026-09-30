import React, { useContext }  from 'react';
import '../../styles/services.css';
import { ConfigContext } from '../../context/ConfigContext';

const IndoorFutsalFlooringService = () => {
    const { config } = useContext(ConfigContext);
    return (
        <div className="svc-page">
            <div className="svc-hero">
                <h1>Indoor Futsal Flooring</h1>
                <p className="svc-breadcrumb">Services &rsaquo; Indoor Futsal Flooring</p>
            </div>

            <div className="svc-body">
                <div className="svc-intro">
                    <p>{config.companyName} Solutions offers the best indoor futsal flooring court solution, which will produce the best performance, durability, and safety. Whether you want to build a professional futsal arena, a futsal court in a school, or a community center, our flooring solutions give you the flexibility, quality, and durability you need.</p>
                <p>Our flooring with international sports standards guarantees that players of all levels will have the best game by achieving better ball control, and grip, and preventing injuries. Our flooring systems undergo the most advanced technology and are made of premium materials to resist even tough conditions and provide high-performance year after year.</p>
                <p>We use premium materials for high performance and a long lifespan of the sports facility.</p>
                <p>Firstly, the safety of the athletes is taken into mind with the help of a high grip on the surface during active playing.</p>
                </div>

                <div className="svc-gallery">
                    
                <div key={0} className="svc-img-card">
                    <img src='/wp-content/uploads/2025/01/1b044ae302.jpg' alt='Indoor Futsal Flooring 1' />
                </div>
                <div key={1} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2025/01/db877e5102.jpg' alt='Indoor Futsal Flooring 2' />
                </div>
                <div key={2} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2025/01/4930f97a1a.jpg' alt='Indoor Futsal Flooring 3' />
                </div>
                <div key={3} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture62.png' alt='Indoor Futsal Flooring 4' />
                </div>
                <div key={4} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture61.png' alt='Indoor Futsal Flooring 5' />
                </div>
                <div key={5} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture60.png' alt='Indoor Futsal Flooring 6' />
                </div>
                <div key={6} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture59.jpg' alt='Indoor Futsal Flooring 7' />
                </div>
                <div key={7} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture58.jpg' alt='Indoor Futsal Flooring 8' />
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
                <h3>Why Choose Our Futsal Court Flooring?</h3>
                
            </div>
            <div className="svc-section card">
                <h3>Premium Quality Materials</h3>
                <p>We use premium materials for high performance and a long lifespan of the sports facility.</p>
            </div>
            <div className="svc-section card">
                <h3>Non-Slip Surface</h3>
                <p>Firstly, the safety of the athletes is taken into mind with the help of a high grip on the surface during active playing.</p>
            </div>
            <div className="svc-section card">
                <h3>Custom Designs</h3>
                <p>We create designs that better replicate your ideas and fit your chosen colors, patterns, and finishes.</p>
            </div>
            <div className="svc-section card">
                <h3>Eco-Friendly Options</h3>
                <p>Environmentally friendly materials that help to improve the environment.</p>
            </div>
                </div>
            </div>
        </div>
    );
};

export default IndoorFutsalFlooringService;
