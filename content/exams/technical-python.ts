import type { ModuleExamConfig, QuestionTemplate } from "../../src/lib/exam/types.ts";

// ---------- helpers ----------

function pyRepr(v: unknown): string {
  if (typeof v === "string") return `'${v}'`;
  if (Array.isArray(v)) return `[${v.map(pyRepr).join(", ")}]`;
  if (v === null) return "None";
  if (typeof v === "boolean") return v ? "True" : "False";
  return String(v);
}

// ---------- 1. Expressions and Types ----------

const expressionsAndTypesTemplates: QuestionTemplate[] = [
  {
    id: "py-int-division-vs-true",
    conceptId: "python-expressions-and-types",
    difficulty: "core",
    generate: (rng) => {
      const a = rng.int(8, 47);
      const b = rng.int(2, 9);
      const target = rng.pick(["//", "/", "%"] as const);
      if (target === "//") {
        return {
          prompt: `What does ${a} // ${b} evaluate to in Python 3?`,
          kind: "numeric",
          answer: { kind: "numeric", value: Math.floor(a / b), tolerance: 0 },
          explanation: `// is floor division (integer division). ${a} // ${b} = ${Math.floor(a / b)}.`,
        };
      }
      if (target === "%") {
        return {
          prompt: `What does ${a} % ${b} evaluate to in Python 3?`,
          kind: "numeric",
          answer: { kind: "numeric", value: a % b, tolerance: 0 },
          explanation: `% is the modulo (remainder) operator. ${a} % ${b} = ${a % b}.`,
        };
      }
      const trueDiv = Math.round((a / b) * 10000) / 10000;
      return {
        prompt: `What does ${a} / ${b} evaluate to in Python 3? Round to 4 decimal places.`,
        kind: "numeric",
        answer: { kind: "numeric", value: trueDiv, tolerance: 0.001 },
        explanation: `/ is true division, returning a float. ${a} / ${b} ≈ ${trueDiv}.`,
      };
    },
  },
  {
    id: "py-type-conversion-result",
    conceptId: "python-expressions-and-types",
    difficulty: "core",
    generate: (rng) => {
      const cases = [
        {
          q: "What does `int('7') + 3` evaluate to?",
          choices: ["'73'", "10", "TypeError", "ValueError"],
          correctIndex: 1,
          why: "int('7') converts the string to the integer 7, then 7 + 3 = 10.",
        },
        {
          q: "What does `str(5) + '2'` evaluate to?",
          choices: ["7", "52", "'52'", "TypeError"],
          correctIndex: 2,
          why: "str(5) is '5'. '5' + '2' concatenates to '52'.",
        },
        {
          q: "What does `int('3.7')` evaluate to?",
          choices: ["3", "4", "3.7", "ValueError"],
          correctIndex: 3,
          why: "int() refuses to parse a string that contains a decimal point. Use int(float('3.7')) instead.",
        },
        {
          q: "What does `float('2')` evaluate to?",
          choices: ["2", "2.0", "'2.0'", "TypeError"],
          correctIndex: 1,
          why: "float('2') converts the string to the float 2.0.",
        },
        {
          q: "What does `int(2.9)` evaluate to?",
          choices: ["2", "3", "2.9", "TypeError"],
          correctIndex: 0,
          why: "int() on a float truncates toward zero. int(2.9) = 2.",
        },
        {
          q: "What does `bool(0)` evaluate to?",
          choices: ["True", "False", "0", "None"],
          correctIndex: 1,
          why: "0, 0.0, '', [], {}, None all convert to False. Everything else is truthy.",
        },
      ];
      const c = rng.pick(cases);
      return {
        prompt: c.q,
        kind: "multiple-choice",
        answer: { kind: "multiple-choice", choices: c.choices, correctIndex: c.correctIndex },
        explanation: c.why,
      };
    },
  },
  {
    id: "py-truthiness",
    conceptId: "python-expressions-and-types",
    difficulty: "applied",
    generate: (rng) => {
      const cases = [
        { val: "0", truthy: false },
        { val: "1", truthy: true },
        { val: "-3", truthy: true },
        { val: "0.0", truthy: false },
        { val: "''", truthy: false },
        { val: "'False'", truthy: true },
        { val: "[]", truthy: false },
        { val: "[0]", truthy: true },
        { val: "{}", truthy: false },
        { val: "None", truthy: false },
      ];
      const c = rng.pick(cases);
      return {
        prompt: `In Python, is the value \`${c.val}\` truthy or falsy?`,
        kind: "multiple-choice",
        answer: {
          kind: "multiple-choice",
          choices: ["Truthy", "Falsy"],
          correctIndex: c.truthy ? 0 : 1,
        },
        explanation: `Python's falsy values are: 0, 0.0, '', [], {}, set(), None, and False. Everything else is truthy. The string 'False' is non-empty, so it is truthy.`,
      };
    },
  },
  {
    id: "py-string-plus-int-error",
    conceptId: "python-expressions-and-types",
    difficulty: "core",
    generate: (rng) => {
      const cases = [
        {
          q: "What happens when you execute `'1' + 2` in Python?",
          choices: ["Result is 3", "Result is '12'", "Result is 12", "TypeError"],
          correctIndex: 3,
          why: "Python does not silently convert between str and int with +. You get TypeError: can only concatenate str (not 'int') to str.",
        },
        {
          q: "What happens when you execute `'abc' * 3` in Python?",
          choices: ["TypeError", "'abcabcabc'", "'abc3'", "9"],
          correctIndex: 1,
          why: "str * int repeats the string: 'abc' * 3 = 'abcabcabc'.",
        },
        {
          q: "What happens when you execute `2 + 3.0` in Python?",
          choices: ["5 (int)", "5.0 (float)", "'5.0'", "TypeError"],
          correctIndex: 1,
          why: "int + float promotes the result to float. 2 + 3.0 = 5.0.",
        },
        {
          q: "What does `type(3 / 2)` return in Python 3?",
          choices: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "1"],
          correctIndex: 1,
          why: "In Python 3 the / operator always returns a float, even for whole-number results. 3 / 2 = 1.5.",
        },
      ];
      const c = rng.pick(cases);
      return {
        prompt: c.q,
        kind: "multiple-choice",
        answer: { kind: "multiple-choice", choices: c.choices, correctIndex: c.correctIndex },
        explanation: c.why,
      };
    },
  },
  {
    id: "py-arithmetic-mixed",
    conceptId: "python-expressions-and-types",
    difficulty: "applied",
    generate: (rng) => {
      const a = rng.int(2, 9);
      const b = rng.int(2, 6);
      const c = rng.int(1, 8);
      const expr = `${a} + ${b} * ${c}`;
      const val = a + b * c;
      return {
        prompt: `What does \`${expr}\` evaluate to in Python? (Standard operator precedence.)`,
        kind: "numeric",
        answer: { kind: "numeric", value: val, tolerance: 0 },
        explanation: `* has higher precedence than +. Compute ${b} * ${c} = ${b * c} first, then ${a} + ${b * c} = ${val}.`,
      };
    },
  },
  {
    id: "py-power-operator",
    conceptId: "python-expressions-and-types",
    difficulty: "core",
    generate: (rng) => {
      const base = rng.int(2, 6);
      const exp = rng.int(2, 4);
      return {
        prompt: `What does \`${base} ** ${exp}\` evaluate to in Python?`,
        kind: "numeric",
        answer: { kind: "numeric", value: Math.pow(base, exp), tolerance: 0 },
        explanation: `** is the exponentiation operator. ${base} ** ${exp} = ${Math.pow(base, exp)}.`,
      };
    },
  },
];

