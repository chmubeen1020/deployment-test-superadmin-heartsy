import React from "react";
import {
  BookOpen,
  FileText,
  Pencil,
  Trash2,
  CirclePlay,
  Edit,
} from "lucide-react";

export default function ModuleOverview() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={<BookOpen size={20} />}
          title="Total Lessons"
          value="8"
          bg="bg-green-50"
          text="text-green-600"
        />
        <StatCard
          icon={<CirclePlay size={20} />}
          title="Videos"
          value="12"
          bg="bg-blue-50"
          text="text-primary"
        />
        <StatCard
          icon={<FileText size={20} />}
          title="Documents"
          value="5"
          bg="bg-purple-50"
          text="text-primary"
        />
      </div>

      {/* Module Card */}
      <div className="border border-gray-200 rounded-xl bg-purple-50 p-5 flex flex-col sm:flex-row justify-between gap-4">
        <div className="w-full sm:w-2/3 flex items-start justify-start gap-4">
          <div className="hidden sm:block bg-primary/10 text-primary px-2 py-2 rounded-lg h-fit">
            <BookOpen />
          </div>
          <div className="space-y-1">
            <h2 className="font-semibold text-lg">
              Understanding Change Psychology
            </h2>
            <span className="text-xs text-gray-500">Beginner</span>
            <p className="text-sm text-gray-600 max-w-2xl">
              Enhance your already strong communication skills with advanced
              techniques for difficult conversations. Learn the psychological
              principles behind organizational change.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <span className="text-sm text-gray-600">1 Week</span>
          <button className="text-gray-600">
            <Edit size={16} />
          </button>
          <button className="text-red-500">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, bg, text }) {
  return (
    <div className={`${bg} border border-gray-200 rounded-xl p-4 space-y-1`}>
      <div className={`flex items-center gap-2 text-sm font-medium ${text}`}>
        {icon}
        {title}
      </div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  );
}
