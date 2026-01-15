import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BlogSelection.css';
import BlogImg1 from './assets/img.png';
import BlogImg2 from './assets/img 2.png';
import BlogImg3 from './assets/img 3.png';

const blogs = [
    {
        id: 1,
        image: BlogImg1,
        title: "2023 Holiday Gift Guide",
        link: "#"
    },
    {
        id: 2,
        image: BlogImg2,
        title: "2023 Holiday Gift Guide",
        link: "#"
    },
    {
        id: 3,
        image: BlogImg3,
        title: "2023 Holiday Gift Guide",
        link: "#"
    }
];

const BlogSelection = () => {
    const navigate = useNavigate();

    const handleExploreClick = (e) => {
        e.preventDefault();
        navigate('/shop');
    };

    return (
        <section className="blog-section">
            <div className="blog-container">
                <div className="blog-header">
                    <h2 className="blog-main-title">Latest Articles</h2>
                    <a href="/shop" className="view-more-link" onClick={handleExploreClick}>
                        View More
                        <svg className="link-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </a>
                </div>

                <div className="blog-grid">
                    {blogs.map((blog) => (
                        <div key={blog.id} className="blog-card">
                            <div className="blog-image-wrapper">
                                <img src={blog.image} alt={blog.title} className="blog-image" />
                            </div>
                            <div className="blog-content">
                                <h3 className="blog-title">{blog.title}</h3>
                                <a href="/shop" className="read-more-link" onClick={handleExploreClick}>
                                    Read More
                                    <svg className="link-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSelection;
