import React, { useContext }  from 'react';
import '../../styles/services.css';
import { ConfigContext } from '../../context/ConfigContext';

const PolyurethanePuSportsFlooringService = () => {
    const { config } = useContext(ConfigContext);
    return (
        <div className="svc-page">
            <div className="svc-hero">
                <h1>Polyurethane (PU) Sports Flooring</h1>
                <p className="svc-breadcrumb">Services &rsaquo; Polyurethane (PU) Sports Flooring</p>
            </div>

            <div className="svc-body">
                <div className="svc-intro">
                    <p>{config.companyName} offers top-quality polyurethane (PU) sports flooring that is designed to improve sports performance, safety, and reliability on the grounds. Our polyurethane floorings are commonly used in indoor sports arenas, multipurpose gymnasiums, fitness centers, and professional training facilities as they provide an elastic surface that lessens the impact on the joints, the grip is enhanced, and the ball bounces consistently.</p>
                <p>Polyurethane sports flooring is known for its incredible resilience and ability to absorb shock, therefore, coupled with the mentioned traits it is an ideal choice for participating in indoor sports such as basketball, volleyball, badminton, futsal, and others. The surface is easy to clean, resistant to damage, and highly durable which is why it is a good choice for sports facilities whose tracks are usually bustling with people.</p>
                <p>Our polyurethane floor is specifically crafted to withstand the harshest of physical activities and provide athletes with the necessary grip, and slip resistance. A product that is good for both, athletes as well as amateurs is guaranteed. No longer will you have to install sports equipment that is vulnerable to deterioration and consumes a lot of your time and money. Thus, with the {config.companyName} Solutions products, you can complete your sports facilities by incorporating the highest quality, adaptable, and less maintenance flooring that will comply with international standards.</p>
                <p>It is made to serve for a long due to damage resistance as well as wear and tear resistance.</p>
                </div>

                <div className="svc-gallery">
                    
                <div key={0} className="svc-img-card">
                    <img src='/wp-content/uploads/2025/01/multi-use-games-area1.jpg' alt='Polyurethane (PU) Sports Flooring 1' />
                </div>
                <div key={1} className="svc-img-card">
                    <img src='/wp-content/uploads/2025/01/3987ac8b67.jpg' alt='Polyurethane (PU) Sports Flooring 2' />
                </div>
                <div key={2} className="svc-img-card">
                    <img src='/wp-content/uploads/2025/01/2de052d962.jpg' alt='Polyurethane (PU) Sports Flooring 3' />
                </div>
                <div key={3} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture62.png' alt='Polyurethane (PU) Sports Flooring 4' />
                </div>
                <div key={4} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture61.png' alt='Polyurethane (PU) Sports Flooring 5' />
                </div>
                <div key={5} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture60.png' alt='Polyurethane (PU) Sports Flooring 6' />
                </div>
                <div key={6} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture59.jpg' alt='Polyurethane (PU) Sports Flooring 7' />
                </div>
                <div key={7} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture58.jpg' alt='Polyurethane (PU) Sports Flooring 8' />
                </div>
                </div>

                
                <div className="svc-stats-grid">
                    <div className="stat-card">
                        <span className="stat-num">100%</span>
                        <span className="stat-label">Seamless</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-num">20+ yr</span>
                        <span className="stat-label">Lifespan</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-num">High</span>
                        <span className="stat-label">Chemical Resist</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-num">Anti</span>
                        <span className="stat-label">Microbial</span>
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
                            <div className="svc-graph-bar-label"><span>Chemical Resistance</span> <span>Outstanding (10/10)</span></div>
                            <div className="svc-graph-bar-track"><div className="svc-graph-bar-fill" style={{width: '100%'}}></div></div>
                        </div>
                        <div className="svc-graph-bar">
                            <div className="svc-graph-bar-label"><span>Aesthetics</span> <span>High (8/10)</span></div>
                            <div className="svc-graph-bar-track"><div className="svc-graph-bar-fill" style={{width: '80%'}}></div></div>
                        </div>
                    </div>

                    
            <div className="svc-section card">
                <h3>Introduction</h3>
                
            </div>
            <div className="svc-section card">
                <h3>Why Choose Our Polyurethane Sports Flooring</h3>
                
            </div>
            <div className="svc-section card">
                <h3>Longevity & Stability</h3>
                <p>It is made to serve for a long due to damage resistance as well as wear and tear resistance.</p>
            </div>
            <div className="svc-section card">
                <h3>Slip-Resistant</h3>
                <p>The grip is enhanced to make the possibility of slips and falls very low during high-intensity playtime.</p>
            </div>
            <div className="svc-section card">
                <h3>Linear Appearance</h3>
                <p>It enables one to have an uninterrupted, seamless playing area which can be instrumental in ensuring that the movement is achieved maximally while the chance of the injury is minimized.</p>
            </div>
            <div className="svc-section card">
                <h3>Customizable Options</h3>
                <p>Besides the different colors, the mats can also come in various thicknesses and have diverse themes and patterns.</p>
            </div>
                </div>
            </div>
        </div>
    );
};

export default PolyurethanePuSportsFlooringService;
