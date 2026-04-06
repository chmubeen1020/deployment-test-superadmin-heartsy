import React, { useEffect, useRef, useState } from "react";
import {
  CalendarCheck2,
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  Search,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ComingSoonOverlay from "../../CommingSoon";
import { Icon } from "../../../../assets";

/* ======================
   Dummy Company Data
====================== */
const initialCompanyData = [
  {
    id: 1,
    name: "Design Corp",
    employees: 184,
    industry: "IT Services",
    lastActivity: "Aug 17, 2025",
    status: "Active",
  },
  {
    id: 2,
    name: "Engineering Ltd",
    employees: 14,
    industry: "IT Services",
    lastActivity: "Aug 17, 2025",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Marketing Group",
    employees: 84,
    industry: "IT Services",
    lastActivity: "Aug 17, 2025",
    status: "Active",
  },
  {
    id: 4,
    name: "Development Hub",
    employees: 18,
    industry: "IT Services",
    lastActivity: "Aug 17, 2025",
    status: "Active",
  },
];

const SuperAdminCompanyManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [companies, setCompanies] = useState(initialCompanyData);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [openId, setOpenId] = useState(null);
  const navigate = useNavigate();

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
      prev.includes(id)
        ? prev.filter((cid) => cid !== id)
        : [...prev, id]
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
const isFeatureLocked = true;
  return (
    <div className="relative p-2 ">
      {isFeatureLocked && (
        <ComingSoonOverlay 
          title="User Management" 
          description="Exciting things are on the way! We are building a more robust experience for our community. Check back shortly for full access."
        />
      )}
      {/* Header */}
      <div className="flex flex-col xl:flex-row justify-between xl:items-center mb-8 ">
        <div className="flex gap-2 items-center">
          <h1 className="text-xl">Companies</h1>
          <span className="text-xs bg-primary/10 text-primary rounded-full py-1 px-2 font-medium">
            27
          </span>
        </div>
        <div className="hidden xl:flex items-center space-x-4 w-full max-w-sm">
          <div className="relative w-full text-primary">
            <Search
              size={16}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary"
            />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full  pl-4 pr-4 py-2 rounded-lg border border-primary text-primary outline-none"
            />
          </div>
        </div>
       <div className="hidden xl:flex justify-between gap-4 items-center ">
         <div className=" border border-gray-200 py-2 px-4 rounded-lg font-medium flex items-center gap-2">
            <img src={Icon.Filter} alt="" className="w-4 h-4" />
            Filters
          </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg" onClick={() => navigate('/super-admin/user-management/add-company')}>
          Add New Company
        </button>
      </div>
      <div className="xl:hidden flex flex-col md:flex-row justify-between mt-2 xl:mt-0 gap-2 md:gap-0">
        <div className="flex items-center space-x-4 w-full md:max-w-sm lg:max-w-md">
          <div className="relative w-full text-primary">
            <Search
              size={16}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary"
            />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full  pl-4 pr-4 py-2 rounded-lg border border-primary text-primary outline-none"
            />
          </div>
        </div>
       <div className="flex justify-end md:justify-between gap-2 items-center ">
         <div className=" border border-gray-200 py-2 px-2 md:px-4 rounded-lg font-medium flex items-center gap-2">
            <img src={Icon.Filter} alt="" className="w-4 h-4" />
            Filters
          </div>
        <button className="bg-primary text-white px-2 md:px-4 py-2 rounded-lg" onClick={() => navigate('/super-admin/user-management/add-company')}>
          Add New Company
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

            <div className="flex-1 flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2">
                  <Link
                    to={`employees/company/${company.id}`}
                    className="text-lg font-medium text-gray-800"
                  >
                    {company.name}
                  </Link>

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
               <div className="flex items-center gap-2 mt-2">
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
                    <Link to={`manage-payment/${company.id}`} className="w-full text-left font-medium text-sm hover:text-primary">
                     Manage Payment
                    </Link>

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
  );
};

export default SuperAdminCompanyManagement;
