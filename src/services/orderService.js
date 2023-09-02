import axios from "axios";

const baseURL = "http://localhost:3001/orders"

const getAll = () => {
    return axios.get(baseURL)
                .then((response) => response.data)
}

export default {getAll}