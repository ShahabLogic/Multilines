import React, { useContext }  from 'react';
import '../../styles/services.css';
import { ConfigContext } from '../../context/ConfigContext';

const RunningTrackService = () => {
    const { config } = useContext(ConfigContext);
    return (
        <div className="svc-page">
            <div className="svc-hero">
                <h1>Running Track</h1>
                <p className="svc-breadcrumb">Services &rsaquo; Running Track</p>
            </div>

            <div className="svc-body">
                <div className="svc-intro">
                    <p>At {config.companyName}, we provide high-quality rubber and polyurethane running and jogging track surfaces, known for their comfort and durability. As a leading expert in synthetic running track construction, we install {config.companyName} Polyurethane EPDM Running Tracks across Pakistan, ensuring top-tier performance for athletes and recreational runners alike.</p>
                <p>An athlete recognizes the value of excellent running and jogging track. {config.companyName} running and jogging track is made from proprietary Polyurethane resin binder and best quality EPDM granules.​{config.companyName} provides the highest quality, durable and safe indoor and outdoor EPDM running and jogging tracks installation. {config.companyName} EPDM PU running tracks have optimal surface traction to provide safety, stability, and less energy loss. EPDM granules deliver extra cushioning and reduces the direct stress applied during an intense workout.</p>
                <p>{config.companyName} EPDM PU Track is resistant to extreme temperatures making it a long-lasting material that is easy to clean with minimal cost of maintenance.</p>
                <p>{config.companyName} Running Track Flooring products are carefully selected to offer a consistent and smooth surface texture with optimal traction and friction for the safety of runners and walkers. In addition, {config.companyName} floor solutions for running tracks provide exceptional shock absorption, which helps to protect joints from impact force and prevents stress on lower extremities. By integrating comfort, balance, and support, our indoor running track flooring systems will make your facility a prime destination for training sessions.</p>
                </div>

                <div className="svc-gallery">
                    
                <div key={0} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2024/08/c2.webp' alt='Running Track 1' />
                </div>
                <div key={1} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2024/08/0c22e0_d52959687cca494e8e950708bdf25f08mv2.webp' alt='Running Track 2' />
                </div>
                <div key={2} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2024/08/dgfdfdg.webp' alt='Running Track 3' />
                </div>
                <div key={3} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2024/08/{config.companyName}-Sports-Flooring-Pakistan-3.webp' alt='Running Track 4' />
                </div>
                </div>

                
                <div className="svc-stats-grid">
                    <div className="stat-card">
                        <span className="stat-num">IAAF</span>
                        <span className="stat-label">Certified</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-num">10+ yr</span>
                        <span className="stat-label">Lifespan</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-num">100%</span>
                        <span className="stat-label">Weatherproof</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-num">High</span>
                        <span className="stat-label">Energy Return</span>
                    </div>
                </div>

                <div className="svc-sections">
                    <div className="svc-section card">
                        <h3>Performance Metrics</h3>
                        <p>Our flooring systems are scientifically formulated to provide optimal conditions:</p>
                        <div className="svc-graph-bar">
                            <div className="svc-graph-bar-label"><span>Shock Absorption</span> <span>High (8/10)</span></div>
                            <div className="svc-graph-bar-track"><div className="svc-graph-bar-fill" style={{width: '80%'}}></div></div>
                        </div>
                        <div className="svc-graph-bar">
                            <div className="svc-graph-bar-label"><span>Slip Resistance</span> <span>Outstanding (9/10)</span></div>
                            <div className="svc-graph-bar-track"><div className="svc-graph-bar-fill" style={{width: '90%'}}></div></div>
                        </div>
                        <div className="svc-graph-bar">
                            <div className="svc-graph-bar-label"><span>Weather Resistance</span> <span>Excellent (10/10)</span></div>
                            <div className="svc-graph-bar-track"><div className="svc-graph-bar-fill" style={{width: '100%'}}></div></div>
                        </div>
                    </div>

                    
            <div className="svc-section card">
                <h3>BEST ATHLETIC RUNNING TRACK SYSTEMS IN PAKISTAN</h3>
                
            </div>
            <div className="svc-section card">
                <h3>{config.companyName} running and jogging track</h3>
                
            </div>
            <div className="svc-section card">
                <h3>BEST FLOORING FOR INDOOR & OUTDOOR RUNNING TRACKS</h3>
                
            </div>
            <div className="svc-section card">
                <h3>RUNNING | JOGGING | WALKING TRACKS</h3>
                
            </div>
            <div className="svc-section card">
                <h3>Frequently Ask Question</h3>
                
            </div>
                </div>
            </div>
        </div>
    );
};

export default RunningTrackService;
