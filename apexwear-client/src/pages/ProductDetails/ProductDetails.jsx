import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/ClothingHomeComponents/Footer/Footer';
import './ProductDetails.css';

// Reusing images for the mock products
import Img1 from '../../components/ClothingHomeComponents/ProductGrid/assets/Paste image 4.png';
import Img2 from '../../components/ClothingHomeComponents/ProductGrid/assets/Paste image 3.png';
import Img3 from '../../components/ClothingHomeComponents/ProductGrid/assets/Paste image 2.png';
import Img4 from '../../components/ClothingHomeComponents/ProductGrid/assets/Paste image 13.png';
import Img5 from '../../components/ClothingHomeComponents/ProductGrid/assets/Paste image 5.png';
import Img6 from '../../components/ClothingHomeComponents/ProductGrid/assets/Paste image 6.png';
import Img7 from '../../components/ClothingHomeComponents/ProductGrid/assets/Paste image 7.png';
import Img8 from '../../components/ClothingHomeComponents/ProductGrid/assets/Image Placeholder.png';

// Mock product database
const allProducts = [
    { id: 1, image: Img1, name: "Freestyle Crew Racer leather jacket", price: "₹595.00", originalPrice: "₹1000.00", rating: 5, category: "Jackets", sku: "FW-2023-001", description: "This premium racer leather jacket is crafted from high-quality cowhide, offering both durability and a sleek aesthetic. Perfect for transitional weather and adding a bold edge to any outfit." },
    { id: 2, image: Img2, name: "1996 Retro Nuptse Cashmere Jacket", price: "₹149.99", originalPrice: "₹299.00", rating: 5, category: "Jackets", sku: "FW-2023-002", description: "Experience the ultimate warmth and luxury with our Retro Nuptse Cashmere Jacket. Combining vintage styling with incredibly soft cashmere insulation for unparalleled comfort." },
    { id: 3, image: Img3, name: "Chilliwack black Bomber HUMANATURE", price: "₹1195.99", originalPrice: "₹1500.00", rating: 5, category: "Jackets", sku: "FW-2023-003", description: "An icon of design, the Chilliwack Bomber was developed as a nod to post-war bush pilots in Canada's North. Rugged, durable and warm, it provides mobility where needed." },
    { id: 4, image: Img4, name: "96 Nuptse Dip Dye bomber Jacket", price: "₹400.99", originalPrice: "₹800.00", rating: 5, category: "Jackets", sku: "FW-2023-004", description: "A vibrant take on the classic Nuptse, this dip-dye version brings a pop of color to the cold. Water-repellent and filled with sustainable down." },
    { id: 101, image: Img1, name: "Premium Cotton T-Shirt", price: "₹299.00", originalPrice: "₹499.00", rating: 5, category: "T-shirts", sku: "TS-2023-101", description: "Simple, elegant, and incredibly soft. Our premium cotton t-shirt is the essential building block for any modern wardrobe." },
    { id: 102, image: Img2, name: "Casual Denim Shirt", price: "₹899.00", originalPrice: "₹1200.00", rating: 4, category: "Shirts", sku: "SH-2023-102", description: "Classic mid-wash denim shirt with a relaxed fit. Designed for versatility, it works just as well open over a tee as it does buttoned up." },
    { id: 103, image: Img3, name: "Urban Oversized Sweatshirt", price: "₹1299.00", originalPrice: "₹1999.00", rating: 5, category: "Sweatshirts", sku: "SW-2023-103", description: "The ultimate loungewear essential. This oversized sweatshirt features a heavy fleece lining and a minimalist industrial aesthetic." },
];

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { addToWishlist } = useWishlist();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState('Black');

    useEffect(() => {
        // Find product by ID (string to int conversion)
        const found = allProducts.find(p => p.id === parseInt(id));
        if (found) {
            setProduct(found);
            window.scrollTo(0, 0);
        } else {
            // If not found in mock list, use a default fallback (using ID 1)
            setProduct(allProducts[0]);
        }
    }, [id]);

    if (!product) return <div className="loading">Loading...</div>;

    const discountPercent = Math.round(
        ((parseFloat(product.originalPrice?.replace('₹', '')) - parseFloat(product.price.replace('₹', ''))) /
            parseFloat(product.originalPrice?.replace('₹', ''))) * 100
    );

    return (
        <div className="product-details-page">
            <Navbar />

            <div className="details-container">
                {/* Breadcrumbs */}
                <nav className="details-breadcrumb">
                    <span onClick={() => navigate('/home')}>Home</span>
                    <span className="sep">&gt;</span>
                    <span onClick={() => navigate('/shop')}>Shop</span>
                    <span className="sep">&gt;</span>
                    <span className="current">{product.name}</span>
                </nav>

                <div className="product-layout-main">
                    {/* Left side: Image */}
                    <div className="product-visuals">
                        <div className="main-image-wrapper">
                            <img src={product.image} alt={product.name} />
                            <div className="visuals-badges">
                                <span className="badge-new">NEW</span>
                                {product.originalPrice && (
                                    <span className="badge-discount">-{discountPercent}%</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right side: Info */}
                    <div className="product-info-panel">
                        <div className="info-header">
                            <div className="rating-row">
                                <div className="stars-box">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={i < product.rating ? 'star filled' : 'star'}>★</span>
                                    ))}
                                </div>
                                <span className="reviews-count">11 Reviews</span>
                            </div>
                            <h1 className="details-prod-name">{product.name}</h1>
                        </div>

                        <p className="details-prod-desc">{product.description}</p>

                        <div className="details-price-row">
                            <span className="current-price">{product.price}</span>
                            {product.originalPrice && (
                                <span className="old-price">{product.originalPrice}</span>
                            )}
                        </div>

                        {/* Countdown Timer Mock */}
                        <div className="offer-countdown">
                            <p>Offer expires in:</p>
                            <div className="timer-slots">
                                <div className="slot"><span>02</span><small>Days</small></div>
                                <div className="slot"><span>12</span><small>Hours</small></div>
                                <div className="slot"><span>45</span><small>Mins</small></div>
                                <div className="slot"><span>05</span><small>Secs</small></div>
                            </div>
                        </div>

                        {/* Measurements placeholder */}
                        <div className="measurements-section">
                            <p className="section-label">Measurements</p>
                            <p className="measure-value">17 1/2 × 20 5/8 "</p>
                        </div>

                        {/* Color Selection Mock */}
                        <div className="color-selection">
                            <div className="color-label-row">
                                <span>Choose Color</span>
                                <span className="arrow-right">&gt;</span>
                            </div>
                            <p className="selected-color-name">{selectedColor}</p>
                            <div className="color-swatches">
                                <div className={`swatch ${selectedColor === 'Black' ? 'active' : ''}`} onClick={() => setSelectedColor('Black')}>
                                    <img src={product.image} alt="Black" />
                                </div>
                                <div className="swatch disabled"><div className="swatch-placeholder brown"></div></div>
                                <div className="swatch disabled"><div className="swatch-placeholder red"></div></div>
                                <div className="swatch disabled"><div className="swatch-placeholder white"></div></div>
                            </div>
                        </div>

                        {/* Interaction Controls */}
                        <div className="purchase-controls">
                            <div className="qty-picker">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>
                            <button className="details-wishlist-btn" onClick={() => addToWishlist(product)}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                                Wishlist
                            </button>
                        </div>

                        <button
                            className="details-add-to-cart-btn"
                            onClick={() => {
                                for (let i = 0; i < quantity; i++) addToCart(product);
                            }}
                        >
                            Add to Cart
                        </button>

                        {/* Meta */}
                        <div className="product-meta-details">
                            <div className="meta-row">
                                <span className="meta-label">SKU</span>
                                <span className="meta-val">{product.sku}</span>
                            </div>
                            <div className="meta-row">
                                <span className="meta-label">CATEGORY</span>
                                <span className="meta-val">{product.category}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProductDetails;
