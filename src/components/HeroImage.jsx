import { Box, Image, Text, Button } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import PropTypes from "prop-types";

// Define a fade-in animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const HeroImage = ({ scrollToEmojiInputBoard }) => {
  const fadeInAnimation = `${fadeIn} 1s ease-in-out`;

  return (
    <Box
      position="relative"
      w="100%"
      h="100vh" // Full viewport height
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      textAlign="center"
      overflow="hidden"
    >
      {/* Background Image */}
      <Image
        src="/emotify_background.png" // Ensure the path is correct
        alt="Hero Image"
        w="100%"
        h="100%"
        objectFit="cover"
        position="absolute"
        top="0"
        left="0"
        zIndex="-1" // Ensure the image stays behind the content
      />

      {/* Gradient Overlay */}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        bgGradient="linear(to-b, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8))" // Gradient overlay
        zIndex="0"
      />

      {/* Main Heading Text */}
      <Text
        position="relative"
        color="white"
        fontSize={{ base: "4xl", md: "6xl" }} // Responsive font size
        fontWeight="bold"
        fontFamily="'Bungee', cursive"
        zIndex="1"
        animation={fadeInAnimation}
        textShadow="0 0 10px rgba(255, 255, 255, 0.5)" // Subtle text shadow
      >
        🚀 EmojiTale! 🌟
      </Text>

      {/* Descriptive Text */}
      <Text
        position="relative"
        color="white"
        fontSize={{ base: "lg", md: "xl" }} // Responsive font size
        zIndex="1"
        mt={4}
        maxW={{ base: "90%", md: "60%" }}
        animation={fadeInAnimation}
        textShadow="0 0 10px rgba(255, 255, 255, 0.3)" // Subtle text shadow
      >
        Discover the magic of turning emojis into tales with the power of GPT.
        Dive into a world where every emoji tells a unique story, crafted just
        for you. Join us and let your imagination run wild! 📖✨
      </Text>

      {/* "Get Started" Button */}
      <Button
        position="relative"
        colorScheme="teal"
        size="lg"
        mt={8}
        px={8}
        py={6}
        borderRadius="full"
        fontSize="lg"
        bgGradient="linear(to-r, teal.400, blue.500)" // Gradient background
        _hover={{
          bgGradient: "linear(to-r, teal.500, blue.600)",
          transform: "scale(1.05)",
          boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
        }}
        transition="all 0.3s ease"
        animation={fadeInAnimation}
        zIndex="1"
        onClick={scrollToEmojiInputBoard} // Scroll to EmojiInputBoard on click
      >
        Get Started 🚀
      </Button>
    </Box>
  );
};
HeroImage.propTypes = {
  scrollToEmojiInputBoard: PropTypes.func.isRequired,
};

export default HeroImage;
