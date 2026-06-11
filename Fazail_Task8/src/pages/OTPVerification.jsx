import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OTPVerification() {
  // Dummy OTP for testing purposes
  const DUMMY_OTP = "123456";

  // Stores the OTP entered by the user
  const [otp, setOtp] = useState("");

  // Countdown timer for OTP resend
  const [timer, setTimer] = useState(30);

  // Hook for page navigation
  const navigate = useNavigate();

  // State for displaying error messages
  const [error, setError] = useState("");

  // State for displaying success messages
  const [success, setSuccess] = useState("");

  // Countdown timer effect
  useEffect(() => {
    // Stop countdown when timer reaches 0
    if (timer === 0) return;

    // Decrease timer every second
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    // Cleanup interval when component unmounts
    // or before effect runs again
    return () => clearInterval(interval);
  }, [timer]);

  // Handles OTP verification
  const verifyOTP = () => {
    // Clear previous messages
    setError("");
    setSuccess("");

    // Check if entered OTP matches dummy OTP
    if (otp === DUMMY_OTP) {
      setSuccess("OTP Verified Successfully!");

      // Redirect user to dashboard after successful verification
      alert("OTP Verified! Account created Successfully...");
      navigate("/dashboard");
    } else {
      // Show error if OTP is incorrect
      setError("Invalid OTP");
    }
  };

  // Handles OTP resend functionality
  const resendOTP = () => {
    // Simulate sending a new OTP
    alert(`New OTP Sent: ${DUMMY_OTP}`);

    // Restart countdown timer
    setTimer(30);
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-96">
        <h2 className="text-2xl font-bold text-center mb-2">
          OTP Verification
        </h2>

        <p className="text-gray-500 text-center mb-5">
          Demo OTP: <span className="font-semibold">123456</span>
        </p>

        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="border p-3 w-full rounded-lg"
        />

        {error && (
          <p className="text-red-500 text-sm mt-2">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-500 text-sm mt-2">
            {success}
          </p>
        )}

        <button
          onClick={verifyOTP}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 w-full mt-4 rounded-lg"
        >
          Verify OTP
        </button>

        {timer > 0 ? (
          <p className="mt-4 text-center text-gray-500">
            Resend OTP in {timer}s
          </p>
        ) : (
          <button
            onClick={resendOTP}
            className="text-blue-600 font-medium mt-4 w-full"
          >
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
}

export default OTPVerification;