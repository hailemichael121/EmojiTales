import { useRef } from "react";
import { Box } from "@chakra-ui/react";
import Header from "./components/Header";
import HeroImage from "./components/HeroImage";
import EmojiInputBoard from "./components/EmojiInputBoard";
import pixelBg from "/pixelBg.png"; // Import the image
import Footer from "./components/Footer";

function App() {
  const emojiInputBoardRef = useRef(null);

  const scrollToEmojiInputBoard = () => {
    emojiInputBoardRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Box
        minH="100vh" // Full viewport height
        bgImage={`url(${pixelBg})`} // Use the imported image
        bgSize="20px 20px" // Size of the pixelated pattern
        bgRepeat="repeat" // Repeat the pattern
      >
        <Header />
        <HeroImage scrollToEmojiInputBoard={scrollToEmojiInputBoard} />
        <Box ref={emojiInputBoardRef}>
          <EmojiInputBoard />
        </Box>
        <Footer />
      </Box>
    </>
  );
}

export default App;
