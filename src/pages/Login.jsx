import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authStart, authFail, clearAuthError } from "../store/authSlice";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Navigate, Link } from "react-router-dom";
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
      dispatch(authFail(error.message));
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <div>
      <h2>Welcome Back</h2>
      <p>Enter your email and password to sign in.</p>
      <form onSubmit={handleLogin}>
        {/* Email */}
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* Password */}
        <div>
          <div>
            <label htmlFor="password">Password</label>
            <a href="">Forget Password?</a>
          </div>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {authError && <p>{authError} </p>}
        <button disabled={submitting}>
          {submitting ? "Logging in..." : "Login"}
        </button>
      </form>
      <p>
        New Here? <Link to="/signup">Create an account</Link>
      </p>
    </div>
  );
};

export default Login;
