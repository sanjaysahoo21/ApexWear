import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isShopOpen, setIsShopOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // Mock user for now
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="logo cursor-pointer" onClick={() => navigate('/home')}>APEXWEAR</div>

                {/* Desktop Menu */}
                <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <div className="nav-item">
                        <span className="nav-link cursor-pointer" onClick={() => navigate('/home')}>Home</span>
                    </div>

                    <div className="nav-item dropdown-container"
                        onMouseEnter={() => setIsShopOpen(true)}
                        onMouseLeave={() => setIsShopOpen(false)}>
                        <span className="nav-link cursor-pointer">Shop</span>
                        {isShopOpen && (
                            <div className="dropdown-menu">
                                <div className="dropdown-item">Clothing</div>
                                <div className="dropdown-item">Electronics</div>
                                <div className="dropdown-item">Furniture</div>
                            </div>
                        )}
                    </div>

                    <div className="nav-item">
                        <span className="nav-link cursor-pointer">New Arrivals</span>
                    </div>
                    <div className="nav-item">
                        <span className="nav-link cursor-pointer">Brands</span>
                    </div>
                </div>

                {/* Icons */}
                <div className="nav-icons">
                    <button className="icon-btn search-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                    <button className="icon-btn cart-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                    </button>
                    <div className="profile-container relative">
                        <button className="icon-btn profile-btn" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                        </button>
                        {isProfileOpen && (
                            <div className="profile-dropdown">
                                <div className="profile-header">
                                    <p className="profile-name">{user.name || 'User'}</p>
                                    <p className="profile-email">{user.email || 'guest@example.com'}</p>
                                </div>
                                <div className="profile-divider"></div>
                                <button onClick={handleLogout} className="profile-action-btn logout-btn">Sign Out</button>
                            </div>
                        )}
                    </div>
                    <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
