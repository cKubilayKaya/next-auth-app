import * as Yup from "yup";

const emailVerifySchema = Yup.object({
  emailVerificationCode: Yup.string()
    .min(6, "Email Verification Code must be at least 3 characters long.")
    .max(6, "Email Verification Code must be less than 30 characters.")
    .required("Email Verification Code is required"),
});

export default emailVerifySchema;
