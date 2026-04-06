import React from "react";
import { ArrowLeft, Edit, Trash2, Upload } from "lucide-react";
import VideoPreview from "../../../../GlobalComponent/VideoPreview";

const emptyVideo = {
  id: crypto.randomUUID(),
  file: null,
  title: "",
  description: "",
  duration: "",
  objectives: [],
  thumbnail: null,
};

export function AddVideo({ onBack, onSave, initialData }) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const videoInputRef = React.useRef(null);
  const thumbInputRef = React.useRef(null);
  const videoRef = React.useRef(null); // ✅ ALSO REQUIRED (see below)

  const [video, setVideo] = React.useState(emptyVideo);

  React.useEffect(() => {
    if (initialData) {
      setVideo({ ...initialData });
    } else {
      setVideo({
        id: crypto.randomUUID(),
        file: null,
        title: "",
        description: "",
        duration: "",
        objectives: [],
        thumbnail: null,
      });
    }
  }, [initialData]);
  React.useEffect(() => {
    setIsPlaying(false);
  }, [video.file]);

  React.useEffect(() => {
    return () => {
      if (video.file) URL.revokeObjectURL(video.file);
      if (video.thumbnail) URL.revokeObjectURL(video.thumbnail);
    };
  }, [video.file, video.thumbnail]);

  return (
    <div className="bg-sidebar border border-gray-200 rounded-xl p-2 sm:p-6 mx-auto space-y-4 ">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="cursor-pointer">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h2 className="font-semibold">Add Video</h2>
          <p className="text-sm text-gray-500">
            Upload and configure video content
          </p>
        </div>
      </div>

      <div className="p-2 md:p-6 space-y-2 bg-white rounded-lg border border-gray-100">
        {/* Video upload */}
        {/* Video Upload */}
        {video.file ? (
          <div className="border border-gray-200 rounded-lg p-2 flex justify-between items-center">
            {/* Preview */}

            <VideoPreview video={video} height="h-40" rounded="rounded-lg" />

            {/* Actions */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => videoInputRef.current.click()}
                className="px-3 py-1 text-sm "
              >
                <Edit size={16} />
              </button>

              <button
                type="button"
                onClick={() => setVideo({ ...video, file: null })}
                className="px-3 py-1 text-sm text-red-600 "
              >
                <Trash2 size={16} />
              </button>
            </div>

            {/* Hidden input */}
            <input
              ref={videoInputRef}
              type="file"
              hidden
              accept="video/*"
              onChange={(e) => setVideo({ ...video, file: e.target.files[0] })}
            />
          </div>
        ) : (
          <div>
          <p className="text-sm text-gray-600">Video File</p>
          <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center text-sm text-gray-500 cursor-pointer mt-2">
            <input
              type="file"
              hidden
              accept="video/*"
              onChange={(e) => setVideo({ ...video, file: e.target.files[0] })}
            />
            <Upload size={32} className="mb-2" />
            Click to upload video or drag and drop
            <span>MP4 up to 500MB to 2GB</span>
          </label>
          </div>
        )}

        <Input
          label="Video Title"
          value={video.title}
          onChange={(v) => setVideo({ ...video, title: v })}
        />

        <Textarea
          label="Description"
          value={video.description}
          onChange={(v) => setVideo({ ...video, description: v })}
        />

        <Input
          label="Duration"
          value={video.duration}
          type = "number"
          onChange={(v) => setVideo({ ...video, duration: v })}
        />

        <ArrayInput
          label="Learning Objectives"
          values={video.objectives}
          onChange={(vals) => setVideo({ ...video, objectives: vals })}
        />

        {/* Thumbnail */}
        {/* Thumbnail Upload */}
        {video.thumbnail ? (
          <div className="border border-gray-200 rounded-lg p-2 flex justify-between items-center">
            {/* Preview */}
            <img
              src={URL.createObjectURL(video.thumbnail)}
              alt="Thumbnail"
              className="w-full max-w-xs h-32 object-cover rounded-md"
            />

            {/* Actions */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => thumbInputRef.current.click()}
                className="px-3 py-1 text-sm "
              >
                <Edit size={16} />
              </button>

              <button
                type="button"
                onClick={() => setVideo({ ...video, thumbnail: null })}
                className="px-3 py-1 text-sm text-red-600 "
              >
                <Trash2 size={16} />
              </button>
            </div>

            {/* Hidden input */}
            <input
              ref={thumbInputRef}
              type="file"
              hidden
              accept="image/*"
              onChange={(e) =>
                setVideo({ ...video, thumbnail: e.target.files[0] })
              }
            />
          </div>
        ) : (
          <div>
            <p className="text-sm text-gray-600">Thumbnail (Optional)</p>
          
          <label className="border-2 border-dashed border-gray-300 rounded-lg p-3 flex items-center justify-center gap-2 text-sm cursor-pointer mt-2">
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) =>
                setVideo({ ...video, thumbnail: e.target.files[0] })
              }
            />
            <Upload size={18} />
            Upload thumbnail image
          </label>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={onBack}
          className="px-4 py-2 border rounded-md border-gray-200"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(video)}
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          Save Video
        </button>
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
        className="w-full border border-gray-200 text-xs lg:text-sm mt-1 rounded-md p-2 outline-none "
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
          className="w-full border rounded-md p-2 text-xs lg:text-sm border-gray-200 outline-none"
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

