import * as Yup from "yup";

const loginSchema = Yup.object({
  email: Yup.string().email("Please provide a valid email.").required("Email is required."),
  password: Yup.string().min(6, "Password must be at least 6 characters long.").required("Password is required."),
});

export default loginSchema;
