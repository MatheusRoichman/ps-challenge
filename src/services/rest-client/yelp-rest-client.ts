import axios from "axios";

const yelpRestClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_YELP_API_URL,
});

yelpRestClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${process.env.YELP_API_KEY}`;
    return config;
  },
  Promise.reject
);

export default yelpRestClient;