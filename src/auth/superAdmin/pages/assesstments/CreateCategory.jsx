import React, { useState, useRef } from "react";
import {
  ArrowLeft,
  Trash2,
  Plus,
  ChevronDown,
  ChevronUp,
  Upload,
  X,
  Pencil,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const CreateCategory = () => {
  const navigate = useNavigate();

  // States
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Mind",
      expressions: ["Love", "Gratitude"],
      description: "Mental well-being",
      color: "#7C3AED",
      isOpen: false,
      icon: null,
    },
    {
      id: 2,
      name: "Wellness",
      expressions: [],
      description: "Physical health",
      color: "#22C55E",
      isOpen: false,
      icon: null,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [newExpression, setNewExpression] = useState("");

  // Create Form States
  const [formName, setFormName] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formColor, setFormColor] = useState("#7C3AED");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  
  // Refs
  const fileInputRef = useRef(null); // For the Create form
  const editFileInputRef = useRef(null); // For the Edit modal

  // Edit Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editColor, setEditColor] = useState("");
  const [editPreview, setEditPreview] = useState(null);

  // --- HANDLERS ---

  const openEditModal = (cat) => {
    setEditingCategory(cat);
    setEditName(cat.name);
    setEditDesc(cat.description);
    setEditColor(cat.color);
    setEditPreview(cat.icon);
    setIsEditModalOpen(true);
  };

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    setCategories(
      categories.map((cat) =>
        cat.id === editingCategory.id
          ? {
              ...cat,
              name: editName.trim(),
              description: editDesc.trim(),
              color: editColor,
              icon: editPreview,
            }
          : cat
      )
    );
    setIsEditModalOpen(false);
    setEditingCategory(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleEditFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (editPreview && editPreview.startsWith('blob:')) URL.revokeObjectURL(editPreview);
      setEditPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleEditDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      if (editPreview && editPreview.startsWith('blob:')) URL.revokeObjectURL(editPreview);
      setEditPreview(URL.createObjectURL(file));
    }
  };

  const removeFile = (e) => {
    e.stopPropagation();
    if (previewUrl && previewUrl.startsWith('blob:')) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const toggleCategory = (id) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id ? { ...cat, isOpen: !cat.isOpen } : cat
      )
    );
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!formName.trim()) {
      alert("Please enter a category name");
      return;
    }

    const newCat = {
      id: Date.now(),
      name: formName.trim(),
      description: formDesc.trim(),
      expressions: [],
      color: formColor,
      icon: previewUrl, 
      isOpen: false,
    };

    setCategories((prev) => [...prev, newCat]);

    // Reset Form
    setFormName("");
    setFormDesc("");
    setFormColor("#7C3AED"); 
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const openExpressionModal = (id) => {
    setActiveCategoryId(id);
    setIsModalOpen(true);
  };

  const handleAddExpression = () => {
    if (!newExpression.trim()) return;
    setCategories(
      categories.map((cat) =>
        cat.id === activeCategoryId
          ? { ...cat, expressions: [...cat.expressions, newExpression.trim()] }
          : cat
      )
    );
    setNewExpression("");
    setIsModalOpen(false);
  };

  return (
    <div className=" mx-auto p-4 relative">
      {/* Navigation */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-700 mb-6 cursor-pointer"
      >
        <ArrowLeft size={20} />{" "}
        <span className="text-sm font-medium">Back</span>
      </button>

      <div className="mb-8">
        <h1 className="text-xl 2xl:text-2xl font-semibold text-[#0f172a] mb-1">
          Create Category
        </h1>
        <p className="text-slate-500 text-sm 2xl:text-base">
          Enter Assessment Details
        </p>
      </div>

      {/* Dynamic Category List */}
      <div className="space-y-4 mb-8">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all"
          >
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span
                  className="px-3 py-1 rounded-md text-xs font-medium"
                  style={{
                    backgroundColor: `${cat.color}20`,
                    color: cat.color,
                  }}
                >
                  {cat.name}
                </span>
                <span className="text-slate-600 text-sm">
                  {cat.expressions.length} Expression
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => openEditModal(cat)}
                  className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <Pencil size={18} />
                </button>
                <button 
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
                <button
                  onClick={() => openExpressionModal(cat.id)}
                  className="flex items-center gap-2 border border-primary/30 text-primary px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary/5"
                >
                  <Plus size={16} /> Add Expression
                </button>
                <button
                  onClick={() => toggleCategory(cat.id)}
                  className="text-slate-400"
                >
                  {cat.isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
            </div>

            {cat.isOpen && (
              <div className="px-5 pb-5 pt-4 border-t border-slate-50">
                <div className="flex gap-6">
                  {cat.icon && (
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 flex-shrink-0">
                      <img
                        src={cat.icon}
                        alt="Category Icon"
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="flex flex-wrap gap-3">
                      {cat.expressions.map((exp, i) => (
                        <Link
                          key={i}
                          to={`edit-expression/${i}`}
                          className="px-10 py-2 border border-purple-200 rounded-xl text-purple-600 bg-purple-50/30 text-sm font-medium"
                        >
                          {exp}
                        </Link>
                      ))}
                      {cat.expressions.length === 0 && (
                        <p className="text-slate-400 text-sm italic">
                          No expressions added yet.
                        </p>
                      )}
                    </div>

                    <div className="mt-4 text-sm text-slate-500 leading-relaxed">
                      <strong className="text-slate-700">Description:</strong>{" "}
                      {cat.description}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Create Form Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 ">
        <form onSubmit={handleAddCategory} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-600">Category Name</label>
            <input
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="Enter category name"
              className="w-full bg-[#f1f4f9a2] rounded-xl py-3 px-5 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-600">Description</label>
            <textarea
              value={formDesc}
              onChange={(e) => setFormDesc(e.target.value)}
              placeholder="Enter description"
              rows={4}
              className="w-full bg-[#f1f4f9a2] rounded-xl py-3 px-5 outline-none resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-600">Accent Color</label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={formColor}
                onChange={(e) => setFormColor(e.target.value)}
                className="w-12 h-12 rounded-2xl overflow-hidden cursor-pointer border-none bg-transparent"
              />
              <div className="flex-1 bg-[#f1f4f9] rounded-xl py-3 px-5 text-slate-500 uppercase">
                {formColor}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-600">Icon Upload</label>
            <div
              onClick={() => !previewUrl && fileInputRef.current.click()}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-2xl transition-all cursor-pointer overflow-hidden h-48 flex flex-col items-center justify-center 
          ${dragActive ? "border-purple-400 bg-purple-50" : "border-slate-200"} 
          ${previewUrl ? "border-solid border-purple-100 bg-slate-50" : "p-10"}`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />

              {previewUrl ? (
                <div className="relative group w-fit flex items-center justify-center p-4">
                  <img src={previewUrl} alt="Preview" className="max-h-32 rounded-lg object-contain" />
                  <button
                    type="button"
                    onClick={removeFile}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="text-slate-400 mb-3" size={32} />
                  <p className="text-slate-600 font-medium">Click to upload or drag and drop</p>
                  <p className="text-slate-400 text-xs mt-1">SVG, PNG, JPG (max. 800x400px)</p>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-primary/90 text-white px-10 py-2 rounded-xl font-medium hover:bg-primary transition-all"
            >
              Add
            </button>
          </div>
        </form>
      </div>

      {/* Expression Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl">
            <div className="flex justify-end">
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Add Expression</h2>
            <p className="text-slate-500 text-sm mb-6">Create a new Expression for this domain.</p>
            <div className="space-y-2 mb-8">
              <label className="block text-sm font-semibold text-slate-600">Expression Name</label>
              <input
                autoFocus
                value={newExpression}
                onChange={(e) => setNewExpression(e.target.value)}
                placeholder="Enter Expression name"
                className="w-full border border-slate-200 rounded-xl py-3 px-5 outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 px-6 py-3 rounded-xl font-medium border border-slate-200 text-slate-600 hover:bg-slate-50">Cancel</button>
              <button onClick={handleAddExpression} className="flex-1 px-6 py-3 rounded-xl font-medium bg-[#6d28d9] text-white hover:bg-[#5b21b6]">Add Expression</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-8 shadow-2xl my-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-slate-800">Edit Category</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleUpdateCategory} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-600">Category Name</label>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-[#f1f4f9a2] rounded-xl py-3 px-5 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-600">Description</label>
                <textarea
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  rows={4}
                  className="w-full bg-[#f1f4f9a2] rounded-xl py-3 px-5 outline-none resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-600">Accent Color</label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    value={editColor}
                    onChange={(e) => setEditColor(e.target.value)}
                    className="w-12 h-12 rounded-2xl overflow-hidden cursor-pointer border-none bg-transparent"
                  />
                  <div className="flex-1 bg-[#f1f4f9] rounded-xl py-3 px-5 text-slate-500 uppercase font-mono">
                    {editColor}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-600">Icon Upload</label>
                <div
                  onClick={() => !editPreview && editFileInputRef.current.click()}
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleEditDrop}
                  className={`relative border-2 border-dashed rounded-2xl transition-all cursor-pointer overflow-hidden h-48 flex flex-col items-center justify-center 
                    ${dragActive ? "border-purple-400 bg-purple-50" : "border-slate-200"} 
                    ${editPreview ? "border-solid border-purple-100 bg-slate-50" : "p-10"}`}
                >
                  <input
                    type="file"
                    ref={editFileInputRef}
                    onChange={handleEditFileChange}
                    className="hidden"
                    accept="image/*"
                  />

                  {editPreview ? (
                    <div className="relative group w-fit flex items-center justify-center p-4">
                      <img src={editPreview} alt="Preview" className="max-h-32 rounded-lg object-contain" />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditPreview(null);
                          if (editFileInputRef.current) editFileInputRef.current.value = "";
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="text-slate-400 mb-3" size={32} />
                      <p className="text-slate-600 font-medium text-center">Click to upload or drag and drop</p>
                      <p className="text-slate-400 text-xs mt-1">SVG, PNG, JPG (max. 800x400px)</p>
                    </>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-8 py-2 rounded-xl font-medium border border-slate-200 text-slate-600 hover:bg-slate-50">Cancel</button>
                <button type="submit" className="bg-[#6d28d9] text-white px-10 py-2 rounded-xl font-medium hover:bg-[#5b21b6] transition-all">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCategory;