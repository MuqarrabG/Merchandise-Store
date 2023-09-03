import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";
const baseURL = isProduction ? "/api/products" : "http://localhost:3001/api/products";

const getAll = () => {
    return axios.get(baseURL)
                .then((response) => response.data)
}

const getProduct = (id) => {
    return axios.get(`${baseURL}/${id}`)
}

export default {getAll, getProduct}