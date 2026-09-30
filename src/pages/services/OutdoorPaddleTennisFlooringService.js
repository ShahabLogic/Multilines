import React, { useContext }  from 'react';
import '../../styles/services.css';
import { ConfigContext } from '../../context/ConfigContext';

const OutdoorPaddleTennisFlooringService = () => {
    const { config } = useContext(ConfigContext);
    return (
        <div className="svc-page">
            <div className="svc-hero">
                <h1>Outdoor Paddle Tennis Flooring</h1>
                <p className="svc-breadcrumb">Services &rsaquo; Outdoor Paddle Tennis Flooring</p>
            </div>

            <div className="svc-body">
                <div className="svc-intro">
                    <p>{config.companyName} understands the extraordinary demand for outdoor activities, which makes the outdoor paddle tennis flooring court engineered to operate at the highest level at any time, regardless of the climate. As an example, in the case of open-air environments, special flooring systems can be built to endure harsh sun exposure or UV radiation, heavy rainfall, and the lousiness of outdoor play.</p>
                <p>Indeed, if your idea is to install the court in a recreational park, a sports complex, or a private club then our floorings are the best, which is why we are a leading sports flooring solution in Pakistan. Our flooring is the most cost-effective and yet the safest, the most environmentally friendly in the market.</p>
                <p>With excellent sunlight resistance, control of moisture levels, and the durability of long-lasting service, the outdoor court of {config.companyName} assures you of its topmost performance throughout the year while players do not have to move off the level but are always provided with constant good play.</p>
                <p>Make the right decision to go for {config.companyName} Solutions thereby getting the best outdoor paddle tennis court that can be utilized in adverse weather conditions providing the player the most enjoyment most of the time.</p>
                </div>

                <div className="svc-gallery">
                    
                <div key={0} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2025/01/29b479c598.jpg' alt='Outdoor Paddle Tennis Flooring 1' />
                </div>
                <div key={1} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2025/01/ea0defc87b.jpg' alt='Outdoor Paddle Tennis Flooring 2' />
                </div>
                <div key={2} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture62.png' alt='Outdoor Paddle Tennis Flooring 3' />
                </div>
                <div key={3} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture61.png' alt='Outdoor Paddle Tennis Flooring 4' />
                </div>
                <div key={4} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture60.png' alt='Outdoor Paddle Tennis Flooring 5' />
                </div>
                <div key={5} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture59.jpg' alt='Outdoor Paddle Tennis Flooring 6' />
                </div>
                <div key={6} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture58.jpg' alt='Outdoor Paddle Tennis Flooring 7' />
                </div>
                <div key={7} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture57.png' alt='Outdoor Paddle Tennis Flooring 8' />
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
                <h3>Why Choose Our Outdoor Paddle Tennis Flooring</h3>
                
            </div>
            <div className="svc-section card">
                <h3>Weather-Resistant</h3>
                <p>Our flooring is created in such a way that it can meet ever-changing outdoor conditions, such as UV rays, rain, and temperature.</p>
            </div>
            <div className="svc-section card">
                <h3>Low Maintenance</h3>
                <p>Our flooring is designed in a way that no special knowledge of maintenance is required to keep it clean and pleasant to use, therefore, your court will look as new as the first day with less effort to appeal to visitors.</p>
            </div>
            <div className="svc-section card">
                <h3>High-Performance</h3>
                <p>Made with top-quality material, which is responsible for giving a consistent ball bounce, good traction, and strength, the floor is the guarantor for the optimal performance of the players during the whole game.</p>
            </div>
            <div className="svc-section card">
                <h3>Customizable Options</h3>
                <p>Our company proposes to adjust the surface coloring and offer custom designs according to its customers’ preferences and the club s style.</p>
            </div>
                </div>
            </div>
        </div>
    );
};

export default OutdoorPaddleTennisFlooringService;
