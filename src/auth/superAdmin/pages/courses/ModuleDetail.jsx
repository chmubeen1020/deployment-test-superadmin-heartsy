import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import ModuleOverview from "./ModuleOverview";
import SuperAdminModuleContent from "./SuperAdminModuleContent";
import { useNavigate } from "react-router-dom";
import { VideoLessonDetail } from "./VideoLessonDetail";
import { DocumentLessonDetail } from "./DocumentLessonDetail";

export default function SuperAdminModuleDetail() {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
    const [selectedLesson, setSelectedLesson] = useState(null);


    if (selectedLesson) {
    return (
      <LessonDetail
        lesson={selectedLesson}
        onBack={() => setSelectedLesson(null)}
      />
    );
  }
  return (
    <div className=" mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <button className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} />
          Back to Course
        </button>
        <h1 className="text-xl font-semibold">Module Details</h1>
        <p className="text-sm text-gray-500">
          View and manage module content
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-primary/10 rounded-lg p-1 inline-flex gap-1">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 text-sm rounded-md transition ${
            activeTab === "overview"
              ? "bg-primary text-white"
              : "text-gray-600"
          }`}
        >
          Overview
        </button>

        <button
          onClick={() => setActiveTab("content")}
          className={`px-4 py-2 text-sm rounded-md transition ${
            activeTab === "content"
              ? "bg-primary text-white"
              : "text-gray-600"
          }`}
        >
          Content
        </button>
      </div>

      {/* Render Section */}
      {activeTab === "overview" && <ModuleOverview />}
      {activeTab === "content" && <SuperAdminModuleContent setSelectedLesson={setSelectedLesson} />}
    </div>
  );
}
function LessonDetail({ lesson, onBack }) {
  return (
    <div className="space-y-6">
      {/* Back */}
      <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs text-gray-700 hover:text-primary"
      >
        <ArrowLeft size={16} />
        Back to Course
      </button>
 <h2 className=" text-lg font-semibold mt-2">Lesson Details</h2>
   <p className=" text-sm">Review lesson information and access content</p>
      </div>
      {lesson.type === "video" ? (
        <VideoLessonDetail lesson={lesson} />
      ) : (
        <DocumentLessonDetail lesson={lesson} />
      )}
    </div>
  );
}
