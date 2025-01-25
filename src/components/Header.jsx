import { Flex, Heading, Text, Image, HStack } from "@chakra-ui/react";
import ToggleColorMode from "./ToggleColorMode";
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
      <Flex alignItems="center">
        <Image
          src={
            colorMode === "light"
              ? "src/assets/emotify.png"
              : "src/assets/emotifyDark.png"
          }
          alt="Emotify Logo"
          boxSize="40px"
          borderRadius="full"
        />
        <Heading size="sm" pl={1}>
          Emotify
        </Heading>
      </Flex>
      <HStack mr={"1%"} justifyContent={"Center"} alignItems={"center"}>
        <Text mr={"4%"} fontSize="sm" fontWeight="bold" cursor="pointer">
          About
        </Text>
        <ToggleColorMode />
      </HStack>
    </Flex>
  );
};

export default Header;
