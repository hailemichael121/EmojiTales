import { Flex, Heading, Image, HStack } from "@chakra-ui/react";
import ToggleColorMode from "./ToggleColorMode";
import AboutModal from "./AboutModal"; // Import the AboutModal component
import { useColorMode } from "@chakra-ui/react";

const Header = () => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      as="header"
      bg={colorMode === "light" ? "white" : "black"}
      color={colorMode === "light" ? "black" : "white"}
      p={4}
      justifyContent="space-between"
      alignItems="center"
      position="sticky"
      top="0"
      zIndex="10"
    >
      {/* Logo and App Name */}
      <Flex alignItems="center">
        <Image
          src={colorMode === "light" ? "/emotify.png" : "/emotifyDark.png"}
          alt="Emotify Logo"
          boxSize="40px"
          borderRadius="full"
        />
        <Heading size="sm" pl={1}>
          EmojiTale
        </Heading>
      </Flex>

      {/* About and Toggle Color Mode */}
      <HStack mr={"1%"} justifyContent={"Center"} alignItems={"center"}>
        {/* About Text - Triggers the AboutModal */}
        <AboutModal />

        {/* Toggle Dark/Light Mode */}
        <ToggleColorMode />
      </HStack>
    </Flex>
  );
};

export default Header;
