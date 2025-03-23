import axiosInstance from "@/utils/axiosInstance";

export const loginService = async (data) => {
  try {
    const res = await axiosInstance.post("/auth/login", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const meService = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    throw error;
  }
};
