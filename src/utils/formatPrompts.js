// /utils/formatPrompts.js
export const formatPrompt = (emojiInput, selectedGenres) => {
  return `Generate a story with the following theme: ${selectedGenres.join(
    ", "
  )}. Here's the input: ${emojiInput}`;
};
