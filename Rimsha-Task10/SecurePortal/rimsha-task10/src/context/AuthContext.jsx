// React sy zarori cheezein import kar rahy hain
import { createContext, useContext, useEffect, useState } from "react";

// Supabase client import kar rahy hain
// Ye wahi connection hai jo humny lib/supabase.js mein banaya tha
import { supabase } from "../lib/supabase";

// Context bana rahy hain
// Ye ek dabba hai jisme user ki info rahegi
// Poori app is dabby sy data le sakti hai
const AuthContext = createContext(null);

// AuthProvider component
// Ye poori app ko wrap karega
// Jaise BrowserRouter ne wrap kiya tha
export const AuthProvider = ({ children }) => {
  // User ka data yahan store hoga
  // Shuruaat mein null hai — koi logged in nahi
  const [user, setUser] = useState(null);

  // Loading state — Supabase sy jawab aany tak
  // Takey app pehle check kary phir page dikhaay
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Supabase sy pooch rahy hain —
    // "koi pehle sy logged in hai?"
    // Jab app pehli baar khulti hai tab ye chalta hai
    supabase.auth.getSession().then(({ data: { session } }) => {
      // Agar session mila toh user set karo
      // Nahi mila toh null rahega
      setUser(session?.user ?? null);

      // ==========================================
      // SESSION ACTIVE HAI — SESSIONSTORAGE MEIN SAVE KARO
      // ==========================================
      // User logged in hai — session info store karo
      // sessionStorage tab tak rahta hai jab tak browser tab khuli ho
      if (session?.user) {
        sessionStorage.setItem("secureportal_session_active", "true");
        sessionStorage.setItem("secureportal_user_email", session.user.email);
      }

      // Loading khatam — ab page dikha saktay hain
      setLoading(false);
    });

    // Ye listener har baar chalta hai jab bhi
    // user login ya logout karta hai
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // Login kiya — user set ho gaya
      // Logout kiya — user null ho gaya
      setUser(session?.user ?? null);

      if (session?.user) {
        // ==========================================
        // LOGIN — SESSIONSTORAGE SET KARO
        // ==========================================
        // User ne login kiya — session info save karo
        sessionStorage.setItem("secureportal_session_active", "true");
        sessionStorage.setItem("secureportal_user_email", session.user.email);
      } else {
        // ==========================================
        // LOGOUT — SESSIONSTORAGE CLEAR KARO
        // ==========================================
        // User ne logout kiya — saari session info hata do
        sessionStorage.removeItem("secureportal_session_active");
        sessionStorage.removeItem("secureportal_user_email");
        sessionStorage.removeItem("secureportal_login_time");
      }

      setLoading(false);
    });

    // Cleanup — jab component band ho
    // toh listener bhi band ho jaye
    return () => subscription.unsubscribe();
  }, []);

  // Ye values poori app ko mileingi
  const value = {
    user, // user ka data
    loading, // loading state
  };

  return (
    // AuthContext.Provider poori app ko wrap karega
    // Value mein jo bhi diya — wo sab ko milega
    <AuthContext.Provider value={value}>
      {/* 
        Loading true hai toh kuch mat dikhaao
        Supabase sy jawab aany do pehlay
        Warna protected routes galat kaam karein gay
      */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook — har jagah AuthContext use karna easy ho jaye
// Component mein sirf useAuth() likhna hoga
export const useAuth = () => {
  return useContext(AuthContext);
};
