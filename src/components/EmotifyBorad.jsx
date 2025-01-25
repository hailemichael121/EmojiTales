import { Box, Text, useColorMode } from "@chakra-ui/react";
import EmojiInputBoard from "./EmojiInputBoard";
import EmojiStory from "./EmojiStoryBoard";
import { FaArrowCircleRight } from "react-icons/fa";

const EmotifyBoard = () => {
  // Get the current color mode (light or dark)
  const { colorMode } = useColorMode();

  return (
    <Box
      display="flex"
      justifyContent="space-evenly"
      alignItems="stretch"
      width="100%"
      height="100vh" // Full viewport height
      bg={colorMode === "dark" ? "blackAlpha.100" : "whiteAlpha.100"} // Change bg color based on color mode
      p={8}
      flexDirection={{ base: "column", md: "row" }} // Stack vertically on smaller screens
    >
      {/* Emoji Input Board */}
      <Box
        flex="1"
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb={{ base: 4, md: 0 }}
      >
        <Box w="90%" h="90%">
          <EmojiInputBoard />
        </Box>
      </Box>

      {/* Arrow */}
      <Box
        justifyContent={"center"}
        display="flex"
        alignItems="center"
        mb={{ base: 4, md: 0 }}
      >
        <Text
          fontSize="4xl"
          color={colorMode === "dark" ? "white" : "gray.400"}
          mx={4}
        >
          <FaArrowCircleRight />
        </Text>
      </Box>

      {/* Emoji Story */}
      <Box flex="1" display="flex" justifyContent="center" alignItems="center">
        <Box w="90%" h="90%">
          <EmojiStory />
        </Box>
      </Box>
    </Box>
  );
};

export default EmotifyBoard;
