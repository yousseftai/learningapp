import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, RefreshCw, CheckCircle } from 'lucide-react';
import { WordOfTheDay, UserStats } from '../types';
import { fetchDailyWord } from '../services/geminiService';
import Mascot from '../components/Mascot';

interface DailyWordScreenProps {
  onComplete: (xp: number) => void;
}

const DailyWordScreen: React.FC<DailyWordScreenProps> = ({ onComplete }) => {
  const [wordData, setWordData] = useState<WordOfTheDay | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    loadWord();
  }, []);

  const loadWord = async () => {
    setLoading(true);
    const data = await fetchDailyWord();
    setWordData(data);
    setLoading(false);
  };

  const playAudio = () => {
    if (!wordData) return;
    const utterance = new SpeechSynthesisUtterance(wordData.word);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  const handleComplete = () => {
    if (!completed) {
      setCompleted(true);
      if (window.confetti) {
        window.confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      setTimeout(() => onComplete(15), 1500); // Award XP after delay
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <Mascot emotion="thinking" size={120} />
        <p className="text-slate-500 font-bold animate-pulse">Finding a cool word...</p>
      </div>
    );
  }

  return (
    <div className="p-6 h-full flex flex-col bg-teal-50">
      <h2 className="text-2xl font-black text-center text-slate-800 mb-6">Word of the Day</h2>

      <div className="flex-1 flex flex-col items-center justify-center relative perspective-1000">
        <motion.div
          className="w-full max-w-sm aspect-[4/5] relative preserve-3d cursor-pointer"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front Face */}
          <div className="absolute inset-0 backface-hidden bg-white rounded-3xl shadow-[0_10px_0_rgb(0,0,0,0.1)] border-2 border-slate-100 p-8 flex flex-col items-center justify-center gap-6">
            <span className="text-8xl">{wordData?.emoji}</span>
            <div className="text-center">
              <h1 className="text-4xl font-black text-slate-800 mb-2">{wordData?.word}</h1>
              <p className="text-slate-400 font-mono text-lg">{wordData?.ipa}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                playAudio();
              }}
              className="mt-4 p-4 rounded-full bg-teal-100 text-teal-600 hover:bg-teal-200 transition-colors"
            >
              <Volume2 size={32} />
            </button>
            <p className="text-xs text-slate-400 font-bold mt-auto uppercase tracking-widest">Tap to flip</p>
          </div>

          {/* Back Face */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-teal-600 rounded-3xl shadow-[0_10px_0_rgb(0,0,0,0.2)] p-8 flex flex-col text-white">
            <div className="flex-1 flex flex-col justify-center gap-6">
              <div>
                <h3 className="text-teal-200 text-sm font-bold uppercase tracking-wider mb-1">Definition</h3>
                <p className="text-xl font-bold leading-relaxed">{wordData?.definition}</p>
              </div>
              
              <div>
                <h3 className="text-teal-200 text-sm font-bold uppercase tracking-wider mb-1">Example</h3>
                <p className="text-lg italic opacity-90">"{wordData?.example}"</p>
              </div>

              <div>
                 <h3 className="text-teal-200 text-sm font-bold uppercase tracking-wider mb-1">Synonyms</h3>
                 <div className="flex flex-wrap gap-2">
                    {wordData?.synonyms.map(syn => (
                        <span key={syn} className="px-3 py-1 bg-teal-700 rounded-full text-sm font-semibold">{syn}</span>
                    ))}
                 </div>
              </div>
            </div>
            <p className="text-xs text-teal-300 font-bold mt-auto uppercase tracking-widest text-center">Tap to flip back</p>
          </div>
        </motion.div>
      </div>

      <div className="mt-8">
        {!completed ? (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleComplete}
            className="w-full py-4 bg-teal-500 text-white font-black text-xl rounded-2xl shadow-[0_4px_0_rgb(13,148,136)] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-2"
          >
            I Learned It! <CheckCircle size={24} />
          </motion.button>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full py-4 bg-green-100 text-green-700 font-bold text-xl rounded-2xl flex items-center justify-center gap-2 border border-green-200"
          >
            Good Job! +15 XP
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DailyWordScreen;