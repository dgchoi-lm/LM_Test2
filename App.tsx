
import React, { useState } from 'react';
import { Header } from './components/Header';
import { LoginForm } from './components/LoginForm';
import { Dashboard } from './components/Dashboard';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<{ id: string } | null>(null);

  const handleLoginSuccess = (userId: string) => {
    setUserProfile({ id: userId });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
  };

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-1000 ${isLoggedIn ? 'bg-slate-50' : 'bg-slate-950'}`}>
      {/* Top Hero Section with main.jpg */}
      <Header isLoggedIn={isLoggedIn} />

      {/* Main Content Area */}
      <main className={`flex-grow flex flex-col items-center px-4 transition-all duration-1000 ${isLoggedIn ? 'py-12' : 'py-20 bg-gradient-to-b from-slate-900 to-slate-950'}`}>
        {isLoggedIn ? (
          <Dashboard userId={userProfile?.id || ''} onLogout={handleLogout} />
        ) : (
          <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            <LoginForm onLoginSuccess={handleLoginSuccess} />
          </div>
        )}
      </main>

      {/* Professional Footer */}
      <footer className={`py-12 border-t transition-colors duration-1000 ${isLoggedIn ? 'border-slate-200 bg-white text-slate-400' : 'border-white/5 bg-slate-950 text-slate-500'}`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.3em]">
          <p>&copy; 2024 MEDTECH PRECISION SOLUTIONS. INC.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-blue-500 transition-colors">Security Protocol</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Terms of Usage</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Engineering Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
