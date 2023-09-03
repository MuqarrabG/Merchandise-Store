import React from 'react';
import { useCart } from './Cart';
import '../styles/CartPage.css'

const CartPage = () => {
    const { cart, removeFromCart, clearCart } = useCart();

    return (
        <div className='cart-page'>
            <h2>Shopping Cart</h2>
            {cart.length === 0 && <p>Your cart is empty.</p>}
            
            {cart.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map(item => (
                            <tr key={item.id}>
                                <td><img src={item.image} alt={item.title} style={{ width: '50px' }} /></td>
                                <td>{item.title}</td>
                                <td>${item.price}</td>
                                <td><button onClick={() => removeFromCart(item.id)}>Remove</button></td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="2">Total</td>
                            <td>${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</td>
                            <td><button onClick={clearCart}>Clear Cart</button></td>
                        </tr>
                    </tfoot>
                </table>
            )}
        </div>
    );
}

export default CartPage;

