export type LessonCheckQuestion =
  | {
      id: string;
      kind: "text";
      prompt: string;
      acceptedAnswers: string[];
      explanation: string;
    }
  | {
      id: string;
      kind: "numeric";
      prompt: string;
      value: number;
      unit?: string;
      tolerance?: number;
      explanation: string;
    };

export type LessonCheck = {
  id: string;
  title: string;
  description: string;
  questions: LessonCheckQuestion[];
};

export const lessonChecks: LessonCheck[] = [
  {
    id: "arithmetic-units-core-check",
    title: "Arithmetic, Units, and Estimation Check",
    description:
      "Enter the result with units when units are requested. These checks are intentionally small so you can verify the core habits before moving on.",
    questions: [
      {
        id: "quantity-parts",
        kind: "text",
        prompt: "What two parts does a measured quantity have?",
        acceptedAnswers: ["number and unit", "a number and a unit", "number plus unit", "value and unit"],
        explanation: "A measured quantity combines a numerical value with a unit, such as 12 V or 3.5 A.",
      },
      {
        id: "minutes-to-hours",
        kind: "numeric",
        prompt: "Convert 30 minutes to hours.",
        value: 0.5,
        unit: "h",
        tolerance: 0.0001,
        explanation: "30 minutes is 30 / 60 hours, which is 0.5 h.",
      },
      {
        id: "speed-time-distance",
        kind: "numeric",
        prompt: "A rover moves at 0.6 m/s for 20 s. How far does it travel?",
        value: 12,
        unit: "m",
        tolerance: 0.0001,
        explanation: "Distance = speed x time = 0.6 m/s x 20 s = 12 m.",
      },
      {
        id: "ma-to-a",
        kind: "numeric",
        prompt: "Convert 75 mA to amps.",
        value: 0.075,
        unit: "A",
        tolerance: 0.000001,
        explanation: "1 mA = 0.001 A, so 75 mA = 75 x 0.001 A = 0.075 A.",
      },
      {
        id: "scientific-notation",
        kind: "text",
        prompt: "Write 0.0068 in scientific notation.",
        acceptedAnswers: ["6.8 x 10^-3", "6.8*10^-3", "6.8x10^-3", "6.8e-3", "6.8 x 10-3"],
        explanation: "Move the decimal 3 places right to get 6.8, so the power of ten is -3.",
      },
    ],
  },
  {
    id: "fractions-ratios-core-check",
    title: "Fractions, Ratios, and Proportions Check",
    description:
      "Use labels and units where requested. The goal is to verify whether you know what is being compared.",
    questions: [
      {
        id: "simplify-fraction",
        kind: "text",
        prompt: "Simplify 6/9.",
        acceptedAnswers: ["2/3", "two thirds", "2 thirds"],
        explanation: "Divide numerator and denominator by 3: 6/9 = 2/3.",
      },
      {
        id: "unit-rate",
        kind: "numeric",
        prompt: "A robot travels 15 m in 3 s. What is its unit rate?",
        value: 5,
        unit: "m/s",
        tolerance: 0.0001,
        explanation: "Unit rate = 15 m / 3 s = 5 m/s.",
      },
      {
        id: "map-scale",
        kind: "numeric",
        prompt: "A map scale is 1 cm = 2.5 m. A line is 12 cm. What real distance does it represent?",
        value: 30,
        unit: "m",
        tolerance: 0.0001,
        explanation: "12 cm is 12 times the map unit, so 12 x 2.5 m = 30 m.",
      },
      {
        id: "gear-ratio",
        kind: "numeric",
        prompt: "A motor spins at 1800 RPM through a 6:1 reduction. What is output RPM?",
        value: 300,
        unit: "RPM",
        tolerance: 0.0001,
        explanation: "For a 6:1 reduction, output RPM = 1800 / 6 = 300 RPM.",
      },
      {
        id: "part-whole",
        kind: "text",
        prompt: "A kit has 2 motors and 6 propellers. What fraction of the 8 total parts are motors?",
        acceptedAnswers: ["1/4", "2/8", "one fourth", "one quarter", "0.25"],
        explanation: "There are 2 motors out of 8 total parts, so 2/8 = 1/4.",
      },
    ],
  },
  {
    id: "signed-numbers-core-check",
    title: "Signed Numbers and Order of Operations Check",
    description:
      "Check signs, parentheses, and physical meaning carefully. Most mistakes in this lesson are small marks with large consequences.",
    questions: [
      {
        id: "opposite",
        kind: "numeric",
        prompt: "What is the opposite of -8?",
        value: 8,
        tolerance: 0,
        explanation: "The opposite is the same distance from zero on the other side, so the opposite of -8 is 8.",
      },
      {
        id: "absolute-value",
        kind: "numeric",
        prompt: "What is |-12|?",
        value: 12,
        tolerance: 0,
        explanation: "Absolute value is distance from zero. Distance is never negative.",
      },
      {
        id: "subtract-negative",
        kind: "numeric",
        prompt: "Calculate 5 - (-4).",
        value: 9,
        tolerance: 0,
        explanation: "Subtracting a negative is adding the opposite: 5 - (-4) = 5 + 4 = 9.",
      },
      {
        id: "negative-square-no-parentheses",
        kind: "numeric",
        prompt: "Calculate -3^2.",
        value: -9,
        tolerance: 0,
        explanation: "Without parentheses, the exponent applies to 3 first, then the negative sign is applied: -3^2 = -(9) = -9.",
      },
      {
        id: "distance-vs-displacement",
        kind: "text",
        prompt: "Which can be negative: distance or displacement?",
        acceptedAnswers: ["displacement", "displacement can be negative", "displacement can"],
        explanation: "Distance is total path length and is never negative. Displacement is change in position and can be positive, negative, or zero.",
      },
    ],
  },
  {
    id: "place-value-and-whole-number-arithmetic-check",
    title: "Place Value and Whole-Number Arithmetic Check",
    description:
      "Quick checks on positional notation, expanded form, the standard arithmetic algorithms, and estimation.",
    questions: [
      {
        id: "expanded-form-thousand-place",
        kind: "numeric",
        prompt: "In the number 6,073, what digit is in the thousands place?",
        value: 6,
        tolerance: 0,
        explanation: "Reading from the left: 6 is thousands, 0 is hundreds, 7 is tens, 3 is ones.",
      },
      {
        id: "expanded-form-zero-role",
        kind: "text",
        prompt: "What role does the 0 play in 6,073? Answer in two or three words.",
        acceptedAnswers: ["placeholder", "place holder", "holds a place", "holds the hundreds place", "placeholder for hundreds"],
        explanation: "The 0 holds the hundreds place. Without it, the number would collapse to 673.",
      },
      {
        id: "addition-with-carries",
        kind: "numeric",
        prompt: "Compute 487 + 296.",
        value: 783,
        tolerance: 0,
        explanation: "7 + 6 = 13 (write 3, carry 1). 8 + 9 + 1 = 18 (write 8, carry 1). 4 + 2 + 1 = 7. Result 783.",
      },
      {
        id: "subtraction-with-borrows",
        kind: "numeric",
        prompt: "Compute 1,000 - 1.",
        value: 999,
        tolerance: 0,
        explanation: "Cascading borrow: 1,000 - 1 = 999.",
      },
      {
        id: "multiplication-shift",
        kind: "numeric",
        prompt: "Compute 43 × 27.",
        value: 1161,
        tolerance: 0,
        explanation: "43 × 7 = 301; 43 × 20 = 860; sum = 1,161.",
      },
      {
        id: "binary-to-decimal",
        kind: "numeric",
        prompt: "Convert the binary number 1011 to decimal.",
        value: 11,
        tolerance: 0,
        explanation: "1·8 + 0·4 + 1·2 + 1·1 = 11.",
      },
      {
        id: "hex-to-decimal",
        kind: "numeric",
        prompt: "Convert the hexadecimal number FF to decimal.",
        value: 255,
        tolerance: 0,
        explanation: "15·16 + 15·1 = 240 + 15 = 255.",
      },
      {
        id: "estimation",
        kind: "numeric",
        prompt: "Estimate 9,183 × 421 by rounding each to its leading digit. What is the rough estimate?",
        value: 3600000,
        tolerance: 200000,
        explanation: "9,183 ≈ 9,000 and 421 ≈ 400. 9,000 × 400 = 3,600,000. (The exact answer is 3,866,043 — same order of magnitude.)",
      },
    ],
  },
  {
    id: "multiplication-tables-and-factor-fluency-check",
    title: "Multiplication Tables and Factor Fluency Check",
    description:
      "Quick checks on single-digit products, squares, factor lists, divisibility rules, and prime recognition.",
    questions: [
      {
        id: "times-7-8",
        kind: "numeric",
        prompt: "Compute 7 × 8.",
        value: 56,
        tolerance: 0,
        explanation: "56. One of the highest-traffic single-digit facts; learn it cold.",
      },
      {
        id: "times-9-6",
        kind: "numeric",
        prompt: "Compute 9 × 6.",
        value: 54,
        tolerance: 0,
        explanation: "54. Pattern check: digits sum to 9 (5 + 4 = 9).",
      },
      {
        id: "square-15",
        kind: "numeric",
        prompt: "Compute 15 squared.",
        value: 225,
        tolerance: 0,
        explanation: "15² = 225. Worth knowing on sight.",
      },
      {
        id: "factor-of-36",
        kind: "numeric",
        prompt: "How many distinct positive factors does 36 have? (Hint: 36 = 2^2 · 3^2.)",
        value: 9,
        tolerance: 0,
        explanation: "Factors of 36 are {1, 2, 3, 4, 6, 9, 12, 18, 36} — nine factors.",
      },
      {
        id: "divisible-by-3",
        kind: "text",
        prompt: "Is 471 divisible by 3? Answer 'yes' or 'no'.",
        acceptedAnswers: ["yes", "yes it is", "yes 471 is divisible by 3"],
        explanation: "The digit sum is 4 + 7 + 1 = 12, which is divisible by 3, so 471 is divisible by 3 (471 / 3 = 157).",
      },
      {
        id: "is-91-prime",
        kind: "text",
        prompt: "Is 91 prime? Answer 'yes' or 'no'.",
        acceptedAnswers: ["no", "no it is not prime", "no it isn't prime", "not prime"],
        explanation: "91 = 7 × 13. Not prime.",
      },
      {
        id: "primes-under-20",
        kind: "numeric",
        prompt: "How many prime numbers are there between 2 and 20 inclusive?",
        value: 8,
        tolerance: 0,
        explanation: "{2, 3, 5, 7, 11, 13, 17, 19} — eight primes.",
      },
    ],
  },
  {
    id: "long-division-and-divisibility-check",
    title: "Long Division and Divisibility Check",
    description:
      "Quick checks on the long-division algorithm, decimal expansions, the divisibility rules, and a touch of modular arithmetic.",
    questions: [
      {
        id: "quotient-no-remainder",
        kind: "numeric",
        prompt: "Compute 792 ÷ 6.",
        value: 132,
        tolerance: 0,
        explanation: "6 × 132 = 792.",
      },
      {
        id: "quotient-with-remainder",
        kind: "numeric",
        prompt: "Compute 785 ÷ 23. Give the quotient only (ignore the remainder).",
        value: 34,
        tolerance: 0,
        explanation: "23 × 34 = 782; remainder 3.",
      },
      {
        id: "remainder",
        kind: "numeric",
        prompt: "Compute the remainder of 785 ÷ 23.",
        value: 3,
        tolerance: 0,
        explanation: "23 × 34 = 782; 785 − 782 = 3.",
      },
      {
        id: "decimal-terminate",
        kind: "numeric",
        prompt: "Compute 13 ÷ 8 as a decimal.",
        value: 1.625,
        tolerance: 0.0001,
        explanation: "8 × 1.625 = 13. The decimal terminates because 8 = 2³ has only 2 as a prime factor.",
      },
      {
        id: "mod-by-7",
        kind: "numeric",
        prompt: "What is 123 mod 7?",
        value: 4,
        tolerance: 0,
        explanation: "123 = 7 · 17 + 4, so 123 mod 7 = 4.",
      },
      {
        id: "div-by-9-rule",
        kind: "text",
        prompt: "Is 1,234,567 divisible by 9? Answer 'yes' or 'no'.",
        acceptedAnswers: ["no", "no it is not", "no, it is not"],
        explanation: "Digit sum: 1+2+3+4+5+6+7 = 28. 28 is not divisible by 9, so 1,234,567 is not divisible by 9.",
      },
      {
        id: "time-conversion",
        kind: "numeric",
        prompt: "How many full hours are in 10,000 seconds?",
        value: 2,
        tolerance: 0,
        explanation: "10,000 ÷ 3,600 = 2 hours with remainder 2,800 seconds.",
      },
    ],
  },
  {
    id: "gcd-lcm-and-prime-factorization-check",
    title: "GCD, LCM, and Prime Factorization Check",
    description:
      "Quick checks on prime factorization, GCD via Euclidean algorithm, LCM, and modular inverses.",
    questions: [
      {
        id: "factor-1260-power-of-3",
        kind: "numeric",
        prompt: "In the prime factorization of 1,260, what is the exponent on the prime 3?",
        value: 2,
        tolerance: 0,
        explanation: "1,260 = 2² · 3² · 5 · 7. The exponent on 3 is 2.",
      },
      {
        id: "gcd-of-72-and-120",
        kind: "numeric",
        prompt: "What is gcd(72, 120)?",
        value: 24,
        tolerance: 0,
        explanation: "72 = 2³·3², 120 = 2³·3·5. Common: 2³·3 = 24.",
      },
      {
        id: "lcm-of-72-and-120",
        kind: "numeric",
        prompt: "What is lcm(72, 120)?",
        value: 360,
        tolerance: 0,
        explanation: "Max exponents: 2³·3²·5 = 360. Check: gcd·lcm = 24·360 = 8640 = 72·120. ✓",
      },
      {
        id: "euclidean-1071-462",
        kind: "numeric",
        prompt: "Use the Euclidean algorithm to compute gcd(1071, 462).",
        value: 21,
        tolerance: 0,
        explanation: "1071 = 2·462 + 147; 462 = 3·147 + 21; 147 = 7·21. GCD = 21.",
      },
      {
        id: "coprime-15-22",
        kind: "text",
        prompt: "Are 15 and 22 coprime? Answer 'yes' or 'no'.",
        acceptedAnswers: ["yes", "yes they are", "yes they are coprime"],
        explanation: "15 = 3·5 and 22 = 2·11. No shared primes, so gcd = 1 and they are coprime.",
      },
      {
        id: "mod-inverse",
        kind: "numeric",
        prompt: "Find the multiplicative inverse of 3 modulo 7 (return a value between 1 and 6).",
        value: 5,
        tolerance: 0,
        explanation: "3 · 5 = 15 = 2·7 + 1, so 3·5 ≡ 1 (mod 7). The inverse is 5.",
      },
      {
        id: "lcm-blink",
        kind: "numeric",
        prompt: "Two LEDs blink every 7 and 9 seconds respectively. After how many seconds do they next blink together?",
        value: 63,
        tolerance: 0,
        explanation: "lcm(7, 9) = 63 since 7 and 9 are coprime.",
      },
    ],
  },
];

export function getLessonCheck(id: string) {
  return lessonChecks.find((check) => check.id === id);
}
