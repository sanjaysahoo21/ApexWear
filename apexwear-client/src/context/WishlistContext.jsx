import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState(() => {
        const savedWishlist = localStorage.getItem('apexwear_wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('apexwear_wishlist', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const addToWishlist = (product) => {
        setWishlistItems(prevItems => {
            const exists = prevItems.find(item => item.id === product.id);
            if (exists) return prevItems; // Already in wishlist
            return [...prevItems, product];
        });
        setIsWishlistOpen(true);
    };

    const removeFromWishlist = (productId) => {
        setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const toggleWishlist = () => setIsWishlistOpen(!isWishlistOpen);

    const wishlistCount = wishlistItems.length;

    return (
        <WishlistContext.Provider value={{
            wishlistItems,
            addToWishlist,
            removeFromWishlist,
            isWishlistOpen,
            toggleWishlist,
            wishlistCount
        }}>
            {children}
        </WishlistContext.Provider>
    );
};
