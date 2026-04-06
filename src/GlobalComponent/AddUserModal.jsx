import { X, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function AddUserModal({ open, onClose }) {
  const modalRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  // Close on ESC
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [onClose]);

  if (!open) return null;

  return (
    <>
      {/* BACKDROP */}
      <div className="fixed inset-0  z-40 bg-black/30 backdrop-blur-sm" />

      {/* MODAL */}
      <div className="fixed inset-0 p-4 z-50 flex items-center justify-center">
        <div
          ref={modalRef}
          className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-neutral-900">
              Add New User
            </h2>
            <button onClick={onClose}>
              <X size={18} className="text-neutral-500 hover:text-neutral-700" />
            </button>
          </div>

          {/* FORM */}
          <form className="space-y-6">
            <Input label="Name" />
            <Dropdown label="Select Role*" options={["Admin", "Manager", "Employee"]} />
            <Dropdown label="Select Department*" options={["HR", "Engineering", "Design"]} />
            <Input label="Designation" />
            <Input label="Email*" />
            <Input label="Password*" type="password" />

            <button
              type="submit"
              className="mt-4 w-full rounded-lg bg-primary py-1.5 text-sm font-semibold text-white hover:bg-primary/90"
            >
              Add New User
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
function Dropdown({ label, options }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative py-1">

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          w-full flex items-center justify-between
          border-b border-neutral-200
          py-1  px-2
          text-neutral-800
        "
      >
        {value || `${label}`}
        <ChevronDown size={14} />
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-full rounded-lg bg-white shadow-lg border border-gray-200">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                setValue(opt);
                setOpen(false);
              }}
              className="
                w-full px-3 py-1 text-left text-sm
                hover:bg-primary/10
              "
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
function Input({ label, type = "text" }) {
  return (
    <div className="py-1">
     
      <input
        type={type}
        placeholder={label}
        className="
          w-full border-b border-neutral-200
          py-1 px-2
          outline-none
        "
      />
    </div>
  );
}
