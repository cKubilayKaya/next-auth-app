import * as Yup from "yup";

const changePasswordSchema = Yup.object({
  email: Yup.string()
    .email("Please provide a valid email.")
    .min(3, "Username must be at least 3 characters long.")
    .max(30, "Username must be less than 30 characters.")
    .required("Email is required."),
  code: Yup.string().min(6, "Code must be at least 6 characters long.").max(6, "Code must be less than 6 characters.").required("Code is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long.")
    .max(30, "Password must be less than 30 characters.")
    .required("Password is required."),
  rePassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match.")
    .min(6, "Password must be at least 6 characters long.")
    .max(30, "Password must be less than 30 characters.")
    .required("Re-entering password is required."),
});

export default changePasswordSchema;
