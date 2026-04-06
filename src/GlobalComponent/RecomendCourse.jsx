import { useEffect, useRef, useState } from "react";
import { X, ChevronDown } from "lucide-react";

const Courses = [
  "Frontend Fundamentals",
  "Backend APIs",
  "System Design",
  "React Advanced",
];

const RecomendCourseModal = ({ open, onClose }) => {
  const [selectedCourses, setSelectedCourses] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);

  const dropdownRef = useRef(null);

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4  bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Recomend Course
          </h2>
          <button onClick={onClose}>
            <X size={18} className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* Assessment Dropdown */}
        <div className="mb-6">
          <label className="text-sm text-gray-700">
            Select Course<span className="text-red-500">*</span>
          </label>

          <div ref={dropdownRef} className="relative mt-2">
            <button
              onClick={() => setOpenDropdown((p) => !p)}
              className="w-full flex items-center justify-between border-b border-gray-200 py-2 text-sm focus:border-primary outline-none"
            >
              <span className={selectedCourses ? "text-gray-900" : "text-gray-400"}>
                {selectedCourses || "Choose course"}
              </span>
              <ChevronDown
                size={18}
                className={`transition ${openDropdown ? "rotate-180" : ""}`}
              />
            </button>

            {openDropdown && (
              <div className="absolute z-20 mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
                {Courses.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setSelectedCourses(item);
                      setOpenDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>


        {/* Actions */}
        <div className="flex justify-end">
          <button
            disabled={!selectedCourses}
            className={`px-5 py-2 rounded-lg text-sm text-white transition
              ${
                selectedCourses 
                  ? "bg-primary hover:opacity-95"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            Recomend
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecomendCourseModal;
