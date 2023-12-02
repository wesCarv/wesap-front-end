import axios from "axios";

const instance = axios.create({
    baseURL: 'localhost:3003',
    timeout: 5000
  });

  export default instance;