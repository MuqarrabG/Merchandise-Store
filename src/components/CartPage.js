import React from 'react';
import { useCart } from './Cart';
import '../styles/CartPage.css'

const CartPage = () => {
    const { cart, removeFromCart, clearCart, changeQuantity } = useCart();
    console.log("Current Cart:", cart)

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
                            <th>Quantity</th>
                            <th>Item Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map(item => (
                            <tr key={item.product.id}>
                                <td><img src={item.product.image} alt={item.product.title} style={{ width: '50px' }} /></td>
                                <td>{item.product.title}</td>
                                <td>${item.product.price}</td>
                                <td>
                                    <button className='cart-quantity-button' onClick={() => changeQuantity(item.product.id, 1)}>+</button>
                                    {item.product.quantity}
                                    <button className='cart-quantity-button' onClick={() => changeQuantity(item.product.id, -1)}>-</button>
                                </td>
                                <td>{item.product.price * item.product.quantity}</td>
                                <td><button className='cart-page-button' onClick={() => removeFromCart(item.product.id)}>Remove</button></td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="2">Total</td>
                            <td>${cart.reduce((sum, item) => sum + (item.product.price * item.product.quantity), 0).toFixed(2)}</td>
                            <td><button className='cart-page-button' onClick={clearCart}>Clear Cart</button></td>
                        </tr>
                    </tfoot>
                </table>
            )}
        </div>
    );
}

export default CartPage;

