import React, { useContext }  from 'react';
import '../../styles/services.css';
import { ConfigContext } from '../../context/ConfigContext';

const MultiPurposeCourtsFlooringService = () => {
    const { config } = useContext(ConfigContext);
    return (
        <div className="svc-page">
            <div className="svc-hero">
                <h1>Multi-Purpose Courts Flooring</h1>
                <p className="svc-breadcrumb">Services &rsaquo; Multi-Purpose Courts Flooring</p>
            </div>

            <div className="svc-body">
                <div className="svc-intro">
                    <p>Create a modern sports complex with {config.companyName}’ quality multi-purpose courts flooring models – a guarantee of their multi-sport usage being hard to break, low consumption of resources, and top technology.</p>
                <p>Regardless of basketball, futsal, volleyball, badminton, pickleball, or tennis our flooring kits always grant players a safe and comfortable playground. The flooring of our multi-purpose court has the advantage of being able to support heavy traffic and extreme weather too, boasting excellent shock absorption, a lot of grip, and also high durability.</p>
                <p>With your favorite colors, low maintenance, and a quick, easy installation – the {config.companyName} floor system effortlessly turns a regular outdoor court into a professional stadium that is good for the bigger part of decorating sports facilities anywhere in the world.</p>
                <p>Multi-purpose flooring can be used for sports such as basketball, futsal, tennis, and volleyball.</p>
                </div>

                <div className="svc-gallery">
                    
                <div key={0} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2025/01/Multi-Purpose-Court-Flooring.webp' alt='Multi-Purpose Courts Flooring 1' />
                </div>
                <div key={1} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2025/01/70bcba9bb0.jpg' alt='Multi-Purpose Courts Flooring 2' />
                </div>
                <div key={2} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture62.png' alt='Multi-Purpose Courts Flooring 3' />
                </div>
                <div key={3} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture61.png' alt='Multi-Purpose Courts Flooring 4' />
                </div>
                <div key={4} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture60.png' alt='Multi-Purpose Courts Flooring 5' />
                </div>
                <div key={5} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture59.jpg' alt='Multi-Purpose Courts Flooring 6' />
                </div>
                <div key={6} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture58.jpg' alt='Multi-Purpose Courts Flooring 7' />
                </div>
                <div key={7} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture57.png' alt='Multi-Purpose Courts Flooring 8' />
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
                <h3>Why Choose Our Multi-Purpose Court Flooring?</h3>
                
            </div>
            <div className="svc-section card">
                <h3>All-in-One Solution</h3>
                <p>Multi-purpose flooring can be used for sports such as basketball, futsal, tennis, and volleyball.</p>
            </div>
            <div className="svc-section card">
                <h3>Customizable Designs</h3>
                <p>Depending on the sport to be played, you can change the colors or the way the markings are programmed.</p>
            </div>
            <div className="svc-section card">
                <h3>Durable & Weather-Resistant</h3>
                <p>It maintains its color and can withstand rain, heat, and cold weather conditions.</p>
            </div>
            <div className="svc-section card">
                <h3>Fast Installation</h3>
                <p>It only takes a few minutes for the assembled equipment to be ready to play and for all the material provided by the company to be put out in the field.</p>
            </div>
                </div>
            </div>
        </div>
    );
};

export default MultiPurposeCourtsFlooringService;
