import { Box } from "@chakra-ui/react";
import Header from "./components/Header";
import HeroImage from "./components/HeroImage";
import EmojiInputBoard from "./components/EmojiInputBoard";
import pixelBg from "./assets/pixelBg.png"; // Import the image

function App() {
  return (
    <>
      <Box
        minH="100vh" // Full viewport height
        bgImage={`url(${pixelBg})`} // Use the imported image
        bgSize="20px 20px" // Size of the pixelated pattern
        bgRepeat="repeat" // Repeat the pattern
      >
        <Header />
        <HeroImage />
        <EmojiInputBoard />
      </Box>
    </>
  );
}

export default App;
