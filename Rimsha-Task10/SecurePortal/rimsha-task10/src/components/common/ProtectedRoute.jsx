// Navigate — programmatically kisi route pe bhejna
// Outlet — protected route ke andar jo bhi page hoga wo yahan render hoga
import { Navigate, Outlet } from "react-router-dom";

// useAuth — AuthContext sy user aur loading lene ka hook
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = () => {
  // AuthContext sy user aur loading le rahy hain
  // user — kaun logged in hai (null agar koi nahi)
  // loading — Supabase sy jawab aa raha hai ya nahi
  const { user, loading } = useAuth();

  // Supabase sy jawab aa raha hai
  // Abhi kuch mat dikhaao — pehle check hone do
  // Warna ek second ke liye login page flash karega
  if (loading) {
    return null;
  }

  // Agar user logged in hai — andar jaane do
  // Outlet matlab — jo bhi protected page hoga wo render hoga
  // Jaise Dashboard, Settings, Search etc
  if (user) {
    return <Outlet />;
  }

  // User logged in nahi hai
  // Login page pe bhejo
  // replace — browser history mein /dashboard save nahi hoga
  // Matlab back button dabane pe /dashboard nahi aayega
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
