import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Avatar,
  Link,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const AboutModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  return (
    <>
      <Text
        cursor="pointer"
        fontSize="lg"
        fontWeight="bold"
        onClick={onOpen}
        color={colorMode === "dark" ? "gray.300" : "gray.800"}
        _hover={{ textDecoration: "underline", color: "teal.400" }}
      >
        About
      </Text>

      <Modal isOpen={isOpen} onClose={onClose} size={["full", "md", "lg"]}>
        <ModalOverlay />
        <ModalContent
          bg={colorMode === "dark" ? "blackAlpha.900" : "white"}
          color={colorMode === "dark" ? "gray.100" : "gray.800"}
          borderRadius="lg"
          mx={4} // Add margin for better spacing on mobile
        >
          <ModalHeader>
            <Text fontSize="2xl" fontWeight="bold" textAlign="center">
              About EmojiTales
            </Text>
          </ModalHeader>
          <ModalCloseButton
            color={colorMode === "dark" ? "gray.300" : "gray.800"}
            _hover={{ color: "teal.400" }}
          />
          <ModalBody p={[4, 6, 8]} overflowY="auto">
            <VStack spacing={6} align="center">
              {/* Profile Section */}
              <Box textAlign="center">
                <Avatar
                  size="xl"
                  src="https://via.placeholder.com/200" // Replace with your profile photo URL
                  mb={4}
                  border="4px solid"
                  borderColor="teal.400"
                  boxShadow="lg"
                />
                <Text fontSize="xl" fontWeight="bold">
                  Yihun Shekuri
                </Text>
                <Text fontSize="md" color="gray.500" fontStyle="italic">
                  Creator & Developer
                </Text>
                <HStack spacing={4} mt={4} justify="center">
                  <Link href="https://github.com/your-github" isExternal>
                    <Button
                      leftIcon={<FaGithub />}
                      colorScheme="gray"
                      variant="outline"
                      size="sm"
                      _hover={{ bg: "teal.500", color: "white" }}
                    >
                      GitHub
                    </Button>
                  </Link>
                  <Link href="https://linkedin.com/in/your-linkedin" isExternal>
                    <Button
                      leftIcon={<FaLinkedin />}
                      colorScheme="gray"
                      variant="outline"
                      size="sm"
                      _hover={{ bg: "teal.500", color: "white" }}
                    >
                      LinkedIn
                    </Button>
                  </Link>
                  <Link href="https://twitter.com/your-twitter" isExternal>
                    <Button
                      leftIcon={<FaTwitter />}
                      colorScheme="gray"
                      variant="outline"
                      size="sm"
                      _hover={{ bg: "teal.500", color: "white" }}
                    >
                      Twitter
                    </Button>
                  </Link>
                </HStack>
              </Box>

              {/* Description Section */}
              <Box textAlign="center" maxW={["90%", "80%", "70%"]}>
                <Text fontSize="lg" fontWeight="semibold">
                  Welcome to <span style={{ color: "teal" }}>EmojiTales</span>!
                </Text>
                <Text mt={4} fontSize="md" color="gray.500">
                  EmojiTales is a fun and creative app where emojis come to life
                  as stories. Choose your favorite emojis, pick a theme, and let
                  the magic of AI craft unique and engaging tales for you.
                </Text>
                <Text mt={4} fontSize="md" color="gray.500">
                  Whether you&apos;re looking for a quick laugh, an adventurous
                  journey, or a heartfelt story, EmojiTales has something for
                  everyone.
                </Text>
              </Box>

              {/* Features Section */}
              <Box textAlign="center" maxW={["90%", "80%", "70%"]}>
                <Text fontSize="lg" fontWeight="semibold">
                  What You Can Do
                </Text>
                <VStack mt={4} spacing={3} align="flex-start">
                  <Text fontSize="md" color="gray.500">
                    • Create stories using emojis and themes like
                    &quot;Funny&quot; or &quot;Adventurous.&quot;
                  </Text>
                  <Text fontSize="md" color="gray.500">
                    • Share your stories with friends or download them to keep.
                  </Text>
                  <Text fontSize="md" color="gray.500">
                    • Enjoy a clean and modern design that&apos;s easy to use.
                  </Text>
                </VStack>
              </Box>

              {/* Vision Section (Hidden on Mobile) */}
              <Box
                textAlign="center"
                maxW={["90%", "80%", "70%"]}
                display={["none", "block"]} // Hide on mobile, show on tablet/desktop
              ></Box>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AboutModal;
