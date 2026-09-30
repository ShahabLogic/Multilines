import React, { useContext }  from 'react';
import '../../styles/services.css';
import { ConfigContext } from '../../context/ConfigContext';

const OutdoorFutsalFlooringService = () => {
    const { config } = useContext(ConfigContext);
    return (
        <div className="svc-page">
            <div className="svc-hero">
                <h1>Outdoor Futsal Flooring</h1>
                <p className="svc-breadcrumb">Services &rsaquo; Outdoor Futsal Flooring</p>
            </div>

            <div className="svc-body">
                <div className="svc-intro">
                    <p>Doing a outdoor futsal flooring court of high-performance quality outdoors starts with the proper flooring, as floorings are the most important thing. The reason is that we at Knaveo Solutions provide outdoor Futsal courts that have been designed to withstand outdoor game methods in a safe, durable, and attractive way, making it an all-comers affair.</p>
                <p>Our Outdoor Futsal flooring is designed to sustain harsh weather in addition to maintaining excellent grip, absorption, and gripping power of the ball, resulting in a first-class playing experience.</p>
                <p>It doesn’t matter if you are trying to build a professional futsal court, a community recreation facility, or a school sports area, {config.companyName}’s outdoor futsal flooring would be best for all the above-mentioned solutions as it offers functional, safe, and durable facilities. The resistant strength of weather conditions from the robust design and weather-resistant attributes ensures that the court remains pristine, no matter what.</p>
                <p>Specifically made to endure severe weather, such as strong sunlight, rain, and cold temperatures, guaranteeing longevity and peak performance.</p>
                </div>

                <div className="svc-gallery">
                    
                <div key={0} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2025/01/e35b7b9a3c.jpg' alt='Outdoor Futsal Flooring 1' />
                </div>
                <div key={1} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2025/01/2e48eda9be.jpg' alt='Outdoor Futsal Flooring 2' />
                </div>
                <div key={2} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture62.png' alt='Outdoor Futsal Flooring 3' />
                </div>
                <div key={3} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture61.png' alt='Outdoor Futsal Flooring 4' />
                </div>
                <div key={4} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture60.png' alt='Outdoor Futsal Flooring 5' />
                </div>
                <div key={5} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture59.jpg' alt='Outdoor Futsal Flooring 6' />
                </div>
                <div key={6} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture58.jpg' alt='Outdoor Futsal Flooring 7' />
                </div>
                <div key={7} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture57.png' alt='Outdoor Futsal Flooring 8' />
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
                <h3>Weather-Resistant</h3>
                <p>Specifically made to endure severe weather, such as strong sunlight, rain, and cold temperatures, guaranteeing longevity and peak performance.</p>
            </div>
            <div className="svc-section card">
                <h3>Improved Ball Control</h3>
                <p>When it comes to a game such as futsal which is all about precision, the unique surface on our futsal flooring works perfectly for the ball bounce and control.</p>
            </div>
            <div className="svc-section card">
                <h3>UV Protection</h3>
                <p>Our court flooring is made of UV-resistant material. This makes it always look fresh, so it is long-lasting and has no discoloration due to UV rays..</p>
            </div>
            <div className="svc-section card">
                <h3>Safety First</h3>
                <p>Friction caused by our futsal flooring s anti-slip pattern allows for excellent play, thus the player s traction is improved, minimizing the risk of undesirable accidents through slips and stumbling.</p>
            </div>
                </div>
            </div>
        </div>
    );
};

export default OutdoorFutsalFlooringService;
