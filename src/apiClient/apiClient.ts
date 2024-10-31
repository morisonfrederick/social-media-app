import axios from "axios";

const token = localStorage.getItem('authToken')
const apiClient = axios.create({
    baseURL:import.meta.env.VITE_APP_API_URL,
    headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${token}`
    }
})

// setup interceptors for token updates or error handling

apiClient.interceptors.request.use((config)=>{
    const token = localStorage.getItem('authToken');
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default apiClient;