import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Icon,
  HStack,
  Flex,
  Link,
  Image,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaUsers, FaGamepad, FaExternalLinkAlt, FaCalendarAlt } from 'react-icons/fa'

const MotionBox = motion(Box)

interface PastJam {
  title: string
  date: string
  participants: number
  teams: number
  theme: string
  url: string
  image: string
}

const pastJams: PastJam[] = [
  {
    title: 'UT Pro Game Jam 2026',
    date: 'Jaanuar 2026',
    participants: 100,
    teams: 23,
    theme: 'Patterns',
    url: 'https://cgvr.cs.ut.ee/university-of-tartu-pro-game-jam-2026/',
    image: 'https://cgvr.cs.ut.ee/wp-content/uploads/2026/02/DSC4954_0_processed-1024x681.jpg',
  },
  {
    title: 'UT Game Jam 2025',
    date: 'Oktoober 2025',
    participants: 100,
    teams: 26,
    theme: 'Collector',
    url: 'https://cgvr.cs.ut.ee/university-of-tartu-game-jam-2025/',
    image: 'https://cgvr.cs.ut.ee/wp-content/uploads/2025/10/DSC4360_0_processed-1024x681.jpg',
  },
  {
    title: 'TÜ Mängujämm 2025',
    date: 'Aprill 2025',
    participants: 80,
    teams: 19,
    theme: 'Depths',
    url: 'https://cgvr.cs.ut.ee/tartu-ulikooli-mangujamm-2025/',
    image: 'https://cgvr.cs.ut.ee/wp-content/uploads/2025/04/DSC2817_processed-1024x435.png',
  },
  {
    title: 'UT Pro Game Jam 2025',
    date: 'Jaanuar 2025',
    participants: 63,
    teams: 17,
    theme: 'Estonian mythology / Bubble',
    url: 'https://cgvr.cs.ut.ee/ut-pro-game-jam-2025/',
    image: 'https://cgvr.cs.ut.ee/wp-content/uploads/2025/01/DSC2397_processed-1024x681.png',
  },
  {
    title: 'UT Game Jam 2024',
    date: 'Oktoober 2024',
    participants: 83,
    teams: 16,
    theme: 'Ludum Dare 56',
    url: 'https://cgvr.cs.ut.ee/university-of-tartu-game-jam-2024/',
    image: 'https://cgvr.cs.ut.ee/wp-content/uploads/2024/10/DSC1988-1024x681.png',
  },
  {
    title: 'TÜ Mängujämm 2024',
    date: 'Aprill 2024',
    participants: 53,
    teams: 13,
    theme: 'Summoning',
    url: 'https://cgvr.cs.ut.ee/tartu-ulikooli-mangujamm-2024/',
    image: 'https://cgvr.cs.ut.ee/wp-content/uploads/2024/04/DSC1450-1024x681.png',
  },
  {
    title: 'UT Pro Game Jam 2024',
    date: 'Jaanuar 2024',
    participants: 70,
    teams: 16,
    theme: 'Future is Past / Make me laugh',
    url: 'https://cgvr.cs.ut.ee/university-of-tartu-pro-game-jam-2024/',
    image: 'https://cgvr.cs.ut.ee/wp-content/uploads/2024/02/GameJam23_Autumn_DSC1139-1024x683.jpg',
  },
  {
    title: 'UT Game Jam 2023',
    date: 'Oktoober 2023',
    participants: 62,
    teams: 14,
    theme: 'Limited Space',
    url: 'https://cgvr.cs.ut.ee/university-of-tartu-game-jam-2023/',
    image: 'https://cgvr.cs.ut.ee/wp-content/uploads/2023/10/GameJam23_Autumn_DSC1005-1024x683.jpg',
  },
  {
    title: 'TÜ Mängujämm 2023',
    date: 'Aprill 2023',
    participants: 42,
    teams: 12,
    theme: 'Delivery',
    url: 'https://cgvr.cs.ut.ee/tartu-ulikooli-mangujamm-2023/',
    image: 'https://cgvr.cs.ut.ee/wp-content/uploads/2023/05/Mangujamm23_DSC0690-1024x683.jpg',
  },
  {
    title: 'UT Pro Game Jam 2023',
    date: 'Veebruar 2023',
    participants: 63,
    teams: 19,
    theme: 'You must die / Roots',
    url: 'https://cgvr.cs.ut.ee/university-of-tartu-pro-game-jam-2023/',
    image: 'https://cgvr.cs.ut.ee/wp-content/uploads/2023/02/DSC_1259_1-1024x683.jpg',
  },
  {
    title: 'UT Game Jam 2022',
    date: 'Oktoober 2022',
    participants: 50,
    teams: 11,
    theme: 'Every 10 Seconds',
    url: 'https://cgvr.cs.ut.ee/university-of-tartu-game-jam-2022/',
    image: 'https://cgvr.cs.ut.ee/wp-content/uploads/2022/10/featured-1024x683.jpg',
  },
  {
    title: 'TÜ Mängujämm 2022',
    date: 'Aprill 2022',
    participants: 62,
    teams: 14,
    theme: 'Delay the Inevitable',
    url: 'https://cgvr.cs.ut.ee/tartu-ulikooli-mangujamm-2022/',
    image: 'https://cgvr.cs.ut.ee/wp-content/uploads/2022/04/DSC04385-1024x683.jpg',
  },
  {
    title: 'UT Pro Game Jam 2022',
    date: 'Jaanuar 2022',
    participants: 39,
    teams: 11,
    theme: 'Duality / GGJ 2022',
    url: 'https://cgvr.cs.ut.ee/university-of-tartu-pro-game-jam-2022/',
    image: 'https://cgvr.cs.ut.ee/wp-content/uploads/2022/02/progamejam22-1024x682.jpg',
  },
  {
    title: 'UT Game Jam 2021',
    date: 'Oktoober 2021',
    participants: 44,
    teams: 9,
    theme: 'Unstable',
    url: 'https://cgvr.cs.ut.ee/university-of-tartu-game-jam-2021/',
    image: 'https://cgvr.cs.ut.ee/wp-content/uploads/2021/10/gamejam-1024x576.png',
  },
]

