"use client";
import React, { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import Input from "../Input";
import { changePasswordService, emailVerifyService, forgotPasswordService, resendEmailService } from "@/services/authService";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import SendNewEmailCode from "../SendNewEmailCode";
import changePasswordSchema from "@/validations/changePasswordSchema";

export default function ChangePasswordForm() {
  const { user } = useSelector((state) => state?.auth);
  const [resendCodeStatus, setResendCodeStatus] = useState({});
  const [count, setCount] = useState();
  const [successMessage, setSuccessMessage] = useState(false);

  const router = useRouter();

  const { formData, errors, setFormData, touched, handleChange, handleFocus, handleSubmit } = useForm(
    {
      email: "",
      code: "",
      password: "",
      rePassword: "",
    },
    changePasswordSchema
  );

  const forgotPasswordHandle = () => {
    let emailData = localStorage.getItem("email");

    const resendEmail = async () => {
      try {
        const res = await forgotPasswordService({ email: emailData });
        setResendCodeStatus(res);
        if (res?.success && res?.message === "Password reset code sent successfully!") {
          setCount(60);
        }
      } catch (error) {
        setResendCodeStatus(error.response.data);
        setCount(error.response.data.time);
      }
    };

    resendEmail();
  };

  useEffect(() => {
    let emailData = localStorage.getItem("email");

    if (emailData) {
      setFormData((prev) => ({
        ...prev,
        email: emailData,
      }));
    }
  }, [user]);

  useEffect(() => {
    forgotPasswordHandle();
  }, [user]);

  useEffect(() => {
    if (count === 0) return;

    const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [count]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(async () => {
      const { success } = await changePasswordService(formData);
      if (success) {
        setSuccessMessage(true);
        setTimeout(() => {
          router?.push("/login");
        }, 3000);
      }
    });
  };

  return (
    <div className="container">
      <SendNewEmailCode resendCodeStatus={resendCodeStatus} count={count} forgotPasswordHandle={forgotPasswordHandle} />
      <h2 className="title">Change Password</h2>
      <form onSubmit={handleFormSubmit}>
        <Input
          type="text"
          placeholder="Code"
          name="code"
          value={formData.code}
          onChange={handleChange}
          onFocus={handleFocus}
          touched={touched?.code}
          errors={errors?.code}
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
        <Input
          type="password"
          placeholder="Re-Password"
          name="rePassword"
          value={formData.rePassword}
          onChange={handleChange}
          onFocus={handleFocus}
          touched={touched?.rePassword}
          errors={errors?.rePassword}
        />
        {successMessage && <p className="email-verified">Password changed! You are gonna redirect to login page.</p>}
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
