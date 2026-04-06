import { ArrowLeft, Clock, Download, Play, Target } from "lucide-react";
import VideoPreview from "../../../../GlobalComponent/VideoPreview";


export function VideoLessonDetail({ lesson, onBack }) {
  return (
    <div className="space-y-4">
      {/* Back */}
      {/* Header Card */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 xl:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex gap-3 items-center">
          <div className="bg-blue-100 text-primary rounded-lg p-2 flex items-center justify-center">
           <Play/>
          </div>

          <div>
            <h2 className="font-semibold text-base sm:text-lg">
              {lesson.title}  <span className="ml-2 text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                Video
              </span>
            </h2>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Clock size={14}/> {lesson.duration} Minutes
             
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex justify-between gap-6">
        {/* Content Preview */}
        <div className="w-4/5 space-y-4">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-4">
          <h4 className="font-medium text-sm mb-3">Content Preview</h4>
          <VideoPreview video={lesson} height="h-72 md:h-80" />
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h4 className="font-medium text-sm mb-2">Description</h4>
        <p className="text-sm text-gray-600 leading-relaxed">
          {lesson.description}
        </p>
      </div>
        </div>
        {/* Right Sidebar */}
        <div className="w-1/5 flex flex-col gap-4 items-start">
          {/* Learning Objectives */}
          <div className="w-full bg-white border border-gray-200 rounded-xl p-4">
            <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
              <Target size={16} className="text-primary"/> Learning Objectives
            </h4>

            <div className="space-y-2">
              {lesson.objectives?.map((obj, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle
                    size={14}
                    className="text-green-500 mt-0.5"
                  />
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {obj}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Lesson Info */}
          <div className="w-full bg-white border border-gray-200 rounded-xl p-4">
            <h4 className="font-medium text-sm mb-3">
              Lesson Information
            </h4>

            <div className="space-y-1 text-xs text-gray-600">
              <p>
                <span className="text-gray-400">Upload By:</span>{" "}
                {lesson.uploadedBy}
              </p>
              <p>
                <span className="text-gray-400">Upload Date:</span>{" "}
                {lesson.uploadDate}
              </p>
              <p>
                <span className="text-gray-400">Last Modified:</span>{" "}
                {lesson.lastModified}
              </p>
              <p>
                <span className="text-gray-400">Duration:</span>{" "}
                {lesson.duration} Minutes
              </p>
            </div>
          </div>
          <div className="w-full flex justify-center">
        <button className="w-full bg-primary text-white px-5 py-2 rounded-md text-sm flex items-center justify-center gap-2">
          <Download size={16}/> Download Video
        </button>
      </div>
      </div>

      {/* Description */}
      

      {/* Action */}
      
        </div>
    </div>
  );
}
