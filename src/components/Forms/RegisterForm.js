"use client";
import React, { useEffect } from "react";
import useForm from "../../hooks/useForm";
import Input from "../Input";
import { registerService } from "@/services/authService";
import { useSelector } from "react-redux";
import registerSchema from "@/validations/registerSchema";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/slices/authSlice";

export default function RegisterForm() {
  const router = useRouter();
  const { registerAction } = useAuth();

  const { formData, errors, setFormData, touched, handleChange, handleFocus, handleSubmit } = useForm(
    {
      fullname: "",
      username: "",
      email: "",
      password: "",
    },
    registerSchema
  );

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(async () => {
      const { success, user } = await registerService(formData);
      if (success && user) {
        // registerAction({ user: user });
        localStorage.setItem("email", user?.email);
        router?.push("/email-verify");
      }
    });
  };

  return (
    <div className="container">
      <h2 className="title">Register</h2>
      <form onSubmit={handleFormSubmit}>
        <Input
          type="text"
          placeholder="Fullname"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          onFocus={handleFocus}
          touched={touched?.fullname}
          errors={errors?.fullname}
        />
        <Input
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          onFocus={handleFocus}
          touched={touched?.username}
          errors={errors?.username}
        />
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
