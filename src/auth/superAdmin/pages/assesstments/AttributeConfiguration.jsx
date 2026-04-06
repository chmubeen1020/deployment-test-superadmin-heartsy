import React, { useState } from "react";
import { Trash2, ChevronUp, ChevronDown, Plus, MinusCircle, Minus } from "lucide-react";

const LIKERT_OPTIONS = [
  "Strongly Agree",
  "Agree",
  "Neutral",
  "Disagree",
  "Strongly Disagree",
];

export default function AttributeConfiguration({ attributes, setAttributes }) {
  const [expandedId, setExpandedId] = useState(null);
  const [openOption, setOpenOption] = useState(null); // Tracks which Likert option is open

  const toggleAttribute = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const updateAttributeData = (attrId, field, value) => {
    setAttributes((prev) =>
      prev.map((attr) =>
        attr.id === attrId ? { ...attr, [field]: value } : attr
      )
    );
  };

  // Helper to update specific taglines for Likert options
  const updateTagline = (attrId, option, text) => {
    setAttributes((prev) =>
      prev.map((attr) => {
        if (attr.id === attrId) {
          const newOutputs = { ...attr.outputs, [option]: text };
          return { ...attr, outputs: newOutputs };
        }
        return attr;
      })
    );
  };

  return (
    <div className="space-y-4">
      {attributes.map((attr) => {
        const isExpanded = expandedId === attr.id;

        return (
          <div
            key={attr.id}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all"
          >
            {/* Accordion Header */}
            <div className="p-4 flex items-center justify-between border-b border-gray-50">
              <div className="flex items-center gap-4">
                <span className="px-4 py-1 bg-green-100 text-green-600 rounded-md text-xs font-semibold">
                  {attr.name}
                </span>
                <span className="text-sm text-slate-500 font-medium">
                  {attr.questions?.length || 0} Questions configured
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button className="p-2 text-red-400 hover:bg-red-50 rounded-lg cursor-pointer">
                  <Trash2 size={18} />
                </button>
                <button
                  onClick={() => toggleAttribute(attr.id)}
                  className="p-2 text-slate-400 cursor-pointer hover:bg-slate-50 rounded-lg"
                >
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
            </div>

            {/* Accordion Content */}
            {isExpanded && (
              <div className="p-4 bg-[#F8FAFC] space-y-4 animate-in slide-in-from-top-2 duration-200">
                {/* 1. Enter Question Section */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-semibold text-slate-700">Enter Question</label>
                    <button className="text-green-500 hover:bg-green-50 p-1 rounded-full"><Plus size={16}/></button>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Type your statement here"
                      className="w-full p-2 pr-10 border border-gray-200 rounded-xl text-sm outline-none "
                    />
                    <button className="absolute right-3 top-3 text-red-400"><Trash2 size={16}/></button>
                  </div>
                  
                  {/* Read-only Likert Scale Hint */}
                  <div className="p-3 bg-white border border-gray-100 rounded-lg">
                    <p className="text-[10px] font-bold text-slate-600 uppercase mb-1">Likert Scale (Read-only)</p>
                    <p className="text-xs text-slate-500 italic">
                    1 - Strongly Disagree  • 2 - Disagree  • 3 - Neutral  • 4 - Agree  • 5 - Strongly Agree
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-semibold text-slate-700">Enter Question</label>
                    <button className="text-green-500 hover:bg-green-50 p-1 rounded-full"><Minus size={16}/></button>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Type your statement here"
                      className="w-full p-2 pr-10 border border-gray-200 rounded-xl text-sm outline-none "
                    />
                    <button className="absolute right-3 top-3 text-red-400"><Trash2 size={16}/></button>
                  </div>
                  
                  {/* Read-only Likert Scale Hint */}
                  <div className="p-3 bg-white border border-gray-100 rounded-lg">
                    <p className="text-[10px] font-bold text-slate-600 uppercase mb-1">Likert Scale (Read-only)</p>
                    <p className="text-xs text-slate-500 italic">
                    1 - Strongly Agree  • 2 - Agree  • 3 - Neutral  • 4 - Disagree  • 5 - Strongly Disagree
                    </p>
                  </div>
                </div>

                {/* 2. Options / Outputs Section */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 block mb-3">Options</label>
                  
                  {LIKERT_OPTIONS.map((option) => (
                    <div key={option} className="space-y-2">
                      <button
                        onClick={() => setOpenOption(openOption === option ? null : option)}
                        className="w-full flex items-center justify-between p-4 bg-[#F1F5F9]  rounded-xl text-sm text-slate-600 transition-colors"
                      >
                        <span>{option}</span>
                        {openOption === option ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                      </button>

                      {/* Output Textarea (Nested Accordion) */}
                      {openOption === option && (
                        <div className="p-2 bg-white border border-gray-200 rounded-xl space-y-2 animate-in fade-in duration-200">
                          <label className="text-xs font-bold text-slate-400">Output</label>
                          <textarea
                            placeholder="Add Tag Line"
                            className="w-full p-4 border border-gray-100 mt-2 rounded-lg text-sm bg-slate-50 outline-none transition-all"
                            rows={4}
                            value={attr.outputs?.[option] || ""}
                            onChange={(e) => updateTagline(attr.id, option, e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}