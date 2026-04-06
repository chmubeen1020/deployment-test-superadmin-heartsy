import { images } from "../../assets";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function SuperAdminVerficationCode() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const email = localStorage.getItem("super-admin-email");

  // 🔐 Redirect if no email
  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, []);

  // Handle OTP input
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // 🔥 Verify OTP
  const handleVerify = async () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      toast.error("Please enter complete OTP");
      return;
    }

    try {
      setIsLoading(true);
      toast.loading("Verifying...", { id: "verify-otp" });

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/heartsy/api/v1/super-admin-auth/verify-otp`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            otp: Number(otpValue),
          }),
        }
      );

      const data = await res.json();
      const url = data.data;
const token = url.split("token=")[1];

      if (!res.ok) {
        throw new Error(
          data.message || data.errors?.[0] || "Invalid OTP"
        );
      }

      toast.success("OTP Verified!", { id: "verify-otp" });
      localStorage.setItem("superAdminResetToken", token);
      // ✅ Redirect
      navigate("/set-password");
    } catch (err) {
      toast.error(err.message || "Verification failed", {
        id: "verify-otp",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 🔁 Resend OTP
  const handleResend = async () => {
    try {
      toast.loading("Resending OTP...", { id: "resend-otp" });

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/heartsy/api/v1/super-admin-auth/resend-otp`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || data.errors?.[0] || "Failed to resend OTP"
        );
      }

      toast.success("OTP sent again!", { id: "resend-otp" });
    } catch (err) {
      toast.error(err.message || "Error resending OTP", {
        id: "resend-otp",
      });
    }
  };

  return (
    <div className="min-h-screen relative bg-primary overflow-hidden flex flex-col justify-center">
      <img
        src="/form-bg-image.png"
        alt="Flower"
        className="absolute left-48 h-[80vh] w-4/5 opacity-40 scale-[1.2] z-0"
      />

      {/* LEFT */}
      <div className="absolute inset-0 text-white">
        <div className="relative z-10 h-full flex flex-col justify-between pl-32 py-24 max-w-2xl">
          <img src={images.AuthLogo} alt="logo" className="w-24" />
        </div>
      </div>

      {/* CARD */}
      <div className="bg-white w-full max-w-sm py-4 rounded-xl flex flex-col items-center mx-auto relative z-20">
        <div className="w-full px-6 py-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Verification
          </h1>

          <p className="text-gray-600 mt-4">
            Enter Verification Code
          </p>

          {/* OTP Inputs */}
          <div className="flex justify-center gap-3 mt-6">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) =>
                  handleChange(e.target.value, i)
                }
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="w-10 h-10 text-center text-lg rounded-lg border border-primary/40 focus:border-primary outline-none"
              />
            ))}
          </div>

          {/* Resend */}
          <p className="text-sm text-gray-500 mt-4">
            Didn’t receive a code?
            <span
              onClick={handleResend}
              className="ml-1 text-primary font-medium cursor-pointer"
            >
              Resend
            </span>
          </p>

          {/* Button */}
          <button
            onClick={handleVerify}
            disabled={isLoading}
            className="mt-6 px-6 bg-primary text-white py-3 rounded-lg font-medium hover:bg-primaryDark transition disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}