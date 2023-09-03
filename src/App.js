import "./App.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import Product from "./components/Product";
import ProductList from "./components/ProductList";
import OrderPage from "./components/Orders";
import productService from "./services/productService";
import sessionService from "./services/sessionService";
import userService from "./services/userService";
import CartPage from "./components/CartPage";

const Home = () => {
  const [products, setProducts] = useState([]);

  // const addNewUnit = (newUnit) => {

  //   axios.post("http://localhost:3001/units", newUnit)
  //   .then(response => {
  //     console.log("POST response", response)
  //     setUnits([...units, response.data])
  //   })
  // }

  useEffect(() => {
    productService.getAll().then((response) => {
      console.log("response: ", response);
      setProducts(response);
    });
  }, []);

  return (
    <div className="App">
      {/* //<UnitForm updateFn={addNewUnit}/>  */}
      {/* {products.map((product) => (<Product key={product.id} product={product} />))} */}
      <ProductList products={products} />
    </div>
  );
};

const ProductPage = () => {
  const [product, setProduct] = useState(10);

  const { id } = useParams();
  console.log("ID of the Product", id);

  useEffect(() => {
    productService.getProduct(id).then((response) => {
      console.log("Response from getProduct", response);
      setProduct(response.data);
    });
  }, []);

  return <Product.SingleProduct product={product} />;
};

const App = () => {
  const [user, setUser] = useState(0);

  useEffect(() => {
    sessionService.getSession().then((response) => {
      console.log("Session Response: ", response);
      const data = response;
      const userID = data.user_id;
      userService.getUser(userID).then((response) => {
        console.log("Users response", response);
        setUser(response.data);
      });
    });
  }, []);

  return (
    <Router>
      <div className="navbar">
        {/* <div>
          <Link to="/" className="nav-link">
          Shop
          </Link>
        </div> */}
        <div className="nav-links">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/cart">
            Cart
          </Link>
          <Link className="nav-link" to="/orders">
            Orders
          </Link>
        </div>
        <div className="user-info">
          {user
            ? `Hello, ${user.first_name + " " + user.last_name}!`
            : "Hello, Guest!"}
        </div>
      </div>

      <Routes>
        {/* <Route path="/units" element={<Units />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
};

export default App;
