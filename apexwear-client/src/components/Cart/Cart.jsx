import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Cart.css';

const Cart = () => {
    const navigate = useNavigate();
    const { cartItems, isCartOpen, toggleCart, removeFromCart, updateQuantity, subtotal } = useCart();

    const handleCheckout = () => {
        toggleCart();
        navigate('/cart');
    };

    const handleViewCart = (e) => {
        e.preventDefault();
        toggleCart();
        navigate('/cart');
    };

    if (!isCartOpen) return null;

    return (
        <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={toggleCart}>
            <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
                <div className="cart-header">
                    <h2>Cart</h2>
                    <button className="close-cart-btn" onClick={toggleCart}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div className="cart-items-container">
                    {cartItems.length === 0 ? (
                        <div className="empty-cart-message">
                            <p>Your cart is empty</p>
                            <button className="start-shopping-btn" onClick={toggleCart}>Start Shopping</button>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-image">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="cart-item-details">
                                    <div className="cart-item-top">
                                        <h3 className="cart-item-name">{item.name}</h3>
                                        <span className="cart-item-price">{item.price}</span>
                                    </div>
                                    <p className="cart-item-variant">Color: Black</p> {/* Placeholder as per design */}
                                    <div className="cart-item-bottom">
                                        <div className="quantity-controls">
                                            <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                        </div>
                                        <button className="remove-item-btn" onClick={() => removeFromCart(item.id)}>
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

                {cartItems.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-summary-line">
                            <span>Subtotal</span>
                            <span className="summary-value">₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="cart-summary-line total-line">
                            <span>Total</span>
                            <span className="summary-value">₹{subtotal.toFixed(2)}</span>
                        </div>
                        <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
                        <a href="/cart" className="view-cart-link" onClick={handleViewCart}>View Cart</a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
