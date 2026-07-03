import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v1";

export const login = (data) => {
    return axios.post(`${BASE_URL}/auth/login`, data);
};