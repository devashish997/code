export type Language = "en" | "hi" | "od"

export interface Translations {
  // Language Selection
  selectLanguage: string
  english: string
  hindi: string
  odia: string

  // Main Interface
  welcome: string
  subtitle: string
  selectGame: string

  // Games
  codeQuizBattle: string
  bugHunt: string
  binaryChallenges: string

  // Game Descriptions
  codeQuizDesc: string
  bugHuntDesc: string
  binaryDesc: string

  // Common UI
  play: string
  start: string
  back: string
  next: string
  submit: string
  score: string
  leaderboard: string
  timer: string

  // Code Quiz Battle
  question: string
  answer: string
  correct: string
  incorrect: string
  timeUp: string

  // Bug Hunt
  findBug: string
  bugFound: string
  noBugFound: string

  // Binary Challenges
  convertToBinary: string
  convertToDecimal: string
  binaryResult: string
}

export const translations: Record<Language, Translations> = {
  en: {
    // Language Selection
    selectLanguage: "Select Language",
    english: "English",
    hindi: "हिंदी",
    odia: "ଓଡ଼ିଆ",

    // Main Interface
    welcome: "Welcome to TechCode Arena",
    subtitle: "Master programming through interactive challenges",
    selectGame: "Choose Your Challenge",

    // Games
    codeQuizBattle: "Code Quiz Battle",
    bugHunt: "Bug Hunt",
    binaryChallenges: "Binary Challenges",

    // Game Descriptions
    codeQuizDesc: "Test your programming knowledge with timed multiple-choice questions and compete on the leaderboard",
    bugHuntDesc: "Spot errors in code snippets and improve your debugging skills",
    binaryDesc: "Master binary number system with conversion challenges",

    // Common UI
    play: "Play",
    start: "Start",
    back: "Back",
    next: "Next",
    submit: "Submit",
    score: "Score",
    leaderboard: "Leaderboard",
    timer: "Timer",

    // Code Quiz Battle
    question: "Question",
    answer: "Answer",
    correct: "Correct!",
    incorrect: "Incorrect",
    timeUp: "Time's Up!",

    // Bug Hunt
    findBug: "Find the Bug",
    bugFound: "Bug Found!",
    noBugFound: "No Bug Found",

    // Binary Challenges
    convertToBinary: "Convert to Binary",
    convertToDecimal: "Convert to Decimal",
    binaryResult: "Result",
  },

  hi: {
    // Language Selection
    selectLanguage: "भाषा चुनें",
    english: "English",
    hindi: "हिंदी",
    odia: "ଓଡ଼ିଆ",

    // Main Interface
    welcome: "टेककोड एरिना में आपका स्वागत है",
    subtitle: "इंटरैक्टिव चुनौतियों के माध्यम से प्रोग्रामिंग में महारत हासिल करें",
    selectGame: "अपनी चुनौती चुनें",

    // Games
    codeQuizBattle: "कोड क्विज़ बैटल",
    bugHunt: "बग हंट",
    binaryChallenges: "बाइनरी चुनौतियां",

    // Game Descriptions
    codeQuizDesc: "समयबद्ध बहुविकल्पीय प्रश्नों के साथ अपने प्रोग्रामिंग ज्ञान का परीक्षण करें और लीडरबोर्ड पर प्रतिस्पर्धा करें",
    bugHuntDesc: "कोड स्निपेट्स में त्रुटियों को खोजें और अपने डिबगिंग कौशल में सुधार करें",
    binaryDesc: "रूपांतरण चुनौतियों के साथ बाइनरी संख्या प्रणाली में महारत हासिल करें",

    // Common UI
    play: "खेलें",
    start: "शुरू करें",
    back: "वापस",
    next: "अगला",
    submit: "जमा करें",
    score: "स्कोर",
    leaderboard: "लीडरबोर्ड",
    timer: "टाइमर",

    // Code Quiz Battle
    question: "प्रश्न",
    answer: "उत्तर",
    correct: "सही!",
    incorrect: "गलत",
    timeUp: "समय समाप्त!",

    // Bug Hunt
    findBug: "बग खोजें",
    bugFound: "बग मिला!",
    noBugFound: "कोई बग नहीं मिला",

    // Binary Challenges
    convertToBinary: "बाइनरी में बदलें",
    convertToDecimal: "दशमलव में बदलें",
    binaryResult: "परिणाम",
  },

  od: {
    // Language Selection
    selectLanguage: "ଭାଷା ବାଛନ୍ତୁ",
    english: "English",
    hindi: "हिंदी",
    odia: "ଓଡ଼ିଆ",

    // Main Interface
    welcome: "ଟେକକୋଡ଼ ଆରେନାରେ ଆପଣଙ୍କୁ ସ୍ୱାଗତ",
    subtitle: "ଇଣ୍ଟରାକ୍ଟିଭ ଚ୍ୟାଲେଞ୍ଜ ମାଧ୍ୟମରେ ପ୍ରୋଗ୍ରାମିଂରେ ଦକ୍ଷତା ହାସଲ କରନ୍ତୁ",
    selectGame: "ଆପଣଙ୍କ ଚ୍ୟାଲେଞ୍ଜ ବାଛନ୍ତୁ",

    // Games
    codeQuizBattle: "କୋଡ଼ କୁଇଜ଼ ବ୍ୟାଟଲ",
    bugHunt: "ବଗ ହଣ୍ଟ",
    binaryChallenges: "ବାଇନାରୀ ଚ୍ୟାଲେଞ୍ଜ",

    // Game Descriptions
    codeQuizDesc: "ସମୟବଦ୍ଧ ବହୁବିକଳ୍ପ ପ୍ରଶ୍ନ ସହିତ ଆପଣଙ୍କ ପ୍ରୋଗ୍ରାମିଂ ଜ୍ଞାନ ପରୀକ୍ଷା କରନ୍ତୁ ଏବଂ ଲିଡରବୋର୍ଡରେ ପ୍ରତିଯୋଗିତା କରନ୍ତୁ",
    bugHuntDesc: "କୋଡ଼ ସ୍ନିପେଟରେ ତ୍ରୁଟି ଖୋଜନ୍ତୁ ଏବଂ ଆପଣଙ୍କ ଡିବଗିଂ କୌଶଳ ଉନ୍ନତ କରନ୍ତୁ",
    binaryDesc: "ରୂପାନ୍ତରଣ ଚ୍ୟାଲେଞ୍ଜ ସହିତ ବାଇନାରୀ ସଂଖ୍ୟା ପ୍ରଣାଳୀରେ ଦକ୍ଷତା ହାସଲ କରନ୍ତୁ",

    // Common UI
    play: "ଖେଳନ୍ତୁ",
    start: "ଆରମ୍ଭ କରନ୍ତୁ",
    back: "ପଛକୁ",
    next: "ପରବର୍ତ୍ତୀ",
    submit: "ଦାଖଲ କରନ୍ତୁ",
    score: "ସ୍କୋର",
    leaderboard: "ଲିଡରବୋର୍ଡ",
    timer: "ଟାଇମର",

    // Code Quiz Battle
    question: "ପ୍ରଶ୍ନ",
    answer: "ଉତ୍ତର",
    correct: "ସଠିକ!",
    incorrect: "ଭୁଲ",
    timeUp: "ସମୟ ସମାପ୍ତ!",

    // Bug Hunt
    findBug: "ବଗ ଖୋଜନ୍ତୁ",
    bugFound: "ବଗ ମିଳିଲା!",
    noBugFound: "କୌଣସି ବଗ ମିଳିଲା ନାହିଁ",

    // Binary Challenges
    convertToBinary: "ବାଇନାରୀରେ ରୂପାନ୍ତର କରନ୍ତୁ",
    convertToDecimal: "ଦଶମିକରେ ରୂପାନ୍ତର କରନ୍ତୁ",
    binaryResult: "ଫଳାଫଳ",
  },
}