// ---------- 2. Functions ----------

const functionsTemplates: QuestionTemplate[] = [
  {
    id: "py-fn-return-vs-print",
    conceptId: "python-functions",
    difficulty: "core",
    generate: (rng) => {
      const cases = [
        {
          q: "What does this function return?\n\ndef f(x):\n    print(x * 2)\n\nresult = f(5)",
          choices: ["10", "5", "None", "TypeError"],
          correctIndex: 2,
          why: "The function prints but never returns. A function with no return statement implicitly returns None. The value 10 is printed as a side effect, but result is None.",
        },
        {
          q: "What does this function return?\n\ndef f(x):\n    return x * 2\n\nresult = f(5)",
          choices: ["10", "5", "None", "Nothing"],
          correctIndex: 0,
          why: "The function returns x * 2, so f(5) returns 10.",
        },
        {
          q: "What does this code print?\n\ndef f(x):\n    return x + 1\n\nf(3)",
          choices: ["3", "4", "Nothing", "None"],
          correctIndex: 2,
          why: "The return value is computed but not printed or assigned. Nothing is sent to stdout.",
        },
      ];
      const c = rng.pick(cases);
      return {
        prompt: c.q,
        kind: "multiple-choice",
        answer: { kind: "multiple-choice", choices: c.choices, correctIndex: c.correctIndex },
        explanation: c.why,
      };
    },
  },
  {
    id: "py-fn-no-return-is-none",
    conceptId: "python-functions",
    difficulty: "core",
    generate: () => ({
      prompt:
        "What does a Python function implicitly return if it has no `return` statement (or `return` with no value)?",
      kind: "multiple-choice",
      answer: {
        kind: "multiple-choice",
        choices: ["0", "False", "None", "An empty string"],
        correctIndex: 2,
      },
      explanation:
        "Any Python function that falls off the end or hits a bare `return` returns None.",
    }),
  },
  {
    id: "py-fn-default-args",
    conceptId: "python-functions",
    difficulty: "applied",
    generate: (rng) => {
      const a = rng.int(2, 10);
      const dflt = rng.int(2, 9);
      const call = rng.pick(["positional", "default"] as const);
      if (call === "default") {
        return {
          prompt: `Given this definition:\n\ndef f(x, y=${dflt}):\n    return x + y\n\nWhat does f(${a}) return?`,
          kind: "numeric",
          answer: { kind: "numeric", value: a + dflt, tolerance: 0 },
          explanation: `When y is not supplied, it defaults to ${dflt}. f(${a}) returns ${a} + ${dflt} = ${a + dflt}.`,
        };
      }
      const yArg = rng.int(2, 10);
      return {
        prompt: `Given this definition:\n\ndef f(x, y=${dflt}):\n    return x + y\n\nWhat does f(${a}, ${yArg}) return?`,
        kind: "numeric",
        answer: { kind: "numeric", value: a + yArg, tolerance: 0 },
        explanation: `The explicit argument ${yArg} overrides the default. Returns ${a} + ${yArg} = ${a + yArg}.`,
      };
    },
  },
  {
    id: "py-fn-scope-local-vs-global",
    conceptId: "python-functions",
    difficulty: "applied",
    generate: (rng) => {
      const cases = [
        {
          q: "What does this code print?\n\nx = 10\n\ndef f():\n    x = 5\n    return x\n\nf()\nprint(x)",
          choices: ["5", "10", "None", "NameError"],
          correctIndex: 1,
          why: "Assigning to x inside f creates a LOCAL variable. The global x is unchanged, so print(x) shows 10.",
        },
        {
          q: "What does this code print?\n\nx = 10\n\ndef f():\n    return x + 1\n\nprint(f())",
          choices: ["10", "11", "NameError", "None"],
          correctIndex: 1,
          why: "Reading x inside f looks up the global x = 10 because no local x is assigned. Returns 11.",
        },
        {
          q: "What does this code do?\n\ndef f():\n    return y\n\nprint(f())",
          choices: ["Prints None", "Prints 0", "NameError", "Prints ''"],
          correctIndex: 2,
          why: "y is never defined anywhere. Looking it up raises NameError: name 'y' is not defined.",
        },
      ];
      const c = rng.pick(cases);
      return {
        prompt: c.q,
        kind: "multiple-choice",
        answer: { kind: "multiple-choice", choices: c.choices, correctIndex: c.correctIndex },
        explanation: c.why,
      };
    },
  },
  {
    id: "py-fn-call-returns-value",
    conceptId: "python-functions",
    difficulty: "applied",
    generate: (rng) => {
      const a = rng.int(2, 10);
      const b = rng.int(2, 10);
      const op = rng.pick(["square_sum", "product", "min", "max"] as const);
      const defs = {
        square_sum: { body: "return x*x + y*y", val: a * a + b * b, desc: "x² + y²" },
        product: { body: "return x * y", val: a * b, desc: "x · y" },
        min: { body: "return x if x < y else y", val: Math.min(a, b), desc: "the smaller of x and y" },
        max: { body: "return x if x > y else y", val: Math.max(a, b), desc: "the larger of x and y" },
      } as const;
      const d = defs[op];
      return {
        prompt: `Given:\n\ndef f(x, y):\n    ${d.body}\n\nWhat does f(${a}, ${b}) return?`,
        kind: "numeric",
        answer: { kind: "numeric", value: d.val, tolerance: 0 },
        explanation: `The function computes ${d.desc}. f(${a}, ${b}) = ${d.val}.`,
      };
    },
  },
  {
    id: "py-fn-multiple-returns",
    conceptId: "python-functions",
    difficulty: "applied",
    generate: (rng) => {
      const threshold = rng.int(5, 15);
      const x = rng.int(1, 20);
      return {
        prompt: `Given:\n\ndef classify(n):\n    if n < ${threshold}:\n        return 'low'\n    return 'high'\n\nWhat does classify(${x}) return?`,
        kind: "multiple-choice",
        answer: {
          kind: "multiple-choice",
          choices: ["'low'", "'high'", "None", "Both"],
          correctIndex: x < threshold ? 0 : 1,
        },
        explanation:
          x < threshold
            ? `${x} < ${threshold}, so the first return fires and the function returns 'low'. A return statement immediately exits the function.`
            : `${x} >= ${threshold}, so the first return is skipped and the function returns 'high'.`,
      };
    },
  },
];

