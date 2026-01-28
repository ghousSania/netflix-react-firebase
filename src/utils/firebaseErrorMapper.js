export const getAuthErrorMessage = (code) => {
  switch (code) {
    case "auth/invalid-credential":
      return "Email or password is incorrect.";
    case "auth/email-already-in-use":
      return "This email is already registered. Try logging in.";
    case "auth/weak-password":
      return "Password should be at least 6 characters long.";
    default:
      return "Something went wrong. Please try again.";
  }
};
