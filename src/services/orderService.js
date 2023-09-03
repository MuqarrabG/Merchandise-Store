import axios from "axios";

//const baseURL = "http://localhost:3001/api/orders";
const baseURL = process.env.REACT_APP_API_URL || "http://localhost:3001/api/orders"

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
