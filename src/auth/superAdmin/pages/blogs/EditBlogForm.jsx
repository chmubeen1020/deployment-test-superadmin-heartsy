import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, X, Upload, RefreshCw, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditBlogForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef(null);

  // State for form data
  const [formData, setFormData] = useState({
    title: '',
    headline: '',
    description: '',
    content: '',
    readingTakeTime: '',
  });

  // State for image upload
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState('');
  
  // State for keywords
  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState([]);

  // State for date
  const [selectedDate, setSelectedDate] = useState(null);

  // Loading states
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  // Fetch blog details
  const fetchBlogDetail = async () => {
    setFetchLoading(true);
    try {
      const token = sessionStorage.getItem("superAdminAccessToken");

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/heartsy/api/v1/super-admin-blog`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            blogId: id,
          }),
        }
      );

      const res = await response.json();

      if (!response.ok) {
        throw new Error(res.message || "Failed to fetch blog details");
      }

      const blog = res?.data || null;

      if (blog) {
        // Populate form data
        setFormData({
          title: blog.title || '',
          headline: blog.headline || '',
          description: blog.description || '',
          content: blog.content || '',
          readingTakeTime: blog.readingTakeTime || '',
        });

        // Set existing image
        if (blog.coverImage) {
          setExistingImageUrl(blog.coverImage);
          setImage(blog.coverImage);
        }

        // Set keywords
        if (blog.keywords && Array.isArray(blog.keywords)) {
          const cleanedKeywords = blog.keywords.map(k => 
            typeof k === 'string' ? k.replace(/[\[\]"]/g, '') : k
          );
          setKeywords(cleanedKeywords);
        }

        // Set publish date
        if (blog.publishDate) {
          setSelectedDate(new Date(blog.publishDate));
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error fetching blog details");
      navigate(-1);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBlogDetail();
    }
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle Keyword Creation
  const handleKeywordKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const tag = keywordInput.trim();
      if (tag && !keywords.includes(tag)) {
        setKeywords([...keywords, tag]);
        setKeywordInput("");
      }
    }
  };

  const removeKeyword = (tagToRemove) => {
    setKeywords(keywords.filter(tag => tag !== tagToRemove));
  };

  // Handle date change
  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    if (dateValue) {
      setSelectedDate(new Date(dateValue));
    }
  };

  // Format date for input field
  const formatDateForInput = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return toast.error("Title is required");
    }

    if (!image) {
      return toast.error("Cover image is required");
    }

    if (!selectedDate) {
      return toast.error("Publish date is required");
    }

    setLoading(true);

    try {
      const token = sessionStorage.getItem("superAdminAccessToken");

      const form = new FormData();
      form.append("blogId", id);
      form.append("title", formData.title);
    //form.append("headline", formData.headline);
      form.append("description", formData.description);
      form.append("content", formData.content);
      form.append("readingTakeTime", formData.readingTakeTime);
      form.append("publishDate", selectedDate.toISOString());
      form.append("keywords", keywords.join(","));
      
      // Only append image if a new one was selected
      if (imageFile) {
        form.append("coverImage", imageFile);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/heartsy/api/v1/super-admin-blog/edit`,
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
        throw new Error(res.message || "Failed to update blog");
      }

      toast.success("Blog updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Loading skeleton
  if (fetchLoading) {
    return (
      <div className="min-h-screen p-2">
        <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 flex items-center gap-4">
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="p-6 pt-0 space-y-6">
            <div className="w-full h-48 bg-gray-200 rounded-xl animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-14 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-14 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-14 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-14 bg-gray-200 rounded-lg animate-pulse" />
            </div>
            <div className="h-24 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-32 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-2">
      <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="text-gray-600 hover:bg-gray-100 p-1 rounded-full transition-colors"
            disabled={loading}
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Edit Blog</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 pt-0 space-y-6">
          {/* 1. Image Upload Section */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blog Cover Image
            </label>
            {!image ? (
              <div 
                onClick={() => fileInputRef.current.click()}
                className="w-full h-48 border-2 border-dashed border-purple-100 rounded-xl flex flex-col items-center justify-center bg-[#fbf9ff] hover:bg-[#f5f0ff] cursor-pointer transition-colors"
              >
                <Upload className="text-[#9366f2] mb-2" size={32} />
                <span className="text-gray-500 text-sm">Click to upload cover image</span>
              </div>
            ) : (
              <div className="relative w-full h-64 rounded-xl overflow-hidden group">
                <img 
                  src={image} 
                  alt="Preview" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    <RefreshCw size={16} /> Replace
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setImageFile(null);
                      setExistingImageUrl('');
                    }}
                    className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
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

          {/* 2. Form Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* <input 
              type="text" 
              name="headline"
              value={formData.headline}
              onChange={handleChange}
              placeholder="Head Line" 
              className="w-full p-4 border border-blue-50/50 rounded-lg text-gray-500 bg-white shadow-sm focus:ring-1 focus:ring-purple-200 outline-none" 
            /> */}
            <input 
              type="text" 
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title" 
              className="w-full p-4 border border-blue-50/50 rounded-lg text-gray-500 bg-white shadow-sm focus:ring-1 focus:ring-purple-200 outline-none" 
              required
            />
            <input 
              type="text" 
              name="readingTakeTime"
              value={formData.readingTakeTime}
              onChange={handleChange}
              placeholder="Reading Take Time (e.g., 5 min, 1h)" 
              className="w-full p-4 border border-blue-50/50 rounded-lg text-gray-500 bg-white shadow-sm focus:ring-1 focus:ring-purple-200 outline-none" 
            />
            <input 
              type="date" 
              value={formatDateForInput(selectedDate)}
              onChange={handleDateChange}
              placeholder="Publish Date" 
              className="w-full p-4 border border-blue-50/50 rounded-lg text-gray-500 bg-white shadow-sm focus:ring-1 focus:ring-purple-200 outline-none" 
              required
            />
          </div>

          {/* 3. Description Field */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of the blog" 
              rows={3}
              className="w-full p-4 border border-blue-50/50 rounded-lg text-gray-500 bg-white shadow-sm focus:ring-1 focus:ring-purple-200 outline-none resize-none"
            />
          </div>

          {/* 4. Keyword / Tag Section */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Keywords (Press Enter or Space to add)
            </label>
            <div className="min-h-[100px] p-3 border border-blue-50/50 rounded-lg bg-white shadow-sm focus-within:ring-1 focus-within:ring-purple-200 transition-all">
              <div className="flex flex-wrap gap-2 mb-2">
                {keywords.map((tag, index) => (
                  <span 
                    key={index} 
                    className="flex items-center gap-1 bg-[#f0eaff] text-[#9366f2] px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                    <button 
                      type="button" 
                      onClick={() => removeKeyword(tag)} 
                      className="hover:text-red-500 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <textarea 
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={handleKeywordKeyDown}
                placeholder={keywords.length === 0 ? "Type keywords here..." : ""}
                className="w-full bg-transparent outline-none text-gray-600 resize-none h-12"
              />
            </div>
          </div>

          {/* 5. Content / Details Textarea */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blog Content
            </label>
            <textarea 
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write Blog Details" 
              rows={8}
              className="w-full p-4 border border-blue-50/50 rounded-lg text-gray-500 bg-white shadow-sm focus:ring-1 focus:ring-purple-200 outline-none resize-none"
            />
          </div>

          {/* Footer Action */}
          <div className="flex justify-end pb-4">
            <button 
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-[#9366f2] hover:bg-[#7e52da] text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-purple-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <RefreshCw size={20} />
                  Update Blog
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlogForm;