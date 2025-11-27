import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowRight } from 'lucide-react';
import { QuizQuestion } from '../types';
import { fetchQuiz } from '../services/geminiService';
import Mascot from '../components/Mascot';

interface QuizScreenProps {
  onComplete: (xp: number) => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ onComplete }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    loadQuiz();
  }, []);

  const loadQuiz = async () => {
    setLoading(true);
    const data = await fetchQuiz();
    setQuestions(data);
    setLoading(false);
  };

  const handleOptionSelect = (option: string) => {
    if (selectedOption !== null) return; // Prevent double click
    
    setSelectedOption(option);
    const correct = option === questions[currentIdx].correctAnswer;
    setIsCorrect(correct);
    if (correct) {
       setScore(s => s + 1);
       playSound('success');
    } else {
       playSound('error');
    }
  };

  const playSound = (type: 'success' | 'error') => {
      // Simple synthesized sound fallback
      // In a real app, use standard Audio() with assets
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(curr => curr + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      setQuizFinished(true);
      if (score === questions.length && window.confetti) {
          window.confetti({ spread: 100, particleCount: 150 });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <Mascot emotion="thinking" size={120} />
        <p className="text-slate-500 font-bold animate-pulse">Preparing your challenge...</p>
      </div>
    );
  }

  if (quizFinished) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 gap-6 text-center">
         <Mascot emotion={score > 1 ? 'happy' : 'sad'} size={150} />
         <div>
            <h2 className="text-3xl font-black text-slate-800">Lesson Complete!</h2>
            <p className="text-slate-500 font-semibold mt-2">You got {score} out of {questions.length} correct.</p>
         </div>
         
         <div className="bg-yellow-100 p-6 rounded-3xl w-full border-b-4 border-yellow-300">
            <span className="text-sm font-bold text-yellow-600 uppercase">Total XP Earned</span>
            <div className="text-4xl font-black text-yellow-500">+{score * 10} XP</div>
         </div>

         <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onComplete(score * 10)}
            className="w-full py-4 bg-teal-500 text-white font-black rounded-2xl shadow-[0_4px_0_rgb(13,148,136)] active:shadow-none active:translate-y-[4px] transition-all"
         >
            Continue
         </motion.button>
      </div>
    );
  }

  const currentQ = questions[currentIdx];
  const progress = ((currentIdx) / questions.length) * 100;

  return (
    <div className="h-full flex flex-col p-6 max-w-lg mx-auto">
      {/* Progress Bar */}
      <div className="w-full h-3 bg-slate-200 rounded-full mb-8 overflow-hidden">
        <motion.div 
            className="h-full bg-teal-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col">
        <h2 className="text-2xl font-bold text-slate-800 mb-8">{currentQ.question}</h2>

        <div className="flex flex-col gap-3">
          {currentQ.options.map((option, idx) => {
             let stateClass = "bg-white border-2 border-slate-200 shadow-sm text-slate-700";
             if (selectedOption === option) {
                 if (isCorrect) stateClass = "bg-green-100 border-2 border-green-500 text-green-700";
                 else stateClass = "bg-red-100 border-2 border-red-500 text-red-700";
             } else if (selectedOption !== null && option === currentQ.correctAnswer) {
                 stateClass = "bg-green-50 border-2 border-green-300 text-green-700"; // Show correct answer if wrong
             }

             return (
                 <motion.button
                    key={idx}
                    disabled={selectedOption !== null}
                    onClick={() => handleOptionSelect(option)}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-4 rounded-2xl font-bold text-lg text-left transition-all ${stateClass} ${selectedOption === null ? 'hover:bg-slate-50' : ''}`}
                 >
                    {option}
                 </motion.button>
             );
          })}
        </div>
      </div>

      {/* Feedback / Next Button Area */}
      <div className="mt-6 h-32">
         <AnimatePresence>
            {selectedOption && (
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className={`w-full p-4 rounded-3xl flex justify-between items-center ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}
                >
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${isCorrect ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                           {isCorrect ? <Check size={24} /> : <X size={24} />}
                        </div>
                        <div>
                           <h4 className={`font-black text-lg ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                              {isCorrect ? 'Awesome!' : 'Oops!'}
                           </h4>
                           {!isCorrect && <p className="text-red-600 text-sm font-semibold">Correct: {currentQ.correctAnswer}</p>}
                        </div>
                    </div>
                    
                    <button 
                        onClick={handleNext}
                        className={`px-6 py-3 rounded-xl font-bold text-white shadow-md ${isCorrect ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                    >
                        CONTINUE
                    </button>
                </motion.div>
            )}
         </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizScreen;