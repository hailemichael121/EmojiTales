import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FaShareAlt,
  FaDownload,
  FaFacebookF,
  FaTwitterSquare,
  FaLinkedinIn,
} from "react-icons/fa";
import { toJpeg } from "html-to-image";
import { useState } from "react";

const IMGBB_API_KEY = "8cb1b74ce0b32cb78b1955dadbb07f53";

const EmojiStory = () => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hideButtons, setHideButtons] = useState(false);

  // State for title and body
  const [storyTitle, setStoryTitle] = useState("🌟 Emoji Story");
  const [storyBody, setStoryBody] = useState(
    "Starting... Select some emojis and give it a shot!"
  );
  const [isStoryGenerated, setIsStoryGenerated] = useState(false); // State to track story generation

  // const emojiSequence = [
  //   "✨ Once upon a time... 👑",
  //   "There was a cheerful sun... ☀️",
  //   "Who loved to dance in the rain... 🌧️💃",
  //   "It created a magical rainbow... 🌈",
  //   "And everyone lived happily ever after. 🌟",
  // ];

  const uploadToImgBB = async (imageBlob) => {
    const formData = new FormData();
    formData.append("image", imageBlob);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    return data?.data?.url || null;
  };

  const handleDownload = () => {
    const cardElement = document.getElementById("emoji-story-card");
    if (cardElement) {
      setHideButtons(true);
      setTimeout(() => {
        toJpeg(cardElement, {
          backgroundColor: colorMode === "dark" ? "#1a202c" : "#f5f5dc",
        }).then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "emoji-story.jpg";
          link.href = dataUrl;
          link.click();
          setHideButtons(false);
        });
      }, 0);
    }
  };

  const handleShare = async (platform) => {
    const cardElement = document.getElementById("emoji-story-card");
    if (cardElement) {
      setHideButtons(true);
      setTimeout(async () => {
        const dataUrl = await toJpeg(cardElement, {
          backgroundColor: colorMode === "dark" ? "#1a202c" : "#f5f5dc",
        });

        const imageBlob = await (await fetch(dataUrl)).blob();
        const uploadedImageUrl = await uploadToImgBB(imageBlob);

        setHideButtons(false);

        if (!uploadedImageUrl) {
          console.error("Image upload failed!");
          return;
        }

        const platformUrls = {
          facebook: `https://www.facebook.com/sharer/sharer.php?u=${uploadedImageUrl}&quote=${encodeURIComponent(
            storyTitle
          )}`,
          twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            "Check out my Emoji Story! ✨ " + storyTitle
          )}&url=${uploadedImageUrl}`,
          linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${uploadedImageUrl}`,
        };

        window.open(platformUrls[platform], "_blank");
      }, 0);
    }
  };

  // Simulate generating story title and body (you can replace this with GPT API call)
  const handleGenerateStory = () => {
    // Assuming GPT would generate these
    const generatedTitle = "🌟 The Magical Adventure of Emojis";
    const generatedBody =
      "Once upon a time, emojis lived in a world full of emotions and adventure. 🌈✨";

    setStoryTitle(generatedTitle);
    setStoryBody(generatedBody);
    setIsStoryGenerated(true); // Mark that the story has been generated
  };

  return (
    <Box
      id="emoji-story-card"
      w="100%"
      h="100%"
      bg={colorMode === "dark" ? "whiteAlpha.200" : "whiteAlpha.100"}
      borderRadius="xl"
      boxShadow="xl"
      p={6}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      position="relative"
    >
      {/* Story Title */}
      <Text
        fontSize="2xl"
        fontWeight="bold"
        color={colorMode === "dark" ? "whitesmoke" : "blackAlpha.900"}
        mb="4"
        fontFamily="cursive"
        textAlign="center"
      >
        {storyTitle}
      </Text>

      {/* Story Body */}
      <VStack spacing={4} flex="1" justifyContent="center">
        <Text
          fontSize="lg"
          fontWeight="medium"
          color={colorMode === "dark" ? "whitesmoke" : "blackAlpha.900"}
          textAlign="center"
        >
          {storyBody}
        </Text>
      </VStack>

      {/* Signature */}
      <Text
        position="absolute"
        bottom="10px"
        right="10px"
        fontSize="sm"
        fontWeight="bold"
        color={colorMode === "dark" ? "gray.500" : "gray.700"}
        fontStyle="italic"
      >
        Emotify
      </Text>

      {/* Buttons */}
      {isStoryGenerated && (
        <Button colorScheme="teal" onClick={handleGenerateStory} mt={4}>
          Generate Story
        </Button>
      )}
      {!hideButtons && isStoryGenerated && (
        <HStack spacing={4} justifyContent="center" mt={4}>
          <Button leftIcon={<FaShareAlt />} colorScheme="blue" onClick={onOpen}>
            Share
          </Button>
          <Button
            leftIcon={<FaDownload />}
            colorScheme="teal"
            onClick={handleDownload}
          >
            Download
          </Button>
        </HStack>
      )}

      {/* Share Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg={colorMode === "dark" ? "blackAlpha.900" : "whiteAlpha.100"}
        >
          <ModalHeader>Share Your Story</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align={"stretch"}>
              <Button
                leftIcon={<FaFacebookF />}
                onClick={() => handleShare("facebook")}
              >
                Share on Facebook
              </Button>
              <Button
                leftIcon={<FaTwitterSquare />}
                onClick={() => handleShare("twitter")}
              >
                Share on Twitter
              </Button>
              <Button
                leftIcon={<FaLinkedinIn />}
                onClick={() => handleShare("linkedin")}
              >
                Share on LinkedIn
              </Button>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} colorScheme="blue">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EmojiStory;
