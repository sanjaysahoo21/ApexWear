import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BannerGrid.css';

// Import assets
/* 
   Mapping assumptions based on file order:
   Top Left: Image 9
   Top Right: Image 10
   Bottom Left: Image 11
   Bottom Right: Image 12
*/
import Img1 from './assets/Paste image 9.png';
import Img2 from './assets/Paste image 10.png';
import Img3 from './assets/Paste image 11.png';
import Img4 from './assets/Paste image 12.png';

const banners = [
    {
        id: 1,
        image: Img1,
        title: "November Outfits",
        linkText: "Collection"
    },
    {
        id: 2,
        image: Img2,
        title: "Cashmere Set",
        linkText: "Collections"
    },
    {
        id: 3,
        image: Img3,
        title: "The New Nordic",
        linkText: "Collections"
    },
    {
        id: 4,
        image: Img4,
        title: "The Leather",
        linkText: "Collections"
    }
];

const BannerGrid = () => {
    const navigate = useNavigate();

    const handleLinkClick = (e) => {
        e.preventDefault();
        navigate('/shop');
    };

    return (
        <section className="banner-grid-section">
            <div className="banner-grid">
                {banners.map((banner) => (
                    <div key={banner.id} className="banner-item">
                        <img src={banner.image} alt={banner.title} className="banner-img" />
                        <div className="banner-overlay">
                            <h3 className="banner-title">{banner.title}</h3>
                            <a href="/shop" className="banner-link" onClick={handleLinkClick}>
                                {banner.linkText}
                                <span className="arrow">→</span>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BannerGrid;
