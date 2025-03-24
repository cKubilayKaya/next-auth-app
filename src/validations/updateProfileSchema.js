import * as Yup from "yup";

const updateProfileSchema = Yup.object({
  email: Yup.string().email("Please provide a valid email."),
  fullname: Yup.string().min(3, "Fullname should be at least 3 characters."),
});

export default updateProfileSchema;
