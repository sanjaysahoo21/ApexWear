import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('apexwear_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('apexwear_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true); // Open cart when item is added
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, amount) => {
        setCartItems(prevItems =>
            prevItems.map(item => {
                if (item.id === productId) {
                    const newQuantity = Math.max(1, item.quantity + amount);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            })
        );
    };

    const [shippingMethod, setShippingMethod] = useState('free');

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('apexwear_cart');
    };

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const subtotal = cartItems.reduce((total, item) => {
        const price = parseFloat(item.price.replace('₹', ''));
        return total + (price * item.quantity);
    }, 0);

    const getShippingCost = () => {
        if (shippingMethod === 'express') return 1500; // Example ₹1500
        if (shippingMethod === 'pickup') return 2100;  // Example ₹2100
        return 0;
    };

    const total = subtotal + getShippingCost();

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            isCartOpen,
            toggleCart,
            clearCart,
            cartCount,
            subtotal,
            shippingMethod,
            setShippingMethod,
            getShippingCost,
            total
        }}>
            {children}
        </CartContext.Provider>
    );
};
