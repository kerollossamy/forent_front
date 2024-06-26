import * as yup from "yup";

const loginPat = /^[a-zA-Z0-9._]+@[a-z]{1,8}\.(com|eg|gov|edu)$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=])(?=.*[^\w\d\s]).{8,}$/;
const phoneNumberRegex = /^01\d{9}$/;

const ValidSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please Enter a Valid Email")
    .required("Must Add Email")
    .matches(loginPat, "Email Didn't Meet Requriments should contain @ and ."),
  password: yup
    .string()
    .min(8)
    .max(20)
    .matches(
      passwordRegex,
      "Please ensure that it includes at least one uppercase letter, one lowercase letter, one digit, one special character from the set @#$%^&+=, one character that is not a letter or digit, and has a minimum length of 8 characters."
    )
    .required("Password Must Match")
    .required("Must Fill this Field"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password Must Match")
    .required("Must Fill this Field"),
  phoneNumber: yup
    .string()
    .matches(
      phoneNumberRegex,
      "Phone Number must not exceed and not less than 11 numbers and must start with 01 "
    )
    .required("Must Fill this Field"),
  username: yup
    .string()
    .min(3, "Must be Minimum 3 letters")
    .max(20, "Maximum 10 Letters")
    .required("Must Fill this Field"),
  fullname: yup
    .string()
    .min(3, "Name must be at Least 3 Letters")
    .max(15, "Name must be Maximum 15 Letters")
    .required("Must Fill this Field"),
  role: yup.string().required("Please select a member type"),
});

export default ValidSchema;
