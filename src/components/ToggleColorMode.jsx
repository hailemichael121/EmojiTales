import { Button, useColorMode } from "@chakra-ui/react";
import { FaLightbulb, FaMoon } from "react-icons/fa";

function ToggleColorMode() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode} size={"xs"}>
      {colorMode === "light" ? <FaMoon /> : <FaLightbulb />}
    </Button>
  );
}

export default ToggleColorMode;
