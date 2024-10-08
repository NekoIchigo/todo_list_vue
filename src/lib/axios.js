import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
  },
});

axios.defaults.withCredentials  = true // allow sending cookies
axios.defaults.withXSRFToken = true;

export default axios;
