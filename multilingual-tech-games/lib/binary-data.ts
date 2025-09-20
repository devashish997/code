export interface BinaryChallenge {
  id: string
  type: "decimal-to-binary" | "binary-to-decimal" | "binary-arithmetic" | "binary-logic"
  question: {
    en: string
    hi: string
    od: string
  }
  value: number
  binaryValue?: string
  operation?: "add" | "subtract" | "multiply" | "and" | "or" | "xor"
  operand?: number
  operandBinary?: string
  correctAnswer: string
  difficulty: "easy" | "medium" | "hard"
  points: number
  hint: {
    en: string
    hi: string
    od: string
  }
}

export const binaryChallenges: BinaryChallenge[] = [
  {
    id: "1",
    type: "decimal-to-binary",
    question: {
      en: "Convert decimal 13 to binary",
      hi: "दशमलव 13 को बाइनरी में बदलें",
      od: "ଦଶମିକ 13 କୁ ବାଇନାରୀରେ ରୂପାନ୍ତର କରନ୍ତୁ",
    },
    value: 13,
    correctAnswer: "1101",
    difficulty: "easy",
    points: 10,
    hint: {
      en: "Divide by 2 repeatedly and read remainders from bottom to top",
      hi: "2 से बार-बार भाग दें और शेषफल को नीचे से ऊपर पढ़ें",
      od: "2 ଦ୍ୱାରା ବାରମ୍ବାର ଭାଗ କରନ୍ତୁ ଏବଂ ଅବଶିଷ୍ଟାଂଶକୁ ତଳୁ ଉପରକୁ ପଢ଼ନ୍ତୁ",
    },
  },
  {
    id: "2",
    type: "binary-to-decimal",
    question: {
      en: "Convert binary 1010 to decimal",
      hi: "बाइनरी 1010 को दशमलव में बदलें",
      od: "ବାଇନାରୀ 1010 କୁ ଦଶମିକରେ ରୂପାନ୍ତର କରନ୍ତୁ",
    },
    value: 10,
    binaryValue: "1010",
    correctAnswer: "10",
    difficulty: "easy",
    points: 10,
    hint: {
      en: "Multiply each digit by powers of 2: 1×8 + 0×4 + 1×2 + 0×1",
      hi: "प्रत्येक अंक को 2 की घात से गुणा करें: 1×8 + 0×4 + 1×2 + 0×1",
      od: "ପ୍ରତ୍ୟେକ ଅଙ୍କକୁ 2 ର ଘାତ ସହିତ ଗୁଣନ କରନ୍ତୁ: 1×8 + 0×4 + 1×2 + 0×1",
    },
  },
  {
    id: "3",
    type: "decimal-to-binary",
    question: {
      en: "Convert decimal 25 to binary",
      hi: "दशमलव 25 को बाइनरी में बदलें",
      od: "ଦଶମିକ 25 କୁ ବାଇନାରୀରେ ରୂପାନ୍ତର କରନ୍ତୁ",
    },
    value: 25,
    correctAnswer: "11001",
    difficulty: "medium",
    points: 15,
    hint: {
      en: "25 = 16 + 8 + 1 = 2⁴ + 2³ + 2⁰",
      hi: "25 = 16 + 8 + 1 = 2⁴ + 2³ + 2⁰",
      od: "25 = 16 + 8 + 1 = 2⁴ + 2³ + 2⁰",
    },
  },
  {
    id: "4",
    type: "binary-to-decimal",
    question: {
      en: "Convert binary 11110 to decimal",
      hi: "बाइनरी 11110 को दशमलव में बदलें",
      od: "ବାଇନାରୀ 11110 କୁ ଦଶମିକରେ ରୂପାନ୍ତର କରନ୍ତୁ",
    },
    value: 30,
    binaryValue: "11110",
    correctAnswer: "30",
    difficulty: "medium",
    points: 15,
    hint: {
      en: "1×16 + 1×8 + 1×4 + 1×2 + 0×1 = 30",
      hi: "1×16 + 1×8 + 1×4 + 1×2 + 0×1 = 30",
      od: "1×16 + 1×8 + 1×4 + 1×2 + 0×1 = 30",
    },
  },
  {
    id: "5",
    type: "binary-arithmetic",
    question: {
      en: "Add binary 1011 + 1101",
      hi: "बाइनरी 1011 + 1101 जोड़ें",
      od: "ବାଇନାରୀ 1011 + 1101 ଯୋଗ କରନ୍ତୁ",
    },
    value: 11,
    operand: 13,
    binaryValue: "1011",
    operandBinary: "1101",
    operation: "add",
    correctAnswer: "11000",
    difficulty: "hard",
    points: 25,
    hint: {
      en: "Add column by column: 1+1=10 (carry 1), like decimal addition",
      hi: "कॉलम के अनुसार जोड़ें: 1+1=10 (1 carry करें), दशमलव जोड़ की तरह",
      od: "ସ୍ତମ୍ଭ ଅନୁସାରେ ଯୋଗ କରନ୍ତୁ: 1+1=10 (1 carry କରନ୍ତୁ), ଦଶମିକ ଯୋଗ ପରି",
    },
  },
  {
    id: "6",
    type: "binary-logic",
    question: {
      en: "Perform binary AND: 1100 & 1010",
      hi: "बाइनरी AND करें: 1100 & 1010",
      od: "ବାଇନାରୀ AND କରନ୍ତୁ: 1100 & 1010",
    },
    value: 12,
    operand: 10,
    binaryValue: "1100",
    operandBinary: "1010",
    operation: "and",
    correctAnswer: "1000",
    difficulty: "hard",
    points: 20,
    hint: {
      en: "AND: 1&1=1, 1&0=0, 0&1=0, 0&0=0",
      hi: "AND: 1&1=1, 1&0=0, 0&1=0, 0&0=0",
      od: "AND: 1&1=1, 1&0=0, 0&1=0, 0&0=0",
    },
  },
]

export function generateRandomChallenge(difficulty: "easy" | "medium" | "hard"): BinaryChallenge {
  const challenges = binaryChallenges.filter((c) => c.difficulty === difficulty)
  return challenges[Math.floor(Math.random() * challenges.length)]
}

export function validateBinaryAnswer(answer: string, correct: string): boolean {
  // Remove leading zeros and compare
  const cleanAnswer = answer.replace(/^0+/, "") || "0"
  const cleanCorrect = correct.replace(/^0+/, "") || "0"
  return cleanAnswer === cleanCorrect
}

export function decimalToBinary(decimal: number): string {
  return decimal.toString(2)
}

export function binaryToDecimal(binary: string): number {
  return Number.parseInt(binary, 2)
}
