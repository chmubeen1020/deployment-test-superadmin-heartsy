import { FileText , FileSpreadsheet, Clock, Check, Pencil, Trash2 } from "lucide-react";

const getDocIcon = (type = "") => {
  if (type.includes("pdf")) return  FileText;
  if (type.includes("word")) return FileText ;
  if (type.includes("sheet")) return FileSpreadsheet;
  return FileText;
};

export function DocumentCard({
  doc,
  index,
  onEdit,
  onDelete,
}) {
  const Icon = getDocIcon(doc.type || doc.file?.type || "");

  return (
    <div className="border border-primary/30 rounded-lg px-4 py-2 flex gap-4">
      {/* Icon */}
      <div className="w-1/6 flex items-center justify-center bg-gray-100 rounded-lg h-20">
        <Icon size={32} className="text-primary" />
      </div>

      {/* Details */}
      <div className="w-3/6 space-y-1">
        <p className="text-gray-700 font-medium">
          {doc.title || "Untitled document"}
        </p>

        <p className="text-xs text-gray-500 line-clamp-2">
          {doc.description || "No description"}
        </p>

        {doc.duration && (
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Clock size={12} />
            {doc.duration }  min
          </div>
        )}
      </div>

      {/* Objectives */}
      <div className="w-1/6 border border-gray-200 rounded-lg px-2 py-1 h-[80px] overflow-y-auto">
        {doc.objectives?.length ? (
          doc.objectives.map((obj, i) => (
            <div key={i} className="flex items-start gap-2">
              <Check size={12} className="text-green-500 mt-1" />
              <p className="text-xs text-gray-600 truncate">
                {obj}
              </p>
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
          Doc #{index + 1}
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
