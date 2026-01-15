import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';
import './ProductCarousel.css';

// Import local assets
import Img1 from './assets/Paste image 2.png';
import Img2 from './assets/Paste image 3.png';
import Img3 from './assets/Paste image 4.png';
import Img4 from './assets/Paste image 13.png';
import Img5 from './assets/Paste image 14.png';

const products = [
    {
        id: 1,
        image: Img1,
        name: "96 Nuptse Dip Dye Korea Puffers Jacket",
        price: "₹400.00",
        rating: 5,
        badge: "NEW"
    },
    {
        id: 2,
        image: Img2,
        name: "Paradigm Chilliwack Black Label Jacket",
        price: "₹349.99",
        rating: 5,
        badge: "NEW"
    },
    {
        id: 3,
        image: Img3,
        name: "1996 Retro Nuptse Jacket in Black",
        price: "₹149.99",
        rating: 5,
        badge: "NEW"
    },
    {
        id: 4,
        image: Img4,
        name: "Paul Quilted Nylon Puffer bomber jacket",
        price: "₹300.00",
        rating: 5,
        badge: "NEW"
    },
    {
        id: 5,
        image: Img5,
        name: "Chilliwack jacket in brown HUMANATURE",
        price: "₹1,195",
        rating: 5,
        badge: "NEW"
    }
];

const ProductCarousel = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { addToWishlist } = useWishlist();
    // Duplicate products to create seamless infinite scroll effect
    const infiniteProducts = [...products, ...products, ...products]; // Tripled to ensure smooth scroll on wide screens

    return (
        <section className="product-carousel-section">
            <div className="carousel-header">
                <h2 className="carousel-title">Just In</h2>
                <div className="carousel-dots">
                    <span className="dot active"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            </div>

            <div className="carousel-track-container">
                <div className="carousel-track">
                    {infiniteProducts.map((product, index) => (
                        <div key={`${product.id}-${index}`} className="carousel-card" onClick={() => navigate(`/product/${product.id}`)}>
                            <div className="card-image-box">
                                <img src={product.image} alt={product.name} className="product-img" />
                                {product.badge && <span className="badge-new">{product.badge}</span>}
                                <button
                                    className="wishlist-icon-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addToWishlist(product);
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                    </svg>
                                </button>
                                <button
                                    className="add-to-cart-overlay"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addToCart(product);
                                    }}
                                >
                                    Add to cart
                                </button>
                            </div>
                            <div className="card-details">
                                <div className="stars">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="star">★</span>
                                    ))}
                                </div>
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-price">{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductCarousel;
