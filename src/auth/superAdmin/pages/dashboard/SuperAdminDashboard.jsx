import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import PieChartWithCustomizedLabel from "../PieChart";
import ChartLine from "../ChartLine";
import {  Clock } from "lucide-react";
import ComingSoonOverlay from "../../CommingSoon";

// Register the components in ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement // Register ArcElement for Pie charts
);

const SuperAdminDashboard = () => {
  // Example data for Line and Pie charts
  const isFeatureLocked = false;

  // Chart options to customize the appearance

  const customData = [
    { name: "Category 1", value: 500 },
    { name: "Category 2", value: 300 },
    { name: "Category 3", value: 100 },
    { name: "Category 4", value: 200 },
  ];
  return (
    <div className="pb-4">
      {isFeatureLocked && (
        <ComingSoonOverlay 
          title="Dashboard " 
          description="Exciting things are on the way! We are building a more robust experience for our community. Check back shortly for full access."
        />
      )}
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between gap-2 md:items-center mb-4 sm:border border-gray-200  p-4 md:p-6 rounded-xl sm:bg-[#945EEB]">
        <div className="flex flex-col items-start">
          <h1 className="text-xl sm:text-white">Virtual Learning Sessions</h1>
          <span className="text-sm sm:text-white">
            Scheduled sessions with employees
          </span>
        </div>
        <Link to="/sessions" className="w-full sm:w-fit">
          <button className="w-full sm:w-fit bg-primary sm:bg-transparent sm:border sm:border-white text-white py-2 px-4 rounded-lg ">
            View Scheduled Sessions
          </button>
        </Link>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
        {/* Total Users */}
        <div className="p-4 bg-green-300/20 rounded-xl flex flex-col items-start gap-1 border border-green-500">
          <div className="text-lg ">Total Users</div>
          <div className="text-2xl font-bold text-gray-800">12,847</div>
          <p className="text-sm ">Active users across all companies</p>
          <div className="text-xs text-white bg-green-500 px-2 py-1 rounded-full">
            +12.3%
          </div>
        </div>
        {/* Total Companies */}
        <div className="p-4 bg-[#3275F1]/20 rounded-xl flex flex-col items-start gap-1 border border-[#3275F1]">
          <div className="text-lg ">Total Companies</div>
          <div className="text-2xl font-bold text-gray-800">156</div>
          <p className="text-sm ">Active users across all companies</p>
          <div className="text-xs text-white bg-[#3275F1] px-2 py-1 rounded-full">
            +5.2%
          </div>
        </div>
        {/* Assessments Completed */}
        <div className="p-4 bg-[#945EEB]/20 rounded-xl flex flex-col items-start gap-1 border border-[#945EEB]">
          <div className="text-lg ">Assessments Completed</div>
          <div className="text-2xl font-bold text-gray-800">8,924</div>
          <p className="text-sm ">Active users across all companies</p>
          <div className="text-xs text-white bg-[#945EEB]/90 px-2 py-1 rounded-full">
            -18.7%
          </div>
        </div>
        {/* Active Courses */}
        <div className="p-4 bg-[#A6A8BF]/20 rounded-xl flex flex-col items-start gap-1 border border-[#A6A8BF]">
          <div className="text-lg ">Active Courses</div>
          <div className="text-2xl font-bold text-gray-800">342</div>
          <p className="text-sm ">Active users across all companies</p>
          <div className="text-xs text-white bg-[#A6A8BF] px-2 py-1 rounded-full">
            -7.1%
          </div>
        </div>
      </div>

      {/* Growth Trends Chart */}
      <div className=" rounded-xl bg-sidebar">
        <ChartLine />
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-4 xl:gap-10 mt-4 lg:h-[320px] xl:h-[360px] 2xl:h-[400px]">
        {/* Company Distribution */}
        <div className="w-full lg:w-1/2 bg-sidebar border border-gray-200 rounded-xl p-4 ">
          <h2 className="text-xl font-medium ">Company Distribution</h2>
          <div className="flex flex-col items-center ">
            <PieChartWithCustomizedLabel
              data={customData}
              isAnimationActive={true}
            />
          </div>
        </div>

        {/* Recent Activities */}
        <div className="w-full lg:w-1/2 bg-sidebar border border-gray-200 rounded-xl p-4 overflow-y-auto ">
          <h2 className="text-xl font-medium mb-4">Recent Activities</h2>
          <div className="space-y-2">
            <div className="flex flex-col justify-between border border-gray-200 rounded-xl p-2 2xl:p-5 bg-white">
              <div className="flex justify-start items-center gap-4">
                <div className="w-3 h-3 bg-[#008236] rounded-full"></div>

                <div>
                  <span className="font-bold">New Registration</span>
                  <p>New company 'TechCorp Inc.' registered.</p>
                  <span className="text-sm font-light text-gray-500 flex gap-2 items-center">
                    <Clock size={14} /> 2 hours ago
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between border border-gray-200 rounded-xl p-2 2xl:p-5 bg-white">
              <div className="flex justify-start items-center gap-4">
                <div className="w-3 h-3 bg-[#008236] rounded-full"></div>

                <div>
                  <span className="font-bold">New Registration</span>
                  <p>New company 'TechCorp Inc.' registered.</p>
                  <span className="text-sm font-light text-gray-500 flex gap-2 items-center">
                    <Clock size={14} /> 2 hours ago
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between border border-gray-200 rounded-xl p-2 2xl:p-5 bg-white">
              <div className="flex justify-start items-center gap-4">
                <div className="w-3 h-3 bg-[#008236] rounded-full"></div>

                <div>
                  <span className="font-bold">New Registration</span>
                  <p>New company 'TechCorp Inc.' registered.</p>
                  <span className="text-sm font-light text-gray-500 flex gap-2 items-center">
                    <Clock size={14} /> 2 hours ago
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between border border-gray-200 rounded-xl p-2 2xl:p-5 bg-white">
              <div className="flex justify-start items-center gap-4">
                <div className="w-3 h-3 bg-[#008236] rounded-full"></div>

                <div>
                  <span className="font-bold">New Registration</span>
                  <p>New company 'TechCorp Inc.' registered.</p>
                  <span className="text-sm font-light text-gray-500 flex gap-2 items-center">
                    <Clock size={14} /> 2 hours ago
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
