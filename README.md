# RE_PLACE_ER

re_place_er is a simple tool for replacing tokens in a string with their corresponding values. It provides a function that takes a source string and a list of replacements, and returns a new string with the tokens replaced.

## Installation

You can install Token Replacer using npm:

```bash
npm install @mikesven/re_place_er
```

## Usage

To use Token Replacer, you need to create a `ReplacerJob` object that contains the source string and a list of replacements. Each replacement is a key-value pair, where the key is the token to be replaced and the value is the replacement value.

```typescript
import {
  re_place_er,
  ReplacerOptions,
  Replacement,
} from "@mikesven/re_place_er";

const source = "Hello, {{name}}! Your age is {{age}}.";
const replacements: Replacement[] = [
  { name: "John", age: 30 },
  { name: "Jane", age: 25 },
];

const options: ReplacerOptions = {
  openToken: "{{",
  endToken: "}}",
  job: { source, replacements },
};

const result = re_place_er(options);
console.log(result);
```

This will output:

```bash
['Hello, John! Your age is 30.', 'Hello, Jane! Your age is 25.']
```
