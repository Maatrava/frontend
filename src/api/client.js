import { getAuthToken } from "../auth/token";

const BASE_URL = "https://fullstack-7ny8.onrender.com/api";

const apiClient = async (endpoint, { body, ...customConfig } = {}) => {
    const token = getAuthToken();
    const headers = { "Content-Type": "application/json" };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const config = {
        method: body ? "POST" : "GET",
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, config);

        // Check if response is JSON
        const contentType = response.headers.get("content-type");
        let data;
        if (contentType && contentType.includes("application/json")) {
            data = await response.json();
        }

        if (response.ok) {
            return data;
        } else {
            const errorMessage = data?.message || data?.error || "Something went wrong";
            return Promise.reject(errorMessage);
        }
    } catch (err) {
        return Promise.reject(err.message || "Network error");
    }
};

export default apiClient;
