import * as Yup from "yup";

const registerSchema = Yup.object({
  fullname: Yup.string()
    .min(3, "Fullname must be at least 3 characters long.")
    .max(30, "Fullname must be less than 30 characters.")
    .required("Fullname is required"),
  username: Yup.string()
    .min(3, "Username must be at least 3 characters long.")
    .max(30, "Username must be less than 30 characters.")
    .required("Username is required"),
  email: Yup.string().email("Please provide a valid email.").required("Email is required."),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long.")
    .max(30, "Password must be less than 30 characters.")
    .required("Password is required."),
});

export default registerSchema;
