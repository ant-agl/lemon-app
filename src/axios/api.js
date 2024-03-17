import axios from "axios";

export default axios.create({
  baseURL: "https://api.lemon-time.ru",
  headers: {
    "Content-Type": "application/json",
    "X-Auth-Token": localStorage.token ?? "",
  },
});
