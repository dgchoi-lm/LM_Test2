
import React from 'react';

interface DashboardProps {
  userId: string;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ userId, onLogout }) => {
  return (
    <div className="w-full max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Banner */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 mb-8">
        <div className="bg-slate-900 px-8 py-10 text-white relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <i className="fa-solid fa-microscope text-8xl rotate-12"></i>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded uppercase tracking-tighter border border-emerald-500/20">Secure Channel</span>
                <p className="text-blue-400 text-xs font-bold uppercase tracking-widest">Authenticated Surgeon</p>
              </div>
              <h2 className="text-4xl font-black tracking-tight">System Access: {userId}</h2>
              <p className="text-slate-400 mt-2 font-medium">PX-2025 Series Asset Management & Calibration Console</p>
            </div>
            <button 
              onClick={onLogout}
              className="px-8 py-3 bg-red-500 text-white hover:bg-red-600 rounded-2xl transition-all text-sm font-black uppercase tracking-widest shadow-lg shadow-red-500/20 active:scale-95"
            >
              Logout
            </button>
          </div>
        </div>
        
        <div className="p-8 bg-slate-50/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { label: 'Active Procedures', value: '14', icon: 'fa-briefcase-medical', color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Asset Calibration', value: 'Optimal', icon: 'fa-shield-heart', color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Unit Heartbeat', value: 'Nominal', icon: 'fa-gauge-high', color: 'text-purple-600', bg: 'bg-purple-50' },
            ].map((stat, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <i className={`fa-solid ${stat.icon} text-2xl`}></i>
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{stat.label}</p>
                    <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 flex flex-col h-full shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center">
                  <i className="fa-solid fa-chart-line text-white"></i>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Telemetry Data</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                Review real-time mechanical stress and precision feedback from the PX-2025 instrumentation suite.
              </p>
              <div className="mt-auto">
                <button className="w-full py-4 border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                  Access Live Data
                </button>
              </div>
            </div>

            <div className="bg-blue-600 rounded-3xl p-8 text-white flex flex-col h-full shadow-xl shadow-blue-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl backdrop-blur flex items-center justify-center">
                  <i className="fa-solid fa-clipboard-list"></i>
                </div>
                <h3 className="text-xl font-bold">OR Configuration</h3>
              </div>
              <p className="text-blue-100 text-sm leading-relaxed mb-8 font-medium">
                Set up pre-defined calibration profiles for upcoming surgical cases. Ensure all sensors are synced.
              </p>
              <div className="mt-auto">
                <button className="w-full py-4 bg-white text-blue-600 hover:bg-blue-50 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg">
                  New Configuration
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
