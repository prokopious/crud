import axios from "axios";

export default axios.create({
  baseURL: "http://www.localhost:3000/",
  headers: {
    "Content-type": "application/json",
  },
});
