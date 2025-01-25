import { Box } from "@chakra-ui/react";
import Header from "./components/Header";
import HeroImage from "./components/HeroImage";
import EmotifyBorad from "./components/EmotifyBorad";

function App() {
  return (
    <>
      <Box>
        <Header />
        <HeroImage />
        <EmotifyBorad />
      </Box>
    </>
  );
}

export default App;
