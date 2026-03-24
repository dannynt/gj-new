import { Box, Container, VStack } from "@chakra-ui/react";
import Hero from "./components/Hero";
import About from "./components/About";
import Schedule from "./components/Schedule";
import PastJams from "./components/PastJams";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Box position="relative" overflow="hidden" bg="jam.dark" minH="100vh">
      <Navbar />
      {/* Hero */}
      <Container maxW="container.lg" px={{ base: 4, md: 6 }}>
        <Hero />
      </Container>
      {/* Content sections */}
      <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
        <VStack spacing={0}>
          <About />
          <Schedule />
          <PastJams />
        </VStack>
      </Container>
      <Container maxW="container.lg" px={{ base: 4, md: 6 }}>
        <Footer />
      </Container>
    </Box>
  );
}

export default App;
