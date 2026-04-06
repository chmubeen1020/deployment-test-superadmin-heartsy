import React, { useState } from "react";
import { Bell, Menu, Search } from "lucide-react";
import ProfileDropdown from "../../../GlobalComponent/ProfileDropdown";

const SuperAdminNavbar = ({ toggleSidebar }) => {
  const [open, setOpen] = useState(false);

  // ✅ Get user from sessionStorage
  const storedUser = sessionStorage.getItem("superAdminUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const name = user?.name || "User";

  // ✅ Role mapping (BEST PRACTICE)
  const roleMap = {
    superadmin: "Super Admin",
    admin: "Admin",
    user: "User",
  };

  const formattedRole = roleMap[user?.role] || "User";

  // Optional: pass role as type
  const type = formattedRole;

  // ✅ Generate initials
  const getInitials = (name) => {
    if (!name) return "";
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const initials = getInitials(name);

  return (
    <div className="flex justify-between items-center p-3 md:p-4 bg-sidebar">
      {/* Mobile Menu */}
      <div className="lg:hidden">
        <Menu onClick={toggleSidebar} size={20} />
      </div>

      {/* Search */}
      <div className="hidden lg:flex items-center space-x-4 w-full max-w-sm">
        <div className="relative w-full">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 outline-none"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2">
        {/* Notification */}
        <button className="relative bg-[#F1E9FC] p-2 rounded-full border border-gray-200">
          <Bell className="w-6 h-6 text-gray-700" />
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center space-x-2"
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
              {initials}
            </div>

            {/* Name + Role */}
            <div className="hidden lg:flex flex-col items-start pl-2">
              <p className="text-sm font-medium text-gray-700">
                {name}
              </p>
              <p className="text-sm font-medium text-primary">
                {formattedRole}
              </p>
            </div>
          </button>

          {/* Dropdown */}
          <ProfileDropdown
            open={open}
            onClose={() => setOpen(false)}
            type={type}
          />
        </div>
      </div>
    </div>
  );
};

export default SuperAdminNavbar;