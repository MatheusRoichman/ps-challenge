import axios from "axios";

const yelpRestClient = axios.create({
  baseURL: "https://api.yelp.com/v3",
});

yelpRestClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${process.env.YELP_API_KEY}`;
    return config;
  },
  Promise.reject
);

export default yelpRestClient;