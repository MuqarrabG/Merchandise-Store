import axios from "axios";

const baseURL = "http://localhost:3001/session"

const getSession = () => {
    return axios.get(baseURL)
                .then((response) => response.data)
}

export default {getSession}