import React, { useState, useRef } from "react";
import {
  ArrowLeft,
  Plus,
  X,
  Upload,
  RefreshCw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddBlogForm = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Image
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // Date
  const [selectedDate, setSelectedDate] = useState(null);

  // Keywords
  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState([]);

  // Loading
  const [loading, setLoading] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    headline: "",
    title: "",
    description: "",
    content: "",
    readingTakeTime: "",
  });

  // Handle Inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Keywords
  const handleKeywordKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const tag = keywordInput.trim();
      if (tag && !keywords.includes(tag)) {
        setKeywords([...keywords, tag]);
        setKeywordInput("");
      }
    }
  };

  const removeKeyword = (tag) => {
    setKeywords(keywords.filter((k) => k !== tag));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return toast.error("Title is required");
    }

    if (!imageFile) {
      return toast.error("Cover image is required");
    }

    if (!selectedDate) {
      return toast.error("Publish date is required");
    }

    setLoading(true);

    try {
      const token = sessionStorage.getItem("superAdminAccessToken");

      const form = new FormData();
      form.append("title", formData.title);
      // form.append("headline", formData.headline);
      form.append("description", formData.description);
      form.append("content", formData.content);
      form.append("readingTakeTime", formData.readingTakeTime);
      form.append("publishDate", selectedDate.toISOString());
      form.append("keywords", keywords.join(","));
      form.append("coverImage", imageFile);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/heartsy/api/v1/super-admin-blog/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      );

      const res = await response.json();

      if (!response.ok) {
        throw new Error(res.message || "Failed to create blog");
      }

      toast.success("Blog created successfully!");
      navigate(-1);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-2">
      <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:bg-gray-100 p-1 rounded-full"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">
            Add New Blog
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 pt-0 space-y-6">

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blog Cover Image
            </label>

            {!image ? (
              <div
                onClick={() => fileInputRef.current.click()}
                className="w-full h-48 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center bg-[#fbf9ff] hover:bg-[#f5f0ff] cursor-pointer"
              >
                <Upload className="text-[#9366f2] mb-2" size={32} />
                <span className="text-gray-500 text-sm">
                  Click to upload cover image
                </span>
              </div>
            ) : (
              <div className="relative w-full h-64 rounded-xl overflow-hidden group">
                <img
                  src={image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg text-sm"
                  >
                    <RefreshCw size={16} /> Replace
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setImageFile(null);
                    }}
                    className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    <X size={16} /> Remove
                  </button>
                </div>
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* <input
              name="headline"
              value={formData.headline}
              onChange={handleChange}
              placeholder="Headline"
              className="w-full p-4 border border-gray-200 rounded-lg"
            /> */}
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
            <input
              name="readingTakeTime"
              value={formData.readingTakeTime}
              onChange={handleChange}
              placeholder="Reading Time"
              className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />

            {/* Date Picker */}
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd MMM yyyy"
              placeholderText="Select Publish Date"
              className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Description */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Highlighted Note"
            rows={3}
            className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />

          {/* Keywords */}
          <div>
            <label className="block text-sm mb-2">
              Keywords
            </label>

            <div className="min-h-[100px] p-3 border border-gray-200 rounded-lg">
              <div className="flex flex-wrap gap-2 mb-2">
                {keywords.map((tag, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1 bg-[#f0eaff] text-[#9366f2] px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                    <button onClick={() => removeKeyword(tag)}>
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>

              <textarea
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={handleKeywordKeyDown}
                placeholder="Type and press Enter"
                className="w-full outline-none resize-none h-10 "
              />
            </div>
          </div>

          {/* Content */}
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write full blog content..."
            rows={6}
            className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-[#9366f2] hover:bg-[#7e52da] text-white px-8 py-3 rounded-xl"
            >
              <Plus size={20} />
              {loading ? "Creating..." : "Add Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogForm;