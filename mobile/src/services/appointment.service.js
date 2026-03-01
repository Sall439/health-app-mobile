import { api } from "./api"; // ton instance axios
import * as SecureStore from "expo-secure-store";

export const getAppointments = async () => {
    try {
        const token = await SecureStore.getItemAsync("token")
        const response = await api.get("/patient/appointments", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data
    } catch (error) {
        console.log("GET APPOINTMENTS ERROR:", error.message);
        throw error;
    }
}


export const createAppointment = async ({
  doctorId,
  hospitalId,
  specialtyId,
  motif,
  date,
  heure,
}) => {
  try {
    const token = await SecureStore.getItemAsync("token");
    const response = await api.post(
      "/patient/newAppointment",
      { doctorId, hospitalId, specialtyId, motif, date, heure },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
    console.log("TOKEN:", token);
  } catch (error) {
    console.log("CREATE APPOINTMENT ERROR:", error.message);
    throw error;
  }
};