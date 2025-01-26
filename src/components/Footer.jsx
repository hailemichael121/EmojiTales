// src/components/Footer.jsx
import { Box, Text, useColorMode } from "@chakra-ui/react";

const Footer = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
      as="footer"
      mt={6}
      textAlign="center"
      py={4} // Padding on the y-axis
      bg="transparent" // Background color
      bottom={0} // Stick to the bottom
      left={0} // Align to the left
      right={0} // Align to the right
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
