import { Box, Image, Text, Button } from "@chakra-ui/react";

const HeroImage = () => {
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
    >
      {/* Image Container */}
      <Box
        position="relative"
        w="100%"
        h="100%"
        overflow="hidden"
        borderRadius="xl"
      >
        {/* Semi-transparent Overlay */}
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          borderRadius="xxl"
          h="90%"
          bg="rgba(0, 0, 0, 0.5)" // Dark overlay to make the text stand out
          zIndex="0"
        />

        {/* Background Image */}
        <Image
          src="src/assets/emotify_background.png" // Ensure the path is correct
          alt="Hero Image"
          w="100%"
          h="90%"
          objectFit="cover"
          borderRadius="xl"
          zIndex="-1" // Make sure the image stays behind the text
        />

        {/* Main Heading Text */}
        <Text
          position="absolute"
          top="25%"
          left="50%"
          transform="translateX(-50%)"
          color="white"
          fontSize="6xl"
          fontWeight="bold"
          fontFamily="'Bungee', cursive"
          zIndex="1"
          bg="rgba(0, 0, 0, 0.6)" // Transparent background to make text visible
          borderRadius="lg"
          p="4"
        >
          🚀 Emotify! 🌟
        </Text>

        {/* Descriptive Text */}
        <Text
          position="absolute"
          top="50%"
          left="50%"
          transform="translateX(-50%)"
          color="white"
          fontSize="lg"
          zIndex="1"
          p="4"
          bg="rgba(0, 0, 0, 0.6)"
          borderRadius={"xl"} // Transparent background to make text visible
          maxW="80%"
        >
          Unleash your creativity and express your emotions through music,
          videos, and more. Join us on this amazing journey where every moment
          is a masterpiece waiting to be shared! 🎨 🎶
        </Text>

        {/* "Get Started" Button */}
        <Button
          position="absolute"
          left="40%"
          bottom="20%"
          colorScheme="gray"
          size="lg"
          border={"2px solid white"}
          onClick={() => alert("Get Started!")}
          borderRadius="full"
          fontSize="lg"
          pl={24}
          pr={24}
          _hover={{
            bg: "gray.200",
            transform: "scale(1.05)",
            boxShadow: "0 0 15px rgba(0, 2, 25, 0.5)",
          }}
          zIndex="2"
        >
          Get Started 🚀
        </Button>
      </Box>
    </Box>
  );
};

export default HeroImage;
