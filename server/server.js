const express = require('express')
const app = express()

app.get("/products", (req, res) => {
    res.send("Hello")
})
app.get("/products/<id>", (req, res) => {
    res.send("Hello")
})
app.get("/categories", (req, res) => {
    res.send("Hello")
})
app.get("/orders", (req, res) => {
    res.send("Hello")
})
app.get("/universalURL", (req, res) => {
    res.send("404 URL NOT FOUND")
})

app.listen(3000, () => {
    console.log("listening on http://localhost:3000")
})