import React, { useState } from 'react';
import { useCart } from '../../../context/CartContext';
import './CheckOutDetails.css';

const CheckOutDetails = ({ onBack, onNext }) => {
    const { cartItems, subtotal, shippingMethod, getShippingCost, total } = useCart();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        country: 'India',
        city: '',
        state: '',
        zipCode: '',
        paymentMethod: 'card',
        cardNumber: '',
        expiryDate: '',
        cvc: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext(formData);
    };

    return (
        <form className="checkout-details-content" onSubmit={handleSubmit}>
            <div className="checkout-left-side">
                <div className="checkout-form-section">
                    <h2>Contact Information</h2>
                    <div className="form-row-double">
                        <div className="form-group">
                            <label>FIRST NAME</label>
                            <input type="text" name="firstName" placeholder="First name" required onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>LAST NAME</label>
                            <input type="text" name="lastName" placeholder="Last name" required onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>PHONE NUMBER</label>
                        <input type="tel" name="phone" placeholder="Phone number" required onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label>EMAIL ADDRESS</label>
                        <input type="email" name="email" placeholder="Your Email" required onChange={handleInputChange} />
                    </div>
                </div>

                <div className="checkout-form-section mt-4">
                    <h2>Shipping Address</h2>
                    <div className="form-group">
                        <label>STREET ADDRESS *</label>
                        <input type="text" name="address" placeholder="Street Address" required onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label>COUNTRY *</label>
                        <select name="country" value={formData.country} onChange={handleInputChange}>
                            <option value="India">India</option>
                            <option value="USA">USA</option>
                            <option value="UK">UK</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>TOWN / CITY *</label>
                        <input type="text" name="city" placeholder="Town / City" required onChange={handleInputChange} />
                    </div>
                    <div className="form-row-double">
                        <div className="form-group">
                            <label>STATE</label>
                            <input type="text" name="state" placeholder="State" required onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>ZIP CODE</label>
                            <input type="text" name="zipCode" placeholder="Zip Code" required onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="checkbox-group">
                        <input type="checkbox" id="different-billing" />
                        <label htmlFor="different-billing">Use a different billing address (optional)</label>
                    </div>
                </div>

                <div className="checkout-form-section mt-4">
                    <h2>Payment method</h2>
                    <div className="payment-options">
                        <label className={`payment-option ${formData.paymentMethod === 'card' ? 'selected' : ''}`}>
                            <div className="radio-with-text">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="card"
                                    checked={formData.paymentMethod === 'card'}
                                    onChange={handleInputChange}
                                />
                                <span>Pay by Card Credit</span>
                            </div>
                            <div className="payment-icons">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                                    <line x1="1" y1="10" x2="23" y2="10"></line>
                                </svg>
                            </div>
                        </label>
                        <label className={`payment-option ${formData.paymentMethod === 'paypal' ? 'selected' : ''}`}>
                            <div className="radio-with-text">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="paypal"
                                    checked={formData.paymentMethod === 'paypal'}
                                    onChange={handleInputChange}
                                />
                                <span>Paypal</span>
                            </div>
                        </label>
                    </div>

                    {formData.paymentMethod === 'card' && (
                        <div className="card-fields animate-slide-down">
                            <div className="form-group">
                                <label>CARD NUMBER</label>
                                <input type="text" name="cardNumber" placeholder="1234 1234 1234 1234" required onChange={handleInputChange} />
                            </div>
                            <div className="form-row-double">
                                <div className="form-group">
                                    <label>EXPIRATION DATE</label>
                                    <input type="text" name="expiryDate" placeholder="MM/YY" required onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>CVC</label>
                                    <input type="text" name="cvc" placeholder="CVC code" required onChange={handleInputChange} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <button type="submit" className="place-order-btn">Place Order</button>
            </div>

            <div className="checkout-right-side">
                <div className="order-summary-box">
                    <h2>Order summary</h2>
                    <div className="order-items-scroll">
                        {cartItems.map(item => (
                            <div key={item.id} className="order-summary-item">
                                <div className="order-item-img">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="order-item-info">
                                    <h3>{item.name}</h3>
                                    <p>Color: Black</p>
                                    <div className="order-item-qty">
                                        <div className="mini-qty-box">
                                            <span>−</span>
                                            <span>{item.quantity}</span>
                                            <span>+</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="order-item-price">
                                    ₹{(parseFloat(item.price.replace('₹', '')) * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="summary-promo-code">
                        <input type="text" placeholder="Input" />
                        <button type="button">Apply</button>
                    </div>

                    <div className="summary-applied-promo">
                        <div className="promo-tag">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                                <line x1="7" y1="7" x2="7.01" y2="7"></line>
                            </svg>
                            <span>JenkateMW</span>
                            <button type="button" className="remove-promo">−₹25.00 [Remove]</button>
                        </div>
                    </div>

                    <div className="summary-finals">
                        <div className="final-line">
                            <span>Shipping</span>
                            <span className="bold">Free</span>
                        </div>
                        <div className="final-line">
                            <span>Subtotal</span>
                            <span className="bold">₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="final-line total-line-final">
                            <span>Total</span>
                            <span className="total-val">₹{total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default CheckOutDetails;
