import * as Yup from "yup";

const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email("Please provide a valid email.")
    .min(3, "Username must be at least 3 characters long.")
    .max(30, "Username must be less than 30 characters.")
    .required("Email is required."),
});

export default forgotPasswordSchema;
