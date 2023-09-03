import { useState, useEffect } from "react";
import orderService from "../services/orderService";

export function useCart() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addToCart = (product, qty) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.product.id === product.id
      );

      if (existingProduct) {
        // const updatedCart = prevCart.map(item =>
        //     item.product.id === product.id
        //         ? { product: item.product, quantity: item.quantity + qty }
        //         : item
        // );
        // localStorage.setItem('cart', JSON.stringify(updatedCart));
        // return updatedCart;
        alert(product.title + " is already in your cart");
        return prevCart;
      } else {
        const updatedCart = [...prevCart, { product, quantity: qty }];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        alert(product.title + " added to your cart");
        console.log("Item added to cart: ", product.title);
        return updatedCart;
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (item) => item.product.id !== productId
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const changeQuantity = (productId, amount) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.product.id === productId) {
          const newQuantity = item.product.quantity + amount;
          return {
            ...item,
            product: { ...item.product, quantity: Math.max(1, newQuantity) },
          };
        }
        return item;
      });

      // Storing the updated cart in localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  const convertCartToOrder = (cart) => {
    const user = JSON.parse(localStorage.getItem('user'));

    console.log("User information from LocalStorage", user)

    const orderItems = cart.map((item) => ({
      product_id: item.product.id,
      quantity: item.product.quantity,
      price: item.product.price,
    }));

    const orderTotal = cart.reduce(
      (sum, item) => sum + item.product.price * item.product.quantity,
      0
    ).toFixed(2);

    return {
      user_id: user.id,
      order_date: new Date().toISOString().split("T")[0],
      order_status: "pending",
      order_total: orderTotal,
      order_items: orderItems,
    };
  };

  const checkoutCart = () => {

    const order = convertCartToOrder(cart);
    clearCart()
    if (!order) {
      console.error("Could not convert cart to order.");
      return;
    }

    console.log("Order", order);

    orderService
      .create(order)
      .then((response) => {
        console.log("Success: ", response);
        alert("Your items have been ordered")
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    changeQuantity,
    checkoutCart,
  };
}
