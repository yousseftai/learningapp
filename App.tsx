import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import HomeScreen from './screens/HomeScreen';
import DailyWordScreen from './screens/DailyWordScreen';
import QuizScreen from './screens/QuizScreen';
import ProfileScreen from './screens/ProfileScreen';
import SignUpScreen from './screens/SignUpScreen';
import { Screen, UserStats } from './types';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.HOME);
  
  // Initialize Stats from LocalStorage or Default
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('lingopop-stats');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      name: '', // Empty name triggers SignUp flow
      xp: 0,
      streak: 1,
      lastLoginDate: new Date().toISOString().split('T')[0],
      wordsLearned: 0,
      lessonsCompleted: 0,
      level: 1
    };
  });

  // Save stats on change
  useEffect(() => {
    localStorage.setItem('lingopop-stats', JSON.stringify(stats));
  }, [stats]);

  // Handle XP gain
  const addXp = (amount: number) => {
    setStats(prev => {
      const newXp = prev.xp + amount;
      const newLevel = Math.floor(newXp / 100) + 1;
      
      // Simple logic to increment counters based on screen context
      const newLessons = currentScreen === Screen.QUIZ ? prev.lessonsCompleted + 1 : prev.lessonsCompleted;
      const newWords = currentScreen === Screen.DAILY_WORD ? prev.wordsLearned + 1 : prev.wordsLearned;

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        lessonsCompleted: newLessons,
        wordsLearned: newWords
      };
    });
    // Return to home immediately after completion logic is handled
    setCurrentScreen(Screen.HOME);
  };

  const handleSignUp = (name: string) => {
    setStats(prev => ({ ...prev, name }));
  };

  // If no name is set, show Sign Up Screen
  if (!stats.name) {
    return <SignUpScreen onSignUp={handleSignUp} />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.HOME:
        return <HomeScreen stats={stats} onNavigate={setCurrentScreen} />;
      case Screen.DAILY_WORD:
        return <DailyWordScreen onComplete={addXp} />;
      case Screen.QUIZ:
        return <QuizScreen onComplete={addXp} />;
      case Screen.PROFILE:
        return <ProfileScreen stats={stats} />;
      default:
        return <HomeScreen stats={stats} onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <Layout currentScreen={currentScreen} onNavigate={setCurrentScreen}>
      {renderScreen()}
    </Layout>
  );
}

export default App;