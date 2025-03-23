"use client";
import React from "react";
import useForm from "../hooks/useForm";
import Input from "./Input";
import { loginService } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/slices/authSlice";

export default function LoginForm() {
  const { formData, errors, touched, handleChange, handleFocus, handleSubmit } = useForm({
    email: "",
    password: "",
  });

  const { loginAction } = useAuth();

  const router = useRouter();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(async () => {
      const { success, token, user } = await loginService(formData);

      if (success && token) {
        loginAction({ token: token, user: user });
        router.push("/");
      }
    });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4"></div>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={handleFocus}
            touched={touched?.email}
            errors={errors?.email}
          />
        </div>
        <div className="mb-6">
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onFocus={handleFocus}
            touched={touched?.password}
            errors={errors?.password}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
