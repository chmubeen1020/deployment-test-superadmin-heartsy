import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Lock, ChevronRight, Sparkles } from 'lucide-react';

const ComingSoonOverlay = ({ 
  title = "Coming Soon", 
  description = "We're working hard to bring this feature to life. Stay tuned for updates!",
  icon = <Rocket className="w-8 h-8 text-white" />,
  showButton = true 
}) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* The Blurred Backdrop */}
      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm min-h-screen" />

      {/* The Content Card */}
      <div className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-8 sm:p-12 text-center overflow-hidden">
        
        {/* Decorative Background Element */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-50" />
        
        {/* Icon Header */}
        <div className="relative flex justify-center mb-8">
          <div className="w-20 h-20 bg-blue-500 rounded-3xl rotate-12 flex items-center justify-center shadow-xl shadow-blue-200 group transition-transform hover:rotate-0">
            <div className="-rotate-12 group-hover:rotate-0 transition-transform">
              {icon}
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-amber-400 p-2 rounded-xl shadow-lg border-4 border-white">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Text Content */}
        <div className="relative space-y-4 mb-10">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            {title}
          </h2>
          <p className="text-slate-500 leading-relaxed max-w-md mx-auto">
            {description}
          </p>
        </div>

        {/* Navigation Button */}
        {showButton && (
          <button 
            onClick={() => navigate('/super-admin/subscription-biling')}
            className="group relative w-full bg-primary/90 hover:bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            Manage Subscription
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        )}

        {/* Footer Info */}
        <div className="mt-8 flex items-center justify-center gap-2 text-[11px] text-slate-400 uppercase tracking-widest font-bold">
          <Lock className="w-3 h-3" />
          <span>Secure Admin Access</span>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonOverlay;