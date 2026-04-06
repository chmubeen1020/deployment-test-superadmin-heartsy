import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "", completed: 32, pending: 18 },
  { month: "January", completed: 38, pending: 32 },
  { month: "", completed: 18, pending: 31 },
  { month: "", completed: 26, pending: 39 },
  { month: "February", completed: 20, pending: 28 },
  { month: "", completed: 39, pending: 47 },
  { month: "", completed: 41, pending: 18 },
  { month: "March", completed: 35, pending: 52 },
  { month: "", completed: 41, pending: 18 },
  { month: "", completed: 63, pending: 18 },
  { month: "April", completed: 60, pending: 30 },
  { month: "", completed: 78, pending: 40 },
  { month: "", completed: 92, pending: 35 },
  { month: "May", completed: 52, pending: 32 },
  { month: "", completed: 56, pending: 55 },
  { month: "", completed: 60, pending: 68 },
  { month: "June", completed: 42, pending: 62 },
  { month: "", completed: 51, pending: 71 },
];

const CustomDot = (props) => {
  const { cx, cy, index } = props;
  // Only show dots on specific milestones to match your image
  const milestoneIndices = [1, 4, 7, 10, 13, 16];
  if (milestoneIndices.includes(index)) {
    return (
      <circle
        cx={cx}
        cy={cy}
        r={4}
        stroke="#333"
        strokeWidth={2}
        fill="white"
      />
    );
  }
  return null;
};

const ChartLine = () => {
  const [showUsers, setShowUsers] = useState(true);
  const [showCompanies, setShowCompanies] = useState(true);

  return (
    <div className="w-full bg-sidebar p-4 rounded-xl border border-gray-200">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl lg:text-2xl font-semibold text-gray-800">
          Paltform Growth Trends
        </h2>
        <div className="flex gap-4 text-sm font-medium text-gray-500">
          <button
            className="flex items-center gap-2"
            onClick={() => setShowUsers(!showUsers)}
          >
            <span className="w-3 h-3 rounded-full bg-[#7C3AED]" />
            <span
              className={`${!showUsers ? "line-through text-gray-500" : ""}`}
            >
              Users
            </span>
          </button>

          <button
            className="flex items-center gap-2"
            onClick={() => setShowCompanies(!showCompanies)}
          >
            <span className="w-3 h-3 rounded-full bg-[#C4B5FD]" />
            <span
              className={`${!showCompanies ? "line-through text-gray-500" : ""}`}
            >
              Companies
            </span>
          </button>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 13 }}
              interval={0}
              padding={{ left: 20, right: 20 }} // Adjusted padding for better scroll feel
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 14 }}
              ticks={[0, 20, 40, 60, 80, 100]}
              width={30}
            />

            <Tooltip cursor={{ stroke: "#f1f5f9" }} />

            {/* Dash Line (Pending) */}
            {showUsers && (
              <Area
                type="monotone"
                dataKey="pending"
                stroke="#A78BFA"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="transparent"
                dot={<CustomDot />}
              />
            )}

            {/* Solid Line (Completed) */}
            {showCompanies && (
              <Area
                type="monotone"
                dataKey="completed"
                stroke="#7C3AED"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorCompleted)"
                dot={<CustomDot />}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartLine;