// ---------- 3. Control Flow ----------

const controlFlowTemplates: QuestionTemplate[] = [
  {
    id: "py-if-elif-else-trace",
    conceptId: "python-control-flow",
    difficulty: "core",
    generate: (rng) => {
      const x = rng.int(-10, 20);
      let result: string;
      if (x < 0) result = "neg";
      else if (x === 0) result = "zero";
      else if (x < 10) result = "small";
      else result = "big";
      return {
        prompt: `What does this code print?\n\nx = ${x}\nif x < 0:\n    print('neg')\nelif x == 0:\n    print('zero')\nelif x < 10:\n    print('small')\nelse:\n    print('big')`,
        kind: "multiple-choice",
        answer: {
          kind: "multiple-choice",
          choices: ["neg", "zero", "small", "big"],
          correctIndex: ["neg", "zero", "small", "big"].indexOf(result),
        },
        explanation: `if/elif tests are evaluated in order; only the first matching branch runs. With x = ${x}, the result is '${result}'.`,
      };
    },
  },
  {
    id: "py-for-range-sum",
    conceptId: "python-control-flow",
    difficulty: "core",
    generate: (rng) => {
      const n = rng.int(3, 8);
      let total = 0;
      for (let i = 0; i < n; i++) total += i;
      return {
        prompt: `What does this code print?\n\ntotal = 0\nfor i in range(${n}):\n    total += i\nprint(total)`,
        kind: "numeric",
        answer: { kind: "numeric", value: total, tolerance: 0 },
        explanation: `range(${n}) produces 0, 1, ..., ${n - 1}. Their sum is ${total}.`,
      };
    },
  },
  {
    id: "py-while-loop-trace",
    conceptId: "python-control-flow",
    difficulty: "applied",
    generate: (rng) => {
      const start = rng.int(1, 5);
      const limit = rng.int(20, 100);
      // simulate: x = start; while x < limit: x *= 2; then print(x)
      let x = start;
      let safety = 0;
      while (x < limit && safety < 50) {
        x *= 2;
        safety++;
      }
      return {
        prompt: `What does this code print?\n\nx = ${start}\nwhile x < ${limit}:\n    x *= 2\nprint(x)`,
        kind: "numeric",
        answer: { kind: "numeric", value: x, tolerance: 0 },
        explanation: `Starting at ${start}, x doubles until it is at least ${limit}. Final value: ${x}.`,
      };
    },
  },
  {
    id: "py-break-continue",
    conceptId: "python-control-flow",
    difficulty: "applied",
    generate: (rng) => {
      const cases = [
        {
          q: "What does this code print?\n\nfor i in range(10):\n    if i == 4:\n        break\n    print(i)",
          choices: ["0 1 2 3", "0 1 2 3 4", "0 1 2 3 5 6 7 8 9", "1 2 3 4"],
          correctIndex: 0,
          why: "break exits the loop immediately. We print 0, 1, 2, 3 and then break when i == 4.",
        },
        {
          q: "What does this code print?\n\nfor i in range(5):\n    if i == 2:\n        continue\n    print(i)",
          choices: ["0 1 2 3 4", "0 1 3 4", "0 1", "0 1 2 3"],
          correctIndex: 1,
          why: "continue skips the rest of the current iteration. We skip print when i == 2, so we print 0, 1, 3, 4.",
        },
        {
          q: "What is the final value of count?\n\ncount = 0\nfor i in range(10):\n    if i % 2 == 0:\n        continue\n    count += 1",
          choices: ["10", "5", "4", "0"],
          correctIndex: 1,
          why: "continue is hit for every even i (0,2,4,6,8 — five times). count increments only on odd i (1,3,5,7,9 — five times). Final count = 5.",
        },
        {
          q: "What does this code print?\n\nfor i in range(6):\n    if i == 3:\n        break\nprint(i)",
          choices: ["3", "5", "6", "None"],
          correctIndex: 0,
          why: "i is the loop variable. When break fires at i == 3, i has the value 3 and keeps that value after the loop.",
        },
      ];
      const c = rng.pick(cases);
      return {
        prompt: c.q,
        kind: "multiple-choice",
        answer: { kind: "multiple-choice", choices: c.choices, correctIndex: c.correctIndex },
        explanation: c.why,
      };
    },
  },
  {
    id: "py-range-three-args",
    conceptId: "python-control-flow",
    difficulty: "applied",
    generate: (rng) => {
      const start = rng.int(0, 5);
      const step = rng.pick([2, 3]);
      const stop = start + step * rng.int(3, 5);
      const values: number[] = [];
      for (let i = start; i < stop; i += step) values.push(i);
      const total = values.reduce((s, v) => s + v, 0);
      return {
        prompt: `What does this code print?\n\ntotal = 0\nfor i in range(${start}, ${stop}, ${step}):\n    total += i\nprint(total)`,
        kind: "numeric",
        answer: { kind: "numeric", value: total, tolerance: 0 },
        explanation: `range(${start}, ${stop}, ${step}) yields ${values.join(", ")}. Sum = ${total}.`,
      };
    },
  },
  {
    id: "py-nested-loop-count",
    conceptId: "python-control-flow",
    difficulty: "challenge",
    generate: (rng) => {
      const n = rng.int(2, 4);
      const m = rng.int(2, 4);
      const count = n * m;
      return {
        prompt: `What does this code print?\n\ncount = 0\nfor i in range(${n}):\n    for j in range(${m}):\n        count += 1\nprint(count)`,
        kind: "numeric",
        answer: { kind: "numeric", value: count, tolerance: 0 },
        explanation: `The outer loop runs ${n} times; the inner loop runs ${m} times per outer iteration. Total increments: ${n} × ${m} = ${count}.`,
      };
    },
  },
];

