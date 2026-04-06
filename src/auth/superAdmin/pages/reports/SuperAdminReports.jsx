import React from "react";
import PerformanceGrid from "./PerformanceGrid";
import ComingSoonOverlay from "../../CommingSoon";

const reportData = [
  {
    heading: "Total Revenue",
    rate: "$847,293",
    growth: "23%",
  },
  {
    heading: "Platform Growth",
    rate: "18.7%",
    growth: "5.2%",
  },
  {
    heading: "Engagement Rate",
    rate: "78%",
    growth: "-8%",
  },
];
const SuperAdminReports = () => {
const isFeatureLocked = true;

  return (
    <div className="w-full p-2">
      {isFeatureLocked && (
        <ComingSoonOverlay 
          title="Reports" 
          description="Exciting things are on the way! We are building a more robust experience for our community. Check back shortly for full access."
        />
      )}
      {/* Header */}
      {/* <div className="mb-6">
        <h1 className="text-xl text-gray-800">Reports</h1>
      </div> */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 xl:gap-6 mb-4 xl:mb-6">
        {reportData.map((r, i) => (
          <div className="bg-sidebar px-4 py-2 rounded-xl space-y-2 xl:space-y-3">
            <p className="text-lg xl:text-xl ">{r.heading}</p>
            <p className="text-2xl xl:text-3xl font-bold">{r.rate}</p>
            <p
              className={`text-sm xl:text-base font-medium ${
                parseFloat(r.growth) >= 0 ? "text-[#34C759]" : "text-[#FF3B30]"
              }`}
            >
              {parseFloat(r.growth) >= 0 ? "+" : "-"}{" "}
              {Math.abs(parseFloat(r.growth))}%
              <span className=" font-normal ml-1">
                from last period
              </span>
            </p>
          </div>
        ))}
      </div>
      <div>
        <PerformanceGrid/>
      </div>
    </div>
  );
};

export default SuperAdminReports;


