
import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PasswordStrength from "../components/PasswordStrength";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
     if(password.length ==0){
      alert("Please enter a password");
      return;
     }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    alert("Password Reset Successfully");

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            Reset Password
          </h1>

          <p className="text-slate-500 mt-2">
            Create your new password
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-4 text-slate-400"
            />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="New Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full pl-10 pr-10 py-3 border rounded-xl"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-3 top-4"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          <PasswordStrength
            password={password}
          />

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-4 text-slate-400"
            />

            <input
              type={
                showConfirm
                  ? "text"
                  : "password"
              }
              placeholder="Confirm Password"
              value={
                confirmPassword
              }
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              className="w-full pl-10 pr-10 py-3 border rounded-xl"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirm(
                  !showConfirm
                )
              }
              className="absolute right-3 top-4"
            >
              {showConfirm ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