// ---------- 4. Collections ----------

const collectionsTemplates: QuestionTemplate[] = [
  {
    id: "py-list-indexing",
    conceptId: "python-collections",
    difficulty: "core",
    generate: (rng) => {
      const xs = [
        rng.int(10, 99),
        rng.int(10, 99),
        rng.int(10, 99),
        rng.int(10, 99),
        rng.int(10, 99),
      ];
      const idx = rng.pick([0, 1, 2, -1, -2]);
      const val = xs.at(idx)!;
      return {
        prompt: `Given xs = ${pyRepr(xs)}, what does xs[${idx}] return?`,
        kind: "numeric",
        answer: { kind: "numeric", value: val, tolerance: 0 },
        explanation:
          idx >= 0
            ? `Python lists are 0-indexed. xs[${idx}] is the element at position ${idx} (counting from the left), which is ${val}.`
            : `Negative indices count from the end: -1 is the last element, -2 is the second-to-last, etc. xs[${idx}] = ${val}.`,
      };
    },
  },
  {
    id: "py-list-slice",
    conceptId: "python-collections",
    difficulty: "applied",
    generate: (rng) => {
      const xs = [10, 20, 30, 40, 50, 60];
      const cases = [
        { slice: "xs[1:4]", expected: [20, 30, 40] },
        { slice: "xs[:3]", expected: [10, 20, 30] },
        { slice: "xs[3:]", expected: [40, 50, 60] },
        { slice: "xs[-2:]", expected: [50, 60] },
        { slice: "xs[:-2]", expected: [10, 20, 30, 40] },
        { slice: "xs[::2]", expected: [10, 30, 50] },
      ];
      const c = rng.pick(cases);
      const correct = pyRepr(c.expected);
      const distractors = cases
        .filter((other) => pyRepr(other.expected) !== correct)
        .map((other) => pyRepr(other.expected));
      const chosen = [correct, ...rng.shuffle(distractors).slice(0, 3)];
      const shuffled = rng.shuffle(chosen);
      return {
        prompt: `Given xs = ${pyRepr(xs)}, what does ${c.slice} return?`,
        kind: "multiple-choice",
        answer: {
          kind: "multiple-choice",
          choices: shuffled,
          correctIndex: shuffled.indexOf(correct),
        },
        explanation: `Slicing uses [start:stop:step]. start defaults to 0, stop defaults to len(xs), step defaults to 1. The stop index is exclusive. Result: ${correct}.`,
      };
    },
  },
  {
    id: "py-list-vs-tuple-mutability",
    conceptId: "python-collections",
    difficulty: "core",
    generate: (rng) => {
      const cases = [
        {
          q: "Given t = (1, 2, 3), what happens when you execute t[0] = 5?",
          choices: [
            "The first element becomes 5",
            "Nothing changes; t stays (1, 2, 3)",
            "TypeError: tuples are immutable",
            "IndexError",
          ],
          correctIndex: 2,
          why: "Tuples are immutable. Assigning to a tuple element raises TypeError: 'tuple' object does not support item assignment.",
        },
        {
          q: "Given xs = [1, 2, 3], what does xs become after xs[0] = 5?",
          choices: ["[5, 2, 3]", "[1, 2, 3]", "TypeError", "[1, 5, 3]"],
          correctIndex: 0,
          why: "Lists are mutable. xs[0] = 5 replaces the first element, giving [5, 2, 3].",
        },
        {
          q: "Which of these can be used as a dictionary key?",
          choices: ["A list [1, 2]", "A tuple (1, 2)", "A dict {}", "A set {1, 2}"],
          correctIndex: 1,
          why: "Dict keys must be hashable. Tuples of hashable items are hashable; lists, dicts, and sets are not.",
        },
        {
          q: "Given xs = [1, 2, 3], what does xs.append(4) return?",
          choices: ["[1, 2, 3, 4]", "4", "None", "Error"],
          correctIndex: 2,
          why: "append() mutates the list in place and returns None. xs becomes [1, 2, 3, 4], but the return value is None.",
        },
      ];
      const c = rng.pick(cases);
      return {
        prompt: c.q,
        kind: "multiple-choice",
        answer: { kind: "multiple-choice", choices: c.choices, correctIndex: c.correctIndex },
        explanation: c.why,
      };
    },
  },
  {
    id: "py-dict-access",
    conceptId: "python-collections",
    difficulty: "core",
    generate: (rng) => {
      const cases = [
        {
          q: "Given d = {'a': 1, 'b': 2}, what does d['a'] return?",
          choices: ["'a'", "1", "2", "KeyError"],
          correctIndex: 1,
          why: "d['a'] returns the value associated with key 'a', which is 1.",
        },
        {
          q: "Given d = {'a': 1, 'b': 2}, what happens when you evaluate d['c']?",
          choices: ["Returns None", "Returns 0", "KeyError", "Creates d['c'] = None"],
          correctIndex: 2,
          why: "Accessing a missing key with [] raises KeyError. Use d.get('c') to return None instead.",
        },
        {
          q: "Given d = {'a': 1, 'b': 2}, what does d.get('c') return?",
          choices: ["None", "0", "KeyError", "''"],
          correctIndex: 0,
          why: "dict.get(key) returns None when the key is missing, instead of raising KeyError.",
        },
        {
          q: "Given d = {'a': 1, 'b': 2}, what does d.get('c', 99) return?",
          choices: ["None", "99", "KeyError", "1"],
          correctIndex: 1,
          why: "The optional second argument to get() is the default value returned when the key is missing.",
        },
      ];
      const c = rng.pick(cases);
      return {
        prompt: c.q,
        kind: "multiple-choice",
        answer: { kind: "multiple-choice", choices: c.choices, correctIndex: c.correctIndex },
        explanation: c.why,
      };
    },
  },
  {
    id: "py-len-of-collection",
    conceptId: "python-collections",
    difficulty: "core",
    generate: (rng) => {
      const target = rng.pick(["list", "dict", "string", "tuple", "nested"] as const);
      if (target === "list") {
        const n = rng.int(3, 7);
        const xs: number[] = [];
        for (let i = 0; i < n; i++) xs.push(rng.int(1, 9));
        return {
          prompt: `What does len(${pyRepr(xs)}) return?`,
          kind: "numeric",
          answer: { kind: "numeric", value: n, tolerance: 0 },
          explanation: `len() returns the number of top-level elements in the list, which is ${n}.`,
        };
      }
      if (target === "dict") {
        const n = rng.int(2, 5);
        const keys = ["a", "b", "c", "d", "e"].slice(0, n);
        const entries = keys.map((k) => `'${k}': ${rng.int(1, 9)}`).join(", ");
        return {
          prompt: `What does len({${entries}}) return?`,
          kind: "numeric",
          answer: { kind: "numeric", value: n, tolerance: 0 },
          explanation: `len() on a dict returns the number of key-value pairs, which is ${n}.`,
        };
      }
      if (target === "tuple") {
        const n = rng.int(3, 6);
        const xs: number[] = [];
        for (let i = 0; i < n; i++) xs.push(rng.int(1, 9));
        return {
          prompt: `What does len((${xs.join(", ")})) return?`,
          kind: "numeric",
          answer: { kind: "numeric", value: n, tolerance: 0 },
          explanation: `len() returns the number of elements in the tuple, which is ${n}.`,
        };
      }
      if (target === "nested") {
        const inner = [
          [rng.int(1, 9), rng.int(1, 9)],
          [rng.int(1, 9), rng.int(1, 9), rng.int(1, 9)],
          [rng.int(1, 9)],
        ];
        return {
          prompt: `What does len(${pyRepr(inner)}) return?`,
          kind: "numeric",
          answer: { kind: "numeric", value: inner.length, tolerance: 0 },
          explanation: `len() counts top-level elements. This list has ${inner.length} sub-lists, so len() = ${inner.length}.`,
        };
      }
      const s = rng.pick(["hello", "robot", "python", "drone", "grid"]);
      return {
        prompt: `What does len('${s}') return?`,
        kind: "numeric",
        answer: { kind: "numeric", value: s.length, tolerance: 0 },
        explanation: `len() of a string is its character count: '${s}' has ${s.length} characters.`,
      };
    },
  },
  {
    id: "py-list-append-vs-pop",
    conceptId: "python-collections",
    difficulty: "applied",
    generate: (rng) => {
      const target = rng.pick(["append", "pop"] as const);
      const n = rng.int(3, 5);
      const xs: number[] = [];
      for (let i = 0; i < n; i++) xs.push(rng.int(1, 9));
      if (target === "append") {
        const v = rng.int(10, 50);
        const after = [...xs, v];
        return {
          prompt: `Given xs = ${pyRepr(xs)}. After running xs.append(${v}), what is xs?`,
          kind: "multiple-choice",
          answer: {
            kind: "multiple-choice",
            choices: [
              pyRepr(after),
              pyRepr([v, ...xs]),
              pyRepr(xs),
              `${v}`,
            ],
            correctIndex: 0,
          },
          explanation: `append(v) adds v to the END of the list in place. xs becomes ${pyRepr(after)}.`,
        };
      }
      const after = xs.slice(0, -1);
      const popped = xs[xs.length - 1];
      return {
        prompt: `Given xs = ${pyRepr(xs)}. What does xs.pop() return?`,
        kind: "numeric",
        answer: { kind: "numeric", value: popped, tolerance: 0 },
        explanation: `pop() with no argument removes and returns the LAST element of the list. Returns ${popped}; xs becomes ${pyRepr(after)}.`,
      };
    },
  },
  {
    id: "py-in-operator",
    conceptId: "python-collections",
    difficulty: "applied",
    generate: (rng) => {
      const xs = [11, 22, 33, 44, 55];
      const inXs = rng.next() < 0.5;
      const target = inXs ? rng.pick(xs) : rng.pick([7, 99, 100, 13]);
      return {
        prompt: `Given xs = ${pyRepr(xs)}, what does the expression \`${target} in xs\` evaluate to?`,
        kind: "multiple-choice",
        answer: {
          kind: "multiple-choice",
          choices: ["True", "False"],
          correctIndex: xs.includes(target) ? 0 : 1,
        },
        explanation: `\`x in xs\` returns True if x equals any element of xs, otherwise False. Here, ${target} is ${xs.includes(target) ? "" : "not "}in the list.`,
      };
    },
  },
];

