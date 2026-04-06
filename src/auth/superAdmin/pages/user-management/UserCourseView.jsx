import React from "react";
import { ClipboardList, Award, Clock, Heart } from "lucide-react";

const outcomes = [
  "Lead organizational change initiatives",
  "Communicate change effectively to teams",
  "Overcome resistance and build buy-in",
  "Create sustainable change momentum",
  "Develop change leadership capabilities",
];

export default function UserCourseView() {
  return (
    <div className="p-2 md:p-6 w-full mx-auto ">
      <div className="space-y-6 border border-gray-200 rounded-xl p-2 md:p-4 lg:p-6">
        {/* BACK */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[#45556C]  p-2 border-b border-gray-100 text-sm">
          <div className="w-full md:w-4/5 flex justify-start items-start gap-2">
            <div className="lg:bg-primary/10 rounded-xl lg:w-12 h-12 flex items-center justify-center">
              <ClipboardList size={24} className="text-primary" />
            </div>
            <div>
              <p className="text-base text-black font-medium">
                Advanced Communication Strategies
              </p>
              <p className="text-black">Beginner</p>
              <p className="w-full md:max-w-md">
                Enhance your already strong communication skills with advanced
                techniques for difficult conversations.
              </p>
              <div className="flex flex-wrap items-center gap-1 py-1">
                <p className="text-primary bg-primary/10 rounded-lg font-medium border border-primary/10 px-2">
                  Leadership
                </p>
                <p className="text-primary bg-primary/10 rounded-lg font-medium border border-primary/10 px-2">
                  Communication
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:hidden flex flex-col mt-2 px-8">
            <p className="font-medium"><strong>Started :</strong>8/7/2025</p>
            <p className="font-medium"><strong>Duration :</strong>1 Week</p>
          </div>
          <div className="w-1/5 hidden md:flex  items-center justify-between">
            <p className="font-medium">8/7/2025</p>
            <p className="font-medium">1 Week</p>
          </div>
        </div>
        <div className="bg-primary/10 p-2 border border-primary/10 rounded-md">
          <h2 className="flex items-center gap-2 font-medium text-lg">
            <Award size={18} className="text-primary" />
            Learning Outcomes
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-y-1 pt-2">
            {outcomes.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-700">
                <span className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-primary shrink-0" />
                <span className="text-xs sm:text-sm lg:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>
       <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 2xl:gap-8">
                 <div className="w-full min-w-[240px] bg-[#DBC9F8]/40 border border-gray-200 rounded-xl p-4 space-y-4">
                   {/* Thumbnail */}
                   <div className="relative rounded-md overflow-hidden bg-black h-[120px]">
                     {/* Replace src later */}
       
                     {/* Play button */}
                     <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-md rounded-full p-1 cursor-pointer hover:bg-white/40 transition-colors group">
                       <Heart
                         className="w-4 h-4 text-white transition-transform duration-200 group-hover:scale-110"
                         fill="none"
                         strokeWidth={2.5}
                       />
                     </div>
                   </div>
       
                   {/* Progress bar */}
                   <div className="w-full h-1 rounded-full bg-primary/20">
                     <div className="h-1 w-1/3 bg-primary rounded-full" />
                   </div>
       
                   {/* Title */}
                   <h4 className="text-sm font-medium text-gray-900">
                     Daily Collaboration Tip
                   </h4>
       
                   {/* Tag */}
                   <span className="inline-block text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                     Communication
                   </span>
       
                   {/* Duration */}
                   <div className="flex items-center gap-2 text-sm text-primary">
                     <Clock className="w-4 h-4" />
                     <span>30 Minutes</span>
                   </div>
                 </div>
                 <div className="w-full min-w-[240px] bg-[#DBC9F8]/40 border border-gray-200 rounded-xl p-4 space-y-4">
                   {/* Thumbnail */}
                   <div className="relative rounded-md overflow-hidden bg-black h-[120px]">
                     {/* Replace src later */}
       
                     {/* Play button */}
                     <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-md rounded-full p-1 cursor-pointer hover:bg-white/40 transition-colors group">
                       <Heart
                         className="w-4 h-4 text-white transition-transform duration-200 group-hover:scale-110"
                         fill="none"
                         strokeWidth={2.5}
                       />
                     </div>
                   </div>
       
                   {/* Progress bar */}
                   <div className="w-full h-1 rounded-full bg-primary/20">
                     <div className="h-1 w-1/3 bg-primary rounded-full" />
                   </div>
       
                   {/* Title */}
                   <h4 className="text-sm font-medium text-gray-900">
                     Daily Collaboration Tip
                   </h4>
       
                   {/* Tag */}
                   <span className="inline-block text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                     Communication
                   </span>
       
                   {/* Duration */}
                   <div className="flex items-center gap-2 text-sm text-primary">
                     <Clock className="w-4 h-4" />
                     <span>30 Minutes</span>
                   </div>
                 </div>
               </div>

        <div className="rounded-xl border border-gray-200 p-4 xl:p-6 space-y-2 xl:space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-neutral-900 text-xl 2xl:text-2xl">
              Course Modules
            </h3>
          </div>
          <div className="flex justify-between items-center text-[#45556C] font-medium py-2 border-b border-gray-200 px-4 text-sm">
            <div className="w-full md:w-4/5 text-sm xl:text-base">COURSES</div>
            <div className="hidden w-1/5 md:flex justify-between gap-2 lg:gap-4 text-sm xl:text-base">
              <p>STARTED</p>
              <p>DURATION</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between md:items-center text-[#45556C]  py-2 border-b border-gray-100 px-4 text-sm">
            <div className="w-full md:w-4/5 ">
              <div>
                <p className="text-base text-black font-medium">
                  Advanced Communication Strategies
                </p>
                <p className="text-black">Beginner</p>
                <p className="w-full md:max-w-md">
                  Enhance your already strong communication skills with advanced
                  techniques for difficult conversations.
                </p>
                <div className="flex flex-wrap items-center gap-1 py-1">
                  <p className="text-primary bg-primary/10 rounded-lg font-medium border border-primary/10 px-2">
                    Leadership
                  </p>
                  <p className="text-primary bg-primary/10 rounded-lg font-medium border border-primary/10 px-2">
                    Communication
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:hidden flex flex-col mt-2">
            <p className="font-medium"><strong>Started :</strong>8/7/2025</p>
            <p className="font-medium"><strong>Duration :</strong>1 Week</p>
          </div>
            <div className="hidden w-1/5 md:flex justify-between gap-2 text-sm xl:text-base">
              <p className="font-medium">8/7/2025</p>
              <p className="font-medium">1 Week</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
