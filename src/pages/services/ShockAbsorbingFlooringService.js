import React, { useContext }  from 'react';
import '../../styles/services.css';
import { ConfigContext } from '../../context/ConfigContext';

const ShockAbsorbingFlooringService = () => {
    const { config } = useContext(ConfigContext);
    return (
        <div className="svc-page">
            <div className="svc-hero">
                <h1>Shock-Absorbing Flooring</h1>
                <p className="svc-breadcrumb">Services &rsaquo; Shock-Absorbing Flooring</p>
            </div>

            <div className="svc-body">
                <div className="svc-intro">
                    <p>Boost safety, comfort, and performance with {config.companyName}’ shock-absorbing flooring. Made to minimize impact, lowering stress on the joints, and prevent injuries. Our flooring solutions are suitable for all sports courts, gyms, play areas, and high-traffic spaces. In case you are the one that wants the athletes to have a resilient surface or your children to have a cushioned play area or the one that needs an impact-resistant floor for a workplace, our innovative materials will guarantee the durability and the long-term performance of our flooring respectively.</p>
                <p>Constructed with the latest cutting-edge shock absorption technology, our flooring gives the rest of being joints, muscles, and bones free as well as it is possible to get a very good grip and stability from it. As well as its resistance to bad weather and low-maintenance perks make it profitable for indoor as well as outdoor spaces that ensure a long life span in any environment.</p>
                <p>Reduces the load on the joints and the muscles, thus, preventing injuries.</p>
                <p>The product is outdoor-use-adapted and it is applicable because it withstands extreme temperatures, rain, and the sun.</p>
                </div>

                <div className="svc-gallery">
                    
                <div key={0} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2025/01/6ac294ba63.jpg' alt='Shock-Absorbing Flooring 1' />
                </div>
                <div key={1} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2025/01/6b88110d08.png' alt='Shock-Absorbing Flooring 2' />
                </div>
                <div key={2} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture62.png' alt='Shock-Absorbing Flooring 3' />
                </div>
                <div key={3} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture61.png' alt='Shock-Absorbing Flooring 4' />
                </div>
                <div key={4} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture60.png' alt='Shock-Absorbing Flooring 5' />
                </div>
                <div key={5} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture59.jpg' alt='Shock-Absorbing Flooring 6' />
                </div>
                <div key={6} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture58.jpg' alt='Shock-Absorbing Flooring 7' />
                </div>
                <div key={7} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture57.png' alt='Shock-Absorbing Flooring 8' />
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
                <h3>Why Choose Our Shock Absorbing Flooring?</h3>
                
            </div>
            <div className="svc-section card">
                <h3>Superior Impact Protection</h3>
                <p>Reduces the load on the joints and the muscles, thus, preventing injuries.</p>
            </div>
            <div className="svc-section card">
                <h3>Weather & UV Resistant</h3>
                <p>The product is outdoor-use-adapted and it is applicable because it withstands extreme temperatures, rain, and the sun.</p>
            </div>
            <div className="svc-section card">
                <h3>Durable & Long-Lasting</h3>
                <p>The design is aimed to keep it in perfect condition besides the intensive use and protect properties.</p>
            </div>
            <div className="svc-section card">
                <h3>Versatile Applications</h3>
                <p>They are often found in sports courts, children s play areas, fitness studios, gyms, and industrial spaces.</p>
            </div>
                </div>
            </div>
        </div>
    );
};

export default ShockAbsorbingFlooringService;
