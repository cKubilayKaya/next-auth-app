"use client";
import React, { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import Input from "../Input";
import { forgotPasswordService } from "@/services/authService";
import { useRouter } from "next/navigation";
import forgotPasswordSchema from "@/validations/forgotPasswordSchema";

export default function ForgotPasswordForm() {
  const router = useRouter();

  const { formData, errors, touched, handleChange, handleFocus, handleSubmit } = useForm(
    {
      email: "",
    },
    forgotPasswordSchema
  );

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(async () => {
      const { success } = await forgotPasswordService(formData);
      if (success) {
        localStorage.setItem("email", formData?.email);
        router?.push("/change-password");
      }
    });
  };

  return (
    <div className="container">
      <h2 className="title">Forgot Password</h2>
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
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
