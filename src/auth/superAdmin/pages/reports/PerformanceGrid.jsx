import React from 'react';
import { Building2, Users, ChartArea, TrendingUp } from 'lucide-react';

const PerformanceGrid = () => {
  // Static Icons Map - Keeping icons outside mapping logic for easy global changes
  const ICON_MAP = {
    companies: <ChartArea className="text-primary" size={24} />,
    departments: <Building2 className="text-primary" size={24} />,
    users: <Users className="text-green-600" size={24} />,
    platform: <TrendingUp className="text-orange-600 border-2 border-orange-600 rounded-md p-[2px]" size={24} />,
  };

  /**
   * DATA STRUCTURE STRATEGY:
   * Each object represents one card. The 'metrics' array allows for easy 
   * expansion if a card needs 4, 6, or 8 data points in the future.
   */
  const performanceData = [
    {
      id: "companies",
      title: "Companies Performance",
      description: "Aggregate metrics across all registered companies",
      icon: ICON_MAP.companies,
      metrics: [
        { label: "Total Companies", value: "247", growth: null },
        { label: "Active Companies", value: "198", growth: "+12%" },
        { label: "Avg. User Engagement", value: "78%", growth: "+5%" },
        { label: "Avg. Completion Rate", value: "82%", growth: "+8%" },
      ]
    },
    {
      id: "departments",
      title: "Departments Performance",
      description: "Performance breakdown by department across organizations",
      icon: ICON_MAP.departments,
      metrics: [
        { label: "Total Departments", value: "1,245", growth: null },
        { label: "Top Performing", value: "Engineering", growth: "92%", isHighlight: true },
        { label: "Avg. Team Score", value: "75%", growth: "+3%" },
        { label: "Growth Rate", value: "15%", growth: "+2%" },
      ]
    },
    {
      id: "users",
      title: "User Performance",
      description: "Individual user metrics and learning progress",
      icon: ICON_MAP.users,
      metrics: [
        { label: "Total Users", value: "12,847", growth: null },
        { label: "Active Users", value: "9,234", growth: "+18%" },
        { label: "Avg. Assessment Score", value: "76%", growth: "+6%" },
        { label: "Course Completion", value: "68%", growth: "+4%" },
      ]
    },
    {
      id: "platform",
      title: "Platform Performance",
      description: "Heartsy platform health and system metrics",
      icon: ICON_MAP.platform,
      metrics: [
        { label: "System Uptime", value: "99.9%", growth: null },
        { label: "Active Sessions", value: "3,421", growth: "+12%" },
        { label: "API Performance", value: "145ms", growth: "-8ms", inverseColor: true },
        { label: "User Satisfaction", value: "4.7/5", growth: "+0.2" },
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
      {performanceData.map((card) => (
        <PerformanceCard key={card.id} data={card} />
      ))}
    </div>
  );
};

// --- Reusable Sub-component for easy API mapping ---
const PerformanceCard = ({ data }) => {
  return (
    <div className="bg-sidebar rounded-2xl p-6 ">
      {/* Header */}
      <div className='mb-6 space-y-1'>
      <div className="flex items-center gap-4 ">
        <div>
          {data.icon}
        </div>
        <div>
          <h3 className="text-xl xl:text-2xl font-bold text-gray-800">{data.title}</h3>
        </div>
      </div>
          <p className="text-sm xl:text-base text-gray-600">{data.description}</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        {data.metrics.map((metric, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="text-sm lg:text-base">
              {metric.label}
            </span>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-bold text-gray-900 `}>
                {metric.value}
              </span>
              
              {metric.growth && (
                <span className={`text-sm font-medium flex items-center ${
                   // Logic to handle "Lower is better" metrics (like API latency)
                   (metric.growth.includes('-') && !metric.inverseColor) || (metric.growth.includes('+') && metric.inverseColor === false)
                   ? 'text-green-500' 
                   : metric.inverseColor ? 'text-green-500' : 'text-red-500'
                }`}>
                  {metric.growth}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceGrid;