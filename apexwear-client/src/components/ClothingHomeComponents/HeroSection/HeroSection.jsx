import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';
import HeroImg from './Paste image.png';

const HeroSection = () => {
    const navigate = useNavigate();
    return (
        <section className="clothing-hero-split">
            {/* Left Side - Image */}
            <div className="hero-image-container">
                <img src={HeroImg} alt="Winter Collection Model" className="hero-model-img" />
            </div>

            {/* Right Side - Content */}
            <div className="hero-content-container">
                <div className="content-wrapper">
                    <h1 className="hero-headline">Bring the<br />warmth.</h1>
                    <p className="hero-description">
                        Everyone needs a good winter jacket. <br />
                        Find yours with our collection and more.
                    </p>
                    <button className="shopping-btn" onClick={() => navigate('/shop')}>Shopping Now</button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
