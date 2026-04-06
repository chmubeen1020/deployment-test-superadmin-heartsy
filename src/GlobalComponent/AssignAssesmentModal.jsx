import { useEffect, useRef, useState } from "react";
import { X, ChevronDown, Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ASSESSMENTS = [
  "Frontend Fundamentals",
  "Backend APIs",
  "System Design",
  "React Advanced",
];

const AssignAssessmentModal = ({ open, onClose }) => {
  const [selectedAssessment, setSelectedAssessment] = useState("");
  const [date, setDate] = useState(null);
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
            Assign Assessment
          </h2>
          <button onClick={onClose}>
            <X size={18} className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* Assessment Dropdown */}
        <div className="mb-6">
          <label className="text-sm text-gray-700">
            Select Assessment<span className="text-red-500">*</span>
          </label>

          <div ref={dropdownRef} className="relative mt-2">
            <button
              onClick={() => setOpenDropdown((p) => !p)}
              className="w-full flex items-center justify-between border-b border-gray-300 py-2 text-sm focus:border-primary outline-none"
            >
              <span
                className={
                  selectedAssessment ? "text-gray-900" : "text-gray-400"
                }
              >
                {selectedAssessment || "Choose assessment"}
              </span>
              <ChevronDown
                size={18}
                className={`transition ${openDropdown ? "rotate-180" : ""}`}
              />
            </button>

            {openDropdown && (
              <div className="absolute z-20 mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
                {ASSESSMENTS.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setSelectedAssessment(item);
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

        {/* Pretty Date Picker */}
        <div className="mb-8">
          <label className="text-sm text-gray-700">Last Date</label>

          <div className="relative mt-2 datepicker-container">
    <Calendar
      size={18}
      className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10"
    />

    <DatePicker
      selected={date}
      onChange={(d) => setDate(d)}
      minDate={new Date()}
      placeholderText="Select date"
      dateFormat="dd MMM yyyy"
      // wrapperClassName is crucial for full-width input
      wrapperClassName="w-full"
      className="w-full pl-7 border-b border-gray-300 py-2 text-sm outline-none focus:border-primary transition-colors bg-transparent"
      calendarClassName="modern-calendar" // We'll style this below
      popperPlacement="bottom-start"
      showPopperArrow={false} // Cleaner look without the little arrow
    />
  </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end">
          <button
            disabled={!selectedAssessment || !date}
            className={`px-5 py-2 rounded-lg text-sm text-white transition
              ${
                selectedAssessment && date
                  ? "bg-primary hover:opacity-95"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignAssessmentModal;
