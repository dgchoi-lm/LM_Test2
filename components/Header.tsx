
import React, { useState } from 'react';

interface HeaderProps {
  isLoggedIn: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isLoggedIn }) => {
  // 사용자의 요청에 따라 'images/main.jpg' 경로를 기본값으로 설정합니다.
  const [imgSrc, setImgSrc] = useState("images/main.jpg");
  
  // 실제 파일이 없을 경우를 대비한 고화질 의료용 대체 이미지입니다.
  const fallbackUrl = "https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?auto=format&fit=crop&q=80&w=1600";

  const handleImageError = () => {
    // 이미 fallback 이미지를 보여주고 있다면 무한 루프 방지
    if (imgSrc !== fallbackUrl) {
      console.warn("images/main.jpg를 찾을 수 없어 대체 이미지를 표시합니다. 경로를 다시 확인해주세요.");
      setImgSrc(fallbackUrl);
    }
  };

  return (
    <header className={`relative w-full overflow-hidden transition-all duration-1000 ease-in-out ${isLoggedIn ? 'bg-white shadow-sm' : 'bg-slate-950'}`}>
      
      {/* 1. 배경 디자인 (비로그인 시 프리미엄 느낌 강조) */}
      {!isLoggedIn && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(30,58,138,0.3),transparent_70%)]"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[120px]"></div>
          </div>
        </div>
      )}

      {/* 2. 메인 비주얼 섹션 (Hero Area) */}
      <div className={`relative z-10 w-full flex flex-col items-center transition-all duration-1000 ${isLoggedIn ? 'py-4' : 'pt-12 pb-16'}`}>
        
        {/* 이미지 컨테이너: 이미지의 본래 비율을 유지하며 크게 노출 */}
        <div className={`relative flex justify-center items-center w-full max-w-7xl px-4 transition-all duration-1000 ${isLoggedIn ? 'h-32 md:h-44' : 'h-[400px] md:h-[550px]'}`}>
          
          {/* 배경 워터마크 텍스트 */}
          {!isLoggedIn && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <span className="text-white/5 text-[15vw] font-black uppercase select-none tracking-tighter">SURGERY</span>
            </div>
          )}

          <img 
            src={imgSrc} 
            alt="Main Surgical Instrumentation"
            // object-contain을 사용하여 이미지가 잘리지 않고 전체가 다 보이도록 설정
            className={`relative max-w-full max-h-full object-contain transition-all duration-1000 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${isLoggedIn ? 'scale-95' : 'scale-100 hover:scale-[1.02]'}`}
            loading="eager"
            onError={handleImageError}
          />
          
          {/* 하단 그림자 효과 (이미지 하단에 깊이감 부여) */}
          {!isLoggedIn && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[50%] h-8 bg-blue-900/40 blur-[40px] rounded-full -z-10"></div>
          )}
        </div>

        {/* 3. 타이틀 영역 */}
        <div className={`text-center transition-all duration-700 ${isLoggedIn ? 'mt-4' : 'mt-10'}`}>
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-4">
              <h1 className={`font-black tracking-tighter transition-all ${isLoggedIn ? 'text-2xl text-slate-900' : 'text-4xl md:text-6xl text-white'}`}>
                Surgical <span className={isLoggedIn ? 'text-blue-600' : 'text-blue-500'}>Portal</span>
              </h1>
            </div>
            
            {!isLoggedIn ? (
              <div className="flex flex-col items-center gap-3 mt-4">
                <div className="h-px w-20 bg-blue-500/50"></div>
                <p className="text-slate-400 text-sm md:text-lg font-medium tracking-[0.3em] uppercase opacity-70">
                  Precision Equipment Management
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-2 mt-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Authenticated Session</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 구분 하단 라인 */}
      <div className={`w-full h-px ${isLoggedIn ? 'bg-slate-100' : 'bg-white/10'}`}></div>
    </header>
  );
};
