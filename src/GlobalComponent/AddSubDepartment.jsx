import { X} from "lucide-react";



const AddSubDepartmentModal = ({ open, onClose }) => {
// close dropdown on outside click

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Add New Sub Department
          </h2>
          <button onClick={onClose}>
            <X size={18} className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* Assessment Dropdown */}
        <div className="mb-6">
          <input type="text" name="name" placeholder="Sub Department Name" className="w-full py-4 px-2 border-b border-gray-200 focus:outline-none" />
        </div>


        {/* Actions */}
        <div className="flex justify-end">
          <button
            className={`px-5 py-2 rounded-lg text-sm text-white bg-primary transition`}
          >
            Add New Sub Department
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSubDepartmentModal;