const totalTeams = pastJams.reduce((sum, j) => sum + j.teams, 0)

function JamCard({ jam, index }: { jam: PastJam; index: number }) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
    >
      <Link
        href={jam.url}
        isExternal
        _hover={{ textDecoration: 'none' }}
        display="block"
        h="full"
      >
        <Box
          bg="rgba(10, 10, 10, 0.92)"
          border="2px solid"
          borderColor="#71BDFF25"
          borderRadius="md"
          h="full"
          position="relative"
          overflow="hidden"
          _hover={{ borderColor: '#71BDFF70', transform: 'translateY(-4px)' }}
          transition="all 0.3s"
        >
          {/* Card image */}
          <Box position="relative" h="160px" overflow="hidden">
            <Image
              src={jam.image}
              alt={jam.title}
              w="full"
              h="full"
              objectFit="cover"
              loading="lazy"
            />
            <Box
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              h="40px"
              bgGradient="linear(to-t, rgba(10,10,10,0.92), transparent)"
            />
          </Box>

          <Box p={5} pt={3}>

          <Flex justify="space-between" align="flex-start" mb={3}>
            <Box>
              <Heading
                as="h3"
                fontSize={{ base: 'md', md: 'lg' }}
                color="white"
                fontFamily="'Fredoka One', cursive"
                mb={1}
              >
                {jam.title}
              </Heading>
              <HStack spacing={1.5}>
                <Icon as={FaCalendarAlt} color="#999" boxSize={2.5} />
                <Text fontSize="xs" color="#999">
                  {jam.date}
                </Text>
              </HStack>
            </Box>
          </Flex>

          <HStack spacing={4} mb={3}>
            <HStack spacing={1.5}>
              <Flex
                w={6}
                h={6}
                align="center"
                justify="center"
                borderRadius="md"
                bg="rgba(113,189,255,0.08)"
                border="1px solid #71BDFF30"
              >
                <Icon as={FaUsers} color="#71BDFF" boxSize={2.5} />
              </Flex>
              <Text fontSize="xs" color="#ccc">
                {jam.participants}+
              </Text>
            </HStack>
            <HStack spacing={1.5}>
              <Flex
                w={6}
                h={6}
                align="center"
                justify="center"
                borderRadius="md"
                bg="rgba(113,189,255,0.08)"
                border="1px solid #71BDFF30"
              >
                <Icon as={FaGamepad} color="#71BDFF" boxSize={2.5} />
              </Flex>
              <Text fontSize="xs" color="#ccc">
                {jam.teams} tiimi
              </Text>
            </HStack>
          </HStack>

          <Box>
            <Text fontSize="xs" color="#666" textTransform="uppercase" letterSpacing="wider" mb={0.5}>
              Teema
            </Text>
            <Text fontSize="sm" color="#ccc" fontStyle="italic">
              &ldquo;{jam.theme}&rdquo;
            </Text>
          </Box>

          <Icon
            as={FaExternalLinkAlt}
            position="absolute"
            bottom={4}
            right={4}
            color="whiteAlpha.200"
            boxSize={2.5}
          />

          </Box>
        </Box>
      </Link>
    </MotionBox>
  )
}

export default function PastJams() {
  return (
    <Box id="past-jams" w="full" py={{ base: 10, md: 16 }} scrollMarginTop="80px" zIndex={1}>
      {/* Section header */}
      <Flex direction="column" align="center" mb={10}>
        <HStack spacing={3} mb={2}>
          <Box h="2px" w="40px" bg="#71BDFF" borderRadius="full" />
          <Text
            fontSize="sm"
            fontWeight="700"
            textTransform="uppercase"
            letterSpacing="widest"
            color="#71BDFF"
          >
            Meie ajalugu
          </Text>
          <Box h="2px" w="40px" bg="#71BDFF" borderRadius="full" />
        </HStack>
        <Heading
          as="h2"
          fontSize={{ base: '2xl', md: '3xl' }}
          color="white"
          fontFamily="'Fredoka One', cursive"
          textAlign="center"
        >
          SEE POLE MEIE{' '}
          <Box as="span" color="#71BDFF">
            ESIMENE KORD
          </Box>
        </Heading>
        <Text
          fontSize="md"
          color="#ccc"
          textAlign="center"
          maxW="2xl"
          mt={3}
          lineHeight="tall"
        >
          Alates 2020. aastast oleme korraldanud mängujämme, kus loodud enam kui {totalTeams} tiimi.
          Iga jämm toob kokku uusi ning ka vanu mänguarendajaid.
        </Text>

        {/* Summary stats */}
      </Flex>

      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={5}>
        {pastJams.map((jam, i) => (
          <JamCard key={jam.url} jam={jam} index={i} />
        ))}
      </SimpleGrid>
    </Box>
  )
}
