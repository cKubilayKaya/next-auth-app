"use client";
import React, { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import Input from "../Input";
import { emailVerifyService, resendEmailService } from "@/services/authService";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import emailVerifySchema from "@/validations/emailVerifySchema";

export default function EmailVerifyForm() {
  const { user } = useSelector((state) => state?.auth);
  const [resendCodeStatus, setResendCodeStatus] = useState({});
  const [count, setCount] = useState();

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

      resendEmailHandle();
    }
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
        router?.push("/email-verify");
      }
    });
  };

  console.log(resendCodeStatus?.success);

  return (
    <div className="container">
      {/* {resendCodeStatus?.success === false && (
        <div>
          {count === 0 ? (
            <button onClick={resendEmailHandle}>Send New Email Code</button>
          ) : (
            <>
              <p>{count}</p>
              <h4>You must wait a while before sending a new code</h4>
            </>
          )}
        </div>
      )} */}
      {resendCodeStatus && count === 0 ? (
        <button className="resend-email-button" onClick={resendEmailHandle}>
          Send New Email Code
        </button>
      ) : (
        <>
          <p className="count-number">{count}</p>
          <h4 className="count-text">You must wait a while before sending a new code</h4>
        </>
      )}
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
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}
