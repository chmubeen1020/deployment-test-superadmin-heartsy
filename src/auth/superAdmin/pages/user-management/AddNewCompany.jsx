import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Eye, EyeOff, ChevronDown, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddNewCompany = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const navigate = useNavigate(); // 2. Initialize the navigate function

  // Function to go back to the previous URL
  const handleBack = () => {
    navigate(-1); 
  };

  // Custom Dropdown States
  const [companyType, setCompanyType] = useState("");
  const [source, setSource] = useState("");

  const companyOptions = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Manufacturing",
  ];
  const sourceOptions = [
    "Social Media",
    "Referral",
    "Search Engine",
    "Advertisement",
  ];

  return (
    <div className="xl:p-4">
      <div className=" bg-sidebar rounded-2xl shadow-sm border border-gray-100 p-6 ">
        {/* Header with Back Button */}
        <div
          className="flex items-center gap-4 mb-10 cursor-pointer"
          onClick={handleBack}
        >
          <ArrowLeft
            size={20}
            className="text-gray-600 group-hover:text-primary"
          />
          <h2 className="text-xl font-medium text-gray-800">Add New Company</h2>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Row 1: Email & Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="relative border-b border-gray-200 focus-within:border-gray-400 transition-colors">
              <label className="block text-sm md:text-base text-gray-500 ">
                Email
              </label>
              <input
                type="email"
                className="w-full bg-transparent outline-none  text-gray-700 placeholder:text-gray-300"
              />
            </div>
            <div className="relative border-b border-gray-200 focus-within:border-gray-400 transition-colors">
              <label className="block text-sm md:text-base text-gray-500 ">
                Company Name
              </label>
              <input
                type="text"
                className="w-full bg-transparent outline-none  text-gray-700 placeholder:text-gray-300"
              />
            </div>
          </div>

          {/* Row 2: Passwords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="relative border-b border-gray-200 focus-within:border-gray-400 transition-colors">
              <label className="block text-sm md:text-base text-gray-500 ">
                Password
              </label>
              <div className="flex items-center">
                <input
                  type={showPass ? "text" : "password"}
                  className="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="text-gray-400 hover:text-primary"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="relative border-b border-gray-200 focus-within:border-gray-400 transition-colors">
              <label className="block text-sm md:text-base text-gray-500 ">
                Confirm Password
              </label>
              <div className="flex items-center">
                <input
                  type={showConfirmPass ? "text" : "password"}
                  className="w-full bg-transparent outline-none  text-gray-700 placeholder:text-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="text-gray-400 hover:text-primary"
                >
                  {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* Row 3: Employees (Full Width) */}
          <div className="relative border-b border-gray-200 focus-within:border-gray-400 transition-colors">
            <label className="block text-sm md:text-base text-gray-500 ">
              Number of Users/Employees
            </label>
            <input
              type="number"
              className="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-300"
            />
          </div>

          {/* Row 4: Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <CustomDropdown
              label="Company Type"
              options={companyOptions}
              value={companyType}
              onChange={setCompanyType}
              placeholder="Select Company Type"
            />
            <CustomDropdown
              label="What brought you Here"
              options={sourceOptions}
              value={source}
              onChange={setSource}
              placeholder="Select Source"
            />
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-6">
            <button className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2 bg-primary/90 text-white rounded-xl hover:bg-primary">
              <Plus size={18} strokeWidth={3} />
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CustomDropdown = ({ label, options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>

      {/* Trigger Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between border-b py-2 cursor-pointer transition-colors border-gray-200`}
      >
        <span
          className={`text-sm md:text-base ${
            value ? "text-gray-700" : "text-gray-500"
          }`}
        >
          {value || placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-primary" : ""
          }`}
        />
      </div>

      {/* Custom Menu */}
      {isOpen && (
        <ul className="absolute z-50 w-full mt-2 bg-sidebar border border-gray-300 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className="px-4 py-3 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-600 cursor-pointer transition-colors  border-b border-gray-50 last:border-none"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddNewCompany;
