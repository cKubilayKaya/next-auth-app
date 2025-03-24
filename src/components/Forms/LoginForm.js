"use client";
import React from "react";
import useForm from "../../hooks/useForm";
import Input from "../Input";
import { loginService } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/slices/authSlice";
import loginSchema from "@/validations/loginSchema";
import Link from "next/link";

export default function LoginForm() {
  const { formData, errors, touched, handleChange, handleFocus, handleSubmit, isFormValid } = useForm(
    {
      email: "",
      password: "",
    },
    loginSchema
  );

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
    <div className="container">
      <h2 className="title">Login</h2>
      <form onSubmit={handleFormSubmit}>
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
        <button type="submit" disabled={!isFormValid}>
          Login
        </button>
        <Link href="/forgot-password">Forgot Password</Link>
      </form>
    </div>
  );
}
