import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import { useAuthStore } from "./store/auth";



function App() {
  const isAuth = useAuthStore(state => state.isAuth);

  return (
    <div>
      <BrowserRouter>

            <Navigation />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/landing" element={<LandingPage />} />
              
              <Route element={<ProtectedRoute isAllowed={isAuth}/>}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
