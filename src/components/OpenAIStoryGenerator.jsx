import { useState } from "react";
import axios from "axios";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const emojiStories = {
  "😂": {
    title1: "The Laughing Kingdom",
    body1:
      "In a land where laughter was the most precious treasure, a young jester named Jolly discovered a magical joke book. With each joke he told, the kingdom grew happier, and the skies filled with rainbows. 🌈",
  },
  "😢": {
    title1: "The Tearful Tale",
    body1:
      "In a village where tears turned into pearls, a sad girl named Lily cried a river of gems. Her tears brought wealth to the village, but she longed for happiness. One day, a kind traveler taught her to smile, and her tears turned into laughter. 🌟",
  },
  "😎": {
    title1: "The Cool Cat",
    body1:
      "In a city of style, a cat named Slick wore the coolest shades. Everyone admired his swagger, but he was lonely. One day, he met a dog named Dash who showed him that true friendship is the coolest thing of all. 🐾",
  },
  "😇": {
    title1: "The Angel's Gift",
    body1:
      "In a heavenly realm, an angel named Grace was sent to Earth with a special gift. She brought kindness and joy to everyone she met, and her presence made the world a better place. 🌍",
  },
  "🤖": {
    title1: "The Robot's Dream",
    body1:
      "In a futuristic city, a robot named Bolt dreamed of becoming human. He embarked on a journey to find a magical circuit that could grant his wish. Along the way, he discovered that emotions and friendships were the true essence of humanity. 🤖❤️",
  },
  "🦄": {
    title1: "The Unicorn's Quest",
    body1:
      "In an enchanted forest, a unicorn named Sparkle set out on a quest to find the legendary Rainbow Crystal. With the help of her friends, she overcame obstacles and discovered that the true magic was the bond they shared. 🌈",
  },
  "👽": {
    title1: "The Alien Visitor",
    body1:
      "In a small town, an alien named Zog landed his spaceship. The townspeople were scared at first, but Zog's friendly nature won them over. He shared stories of distant galaxies and taught them that the universe is full of wonders. 🌌",
  },
  "🎃": {
    title1: "The Pumpkin King",
    body1:
      "In a spooky village, a pumpkin named Jack came to life on Halloween night. He became the Pumpkin King and led the villagers in a night of fun and frights. His laughter echoed through the night, making Halloween unforgettable. 🎃",
  },
  "🐉": {
    title1: "The Dragon's Treasure",
    body1:
      "In a mountainous kingdom, a dragon named Blaze guarded a hidden treasure. A brave knight named Leo sought the treasure, but instead of fighting, they became friends. Together, they protected the kingdom and shared the treasure with the people. 🐉",
  },
  "🧙‍♂️": {
    title1: "The Wizard's Spell",
    body1:
      "In a mystical land, a wizard named Merlin cast a spell to protect his village from darkness. His magic brought light and hope to the people, and they celebrated his wisdom and bravery. ✨",
  },
  "🧜‍♀️": {
    title1: "The Mermaid's Song",
    body1:
      "In the depths of the ocean, a mermaid named Ariel sang a song that enchanted all who heard it. Her voice brought peace to the underwater kingdom, and she became a beloved figure among the sea creatures. 🌊",
  },
  "👻": {
    title1: "The Friendly Ghost",
    body1:
      "In a haunted mansion, a ghost named Casper wanted to make friends. He scared people away until he met a brave girl who saw his kind heart. Together, they turned the mansion into a place of joy and laughter. 👻",
  },
  "🦸‍♂️": {
    title1: "The Superhero's Secret",
    body1:
      "In a bustling city, a man named Max had a secret identity as a superhero. He saved the city from villains, but his true power was his kindness. His secret was revealed when he helped a child in need, and the city celebrated their true hero. 🦸‍♂️",
  },
  "🧚‍♀️": {
    title1: "The Fairy's Wish",
    body1:
      "In a magical forest, a fairy named Tinker granted wishes to those with pure hearts. One day, she met a boy who wished for his village to be happy. Tinker granted his wish, and the village flourished with joy and prosperity. 🧚‍♀️",
  },
  "🦁": {
    title1: "The Lion's Courage",
    body1:
      "In the savannah, a lion named Leo was known for his bravery. When a drought threatened the animals, Leo led them to a hidden oasis. His courage and leadership saved the day, and he became the king of the savannah. 🦁",
  },
  "🐢": {
    title1: "The Turtle's Journey",
    body1:
      "In a peaceful pond, a turtle named Shelly dreamed of seeing the ocean. She embarked on a long journey, facing many challenges. With determination and the help of new friends, she finally reached the ocean and found her true home. 🐢",
  },
  "🐧": {
    title1: "The Penguin's Adventure",
    body1:
      "In the icy Antarctic, a penguin named Pippin wanted to explore the world. He set off on an adventure, sliding on icebergs and swimming through the sea. Along the way, he discovered new lands and made friends with creatures from different places. 🐧",
  },
  "🦊": {
    title1: "The Fox's Clever Plan",
    body1:
      "In a dense forest, a fox named Fenn was known for his cleverness. When a fire threatened the forest, Fenn devised a plan to lead the animals to safety. His quick thinking saved many lives, and he became a hero among the forest creatures. 🦊",
  },
  "🐼": {
    title1: "The Panda's Peace",
    body1:
      "In a bamboo forest, a panda named Po lived a peaceful life. When conflict arose between the animals, Po used his wisdom and gentle nature to bring harmony. His efforts united the forest, and peace was restored. 🐼",
  },
  "🦋": {
    title1: "The Butterfly's Transformation",
    body1:
      "In a beautiful garden, a caterpillar named Bella dreamed of flying. She went through a magical transformation and emerged as a butterfly. Bella's journey inspired others to embrace change and find their true potential. 🦋",
  },
  "🐘": {
    title1: "The Elephant's Memory",
    body1:
      "In the vast savannah, an elephant named Ellie was known for her incredible memory. She remembered every path and waterhole, guiding her herd through tough times. Ellie's wisdom and memory kept her family safe and strong. 🐘",
  },
};

const useOpenAIStoryGenerator = () => {
  const [storyData, setStoryData] = useState({
    title1: "",
    body1: "",
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
                  Generate two short and creative fairy tales based on the following input:
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
        console.log(`Rate limit hit. Retrying in ${backoff}ms...`);
        await delay(backoff);
        return generateWithGPT(prompt, retries - 1, backoff * 2);
      }
      throw err;
    }
  };
  const generateWithDictionary = (prompt) => {
    // Extract the first emoji from the prompt
    const emoji = prompt.trim().match(/^[^\s\w]+/)?.[0]; // Match the first non-space, non-word character
    if (emojiStories[emoji]) {
      console.log("Using dictionary for emoji:", emoji);
      return emojiStories[emoji];
    }
    console.log("Unknown emoji:", emojiStories["${emoji}"]);
    return {
      title1: "Unknown Emoji",
      body1: "We don't have a story for this emoji yet. Try another one! 😊",
    };
  };

  const generateStories = async (prompt) => {
    setLoading(true);
    setError("");

    try {
      // Try GPT first
      const gptStory = await generateWithGPT(prompt);
      setStoryData(gptStory);
    } catch (gptError) {
      console.error("GPT Error:", gptError);

      const dictStory = generateWithDictionary(prompt);
      console.log("Falling back to dictionary:", dictStory);
      setStoryData(dictStory);
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
