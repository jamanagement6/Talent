import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Main from "./Layouts/Main";
import ChatInterface from "./Pages/Chat";
import LoginPage from "./Pages/Login";
import SignupPage from "./Pages/SignUp";
import LandingPage from "./Pages/LandingPage";
import VeificationPage from "./Pages/VerifyPage";
import ProfilePage from "./Pages/ProfilePage";
import ForgotPassword from "./Pages/ForgetPassword";
import { useContext, useEffect } from "react";
import Navbar from "./Components/Navbar";
import { AuthContext, AuthContextType } from "./Contexts/AuthContext";
import { FullUserDetails } from "./types";

function App() {
  const { isLoggedIn, fulluser, Logout } = useContext(
    AuthContext
  ) as AuthContextType;

  const ScrollToSection = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
      const hash = location.hash.replace("#", "");
      if (!hash) return;
      if (location.pathname === "/") {
        const section = document.getElementById(hash);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate(`/#${hash}`, { replace: true });
      }
    }, [location, navigate]);

    return null;
  };

  return (
    <BrowserRouter>
      <ScrollToSection />
      <Navbar isLoggedIn={isLoggedIn} Logout={Logout} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={isLoggedIn ? <Main /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!isLoggedIn ? <LoginPage /> : <Navigate to="/home" />}
        />
        <Route
          path="/verify/:personalToken"
          element={!isLoggedIn ? <VeificationPage /> : <Navigate to="/home" />}
        />
        <Route
          path="/signup"
          element={!isLoggedIn ? <SignupPage /> : <Navigate to="/home" />}
        />
        <Route
          path="/chat"
          element={isLoggedIn ? <ChatInterface /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              <ProfilePage fulluser={fulluser as FullUserDetails} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/forgot-password"
          element={!isLoggedIn ? <ForgotPassword /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
