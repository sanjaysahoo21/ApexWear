import React, { useEffect } from 'react';
import { useCart } from '../../../context/CartContext';
import './OrderComplete.css';

const OrderComplete = ({ orderData }) => {
    const { cartItems, total, clearCart } = useCart();

    // Save items before clearing for summary display
    const finalItems = [...cartItems];

    useEffect(() => {
        // Clear the cart when reaching the success page
        return () => {
            clearCart();
        };
    }, []);

    const orderCode = "#0123_45678";
    const orderDate = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div className="order-complete-content">
            <div className="success-card">
                <span className="thanks-text">Thank you! 🎉</span>
                <h2 className="success-heading">Your order has been received</h2>

                <div className="summary-icons-row">
                    {finalItems.slice(0, 3).map((item, idx) => (
                        <div key={item.id} className="summary-img-bubble">
                            <img src={item.image} alt={item.name} />
                            <span className="bubble-count">{item.quantity}</span>
                        </div>
                    ))}
                </div>

                <div className="order-info-rows">
                    <div className="info-row">
                        <span className="info-label">Order code:</span>
                        <span className="info-value">{orderCode}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Date:</span>
                        <span className="info-value">{orderDate}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Total:</span>
                        <span className="info-value">₹{total.toFixed(2)}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Payment method:</span>
                        <span className="info-value">{orderData?.paymentMethod === 'card' ? 'Credit Card' : 'Paypal'}</span>
                    </div>
                </div>

                <button className="purchase-history-btn" onClick={() => window.location.href = '/home'}>
                    Purchase history
                </button>
            </div>
        </div>
    );
};

export default OrderComplete;
