import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import HeroSection from '../../components/ClothingHomeComponents/HeroSection/HeroSection';
import ProductCarousel from '../../components/ClothingHomeComponents/ProductCarousel/ProductCarousel';
import CategorySection from '../../components/ClothingHomeComponents/CategorySection/CategorySection';
import BannerGrid from '../../components/ClothingHomeComponents/BannerGrid/BannerGrid';
import ProductGrid from '../../components/ClothingHomeComponents/ProductGrid/ProductGrid';
import Banner from '../../components/ClothingHomeComponents/Banner/Banner';
import BlogSelection from '../../components/ClothingHomeComponents/BlogSelection/BlogSelection';
import OrderInfo from '../../components/ClothingHomeComponents/OrderInfo/OrderInfo';
import Footer from '../../components/ClothingHomeComponents/Footer/Footer';
import './Home.css';
const Home = () => {
    return (
        <div className="home-container">
            <Navbar />

            <HeroSection />

            <ProductCarousel />

            <CategorySection />

            <BannerGrid />

            <ProductGrid />

            <Banner />

            <BlogSelection />

            <OrderInfo />

            <Footer />
        </div>
    );
};

export default Home;
