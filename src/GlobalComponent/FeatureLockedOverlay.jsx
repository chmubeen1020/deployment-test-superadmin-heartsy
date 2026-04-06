import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  Layers 
} from 'lucide-react';

const FeatureLockedOverlay = ({ 
  title = "Module Under Development", 
  description = "This advanced analytics module is currently being calibrated. Access will be granted to authorized accounts shortly.",
  icon = <Layers className="w-6 h-6 text-[#155DFC]" />,
  showButton = true 
}) => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Background with higher contrast blur for a more premium feel */}
      <div className="" />

      {/* Main Container */}
      <div className="relative w-full max-w-md">
        {/* The Animated Border Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#155DFC] to-purple-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        
        <div className="relative bg-white rounded-[2.5rem] p-10 overflow-hidden">
          
          {/* Top Detail: Feature Tag */}
          {/* <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#155DFC] text-[10px] font-bold uppercase tracking-wider border border-blue-100">
              <Zap size={10} fill="currentColor" /> v2.0 Enterprise
            </span>
          </div> */}

          {/* Icon Representation: Floating Minimalist Style */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm">
                {icon}
              </div>
              {/* Floating accent dots */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
              <div className="absolute -bottom-2 -left-3 w-2 h-2 bg-blue-200 rounded-full" />
            </div>
          </div>

          {/* Text: High contrast and tight leading */}
          <div className="text-center space-y-3 mb-10">
            <h2 className="text-2xl font-extrabold text-primary tracking-tight leading-none">
              {title}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              {description}
            </p>
          </div>

          {/* Button: Minimalist solid with subtle hover */}
          {showButton && (
            <button 
              onClick={() => navigate('/admin/settings')}
              className="w-full bg-[#155DFC] hover:bg-[#155DFC] text-white py-4 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 group shadow-xl shadow-slate-200"
            >
              Check Admin Profile
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}

          {/* Footer: Micro-copy */}
          <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">
            <ShieldCheck size={12} />
            <span>Encrypted Access Only</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FeatureLockedOverlay;