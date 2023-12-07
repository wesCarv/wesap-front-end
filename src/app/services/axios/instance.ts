import axios from "axios";

const instance = axios.create({
    baseURL: 'https://wesap-back-end-production.up.railway.app',
    timeout: 5000
  });

  export default instance;