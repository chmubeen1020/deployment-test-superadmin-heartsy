import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { images } from "../../assets";

export default function SuperAdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (!formData.password) {
      toast.error("Please enter your password");
      return;
    }

    setIsLoading(true);

    try {
      toast.loading("Logging in...", { id: "super-admin-login" });

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/heartsy/api/v1/super-admin-auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email.trim(),
            password: formData.password,
            rememberMe: rememberMe,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.message || data.errors?.[0] || "Login failed";
        throw new Error(errorMessage);
      }

      const token = data?.data?.token;
      const userData = data?.data?.superAdmin;

      if (!token) {
        throw new Error("Token not found in response");
      }

      const storage = rememberMe ? localStorage : sessionStorage;

      storage.setItem("superAdminAccessToken", token);

      if (rememberMe) {
        localStorage.setItem("superAdminRememberMe", "true");
      } else {
        localStorage.removeItem("superAdminRememberMe");
      }

      if (userData) {
        storage.setItem("superAdminUser", JSON.stringify(userData));
      }

      toast.success("Login successful!", { id: "super-admin-login" });

      navigate("/super-admin");
    } catch (error) {
      console.error("Super admin login error:", error);
      toast.error(error.message || "Invalid email or password", {
        id: "super-admin-login",
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

      {/* LOGIN CARD */}
      <div className="bg-white w-full max-w-sm py-4 h-96 rounded-xl flex flex-col justify-center items-center mx-auto relative z-20">
        <div className="w-full px-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Hi, Welcome! 👋
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5 mt-6">
            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border-b border-gray-300 p-2 outline-none focus:border-primary"
              disabled={isLoading}
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full border-b bg-transparent border-gray-300 p-2 outline-none focus:border-primary"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-2 text-gray-500"
                disabled={isLoading}
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-primary"
                  disabled={isLoading}
                />
                Remember me
              </label>
              <a
                href="/forgot-password"
                className="text-primary hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primaryDark text-white py-3 cursor-pointer rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}