// ---------- 5. Iteration and Comprehensions ----------

const iterationTemplates: QuestionTemplate[] = [
  {
    id: "py-comp-square-list",
    conceptId: "python-iteration-and-comprehensions",
    difficulty: "core",
    generate: (rng) => {
      const n = rng.int(3, 6);
      const xs: number[] = [];
      for (let i = 0; i < n; i++) xs.push(rng.int(1, 6));
      const squares = xs.map((v) => v * v);
      return {
        prompt: `What does this comprehension produce?\n\nxs = ${pyRepr(xs)}\n[x*x for x in xs]`,
        kind: "multiple-choice",
        answer: {
          kind: "multiple-choice",
          choices: [
            pyRepr(squares),
            pyRepr(xs.map((v) => v + v)),
            pyRepr(xs),
            pyRepr(xs.map((v) => 2 * v)),
          ],
          correctIndex: 0,
        },
        explanation: `[x*x for x in xs] applies the expression x*x to each element. Result: ${pyRepr(squares)}.`,
      };
    },
  },
  {
    id: "py-comp-with-filter",
    conceptId: "python-iteration-and-comprehensions",
    difficulty: "applied",
    generate: (rng) => {
      const n = rng.int(5, 8);
      const xs: number[] = [];
      for (let i = 0; i < n; i++) xs.push(rng.int(1, 20));
      const even = xs.filter((v) => v % 2 === 0);
      return {
        prompt: `What does this comprehension produce?\n\nxs = ${pyRepr(xs)}\n[x for x in xs if x % 2 == 0]`,
        kind: "multiple-choice",
        answer: {
          kind: "multiple-choice",
          choices: [
            pyRepr(even),
            pyRepr(xs.filter((v) => v % 2 === 1)),
            pyRepr(xs),
            "[]",
          ],
          correctIndex: 0,
        },
        explanation: `The "if x % 2 == 0" condition keeps only even values. Filtered list: ${pyRepr(even)}.`,
      };
    },
  },
  {
    id: "py-comp-vs-for-loop",
    conceptId: "python-iteration-and-comprehensions",
    difficulty: "applied",
    generate: () => ({
      prompt:
        "Which of the following is the comprehension equivalent of this for-loop?\n\nresult = []\nfor x in xs:\n    if x > 0:\n        result.append(x * 2)",
      kind: "multiple-choice",
      answer: {
        kind: "multiple-choice",
        choices: [
          "[x * 2 for x in xs if x > 0]",
          "[x for x in xs if x * 2 > 0]",
          "[x * 2 if x > 0 for x in xs]",
          "(x * 2 for x in xs if x > 0)",
        ],
        correctIndex: 0,
      },
      explanation:
        "A filtered list comprehension is [expression for var in iterable if condition]. The expression is x*2, the iterable is xs, the filter is x > 0.",
    }),
  },
  {
    id: "py-sum-of-list",
    conceptId: "python-iteration-and-comprehensions",
    difficulty: "core",
    generate: (rng) => {
      const n = rng.int(3, 6);
      const xs: number[] = [];
      let total = 0;
      for (let i = 0; i < n; i++) {
        const v = rng.int(1, 12);
        xs.push(v);
        total += v;
      }
      return {
        prompt: `What does sum(${pyRepr(xs)}) return?`,
        kind: "numeric",
        answer: { kind: "numeric", value: total, tolerance: 0 },
        explanation: `sum() adds all elements of the iterable. ${xs.join(" + ")} = ${total}.`,
      };
    },
  },
  {
    id: "py-enumerate-pattern",
    conceptId: "python-iteration-and-comprehensions",
    difficulty: "applied",
    generate: (rng) => {
      const cases = [
        {
          q: "What does this print?\n\nxs = ['a', 'b', 'c']\nfor i, v in enumerate(xs):\n    print(i, v)",
          choices: [
            "1 a\n2 b\n3 c",
            "0 a\n1 b\n2 c",
            "a b c",
            "a 0\nb 1\nc 2",
          ],
          correctIndex: 1,
          why: "enumerate(xs) yields (index, value) pairs starting at 0 by default. Output: 0 a / 1 b / 2 c.",
        },
        {
          q: "What does list(enumerate(['x', 'y'])) produce?",
          choices: [
            "[(0, 'x'), (1, 'y')]",
            "[('x', 0), ('y', 1)]",
            "[0, 'x', 1, 'y']",
            "[(1, 'x'), (2, 'y')]",
          ],
          correctIndex: 0,
          why: "enumerate yields tuples (index, value). list() materializes the iterator.",
        },
      ];
      const c = rng.pick(cases);
      return {
        prompt: c.q,
        kind: "multiple-choice",
        answer: { kind: "multiple-choice", choices: c.choices, correctIndex: c.correctIndex },
        explanation: c.why,
      };
    },
  },
  {
    id: "py-zip-pattern",
    conceptId: "python-iteration-and-comprehensions",
    difficulty: "applied",
    generate: () => ({
      prompt:
        "What does list(zip([1, 2, 3], ['a', 'b', 'c'])) produce?",
      kind: "multiple-choice",
      answer: {
        kind: "multiple-choice",
        choices: [
          "[(1, 'a'), (2, 'b'), (3, 'c')]",
          "[1, 'a', 2, 'b', 3, 'c']",
          "[[1, 'a'], [2, 'b'], [3, 'c']]",
          "[('a', 1), ('b', 2), ('c', 3)]",
        ],
        correctIndex: 0,
      },
      explanation:
        "zip pairs elements positionally and yields tuples. The order of arguments determines the order inside each tuple.",
    }),
  },
  {
    id: "py-count-with-loop",
    conceptId: "python-iteration-and-comprehensions",
    difficulty: "applied",
    generate: (rng) => {
      const n = rng.int(6, 10);
      const threshold = rng.int(3, 7);
      const xs: number[] = [];
      for (let i = 0; i < n; i++) xs.push(rng.int(1, 10));
      const count = xs.filter((v) => v > threshold).length;
      return {
        prompt: `What is the final value of count?\n\nxs = ${pyRepr(xs)}\ncount = 0\nfor x in xs:\n    if x > ${threshold}:\n        count += 1`,
        kind: "numeric",
        answer: { kind: "numeric", value: count, tolerance: 0 },
        explanation: `count counts how many elements are strictly greater than ${threshold}. ${count} of the values qualify.`,
      };
    },
  },
];

