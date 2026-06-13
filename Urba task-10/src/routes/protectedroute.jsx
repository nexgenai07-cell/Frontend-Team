import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";
function ProtectedRoute({ children }) {
    const { currentUser } = useAuth();
    if (!currentUser) return <Navigate to="/login" />;
      return children;
}

export default ProtectedRoute;