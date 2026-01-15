import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';
import './ProductGrid.css';

// Import assets
/* Mapping assets to the 8 products shown in design */
import Img1 from './assets/Paste image 4.png';
import Img2 from './assets/Paste image 3.png';
import Img3 from './assets/Paste image 2.png';
import Img4 from './assets/Paste image 13.png'; // Reused from confirmed existing files
import Img5 from './assets/Paste image 5.png';
import Img6 from './assets/Paste image 6.png';
import Img7 from './assets/Paste image 7.png';
import Img8 from './assets/Image Placeholder.png'; // Fallback for the 8th if specific one missing

const products = [
    {
        id: 1,
        image: Img1,
        name: "Freestyle Crew Racer leather jacket",
        price: "₹595.00",
        originalPrice: "₹1000.00",
        rating: 5,
        badge: "HOT",
        discount: "-50%"
    },
    {
        id: 2,
        image: Img2,
        name: "1996 Retro Nuptse Cashmere Jacket in Gray",
        price: "₹149.99",
        rating: 5,
        badge: "HOT"
    },
    {
        id: 3,
        image: Img3,
        name: "Chilliwack black Bomber HUMANATURE",
        price: "₹1195.99",
        rating: 5,
        badge: "HOT"
    },
    {
        id: 4,
        image: Img4,
        name: "96 Nuptse Dip Dye bomber Jacket",
        price: "₹400.99",
        rating: 5,
        badge: "HOT"
    },
    {
        id: 5,
        image: Img5,
        name: "Oversized real leather harrington jacket in black",
        price: "₹249.99",
        rating: 5,
        badge: "HOT"
    },
    {
        id: 6,
        image: Img6,
        name: "Men's Diamond Quilted Bomber Hoody",
        price: "₹199.95",
        rating: 5,
        badge: "HOT"
    },
    {
        id: 7,
        image: Img7,
        name: "Paradigm Chilliwack coat Black Label",
        price: "₹1495.00",
        rating: 5,
        badge: "HOT"
    },
    {
        id: 8,
        image: Img8,
        name: "Men's Torrentshell 3L Rain Jacket in Brown",
        price: "₹149.00",
        rating: 5,
        badge: "HOT"
    }
];

const ProductGrid = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { addToWishlist } = useWishlist();
    return (
        <section className="product-grid-section">
            <h2 className="grid-title">Best Seller</h2>

            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} className="grid-card" onClick={() => navigate(`/product/${product.id}`)}>
                        <div className="grid-image-box">
                            <img src={product.image} alt={product.name} className="grid-product-img" />

                            {/* Badges Container */}
                            <div className="badges-container">
                                {product.badge && <span className="badge-hot">{product.badge}</span>}
                                {product.discount && <span className="badge-discount">{product.discount}</span>}
                            </div>

                            {/* Add to Cart Overlay */}
                            <button
                                className="grid-add-to-cart-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart(product);
                                }}
                            >
                                Add to cart
                            </button>

                            {/* Wishlist Button */}
                            <button
                                className="grid-wishlist-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addToWishlist(product);
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                            </button>
                        </div>

                        <div className="grid-card-details">
                            <div className="grid-stars">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="star">★</span>
                                ))}
                            </div>
                            <h3 className="grid-product-name">{product.name}</h3>
                            <div className="grid-price-container">
                                <span className="grid-price">{product.price}</span>
                                {product.originalPrice && <span className="grid-original-price">{product.originalPrice}</span>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProductGrid;
