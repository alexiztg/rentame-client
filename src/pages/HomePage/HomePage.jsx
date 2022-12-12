import "./HomePage.css";
import { Box } from "@chakra-ui/react";

function HomePage() {
  return (
    <div>
      <Box
  w='100%'
  h='200px'
  bgGradient={[
    'linear(to-tr, teal.300, yellow.400)',
    'linear(to-t, blue.200, teal.500)',
    'linear(to-b, orange.100, purple.300)',
  ]}
/>
    </div>
  );
}

export default HomePage;
