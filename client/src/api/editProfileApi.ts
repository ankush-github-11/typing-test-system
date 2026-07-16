import axios from "axios";
import type { editProfileData } from "../types/editProfileData";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const editProfile = async (
  body: editProfileData,
): Promise<void> => {
  await axios.put(`${VITE_API_URL}/editProfile`, body);
};