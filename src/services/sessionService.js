import axios from "axios";

//const baseURL = "http://localhost:3001/api/session";
const baseURL = process.env.REACT_APP_API_URL || "http://localhost:3001/api/sessions"

const getSession = () => {
  return axios.get(baseURL).then((response) => response.data);
};

export default {getSession};
