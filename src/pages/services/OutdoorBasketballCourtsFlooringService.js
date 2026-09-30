import React, { useContext }  from 'react';
import '../../styles/services.css';
import { ConfigContext } from '../../context/ConfigContext';

const OutdoorBasketballCourtsFlooringService = () => {
    const { config } = useContext(ConfigContext);
    return (
        <div className="svc-page">
            <div className="svc-hero">
                <h1>Outdoor Basketball Courts Flooring</h1>
                <p className="svc-breadcrumb">Services &rsaquo; Outdoor Basketball Courts Flooring</p>
            </div>

            <div className="svc-body">
                <div className="svc-intro">
                    <p>{config.companyName} offers top-of-the-line and versatile outdoor basketball courts flooring that has been engineered to cope with all kinds of weather and provide the best performance.</p>
                <p>{config.companyName}’s flooring is not just your regular outdoor flooring. It is made to be the best one yet due to its durability and playing comfort. These athletic court surfaces, which are resilient to temperature bounces, are ideal for all regions no matter the climate.</p>
                <p>Our flooring could easily bear and resist the harshest weather from hot summer to spring of mass rain while staying on the ground and remain good as new and therefore always be a perfect option for open-air sports courts. Whether you want to build a community court, a recreational facility, or an elite sports arena, our flooring system will provide sturdiness, safety, and superb playing conditions to your athletes so that they perform at their best.</p>
                <p>The outdoor basketball court flooring we offer is infused with state-of-the-art materials and advanced designs that combine the essentials for a comfortable playing surface that lasts a lifetime.</p>
                </div>

                <div className="svc-gallery">
                    
                <div key={0} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2025/01/36ee7cec9f.jpg' alt='Outdoor Basketball Courts Flooring 1' />
                </div>
                <div key={1} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2025/01/f7bdb7b101.jpg' alt='Outdoor Basketball Courts Flooring 2' />
                </div>
                <div key={2} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture62.png' alt='Outdoor Basketball Courts Flooring 3' />
                </div>
                <div key={3} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture61.png' alt='Outdoor Basketball Courts Flooring 4' />
                </div>
                <div key={4} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture60.png' alt='Outdoor Basketball Courts Flooring 5' />
                </div>
                <div key={5} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture59.jpg' alt='Outdoor Basketball Courts Flooring 6' />
                </div>
                <div key={6} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture58.jpg' alt='Outdoor Basketball Courts Flooring 7' />
                </div>
                <div key={7} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture57.png' alt='Outdoor Basketball Courts Flooring 8' />
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
                <h3>Why Choose Our Outdoor Futsal Flooring?</h3>
                
            </div>
            <div className="svc-section card">
                <h3>Durability</h3>
                <p>Our outdoor flooring is designed to take the pounding of any weather without wearing out its original look.</p>
            </div>
            <div className="svc-section card">
                <h3>Safety First</h3>
                <p>Our shock-absorbing and non-slip floorings reduce the chance of getting injuries.</p>
            </div>
            <div className="svc-section card">
                <h3>Premium Materials</h3>
                <p>We use the toughest materials which are capable of withstanding anything thrown at them and still be in top-notch condition, no matter if there is rain and sun.</p>
            </div>
            <div className="svc-section card">
                <h3>Sustainable Solutions</h3>
                <p>Opt from the set of environment-friendly but no-efficiency-slagging options that will not only make your surroundings cleaner but will also help the players feel the same.</p>
            </div>
                </div>
            </div>
        </div>
    );
};

export default OutdoorBasketballCourtsFlooringService;
