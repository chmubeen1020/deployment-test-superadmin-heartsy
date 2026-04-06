import { Clock, Check, Pencil, Trash2 } from "lucide-react";

export function VideoCard({
  video,
  index,
  onEdit,
  onDelete,
}) {
  return (
    <div className="border border-primary/30 rounded-lg px-4 py-2 flex gap-4">
      {/* Thumbnail / Preview */}
      <div className="w-1/6 h-20 overflow-hidden flex items-center justify-center">
        {video.thumbnail ? (
          <img
            src={URL.createObjectURL(video.thumbnail)}
            alt={video.title}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : video.file ? (
          <video
            src={URL.createObjectURL(video.file)}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <span className="text-xs text-gray-400">No Preview</span>
        )}
      </div>

      {/* Details */}
      <div className="w-3/6 space-y-1">
        <p className="text-gray-700 text-lg font-medium">
          {video.title || "Untitled video"}
        </p>

        <p className="text-xs text-gray-500 line-clamp-2">
          {video.description || "No description"}
        </p>

        {video.duration && (
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Clock size={12} />
            {video.duration} min
          </div>
        )}
      </div>

      {/* Objectives */}
      <div className="w-1/6 border border-gray-200 rounded-lg px-2 py-1 h-[80px] overflow-y-auto">
        {video.objectives?.length ? (
          video.objectives.map((obj, i) => (
            <div key={i} className="flex items-start gap-2">
              <Check size={12} className="text-green-500 mt-1" />
              <p className="text-xs text-gray-600 truncate">{obj}</p>
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-400 text-center">
            No objectives
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="w-1/6 flex flex-col items-end gap-2">
        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
          Video #{index + 1}
        </span>

        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="text-gray-500 hover:text-primary"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={onDelete}
            className="text-gray-500 hover:text-red-500"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
