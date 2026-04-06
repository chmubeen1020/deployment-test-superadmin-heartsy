import { useState } from "react";
import toast from "react-hot-toast";
import { images } from "../../assets";
import { useNavigate } from "react-router-dom";

export default function SuperAdminForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email.trim()) {
    toast.error("Please enter your email");
    return;
  }

  try {
    setIsLoading(true);

    toast.loading("Sending reset link...", {
      id: "forgot-password",
    });

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/heartsy/api/v1/super-admin-auth/forgot-password`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const errorMessage =
        data.message || data.errors?.[0] || "Something went wrong";
      throw new Error(errorMessage);
    }

    // ✅ SUCCESS FLOW
    toast.success("Password reset link sent to your email", {
      id: "forgot-password",
    });

    localStorage.setItem("super-admin-email", email.trim());

    navigate("/verification");

    setEmail("");
  } catch (error) {
    console.error("Forgot password error:", error);

    toast.error(error.message || "Failed to send reset link", {
      id: "forgot-password",
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

      {/* LEFT BACKGROUND */}
      <div className="absolute inset-0 text-white">
        <div className="relative z-10 h-full flex flex-col justify-between pl-32 py-24 max-w-2xl">
          <img src={images.AuthLogo} alt="logo" className="w-24" />
        </div>
      </div>

      {/* CARD */}
      <div className="bg-white w-full max-w-sm py-4 rounded-xl flex flex-col justify-start items-center mx-auto relative z-20">
        <div className="w-full px-6 py-4 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Forgot Password
            </h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 mt-6 flex flex-col items-end"
          >
            {/* Email */}
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter Email Address"
              className="w-full border-b border-gray-300 p-2 outline-none focus:border-primary"
              required
              disabled={isLoading}
            />

            {/* Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-fit px-4 bg-primary hover:bg-primaryDark text-white py-3 rounded-lg font-medium transition disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}