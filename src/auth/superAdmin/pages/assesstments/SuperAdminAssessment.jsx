import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Plus,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Copy,
  Clock,
  ListChecks,
  Users,
  FileText,
  ClipboardCheckIcon,
  TextSelectionIcon,
  LucideNotebookText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ComingSoonOverlay from "../../CommingSoon";

/* -------------------- Dummy Data -------------------- */

const DUMMY_ASSESSMENTS = [
  {
    id: 1,
    title: "Heart Work Profile® Leader Assessment",
    status: "Active",
    category: "Leadership",
    questions: 16,
    duration: "15-20 minutes",
    completions: 3250,
  },
  {
    id: 2,
    title: "Heart Work Profile® Leader Assessment",
    status: "Draft",
    category: "Leadership",
    questions: 16,
    duration: "15-20 minutes",
    completions: 3250,
  },
  {
    id: 3,
    title: "Heart Work Profile® Leader Assessment",
    status: "Inactive",
    category: "Leadership",
    questions: 16,
    duration: "15-20 minutes",
    completions: 3250,
  },
];

/* -------------------- Main Component -------------------- */

const SuperAdminAssessment = () => {
  const [assessments, setAssessments] = useState(DUMMY_ASSESSMENTS);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const isFeatureLocked = true;

  const [viewItem, setViewItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
 const navigate = useNavigate();
  /* Close dropdown on outside click */
  useEffect(() => {
    const close = () => setOpenMenuId(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const handleToggleStatus = (id) => {
    setAssessments((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === "Active" ? "Inactive" : "Active" }
          : a,
      ),
    );
  };

  const handleDuplicate = (item) => {
    setAssessments((prev) => [
      {
        ...item,
        id: Date.now(),
        status: "Draft",
        title: item.title + " (Copy)",
      },
      ...prev,
    ]);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {isFeatureLocked && (
        <ComingSoonOverlay 
          title="Assesstment" 
          description="Exciting things are on the way! We are building a more robust experience for our community. Check back shortly for full access."
        />
      )}
      {/* ---------------- Stats ---------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Assessments"
          value="4"
          sub="3 active"
          color="green"
          icon={<FileText size={16} />}
        />
        <StatCard
          title="Total Completions"
          value="8,924"
          sub="All time"
          color="blue"
          icon={<ClipboardCheckIcon size={16} />}
        />
        <StatCard
          title="Avg Questions"
          value="20"
          sub="Per assessment"
          color="purple"
          icon={<LucideNotebookText size={16} />}
        />
      </div>

      {/* ---------------- Header ---------------- */}
      <div className="p-4 bg-sidebar rounded-lg">
        <div className="flex items-center justify-between ">
          <h2 className="md:text-lg font-semibold text-slate-700">
            All Assessments
          </h2>
          <button onClick={() => navigate('create')} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90">
            <Plus size={16} /> Create Assessment
          </button>
        </div>

        {/* ---------------- List ---------------- */}
        <div className="space-y-3 mt-4">
          {assessments.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-semibold text-slate-800">
                    {item.title}
                  </h3>
                  <StatusBadge status={item.status} />
                  <Tag label={item.category} />
                </div>

                <div className="flex flex-col gap-1 text-xs text-slate-500">
                  <Meta
                    icon={<ListChecks size={14} />}
                    text={`Questions: ${item.questions}`}
                  />
                  <Meta
                    icon={<Clock size={14} />}
                    text={`Duration: ${item.duration}`}
                  />
                  <Meta
                    icon={<Users size={14} />}
                    text={`Completions: ${item.completions.toLocaleString()}`}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const rect = e.currentTarget.getBoundingClientRect();
                    setMenuPosition({
                      top: rect.bottom + window.scrollY + 6,
                      left: rect.left + window.scrollX - 120,
                    });
                    setOpenMenuId(item.id);
                  }}
                  className="p-2 rounded-lg hover:bg-slate-100"
                >
                  <MoreHorizontal size={16} className="text-gray-500" />
                </button>
                <Eye
                  size={16}
                  onClick={() => navigate(`view/1`)}
                  className="text-gray-500"
                />
                <Pencil
                  size={16}
                  onClick={() => navigate(`edit/1`)}
                  className="text-gray-500"
                />
                <Trash2 size={16} className="text-red-500" />
                {openMenuId === item.id &&
                  createPortal(
                    <ActionMenu
                      position={menuPosition}
                      item={item}
                      onDuplicate={() => handleDuplicate(item)}
                      onToggle={() => handleToggleStatus(item.id)}
                    />,
                    document.body,
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- Modals ---------------- */}
      {viewItem &&
        createPortal(
          <Modal title="View Assessment" onClose={() => setViewItem(null)}>
            <pre className="text-xs text-slate-600">
              {JSON.stringify(viewItem, null, 2)}
            </pre>
          </Modal>,
          document.body,
        )}

      {editItem &&
        createPortal(
          <Modal title="Edit Assessment" onClose={() => setEditItem(null)}>
            <p className="text-sm text-slate-600">
              Boilerplate edit form goes here.
            </p>
          </Modal>,
          document.body,
        )}
    </div>
  );
};

/* ---------------- Sub Components ---------------- */

const StatCard = ({ title, value, sub, color, icon }) => {
  const colors = {
    green: "border-green-300 bg-green-50 text-green-700",
    blue: "border-blue-300 bg-blue-50 text-blue-700",
    purple: "border-purple-300 bg-purple-50 text-purple-700",
  };
  return (
    <div className={`p-4 border rounded-xl ${colors[color]}`}>
      {icon}
      <div className="text-xs text-gray-800">{title}</div>
      <div className="text-xl font-bold text-gray-800">{value}</div>
      <div className="text-xs text-gray-800">{sub}</div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const map = {
    Active: "bg-purple-100 text-purple-700",
    Draft: "bg-slate-100 text-slate-600",
    Inactive: "bg-slate-200 text-slate-500",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium ${map[status]}`}
    >
      {status}
    </span>
  );
};

const Tag = ({ label }) => (
  <span className="px-2 py-0.5 rounded-full border border-gray-300 text-xs text-slate-500">
    {label}
  </span>
);

const Meta = ({ icon, text }) => (
  <span className="flex items-center gap-1">
    {icon} {text}
  </span>
);

const ActionMenu = ({ position, item, onDuplicate, onToggle }) => (
  <div
    style={{ top: position.top, left: position.left }}
    className="
      fixed z-[999] w-44
      bg-white border border-slate-200
      rounded-xl shadow-xl
      p-2 text-sm space-y-1
    "
  >
    {/* Duplicate */}
    <MenuItem label="Duplicate" onClick={onDuplicate} />

    {/* Active Toggle */}
    <div className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50">
      <span className="text-slate-700 font-medium">Active</span>

      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={item.status === "Active"}
          onChange={onToggle}
          className="sr-only peer"
        />
        <div
          className="
            w-9 h-5 bg-slate-200 rounded-full
            peer peer-checked:bg-[#6B69B2]
            after:content-['']
            after:absolute after:top-[2px] after:left-[2px]
            after:bg-white after:border after:border-slate-300
            after:rounded-full after:h-4 after:w-4
            after:transition-all
            peer-checked:after:translate-x-4
          "
        />
      </label>
    </div>
  </div>
);

const MenuItem = ({ icon, label, onClick, danger }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg ${
      danger ? "text-red-600 hover:bg-red-50" : "hover:bg-slate-50"
    }`}
  >
    {icon} {label}
  </button>
);

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 z-[999] bg-black/40 flex items-center justify-center p-4">
    <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-5">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold">{title}</h3>
        <button onClick={onClose}>✕</button>
      </div>
      {children}
    </div>
  </div>
);

export default SuperAdminAssessment;
