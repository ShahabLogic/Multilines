import React, { useContext }  from 'react';
import '../../styles/services.css';
import { ConfigContext } from '../../context/ConfigContext';

const OutdoorPickleballFlooringService = () => {
    const { config } = useContext(ConfigContext);
    return (
        <div className="svc-page">
            <div className="svc-hero">
                <h1>Outdoor Pickleball Flooring</h1>
                <p className="svc-breadcrumb">Services &rsaquo; Outdoor Pickleball Flooring</p>
            </div>

            <div className="svc-body">
                <div className="svc-intro">
                    <p>knoveo solution offers premium outdoor pickleball flooring made to withstand the harsh external outdoor factors. Not only that but, the anti-slippery surfing technology will answer the infusion of rain and will hold your stable movement.</p>
                <p>From the burning sun to ultraviolet rays to heavy rainfall and different temperature conditions, {config.companyName}’ outdoor pickleball courts remain the same. We ensure warranty all seasons that your court will have optimal grip, stability, and resilience.</p>
                <p>The playing surface is not only ones that make it out an enhanced experience that is worth playing but also that will give you the advantage of long-lasting durability. When installing a court in a community park, sports club, or other outdoor facility the products of {config.companyName} will help you provide an ideal surface that will stand up to weather elements and will not cause any problems. Select {config.companyName} to get a floor that will last you forever no matter the weather.</p>
                <p>Our flooring is the best due to the originality that came with it, it is made of high-quality materials and is convenient for wet or hot conditions.</p>
                </div>

                <div className="svc-gallery">
                    
                <div key={0} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2025/01/83f2764eca.jpg' alt='Outdoor Pickleball Flooring 1' />
                </div>
                <div key={1} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2025/01/dc2cf26a9a.jpg' alt='Outdoor Pickleball Flooring 2' />
                </div>
                <div key={2} className="svc-img-card">
                    <img src='https://knoveo.co/wp-content/uploads/2025/01/d9110a450b.jpg' alt='Outdoor Pickleball Flooring 3' />
                </div>
                <div key={3} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture62.png' alt='Outdoor Pickleball Flooring 4' />
                </div>
                <div key={4} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture61.png' alt='Outdoor Pickleball Flooring 5' />
                </div>
                <div key={5} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture60.png' alt='Outdoor Pickleball Flooring 6' />
                </div>
                <div key={6} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture59.jpg' alt='Outdoor Pickleball Flooring 7' />
                </div>
                <div key={7} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture58.jpg' alt='Outdoor Pickleball Flooring 8' />
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
                <h3>Why Choose  Our Outdoor Pickleball Flooring</h3>
                
            </div>
            <div className="svc-section card">
                <h3>Engineered for the Outdoors</h3>
                <p>Our flooring is the best due to the originality that came with it, it is made of high-quality materials and is convenient for wet or hot conditions.</p>
            </div>
            <div className="svc-section card">
                <h3>Safety First</h3>
                <p>The non-slip walking area will offer you the greatest grip and thus you will not suffer an injury due to the excellent setup of your playground area.</p>
            </div>
            <div className="svc-section card">
                <h3>Weather Resistance</h3>
                <p>By using the latest technology in building the lining that is UV-resistant, we can guarantee the original color and performance of our floorings even under the sun s highest temperature.</p>
            </div>
            <div className="svc-section card">
                <h3>Low Maintenance</h3>
                <p>Our floor coverings designed to be easily cleaned and endured maintenance are suitable for outdoor settings as well.</p>
            </div>
                </div>
            </div>
        </div>
    );
};

export default OutdoorPickleballFlooringService;
