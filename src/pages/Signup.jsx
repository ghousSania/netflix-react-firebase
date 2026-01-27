import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authStart, authFail, clearAuthError } from "../store/authSlice";
import { auth } from "../services/firebase";
import { Navigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
const Signup = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, authError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    dispatch(authStart());

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // success handled by auth Listener
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
      <h2>Create an account</h2>
      <p>Create an account and start watching today.</p>
      <form onSubmit={handleSignup}>
        {/* Nama */}
        <div>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          {submitting ? "Signing up..." : "Signup"}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Sign in instead</Link>
      </p>
    </div>
  );
};

export default Signup;
