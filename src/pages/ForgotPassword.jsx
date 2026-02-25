import { useState, useEffect } from "react";
import AuthLayout from "../components/auth/AuthLayout";
import AuthForm from "../components/auth/AuthForm";
import AuthInput from "../components/auth/AuthInput";
import FormError from "../components/auth/FormError";
import FieldError from "../components/auth/FieldError";
import { getAuthErrorMessage } from "../utils/firebaseErrorMapper";
import { validateAuthForm } from "../utils/validateAuthForm";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/firebase";
import { useDispatch, useSelector } from "react-redux";
import { authFail, clearAuthError } from "../store/authSlice";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../utils/usePageTitle";
import Header from "../components/Header";
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authError } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  usePageTitle("Forgot Password - Nova Movies");
  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const validationErrors = validateAuthForm({ email });

    if (validationErrors.email) {
      setErrors(validationErrors);
      setSubmitting(false);
      return;
    }
    try {
      //firebase call
      await sendPasswordResetEmail(auth, email);
      // show success ui
      setSuccess(true);
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      dispatch(authFail(error.code));
    }
  };
  return !success ? (
    <>
      <Header variant="auth" />
      <AuthLayout
        title="Reset Password"
        subTitle="Enter your email to receive a reset link."
      >
        <AuthForm onSubmit={handleSubmit}>
          <div className="mb-4">
            <AuthInput
              label="Email address"
              type="email"
              id="email"
              value={email}
              required={true}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({});
              }}
            />
            {errors.email && <FieldError message={errors.email} />}
            {authError && (
              <FormError message={getAuthErrorMessage(authError)} />
            )}
          </div>

          <Button type="submit" fullWidth loading={submitting} className="mt-2">
            Send Reset Link
          </Button>
        </AuthForm>
      </AuthLayout>
    </>
  ) : (
    // success state
    <AuthLayout title="Check your inbox">
      <div className="bg-slate-800/70 backdrop-blur-md py-5 px-7 shadow-2xl rounded-xl">
        {/* Message */}
        <p className="text-(--text-muted) leading-relaxed text-center">
          We’ve sent a password reset link to <br />
          <span className="font-medium text-(--primary)">{email}</span>. Please
          check your spam folder if you don't see it.
        </p>

        {/* Button */}
        <Button
          type="button"
          className="mt-5"
          fullWidth
          onClick={() => navigate("/login")}
        >
          Return to Login
        </Button>

        <p className="text-center text-(--text-muted) leading-relaxed mt-4">
          Didn't receive the email?
          <Button
            type="button"
            variant="link" // if you support this
            onClick={() => {
              setSuccess(false);
              setErrors({});
            }}
          >
            Try again
          </Button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
