import React, { useEffect, useState } from "react";
import {
  Edit2,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const postsPerPage = 6;

  const fetchBlogs = async (page = 1) => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("superAdminAccessToken");

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/heartsy/api/v1/super-admin-blog/all?page=${page}&limit=${postsPerPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const res = await response.json();

      if (!response.ok) {
        throw new Error(res.message || "Failed to fetch blogs");
      }

      setBlogs(res?.data?.data || []);
      setTotalPages(res?.data?.pagination?.pages || 1);
      setCurrentPage(res?.data?.pagination?.page || 1);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error fetching blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const handleViewBlog = (blogId) => {
    navigate(`/super-admin/blog/${blogId}`); // Adjust the route path as per your routing structure
  };

  const handleEditBlog = (blogId) => {
    navigate(`edit/${blogId}`); // Navigate to edit page
  };
  // Function to delete a blog
  const handleDeleteBlog = async (blogId) => {
    if (!blogId) return;

    try {
      const token = sessionStorage.getItem("superAdminAccessToken"); // get access token
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/heartsy/api/v1/super-admin-blog/delete`,
        {
          method: "DELETE", // usually delete endpoint can be POST
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ blogId }), // payload
        }
      );

      const res = await response.json();

      if (!response.ok) {
        throw new Error(res.message || "Failed to delete blog");
      }

      // Remove deleted blog from state to update UI immediately
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));

      toast.success("Blog deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error deleting blog");
    }
  };
  return (
    <div className="min-h-screen font-sans pb-4">
      {/* Header */}
      <div className="mx-auto flex justify-end mb-8">
        <button
          onClick={() => navigate("add")}
          className="flex items-center gap-2 bg-[#9366f2] hover:bg-[#7e52da] text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
        >
          <Plus size={20} />
          Add New Blog
        </button>
      </div>

      {/* Grid */}
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
        {loading ? (
          // 🔥 Skeleton Loader
          Array.from({ length: postsPerPage }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow animate-pulse"
            >
              <div className="h-48 bg-gray-200" />
              <div className="p-6">
                <div className="flex justify-end gap-3 mb-3">
                  <div className="w-5 h-5 bg-gray-200 rounded" />
                  <div className="w-5 h-5 bg-gray-200 rounded" />
                  <div className="w-5 h-5 bg-gray-200 rounded" />
                </div>
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-4" />
                <div className="flex gap-2 mb-6">
                  <div className="h-5 w-12 bg-gray-200 rounded-full" />
                  <div className="h-5 w-14 bg-gray-200 rounded-full" />
                </div>
                <div className="flex justify-between">
                  <div className="h-3 w-20 bg-gray-200 rounded" />
                  <div className="h-3 w-16 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          ))
        ) : blogs.length === 0 ? (
          // 🔥 Empty State
          <p className="col-span-full text-center text-gray-400">
            No blogs found
          </p>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="bg-[#f5f0ff] h-48 relative">
                <img
                  src={blog.coverImage || "/fallback.jpg"}
                  alt={blog.title}
                  onError={(e) => (e.target.src = "/fallback.jpg")}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Actions */}
                <div className="w-full flex justify-end gap-3 mb-2">
                  <button
                    onClick={() => handleViewBlog(blog._id)}
                    className="text-gray-500 hover:text-[#7e52da] transition-colors cursor-pointer"
                    title="View Blog"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => handleEditBlog(blog._id)}
                    className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                    title="Edit Blog"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    className="text-red-400 hover:text-red-600 cursor-pointer"
                    onClick={() => handleDeleteBlog(blog._id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Title */}
                <h3 className="text-[#1a1a1a] text-xl font-bold mb-3 line-clamp-2">
                  {blog.title || "Untitled"}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                  {blog.description || "No description available"}
                </p>

                {/* Keywords */}
                {blog.keywords?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-6">
                    {blog.keywords.slice(0, 3).map((keyword, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1.5 bg-[#f5f0ff] text-[#9366f2] rounded-full font-medium"
                      >
                        {keyword.replace(/[\[\]"]/g, "")}
                      </span>
                    ))}

                    {blog.keywords.length > 3 && (
                      <span className="text-[10px] px-2 py-1 bg-gray-100 text-gray-500 rounded-full">
                        +{blog.keywords.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Footer */}
                <div className="flex justify-between text-gray-600 text-xs border-t border-gray-200 pt-4">
                  <span>
                    {blog.publishDate
                      ? new Date(blog.publishDate).toLocaleDateString()
                      : "No date"}
                  </span>
                  <span>{blog.readingTakeTime || "N/A"}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="max-w-7xl mx-auto mt-12 flex justify-center items-center gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-full border border-gray-200 text-gray-400 hover:text-[#9366f2] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`w-10 h-10 rounded-full transition-colors ${currentPage === num
                  ? "bg-[#9366f2] text-white"
                  : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              {num}
            </button>
          ))}
        </div>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="p-2 rounded-full border border-gray-200 text-gray-400 hover:text-[#9366f2] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default AllBlogs;