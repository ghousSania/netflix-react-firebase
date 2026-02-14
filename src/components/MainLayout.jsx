import Header from "./Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <div className="pt-15" /> {/* spacer for fixed header */}
      <Outlet />
    </div>
  );
};

export default MainLayout;
