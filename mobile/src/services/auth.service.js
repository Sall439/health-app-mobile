import { api } from "./api";
import * as SecureStore from "expo-secure-store";


export const loginUser = async (email , password)=> {
    try {
        const response = await api.post("/users/login", {
            email,
            password
        })

        const data = response.data
        if(data.token){
            await SecureStore.setItemAsync("token", data.token)
        }

        return data
    } catch (error) {
        if(error.response){
            throw new Error(error.response.data.message || "Connexion echoue")
        } else {
            throw new Error("Network Error")
        }
    }
}

export const logoutUser = async () => {
    await SecureStore.deleteItemAsync("token")
}