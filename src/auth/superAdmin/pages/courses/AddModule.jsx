import {
    ArrowLeft,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { VideoCard } from "./VideoCard";
import { DocumentCard } from "./DocumentCard";

export function AddModule({
  module,
  moduleIndex,
  onChange,
  onAddContent,
  course,
  setCourse,
  setStep
}) {
  return (
    <div className="border border-gray-200 rounded-xl bg-white p-5 space-y-1">
      {/* Toggle */}
      <div
        className="flex justify-between items-center cursor-pointer mb-4"
      >
       <div className="flex items-center gap-3">
        <button onClick={() => setStep(1)}> <ArrowLeft size={18} /> </button> <div> 
        <h2 className="font-semibold"> Course Name: {course.title || "N/A"} </h2>
        <p className="text-sm text-gray-500"> Course Description: {course.subTitle || "N/A"} </p> 
        </div>
        </div>
      </div>

      {module.open && (
        <>
          <Input
            label="Module Title"
            value={module.title}
            onChange={(v) => onChange({ ...module, title: v })}
          />

          <Input
            label="Module Sub-title"
            value={module.subTitle}
            onChange={(v) => onChange({ ...module, subTitle: v })}
          />

          <Input
            label="Module Description"
            value={module.description}
            onChange={(v) => onChange({ ...module, description: v })}
          />

          <Input
            label="Module Duration"
            type = "number"
            value={module.duration}
            onChange={(v) => onChange({ ...module, duration: v })}
          />

          {/* Videos */}
          {module.videos.length > 0 && (
            <div className="space-y-3 mt-4">
              <h4 className="text-sm font-medium text-gray-700">
                Videos ({module.videos.length})
              </h4>

              {module.videos.map((video, index) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  index={index}
                  onEdit={() => onAddContent("video", index)}
                  onDelete={() => {
                    const modules = [...course.modules];
                    modules[moduleIndex].videos = modules[
                      moduleIndex
                    ].videos.filter((_, i) => i !== index);
                    setCourse({ ...course, modules });
                  }}
                />
              ))}
            </div>
          )}

          {/* Documents */}
          {module.documents.length > 0 && (
            <div className="space-y-3 mt-4">
              <h4 className="text-sm font-medium text-gray-700">
                Documents ({module.documents.length})
              </h4>

              {module.documents.map((doc, index) => (
                <DocumentCard
                  key={index}
                  doc={doc}
                  index={index}
                  onEdit={() => onAddContent("document", index)}
                  onDelete={() => {
                    const modules = [...course.modules];
                    modules[moduleIndex].documents = modules[
                      moduleIndex
                    ].documents.filter((_, i) => i !== index);
                    setCourse({ ...course, modules });
                  }}
                />
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 justify-end mt-2">
            <SecondaryButton onClick={() => onAddContent("video")}>
              + Upload Video
            </SecondaryButton>

            <SecondaryButton onClick={() => onAddContent("document")}>
              + Attach Document
            </SecondaryButton>
          </div>
        </>
      )}
    </div>
  );
}

function SecondaryButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className=" bg-primary text-white px-3 py-2 rounded-md text-sm"
    >
      {children}
    </button>
  );
}
function Input({ label, value, onChange , type ="text" }) {
  const toLower = (text = "") => text.toLowerCase();
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        value={value}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-b text-x lg:text-sm mt-1 border-gray-200  focus:outline-none"
      />
    </div>
  );
}