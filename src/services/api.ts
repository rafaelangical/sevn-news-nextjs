import axios from "axios";

const instance = axios.create({
  baseURL: "https://apimock.sevn.technology",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

export default instance;
