import React from 'react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import './Wishlist.css';

const Wishlist = () => {
    const { wishlistItems, isWishlistOpen, toggleWishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    if (!isWishlistOpen) return null;

    const handleMoveToCart = (item) => {
        addToCart(item);
        removeFromWishlist(item.id);
    };

    return (
        <div className={`wishlist-overlay ${isWishlistOpen ? 'open' : ''}`} onClick={toggleWishlist}>
            <div className="wishlist-sidebar" onClick={(e) => e.stopPropagation()}>
                <div className="wishlist-header">
                    <h2>Wishlist</h2>
                    <button className="close-wishlist-btn" onClick={toggleWishlist}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div className="wishlist-items-container">
                    {wishlistItems.length === 0 ? (
                        <div className="empty-wishlist-message">
                            <p>Your wishlist is empty</p>
                            <button className="start-shopping-btn" onClick={toggleWishlist}>Start Shopping</button>
                        </div>
                    ) : (
                        wishlistItems.map((item) => (
                            <div key={item.id} className="wishlist-item">
                                <div className="wishlist-item-image">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="wishlist-item-details">
                                    <div className="wishlist-item-top">
                                        <h3 className="wishlist-item-name">{item.name}</h3>
                                        <span className="wishlist-item-price">{item.price}</span>
                                    </div>
                                    <div className="wishlist-item-bottom">
                                        <button className="add-to-cart-btn-small" onClick={() => handleMoveToCart(item)}>
                                            Add to Cart
                                        </button>
                                        <button className="remove-item-btn" onClick={() => removeFromWishlist(item.id)}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
