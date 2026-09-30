import React, { useContext }  from 'react';
import '../../styles/services.css';
import { ConfigContext } from '../../context/ConfigContext';

const IndoorPaddleTennisFlooringService = () => {
    const { config } = useContext(ConfigContext);
    return (
        <div className="svc-page">
            <div className="svc-hero">
                <h1>Indoor Paddle Tennis Flooring</h1>
                <p className="svc-breadcrumb">Services &rsaquo; Indoor Paddle Tennis Flooring</p>
            </div>

            <div className="svc-body">
                <div className="svc-intro">
                    <p>{config.companyName}, Pakistan’s leader in the production of high-quality indoor paddle tennis flooring, sets the industry standard for excellence, durability, and safety. Going from developing a professional sports facility to designing a private club or a recreational center, our floor systems, cutting-edge, are specifically created to upgrade the moving quality, apart from no players getting harmed down the road.</p>
                <p>The floor must be in line with international standards to provide excellent ball bounce, shock absorption, and slip resistance, so the players can play at their best without having to worry about the risk of injuries.</p>
                <p>{config.companyName} with its emphasis on inventions and long-term reliability is ready to provide a variety of our solutions adjusted to the various court requirements which include professional competitions and casual play. Our tennis courts are devised with cutting-edge materials, excellent labor, and a qualitative index that has been taken to extraordinary levels.</p>
                <p>We use top-tier materials that are on top of the list and are designed for high performance, wear resistance, and durability sustained for many years.</p>
                </div>

                <div className="svc-gallery">
                    
                <div key={0} className="svc-img-card">
                    <img src='/wp-content/uploads/2025/01/0aa0334529.jpg' alt='Indoor Paddle Tennis Flooring 1' />
                </div>
                <div key={1} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture10.png' alt='Indoor Paddle Tennis Flooring 2' />
                </div>
                <div key={2} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture62.png' alt='Indoor Paddle Tennis Flooring 3' />
                </div>
                <div key={3} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture61.png' alt='Indoor Paddle Tennis Flooring 4' />
                </div>
                <div key={4} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture60.png' alt='Indoor Paddle Tennis Flooring 5' />
                </div>
                <div key={5} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture59.jpg' alt='Indoor Paddle Tennis Flooring 6' />
                </div>
                <div key={6} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture58.jpg' alt='Indoor Paddle Tennis Flooring 7' />
                </div>
                <div key={7} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture57.png' alt='Indoor Paddle Tennis Flooring 8' />
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
                <h3>Why Choose Our paddle tennis court flooring?</h3>
                
            </div>
            <div className="svc-section card">
                <h3>Premium Quality Materials</h3>
                <p>We use top-tier materials that are on top of the list and are designed for high performance, wear resistance, and durability sustained for many years.</p>
            </div>
            <div className="svc-section card">
                <h3>Non-Slip Surface</h3>
                <p>The well-being of the players is one of the general principles and as such, the courts will feature the non-slip surface, that way the players will have an easier time standing thus enhancing their quick games at a slow pace.</p>
            </div>
            <div className="svc-section card">
                <h3>Custom Designs</h3>
                <p>Our customized models will let you build from a unique idea of a court in the actual world whether you are adding it to your existing infrastructure or you are constructing the court from scratch.</p>
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

export default IndoorPaddleTennisFlooringService;
