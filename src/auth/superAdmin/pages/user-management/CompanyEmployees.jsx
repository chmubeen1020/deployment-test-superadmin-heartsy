import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  CalendarCheck2,
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Icon , images } from "../../../../assets";

/* ======================
   Dummy Company Data
====================== */
const initialCompanyData = [
  {
    id: 1,
    name: "user 1",
    status: "Active",
    employees: 140,
    industry: "Software Agency",
    lastActivity: "Aug 17, 2025",
    profileCompletion: "40",
  },
  {
    id: 2,
    name: "user 2",
    status: "Inactive",
    employees: 58,
    industry: "Design Agency",
    lastActivity: "Aug 17, 2025",
    profileCompletion: "80",
  },
  {
    id: 3,
    name: "user 3",
    status: "Active",
    employees: 473,
    industry: "ABC Agency",
    lastActivity: "Aug 17, 2025",
    profileCompletion: "0",
  },
  {
    id: 4,
    name: "user 4",
    status: "Inactive",
    employees: 92,
    industry: "Consulting",
    lastActivity: "Aug 17, 2025",
    profileCompletion: "90",
  },
  {
    id: 5,
    name: "user 5",
    status: "Active",
    employees: 324,
    industry: "Marketing",
    lastActivity: "Aug 17, 2025",
    profileCompletion: "10",
  },
  {
    id: 6,
    name: "user 6",
    status: "Inactive",
    employees: 184,
    industry: "IT Services",
    lastActivity: "Aug 17, 2025",
    profileCompletion: "55",
  },
];

const CompanyEmployees = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [companies, setCompanies] = useState(initialCompanyData);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [openId, setOpenId] = useState(null);
  const navigate = useNavigate(); // 2. Initialize the navigate function

  // Function to go back to the previous URL
  const handleBack = () => {
    navigate(-1); 
  };

  const itemsPerPage = 3;
  const ref = useRef(null);

  /* ======================
     Outside click close
  ====================== */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpenId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ======================
     Pagination
  ====================== */
  const totalPages = Math.ceil(companies.length / itemsPerPage);
  const paginatedCompanies = companies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /* ======================
     Selection logic
  ====================== */
  const handleSelectAll = () => {
    if (selectedCompanies.length === paginatedCompanies.length) {
      setSelectedCompanies([]);
    } else {
      setSelectedCompanies(paginatedCompanies.map((c) => c.id));
    }
  };

  const handleSelectSingle = (id) => {
    setSelectedCompanies((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  /* ======================
     Status toggle
  ====================== */
  const toggleCompanyStatus = (id) => {
    setCompanies((prev) =>
      prev.map((company) =>
        company.id === id
          ? {
              ...company,
              status: company.status === "Active" ? "Inactive" : "Active",
            }
          : company
      )
    );
  };

  return (
    <div className="">
      <div className="relative flex-1 p-4 md:p-6 border border-gray-100 bg-gray-50 rounded-2xl">
        <div className="text-gray-600 flex items-center  gap-2 cursor-pointer" onClick={handleBack }>
          <ArrowLeft size={20} />
          Back
        </div>
        {/* Header */}
        <div className="flex flex-col xl:flex-row justify-between xl:items-center gap-2 mb-4 xl:mb-8 ">
          <div className="w-full xl:w-1/3 flex gap-2 items-center">
            <h1 className="text-xl">Company 1</h1>
            <span className="text-xs bg-primary/10 text-primary rounded-full py-1 px-2 font-medium">
              7
            </span>
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
        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={selectedCompanies.length === paginatedCompanies.length}
            onChange={handleSelectAll}
          />
          <span className="text-sm text-gray-600">Select all</span>
        </div>

        {/* Company Cards */}
        <div className="space-y-3">
          {paginatedCompanies.map((company) => (
            <div
              key={company.id}
              className="p-4 rounded-xl border border-gray-200 bg-sidebar flex items-center gap-4"
            >
              <input
                type="checkbox"
                checked={selectedCompanies.includes(company.id)}
                onChange={() => handleSelectSingle(company.id)}
              />

              <div className="flex-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                 <div>
                      <img src={images.Userpic} alt="" className="w-10" />
                    </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2
                      className="text-lg font-medium text-gray-800"
                    >
                      {company.name}
                    </h2>

                    <div className="w-1 h-1 rounded-full bg-[#557AA0] mt-2" />
                    <span
                      className={`mt-1 text-sm ${
                        company.status === "Active"
                          ? "text-[#557AA0]"
                          : "text-[#FF383C]"
                      }`}
                    >
                      {company.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-primary bg-primary/10 rounded-full py-1 text-center px-2">
                      {company.employees} Employees
                    </p>
                    <p className="text-xs text-primary bg-primary/10 rounded-full py-1 text-center px-2">
                      {company.industry}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[#6C6E7E] mt-1">
                    <CalendarCheck2 size={14} />
                    <span className="text-sm">
                      Last activity: {company.lastActivity}
                    </span>
                  </div>
                </div>
</div>
                {/* Dropdown */}
                <div
                  className="relative"
                  ref={openId === company.id ? ref : null}
                >
                  <button
                    onClick={() =>
                      setOpenId(openId === company.id ? null : company.id)
                    }
                  >
                    <Ellipsis size={18} />
                  </button>

                  {openId === company.id && (
                    <div className="absolute right-0 top-4 w-56 rounded-xl bg-white shadow-lg border border-gray-200 p-4 space-y-3 z-50">
                      <button className="w-full text-left font-medium text-sm hover:text-primary">
                        Manage Payment
                      </button>

                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">Active</span>
                        <button
                          onClick={() => toggleCompanyStatus(company.id)}
                          className={`relative inline-flex h-5 w-10 rounded-full transition ${
                            company.status === "Active"
                              ? "bg-primary"
                              : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 mt-[2px]  bg-white rounded-full transform transition ${
                              company.status === "Active"
                                ? "translate-x-5"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="border border-gray-200 px-3 py-2 rounded-md"
          >
            <ChevronLeft size={14} />
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-md border border-gray-200 ${
                currentPage === i + 1
                  ? "bg-primary/10 text-primary border-primary"
                  : ""
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="border border-gray-200 px-3 py-2 rounded-md"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyEmployees;
