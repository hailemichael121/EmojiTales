import { useState } from "react";
import {
  Box,
  Button,
  Textarea,
  VStack,
  HStack,
  useColorMode,
  Tag,
} from "@chakra-ui/react";
import EmojiPicker from "emoji-picker-react";

const EmojiInputBoard = () => {
  const [inputValue, setInputValue] = useState("");
  const { colorMode } = useColorMode();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const genres = [
    "Make it funny",
    "Make it a fairytale",
    "Make it spooky",
    "Make it adventurous",
    "Make it emotional",
  ];

  const handleClear = () => {
    setInputValue("");
    setSelectedOptions([]);
  };

  const handleEmojiClick = (emojiObject) => {
    setInputValue((prevValue) => prevValue + emojiObject.emoji);
  };

  const handleGenerateStory = () => {
    // Log selected options to check its type
    console.log("Selected Options: ", selectedOptions);

    const formattedPrompt = `Generate a story with the following theme: ${selectedOptions.join(
      ", "
    )}. Here's the input: ${inputValue}`;

    alert(`Story prompt: ${formattedPrompt}`);
  };

  const handleOptionToggle = (option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    );
  };

  return (
    <Box
      w="100%"
      h="100%"
      bg={colorMode === "dark" ? "whiteAlpha.200" : "whiteAlpha.100"} // Change bg color based on color mode
      borderRadius="xl"
      boxShadow="xl"
      p={6}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <VStack align="stretch" spacing={4}>
        {/* Input area */}
        <Textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add emojis here..."
          size="lg"
          h="100px"
          focusBorderColor="teal.500"
          borderColor="gray.300"
          _placeholder={{
            color: "gray.500",
            position: "absolute",
            top: "8px",
            left: "15px",
            fontSize: "md",
          }}
        />

        {/* Genre Options (Appears only when input is provided) */}
        {inputValue && (
          <HStack spacing={2} justifyContent="center" wrap="wrap">
            {genres.map((genre, index) => (
              <Tag
                key={index}
                size="lg"
                variant={selectedOptions.includes(genre) ? "solid" : "outline"}
                colorScheme="teal"
                cursor="pointer"
                onClick={() => handleOptionToggle(genre)}
              >
                {genre}
              </Tag>
            ))}
          </HStack>
        )}

        {/* Emoji Picker */}
        <EmojiPicker
          onEmojiClick={handleEmojiClick} // Handle emoji click
          height={"300px"}
          width={"100%"}
          searchDisabled
        />

        {/* Buttons */}
        <Button colorScheme="teal" onClick={handleGenerateStory}>
          Generate Story
        </Button>
        {inputValue && (
          <Button colorScheme="red" onClick={handleClear}>
            Clear
          </Button>
        )}
      </VStack>
    </Box>
  );
};

export default EmojiInputBoard;
