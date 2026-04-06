import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom"; // Added useLocation

const CreateAssessment = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current URL path

  // Check if "edit" is present in the URL
  const isEditMode = location.pathname.includes("edit");
  const actionText = isEditMode ? "Edit" : "Create";

  return (
    <div className=" mx-auto p-4">
      {/* Top Navigation */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-700 cursor-pointer hover:text-slate-900 transition-colors mb-6"
      >
        <ArrowLeft size={20} />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Page Title - Dynamic Text */}
      <div className="mb-2">
        <h1 className="text-xl 2xl:text-2xl font-semibold text-[#0f172a] mb-1">
          {actionText} Assessment
        </h1>
        <p className="text-slate-500 text-sm 2xl:text-base">
          {isEditMode ? "Modify" : "Enter"} Assessment Details
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 ">
        <form className="space-y-4">
          {/* Assessment Name */}
          <div className="space-y-3">
            <label className="block text-base font-medium text-slate-700">
              Assessment Name
            </label>
            <input
              type="text"
              placeholder="e.g. Leadership, Team Building, Wellness, etc"
              className="w-full bg-[#f1f4f9bb] border-none rounded-xl py-2 px-5 text-slate-600 placeholder:text-slate-400 outline-none transition-all"
            />
          </div>

          {/* Duration */}
          <div className="space-y-3">
            <label className="block text-base font-medium text-slate-700">
              Assessment Duration (e.g. 15-20 minutes)
            </label>
            <input
              type="text"
              placeholder="Enter estimated duration"
              className="w-full bg-[#f1f4f9bb] border-none rounded-xl py-2 px-5 text-slate-600 placeholder:text-slate-400 outline-none transition-all"
            />
          </div>

          {/* Action Button - Dynamic Label */}
          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={() => navigate('/super-admin/assessments/create/add-category')}
              className="bg-primary/90 hover:bg-primary text-white px-10 py-2 rounded-xl font-medium transition-colors"
            >
              {isEditMode ? "Save Changes" : "Next step"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAssessment;