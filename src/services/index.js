import axios from "axios";

const token = localStorage.getItem("token");

const apiBase = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
  headers: { Accept: "application/json", "Content-Type": "application/json" },
  timeout: 1000,
});

const apiAuth = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  timeout: 1000,
});

export { apiBase, apiAuth };
