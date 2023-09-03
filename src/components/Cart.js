import { useState } from 'react';

export function useCart() {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    

    const addToCart = (product) => {
        setCart(prevCart => {
            const productExist = prevCart.some(item => item.id === product.id)

            if(productExist) {
                alert(product.title + "is already in your cart")
                return prevCart
            } else {
                const updatedCart = [...prevCart, product];
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                console.log("Item added to cart: ", product.title)
                return updatedCart;
            }

        });
    };
    

    const removeFromCart = (productId) => {
        setCart(prevCart => {
            const updatedCart = prevCart.filter(product => product.id !== productId);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };
    

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart')
    };

    return { cart, addToCart, removeFromCart, clearCart };
}

