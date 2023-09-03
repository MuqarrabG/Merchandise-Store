import { useState } from 'react';

export function useCart() {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    

    const addToCart = (product, qty) => {
        setCart(prevCart => {
            const existingProduct = prevCart.find(item => item.product.id === product.id);
    
            if(existingProduct) {
                // const updatedCart = prevCart.map(item => 
                //     item.product.id === product.id
                //         ? { product: item.product, quantity: item.quantity + qty }
                //         : item
                // );
                // localStorage.setItem('cart', JSON.stringify(updatedCart));
                // return updatedCart;
                alert(product.title + "is already in your cart")
                return prevCart
            } else {
                const updatedCart = [...prevCart, { product, quantity: qty }];
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                console.log("Item added to cart: ", product.title)
                return updatedCart;
            }
        });
    };
    
    

    const removeFromCart = (productId) => {
        setCart(prevCart => {
            const updatedCart = prevCart.filter(item => item.product.id !== productId);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };
    

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart')
    };

    const changeQuantity = (productId, amount) => {
        setCart(prevCart => {
            const updatedCart = prevCart.map(item => {
                if (item.product.id === productId) {
                    const newQuantity = item.product.quantity + amount;
                    return { ...item, product: { ...item.product, quantity: Math.max(1, newQuantity) } };
                }
                return item;
            });
            
            // Storing the updated cart in localStorage
            localStorage.setItem('cart', JSON.stringify(updatedCart));
    
            return updatedCart;
        });
    };
    

    return { cart, addToCart, removeFromCart, clearCart, changeQuantity };
}

