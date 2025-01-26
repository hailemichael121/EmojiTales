import { useEffect, useState } from "react";
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
  Spinner,
  Alert,
  AlertIcon,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FaShareAlt,
  FaDownload,
  FaFacebookF,
  FaLinkedinIn,
  FaTelegramPlane,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { toJpeg } from "html-to-image";
import PropTypes from "prop-types";

const IMGBB_API_KEY = "8cb1b74ce0b32cb78b1955dadbb07f53";

const EmojiStory = ({ storyData, loading, error }) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hideButtons, setHideButtons] = useState(false);

  // States for title and body
  const [storyTitle, setStoryTitle] = useState(
    "🌟 Welcome to Emoji Storyland! 🌟"
  );
  const [storyBody, setStoryBody] = useState(
    "✨ Ready to create magic? Add some emojis and let your imagination run wild! ✨"
  );
  const [isStoryGenerated, setIsStoryGenerated] = useState(false);

  // Update story title and body when storyData changes
  useEffect(() => {
    if (storyData.title1 && storyData.body1) {
      setStoryTitle(storyData.title1);
      setStoryBody(storyData.body1);
      setIsStoryGenerated(true);
    } else {
      // Fallback to default message if no story is generated
      setStoryTitle("🌟 Welcome to Emoji Storyland! 🌟");
      setStoryBody(
        "✨ Ready to create magic? Add some emojis and let your imagination run wild! ✨"
      );
      setIsStoryGenerated(false);
    }
  }, [storyData]);

  // Handle rate limit error with a funny message
  const getErrorMessage = () => {
    if (error === "Rate limit reached. Please try again later.") {
      return (
        <VStack spacing={4} align="center">
          <Text fontSize="xl" fontWeight="bold" textAlign="center">
            🚀 Woah there, speed racer! 🚀
          </Text>
          <Text fontSize="lg" textAlign="center">
            You&apos;re generating stories faster than a caffeinated writer!
            🖋️☕
          </Text>
          <Text fontSize="md" textAlign="center">
            Take a breather and try again in a few minutes. ⏳
          </Text>
          <Image
            src="https://media.giphy.com/media/l0HlTy9x8FZo0XO1i/giphy.gif" // Funny GIF
            alt="Funny GIF"
            boxSize="200px"
            borderRadius="md"
          />
          <Text fontSize="sm" textAlign="center" color="gray.500">
            In the meantime, why not enjoy this dancing cat? 🐱💃
          </Text>
        </VStack>
      );
    } else if (error) {
      return (
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          {error}
        </Alert>
      );
    }
    return null;
  };

  // Upload image to ImgBB
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

  // Handle story download
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

  // Handle story sharing
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
          telegram: `https://t.me/share/url?url=${uploadedImageUrl}&text=${encodeURIComponent(
            "Check out my Emoji Story! ✨ " + storyTitle
          )}`,
          instagram: `https://www.instagram.com/?url=${uploadedImageUrl}`,
        };

        window.open(platformUrls[platform], "_blank");
      }, 0);
    }
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
        {loading ? (
          <VStack spacing={4}>
            <Spinner size="lg" />
            <Text fontSize="lg" fontWeight="medium" textAlign="center">
              Crafting your story... ✨
            </Text>
            <Image
              src="https://media.giphy.com/media/l0HlTy9x8FZo0XO1i/giphy.gif" // Funny GIF
              alt="Loading GIF"
              boxSize="150px"
              borderRadius="md"
            />
          </VStack>
        ) : error ? (
          getErrorMessage() // Display funny error message
        ) : !isStoryGenerated ? (
          <VStack spacing={4}>
            <Text
              fontSize="lg"
              fontWeight="medium"
              color={colorMode === "dark" ? "whitesmoke" : "blackAlpha.900"}
              textAlign="center"
            >
              {storyBody}
            </Text>
            <Image
              https:boxSize="200px" //media.giphy.com/media/3o7aTskHEUdgCQAXde/giphy.gif              alt="Welcome GIF"
              borderRadius="md"
            />
          </VStack>
        ) : (
          <Text
            fontSize="lg"
            fontWeight="medium"
            color={colorMode === "dark" ? "whitesmoke" : "blackAlpha.900"}
            textAlign="center"
          >
            {storyBody}
          </Text>
        )}
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
                leftIcon={<FaTwitter />}
                onClick={() => handleShare("twitter")}
              >
                Share on Twitter
              </Button>
              <Button
                leftIcon={<FaLinkedinIn />}
                onClick={() => handleShare("linkedin")}
              >
                Share on LinkedIn
              </Button>{" "}
              <Button
                leftIcon={<FaTelegramPlane />}
                onClick={() => handleShare("telegram")}
              >
                Share on Telegram
              </Button>{" "}
              <Button
                leftIcon={<FaInstagram />}
                onClick={() => handleShare("instagram")}
              >
                Share on Instagram
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

EmojiStory.propTypes = {
  storyData: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default EmojiStory;
