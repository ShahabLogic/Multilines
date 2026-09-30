import React, { useContext }  from 'react';
import '../../styles/services.css';
import { ConfigContext } from '../../context/ConfigContext';

const SportsFlooringService = () => {
    const { config } = useContext(ConfigContext);
    return (
        <div className="svc-page">
            <div className="svc-hero">
                <h1>Sports Flooring</h1>
                <p className="svc-breadcrumb">Services &rsaquo; Sports Flooring</p>
            </div>

            <div className="svc-body">
                <div className="svc-intro">
                    <p>Sports flooring is specialized flooring designed for athletic and recreational activities. It provides safety, performance enhancement, and durability, reducing the risk of injuries while improving athletes' comfort and movement.</p>
                <p>Sports flooring can be made from materials such as hardwood, rubber, vinyl, polyurethane, and synthetic surfaces, depending on the sport and the requirements of the space.</p>
                <p>Different sports require specific flooring properties. For example, basketball courts often use hardwood for bounce and grip, while gymnasiums and multi-purpose courts may use rubber or vinyl for shock absorption and durability.</p>
                <p>Rubber flooring is durable, shock-absorbent, slip-resistant, and easy to maintain. It is commonly used in weight rooms, gyms, and indoor playgrounds for safety and performance.</p>
                </div>

                <div className="svc-gallery">
                    
                <div key={0} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/08/Tanis.webp' alt='Sports Flooring 1' />
                </div>
                <div key={1} className="svc-img-card">
                    <img src='/wp-content/uploads/2024/09/Picture6.jpg' alt='Sports Flooring 2' />
                </div>
                <div key={2} className="svc-img-card">
                    <img src='/wp-content/uploads/elementor/thumbs/4-r1c32kzvjksh69djimchu90lscnmote3tior54l5s8.jpg' alt='Sports Flooring 3' />
                </div>
                <div key={3} className="svc-img-card">
                    <img src='/wp-content/uploads/elementor/thumbs/2-1-r1c388yuqmjp5n59fkijdbjmoyqa34vuxk94a66qa0.jpg' alt='Sports Flooring 4' />
                </div>
                <div key={4} className="svc-img-card">
                    <img src='/wp-content/uploads/elementor/thumbs/3-2-r1c3qixvmnkewolipgxdupiaion7r9fys0x07v35ag.jpg' alt='Sports Flooring 5' />
                </div>
                <div key={5} className="svc-img-card">
                    <img src='/wp-content/uploads/elementor/thumbs/82eba84bd8-e1739185572918-r1aqdzz2r3mvwd3odk1hb0bk9wx3tcr6j17z915tag.jpg' alt='Sports Flooring 6' />
                </div>
                <div key={6} className="svc-img-card">
                    <img src='/wp-content/uploads/elementor/thumbs/3-3-r1c47pfojn3343n4dw9wfdfle7yqg3nch26hzxm3k8.jpg' alt='Sports Flooring 7' />
                </div>
                <div key={7} className="svc-img-card">
                    <img src='/wp-content/uploads/elementor/thumbs/2-3-r1c47ohuct1sshohjdv9uvo4su3d8ejm4xj0innhqg.jpg' alt='Sports Flooring 8' />
                </div>
                </div>

                
                <div className="svc-stats-grid">
                    <div className="stat-card">
                        <span className="stat-num">10+ yr</span>
                        <span className="stat-label">Lifespan</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-num">100%</span>
                        <span className="stat-label">Seamless</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-num">Eco</span>
                        <span className="stat-label">Friendly</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-num">High</span>
                        <span className="stat-label">Durability</span>
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
                            <div className="svc-graph-bar-label"><span>Maintenance</span> <span>Low (3/10)</span></div>
                            <div className="svc-graph-bar-track"><div className="svc-graph-bar-fill" style={{width: '30%'}}></div></div>
                        </div>
                        <div className="svc-graph-bar">
                            <div className="svc-graph-bar-label"><span>Aesthetics</span> <span>High (8/10)</span></div>
                            <div className="svc-graph-bar-track"><div className="svc-graph-bar-fill" style={{width: '80%'}}></div></div>
                        </div>
                    </div>

                    
            <div className="svc-section card">
                <h3>Explore Our Wide Range of Flooring Solutions</h3>
                
            </div>
            <div className="svc-section card">
                <h3>Durable Outdoor Sports Flooring Solutions | {config.companyName}</h3>
                
            </div>
            <div className="svc-section card">
                <h3>Indoor Sports Flooring</h3>
                
            </div>
            <div className="svc-section card">
                <h3>Multi-Sport Flooring Solutions | {config.companyName}</h3>
                
            </div>
            <div className="svc-section card">
                <h3>Play Area Flooring</h3>
                
            </div>
            <div className="svc-section card">
                <h3>Polyurethane (PU) Sports Flooring</h3>
                
            </div>
                </div>
            </div>
        </div>
    );
};

export default SportsFlooringService;
