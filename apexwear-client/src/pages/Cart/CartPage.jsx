import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/ClothingHomeComponents/Footer/Footer';
import ShoppingCart from './ShoppingCart/ShoppingCart';
import CheckOutDetails from './CheckOutDetails/CheckOutDetails';
import OrderComplete from './OrderComplete/OrderComplete';
import './CartPage.css';

const CartPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [orderData, setOrderData] = useState(null);

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <ShoppingCart onNext={() => setCurrentStep(2)} />;
            case 2:
                return <CheckOutDetails
                    onBack={() => setCurrentStep(1)}
                    onNext={(data) => {
                        setOrderData(data);
                        setCurrentStep(3);
                    }}
                />;
            case 3:
                return <OrderComplete orderData={orderData} />;
            default:
                return <ShoppingCart onNext={() => setCurrentStep(2)} />;
        }
    };

    const steps = [
        { id: 1, label: 'Shopping cart' },
        { id: 2, label: 'Checkout details' },
        { id: 3, label: 'Order complete' }
    ];

    return (
        <div className="cart-page-wrapper">
            <Navbar />

            <main className="cart-main-content">
                <div className="cart-container">
                    <h1 className="cart-page-title">
                        {currentStep === 1 && 'Cart'}
                        {currentStep === 2 && 'Check Out'}
                        {currentStep === 3 && 'Complete!'}
                    </h1>

                    <div className="cart-steps-indicator">
                        {steps.map((step) => (
                            <div
                                key={step.id}
                                className={`step-item ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
                            >
                                <div className="step-number">
                                    {currentStep > step.id ? (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    ) : step.id}
                                </div>
                                <span className="step-label">{step.label}</span>
                                {step.id < 3 && <div className="step-connector"></div>}
                            </div>
                        ))}
                    </div>

                    <div className="step-content-box">
                        {renderStep()}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CartPage;
