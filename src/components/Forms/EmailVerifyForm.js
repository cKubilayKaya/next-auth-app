"use client";
import React, { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import Input from "../Input";
import { emailVerifyService, resendEmailService } from "@/services/authService";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import emailVerifySchema from "@/validations/emailVerifySchema";
import SendNewEmailCode from "../SendNewEmailCode";

export default function EmailVerifyForm() {
  const { user } = useSelector((state) => state?.auth);
  const [resendCodeStatus, setResendCodeStatus] = useState({});
  const [count, setCount] = useState();
  const [successMessage, setSuccessMessage] = useState(false);

  const router = useRouter();

  const { formData, errors, setFormData, touched, handleChange, handleFocus, handleSubmit } = useForm(
    {
      email: "",
      emailVerificationCode: "",
    },
    emailVerifySchema
  );

  const resendEmailHandle = () => {
    let emailData = localStorage.getItem("email");

    const resendEmail = async () => {
      try {
        const res = await resendEmailService({ email: emailData });
        setResendCodeStatus(res);
        if (res?.success && res?.message === "Verification code be sent!") {
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

      // resendEmailHandle();
    }
  }, [user]);

  useEffect(() => {
    resendEmailHandle();
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
      const { success, user } = await emailVerifyService(formData);
      if (success && user) {
        setSuccessMessage(true);
        setTimeout(() => {
          router?.push("/login");
        }, 3000);
      }
    });
  };

  return (
    <div className="container">
      <SendNewEmailCode resendCodeStatus={resendCodeStatus} count={count} resendEmailHandle={resendEmailHandle} />
      <h2 className="title">Email Verify</h2>
      <form onSubmit={handleFormSubmit}>
        <Input
          type="text"
          placeholder="Email Verification Code"
          name="emailVerificationCode"
          value={formData.emailVerificationCode}
          onChange={handleChange}
          onFocus={handleFocus}
          touched={touched?.emailVerificationCode}
          errors={errors?.emailVerificationCode}
        />
        {successMessage && <p className="email-verified">Email verified! You are gonna redirect to login page.</p>}
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}
