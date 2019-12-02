import axios from "axios";
import LocalStorageService from "./LocalStorageService.js";
const localStorageService = LocalStorageService.getService();
var httpService = axios.create({
  baseURL: "http://localhost:8000/api/",
  responseType: "json"
});

httpService.interceptors.request.use(
  config => {
    const token = localStorageService.getAccessToken();
    if (token) {
      config.headers['Authorization'] = 'Token ' + token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    Promise.reject(error);
  });

export default httpService;
