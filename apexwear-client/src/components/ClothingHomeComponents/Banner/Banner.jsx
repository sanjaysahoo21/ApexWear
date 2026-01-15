import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Banner.css';
import BannerImage from './assets/Paste image.png';

const Banner = () => {
    const navigate = useNavigate();

    const handleShopClick = (e) => {
        e.preventDefault();
        navigate('/shop');
    };

    return (
        <section className="clothing-banner-section">
            <div className="banner-wrapper">
                {/* Left Side - Image */}
                <div className="banner-left">
                    <img src={BannerImage} alt="Winter Collection Sale" className="banner-main-img" />
                </div>

                {/* Right Side - Content */}
                <div className="banner-right">
                    <div className="banner-content">
                        <span className="sale-tag">SALE UP TO 35% OFF</span>
                        <h2 className="banner-heading">
                            HUNDREDS of <br />
                            New lower prices!
                        </h2>
                        <p className="banner-subtext">Hurry up!!! Winter is coming!</p>
                        <a href="/shop" className="shop-now-link" onClick={handleShopClick}>
                            Shop Now
                            <svg className="link-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
