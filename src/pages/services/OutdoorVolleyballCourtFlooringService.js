import React, { useContext }  from 'react';
import '../../styles/services.css';
import { ConfigContext } from '../../context/ConfigContext';

const OutdoorVolleyballCourtFlooringService = () => {
    const { config } = useContext(ConfigContext);
    return (
        <div className="svc-page">
            <div className="svc-hero">
                <h1>Outdoor Volleyball Court Flooring</h1>
                <p className="svc-breadcrumb">Services &rsaquo; Outdoor Volleyball Court Flooring</p>
            </div>

            <div className="svc-body">
                <div className="svc-intro">
                    <p>An outdoor volleyball court flooring requires flooring that is weather-resistant, durable and has good traction. {config.companyName} offers high-performance outdoor volleyball flooring that can withstand extreme weather conditions, UV radiation, and high foot traffic. Our solutions are suitable for sports complexes, parks, schools, universities, and recreational centers to provide a safe and enjoyable playing experience.</p>
                <p>Outdoor courts need surfaces that are injury-free, wear-resistant, and offer the best ball bounce and grip. Our high-end flooring solutions are acrylic synthetic surfaces, modular interlocking tiles, and cushioned PU flooring, all of which can withstand harsh weather conditions while offering high-performance playability. Our professional team guarantees smooth installation with a durable, professional finish.</p>
                <p>Resists heat, rain, and temperature changes.</p>
                <p>Shields against sun damage and water buildup.</p>
                </div>

                <div className="svc-gallery">
                    
                <div key={0} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2025/02/c18dececaa.jpg' alt='Outdoor Volleyball Court Flooring 1' />
                </div>
                <div key={1} className="svc-img-card">
                    <img src='/wp-content/uploads/2025/01/3ec2d78725.jpg' alt='Outdoor Volleyball Court Flooring 2' />
                </div>
                <div key={2} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture62.png' alt='Outdoor Volleyball Court Flooring 3' />
                </div>
                <div key={3} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture61.png' alt='Outdoor Volleyball Court Flooring 4' />
                </div>
                <div key={4} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture60.png' alt='Outdoor Volleyball Court Flooring 5' />
                </div>
                <div key={5} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture59.jpg' alt='Outdoor Volleyball Court Flooring 6' />
                </div>
                <div key={6} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture58.jpg' alt='Outdoor Volleyball Court Flooring 7' />
                </div>
                <div key={7} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture57.png' alt='Outdoor Volleyball Court Flooring 8' />
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
                <h3>Why Choose Our Outdoor Volleyball Court Flooring ?</h3>
                
            </div>
            <div className="svc-section card">
                <h3>Weather-Resistant Materials</h3>
                <p>Resists heat, rain, and temperature changes.</p>
            </div>
            <div className="svc-section card">
                <h3>UV & Moisture Resistant</h3>
                <p>Shields against sun damage and water buildup.</p>
            </div>
            <div className="svc-section card">
                <h3>Non-Slip & Impact Absorbing</h3>
                <p>Slows down slips and minimizes strain on joints.</p>
            </div>
            <div className="svc-section card">
                <h3>Durable & Low Maintenance</h3>
                <p>Long-lasting with little maintenance.</p>
            </div>
                </div>
            </div>
        </div>
    );
};

export default OutdoorVolleyballCourtFlooringService;
