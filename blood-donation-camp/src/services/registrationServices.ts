import apiClient from "./apiClient";

export const registerDonor = async (data: RegistrationFormData) => {
  const response = await apiClient.post("/register/", data);
  return response.data;
};
