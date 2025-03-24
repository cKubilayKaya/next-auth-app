import axiosInstance from "@/utils/axiosInstance";

export const loginService = async (data) => {
  try {
    const res = await axiosInstance.post("/auth/login", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const registerService = async (data) => {
  try {
    const res = await axiosInstance.post("/auth/register", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfileService = async (data) => {
  try {
    const res = await axiosInstance.put("/auth/profile", data);
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

export const emailVerifyService = async (data) => {
  try {
    const res = await axiosInstance.post("/auth/email-verify", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const resendEmailService = async (data) => {
  try {
    const res = await axiosInstance.post("/auth/resend-email", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const forgotPasswordService = async (data) => {
  try {
    const res = await axiosInstance.post("/auth/forgot-password", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const changePasswordService = async (data) => {
  try {
    const res = await axiosInstance.post("/auth/change-password", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
