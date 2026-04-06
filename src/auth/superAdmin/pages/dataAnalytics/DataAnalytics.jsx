import React, { useEffect, useRef, useState } from "react";
import {
  CalendarCheck2,
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import ComingSoonOverlay from "../../CommingSoon";
import { Icon } from "../../../../assets";

// Dummy Data Object for Companies
const companyData = [
  {
    id: 1,
    name: "Company 1",
    status: "Active",
    employees: 140,
    industry: "Software Agency",
    lastActivity: "Aug 17, 2025",
  },
  {
    id: 2,
    name: "Company 2",
    status: "Inactive",
    employees: 58,
    industry: "Design Agency",
    lastActivity: "Aug 17, 2025",
  },
  {
    id: 3,
    name: "Company 3",
    status: "Active",
    employees: 473,
    industry: "ABC Agency",
    lastActivity: "Aug 17, 2025",
  },
  {
    id: 4,
    name: "Company 4",
    status: "Inactive",
    employees: 92,
    industry: "Consulting",
    lastActivity: "Aug 17, 2025",
  },
  {
    id: 5,
    name: "Company 5",
    status: "Active",
    employees: 324,
    industry: "Marketing",
    lastActivity: "Aug 17, 2025",
  },
  {
    id: 6,
    name: "Company 6",
    status: "Inactive",
    employees: 184,
    industry: "IT Services",
    lastActivity: "Aug 17, 2025",
  },
  // Add more if needed
];

const DataAnalytics = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const itemsPerPage = 3; // Number of cards per
  const [companies, setCompanies] = useState(companyData);
  const [openId, setOpenId] = useState(null);
  const ref = useRef(null);
    const isFeatureLocked = true;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpenId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  // Calculate the number of pages
  const totalPages = Math.ceil(companyData.length / itemsPerPage);

  // Get the companies for the current page
  const currentData = companyData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSelectAll = () => {
    if (selectedCompanies.length === currentData.length) {
      setSelectedCompanies([]);
    } else {
      setSelectedCompanies(currentData.map((company) => company.id));
    }
  };

  const handleSelectSingle = (id) => {
    setSelectedCompanies((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((companyId) => companyId !== id)
        : [...prevSelected, id]
    );
  };
  return (
    <div className="pb-4">
      {isFeatureLocked && (
        <ComingSoonOverlay 
          title="Data Analytics" 
          description="Exciting things are on the way! We are building a more robust experience for our community. Check back shortly for full access."
        />
      )}
      {/* Header Section */}
      <div className="flex justify-between items-center mb-2 md:mb-4 lg:mb-8 ">
        <div className="flex gap-2 items-center">
          <h1 className="text-xl">Companies</h1>
          <span className="text-xs bg-primary/10 text-primary rounded-full py-1 px-2 font-medium">
            27
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-4 w-full max-w-sm">
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
        <div>
          <div className=" border border-gray-200 py-2 px-4 rounded-lg font-medium flex items-center gap-2">
            <img src={Icon.Filter} alt="" className="w-4 h-4" />
            Filters
          </div>
        </div>
      </div>
      <div className="md:hidden flex items-center space-x-4 w-full mb-4 ">
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
      <div className="p-2 xl:p-6 space-y-2 lg:space-y-6">
        {/* Cards */}
        <div className="grid grid-cols-1 gap-2 lg:gap-4">
          <div className="flex items-center space-x-2">
            {/* Select all checkbox */}
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={selectedCompanies.length === currentData.length}
              onChange={handleSelectAll}
            />
            <span className="text-sm text-gray-600">Select all</span>
          </div>

          {/* Render companies */}
          {companies.map((company) => (
            <div
              key={company.id}
              className="p-2 md:p-4 rounded-xl border border-gray-200 bg-sidebar transition duration-200 flex items-center gap-4"
            >
              <div className="flex items-center justify-between">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={selectedCompanies.includes(company.id)}
                  onChange={() => handleSelectSingle(company.id)}
                />
              </div>
              <div className="w-full flex items-center justify-between px-2">
                <div>
                  <div className="mt-2 flex gap-2 items-center">
                    <Link
                      to={`company/${company.id}`}
                      className="text-base md:text-xl font-semibold text-gray-800"
                    >
                      {company.name}
                    </Link>

                    <div className="w-1 h-1 rounded-full bg-[#557AA0] mt-2" />
                    <span
                      className={`mt-1 text-xs md:text-sm ${
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
                  <div className="flex gap-2 items-center text-[#6C6E7E] mt-2 ">
                    <CalendarCheck2 size={14} />
                    <p className="text-xs md:text-sm ">
                      Last Activity : {company.lastActivity}
                    </p>
                  </div>
                </div>
                <div
                  key={company.id}
                  className="relative inline-block"
                  ref={openId === company.id ? ref : null}
                >
                  {/* Trigger */}
                  <button
                    onClick={() =>
                      setOpenId(openId === company.id ? null : company.id)
                    }
                  >
                    <Ellipsis size={18} />
                  </button>

                  {/* Dropdown */}
                  {/* Dropdown */}
                  {openId === company.id && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-lg border border-gray-200 p-4 space-y-4 z-50">
                      {/* Duplicate */}
                      <button
                        className="w-full text-left text-gray-800 hover:text-primary font-medium text-sm"
                        onClick={() => {
                          console.log("Duplicate", company.id);
                          setOpenId(null);
                        }}
                      >
                        Duplicate
                      </button>

                      {/* Active toggle */}
                      <div className="flex items-center justify-between">
                        <span className="text-gray-800 font-medium text-sm">
                          Active
                        </span>

                        <button
                          onClick={() => toggleCompanyStatus(company.id)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                            company.status === "Active"
                              ? "bg-purple-500"
                              : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
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
        <div className="flex justify-center items-center mt-4">
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md border border-gray-400 disabled:opacity-50"
            >
              <ChevronLeft size={14} />
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 border py-2 font-medium rounded-md ${
                  currentPage === index + 1
                    ? "border-primary bg-primary/10 text-primary"
                    : "bg-white border-gray-400"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button>...</button>

            <button
              className={`px-4 border py-2 font-medium rounded-md bg-white border-gray-400 `}
            >
              99
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md border border-gray-400 disabled:opacity-50"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataAnalytics;
