import { useState } from "react";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { month: "January", users: 40, companies: 70 },
  { month: "February", users: 70, companies: 25 },
  { month: "March", users: 30, companies: 60 },
  { month: "April", users: 90, companies: 35 },
  { month: "May", users: 20, companies: 25 },
  { month: "June", users: 55, companies: 45 },
];

export function MontlyCompletionChart() {
  const [showUsers, setShowUsers] = useState(true);
  const [showCompanies, setShowCompanies] = useState(true);

  return (
    <div className=" w-full h-[350px] px-2 border rounded-xl">
      <div className="my-2 flex justify-between items-center">
        <div>
          <h2 className="pl-8  text-xl font-semibold">Monthly Completion Trends</h2>
        </div>
        <div className="flex items-center gap-4">
          {/* Toggle Buttons */}
          <button
            onClick={() => setShowUsers(!showUsers)}
            className="text-sm py-2 px-4 rounded-lg mr-2 flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-[#4B7AF5]"></div>  Completed
          </button>
          <button
            onClick={() => setShowCompanies(!showCompanies)}
            className=" text-sm py-2 px-4 rounded-lg flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-[#A06BFF]"></div> Pending
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={chartData}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}

          {showUsers && (
            <Line dataKey="users" stroke="#4B7AF5" strokeWidth={2} dot={false} />
          )}
          {showCompanies && (
            <Line
              dataKey="companies"
              stroke="#A06BFF"
              strokeWidth={2}
              dot={false}
              strokeDasharray="5 5" // Makes the companies line dashed
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
