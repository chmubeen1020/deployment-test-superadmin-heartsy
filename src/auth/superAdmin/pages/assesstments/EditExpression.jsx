import React, { useState } from "react";
import {
  ChevronLeft,
  X,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Upload,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import OptionsComponent from "./OptionsComponent";
import AttributeConfiguration from "./AttributeConfiguration";

const EditExpression = () => {
  const navigate = useNavigate();
  const [expressionName, setExpressionName] = useState("Love");
  const [description, setDescription] = useState("");
  const [mapping, setMapping] = useState("");
  const [isAttributeModalOpen, setIsAttributeModalOpen] = useState(false);


  // State for the questions/attributes list
  const [attributes, setAttributes] = useState([
    { id: 1, name: "Confidence" },
    { id: 2, name: "Empathy" },
  ]);

  const handleAddAttribute = () => {
    // 1. Prevent adding empty strings
    if (!mapping.trim()) return;

    // 2. Create the new attribute object
    const newAttribute = {
      id:
        attributes.length > 0
          ? Math.max(...attributes.map((a) => a.id)) + 1
          : 1,
      name: mapping.trim(),
    };

    // 3. Update the list and reset the UI
    setAttributes([...attributes, newAttribute]);
    setMapping(""); // Clear the input
    setIsAttributeModalOpen(false); // Close the modal
  };
  const toggleAttribute = (id) => {
    setAttributes(
      attributes.map((attr) =>
        attr.id === id ? { ...attr, isOpen: !attr.isOpen } : attr,
      ),
    );
  };

  const deleteAttribute = (id) => {
    setAttributes(attributes.filter((attr) => attr.id !== id));
  };

  return (
    <>
      <div className="min-h-screen bg-white p-4 text-slate-800">
        {/* Header */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div>
          <h1 className="text-xl 2xl:text-2xl font-semibold text-[#0f172a] mb-1">
            Edit Expression
          </h1>
          <p className="text-slate-500 text-sm 2xl:text-base mb-8">
            Configure Expression details
          </p>

          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <form className="space-y-4">
              {/* Expression Name */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-slate-600 ml-1">
                  Expression Name
                </label>
                <input
                  type="text"
                  value={expressionName}
                  onChange={(e) => setExpressionName(e.target.value)}
                  placeholder="Enter Expression name"
                  className="w-full bg-[#f1f4f9a2] rounded-xl py-2 px-6 outline-none focus:ring-2 focus:ring-[#6d28d9]/10 transition-all text-slate-700"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-slate-600 ml-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                  rows={5}
                  className="w-full bg-[#f1f4f9a2] rounded-xl py-2 px-6 outline-none focus:ring-2 focus:ring-[#6d28d9]/10 transition-all resize-none text-slate-700"
                />
              </div>

              <OptionsComponent />

              {/* Attribute Mapping */}

              {/* Form Footer / Add Button */}
            </form>
          </div>
          <div className="flex justify-between py-4">
            <h2 className="text-lg font-medium ">Attribute Mapping</h2>
            <button
              type="button"
              onClick={() => setIsAttributeModalOpen(true)}
              className="bg-primary/90 text-white px-12 py-2 rounded-xl font-medium hover:bg-primary transition-all cursor-pointer active:scale-95"
            >
              Add Attribute
            </button>
          </div>
          {/* List of Configured Attributes/Questions */}
          <div className="space-y-4">
             <AttributeConfiguration attributes={attributes} setAttributes={setAttributes}/>
          </div>

          {/* Main Edit Form */}
        </div>
        <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-4">
          <button className="border border-gray-200 font-medium rounded-lg py-2 px-4">Cancel</button>
          <div className="flex items-center gap-4">
          <button className="border border-gray-200 font-medium rounded-lg py-2 px-4">Delete Expression</button>

            <button onClick={() => navigate('/super-admin/assessments/create/1/review')} className="bg-primary text-white font-medium rounded-lg py-2 px-4">Continue to review</button>
          </div>
        </div>
      </div>

      {isAttributeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl">
            <div className="flex justify-end">
              <button
                onClick={() => setIsAttributeModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Add Attribute</h2>
            <p className="text-slate-500 text-sm mb-6">
              Create a new attribute for this expression.
            </p>
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-slate-600 ml-1">
                Attribute Mapping
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={mapping}
                  onChange={(e) => setMapping(e.target.value)}
                  className="w-full bg-[#f1f4f9a2] rounded-xl py-2 px-6 outline-none text-slate-700"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setIsAttributeModalOpen(false)}
                className="flex-1 px-6 py-3 rounded-xl font-medium border border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAttribute}
                className="flex-1 px-6 py-3 rounded-xl font-medium bg-[#6d28d9] text-white hover:bg-[#5b21b6]"
              >
                Add Attribute
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditExpression;
