import { Box, Text, useColorMode } from "@chakra-ui/react";

const Footer = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
      as="footer"
      textAlign="center"
      py={4} // Padding on the y-axis
      bg="transparent" // Background color
      width="100%" // Full width
      position="relative" // Use relative positioning
      bottom={0} // Stick to the bottom
      left={0} // Align to the left
      right={0} // Align to the right
      mt="auto" // Push the footer to the bottom
    >
      <Text
        fontSize="md"
        color={colorMode === "dark" ? "gray.300" : "gray.800"}
      >
        Created with 🖤 by Yihun
      </Text>
    </Box>
  );
};

export default Footer;
