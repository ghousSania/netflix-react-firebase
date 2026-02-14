import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authStart, authFail, clearAuthError } from "../store/authSlice";
import { auth } from "../services/firebase";
import { Navigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getAuthErrorMessage } from "../utils/firebaseErrorMapper";
import AuthLayout from "../components/auth/AuthLayout";
import AuthForm from "../components/auth/AuthForm";
import AuthInput from "../components/auth/AuthInput";
import Button from "../components/Button";
import FieldError from "../components/auth/FieldError";
import FormError from "../components/auth/FormError";
import { validateAuthForm } from "../utils/validateAuthForm";
const Signup = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, authError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSignup = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const validationErrors = validateAuthForm(
      { name, email, password, confirmPassword },
      "signup",
    );
    if (Object.keys(validationErrors).length > 0) {
      setSubmitting(false);
      setErrors(validationErrors);
      return;
    }
    dispatch(authStart());

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      // success handled by auth Listener
      await updateProfile(userCredential.user, {
        displayName: name,
      });
    } catch (error) {
      setSubmitting(false);
      dispatch(authFail(error.code));
    }
  };
  const clearFieldError = (field) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const { [field]: _, ...rest } = prev;
      return rest;
    });
  };
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <AuthLayout
      title="Create an account"
      subTitle="Create an account and start watching today."
    >
      <AuthForm onSubmit={handleSignup}>
        {/* Name */}
        <div className="mb-4">
          <AuthInput
            label="Full Name"
            type="text"
            id="name"
            name="name"
            value={name}
            required={true}
            placeholder="Enter your name"
            onChange={(e) => {
              setName(e.target.value);
              clearFieldError("fullname");
            }}
            className="capitalize"
          />
          {errors.fullname && <FieldError message={errors.fullname} />}
        </div>

        {/* Email */}
        <div className="mb-4">
          <AuthInput
            label="Email Address"
            type="email"
            id="email"
            name="email"
            value={email}
            required={true}
            placeholder="Enter your email"
            onChange={(e) => {
              (setEmail(e.target.value), clearFieldError("email"));
            }}
          />
          {errors.email && <FieldError message={errors.email} />}
        </div>

        {/* Password */}
        <div className="mb-4">
          <AuthInput
            label="Password"
            type="password"
            id="password"
            name="password"
            value={password}
            required={true}
            placeholder="Enter password"
            onChange={(e) => {
              (setPassword(e.target.value), clearFieldError("password"));
            }}
          />
          {errors.password && <FieldError message={errors.password} />}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <AuthInput
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            required={true}
            placeholder="Confirm password"
            onChange={(e) => {
              (setConfirmPassword(e.target.value),
                clearFieldError("confirmPassword"));
            }}
          />
          {errors.confirmPassword && (
            <FieldError message={errors.confirmPassword} />
          )}
        </div>
        {authError && <FormError message={getAuthErrorMessage(authError)} />}
        <Button type="submit" fullWidth loading={submitting} className="mt-2">
          Signup
        </Button>
      </AuthForm>
      <p className="text-(--text-muted) text-center mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-(--text-primary)">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Signup;
