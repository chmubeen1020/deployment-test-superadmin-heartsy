import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  ChevronDown,
  ChevronUp,
  Clock,
  Check,
  Pencil,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AddDocument } from "./AddDocument";
import { AddVideo } from "./AddVideo";
import { DocumentCard } from "./DocumentCard";
import { VideoCard } from "./VideoCard";
import { AddModule } from "./AddModule";
import { CourseDetailsForm } from "./CourseDetailsForm";

/* -------------------------------------
   Helpers
------------------------------------- */
const uid = () => Math.random().toString(36).slice(2);

/* -------------------------------------
   Main Component
------------------------------------- */
export default function CreateCourse() {
  const { id } = useParams();
  const isEditMode = Boolean(id);

// create → start from step 1
// edit → start from modules directly
const [step, setStep] = useState(isEditMode ? 2 : 1);

  const [contentStep, setContentStep] = useState(null);
  const navigate = useNavigate();

  const createEmptyCourse = () => ({
    title: "",
    subTitle: "",
    outcomes: [],
    tags: [],
    modules: [
      {
        id: uid(),
        title: "",
        subTitle: "",
        description: "",
        duration: "",
        videos: [],
        documents: [],
        open: true,
      },
    ],
  });
  const createEmptyModule = () => ({
    id: crypto.randomUUID(),
    title: "",
    subTitle: "",
    description: "",
    duration: "",
    videos: [],
    documents: [],
    open: true,
  });

  React.useEffect(() => {
    if (!isEditMode) return;

    // TEMP: replace later with API call
    const fetchCourse = async () => {
      // example API
      // const res = await api.get(`/courses/${id}`);
      // setCourse(res.data);

      // MOCK DATA (for now)
      const existingCourse = {
        title: "React Mastery",
        subTitle: "Learn React from scratch",
        outcomes: ["Hooks", "State", "Components"],
        tags: ["react", "frontend"],
        modules: [
          {
            id: uid(),
            title: "Introduction",
            subTitle: "Basics",
            description: "Intro module",
            duration: "30",
            videos: [],
            documents: [],
            open: true,
          },
        ],
      };

      setCourse(existingCourse);
    };

    fetchCourse();
  }, [id, isEditMode]);

  const [course, setCourse] = useState(createEmptyCourse());

  if (contentStep) {
    const modIndex = contentStep.moduleIndex;

    if (contentStep.type === "video") {
      const modIndex = contentStep.moduleIndex;
      const editIndex = contentStep.editIndex;

      return (
        <div className="pb-4">
          <AddVideo
            initialData={
              editIndex !== undefined
                ? course.modules[modIndex].videos[editIndex]
                : null
            }
            onBack={() => setContentStep(null)}
            onSave={(video) => {
              const modules = [...course.modules];

              const newVideo = {
                ...video,
                id: video.id || crypto.randomUUID(),
              };

              if (editIndex !== undefined) {
                modules[modIndex].videos[editIndex] = newVideo;
              } else {
                modules[modIndex].videos = [
                  ...modules[modIndex].videos,
                  newVideo,
                ];
              }

              setCourse({ ...course, modules });
              setContentStep(null);
            }}
          />
        </div>
      );
    }

    if (contentStep.type === "document") {
      const modIndex = contentStep.moduleIndex;
      const editIndex = contentStep.editIndex;

      return (
        <AddDocument
          initialData={
            editIndex !== undefined
              ? course.modules[modIndex].documents[editIndex]
              : null
          }
          onBack={() => setContentStep(null)}
          onSave={(doc) => {
            const modules = [...course.modules];

            if (editIndex !== undefined) {
              // ✏️ EDIT
              modules[modIndex].documents[editIndex] = doc;
            } else {
              // ➕ ADD
              modules[modIndex].documents.push(doc);
            }

            setCourse({ ...course, modules });
            setContentStep(null);
          }}
        />
      );
    }
  }

  /* -------------------------------------
     STEP 1 – Course Details
  ------------------------------------- */
  if (step === 1) {
  return (
    <CourseDetailsForm
      course={course}
      setCourse={setCourse}
      isEditMode={isEditMode}
      onBack={() => navigate(-1)}
      onNext={() => setStep(2)}
    />
  );
}


  /* -------------------------------------
     STEP 2 – Modules
  ------------------------------------- */
  return (
    <div className=" mx-auto space-y-2 pb-4">
      {course.modules.map((mod, idx) => (
        <AddModule
          key={mod.id}
          module={mod}
          moduleIndex={idx}
          course={course}
          setCourse={setCourse}
          onChange={(updated) => {
            const modules = [...course.modules];
            modules[idx] = updated;
            setCourse({ ...course, modules });
          }}
          setStep={setStep}
          onAddContent={(type, editIndex) =>
            setContentStep({
              type,
              moduleIndex: idx,
              editIndex,
            })
          }
        />
      ))}
      <div className="flex justify-end">
        <PrimaryButton
          course={course}
          onClick={() =>
            setCourse({
              ...course,
              modules: [...course.modules, createEmptyModule()],
            })
          }
        >
          <Plus size={16} /> Add Module
        </PrimaryButton>
      </div>
    </div>
  );
}

/* -------------------------------------
   Reusable UI
------------------------------------- */
function CardHeader({ title, subtitle }) {
  return (
    <div>
      <h1 className="text-lg font-semibold">{title}</h1>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
}
function Input({ label, value, onChange, type = "text" }) {
  const toLower = (text = "") => text.toLowerCase();
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        value={value}
        type={type}
        placeholder={`Enter ${toLower(label)}`}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-md p-2 text-xs mt-1 border-gray-200  focus:outline-none"
      />
    </div>
  );
}

function ArrayInput({ label, values, onChange }) {
  const [text, setText] = useState("");

  const addItem = () => {
    if (!text.trim()) return;
    onChange([...values, text.trim()]);
    setText("");
  };

  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>

      <div className="w-full relative">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // ⛔ stop form submit
              addItem();
            }
          }}
          className="w-full border-b border-gray-300 outline-none"
        />

        <button
          type="button" // ⛔ prevent form submit
          className="absolute right-0 bottom-4 text-xl"
          onClick={addItem}
        >
          +
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {values.map((v, i) => (
          <span key={i} className="px-2 py-1 bg-gray-100 rounded text-xs">
            {v}
          </span>
        ))}
      </div>
    </div>
  );
}

function PrimaryButton({ children, onClick, course }) {
  return (
    <button
      disabled={!course.title}
      onClick={onClick}
      className={` text-white px-4 py-2 rounded-md flex items-center gap-2 ${!course.title ? "bg-gray-400 cursor-not-allowed" : "bg-primary cursor-pointer"}`}
    >
      {children}
    </button>
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
