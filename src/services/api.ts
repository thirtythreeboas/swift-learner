import axios, {AxiosInstance} from 'axios';

const API_URL = 'http://localhost:8000';
const REQUEST_TIMEOUT = 5000;

const createApi = (): AxiosInstance => {
  const API = axios.create({
    baseURL: API_URL,
    timeout: REQUEST_TIMEOUT,
  });

  return API;
};

export const API = createApi();