// ---------- 6. Error Detection ----------

const errorDetectionTemplates: QuestionTemplate[] = [
  {
    id: "py-err-identify-type",
    conceptId: "python-error-detection",
    difficulty: "core",
    generate: (rng) => {
      const cases = [
        {
          q: "What error does this code raise?\n\nxs = [1, 2, 3]\nprint(xs[5])",
          choices: ["KeyError", "IndexError", "ValueError", "TypeError"],
          correctIndex: 1,
          why: "Indexing a list out of bounds raises IndexError: list index out of range.",
        },
        {
          q: "What error does this code raise?\n\nd = {'a': 1}\nprint(d['b'])",
          choices: ["KeyError", "IndexError", "ValueError", "NameError"],
          correctIndex: 0,
          why: "Looking up a missing dict key with [] raises KeyError.",
        },
        {
          q: "What error does this code raise?\n\nprint(foo)",
          choices: ["KeyError", "NameError", "ValueError", "TypeError"],
          correctIndex: 1,
          why: "foo was never defined. Looking up an unknown name raises NameError.",
        },
        {
          q: "What error does this code raise?\n\nprint(10 / 0)",
          choices: ["ValueError", "ArithmeticError", "ZeroDivisionError", "OverflowError"],
          correctIndex: 2,
          why: "Dividing by zero raises ZeroDivisionError. (ZeroDivisionError is technically a subclass of ArithmeticError, but the specific exception raised is ZeroDivisionError.)",
        },
        {
          q: "What error does this code raise?\n\nprint('abc' + 5)",
          choices: ["ValueError", "TypeError", "SyntaxError", "NameError"],
          correctIndex: 1,
          why: "You cannot add str and int. Python raises TypeError: can only concatenate str (not 'int') to str.",
        },
        {
          q: "What error does this code raise?\n\nprint(int('hello'))",
          choices: ["ValueError", "TypeError", "NameError", "SyntaxError"],
          correctIndex: 0,
          why: "int() accepts a string, but only if it represents a valid integer. 'hello' does not, so Python raises ValueError.",
        },
      ];
      const c = rng.pick(cases);
      return {
        prompt: c.q,
        kind: "multiple-choice",
        answer: { kind: "multiple-choice", choices: c.choices, correctIndex: c.correctIndex },
        explanation: c.why,
      };
    },
  },
  {
    id: "py-err-name-as-text",
    conceptId: "python-error-detection",
    difficulty: "applied",
    generate: (rng) => {
      const cases = [
        { snippet: "[1, 2, 3][9]", err: "IndexError" },
        { snippet: "{'k': 1}['x']", err: "KeyError" },
        { snippet: "undefined_variable", err: "NameError" },
        { snippet: "'5' - 1", err: "TypeError" },
        { snippet: "1 / 0", err: "ZeroDivisionError" },
        { snippet: "int('abc')", err: "ValueError" },
      ];
      const c = rng.pick(cases);
      return {
        prompt: `Which exception type does Python raise when evaluating \`${c.snippet}\`? (Type the exception name exactly, e.g. TypeError.)`,
        kind: "text",
        answer: { kind: "text", acceptedAnswers: [c.err] },
        explanation: `Evaluating \`${c.snippet}\` raises ${c.err}.`,
      };
    },
  },
  {
    id: "py-err-find-the-bug",
    conceptId: "python-error-detection",
    difficulty: "applied",
    generate: (rng) => {
      const cases = [
        {
          q: "Which line will raise an error?\n\n1: x = [1, 2, 3]\n2: y = len(x)\n3: print(x[y])\n4: print(x[0])",
          choices: ["Line 1", "Line 2", "Line 3", "Line 4"],
          correctIndex: 2,
          why: "len(x) = 3, but valid indices are 0..2. x[3] is out of bounds — IndexError on line 3.",
        },
        {
          q: "Which line will raise an error?\n\n1: name = 'Ada'\n2: greeting = 'Hello, ' + name\n3: age = 30\n4: msg = greeting + ' (age ' + age + ')'",
          choices: ["Line 1", "Line 2", "Line 3", "Line 4"],
          correctIndex: 3,
          why: "Line 4 concatenates a string with the int age. You must wrap it in str(age) first. TypeError on line 4.",
        },
        {
          q: "Which line will raise an error?\n\n1: d = {'a': 1, 'b': 2}\n2: print(d['a'])\n3: print(d.get('c'))\n4: print(d['c'])",
          choices: ["Line 1", "Line 2", "Line 3", "Line 4"],
          correctIndex: 3,
          why: "d.get('c') returns None safely, but d['c'] looks up a missing key and raises KeyError on line 4.",
        },
        {
          q: "Which line will raise an error?\n\n1: def add(a, b):\n2:     return a + b\n3: result = add(2, 3)\n4: result = add(2)",
          choices: ["Line 1", "Line 2", "Line 3", "Line 4"],
          correctIndex: 3,
          why: "add() requires two arguments. Calling it with one raises TypeError: add() missing 1 required positional argument on line 4.",
        },
        {
          q: "Which line will raise an error?\n\n1: t = (10, 20, 30)\n2: x = t[0]\n3: t[0] = 99\n4: print(t)",
          choices: ["Line 1", "Line 2", "Line 3", "Line 4"],
          correctIndex: 2,
          why: "Tuples are immutable. Assigning to t[0] raises TypeError on line 3.",
        },
      ];
      const c = rng.pick(cases);
      return {
        prompt: c.q,
        kind: "multiple-choice",
        answer: { kind: "multiple-choice", choices: c.choices, correctIndex: c.correctIndex },
        explanation: c.why,
      };
    },
  },
  {
    id: "py-err-predict-output",
    conceptId: "python-error-detection",
    difficulty: "applied",
    generate: (rng) => {
      const cases = [
        {
          q: "What does this code print?\n\nxs = [1, 2, 3]\nxs[0] = xs[-1]\nprint(xs)",
          choices: ["[1, 2, 3]", "[3, 2, 3]", "[3, 2, 1]", "[1, 2, 1]"],
          correctIndex: 1,
          why: "xs[-1] is 3. After xs[0] = 3, the list becomes [3, 2, 3].",
        },
        {
          q: "What does this code print?\n\nxs = [1, 2, 3]\nys = xs\nys.append(4)\nprint(xs)",
          choices: ["[1, 2, 3]", "[1, 2, 3, 4]", "[4, 1, 2, 3]", "Error"],
          correctIndex: 1,
          why: "ys = xs makes ys an alias for the same list object. ys.append(4) mutates the underlying list, so xs also shows [1, 2, 3, 4].",
        },
        {
          q: "What does this code print?\n\nd = {'a': 1}\nd['b'] = 2\nprint(len(d))",
          choices: ["1", "2", "3", "KeyError"],
          correctIndex: 1,
          why: "Assigning d['b'] = 2 adds a new key. The dict now has 2 entries.",
        },
        {
          q: "What does this code print?\n\ndef f():\n    return\nprint(f())",
          choices: ["''", "0", "None", "Nothing"],
          correctIndex: 2,
          why: "A bare `return` exits the function with the value None. print(None) prints 'None'.",
        },
        {
          q: "What does this code print?\n\nx = 5\nx == 5\nprint(x)",
          choices: ["True", "5", "None", "Error"],
          correctIndex: 1,
          why: "x == 5 computes a boolean but does not assign it. x is still 5. (Note: = assigns, == compares.)",
        },
      ];
      const c = rng.pick(cases);
      return {
        prompt: c.q,
        kind: "multiple-choice",
        answer: { kind: "multiple-choice", choices: c.choices, correctIndex: c.correctIndex },
        explanation: c.why,
      };
    },
  },
  {
    id: "py-err-equality-vs-assignment",
    conceptId: "python-error-detection",
    difficulty: "core",
    generate: () => ({
      prompt:
        "What is the difference between `=` and `==` in Python?",
      kind: "multiple-choice",
      answer: {
        kind: "multiple-choice",
        choices: [
          "= compares for equality; == assigns a value",
          "= assigns a value; == compares for equality",
          "They are equivalent",
          "= is for ints, == is for strings",
        ],
        correctIndex: 1,
      },
      explanation:
        "= binds a value to a name (assignment). == compares two values and returns True/False. Using = inside an `if` is a SyntaxError in Python.",
    }),
  },
];

