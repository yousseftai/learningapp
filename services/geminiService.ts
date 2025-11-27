import { GoogleGenAI, Type } from "@google/genai";
import { WordOfTheDay, QuizQuestion } from "../types";

// Fallback data in case API key is missing or fails (for robust demo)
const FALLBACK_WORD: WordOfTheDay = {
  word: "Serendipity",
  definition: "The occurrence and development of events by chance in a happy or beneficial way.",
  example: "It was pure serendipity that we met at the coffee shop right before the rain started.",
  synonyms: ["Chance", "Fate", "Luck"],
  emoji: "🍀",
  ipa: "/ˌsɛrənˈdɪpɪti/"
};

// Expanded pool for better fallback experience and longer quizzes
const FALLBACK_QUIZ_POOL: QuizQuestion[] = [
  {
    id: "q1",
    type: "multiple-choice",
    question: "Which word is a synonym for 'Happy'?",
    options: ["Sad", "Joyful", "Angry", "Tired"],
    correctAnswer: "Joyful"
  },
  {
    id: "q2",
    type: "fill-blank",
    question: "The cat sat ___ the mat.",
    options: ["in", "on", "at", "to"],
    correctAnswer: "on"
  },
  {
    id: "q3",
    type: "multiple-choice",
    question: "What is the opposite of 'Cold'?",
    options: ["Hot", "Freezing", "Cool", "Icy"],
    correctAnswer: "Hot"
  },
  {
    id: "q4",
    type: "multiple-choice",
    question: "Which of these is a fruit?",
    options: ["Carrot", "Apple", "Potato", "Broccoli"],
    correctAnswer: "Apple"
  },
  {
    id: "q5",
    type: "fill-blank",
    question: "She ___ to the store yesterday.",
    options: ["go", "goes", "went", "going"],
    correctAnswer: "went"
  },
  {
    id: "q6",
    type: "multiple-choice",
    question: "Select the correct plural form of 'Child'.",
    options: ["Childs", "Children", "Childrens", "Childes"],
    correctAnswer: "Children"
  },
  {
    id: "q7",
    type: "fill-blank",
    question: "I have been waiting ___ two hours.",
    options: ["since", "for", "in", "by"],
    correctAnswer: "for"
  },
  {
    id: "q8",
    type: "multiple-choice",
    question: "What does the idiom 'Break a leg' mean?",
    options: ["Get hurt", "Good luck", "Give up", "Run fast"],
    correctAnswer: "Good luck"
  },
  {
    id: "q9",
    type: "multiple-choice",
    question: "Which word is a verb?",
    options: ["Run", "Blue", "Table", "Quickly"],
    correctAnswer: "Run"
  },
  {
    id: "q10",
    type: "fill-blank",
    question: "He is ___ than his brother.",
    options: ["tall", "taller", "tallest", "more tall"],
    correctAnswer: "taller"
  }
];

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

const getRandomQuestions = (count: number): QuizQuestion[] => {
    const shuffled = [...FALLBACK_QUIZ_POOL].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

export const fetchDailyWord = async (): Promise<WordOfTheDay> => {
  const ai = getClient();
  if (!ai) return FALLBACK_WORD;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate a random, interesting English word for an intermediate learner. Include definition, example sentence, 3 synonyms, an emoji that represents it, and its IPA pronunciation.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            word: { type: Type.STRING },
            definition: { type: Type.STRING },
            example: { type: Type.STRING },
            synonyms: { type: Type.ARRAY, items: { type: Type.STRING } },
            emoji: { type: Type.STRING },
            ipa: { type: Type.STRING },
          },
          required: ["word", "definition", "example", "synonyms", "emoji", "ipa"],
        },
      },
    });

    const text = response.text;
    if (!text) return FALLBACK_WORD;
    return JSON.parse(text) as WordOfTheDay;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return FALLBACK_WORD;
  }
};

export const fetchQuiz = async (topic: string = "General English"): Promise<QuizQuestion[]> => {
  const ai = getClient();
  // Return 5 random questions if no API key
  if (!ai) return getRandomQuestions(5);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate 5 multiple-choice or fill-in-the-blank quiz questions about ${topic} for an English learner. Ensure they are varied and fun.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              question: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctAnswer: { type: Type.STRING },
              type: { type: Type.STRING, enum: ["multiple-choice", "fill-blank"] },
            },
            required: ["id", "question", "options", "correctAnswer", "type"],
          },
        },
      },
    });

    const text = response.text;
    if (!text) return getRandomQuestions(5);
    return JSON.parse(text) as QuizQuestion[];
  } catch (error) {
    console.error("Gemini API Error:", error);
    return getRandomQuestions(5);
  }
};