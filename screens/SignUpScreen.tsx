import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Mascot from '../components/Mascot';

interface SignUpScreenProps {
  onSignUp: (name: string) => void;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ onSignUp }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length === 0) {
      setError(true);
      return;
    }
    onSignUp(name.trim());
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-10%] right-[-20%] w-64 h-64 bg-teal-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-[-10%] left-[-20%] w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-50" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 relative"
      >
        <Mascot emotion="excited" size={160} />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full max-w-sm text-center z-10"
      >
        <h1 className="text-3xl font-black text-slate-800 mb-2">Welcome to LingoPop!</h1>
        <p className="text-slate-500 font-medium mb-8">The fun way to learn English every day.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(false);
              }}
              placeholder="What should we call you?"
              className={`w-full p-4 rounded-2xl bg-slate-50 border-2 text-lg font-bold text-slate-800 outline-none transition-all ${
                error 
                  ? 'border-red-400 bg-red-50 placeholder-red-300' 
                  : 'border-slate-200 focus:border-teal-400 focus:bg-white'
              }`}
            />
            {error && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-red-500 text-sm font-bold mt-2 text-left ml-2"
              >
                Please enter your name!
              </motion.p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 bg-teal-500 text-white font-black text-xl rounded-2xl shadow-[0_4px_0_rgb(13,148,136)] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-2 mt-2"
          >
            Start Learning <ArrowRight size={24} strokeWidth={3} />
          </motion.button>
        </form>
      </motion.div>

      <p className="absolute bottom-8 text-xs text-slate-400 font-bold uppercase tracking-widest">
        Learn • Play • Grow
      </p>
    </div>
  );
};

export default SignUpScreen;