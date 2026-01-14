import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import HeroSection from '../../components/ClothingHomeComponents/HeroSection/HeroSection';
import ProductCarousel from '../../components/ClothingHomeComponents/ProductCarousel/ProductCarousel';
import CategorySection from '../../components/ClothingHomeComponents/CategorySection/CategorySection';
import BannerGrid from '../../components/ClothingHomeComponents/BannerGrid/BannerGrid';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <Navbar />

            <HeroSection />

            <ProductCarousel />

            <CategorySection />

            <BannerGrid />

            {/* Placeholder for Next Sections */}
            <div style={{ padding: '4rem', textAlign: 'center', color: '#888' }}>
                <h2>Next Section: Footer?</h2>
                <p>Waiting for design instructions...</p>
            </div>
        </div>
    );
};

export default Home;
