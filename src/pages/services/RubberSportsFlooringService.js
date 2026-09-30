import React, { useContext }  from 'react';
import '../../styles/services.css';
import { ConfigContext } from '../../context/ConfigContext';

const RubberSportsFlooringService = () => {
    const { config } = useContext(ConfigContext);
    return (
        <div className="svc-page">
            <div className="svc-hero">
                <h1>Rubber Sports Flooring</h1>
                <p className="svc-breadcrumb">Services &rsaquo; Rubber Sports Flooring</p>
            </div>

            <div className="svc-body">
                <div className="svc-intro">
                    <p>{config.companyName} produces high-grade rubber sports flooring which is not only super durable, but it is also very safe, and efficient, and produces such designs that it can be used for various kinds of sports. Made from high-quality rubber which is resistant to shock and increases overall grip, our rubber flooring serves as a cushiony, high-traction surface that not only adds to the players’ performance but minimizes the injury risk.</p>
                <p>Rubber flooring softens the blow, absorbs vibrations, and reduces pressure on the knees. It is suitable for gym flooring, basketball courts, volleyball courts, futsal courts, and some other sports courts.</p>
                <p>Due to its weatherproof and slip-resistant characteristics, it is ideal for both indoor conditions and situations where you don’t have protection from the weather.</p>
                <p>{config.companyName} is committed to using the latest technology and the use of superior materials, therefore, we provide our customers with the best possible solution. Our floors are user-friendly, low-maintenance, and come in various colors and thicknesses for the ideal fit of your facility.</p>
                </div>

                <div className="svc-gallery">
                    
                <div key={0} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2025/01/9d907f44c6.png' alt='Rubber Sports Flooring 1' />
                </div>
                <div key={1} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2025/01/7ea4d1f5bc.jpg' alt='Rubber Sports Flooring 2' />
                </div>
                <div key={2} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2025/01/7f3df7cead.jpg' alt='Rubber Sports Flooring 3' />
                </div>
                <div key={3} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture62.png' alt='Rubber Sports Flooring 4' />
                </div>
                <div key={4} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture61.png' alt='Rubber Sports Flooring 5' />
                </div>
                <div key={5} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture60.png' alt='Rubber Sports Flooring 6' />
                </div>
                <div key={6} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture59.jpg' alt='Rubber Sports Flooring 7' />
                </div>
                <div key={7} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture58.jpg' alt='Rubber Sports Flooring 8' />
                </div>
                </div>

                
                <div className="svc-stats-grid">
                    <div className="stat-card">
                        <span className="stat-num">45%</span>
                        <span className="stat-label">Impact Absorption</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-num">15+ yr</span>
                        <span className="stat-label">Lifespan</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-num">100%</span>
                        <span className="stat-label">Slip Resistant</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-num">Low</span>
                        <span className="stat-label">VOC Emissions</span>
                    </div>
                </div>

                <div className="svc-sections">
                    <div className="svc-section card">
                        <h3>Performance Metrics</h3>
                        <p>Our flooring systems are scientifically formulated to provide optimal conditions:</p>
                        <div className="svc-graph-bar">
                            <div className="svc-graph-bar-label"><span>Force Reduction</span> <span>Excellent (9/10)</span></div>
                            <div className="svc-graph-bar-track"><div className="svc-graph-bar-fill" style={{width: '90%'}}></div></div>
                        </div>
                        <div className="svc-graph-bar">
                            <div className="svc-graph-bar-label"><span>Durability</span> <span>Outstanding (10/10)</span></div>
                            <div className="svc-graph-bar-track"><div className="svc-graph-bar-fill" style={{width: '100%'}}></div></div>
                        </div>
                        <div className="svc-graph-bar">
                            <div className="svc-graph-bar-label"><span>Maintenance</span> <span>Low (3/10)</span></div>
                            <div className="svc-graph-bar-track"><div className="svc-graph-bar-fill" style={{width: '30%'}}></div></div>
                        </div>
                    </div>

                    
            <div className="svc-section card">
                <h3>Introduction</h3>
                
            </div>
            <div className="svc-section card">
                <h3>Why Choose Our Rubber Sports Flooring</h3>
                
            </div>
            <div className="svc-section card">
                <h3>High-Quality Materials</h3>
                <p>The use of premium rubber materials raises the standards, and that makes the flooring more durable and high-performance-enhanced in sports facilities.</p>
            </div>
            <div className="svc-section card">
                <h3>Exceptional Durability</h3>
                <p>The flooring is constructed in a way to resist heavy foot traffic and vigorous sports activities; besides, it remains in first-class condition over time, so you can be sure that it will be a worthy investment in your facility.</p>
            </div>
            <div className="svc-section card">
                <h3>Shock Absorption</h3>
                <p>It can handle the impact of the activity and thus, the knees do not get loaded too much, so runners do not get hurt during high-intensity sports.</p>
            </div>
            <div className="svc-section card">
                <h3>Eco-Friendly</h3>
                <p>We use recyclable and environmentally sustainable materials to make them feel good, an eco-conscious alternative for your sports space.</p>
            </div>
                </div>
            </div>
        </div>
    );
};

export default RubberSportsFlooringService;
