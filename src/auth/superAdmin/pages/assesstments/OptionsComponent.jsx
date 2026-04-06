import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const OptionsComponent = () => {
  // 1. Updated State Structure
  const [options, setOptions] = useState([
    { id: 1, label: "Strongly Agree", output: "", report: "" },
    { id: 2, label: "Agree", output: "", report: "" },
    { id: 3, label: "Neutral", output: "", report: "" },
    { id: 4, label: "Disagree", output: "", report: "" },
    { id: 5, label: "Strongly Disagree", output: "", report: "" },
  ]);

  const [expandedId, setExpandedId] = useState(null);

  // 2. Function to update specific text areas
  const handleUpdate = (id, field, value) => {
    setOptions(prev => prev.map(opt => 
      opt.id === id ? { ...opt, [field]: value } : opt
    ));
  };

  return (
    <div className=" mx-auto space-y-2">
      <h3 className="block text-sm font-semibold text-slate-600 ml-1">Options</h3>
      
      {options.map((option) => (
        <div key={option.id} className="border border-slate-100 rounded-xl overflow-hidden bg-white">
          {/* Header - Click to Expand */}
          <button
           type="button"
            onClick={() => setExpandedId(expandedId === option.id ? null : option.id)}
            className="w-full flex items-center justify-between px-4 py-2 bg-[#f8fafc] text-sm"
          >
            <span className="text-slate-700 ">{option.label}</span>
            {expandedId === option.id ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
          </button>

          {/* Expanded Content (The 2 TextAreas) */}
          {expandedId === option.id && (
            <div className="px-4 py-2 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white animate-in slide-in-from-top-2 duration-200">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-400 ml-1">Output</label>
                <textarea
                  value={option.output}
                  onChange={(e) => handleUpdate(option.id, 'output', e.target.value)}
                  placeholder="Enter output..."
                  className="w-full h-32 p-3 bg-slate-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-purple-500 text-slate-700 resize-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-400 ml-1">Report</label>
                <textarea
                  value={option.report}
                  onChange={(e) => handleUpdate(option.id, 'report', e.target.value)}
                  placeholder="Enter report..."
                  className="w-full h-32 p-3 bg-slate-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-purple-500 text-slate-700 resize-none"
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OptionsComponent;