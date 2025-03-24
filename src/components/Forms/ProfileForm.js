"use client";
import React, { useEffect } from "react";
import useForm from "../../hooks/useForm";
import Input from "../Input";
import { updateProfileService } from "@/services/authService";
import { useSelector } from "react-redux";
import updateProfileSchema from "@/validations/updateProfileSchema";
import { useAuth } from "@/store/slices/authSlice";
import Link from "next/link";

export default function ProfileForm() {
  const { user } = useSelector((state) => state?.auth);
  const { loginAction } = useAuth();

  const { formData, errors, setFormData, touched, handleChange, handleFocus, handleSubmit } = useForm(
    {
      fullname: "",
    },
    updateProfileSchema
  );

  useEffect(() => {
    if (user?.fullname) {
      setFormData((prev) => ({
        ...prev,
        fullname: user?.fullname,
      }));
    }
  }, [user]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(async () => {
      console.log(formData);
      const { success, user } = await updateProfileService(formData);
      if (success && user) {
        loginAction({ user: user });
      }
    });
  };

  return (
    <div className="container">
      <h2 className="title">Profile</h2>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
