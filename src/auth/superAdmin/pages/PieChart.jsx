import React, { useState } from 'react';
import { Cell, Pie, PieChart } from 'recharts';

// Sample data
const data = [
  { name: 'Enterprise (500+)', value: 500 },
  { name: 'Medium (100-499)', value: 300 },
  { name: 'Small (10-99)', value: 200 },
];

// Colors for the pie chart slices
const COLORS = ['#00A63E', '#F54900', '#155DFC'];

// The Pie chart component
export default function PieChartWithButtons({ isAnimationActive = true }) {
  const [showEnterprise, setShowEnterprise] = useState(true);
  const [showMedium, setShowMedium] = useState(true);
  const [showSmall, setShowSmall] = useState(true);

  const handleToggle = (group) => {
    if (group === 'Enterprise') setShowEnterprise(!showEnterprise);
    if (group === 'Medium') setShowMedium(!showMedium);
    if (group === 'Small') setShowSmall(!showSmall);
  };

  // Filter data based on toggled values
  const filteredData = data.filter((entry) => {
    if (entry.name === 'Enterprise (500+)' && !showEnterprise) return false;
    if (entry.name === 'Medium (100-499)' && !showMedium) return false;
    if (entry.name === 'Small (10-99)' && !showSmall) return false;
    return true;
  });

  return (
    <div className="flex flex-col items-center">
      
      {/* Buttons to toggle data */}
      

      {/* Pie chart */}
      <PieChart style={{ width: '70%', maxWidth: '520px', maxHeight: '80vh', aspectRatio: 1 }} responsive>
        <Pie
          data={filteredData}
          labelLine={false}
          dataKey="value"
          isAnimationActive={isAnimationActive}
        >
          {filteredData.map((entry, index) => (
            <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        
      </PieChart>
      <div className=' flex justify-center gap-4 lg:gap-2 xl:gap-6'>
        <button
          onClick={() => handleToggle('Enterprise')}
          className="flex gap-2 items-center text-xs xl:text-sm 2xl:text-base"
        >
            <div className='w-2 h-2 rounded-full bg-[#00A63E]'></div> Enterprise (500+)
        </button>
        <button
          onClick={() => handleToggle('Medium')}
          className=" flex gap-2 items-center text-xs xl:text-sm 2xl:text-base"
        >
            <div className='w-2 h-2 rounded-full bg-[#F54900]'></div> Medium (100-499)
        </button>
        <button
          onClick={() => handleToggle('Small')}
          className=" flex gap-2 items-center text-xs xl:text-sm 2xl:text-base"
        >
            <div className='w-2 h-2 rounded-full bg-[#155DFC] '></div> Small (10-99)
        </button>
      </div>
    </div>
  );
}
