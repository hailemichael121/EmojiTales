import { useState } from "react";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY; // Load from environment variables
const HUGGING_FACE_API_KEY = process.env.REACT_APP_HUGGING_FACE_API_KEY; // Load from environment variables
// Pre-defined emoji dictionary
const emojiStories = {
  "😊": {
    title1: "The Happy Day",
    body1:
      "Once upon a time, there was a smiley face that brightened everyone's day. 🌞",
    title2: "The Joyful Journey",
    body2:
      "A group of friends embarked on a journey filled with laughter and joy. 🚀",
  },
  "🚀": {
    title1: "Journey to the Stars",
    body1:
      "A rocket soared through the sky, exploring new galaxies and meeting alien friends. 👽",
    title2: "The Space Adventure",
    body2:
      "An astronaut discovered a new planet and made friends with the locals. 🌌",
  },
  // Add more emojis and stories as needed
};

const useOpenAIStoryGenerator = () => {
  const [storyData, setStoryData] = useState({
    title1: "",
    body1: "",
    title2: "",
    body2: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Generate story using GPT
  const generateWithGPT = async (prompt, retries = 3, backoff = 1000) => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a creative story generator.",
            },
            {
              role: "user",
              content: `
                Generate two short and creative stories based on the following input:
                "${prompt}"

                Each story should include:
                1. A title (short and catchy)
                2. A body (3-4 sentences max)

                Format your response as:
                Title 1: <Story Title>
                Body 1: <Story Body>

                Title 2: <Story Title>
                Body 2: <Story Body>
              `,
            },
          ],
          max_tokens: 300,
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      const result = response.data.choices[0].message.content.trim();

      // Parse the result from the model's response
      const title1 = result.match(/Title 1:\s*(.+)/)?.[1] || "Untitled Story 1";
      const body1 =
        result.match(/Body 1:\s*(.+)/)?.[1] || "No body for Story 1.";
      const title2 = result.match(/Title 2:\s*(.+)/)?.[1] || "Untitled Story 2";
      const body2 =
        result.match(/Body 2:\s*(.+)/)?.[1] || "No body for Story 2.";

      return { title1, body1, title2, body2 };
    } catch (err) {
      if (err.response && err.response.status === 429 && retries > 0) {
        await delay(backoff);
        return generateWithGPT(prompt, retries - 1, backoff * 2);
      }
      throw err;
    }
  };

  // Generate story using Hugging Face API
  const generateWithHuggingFace = async (prompt) => {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/gpt2",
      {
        inputs: `Generate two short and creative stories based on these emojis: ${prompt}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
        },
      }
    );

    const result = response.data[0].generated_text;

    // Parse the result (this is a simple example; you may need to adjust parsing logic)
    const [title1, body1, title2, body2] = result.split("\n").filter(Boolean);
    return {
      title1: title1 || "Untitled Story 1",
      body1: body1 || "No body for Story 1.",
      title2: title2 || "Untitled Story 2",
      body2: body2 || "No body for Story 2.",
    };
  };

  // Generate story using pre-defined dictionary
  const generateWithDictionary = (prompt) => {
    const emoji = prompt.trim(); // Use the first emoji in the prompt
    if (emojiStories[emoji]) {
      return emojiStories[emoji];
    }
    return {
      title1: "Unknown Emoji",
      body1: "We don't have a story for this emoji yet. Try another one! 😊",
      title2: "Untitled Story 2",
      body2: "No body for Story 2.",
    };
  };

  // Main function to generate stories
  const generateStories = async (prompt) => {
    setLoading(true);
    setError("");

    try {
      // Try GPT first
      const gptStory = await generateWithGPT(prompt);
      setStoryData(gptStory);
    } catch (gptError) {
      console.error("GPT Error:", gptError);

      try {
        // Fallback to Hugging Face if GPT fails
        const hfStory = await generateWithHuggingFace(prompt);
        setStoryData(hfStory);
      } catch (hfError) {
        console.error("Hugging Face Error:", hfError);

        // Fallback to pre-defined dictionary if both GPT and Hugging Face fail
        const dictStory = generateWithDictionary(prompt);
        setStoryData(dictStory);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    storyData,
    loading,
    error,
    generateStories,
  };
};

export default useOpenAIStoryGenerator;
