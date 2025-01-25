// /services/apiService.js
import axios from "axios";

const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY";

export const generateStory = async (emojiInput, selectedGenres) => {
  const prompt = `Generate a story with the following theme: ${selectedGenres.join(
    ", "
  )}. Here's the input: ${emojiInput}`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions", // Adjust endpoint if needed
      {
        model: "gpt-3.5-turbo", // or 'gpt-4' depending on your plan
        prompt,
        max_tokens: 500,
        temperature: 0.7,
        n: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error generating story:", error);
    throw new Error("Failed to generate story");
  }
};
