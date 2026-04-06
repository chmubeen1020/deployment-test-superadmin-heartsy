import {
  ArrowLeft,
  Clock,
  Download,
  FileText,
  Target,
  CheckCircle,
} from "lucide-react";

export function DocumentLessonDetail({ lesson, onBack }) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 xl:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex gap-3 items-center">
          <div className="bg-purple-100 text-primary rounded-lg p-2 flex items-center justify-center">
            <FileText />
          </div>

          <div>
            <h2 className="font-semibold text-base sm:text-lg">
              {lesson.title}
              <span className="ml-2 text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                PDF
              </span>
            </h2>

            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Clock size={14} />
              {lesson.duration} Minutes · {lesson.size || "2.5 MB"}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Left Content */}
        <div className="xl:w-4/5 space-y-4">
          {/* Content Preview */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h4 className="font-medium text-sm mb-3">Content Preview</h4>

            <div className="h-72 md:h-80 rounded-lg bg-purple-50 flex items-center justify-center">
              <FileText size={40} className="text-primary" />
            </div>
          </div>

          {/* Description */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h4 className="font-medium text-sm mb-2">Description</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {lesson.description}
            </p>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="xl:w-1/5 flex flex-col gap-4">
          {/* Learning Objectives */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
              <Target size={16} className="text-primary" />
              Learning Objectives
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
          <div className="bg-white border border-gray-200 rounded-xl p-4">
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
                <span className="text-gray-400">Size:</span>{" "}
                {lesson.size || "2.5 MB"}
              </p>
            </div>
          </div>

          {/* Download */}
          <div className="w-full">
            <button className="w-full bg-primary text-white px-5 py-2 rounded-md text-sm flex items-center justify-center gap-2">
              <Download size={16} />
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
