import {
  Plus,
  Pencil,
  Trash2,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock,
  Video,
  File,
  Edit2,
  Trash,
  Edit,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SuperAdminCourseDetail({ onOpenModule }) {
  const [step, setStep] = useState(1);
    const navigate = useNavigate();
  const course = {
    title: "Advanced Leadership Strategies",
    level: "Beginner",
    duration: "4h 30min",
    description:
      "Master advanced leadership techniques for modern organizations",
    tags: ["Leadership", "Communication"],
    outcomes: [
      "Lead organizational change initiatives",
      "Overcome resistance and build buy-in",
      "Develop change leadership capabilities",
      "Communicate change effectively to teams",
      "Create sustainable change momentum",
    ],
    modules: [
      {
        id: 1,
        title: "Understanding Change Psychology",
        level: "Beginner",
        duration: "1 Week",
        videos: 2,
        documents: 2,
      },
      {
        id: 2,
        title: "Change Communication Framework",
        level: "Intermediate",
        duration: "1 Week",
        videos: 1,
        documents: 1,
      },
      {
        id: 3,
        title: "Leading Through Change",
        level: "Advanced",
        duration: "2 Weeks",
        videos: 2,
        documents: 3,
      },
    ],
  };
const handleAddModule = () => {
  setStep(2); // or whatever step you want
  navigate("/super-admin/courses/create");
};

  return (
    <div className="space-y-6">
      {/* Course Header */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 flex justify-between gap-4">
        <div className="flex gap-4 w-4/5 md:w-full">
          <div className="w-12 h-12 bg-purple-100 rounded-lg hidden md:flex items-center justify-center">
            <BookOpen className="text-purple-600" />
          </div>
          <div>
            <h2 className="font-semibold">{course.title}</h2>
            <p className="text-sm text-gray-500">{course.level}</p>
            <p className="text-sm text-gray-600 mt-1">{course.description}</p>

            <div className="flex gap-2 mt-2 flex-wrap">
              {course.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="w-1/5 flex gap-3 items-start">
          <span className="text-xs sm:text-sm text-gray-500">{course.duration}</span>
          <div className="flex gap-2 items-center">
          <Pencil size={16} className="text-gray-500"/>
          <Trash2 size={16} className="text-red-500" />
          </div>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="bg-purple-50 border border-gray-200 rounded-xl p-5">
        <h3 className="font-medium mb-3">Learning Outcomes</h3>
        <div className="grid sm:grid-cols-2 md:gap-2 text-sm">
          {course.outcomes.map((o, i) => (
            <p key={i} className="flex items-center gap-2"> <span className="text-green-600 text-2xl">•</span> {o}</p>
          ))}
        </div>
      </div>

      {/* Modules */}
      <div className="bg-white border border-gray-200 rounded-xl">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="font-medium">Course Modules</h3>
          <button className="bg-primary text-white px-3 py-1 rounded-md text-sm cursor-po" onClick={handleAddModule} >
            + Add Module
          </button>
        </div>

        {course.modules.map((m) => (
          <div
            key={m.id}
            onClick={() => onOpenModule(m)}
            className="p-4 border-t flex justify-between items-center border-gray-200 cursor-pointer hover:bg-gray-50"
          >
            <div className="flex gap-2 items-start">
            <ChevronRight size={20} className="text-gray-500 hidden md:block" />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-primary bg-primary/10 px-2 rounded-md text-sm">
                  Module 1{" "}
                </p>
                <p className="font-medium text-sm">{m.title}</p>
              </div>
              <p className="text-xs text-gray-500">{m.level}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                <Clock size={16} /> {m.duration} · <Video size={16}/> {m.videos} Videos · <File size={16}/> {m.documents}{" "}
                Documents
              </div>
            </div>
            </div>
            <div className="flex items-center gap-4">
                <Edit size={16}  className="text-gray-500" onClick={() => navigate('/super-admin/courses/module')}/>
                <Trash size={16} className="text-red-400"/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
