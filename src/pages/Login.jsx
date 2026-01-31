import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authStart, authFail, clearAuthError } from "../store/authSlice";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Navigate, Link } from "react-router-dom";
import { getAuthErrorMessage } from "../utils/firebaseErrorMapper";
import AuthLayout from "../components/auth/AuthLayout";
import AuthForm from "../components/auth/AuthForm";
import AuthInput from "../components/auth/AuthInput";
import Button from "../components/Button";
import FieldError from "../components/auth/FieldError";
import FormError from "../components/auth/FormError";
const Login = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, authError } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);
  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    dispatch(authStart());

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Success state will be handled by onAuthStateChanged listener
    } catch (error) {
      setSubmitting(false);
      dispatch(authFail(error.code));
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <AuthLayout
      title="Welcome Back"
      subTitle="Enter your email and password to sign in."
    >
      <AuthForm onSubmit={handleLogin}>
        {/* Email */}
        <div className="mb-4">
          <AuthInput
            label="Email Address"
            type="email"
            id="email"
            name="name"
            value={email}
            required="true"
            placeholder="Enter email address"
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <FieldError message="Email is required" /> */}
        </div>

        {/* Password */}
        <div className="mb-4">
          <AuthInput
            label="Password"
            type="password"
            id="password"
            name="password"
            value={password}
            required="true"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <FieldError message="Password is required" /> */}
        </div>

        {authError && <FormError message={getAuthErrorMessage(authError)} />}
        <Button type="submit" fullWidth loading={submitting} className="mt-2">
          Login
        </Button>
      </AuthForm>
      <p className="text-(--text-muted) text-center mt-4">
        New Here?{" "}
        <Link to="/signup" className="text-(--text-primary)">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
