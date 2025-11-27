import React from 'react';
import { UserStats, ThemeColor } from '../types';
import Mascot from '../components/Mascot';
import { Award, TrendingUp, Calendar, Zap } from 'lucide-react';

interface ProfileScreenProps {
  stats: UserStats;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ stats }) => {
  const StatRow = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string | number, color: ThemeColor }) => {
     const colorMap = {
         teal: 'bg-teal-100 text-teal-600',
         yellow: 'bg-yellow-100 text-yellow-600',
         purple: 'bg-purple-100 text-purple-600',
         rose: 'bg-rose-100 text-rose-600'
     };

     return (
         <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-3">
             <div className="flex items-center gap-4">
                 <div className={`p-3 rounded-xl ${colorMap[color]}`}>
                     <Icon size={24} strokeWidth={2.5} />
                 </div>
                 <span className="font-bold text-slate-600 text-lg">{label}</span>
             </div>
             <span className="font-black text-xl text-slate-800">{value}</span>
         </div>
     );
  };

  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <div className="flex flex-col items-center mb-8 mt-4">
         <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg mb-4 relative">
            <Mascot emotion="happy" size={80} />
            <div className="absolute bottom-0 right-0 bg-teal-500 text-white font-bold px-3 py-1 rounded-full text-sm border-4 border-white">
                Lvl {stats.level}
            </div>
         </div>
         <h2 className="text-2xl font-black text-slate-800">Learning Master</h2>
         <p className="text-slate-500 font-semibold">Joined Sept 2025</p>
      </div>

      <div className="space-y-4">
         <h3 className="text-xl font-bold text-slate-800 mb-4">Statistics</h3>
         <StatRow icon={TrendingUp} label="Current Streak" value={`${stats.streak} days`} color="teal" />
         <StatRow icon={Zap} label="Total XP" value={stats.xp} color="yellow" />
         <StatRow icon={Award} label="Lessons Done" value={stats.lessonsCompleted} color="purple" />
         <StatRow icon={Calendar} label="Words Learned" value={stats.wordsLearned} color="rose" />
      </div>

      <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl p-6 text-white text-center shadow-lg shadow-indigo-200">
         <h3 className="font-bold text-xl mb-2">Invite Friends</h3>
         <p className="text-indigo-100 text-sm mb-4">Learn together and get free XP boosters!</p>
         <button className="bg-white text-indigo-600 font-bold py-2 px-6 rounded-full shadow-md hover:bg-indigo-50 transition-colors">
            Share Profile
         </button>
      </div>
    </div>
  );
};

export default ProfileScreen;