import { re_place_er, ReplacerOptions, Replacement } from "./src";

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
