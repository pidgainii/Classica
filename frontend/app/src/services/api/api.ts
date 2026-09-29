import axios from "axios";

const url = "http://localhost:8000";

const api = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
