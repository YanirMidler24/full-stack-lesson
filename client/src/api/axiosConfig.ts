// api/axiosConfig.ts
import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:9000",
    headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
    }
});

// Add request interceptor to add timestamp to all requests
apiClient.interceptors.request.use((config) => {
    const timestamp = Date.now();
    const separator = config.url?.includes('?') ? '&' : '?';
    config.url = `${config.url}${separator}_t=${timestamp}`;
    return config;
});

export default apiClient;