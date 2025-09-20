export interface QuizQuestion {
  id: string
  question: {
    en: string
    hi: string
    od: string
  }
  options: {
    en: string[]
    hi: string[]
    od: string[]
  }
  correctAnswer: number
  difficulty: "easy" | "medium" | "hard"
  category: "javascript" | "python" | "algorithms" | "data-structures" | "general"
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "1",
    question: {
      en: "What is the correct way to declare a variable in JavaScript?",
      hi: "JavaScript में वेरिएबल डिक्लेयर करने का सही तरीका क्या है?",
      od: "JavaScript ରେ ଭେରିଏବଲ ଡିକ୍ଲେୟାର କରିବାର ସଠିକ ଉପାୟ କଣ?",
    },
    options: {
      en: ["var myVar = 5;", "variable myVar = 5;", "v myVar = 5;", "declare myVar = 5;"],
      hi: ["var myVar = 5;", "variable myVar = 5;", "v myVar = 5;", "declare myVar = 5;"],
      od: ["var myVar = 5;", "variable myVar = 5;", "v myVar = 5;", "declare myVar = 5;"],
    },
    correctAnswer: 0,
    difficulty: "easy",
    category: "javascript",
  },
  {
    id: "2",
    question: {
      en: "Which data structure uses LIFO (Last In, First Out) principle?",
      hi: "कौन सा डेटा स्ट्रक्चर LIFO (Last In, First Out) सिद्धांत का उपयोग करता है?",
      od: "କେଉଁ ଡାଟା ଷ୍ଟ୍ରକଚର LIFO (Last In, First Out) ସିଦ୍ଧାନ୍ତ ବ୍ୟବହାର କରେ?",
    },
    options: {
      en: ["Queue", "Stack", "Array", "Linked List"],
      hi: ["Queue", "Stack", "Array", "Linked List"],
      od: ["Queue", "Stack", "Array", "Linked List"],
    },
    correctAnswer: 1,
    difficulty: "medium",
    category: "data-structures",
  },
  {
    id: "3",
    question: {
      en: "What is the time complexity of binary search?",
      hi: "बाइनरी सर्च की टाइम कॉम्प्लेक्सिटी क्या है?",
      od: "ବାଇନାରୀ ସର୍ଚର ଟାଇମ କମ୍ପ୍ଲେକ୍ସିଟି କଣ?",
    },
    options: {
      en: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      hi: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      od: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    },
    correctAnswer: 1,
    difficulty: "medium",
    category: "algorithms",
  },
  {
    id: "4",
    question: {
      en: "Which Python keyword is used to define a function?",
      hi: "Python में फंक्शन डिफाइन करने के लिए कौन सा कीवर्ड उपयोग किया जाता है?",
      od: "Python ରେ ଫଙ୍କସନ ଡିଫାଇନ କରିବା ପାଇଁ କେଉଁ କୀୱାର୍ଡ ବ୍ୟବହାର କରାଯାଏ?",
    },
    options: {
      en: ["function", "def", "define", "func"],
      hi: ["function", "def", "define", "func"],
      od: ["function", "def", "define", "func"],
    },
    correctAnswer: 1,
    difficulty: "easy",
    category: "python",
  },
  {
    id: "5",
    question: {
      en: "What does HTML stand for?",
      hi: "HTML का पूरा नाम क्या है?",
      od: "HTML ର ପୂର୍ଣ୍ଣ ନାମ କଣ?",
    },
    options: {
      en: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Home Tool Markup Language",
        "Hyperlink and Text Markup Language",
      ],
      hi: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Home Tool Markup Language",
        "Hyperlink and Text Markup Language",
      ],
      od: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Home Tool Markup Language",
        "Hyperlink and Text Markup Language",
      ],
    },
    correctAnswer: 0,
    difficulty: "easy",
    category: "general",
  },
  {
    id: "6",
    question: {
      en: "Which sorting algorithm has the best average-case time complexity?",
      hi: "किस सॉर्टिंग एल्गोरिदम की सबसे अच्छी औसत-केस टाइम कॉम्प्लेक्सिटी है?",
      od: "କେଉଁ ସର୍ଟିଂ ଆଲଗୋରିଦମର ସର୍ବୋତ୍ତମ ଔସତ-କେସ ଟାଇମ କମ୍ପ୍ଲେକ୍ସିଟି ଅଛି?",
    },
    options: {
      en: ["Bubble Sort", "Quick Sort", "Selection Sort", "Insertion Sort"],
      hi: ["Bubble Sort", "Quick Sort", "Selection Sort", "Insertion Sort"],
      od: ["Bubble Sort", "Quick Sort", "Selection Sort", "Insertion Sort"],
    },
    correctAnswer: 1,
    difficulty: "hard",
    category: "algorithms",
  },
]

export interface LeaderboardEntry {
  id: string
  name: string
  score: number
  timeCompleted: number
  date: string
}

export const mockLeaderboard: LeaderboardEntry[] = [
  { id: "1", name: "CodeMaster", score: 95, timeCompleted: 120, date: "2024-01-15" },
  { id: "2", name: "AlgoExpert", score: 90, timeCompleted: 135, date: "2024-01-14" },
  { id: "3", name: "DevNinja", score: 85, timeCompleted: 140, date: "2024-01-13" },
  { id: "4", name: "TechGuru", score: 80, timeCompleted: 150, date: "2024-01-12" },
  { id: "5", name: "ByteHunter", score: 75, timeCompleted: 160, date: "2024-01-11" },
]
