import React from 'react';
import './OrderInfo.css';

// Icons
import ShippingIcon from './assets/fast delivery.png';
import MoneyIcon from './assets/money.png';
import SecureIcon from './assets/lock 01.png';
import SupportIcon from './assets/call.png';

const OrderInfo = () => {
    const orderData = [
        {
            id: 1,
            icon: ShippingIcon,
            title: "Free Shipping",
            subtitle: "Order above ₹2000"
        },
        {
            id: 2,
            icon: MoneyIcon,
            title: "Money-back",
            subtitle: "30 days guarantee"
        },
        {
            id: 3,
            icon: SecureIcon,
            title: "Secure Payments",
            subtitle: "Secured by Stripe"
        },
        {
            id: 4,
            icon: SupportIcon,
            title: "24/7 Support",
            subtitle: "Phone and Email support"
        }
    ];

    return (
        <section className="order-info-section">
            <div className="order-info-container">
                {orderData.map(item => (
                    <div key={item.id} className="order-info-card">
                        <div className="order-icon-wrapper">
                            <img src={item.icon} alt={item.title} className="order-icon" />
                        </div>
                        <div className="order-text-content">
                            <h3 className="order-title">{item.title}</h3>
                            <p className="order-subtitle">{item.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default OrderInfo;
