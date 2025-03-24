import { isObjEmpty } from "@/utils/isObjEmpty";
import React from "react";

export default function SendNewEmailCode({ resendCodeStatus, count, forgotPasswordHandle }) {
  if (!resendCodeStatus?.success && resendCodeStatus?.message === "This user is already verified!") {
    return "";
  }
  if (!resendCodeStatus?.success && resendCodeStatus?.time) {
    if (count !== 0) {
      return (
        <>
          <p className="count-number">{count}</p>
          <h4 className="count-text">You must wait a while before sending a new code</h4>
        </>
      );
    } else {
      return (
        <button className="resend-email-button" onClick={forgotPasswordHandle}>
          Send New Code
        </button>
      );
    }
  }
  if (resendCodeStatus?.success && resendCodeStatus?.message === "Password reset code sent successfully!") {
    if (count !== 0) {
      return (
        <>
          <p className="count-number">{count}</p>
          <h4 className="count-text">You must wait a while before sending a new code</h4>
        </>
      );
    } else {
      return (
        <button className="resend-email-button" onClick={forgotPasswordHandle}>
          Send New Code
        </button>
      );
    }
  }

  if (isObjEmpty(resendCodeStatus)) {
    return (
      <button className="resend-email-button" onClick={forgotPasswordHandle}>
        Send New Code
      </button>
    );
  }
}
