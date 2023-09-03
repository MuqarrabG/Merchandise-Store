import axios from "axios";

const baseURL = "http://localhost:3001/api/users"

const getAll = () => {
    return axios.get(baseURL)
                .then((response) => response.data)
}

const getUser = (id) => {
    return axios.get(baseURL + "/" + id)
}

export default {getAll, getUser}