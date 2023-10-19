import { describe, it, expect } from "vitest";
import { ReplacerOptions, re_place_er } from ".";

describe("re_place_er", () => {
  // Should replace a single token in a string
  it("should replace a single token in a string when the token exists in the source string", () => {
    const options: ReplacerOptions = {
      openToken: "{{",
      endToken: "}}",
      job: {
        source: "Hello, {{name}}!",
        replacements: [{ name: "John" }, { name: "Jane" }],
      },
    };
    const result = re_place_er(options);
    expect(result).toEqual(["Hello, John!", "Hello, Jane!"]);
  });

  // Should replace multiple tokens in a string
  it("should replace multiple tokens in a string when all tokens exist in the source string", () => {
    const options: ReplacerOptions = {
      openToken: "{{",
      endToken: "}}",
      job: {
        source: "Hello, {{name}}! My name is {{myName}}.",
        replacements: [
          { name: "John", myName: "Alice" },
          { name: "Jane", myName: "Bob" },
        ],
      },
    };
    const result = re_place_er(options);
    expect(result).toEqual([
      "Hello, John! My name is Alice.",
      "Hello, Jane! My name is Bob.",
    ]);
  });

  // Should replace tokens with different lengths
  it("should replace tokens with different lengths when the tokens exist in the source string", () => {
    const options: ReplacerOptions = {
      openToken: "{{",
      endToken: "}}",
      job: {
        source: "Hello, {{name}}! My name is {{fullName}}.",
        replacements: [
          { name: "John", fullName: "John Doe" },
          { name: "Jane", fullName: "Jane Smith" },
        ],
      },
    };
    const result = re_place_er(options);
    expect(result).toEqual([
      "Hello, John! My name is John Doe.",
      "Hello, Jane! My name is Jane Smith.",
    ]);
  });

  // Should replace tokens with special characters
  it("should replace tokens with special characters when the tokens exist in the source string", () => {
    const options: ReplacerOptions = {
      openToken: "{{",
      endToken: "}}",
      job: {
        source: "Hello, {{name}}! My email is {{email}}.",
        replacements: [
          { name: "John", email: "john@example.com" },
          { name: "Jane", email: "jane@example.com" },
        ],
      },
    };
    const result = re_place_er(options);
    expect(result).toEqual([
      "Hello, John! My email is john@example.com.",
      "Hello, Jane! My email is jane@example.com.",
    ]);
  });

  // Should replace tokens with numbers
  it("should replace tokens with numbers when the tokens exist in the source string", () => {
    const options: ReplacerOptions = {
      openToken: "{{",
      endToken: "}}",
      job: {
        source: "Hello, {{name}}! My age is {{age}}.",
        replacements: [
          { name: "John", age: 25 },
          { name: "Jane", age: 30 },
        ],
      },
    };
    const result = re_place_er(options);
    expect(result).toEqual([
      "Hello, John! My age is 25.",
      "Hello, Jane! My age is 30.",
    ]);
  });

  // Should replace tokens with boolean values
  it("should replace tokens with boolean values when the tokens exist in the source string", () => {
    const options: ReplacerOptions = {
      openToken: "{{",
      endToken: "}}",
      job: {
        source: "Hello, {{name}}! Are you married? {{married}}.",
        replacements: [
          { name: "John", married: true },
          { name: "Jane", married: false },
        ],
      },
    };
    const result = re_place_er(options);
    expect(result).toEqual([
      "Hello, John! Are you married? true.",
      "Hello, Jane! Are you married? false.",
    ]);
  });

  // Should not replace tokens that do not exist in the source string
  it("should not replace tokens that do not exist in the source string", () => {
    const options: ReplacerOptions = {
      openToken: "{{",
      endToken: "}}",
      job: {
        source: "Hello, {{name}}!",
        replacements: [
          { myName: "John", age: 25 },
          { myName: "Jane", age: 30 },
        ],
      },
    };
    const result = re_place_er(options);
    expect(result).toEqual(["Hello, {{name}}!", "Hello, {{name}}!"]);
  });

  // Should not replace tokens that partially match other tokens
  it("should not replace tokens that partially match other tokens", () => {
    const options: ReplacerOptions = {
      openToken: "{{",
      endToken: "}}",
      job: {
        source: "Hello, {{name}}! My name is {{myName}}.",
        replacements: [
          { name: "John", myName: "Alice" },
          { name: "Jane", myName: "Bob" },
          { name: "John Doe", myName: "Charlie" },
        ],
      },
    };
    const result = re_place_er(options);
    expect(result).toEqual([
      "Hello, John! My name is Alice.",
      "Hello, Jane! My name is Bob.",
      "Hello, John Doe! My name is Charlie.",
    ]);
  });

  // Should not replace tokens that are substrings of other tokens
  it("should not replace tokens that are substrings of other tokens", () => {
    const options: ReplacerOptions = {
      openToken: "{{",
      endToken: "}}",
      job: {
        source: "Hello, {{name}}! My name is {{fullName}}.",
        replacements: [
          { name: "John", fullName: "John Doe" },
          { name: "Jane", fullName: "Jane Smith" },
          { name: "Doe", fullName: "Doe Smith" },
        ],
      },
    };
    const result = re_place_er(options);
    expect(result).toEqual([
      "Hello, John! My name is John Doe.",
      "Hello, Jane! My name is Jane Smith.",
      "Hello, Doe! My name is Doe Smith.",
    ]);
  });

  // Should not replace tokens that are superstrings of other tokens
  it("should not replace tokens that are superstrings of other tokens", () => {
    const options: ReplacerOptions = {
      openToken: "{{",
      endToken: "}}",
      job: {
        source: "Hello, {{name}}! My name is {{fullName}}.",
        replacements: [
          { name: "John", fullName: "John Doe" },
          { name: "Jane", fullName: "Jane Smith" },
          { name: "John Doe", fullName: "Doe Smith" },
        ],
      },
    };
    const result = re_place_er(options);
    expect(result).toEqual([
      "Hello, John! My name is John Doe.",
      "Hello, Jane! My name is Jane Smith.",
      "Hello, John Doe! My name is Doe Smith.",
    ]);
  });

  // Should not replace tokens that are empty strings
  it("should replace tokens that are empty strings", () => {
    const options: ReplacerOptions = {
      openToken: "{{",
      endToken: "}}",
      job: {
        source: "Hello, {{name}}!",
        replacements: [{ name: "" }, { name: "Jane" }],
      },
    };
    const result = re_place_er(options);
    expect(result).toEqual(["Hello, !", "Hello, Jane!"]);
  });
});
