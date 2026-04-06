import React, { useState } from "react";
import { 
  SlidersHorizontal, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  X, 
  Link2
} from "lucide-react";
import ComingSoonOverlay from "../../CommingSoon";

const DUMMY_REQUESTS = [
  {
    id: 1,
    user: "Sarah Chen",
    subtext: "Meeting Agenda",
    time: "04:45 PM",
    date: "05/02/2026",
    note: "Lorem Ipsum emit browser dummy t...",
    status: "Pending",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    id: 2,
    user: "Sarah Chen",
    subtext: "Meeting Agenda",
    time: "11:45 PM",
    date: "05/02/2026",
    note: "Lorem Ipsum emit browser dummy t...",
    status: "Accepted",
    avatar: "https://i.pravatar.cc/150?u=chen"
  },
  {
    id: 3,
    user: "Sarah Chen",
    subtext: "Meeting Agenda",
    time: "02:45 PM",
    date: "05/02/2026",
    note: "Lorem Ipsum emit browser dummy t...",
    status: "Rejected",
    avatar: "https://i.pravatar.cc/150?u=sc"
  }
];

const VirtualCourseRequests = () => {
  const [selectedAll, setSelectedAll] = useState(false);
  const isFeatureLocked = true;

  const getStatusStyles = (status) => {
    switch (status) {
      case "Pending": return "bg-blue-50 text-blue-500 border-blue-100";
      case "Accepted": return "bg-green-50 text-green-600 border-green-100";
      case "Rejected": return "bg-red-50 text-red-500 border-red-100";
      default: return "bg-gray-50 text-gray-500";
    }
  };

  return (
    <div className="w-full p-2">
       {isFeatureLocked && (
        <ComingSoonOverlay 
          title="Virtual Course" 
          description="Exciting things are on the way! We are building a more robust experience for our community. Check back shortly for full access."
        />
      )}
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="w-full sm:w-1/2 flex items-center gap-3">
          <h1 className="text-xl text-gray-800">Virtual Course Requests</h1>
          <span className="bg-purple-100 text-primary text-xs font-bold px-2.5 py-0.5 rounded-full">27</span>
        </div>
        <div className="w-full sm:w-1/2 flex justify-end">
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 font-medium text-sm hover:bg-gray-50 transition-all">
          <SlidersHorizontal size={16} />
          Filters
        </button>
        </div>
      </div>

      {/* Select All Row */}
      <div className="flex items-center gap-3 mb-6 px-2">
        <input 
          type="checkbox" 
          checked={selectedAll}
          onChange={() => setSelectedAll(!selectedAll)}
          className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer" 
        />
        <span className="text-sm text-gray-500">Select all</span>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto md:px-2 xl::px-4">
        <table className="w-full text-left min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="pb-2 px-2 w-10"></th>
              <th className="pb-2 text-xs md:text-sm font-normal text-gray-500">User</th>
              <th className="pb-2 text-xs md:text-sm font-normal text-gray-500 text-center">Time</th>
              <th className="pb-2 text-xs md:text-sm font-normal text-gray-500 text-center">Date</th>
              <th className="pb-2 text-xs md:text-sm font-normal text-gray-500">Note</th>
              <th className="pb-2 text-xs md:text-sm font-normal text-gray-500">Status</th>
              <th className="pb-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {DUMMY_REQUESTS.map((item) => (
              <tr key={item.id} className="group hover:bg-gray-50/50 transition-colors">
                <td className="py-3 px-2">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary" />
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <img src={item.avatar} alt={item.user} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="text-sm md:text-base font-medium text-gray-800">{item.user}</p>
                      <p className="text-xs md:text-sm text-gray-500">{item.subtext}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 text-center text-xs  text-gray-500">{item.time}</td>
                <td className="py-3 text-center text-xs  text-gray-500">{item.date}</td>
                <td className="py-3 text-xs text-gray-500 max-w-[200px] truncate">{item.note}</td>
                <td className="py-3">
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getStatusStyles(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-3 text-right">
                  <div className="flex items-center justify-end gap-4 px-2">
                    {item.status === "Pending" ? (
                      <>
                        <button className="text-green-600 hover:scale-110 transition-transform"><Check size={22} /></button>
                        <button className="text-red-600 hover:scale-110 transition-transform"><X size={22} /></button>
                      </>
                    ) : item.status === "Accepted" ? (
                      <button className="text-gray-500 hover:text-primary transition-colors"><Link2 size={22} /></button>
                    ) : (
                      <button className="text-green-600"><Check size={22} /></button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Pagination */}
      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <button className="p-2 border border-gray-100 rounded-lg text-gray-300 hover:bg-gray-50"><ChevronLeft size={20} /></button>
          <button className="w-10 h-10 rounded-lg bg-purple-50 text-primary border border-primary/40 font-bold text-sm">1</button>
          <button className="w-10 h-10 rounded-lg text-gray-500 hover:bg-gray-50 border border-gray-300 font-medium text-sm">2</button>
          <button className="w-10 h-10 rounded-lg text-gray-500 hover:bg-gray-50 border border-gray-300 font-medium text-sm">3</button>
          <span className="text-gray-300 px-1">...</span>
          <button className="w-10 h-10 rounded-lg text-gray-500 hover:bg-gray-50 border border-gray-300 font-medium text-sm">99</button>
          <button className="p-2 border border-gray-100 rounded-lg text-gray-300 hover:bg-gray-50"><ChevronRight size={20} /></button>
        </div>
      </div>
    </div>
  );
};

export default VirtualCourseRequests;