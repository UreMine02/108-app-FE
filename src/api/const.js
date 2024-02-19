import axios from 'axios'

export const apiURL = "https://api-108.aiotlab-annotation.com/";
export const axiosInstance = axios.create({
    baseURL: apiURL,
    headers: {
        "Content-Type": "application/json",
    },
});