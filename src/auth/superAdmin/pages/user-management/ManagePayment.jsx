import React from "react";
import {
  ArrowLeft,
  Download,
  Heart,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Icon } from "../../../../assets";

/* ======================
   Dummy
====================== */
const BILLING_HISTORY = [
  {
    id: 1,
    date: "Jan 6, 2025",
    desc: "Pro Plan - Monthly",
    amount: "$1,500",
    invoice: "INV-2025-001",
  },
  {
    id: 2,
    date: "Dec 6, 2024",
    desc: "Pro Plan - Monthly",
    amount: "$1,500",
    invoice: "INV-2024-012",
  },
  {
    id: 3,
    date: "Nov 6, 2024",
    desc: "Pro Plan - Monthly",
    amount: "$1,500",
    invoice: "INV-2024-011",
  },
];

const ManagePayment = () => {
  const navigate = useNavigate(); // 2. Initialize the navigate function

  // Function to go back to the previous URL
  const handleBack = () => {
    navigate(-1); 
  };




  return (
    <div className="p-2">
      <div className="relative flex-1 p-4 md:p-6 border border-gray-100 bg-gray-50 rounded-2xl">
        <div className="text-gray-600 flex items-center  gap-2 cursor-pointer" onClick={handleBack }>
          <ArrowLeft size={20} />
          Back
        </div>
        {/* Header */}
        <div className="flex flex-col xl:flex-row justify-between xl:items-center gap-2 mb-4 xl:mb-8 ">
          <div className="w-full xl:w-1/3 flex gap-2 items-center">
            <h1 className="text-xl">Company 1</h1>
          </div>
          <div className="flex flex-col xl:flex-row xl:items-center w-full gap-2 justify-between">
            <div className="relative w-full xl:max-w-md text-primary">
              <Search
                size={16}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary"
              />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-full  pl-4 pr-4 py-2 bg-transparent rounded-lg border border-primary/70 text-primary outline-none"
              />
            </div>
            <div className="flex justify-end">
            <button className="border border-gray-300 py-2 px-2 lg:px-4 text-sm md:text-base rounded-lg font-medium flex items-center gap-1 md:gap-2">
              <img src={Icon.Filter} alt="" className="w-4 h-4" />
              Filters
            </button>
            </div>
          </div>
            
        </div>

        {/* Select All */}
         <div className="space-y-4">
        <section className="border border-gray-100 rounded-2xl p-4 md:p-6 bg-white shadow-sm ">
          <div className="flex  justify-between items-start gap-2 md:gap-4 mb-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800">
                Current Subscription
              </h3>
              <p className="text-sm text-gray-500">
                Your current plan and usage details
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
            <div className="flex items-center gap-4">
              <div className="bg-purple-50 p-3 rounded-2xl text-primary">
                <Heart size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-medium">Pro</span>
                  <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
                    Active
                  </span>
                </div>
                <p className="text-sm text-gray-500">$1,500/month</p>
              </div>
            </div>
            <div>
              <p className="text-xs  text-gray-500 tracking-widest">
                Next Billing
              </p>
              <p className="text-base font-medium text-gray-800">02/15/2025</p>
            </div>
            <div>
              <p className="text-xs  text-gray-500 tracking-widest">
                Team Members
              </p>
              <p className="text-base font-medium text-gray-800">10 Users</p>
            </div>
            <div>
              <p className="text-xs  text-gray-500 tracking-widest">
                Credits Used this Months
              </p>
              <p className="text-base font-medium text-gray-800">10 Users</p>
            </div>
          </div>
        </section>
        <section className="md:hidden border border-gray-100 rounded-2xl p-4 md:p-6 bg-white shadow-sm ">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Billing History
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            View and download your past invoices
          </p>

          {/* Responsive Table Wrapper */}
          <div className="overflow-x-auto -mx-6 md:mx-0">
            <div className="inline-block min-w-full align-middle px-6 md:px-0">
              <div className="min-w-full text-left">
                <div className="divide-y divide-gray-50">
                  {BILLING_HISTORY.map((item) => (
                    <div
                      key={item.id}
                      className="text-sm text-gray-700  transition-colors py-2 space-y-1"
                    >
                      <p className="font-medium">{item.date}</p>
                      <p className="text-gray-500">{item.desc}</p>
                      <p className=" text-gray-600">{item.amount}</p>
                      <p className="text-gray-400 text-sm">
                        {item.invoice}
                      </p>
                      <p className="text-right">
                        <button className="inline-flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-xs  hover:bg-gray-50 transition-all">
                          <Download size={14} /> PDF
                        </button>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="hidden md:block border border-gray-100 rounded-2xl p-4 md:p-6 bg-white shadow-sm ">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Billing History
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            View and download your past invoices
          </p>

          {/* Responsive Table Wrapper */}
          <div className="overflow-x-auto -mx-6 md:mx-0 border rounded-lg">
            <div className="inline-block min-w-full align-middle px-6 md:px-0">
              <table className="min-w-full text-left">
                <thead>
                  <tr className=" bg-gray-200/60 border-gray-50 text-xs md:text-base ">
                    <th className="py-2 px-4 font-normal">Date</th>
                    <th className="py-2 px-4 font-normal">Description</th>
                    <th className="py-2 px-4 font-normal">Amount</th>
                    <th className="py-2 px-4 font-normal">Invoice</th>
                    <th className="py-2 px-4 font-normal text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {BILLING_HISTORY.map((item) => (
                    <tr
                      key={item.id}
                      className="text-sm text-gray-700 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-3 px-4 font-normal">{item.date}</td>
                      <td className="py-3 px-4 text-gray-500">{item.desc}</td>
                      <td className="py-3 px-4 font-normal text-gray-900">
                        {item.amount}
                      </td>
                      <td className="py-3 px-4 text-gray-400 font-normal">
                        {item.invoice}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="inline-flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-normal hover:bg-gray-50 transition-all">
                          <Download size={14} /> PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
      </div>
    </div>
  );
};

export default ManagePayment;
