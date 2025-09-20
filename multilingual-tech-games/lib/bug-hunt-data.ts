export interface BugHuntChallenge {
  id: string
  title: {
    en: string
    hi: string
    od: string
  }
  description: {
    en: string
    hi: string
    od: string
  }
  code: string
  language: "javascript" | "python" | "java" | "cpp"
  bugs: {
    line: number
    column: number
    type: "syntax" | "logic" | "runtime"
    description: {
      en: string
      hi: string
      od: string
    }
    fix: string
  }[]
  difficulty: "easy" | "medium" | "hard"
  points: number
}

export const bugHuntChallenges: BugHuntChallenge[] = [
  {
    id: "1",
    title: {
      en: "Missing Semicolon",
      hi: "गुम सेमीकोलन",
      od: "ଅନୁପସ୍ଥିତ ସେମିକୋଲନ",
    },
    description: {
      en: "Find the syntax error in this JavaScript function",
      hi: "इस JavaScript फंक्शन में सिंटैक्स एरर खोजें",
      od: "ଏହି JavaScript ଫଙ୍କସନରେ ସିଣ୍ଟାକ୍ସ ଏରର ଖୋଜନ୍ତୁ",
    },
    code: `function calculateSum(a, b) {
    let result = a + b
    console.log("Sum is: " + result);
    return result;
}

calculateSum(5, 3);`,
    language: "javascript",
    bugs: [
      {
        line: 2,
        column: 21,
        type: "syntax",
        description: {
          en: "Missing semicolon after variable declaration",
          hi: "वेरिएबल डिक्लेरेशन के बाद सेमीकोलन गुम है",
          od: "ଭେରିଏବଲ ଡିକ୍ଲେରେସନ ପରେ ସେମିକୋଲନ ଅନୁପସ୍ଥିତ",
        },
        fix: "let result = a + b;",
      },
    ],
    difficulty: "easy",
    points: 10,
  },
  {
    id: "2",
    title: {
      en: "Array Index Error",
      hi: "एरे इंडेक्स एरर",
      od: "ଆରେ ଇଣ୍ଡେକ୍ସ ଏରର",
    },
    description: {
      en: "Find the logic error in this array access",
      hi: "इस एरे एक्सेस में लॉजिक एरर खोजें",
      od: "ଏହି ଆରେ ଆକ୍ସେସରେ ଲଜିକ ଏରର ଖୋଜନ୍ତୁ",
    },
    code: `function getLastElement(arr) {
    if (arr.length > 0) {
        return arr[arr.length];
    }
    return null;
}

let numbers = [1, 2, 3, 4, 5];
console.log(getLastElement(numbers));`,
    language: "javascript",
    bugs: [
      {
        line: 3,
        column: 16,
        type: "logic",
        description: {
          en: "Array index should be length - 1, not length",
          hi: "एरे इंडेक्स length - 1 होना चाहिए, length नहीं",
          od: "ଆରେ ଇଣ୍ଡେକ୍ସ length - 1 ହେବା ଉଚିତ, length ନୁହେଁ",
        },
        fix: "return arr[arr.length - 1];",
      },
    ],
    difficulty: "medium",
    points: 15,
  },
  {
    id: "3",
    title: {
      en: "Infinite Loop",
      hi: "अनंत लूप",
      od: "ଅସୀମ ଲୁପ",
    },
    description: {
      en: "Find the bug causing an infinite loop",
      hi: "अनंत लूप का कारण बनने वाला बग खोजें",
      od: "ଅସୀମ ଲୁପର କାରଣ ହେଉଥିବା ବଗ ଖୋଜନ୍ତୁ",
    },
    code: `function countdown(n) {
    while (n > 0) {
        console.log(n);
        // Missing decrement
    }
    console.log("Done!");
}

countdown(5);`,
    language: "javascript",
    bugs: [
      {
        line: 4,
        column: 8,
        type: "logic",
        description: {
          en: "Missing decrement operation for loop variable",
          hi: "लूप वेरिएबल के लिए डिक्रिमेंट ऑपरेशन गुम है",
          od: "ଲୁପ ଭେରିଏବଲ ପାଇଁ ଡିକ୍ରିମେଣ୍ଟ ଅପରେସନ ଅନୁପସ୍ଥିତ",
        },
        fix: "n--;",
      },
    ],
    difficulty: "medium",
    points: 20,
  },
  {
    id: "4",
    title: {
      en: "Python Indentation",
      hi: "पायथन इंडेंटेशन",
      od: "ପାଇଥନ ଇଣ୍ଡେଣ୍ଟେସନ",
    },
    description: {
      en: "Find the indentation error in this Python code",
      hi: "इस Python कोड में इंडेंटेशन एरर खोजें",
      od: "ଏହି Python କୋଡରେ ଇଣ୍ଡେଣ୍ଟେସନ ଏରର ଖୋଜନ୍ତୁ",
    },
    code: `def calculate_grade(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
elif score >= 70:
        return "C"
    else:
        return "F"

print(calculate_grade(85))`,
    language: "python",
    bugs: [
      {
        line: 6,
        column: 1,
        type: "syntax",
        description: {
          en: "Incorrect indentation for elif statement",
          hi: "elif स्टेटमेंट के लिए गलत इंडेंटेशन",
          od: "elif ଷ୍ଟେଟମେଣ୍ଟ ପାଇଁ ଭୁଲ ଇଣ୍ଡେଣ୍ଟେସନ",
        },
        fix: "    elif score >= 70:",
      },
    ],
    difficulty: "easy",
    points: 10,
  },
  {
    id: "5",
    title: {
      en: "Division by Zero",
      hi: "शून्य से भाग",
      od: "ଶୂନ୍ୟ ଦ୍ୱାରା ଭାଗ",
    },
    description: {
      en: "Find the runtime error in this division function",
      hi: "इस डिवीजन फंक्शन में रनटाइम एरर खोजें",
      od: "ଏହି ଡିଭିଜନ ଫଙ୍କସନରେ ରନଟାଇମ ଏରର ଖୋଜନ୍ତୁ",
    },
    code: `function divide(a, b) {
    return a / b;
}

function calculateAverage(numbers) {
    let sum = numbers.reduce((a, b) => a + b, 0);
    return divide(sum, numbers.length);
}

let emptyArray = [];
console.log(calculateAverage(emptyArray));`,
    language: "javascript",
    bugs: [
      {
        line: 2,
        column: 12,
        type: "runtime",
        description: {
          en: "No check for division by zero when b is 0",
          hi: "जब b 0 है तो शून्य से भाग की जांच नहीं है",
          od: "ଯେତେବେଳେ b 0 ହୁଏ ତେତେବେଳେ ଶୂନ୍ୟ ଦ୍ୱାରା ଭାଗର ଯାଞ୍ଚ ନାହିଁ",
        },
        fix: "if (b === 0) throw new Error('Division by zero'); return a / b;",
      },
    ],
    difficulty: "hard",
    points: 25,
  },
]
