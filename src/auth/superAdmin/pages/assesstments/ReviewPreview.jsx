import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Check } from 'lucide-react';

const ReviewPreview = () => {
    const [publishIsOpen, setPublishIsOpen] = useState(false);
  // Dummy Data
  const validationChecklist = [
    "All domains have been populated",
    "Sub-categories have been created",
    "All statements have polarity & attributes assigned",
    "Likert scale is consistent across all questions",
  ];

  const assessmentSummary = {
    name: "Heart Work Profile® Leader Assessment",
    type: "Self-Report",
    domains: "4 (Mind, Wellness, Heart, Leadership)",
    totalQuestions: "16 questions",
    duration: "15-20 minutes",
    likertScale: [
      "1 - Strongly Disagree",
      "2 - Disagree",
      "3 - Neutral",
      "4 - Agree",
      "5 - Strongly Agree"
    ]
  };

  const handleBack = () => {
    // Navigate logic (e.g., useNavigate from react-router-dom)
    console.log("Navigating back...");
    window.history.back();
  };

  return (
    <div className="p-4  text-slate-800">
      <div className="mx-auto space-y-6">
        
        {/* Header Section */}
        <header className="space-y-2">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-sm cursor-pointer font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <h1 className="text-xl 2xl:text-2xl font-semibold text-[#0f172a] mb-1">Review & Preview</h1>
          <p className="text-slate-500 text-sm 2xl:text-base mb-8">Validate structure and preview user experience</p>
        </header>

        {/* Success Alert Banner */}
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-center gap-3">
          <div className="bg-white rounded-full p-0.5 shadow-sm">
             <CheckCircle2 className="text-green-500" size={20} />
          </div>
          <p className="text-green-700 text-sm font-medium">
            Assessment is ready to publish. All validation checks passed.
          </p>
        </div>

        {/* Validation Checklist Card */}
        <section className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-medium mb-4 ">Validation Checklist</h2>
          <div className="grid gap-4">
            {validationChecklist.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500 shrink-0" size={16} />
                <span className="text-slate-600 font-medium text-sm">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Assessment Summary Card */}
        <section className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-medium mb-4 ">Assessment Summary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-12">
            
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-600">Assessment Name</p>
              <p className="text-sm font-medium text-slate-700">{assessmentSummary.name}</p>
            </div>

            <div className="space-y-2">
               <p className="text-xs font-bold text-slate-600">Type</p>
              <div>
                <span className="bg-purple-100 text-purple-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tight">
                  {assessmentSummary.type}
                </span>
              </div>
            </div>

            <div className="space-y-1 md:col-start-1">
               <p className="text-xs font-bold text-slate-600">Total Domains</p>
              <p className="text-sm font-medium text-slate-700">{assessmentSummary.domains}</p>
            </div>

            <div className="space-y-1">
               <p className="text-xs font-bold text-slate-600">Total Questions</p>
              <p className="text-sm font-medium text-slate-700">{assessmentSummary.totalQuestions}</p>
            </div>

            <div className="space-y-1 md:col-start-1">
               <p className="text-xs font-bold text-slate-600">Estimated Duration</p>
              <p className="text-sm font-medium text-slate-700">{assessmentSummary.duration}</p>
            </div>

            <div className="md:col-span-3 pt-4 space-y-2">
                <p className="text-sm font-semibold text-slate-600">Likert Scale</p>
               <div className="flex flex-wrap gap-2">
                 {assessmentSummary.likertScale.map((label, idx) => (
                   <div 
                    key={idx} 
                    className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-2 text-xs font-medium text-slate-600"
                   >
                     {label}
                   </div>
                 ))}
               </div>
            </div>

          </div>
        </section>

        {/* Action Footer */}
        <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-100">
          <button 
            onClick={handleBack}
            className="w-full sm:w-auto px-6 py-2 border  border-gray-300 rounded-lg text-sm font-medium text-slate-600 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Back to Edit
          </button>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-slate-600 hover:bg-gray-50 transition-colors cursor-pointer">
              Save as Draft
            </button>
            <button className="w-full sm:w-auto px-8 py-2 border border-gray-300 rounded-lg text-sm font-medium text-slate-600 hover:bg-gray-50 transition-colors cursor-pointer">
              Preview
            </button>
            <button onClick={() => setPublishIsOpen(true)} className="w-full sm:w-auto px-6 py-2 bg-primary/90 hover:bg-primary text-white rounded-lg text-sm font-bold transition-all cursor-pointer">
              Publish Assessment
            </button>
          </div>
        </footer>

      </div>
      {publishIsOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      
      {/* 2. The Modal Card */}
      <div className="relative w-full max-w-md p-8 mx-4 bg-white  rounded-xl animate-in fade-in zoom-in duration-200">
        
        {/* Close Button (X) */}
        <button 
          onClick={() => setPublishIsOpen(false)}
          className="absolute text-2xl cursor-pointer text-gray-400 top-4 right-5 hover:text-gray-600"
        >
          &times;
        </button>

        {/* Success Icon */}
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-green-50 rounded-full border border-green-100">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Text Content */}
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-gray-800">Publish Assessment?</h2>
          <p className="mb-8 text-sm leading-relaxed text-gray-500">
            This assessment will be made available to all users. You can unpublish or archive it later if needed.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-3">
          <button 
            onClick={() => setPublishIsOpen(false)}
            className="px-8 py-2 font-semibold text-gray-600 cursor-pointer transition-colors bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
                console.log("Published!");
                setPublishIsOpen(false);
            }}
            className="px-8 py-2 font-semibold text-white transition-all cursor-pointer bg-primary rounded-xl  active:scale-95"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
    )}

    </div>
  );
};

export default ReviewPreview;