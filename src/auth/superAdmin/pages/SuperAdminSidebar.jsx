import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation to get the current URL
import { Home, BarChart, FileText, Users, Book, ClipboardCheckIcon, ScreenShare, CreditCard } from "lucide-react"; // Import icons from lucide-react
import { images } from "../../../assets";


const sidebarLinks = [
  { name: "Dashboard", icon: <Home className="w-5 h-5 mr-3" />, path: "/super-admin" },
  { name: "Data Analytics", icon: <BarChart className="w-5 h-5 mr-3" />, path: "/super-admin/data-analytics" },
  { name: "Assessments", icon: <FileText className="w-5 h-5 mr-3" />, path: "/super-admin/assessments" },
  { name: "Courses", icon: <Book className="w-5 h-5 mr-3" />, path: "/super-admin/courses" },
  { name: "Reports", icon: <ClipboardCheckIcon className="w-5 h-5 mr-3" />, path: "/super-admin/reports" },
  { name: "User Management", icon: <Users className="w-5 h-5 mr-3" />, path: "/super-admin/user-management" },
  { name: "Virtual Course", icon: <ScreenShare className="w-5 h-5 mr-3" />, path: "/super-admin/virtual-course" },
  { name: "Subscrption & Biling", icon: <CreditCard className="w-5 h-5 mr-3" />, path: "/super-admin/subscription-biling" },
  { name: "All Blogs", icon: <FileText className="w-5 h-5 mr-3" />, path: "/super-admin/all-blogs" },
];

const SuperAdminSidebar = () => {
  const location = useLocation(); // Get the current URL

  return (
    <div className="w-full h-screen bg-sidebar shadow-md flex flex-col items-center">
      <div className="p-5 flex items-center space-x-2">
              <img src={images.BlackHeartsyLogo} alt="Heartsy" className="w-28 " />
            </div>
      <nav className="mt-4">
        <ul>
         {sidebarLinks.map((link) => {
  const isDashboard = link.path === "/super-admin";

  const isActive = isDashboard
    ? location.pathname === "/super-admin"
    : location.pathname.startsWith(link.path);

  return (
    <li key={link.name}>
      <Link
        to={link.path}
        className={`flex items-center p-2 rounded-xl mt-3 hover:bg-gray-100 ${
          isActive
            ? "text-[#945EEB]"
            : "text-gray-700"
        }`}
      >
        {link.icon}
        {link.name}
        <span className={`ml-4 w-2 h-2 rounded-full ${isActive ? 'bg-[#945EEB]' : 'bg-transparent'}`}/>
      </Link>
    </li>
  );
})}

        </ul>
      </nav>
    </div>
  );
};

export default SuperAdminSidebar;
