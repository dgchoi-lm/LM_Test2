
import React, { useState } from 'react';

interface LoginFormProps {
  onLoginSuccess: (userId: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showIncorrectModal, setShowIncorrectModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('Incorrect');
  const [modalSubtext, setModalSubtext] = useState('');

  const SHEET_ID = '1YRKZr-HajCGiUiqvko7wzsdhfxkszMN2kMY8K2DXXX8';
  const SHEET_NAME = 'sum';
  // Visualization API is more robust for specific sheet selection and CORS
  const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(CSV_URL, { 
        cache: 'no-store',
        mode: 'cors'
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      
      const csvText = await response.text();
      
      // Parse CSV rows
      const rows = csvText.split(/\r?\n/).map(row => {
        // Simple CSV split handling basic quotes from Gviz
        return row.split(',').map(cell => cell.replace(/^"(.*)"$/, '$1').trim());
      });

      /**
       * VALIDATION TARGETS:
       * Sheet: 'sum'
       * ID: X2 -> Row index 1 (2nd row), Column index 23 (X is 24th letter)
       * Password: Y2 -> Row index 1 (2nd row), Column index 24 (Y is 25th letter)
       */
      const targetRow = rows[1];
      const correctId = targetRow ? targetRow[23] : null;
      const correctPassword = targetRow ? targetRow[24] : null;

      if (!correctId || !correctPassword) {
        console.error('Credential cells X2/Y2 not found or empty.');
        setModalMessage('Data Error');
        setModalSubtext('The system could not locate the authentication records in the specified spreadsheet cells (sum!X2 and sum!Y2).');
        setShowIncorrectModal(true);
        return;
      }

      if (userId === correctId && password === correctPassword) {
        onLoginSuccess(userId);
      } else {
        setModalMessage('Access Denied');
        setModalSubtext('The ID or Password provided does not match our secure records. Please check your credentials and try again.');
        setShowIncorrectModal(true);
      }
    } catch (err) {
      console.error('Authentication Error:', err);
      setModalMessage('System Connection Error');
      setModalSubtext('Could not reach the verification server. Please verify your internet connection and ensure the Google Sheet is "Published to the web".');
      setShowIncorrectModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-600 rounded-full mb-4">
            <i className="fa-solid fa-user-shield text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Medical Gateway</h2>
          <p className="text-slate-500 mt-2 text-sm italic">Verification active: sum!X2 & sum!Y2</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-slate-700 mb-1">
              Medical ID
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <i className="fa-solid fa-id-badge"></i>
              </div>
              <input
                type="text"
                id="userId"
                autoComplete="username"
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
              Access Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <i className="fa-solid fa-key"></i>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                className="block w-full pl-10 pr-10 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <i className="fa-solid fa-circle-notch fa-spin mr-2"></i>
                Verifying Credentials...
              </span>
            ) : (
              'Verify & Access'
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-4">Secure Medical Infrastructure</p>
          <div className="flex justify-center gap-4 text-slate-200">
            <i className="fa-solid fa-network-wired text-lg"></i>
            <i className="fa-solid fa-shield-virus text-lg"></i>
            <i className="fa-solid fa-database text-lg"></i>
          </div>
        </div>
      </div>

      {showIncorrectModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 transform animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
                <i className="fa-solid fa-circle-xmark text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{modalMessage}</h3>
              <p className="text-slate-500 text-sm whitespace-pre-wrap mb-8">
                {modalSubtext}
              </p>
              <button
                onClick={() => setShowIncorrectModal(false)}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-colors active:scale-95"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
