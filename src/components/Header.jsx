import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import Container from "./container";
import { clearUser } from "../store/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

const Header = ({ variant = "app" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const userName = useSelector((state) => state.auth?.user?.name || "");

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const initials = getInitials(userName);

  const handleLogoClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // CLOSE DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed h-15 w-full bg-[#111c33] shadow-md py-3 z-50 ">
      <Container>
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <div
            onClick={handleLogoClick}
            className="text-2xl font-bold cursor-pointer select-none"
          >
            <span className="text-white">Nova</span>{" "}
            <span className="text-[#2a6aee]">Movies</span>
          </div>

          {/* RIGHT SIDE */}
          {variant === "app" && (
            <div className="flex items-center gap-5 relative" ref={dropdownRef}>
              {/* SEARCH */}
              <FiSearch
                size={22}
                className="text-white cursor-pointer hover:text-[#2a6aee] transition"
                onClick={() => navigate("/search")}
              />

              <div
                onClick={() => setOpen((prev) => !prev)}
                className="w-9 h-9 rounded-md bg-[#2a6aee] flex items-center justify-center text-white font-semibold cursor-pointer hover:opacity-90 transition"
              >
                {initials}
              </div>

              {open && (
                <div className="absolute right-0 top-12 w-32 bg-[#1b2545] rounded-md shadow-lg overflow-hidden">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#2a6aee] transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
