import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";
const baseURL = isProduction ? "/api/orders" : "http://localhost:3001/api/orders";

const getAll = () => {
  return axios.get(baseURL).then((response) => response.data);
};

const getOrderbyUser = (id) => {
  return axios.get(`${baseURL}?user_id=${id}`).then(response => response.data)
}

const create = (newOrder) => {
  return axios.post(baseURL, newOrder).then((response) => response.data);
};

export default { getAll, create, getOrderbyUser };
