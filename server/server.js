const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const cors = require("cors");

//Load data from JSON file into memory
const rawData = fs.readFileSync(path.join(__dirname, "sampledata.json"));
const data = JSON.parse(rawData);

app.use(express.static('build'))
app.use(cors());
app.use(express.json());

app.get("/api/products", (req, res) => {
  res.json(data.products);
});

app.get("/api/products/:id", (req, res) => {
  const id = req.params.id;
  const product = data.products.filter((p) => p.id === id)[0];
  if (product) {
    res.json(product);
  } else {
    res.status(404).send("Product not found");
  }
});

app.get("/api/orders", (req, res) => {
  if (req.query.user_id) {
    const id = Number(req.query.user_id);
    const userOrders = data.orders.filter((o) => o.user_id === id);

    if (userOrders.length) {
      return res.json(userOrders);
    } else {
      return res.status(404).send("No orders made by this user");
    }
  }
  res.json(data.orders);
});

app.post("/api/orders", (req, res) => {
  try {
    const body = req.body;

    console.log("From order post api ", body);

    const lastOrder = data.orders[data.orders.length - 1];
    const lastID = lastOrder.id;

    const newOrder = {
      id: lastID + 1,
      user_id: body.user_id,
      order_date: body.order_date,
      order_status: body.order_status,
      order_total: body.order_total,
      order_items: body.order_items,
    };

    data.orders.push(newOrder);
    fs.writeFileSync(path.join(__dirname, "sampledata.json"), JSON.stringify(data, null, 2), "utf8");
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send("Error processing the request.");
  }
});

app.get("/api/categories", (req, res) => {
  res.json(data.categories);
});

app.get("/api/tags", (req, res) => {
  res.json(data.tags);
});

// app.get("/api/orders", (req, res) => {
//   res.json(data.orders);
// });

app.get("/api/session", (req, res) => {
  res.json(data.session);
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = data.users.filter((u) => u.id === id)[0];
  // return a 404 if there is no such unit
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    res.send("<h1>Unit not found.</h1>");
  }
});

app.get("/:universalURL", (req, res) => {
  res.send("404 URL NOT FOUND");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
