import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout:80000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },(error) => {  
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            // Server responded with a status other than 2xx
            if (error.response.status === 401) {
                // Unauthorized, redirect to login
                window.location.href = "/login";
            } else if (error.response.status >= 500) {
                // Server-side errors
                console.error("Server error. Please try again later.");
            } else {
                // Other client-side errors (4xx)
                console.error("An error occurred:", error.response.data.message);
            }
        } else if (error.code === "ECONNABORTED") { // Correct check for timeout
            // Request timeout
            console.error("Request timeout. Please try again later.");
        } else {
            // Other network errors
            console.error("Network error. Please check your connection.");
        }
        
        return Promise.reject(error);
    }
);

export default axiosInstance;