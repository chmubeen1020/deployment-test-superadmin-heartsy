import React, { useState } from "react";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";

const InvoiceManagement = () => {
  // Dummy Data
  const initialData = [
    { id: "#23456", date: "23 Jan 2023", plan: "Basic Plan", amount: "$1200", status: "Paid" },
    { id: "#56489", date: "23 Feb 2023", plan: "Pro Plan", amount: "$7000", status: "Paid" },
    { id: "#56489", date: "23 Mar 2023", plan: "Pro Plan", amount: "$7000", status: "Paid" },
    { id: "#98380", date: "23 Apr 2023", plan: "Growth Plan", amount: "$5698", status: "Paid" },
    { id: "#90394", date: "23 May 2023", plan: "Basic Plan", amount: "$1200", status: "Paid" },
    { id: "#929348", date: "23 Jun 2023", plan: "Growth Plan", amount: "$1200", status: "Paid" },
    { id: "#48394", date: "23 Jul 2023", plan: "Growth Plan", amount: "$5698", status: "Pending" },
    // Adding more to demonstrate pagination
    { id: "#11223", date: "23 Aug 2023", plan: "Pro Plan", amount: "$7000", status: "Paid" },
    { id: "#44556", date: "23 Sep 2023", plan: "Basic Plan", amount: "$1200", status: "Paid" },
    { id: "#77889", date: "23 Oct 2023", plan: "Growth Plan", amount: "$5698", status: "Paid" },
    { id: "#99001", date: "23 Nov 2023", plan: "Pro Plan", amount: "$7000", status: "Paid" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = initialData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(initialData.length / itemsPerPage);

  return (
    <div className="w-full p-4 md:p-6 bg-sidebar rounded-2xl border border-gray-100 shadow-sm">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-xl text-gray-800">Invoice</h2>
          <p className="text-sm text-[#6C6E7E]">Effortlessly handle your billing and invoices right here.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
          <Download size={18} />
          PDF
        </button>
      </div>

      {/* Table Section with Horizontal Scroll */}
      <div className="w-full overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[800px] border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left text-gray-500 text-sm font-normal">
              <th className="pb-2 px-4 font-normal">Invoice ID <span className="ml-1 text-[10px]">▼</span></th>
              <th className="pb-2 px-4 font-normal">Billing Date <span className="ml-1 text-[10px]">▼</span></th>
              <th className="pb-2 px-4 font-normal">Plan <span className="ml-1 text-[10px]">▼</span></th>
              <th className="pb-2 px-4 font-normal">Amount <span className="ml-1 text-[10px]">▼</span></th>
              <th className="pb-2 px-4 font-normal text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index} className="bg-white rounded-xl transition-shadow">
                <td className="py-4 px-4 rounded-l-xl text-sm font-nromal text-gray-700">{item.id}</td>
                <td className="py-4 px-4 text-sm text-gray-600 font-normal">{item.date}</td>
                <td className="py-4 px-4 text-sm text-gray-600 font-normal">{item.plan}</td>
                <td className="py-4 px-4 text-sm text-gray-700 font-normal">{item.amount}</td>
                <td className="py-4 px-4 text-center rounded-r-xl">
                  <span className={`px-6 py-1.5 rounded-full text-xs font-medium ${
                    item.status === 'Paid' 
                    ? 'bg-[#E1FFDC] text-[#07A104]' 
                    : 'bg-[#E1FFDC] text-[#E2B102]'
                  }`}>
                    {item.status}
                  </span>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-8 flex items-center justify-center gap-2">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={20} className="text-gray-500" />
        </button>
        
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-semibold transition-all ${
              currentPage === i + 1 
              ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
              : 'border border-gray-200 text-gray-500 hover:bg-gray-50'
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight size={20} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default InvoiceManagement;