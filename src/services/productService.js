import axios from "axios";

const baseURL = "http://localhost:3001/products"

const getAll = () => {
    return axios.get(baseURL)
                .then((response) => response.data)
}

const getProduct = (id) => {
    return axios.get(baseURL + "/" + id)
}

export default {getAll, getProduct}