import React from "react";
import { ArrowLeft } from "lucide-react";

export function AddDocument({ onBack, onSave, initialData }) {
const emptyDoc = {
  file: null,
  title: "",
  description: "",
  duration: "",
  objectives: [],
  type: "",
};

const [doc, setDoc] = React.useState(emptyDoc);

React.useEffect(() => {
  if (initialData) {
    setDoc({ ...initialData });
  } else {
    setDoc(emptyDoc);
  }
}, [initialData]);

  return (
    <div className="bg-sidebar border border-gray-200 rounded-xl p-2 sm:p-6 mx-auto space-y-4 ">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="cursor-pointer">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h2 className="font-semibold">Add Document</h2>
          <p className="text-sm text-gray-500">
            Upload and configure document content
          </p>
        </div>
      </div>
      <div className="p-2 md:p-6 space-y-2 bg-white rounded-lg border border-gray-100">
        <div>
          <p className="text-sm text-gray-600">Document File</p>
          <label className="border-2 border-gray-200 border-dashed rounded-lg p-6 flex flex-col items-center text-sm text-gray-500 cursor-pointer mt-2">
            <input
              type="file"
              className="hidden"
              onChange={(e) => setDoc({ ...doc, file: e.target.files[0] })}
            />
            Click to upload document or drag & drop
            <span className="text-xs mt-1">PDF, DOC, PPT, XLS (50MB max)</span>
          </label>
        </div>
        <Input
          label="Document Title"
          value={doc.title}
          onChange={(v) => setDoc({ ...doc, title: v })}
        />

        <Textarea
          label="Description"
          value={doc.description}
          onChange={(v) => setDoc({ ...doc, description: v })}
        />

        <Input
          label="Reading Time / Duration"
          type = "number"
          value={doc.duration}
          onChange={(v) => setDoc({ ...doc, duration: v })}
        />

      
        <ArrayInput
          label="Learning Objectives"
          values={doc.objectives}
           onChange={(v) => setDoc({ ...doc, objectives: v })}
        />

        <Input
          label="Document Type"
          value={doc.type}
          onChange={(v) => setDoc({ ...doc, type: v })}
        />

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onBack}
            className="px-4 py-2 border rounded-md border-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(doc)}
            className="px-4 py-2 bg-primary text-white rounded-md"
          >
            Save Document
          </button>
        </div>
      </div>
    </div>
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
        placeholder={`Enter ${toLower(label)}`}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-md p-2 text-xs lg:text-sm mt-1 border-gray-200  focus:outline-none"
      />
    </div>
  );
}

function Textarea({ label, value, onChange }) {
  const toLower = (text = "") => text.toLowerCase();
  return (
    <div>
      <label className="text-sm text-gray-600 mb-1">{label}</label>
      <textarea
        value={value}
        placeholder={`Enter ${toLower(label)}`}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        className="w-full border border-gray-200 text-xs lg:text-sm mt-1 rounded-md p-2 outline-none"
      />
    </div>
  );
}

function ArrayInput({ label, values, onChange }) {
  const [text, setText] = React.useState("");

  const addItem = () => {
    if (!text.trim()) return;
    onChange([...values, text.trim()]);
    setText("");
  };

  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>

      <div className="w-full relative mt-1">
        <input
          value={text}
          placeholder="Press Enter to add objective"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addItem();
            }
          }}
          className="w-full border rounded-md p-2 text-xs border-gray-200 lg:text-sm outline-none"
        />

        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-lg"
          onClick={addItem}
        >
          +
        </button>
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-2 mt-2">
        {values.map((v, i) => (
          <span
            key={i}
            className="px-2 py-1 bg-gray-100 rounded text-xs flex items-center gap-1"
          >
            {v}
            <button
              type="button"
              onClick={() => onChange(values.filter((_, idx) => idx !== i))}
              className="text-gray-400 hover:text-red-500"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
