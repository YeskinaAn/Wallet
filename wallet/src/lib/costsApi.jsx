import axios from "axios";

export const DEFAULT_ERROR_MESSAGE = "Oops, something went wrong";
export const DEFAULT_SAVED_MESSAGE = "Changes have been saved";

export const privateCostsApi = axios.create({
  baseURL: "http://localhost:3001",
});
const token = localStorage.getItem("token");

privateCostsApi.interceptors.request.use((config) => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: `Bearer ${token}`,
  },
}));
