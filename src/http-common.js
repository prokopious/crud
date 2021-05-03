import axios from "axios";

export default axios.create({
  baseURL: "https://casarosada.herokuapp.com/",
  headers: {
    "Content-type": "application/json",
  },
});
