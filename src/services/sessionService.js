import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";
const baseURL = isProduction ? "/api/session" : "http://localhost:3001/api/session";

const getSession = () => {
  return axios.get(baseURL).then((response) => response.data);
};

export default {getSession};
