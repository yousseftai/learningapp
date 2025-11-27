import React from 'react';
import { Home, BookOpen, User, Star } from 'lucide-react';
import { Screen } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentScreen, onNavigate }) => {
  const navItems = [
    { id: Screen.HOME, icon: Home, label: 'Home' },
    { id: Screen.DAILY_WORD, icon: BookOpen, label: 'Learn' },
    { id: Screen.QUIZ, icon: Star, label: 'Quiz' },
    { id: Screen.PROFILE, icon: User, label: 'Profile' },
  ];

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white shadow-2xl overflow-hidden relative">
      <main className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-50 relative">
        {children}
      </main>

      <nav className="bg-white border-t border-slate-200 px-6 py-3 pb-6 flex justify-between items-center z-20">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                isActive ? 'text-teal-500 -translate-y-1' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <item.icon
                size={isActive ? 28 : 24}
                strokeWidth={isActive ? 3 : 2}
                className={`transition-all duration-300 ${isActive ? 'drop-shadow-md' : ''}`}
              />
              <span className={`text-[10px] font-bold ${isActive ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;