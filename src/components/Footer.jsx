// src/components/Footer.jsx
import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      as="footer"
      mt={10}
      textAlign="center"
      py={4} // Padding on the y-axis
      bg="transparent" // Background color
      bottom={0} // Stick to the bottom
      left={0} // Align to the left
      right={0} // Align to the right
    >
      <Text fontSize="sm" color="gray.600">
        Created with 🖤 by Yihun
      </Text>
    </Box>
  );
};

export default Footer;
