import React, { useState } from "react";
import {
  Plus,
  PlayCircle,
  FileText,
  Eye,
  Play,
  Download,
  ArrowLeft,
} from "lucide-react";
import { AddVideo } from "./AddVideo";
import { AddDocument } from "./AddDocument";
import { VideoLessonDetail } from "./VideoLessonDetail";
import { DocumentLessonDetail } from "./DocumentLessonDetail";

const lessons = [
  {
    id: 1,
    type: "video",
    title: "Introduction to Change Psychology",
    duration: "15 Minutes",
    status: "Completed",
  },
  {
    id: 2,
    type: "video",
    title: "Understanding Resistance",
    duration: "20 Minutes",
    status: "Completed",
  },
  {
    id: 3,
    type: "video",
    title: "The Change Curve Model",
    duration: "25 Minutes",
  },
  {
    id: 4,
    type: "doc",
    title: "Change Psychology Workbook",
    duration: "30 Minutes",
    file: "PDF · 2.5 MB",
  },
  {
    id: 5,
    type: "video",
    title: "Building Buy-In Strategies",
    duration: "18 Minutes",
  },
  {
    id: 6,
    type: "doc",
    title: "Reading Materials",
    duration: "25 Minutes",
    file: "PDF · 1.8 MB",
  },
];

export default function SuperAdminModuleContent({setSelectedLesson}) {
  const [videoModal, setVideoModal] = React.useState({
    open: false,
    initialData: null, // null = add
  });
  const [documentModal, setDocumentModal] = React.useState({
    open: false,
    initialData: null, // null = add mode
  });


  const openAddVideo = () => {
    setVideoModal({
      open: true,
      initialData: null,
    });
  };

  const closeVideoModal = () => {
    setVideoModal({
      open: false,
      initialData: null,
    });
  };
  const openAddDocument = () => {
    setDocumentModal({
      open: true,
      initialData: null,
    });
  };

  const openEditDocument = (doc) => {
    setDocumentModal({
      open: true,
      initialData: doc,
    });
  };

  const closeDocumentModal = () => {
    setDocumentModal({
      open: false,
      initialData: null,
    });
  };


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="font-semibold">Module Lessons</h2>
        <div className="w-full sm:w-fit flex gap-2">
          <ActionButton onClick={openAddVideo}>
            + Add Lesson (Video)
          </ActionButton>
          <ActionButton onClick={openAddDocument}>
            + Add Lesson (Document)
          </ActionButton>
        </div>
      </div>

      {/* Lessons */}
      <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-200">
        {lessons.map((l, i) => (
          <div
            key={l.id}
            className="w-full py-2 px-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <span className="w-8 h-8 hidden md:flex items-center justify-center rounded bg-[#DCFCE7] text-sm">
                {i + 1}
              </span>

              {l.type === "video" ? (
                <div className="w-full md:w-30 h-32 md:h-18 border border-gray-200 bg-black rounded-md flex items-center justify-center">
                  <div className="bg-gray-100 rounded-full h-8 w-8 flex justify-center items-center">
                    <Play className="text-primary" size={18} />
                  </div>
                </div>
              ) : (
                <div className="w-full md:w-30 h-32 md:h-18 border border-gray-200 rounded-md flex items-center justify-center">
                  <div>
                    <FileText className="text-primary" size={18} />
                  </div>
                </div>
              )}

              <div>
                <p className="text-sm font-medium flex items-center gap-2">
                  {l.title}
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-normal">
                    {l.type}
                  </span>
                  {l.status && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-normal">
                      {l.status}
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-600 truncate py-1">
                  Overview of psychological principles in change management
                </p>
                <p className="text-xs text-gray-500">
                  {l.duration}
                  {l.file && ` · ${l.file}`}
                </p>
              </div>
            </div>

            <div className="w-full flex justify-end items-end md:items-center gap-3">
              <Download size={18} className="text-primary" />
              <button onClick={() => setSelectedLesson(l)}>
                <Eye size={18} className="text-gray-500 hover:text-primary" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal open={videoModal.open} onClose={closeVideoModal}>
        <AddVideo
          initialData={videoModal.initialData}
          onBack={closeVideoModal}
          onSave={(video) => {
            console.log("Saved video:", video);

            // 🔗 later:
            // - push to lessons state
            // - call API
            // - update module content

            closeVideoModal();
          }}
        />
      </Modal>
      <Modal open={documentModal.open} onClose={closeDocumentModal}>
        <AddDocument
          initialData={documentModal.initialData}
          onBack={closeDocumentModal}
          onSave={(doc) => {
            console.log("Saved document:", doc);

            // 🔗 Later you can:
            // - push into module.documents
            // - call API
            // - sync lessons list

            closeDocumentModal();
          }}
        />
      </Modal>
    </div>
  );
}

function ActionButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full sm:w-fit bg-primary text-white text-sm px-3 py-2 rounded-md flex items-center justify-center gap-1"
    >
      {children}
    </button>
  );
}

function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Content */}
      <div
        className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-2"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
