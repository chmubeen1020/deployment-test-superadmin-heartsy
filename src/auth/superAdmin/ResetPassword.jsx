import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function SuperAdminResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    // ✅ Validation
    if (!password) {
      toast.error("Please enter password");
      return;
    }

    if (!confirmPassword) {
      toast.error("Please confirm password");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const token = localStorage.getItem("superAdminResetToken");

    if (!token) {
      toast.error("Token missing. Please restart process.");
      return;
    }

    try {
      setIsLoading(true);

      toast.loading("Resetting password...", {
        id: "reset-password",
      });

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/heartsy/api/v1/super-admin-auth/reset-password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ TOKEN IN HEADER
          },
          body: JSON.stringify({
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data.message || data.errors?.[0] || "Reset failed";
        throw new Error(errorMessage);
      }

      // ✅ SUCCESS
      toast.success("Password reset successful!", {
        id: "reset-password",
      });

      // Clean up
      localStorage.removeItem("superAdminResetToken");
      localStorage.removeItem("super-admin-email");

      // Redirect to login
      navigate("/");

    } catch (error) {
      console.error("Reset password error:", error);

      toast.error(error.message || "Something went wrong", {
        id: "reset-password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-primary overflow-hidden flex flex-col justify-center">
      <img
        src="/form-bg-image.png"
        alt="Flower"
        className="absolute left-48 h-[80vh] w-4/5 opacity-40 scale-[1.2] z-0"
      />

      <div className="absolute inset-0 text-white">
        <div className="relative z-10 h-full flex flex-col justify-between pl-32 py-24 max-w-2xl">
          <img src="/heartsy-logo.svg" alt="logo" className="w-24" />
        </div>
      </div>

      <div className="bg-white w-full max-w-sm py-4 rounded-xl flex flex-col justify-start items-center mx-auto relative z-20">
        <div className="w-full px-6 py-4 flex flex-col justify-between">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Set New Password
          </h1>

          <div className="space-y-5 mt-6 text-center">
            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-gray-300 p-2 outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-2 text-gray-500"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border-b border-gray-300 p-2 outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-0 top-2 text-gray-500"
              >
                {showConfirmPassword ? (
                  <Eye size={18} />
                ) : (
                  <EyeOff size={18} />
                )}
              </button>
            </div>

            {/* Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-fit px-4 bg-primary hover:bg-primaryDark text-white py-3 rounded-lg font-medium transition disabled:opacity-50"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}