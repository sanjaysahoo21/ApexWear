import React from 'react';
import { useCart } from '../../../context/CartContext';
import './ShoppingCart.css';

const ShoppingCart = ({ onNext }) => {
    const {
        cartItems,
        updateQuantity,
        removeFromCart,
        subtotal,
        shippingMethod,
        setShippingMethod,
        getShippingCost,
        total
    } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="empty-cart-state">
                <p>Your cart is currently empty.</p>
                <button className="go-shop-btn" onClick={() => window.location.href = '/home'}>Go Shopping</button>
            </div>
        );
    }

    return (
        <div className="shopping-cart-content">
            <div className="cart-table-section">
                <div className="cart-table-header">
                    <span className="col-product">Product</span>
                    <span className="col-quantity">Quantity</span>
                    <span className="col-price">Price</span>
                    <span className="col-subtotal">Subtotal</span>
                </div>

                <div className="cart-items-list">
                    {cartItems.map((item) => (
                        <div key={item.id} className="cart-table-row">
                            <div className="col-product cart-product-info">
                                <div className="product-img-box">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="product-text">
                                    <h3>{item.name}</h3>
                                    <p>Color: Black</p>
                                    <button className="row-remove-btn" onClick={() => removeFromCart(item.id)}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                        Remove
                                    </button>
                                </div>
                            </div>
                            <div className="col-quantity">
                                <div className="row-quantity-controls">
                                    <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                </div>
                            </div>
                            <div className="col-price">{item.price}</div>
                            <div className="col-subtotal">₹{(parseFloat(item.price.replace('₹', '')) * item.quantity).toFixed(2)}</div>
                        </div>
                    ))}
                </div>

                <div className="coupon-section">
                    <h3>Have a coupon?</h3>
                    <p>Add your code for an instant cart discount</p>
                    <div className="coupon-input-box">
                        <div className="input-with-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 12V8H4v4a2 2 0 1 0 0 4v4h16v-4a2 2 0 1 0 0-4Z"></path>
                                <line x1="12" y1="8" x2="12" y2="20"></line>
                            </svg>
                            <input type="text" placeholder="Coupon Code" />
                        </div>
                        <button className="apply-coupon-btn">Apply</button>
                    </div>
                </div>
            </div>

            <div className="cart-summary-card">
                <h2>Cart summary</h2>

                <div className="shipping-options">
                    <label className={`shipping-option ${shippingMethod === 'free' ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            name="shipping"
                            checked={shippingMethod === 'free'}
                            onChange={() => setShippingMethod('free')}
                        />
                        <span className="option-label">Free shipping</span>
                        <span className="option-price">₹0.00</span>
                    </label>
                    <label className={`shipping-option ${shippingMethod === 'express' ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            name="shipping"
                            checked={shippingMethod === 'express'}
                            onChange={() => setShippingMethod('express')}
                        />
                        <span className="option-label">Express shipping</span>
                        <span className="option-price">+₹1500.00</span>
                    </label>
                    <label className={`shipping-option ${shippingMethod === 'pickup' ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            name="shipping"
                            checked={shippingMethod === 'pickup'}
                            onChange={() => setShippingMethod('pickup')}
                        />
                        <span className="option-label">Pick Up</span>
                        <span className="option-price">+₹2100.00</span>
                    </label>
                </div>

                <div className="summary-details">
                    <div className="summary-line">
                        <span>Subtotal</span>
                        <span className="value">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-line total-line">
                        <span>Total</span>
                        <span className="value">₹{total.toFixed(2)}</span>
                    </div>
                </div>

                <button className="cart-checkout-btn" onClick={onNext}>Checkout</button>
            </div>
        </div>
    );
};

export default ShoppingCart;
