import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearUser } from "../store/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { fetchPopularMovies } from "../services/tmdb";
const Home = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    fetchPopularMovies().then((data) => console.log(data));
  }, []);
  return (
    <>
      <h1>Home Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Home;
