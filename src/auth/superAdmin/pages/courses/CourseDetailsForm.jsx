import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export function CourseDetailsForm({
  course,
  setCourse,
  onBack,
  onNext,
  isEditMode,
}) {
  return (
    <div className="bg-sidebar border border-gray-200 rounded-xl px-2 py-4 mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <button onClick={onBack} className="cursor-pointer">
          <ArrowLeft size={18} />
        </button>

        <CardHeader
          title={isEditMode ? "Edit Course" : "Create Course"}
          subtitle={
            isEditMode ? "Update course details" : "Enter Course Details"
          }
        />
      </div>

      {/* Form */}
      <div className="px-6 space-y-1">
        <Input
          label="Course Title"
          value={course.title}
          onChange={(v) => setCourse({ ...course, title: v })}
        />

        <Input
          label="Course Sub-heading"
          value={course.subTitle}
          onChange={(v) => setCourse({ ...course, subTitle: v })}
        />

        <ArrayInput
          label="Learning Outcomes"
          values={course.outcomes}
          onChange={(vals) => setCourse({ ...course, outcomes: vals })}
        />

        <ArrayInput
          label="Tags"
          values={course.tags}
          onChange={(vals) => setCourse({ ...course, tags: vals })}
        />

        <div className="flex justify-end">
          <PrimaryButton course={course} onClick={onNext}>
            Next Step
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------
   Local UI Helpers (can be shared later)
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
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-b  text-xs lg:text-sm mt-1 border-gray-200  focus:outline-none"
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
