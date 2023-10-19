/**
 * Provides an Interface for the replacer options
 */
export interface ReplacerOptions {
  openToken: string;
  endToken: string;
  job: ReplacerJob;
}

/**
 * Provides an interface for a replacement
 */
export interface Replacement {
  [key: string]: string | number | boolean;
}

/**
 * Provides an Interface for a replacement job
 */
export interface ReplacerJob {
  source: string;
  replacements: Replacement[];
}

/**
 * Provides a tool for replacing tokens in a string
 * @param {ReplacerOptions} options for the replacement
 * @returns {string} the replaced string
 */
export const re_place_er = (options: ReplacerOptions): string[] => {
  const { openToken, endToken, job } = options;
  const { source, replacements } = job;
  let results: string[] = [];
  replacements.forEach((replacement) => {
    let stringWithTokens = source;
    Object.keys(replacement).forEach((key) => {
      const token: string = `${openToken}${key}${endToken}`;
      const value: string | number | boolean | undefined = replacement[key];
      if (value !== undefined) {
        stringWithTokens = stringWithTokens.replace(token, value.toString());
      }
    });
    results.push(stringWithTokens);
  });
  return results;
};
