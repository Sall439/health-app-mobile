import axios from "axios"
import * as SecureStore from "expo-secure-store";


export const api = axios.create({
    baseURL: "https://health-app-mobile-5.onrender.com/api",
    headers: {
        "Content-Type": "application/json"
    }
})

// config la recuperation automatique du token apres connexion
api.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync("token")

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})