import axios from "axios";

const apiRestClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default apiRestClient;