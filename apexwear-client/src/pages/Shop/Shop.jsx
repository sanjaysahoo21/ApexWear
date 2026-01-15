import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/ClothingHomeComponents/Footer/Footer';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import './Shop.css';

// Reuse images from ProductGrid for consistency
import Img1 from '../../components/ClothingHomeComponents/ProductGrid/assets/Paste image 4.png';
import Img2 from '../../components/ClothingHomeComponents/ProductGrid/assets/Paste image 3.png';
import Img3 from '../../components/ClothingHomeComponents/ProductGrid/assets/Paste image 2.png';
import Img4 from '../../components/ClothingHomeComponents/ProductGrid/assets/Paste image 13.png';
import Img5 from '../../components/ClothingHomeComponents/ProductGrid/assets/Paste image 5.png';
import Img6 from '../../components/ClothingHomeComponents/ProductGrid/assets/Paste image 6.png';
import Img7 from '../../components/ClothingHomeComponents/ProductGrid/assets/Paste image 7.png';
import Img8 from '../../components/ClothingHomeComponents/ProductGrid/assets/Image Placeholder.png';

const products = [
    { id: 101, image: Img1, name: "Premium Cotton T-Shirt", price: "₹299.00", rating: 5, category: "T-shirts" },
    { id: 102, image: Img2, name: "Casual Denim Shirt", price: "₹899.00", rating: 4, category: "Shirts" },
    { id: 103, image: Img3, name: "Urban Oversized Sweatshirt", price: "₹1299.00", rating: 5, category: "Sweatshirts" },
    { id: 104, image: Img4, name: "Lightweight Windbreaker", price: "₹2499.00", rating: 5, category: "Jackets" },
    { id: 105, image: Img5, name: "Classic Chino Pants", price: "₹1599.00", rating: 4, category: "Pants" },
    { id: 106, image: Img6, name: "Graphic Print Tee", price: "₹349.00", rating: 5, category: "T-shirts" },
    { id: 107, image: Img7, name: "Slim Fit Formal Shirt", price: "₹1199.00", rating: 5, category: "Shirts" },
    { id: 108, image: Img8, name: "Puffer Winter Jacket", price: "₹3999.00", rating: 5, category: "Jackets" },
    { id: 109, image: Img1, name: "Essential Jogger Pants", price: "₹1299.00", rating: 4, category: "Pants" },
];

const categories = [
    "All Categories",
    "T-shirts",
    "Shirts",
    "Sweatshirts",
    "Jackets",
    "Pants",
    "Shorts",
    "Accessories"
];

const Shop = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { addToWishlist } = useWishlist();
    const [activeCategory, setActiveCategory] = useState("All Categories");

    const filteredProducts = activeCategory === "All Categories"
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <div className="shop-page">
            <Navbar />

            <main className="shop-main">
                <section className="shop-banner">
                    <div className="shop-banner-content">
                        <nav className="breadcrumb">
                            <span onClick={() => navigate('/home')}>Home</span>
                            <span className="separator">&gt;</span>
                            <span className="current">Shop</span>
                        </nav>
                        <h1 className="shop-title">Men's Wear</h1>
                        <p className="shop-subtitle">Discover the latest trends in premium menswear</p>
                    </div>
                </section>

                <div className="shop-container">
                    <div className="shop-layout">
                        {/* Sidebar */}
                        <aside className="shop-sidebar">
                            <div className="filter-header">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="4" y1="21" x2="4" y2="14"></line>
                                    <line x1="4" y1="10" x2="4" y2="3"></line>
                                    <line x1="12" y1="21" x2="12" y2="12"></line>
                                    <line x1="12" y1="8" x2="12" y2="3"></line>
                                    <line x1="20" y1="21" x2="20" y2="16"></line>
                                    <line x1="20" y1="12" x2="20" y2="3"></line>
                                    <line x1="1" y1="14" x2="7" y2="14"></line>
                                    <line x1="9" y1="8" x2="15" y2="8"></line>
                                    <line x1="17" y1="16" x2="23" y2="16"></line>
                                </svg>
                                <span>Filter</span>
                            </div>

                            <div className="filter-group">
                                <h3>CATEGORIES</h3>
                                <ul className="category-list">
                                    {categories.map((cat) => (
                                        <li
                                            key={cat}
                                            className={activeCategory === cat ? 'active' : ''}
                                            onClick={() => setActiveCategory(cat)}
                                        >
                                            {cat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <div className="shop-content-area">
                            <div className="shop-grid-header">
                                <h2 className="current-category-title">{activeCategory}</h2>
                                {/* Sort and Grid features removed as requested */}
                            </div>

                            <div className="shop-product-grid">
                                {filteredProducts.map((product) => (
                                    <div key={product.id} className="shop-product-card" onClick={() => navigate(`/product/${product.id}`)}>
                                        <div className="product-image-box">
                                            <img src={product.image} alt={product.name} />

                                            <button
                                                className="quick-add-to-cart"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addToCart(product);
                                                }}
                                            >
                                                Add to cart
                                            </button>

                                            <button
                                                className="wishlist-overlay-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addToWishlist(product);
                                                }}
                                            >
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="product-info-box">
                                            <div className="rating-stars">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className={i < product.rating ? 'star filled' : 'star'}>★</span>
                                                ))}
                                            </div>
                                            <h3 className="product-name">{product.name}</h3>
                                            <p className="product-price">{product.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="shop-pagination">
                                <button className="show-more-btn">Show more</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Shop;