// ---------- concepts ----------

const concepts = [
  {
    id: "python-expressions-and-types",
    title: "Expressions and Types",
    description:
      "int, float, str, bool; truthiness; type conversion; integer vs true division; modulo; common type-error pitfalls.",
  },
  {
    id: "python-functions",
    title: "Functions",
    description:
      "def syntax, parameters and arguments, return vs print, default arguments, implicit None, local vs global scope.",
  },
  {
    id: "python-control-flow",
    title: "Control Flow",
    description:
      "Tracing if/elif/else, while loops, for-range, break vs continue, nested loops.",
  },
  {
    id: "python-collections",
    title: "Collections",
    description:
      "list vs tuple vs dict; indexing (0-based, negative); slicing; mutability; KeyError vs get(); append, pop, in.",
  },
  {
    id: "python-iteration-and-comprehensions",
    title: "Iteration and Comprehensions",
    description:
      "for-loop patterns (sum, count, filter); list comprehensions; equivalent for-loop translations; len, enumerate, zip.",
  },
  {
    id: "python-error-detection",
    title: "Error Detection",
    description:
      "Spot the bug, identify the resulting exception (TypeError, IndexError, NameError, KeyError, ZeroDivisionError, ValueError), or predict output.",
  },
];

export const technicalPythonExam: ModuleExamConfig = {
  moduleSlug: "technical-python",
  title: "Technical Python — Module Exam",
  description:
    "A 50-question exam covering Python expressions and types, functions, control flow, collections, iteration and comprehensions, and error detection. Pass at 95% or higher. Code snippets and values vary by attempt.",
  totalQuestions: 50,
  passThreshold: 95,
  concepts,
  conceptWeights: {
    "python-expressions-and-types": 8,
    "python-functions": 8,
    "python-control-flow": 8,
    "python-collections": 10,
    "python-iteration-and-comprehensions": 8,
    "python-error-detection": 8,
  },
  templates: [
    ...expressionsAndTypesTemplates,
    ...functionsTemplates,
    ...controlFlowTemplates,
    ...collectionsTemplates,
    ...iterationTemplates,
    ...errorDetectionTemplates,
  ],
};
