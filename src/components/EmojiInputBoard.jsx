import { useState } from "react";
import {
  Box,
  Button,
  Textarea,
  VStack,
  HStack,
  useColorMode,
  Tag,
  Text,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

import EmojiPicker from "emoji-picker-react";
import useOpenAIStoryGenerator from "./OpenAIStoryGenerator";
import EmojiStory from "./EmojiStoryBoard";
import { FaArrowAltCircleRight } from "react-icons/fa";

// Define animations
const bounce = keyframes`
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(10px); }
`;

const jump = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const EmojiInputBoard = () => {
  const [inputValue, setInputValue] = useState("");
  const { colorMode } = useColorMode();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [formattedPrompt, setFormattedPrompt] = useState("");
  const { storyData, loading, error, generateStories } =
    useOpenAIStoryGenerator();

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
    setFormattedPrompt("");
  };

  const handleEmojiClick = (emojiObject) => {
    setInputValue((prevValue) => prevValue + emojiObject.emoji);
  };

  const handleGenerateStory = async () => {
    if (!inputValue) return;

    const prompt = `${inputValue}${selectedOptions.join(", ")}`;
    setFormattedPrompt(prompt);

    console.log(prompt); // Log the prompt to the console

    try {
      await generateStories(prompt);
    } catch (error) {
      console.error("Error generating story:", error);
    }
  };

  const handleOptionToggle = (option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    );
  };

  const bounceAnimation = `${bounce} 2s infinite`;
  const jumpAnimation = `${jump} 1s infinite`;

  return (
    <Box
      display="flex"
      flexDirection={{ base: "column", md: "row" }} // Stack vertically on mobile, horizontally on desktop
      justifyContent="space-evenly"
      alignItems="stretch"
      width="100%"
      minHeight="100vh" // Ensure the container takes up at least the full viewport height
      bg={colorMode === "dark" ? "blackAlpha.100" : "whiteAlpha.100"}
      p={{ base: 4, md: 8 }} // Adjust padding for mobile
    >
      {/* Input Card */}
      <Box
        flex="1"
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb={{ base: 4, md: 0 }} // Add margin-bottom on mobile
      >
        <Box w={{ base: "100%", md: "90%" }} h={{ base: "auto", md: "90%" }}>
          <Box
            w="100%"
            h="100%"
            bg={colorMode === "dark" ? "whiteAlpha.200" : "whiteAlpha.100"}
            borderRadius="xl"
            boxShadow="xl"
            p={{ base: 4, md: 6 }} // Adjust padding for mobile
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <VStack h="100%" align="stretch" spacing={4}>
              {/* Input area */}
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add emojis here..."
                size="lg"
                h="50px"
                focusBorderColor="teal.500"
                borderColor="gray.300"
                _placeholder={{
                  color: "gray.500",
                  position: "absolute",
                  top: "8px",
                  left: "15px",
                  fontSize: "md",
                }}
                readOnly
              />

              {/* Genre Options */}
              {inputValue && (
                <HStack spacing={2} justifyContent="center" wrap="wrap">
                  {genres.map((genre, index) => (
                    <Tag
                      key={index}
                      size={{ base: "md", md: "lg" }} // Adjust size for mobile
                      variant={
                        selectedOptions.includes(genre) ? "solid" : "outline"
                      }
                      colorScheme="gray"
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
                onEmojiClick={handleEmojiClick}
                height={"300px"}
                width={"100%"}
                searchDisabled
              />

              {/* Buttons */}
              <HStack w="100%" justifyContent="space-evenly">
                <Button
                  bgColor="gray"
                  colorScheme="blackAlpha"
                  onClick={handleGenerateStory}
                  isLoading={loading}
                  w="100%"
                >
                  Generate Story
                </Button>
                {inputValue && (
                  <Button colorScheme="red" w="100%" onClick={handleClear}>
                    Clear
                  </Button>
                )}
              </HStack>
            </VStack>
          </Box>
        </Box>
      </Box>

      {/* Fancy Arrow or Loading Animation */}
      <Box
        justifyContent="center"
        display="flex"
        alignItems="center"
        mb={{ base: 4, md: 0 }} // Add margin-bottom on mobile
      >
        {loading ? (
          <HStack spacing={2}>
            <Box
              w="10px"
              h="10px"
              bg={colorMode === "dark" ? "white" : "gray.400"}
              borderRadius="full"
              animation={`${jumpAnimation}`} // First dot
            />
            <Box
              w="10px"
              h="10px"
              bg={colorMode === "dark" ? "white" : "gray.400"}
              borderRadius="full"
              animation={`${jumpAnimation} 0.2s`} // Second dot with delay
            />
            <Box
              w="10px"
              h="10px"
              bg={colorMode === "dark" ? "white" : "gray.400"}
              borderRadius="full"
              animation={`${jumpAnimation} 0.4s`} // Third dot with delay
            />
          </HStack>
        ) : (
          <Text
            fontSize={{ base: "2xl", md: "4xl" }} // Adjust font size for mobile
            color={colorMode === "dark" ? "white" : "gray.400"}
            mx={4}
            animation={bounceAnimation}
          >
            <FaArrowAltCircleRight />
          </Text>
        )}
      </Box>

      {/* Output Card */}
      <Box
        flex="1"
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={{ base: 4, md: 0 }} // Add margin-top on mobile
      >
        <Box w={{ base: "100%", md: "90%" }} h={{ base: "auto", md: "90%" }}>
          <EmojiStory storyData={storyData} loading={loading} error={error} />
        </Box>
      </Box>
    </Box>
  );
};

export default EmojiInputBoard;
