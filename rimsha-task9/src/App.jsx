import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";
import PlaceDetails from "./pages/PlaceDetails";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";

// We need useLocation to detect which page we are on.
// useLocation only works INSIDE BrowserRouter, so we made a separate component for it.
const AnimatedRoutes = () => {
  const location = useLocation();
  // location.pathname = current URL like "/", "/login", "/favorites"

  return (
    // AnimatePresence watches when a component is removed from the screen.
    // Without it, exit animations won't work at all.
    // mode="wait" means: finish the exit animation first, then start the enter animation.
    <AnimatePresence mode="wait">
      {/* We pass location and key to Routes so React knows the page changed.
          When key changes, React destroys the old page and creates the new one.
          This triggers the exit + enter animations properly. */}
      <Routes location={location} key={location.pathname}>
        {/* Home page — shows at the root URL */}
        <Route path="/" element={<Home />} />

        {/* Login page — user signs in here */}
        <Route path="/login" element={<Login />} />

        {/* Place Details page — :id is dynamic, like /place/1 or /place/42 */}
        <Route path="/place/:id" element={<PlaceDetails />} />

        {/* Favorites page — wrapped in ProtectedRoute.
            If the user is not logged in, ProtectedRoute redirects them to /login.
            If logged in, it shows the Favorites page normally. */}
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />

        {/* Catch-all route — if no other route matches, show the 404 page.
            Example: user visits /random-gibberish → NotFound renders */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    // BrowserRouter gives the whole app access to routing.
    // Everything that needs routing must be inside it.
    <BrowserRouter>
      {/* ScrollToTop is a floating button visible across all pages.
          It sits outside AnimatedRoutes so it never disappears during page transitions. */}
      <ScrollToTop />

      {/* AnimatedRoutes handles all page rendering + animations */}
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
