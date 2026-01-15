import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-top">
                    {/* Brand & Contact */}
                    <div className="footer-column brand-col">
                        <h2 className="footer-logo">ApexWear.</h2>
                        <div className="footer-contact-info">
                            <p>43111 Hai Trieu street, <br />District 1, HCMC <br />Vietnam</p>
                            <p className="footer-phone">84-756-3237</p>
                        </div>
                        <div className="footer-socials">
                            <a href="#" className="social-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </a>
                            <a href="#" className="social-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                            </a>
                            <a href="#" className="social-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Navigation - Page */}
                    <div className="footer-column">
                        <h4 className="column-title">Page</h4>
                        <ul className="footer-links">
                            <li><a href="/home">Home</a></li>
                            <li><a href="#">Shop</a></li>
                            <li><a href="#">Product</a></li>
                            <li><a href="#">Articles</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Navigation - Info */}
                    <div className="footer-column">
                        <h4 className="column-title">Info</h4>
                        <ul className="footer-links">
                            <li><a href="#">Shipping Policy</a></li>
                            <li><a href="#">Return & Refund</a></li>
                            <li><a href="#">Support</a></li>
                            <li><a href="#">FAQs</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="footer-column newsletter-col">
                        <h4 className="column-title">Join Newsletter</h4>
                        <p className="newsletter-text">Subscribe our newsletter to get more deals, new products and promotions</p>
                        <div className="newsletter-form">
                            <input type="email" placeholder="Enter your email" className="newsletter-input" />
                            <button className="newsletter-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="footer-divider"></div>

                <div className="footer-bottom">
                    <div className="footer-legal">
                        <p className="copyright">Copyright © 2026 ApexWear. All rights reserved</p>
                        <div className="legal-links">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms & Conditions</a>
                        </div>
                    </div>
                    <div className="payment-icons">
                        {/* Visa */}
                        <img src="https://cdn-icons-png.flaticon.com/512/349/349221.png" alt="Visa" />
                        {/* Amex */}
                        <img src="https://cdn-icons-png.flaticon.com/512/196/196539.png" alt="Amex" />
                        {/* Mastercard */}
                        <img src="https://cdn-icons-png.flaticon.com/512/349/349228.png" alt="Mastercard" />
                        {/* Stripe */}
                        <img src="https://cdn-icons-png.flaticon.com/512/5968/5968382.png" alt="Stripe" />
                        {/* PayPal */}
                        <img src="https://cdn-icons-png.flaticon.com/512/196/196565.png" alt="PayPal" />
                        {/* Apple Pay */}
                        <img src="https://cdn-icons-png.flaticon.com/512/5968/5968412.png" alt="Apple Pay" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
