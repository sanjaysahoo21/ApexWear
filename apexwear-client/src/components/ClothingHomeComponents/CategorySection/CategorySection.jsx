import React from 'react';
import './CategorySection.css';

// Importing assets (Reusing assets if specific category ones aren't distinct files yet, 
// using generic names based on available files in the folder)
import PufferImg from './assets/Paste image 13.png'; // Placeholder mapping
import BomberImg from './assets/Paste image 2.png';
import LightweightImg from './assets/Paste image 3.png';
import GiletImg from './assets/Paste image 4.png';
import CoatImg from './assets/Paste image 14.png';
import RainwearImg from './assets/Paste image 2.png'; // Reusing for now

const categories = [
    { title: 'Puffers', image: PufferImg },
    { title: 'Bombers', image: BomberImg },
    { title: 'Lightweight jackets', image: LightweightImg },
    { title: 'Gilets', image: GiletImg },
    { title: 'Coats', image: CoatImg },
    { title: 'Rainwear', image: RainwearImg },
];

const CategorySection = () => {
    return (
        <section className="category-section">
            <h2 className="category-title">Shop by Categories</h2>
            <div className="category-grid">
                {categories.map((cat, index) => (
                    <div key={index} className="category-item">
                        <div className="category-img-container">
                            <img src={cat.image} alt={cat.title} className="category-img" />
                        </div>
                        <p className="category-name">{cat.title}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategorySection;
