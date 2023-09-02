import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import orderService from "../services/orderService";
import "../styles/Order.css";

const Order = ({ order }) => {
  return (
    <div className="order-container">
      <h2>Order ID: {order.id}</h2>
      <p>Date: {order.order_date}</p>
      <p>Status: {order.order_status}</p>
      <p>Total: ${order.order_total}</p>
      <h3>Items:</h3>

      <table className="order-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {order.order_items.map((item, index) => (
            <tr key={index}>
                <td>
                <Link to={`/product/${item.product_id}`}>{item.product_id}</Link>
                </td>
              <td>{item.quantity}</td>
              <td>${item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    orderService.getAll().then((response) => {
      console.log("Order Service: ", response);
      setOrders(response);
    });
  }, []);

  return (
    <div className="order-grid">
      {orders.map((order) => (
        <Order key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrderPage;
