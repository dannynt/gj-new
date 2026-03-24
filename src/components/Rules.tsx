import {
  Box,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Icon,
  HStack,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import {
  FaUsers,
  FaRocket,
  FaPalette,
  FaBoxOpen,
  FaRobot,
  FaScroll,
  FaLaptopCode,
  FaClock,
  FaBan,
} from 'react-icons/fa'

const MotionBox = motion(Box)

const rules = [
  {
    icon: FaUsers,
    emoji: '🎮',
    title: 'Tiimi suurus',
    desc: '2–6 inimest meeskonna kohta (2/3 tiimist peavad olema algajad)',
  },
  {
    icon: FaRocket,
    emoji: '🚀',
    title: 'Arenduse algus',
    desc: 'Mäng tuleb luua täielikult ürituse jooksul; eelnevalt alustatud projekte ei lubata.',
  },
  {
    icon: FaPalette,
    emoji: '🎨',
    title: 'Teema',
    desc: 'Mängu loomisel tuleb lähtuda jämmi (Ludum Dare) teemast.',
  },
  {
    icon: FaBoxOpen,
    emoji: '🛠',
    title: 'Varade kasutamine',
    desc: 'Eelvalmistatud varade kasutamine on lubatud, aga need peavad olema kättesaadavad kõigile osalejatele.',
  },
  {
    icon: FaRobot,
    emoji: '🤖',
    title: 'Tehisintellekti kasutamine',
    desc: 'AI kasutamine on lubatud – see toetab loovust ja uuenduslikkust.',
  },
  {
    icon: FaScroll,
    emoji: '📜',
    title: 'Autorikaitse',
    desc: 'Veendu, et kõik kasutatud varad vastavad litsentsidele ja lubadele.',
  },
  {
    icon: FaLaptopCode,
    emoji: '💻',
    title: 'Tehnoloogia',
    desc: 'Kõik mängumootorid ja platvormid on lubatud – näita oma tugevusi!',
  },
  {
    icon: FaClock,
    emoji: '⏰',
    title: 'Tähtajad',
    desc: 'Tähtaegu tuleb rangelt järgida; hilinenud esitusi ei pruugi hinnata.',
  },
  {
    icon: FaBan,
    emoji: '❌',
    title: 'Ei liigsele vägivallale',
    desc: 'Mängud peavad olema lõbusad ja kõigile sobivad. 🙂',
  },
]

function RuleCard({ rule, index }: { rule: typeof rules[number]; index: number }) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <HStack
        spacing={4}
        bg="rgba(10, 10, 10, 0.9)"
        border="2px solid"
        borderColor="#A9C8E640"
        borderRadius="md"
        p={4}
        align="start"
        h="full"
        _hover={{
          borderColor: '#A9C8E670',
          bg: 'rgba(20, 20, 20, 0.95)',
        }}
        transition="all 0.25s"
      >
        <Box
          w={10}
          h={10}
          borderRadius="md"
          bg="#A9C8E612"
          border="1px solid"
          borderColor="#A9C8E630"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
        >
          <Icon as={rule.icon} boxSize={5} color="#A9C8E6" />
        </Box>
        <Box flex={1} minW={0}>
          <Text
            fontSize="sm"
            fontFamily="'Fredoka One', cursive"
            color="white"
            mb={1}
          >
            {rule.title}
          </Text>
          <Text fontSize="sm" color="#aaaaaa" lineHeight="tall">
            {rule.desc}
          </Text>
        </Box>
      </HStack>
    </MotionBox>
  )
}

export default function Rules() {
  return (
    <MotionBox
      id="rules"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      w="full"
      position="relative"
      zIndex={1}
      py={{ base: 8, md: 16 }}
    >
      <VStack spacing={{ base: 6, md: 10 }}>
        {/* header */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          textAlign="center"
        >
          <HStack justify="center" spacing={4} mb={3}>
            <Box flex={1} maxW="80px" h="2px" bg="#A9C8E640" />
            <Icon as={FaScroll} boxSize={5} color="#A9C8E6" />
            <Box flex={1} maxW="80px" h="2px" bg="#A9C8E640" />
          </HStack>
          <Heading
            fontSize={{ base: '2xl', md: '3xl' }}
            color="white"
            fontFamily="'Fredoka One', cursive"
            mb={2}
          >
            <Text as="span" color="#A9C8E6">REEG</Text>LID
          </Heading>
        </MotionBox>

        {/* rules grid */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
          {rules.map((r, i) => (
            <RuleCard key={r.title} rule={r} index={i} />
          ))}
        </SimpleGrid>
      </VStack>
    </MotionBox>
  )
}
