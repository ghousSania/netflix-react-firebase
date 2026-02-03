export const validateAuthForm = (values, mode = "login") => {
  const errors = {};
  // email
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Enter a valid email address";
  }

  // password
  if ("password" in values) {
    if (!values.password) {
      errors.password = "Password is required";
    } else if (mode === "signup" && values.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }
  }

  // full Name
  if ("name" in values) {
    if (!values.name.trim()) {
      errors.fullname = "Full name is required";
    }
  }

  //   Confirm Password
  if ("confirmPassword" in values) {
    if (!values.confirmPassword) {
      errors.confirmPassword = "Please confrim your password";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords does not match";
    }
  }
  return errors;
};
