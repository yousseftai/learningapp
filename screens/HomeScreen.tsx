import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Zap, Trophy, ArrowRight } from 'lucide-react';
import Mascot from '../components/Mascot';
import { UserStats, Screen } from '../types';

interface HomeScreenProps {
  stats: UserStats;
  onNavigate: (screen: Screen) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ stats, onNavigate }) => {
  return (
    <div className="p-6 pt-10 min-h-full flex flex-col gap-6 bg-gradient-to-b from-teal-50 to-slate-50">
      {/* Header */}
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center border-2 border-teal-200">
             <Mascot size={30} emotion="happy" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-800">Hi, {stats.name || 'Learner'}!</h1>
            <p className="text-xs text-slate-500 font-semibold">Let's learn something new.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100">
           <Flame className="text-orange-500 fill-orange-500" size={18} />
           <span className="font-bold text-orange-500">{stats.streak}</span>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div 
          whileTap={{ scale: 0.95 }}
          className="bg-purple-100 p-4 rounded-3xl flex flex-col items-start gap-2 border-b-4 border-purple-200"
        >
          <div className="bg-white p-2 rounded-xl">
            <Zap className="text-purple-500 fill-purple-500" size={20} />
          </div>
          <span className="text-2xl font-black text-purple-700">{stats.xp}</span>
          <span className="text-xs font-bold text-purple-400 uppercase tracking-wide">Total XP</span>
        </motion.div>

        <motion.div 
          whileTap={{ scale: 0.95 }}
          className="bg-yellow-100 p-4 rounded-3xl flex flex-col items-start gap-2 border-b-4 border-yellow-200"
        >
          <div className="bg-white p-2 rounded-xl">
            <Trophy className="text-yellow-500 fill-yellow-500" size={20} />
          </div>
          <span className="text-2xl font-black text-yellow-700">{stats.level}</span>
          <span className="text-xs font-bold text-yellow-500 uppercase tracking-wide">Current Level</span>
        </motion.div>
      </div>

      {/* Main Actions */}
      <section className="flex flex-col gap-4 mt-2">
        <h2 className="text-lg font-bold text-slate-700">Today's Goals</h2>
        
        {/* Daily Word Card CTA */}
        <motion.button
          onClick={() => onNavigate(Screen.DAILY_WORD)}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-white p-5 rounded-3xl shadow-lg shadow-teal-100 border border-teal-50 flex items-center justify-between relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
            <div className="z-10 flex flex-col items-start text-left">
                <span className="bg-teal-100 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-full mb-2">DAILY WORD</span>
                <h3 className="text-xl font-black text-slate-800">Learn a New Word</h3>
                <p className="text-sm text-slate-500 font-medium">Expand your vocabulary</p>
            </div>
            <div className="z-10 bg-teal-500 p-3 rounded-full text-white shadow-lg shadow-teal-200">
                <ArrowRight size={24} strokeWidth={3} />
            </div>
        </motion.button>

        {/* Quiz CTA */}
        <motion.button
          onClick={() => onNavigate(Screen.QUIZ)}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-white p-5 rounded-3xl shadow-lg shadow-rose-100 border border-rose-50 flex items-center justify-between relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
            <div className="z-10 flex flex-col items-start text-left">
                <span className="bg-rose-100 text-rose-600 text-[10px] font-bold px-2 py-0.5 rounded-full mb-2">PRACTICE</span>
                <h3 className="text-xl font-black text-slate-800">Quick Quiz</h3>
                <p className="text-sm text-slate-500 font-medium">Test your knowledge</p>
            </div>
            <div className="z-10 bg-rose-500 p-3 rounded-full text-white shadow-lg shadow-rose-200">
                <ArrowRight size={24} strokeWidth={3} />
            </div>
        </motion.button>
      </section>

      {/* Mascot Interaction */}
      <div className="mt-auto flex justify-center pb-4">
        <div className="relative">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 whitespace-nowrap">
                <p className="text-sm font-bold text-slate-600">Keep up the streak!</p>
                <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-slate-100 rotate-45"></div>
            </div>
            <Mascot emotion="excited" size={120} />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;