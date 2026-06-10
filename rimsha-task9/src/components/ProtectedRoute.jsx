// useApp — custom context hook to access global app state.
// We use it here specifically to read the current logged-in user object.
// If user is null it means no one is logged in.
import { useApp } from "../context/AppContext";

// Navigate — a special React Router component that immediately redirects
// the user to a different route when it is rendered.
// We use it to send unauthenticated users to the login page.
import { Navigate } from "react-router-dom";

// ProtectedRoute Component
// This is a route guard wrapper. Any page wrapped inside this component
// will only be accessible if the user is logged in.
// If the user is not logged in, they get redirected to /login automatically.
// If they are logged in, the actual page (children) is rendered normally.
//
// Usage in router:
//   <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
//
// Props:
//   children — the page component that should be protected (e.g. <Favorites />)
const ProtectedRoute = ({ children }) => {
  // Pull the current user object from global context.
  // user is set when someone logs in and reset to null when they log out.
  const { user } = useApp();

  // If user is null — no one is logged in.
  // Rendering <Navigate to="/login" /> immediately redirects the browser
  // to the /login route without showing any protected content at all.
  // The return statement stops the rest of the component from executing.
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If we reach this line, user is not null — someone is logged in.
  // Render children as-is, giving the user full access to the protected page.
  // children here is whatever component was wrapped inside <ProtectedRoute>,
  // in this project that is <Favorites />.
  return children;
};

export default ProtectedRoute;
// Exporting so this component can be used in the router configuration
// to wrap any route that requires authentication before access.
