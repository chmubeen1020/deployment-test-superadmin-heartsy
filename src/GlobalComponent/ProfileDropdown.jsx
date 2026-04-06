import { useEffect, useRef } from "react";
import { LogOut, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { images } from "../assets";

const ProfileDropdown = ({ open, onClose , type }) => {
  const navigate = useNavigate();
  const ref = useRef(null);

 const Contact = () => {
  navigate("/" + type + "/contact");
}
  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="absolute right-0 top-12 w-48 bg-white rounded-2xl shadow-xl border border-gray-200 p-2 z-50"
    >
      {/* User info */}
      <div className="flex items-center gap-3">
        <img
          src={images.Userpic} // replace later
          alt="User"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="text-sm font-semibold">Jhon Doe</p>
          <p className="text-sm text-primary">{type}</p>
        </div>
      </div>
       {type === "Dept Head" && <div className="w-full flex justify-center mt-2">
       <button className="border w-full px-2 py-2 rounded-lg text-sm"> Switch To Employee</button>
      </div>}
      {/* Divider */}
      <div className="my-4 h-px bg-gray-200" />

      {/* Contact */}
      <button className="w-full flex items-center gap-3 text-gray-800 py-2 px-2 hover:bg-gray-50 rounded-lg" onClick={Contact}>
        <MessageCircle size={20} />
        <span className="text-sm">Contact</span>
      </button>

      {/* Sign out */}
      <button className="w-full flex items-center gap-3 text-red-500 py-2 px-2 hover:bg-red-50 rounded-lg mt-1">
        <LogOut size={20} />
        <span className="text-sm">Sign Out</span>
      </button>
    </div>
  );
};

export default ProfileDropdown;
