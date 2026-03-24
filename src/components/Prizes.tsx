import {
  Box,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Icon,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaTrophy, FaMedal, FaStar, FaHeart } from 'react-icons/fa'

const MotionBox = motion(Box)

const prizes = [
  {
    place: '1. KOHT',
    icon: FaTrophy,
    prize: '€500 + Mänguvarustus',
  },
  {
    place: '2. KOHT',
    icon: FaMedal,
    prize: '€300 + Meened',
  },
  {
    place: '3. KOHT',
    icon: FaStar,
    prize: '€150 + Kinkekaart',
  },
  {
    place: 'PUBLIKU LEMMIK',
    icon: FaHeart,
    prize: 'Eriauhinnad',
  },
]

export default function Prizes() {
  return (
    <MotionBox
      id="prizes"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      w="full"
      position="relative"
      zIndex={1}
    >
      <VStack spacing={8}>
        <Heading
          fontSize={{ base: '2xl', md: '4xl' }}
          color="jam.blue"
          textAlign="center"
        >
          AUHINNAD
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} w="full">
          {prizes.map((prize, index) => (
            <MotionBox
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Box
                bg="jam.panel"
                p={6}
                border="2px solid"
                borderColor="jam.blue"
                textAlign="center"
                h="full"
                _hover={{
                  borderColor: 'jam.blueLight',
                  boxShadow: '0 0 20px rgba(92, 225, 230, 0.3)',
                }}
                transition="all 0.3s"
              >
                <Box
                  w="80px"
                  h="80px"
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mx="auto"
                  mb={4}
                  border="2px solid"
                  borderColor="jam.blue"
                  bg="transparent"
                >
                  <Icon as={prize.icon} boxSize={10} color="jam.blue" />
                </Box>
                <Heading fontSize="lg" color="white" mb={3}>
                  {prize.place}
                </Heading>
                <Box
                  bg="jam.blue"
                  py={2}
                  px={4}
                  display="inline-block"
                >
                  <Text
                    color="jam.dark"
                    fontWeight="bold"
                    fontSize="sm"
                  >
                    {prize.prize}
                  </Text>
                </Box>
              </Box>
            </MotionBox>
          ))}
        </SimpleGrid>

        <Box
          bg="jam.panel"
          p={5}
          border="2px solid"
          borderColor="jam.blue"
          textAlign="center"
          maxW="600px"
        >
          <Text fontSize="md" color="white">
            🎉 <Text as="span" color="jam.blue" fontWeight="bold">Kõik osalejad</Text> saavad 
            Mängu-Jamm T-särgi, kleebiseid ja osaleja tunnistuse!
          </Text>
        </Box>
      </VStack>
    </MotionBox>
  )
}
