import axios from "axios";

const instance = axios.create({
  baseURL: '',
  headers: {
    // "Authorization": `Bearer ${localStorage.getItem("token")}`,
    contentType: "application/json",
  },
});
export default instance;
