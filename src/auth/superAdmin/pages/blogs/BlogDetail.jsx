import React, { useEffect, useState } from "react";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const BlogDetail = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchBlogDetail = async () => {
    setLoading(true);
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

      // Assuming the API returns the blog in data.data[0] based on your response structure
      setBlog(res?.data || null);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error fetching blog details");
      navigate(-1); // Go back if error occurs
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBlogDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen font-sans">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Content Skeleton */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-pulse">
            {/* Cover Image Skeleton */}
            <div className="h-96 bg-gray-200" />

            {/* Content Skeleton */}
            <div className="p-8">
              <div className="h-10 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="flex gap-6 mb-6">
                <div className="h-5 w-32 bg-gray-200 rounded" />
                <div className="h-5 w-24 bg-gray-200 rounded" />
              </div>
              <div className="h-6 bg-gray-200 rounded w-full mb-3" />
              <div className="h-6 bg-gray-200 rounded w-5/6 mb-8" />
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-4/5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen font-sans flex items-center justify-center">
        <p className="text-gray-400 text-lg">Blog not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans pb-12">
      {/* Back Button */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-[#9366f2] transition-colors font-medium cursor-pointer"
        >
          <ArrowLeft size={20} />
          Back to Blogs
        </button>
      </div>

      {/* Blog Detail Card */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          {/* Cover Image */}
          <div className="bg-[#f5f0ff] h-96 relative">
            <img
              src={blog.coverImage || "/fallback.jpg"}
              alt={blog.title}
              onError={(e) => (e.target.src = "/fallback.jpg")}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Title */}
            <h1 className="text-[#1a1a1a] text-3xl md:text-4xl font-bold mb-6">
              {blog.title || "Untitled"}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-6 mb-8 text-gray-600">
              {blog.publishDate && (
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-primary" />
                  <span className="text-sm">
                    {new Date(blog.publishDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}
              {blog.readingTakeTime && (
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-primary" />
                  <span className="text-sm">{blog.readingTakeTime}</span>
                </div>
              )}
            </div>

            {blog.content && (
              <div className="prose prose-lg max-w-none">
                <h2 className="text-black font-medium mb-2">Blog Detail:</h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {blog.content}
                </div>
              </div>
            )}
            {/* Keywords */}
           {/* Description */}
            {blog.description && (
              <div className="mt-8">
                <p className="text-gray-600 bg-primary/5 p-4 rounded-md text-primary border border-primary/40 text-lg leading-relaxed">
                  {blog.description}
                </p>
              </div>
            )}

            {/* Divider */}
            <div className="border-t border-gray-200 my-8" />

            {/* Content */}
            {blog.keywords?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {blog.keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1.5 bg-[#f5f0ff] text-[#9366f2] rounded-full font-medium"
                  >
                    {keyword.replace(/[\[\]"]/g, "")}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;