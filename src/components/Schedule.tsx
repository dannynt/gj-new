import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Flex,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import {
  FaCalendarAlt,
  FaRocket,
  FaUsers,
  FaGamepad,
  FaPaperPlane,
  FaVoteYea,
  FaChalkboardTeacher,
  FaTrophy,
} from 'react-icons/fa'

const MotionBox = motion(Box)

interface ScheduleEvent {
  time: string
  title: string
  icon: React.ElementType
}

interface DaySchedule {
  date: string
  day: string
  color: string
  events: ScheduleEvent[]
}

const schedule: DaySchedule[] = [
  {
    date: '17. aprill',
    day: 'Reede',
    color: '#A9C8E6',
    events: [
      { time: '19:00', title: 'Avatseremoonia', icon: FaRocket },
      { time: '23:59', title: 'Tiimide registreerimise tähtaeg', icon: FaUsers },
    ],
  },
  {
    date: '18. aprill',
    day: 'Laupäev',
    color: '#DB551C',
    events: [
      { time: '04:00', title: 'Teema avalikustamine', icon: FaRocket },
      { time: 'TERVE PÄEV', title: 'Mänguarendus täies hoos 🎨👾', icon: FaGamepad },
    ],
  },
  {
    date: '19. aprill',
    day: 'Pühapäev',
    color: '#B4C867',
    events: [
      { time: '16:00', title: 'Mängude esitamise tähtaeg', icon: FaPaperPlane },
      { time: '16:00 - 18:00', title: 'Hääletamine', icon: FaVoteYea },
      { time: '18:30', title: 'Mängude esitlused', icon: FaChalkboardTeacher },
      { time: '20:00', title: 'Auhinnatseremoonia', icon: FaTrophy },
    ],
  },
]

/* ─── Day column component ─── */
function DayColumn({ day, index }: { day: DaySchedule; index: number }) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      flex={1}
      minW={0}
    >
      <Box
        bg="rgba(10, 10, 10, 0.92)"
        border="2px solid"
        borderColor={`${day.color}20`}
        borderRadius="md"
        overflow="hidden"
        h="full"
        display="flex"
        flexDirection="column"
        _hover={{ borderColor: `${day.color}50` }}
        transition="all 0.3s"
      >
        {/* Day header */}
        <Box
          bg={`${day.color}10`}
          borderBottom="2px solid"
          borderColor={`${day.color}25`}
          px={{ base: 4, md: 5 }}
          py={{ base: 4, md: 5 }}
        >
          <Text
            fontSize="xs"
            color={day.color}
            fontFamily="'Fredoka One', cursive"
            textTransform="uppercase"
            letterSpacing="widest"
            mb={1}
          >
            {day.day}
          </Text>
          <Text
            fontSize={{ base: 'lg', md: 'xl' }}
            color="white"
            fontFamily="'Fredoka One', cursive"
          >
            {day.date}
          </Text>
        </Box>

        {/* Events */}
        <VStack spacing={0} align="stretch" flex={1}>
          {day.events.map((event, ei) => (
            <MotionBox
              key={event.title}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.15 + ei * 0.08 }}
            >
              <Flex
                px={{ base: 4, md: 5 }}
                py={{ base: 3.5, md: 4 }}
                gap={3}
                align="start"
                borderBottom={ei < day.events.length - 1 ? '1px solid' : 'none'}
                borderColor="rgba(255,255,255,0.04)"
                _hover={{ bg: 'rgba(255,255,255,0.02)' }}
                transition="all 0.2s"
              >
                <Flex
                  w={9}
                  h={9}
                  borderRadius="md"
                  bg={`${day.color}10`}
                  border="1px solid"
                  borderColor={`${day.color}25`}
                  align="center"
                  justify="center"
                  flexShrink={0}
                  mt={0.5}
                >
                  <Icon as={event.icon} boxSize={4} color={day.color} />
                </Flex>
                <Box flex={1} minW={0}>
                  <Text
                    fontSize="xs"
                    color={day.color}
                    fontWeight="bold"
                    fontFamily="'Fredoka One', cursive"
                    mb={0.5}
                  >
                    {event.time}
                  </Text>
                  <Text fontSize={{ base: 'sm', md: 'md' }} color="#cccccc" lineHeight="short">
                    {event.title}
                  </Text>
                </Box>
              </Flex>
            </MotionBox>
          ))}
        </VStack>

        {/* Accent bottom line */}
        <Box h="3px" bg={day.color} opacity={0.4} />
      </Box>
    </MotionBox>
  )
}

/* ─── main component ─── */
export default function Schedule() {
  return (
    <MotionBox
      id="schedule"
      scrollMarginTop="80px"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      w="full"
      position="relative"
      zIndex={1}
      py={{ base: 12, md: 20 }}
    >
      <VStack spacing={{ base: 8, md: 12 }}>
        {/* header */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          textAlign="center"
        >
          <HStack justify="center" spacing={4} mb={4}>
            <Box flex={1} maxW="80px" h="2px" bg="#71BDFF30" />
            <Icon as={FaCalendarAlt} boxSize={5} color="#71BDFF" />
            <Box flex={1} maxW="80px" h="2px" bg="#71BDFF30" />
          </HStack>
          <Heading
            fontSize={{ base: '2xl', md: '3xl' }}
            color="white"
            fontFamily="'Fredoka One', cursive"
            mb={2}
          >
            <Text as="span" color="#71BDFF">AJA</Text>KAVA
          </Heading>
          <Text color="#666" fontSize="sm">
            17.–19. aprill 2026
          </Text>
        </MotionBox>

        {/* 3-column day cards */}
        <Flex
          w="full"
          direction={{ base: 'column', md: 'row' }}
          gap={{ base: 4, md: 5 }}
        >
          {schedule.map((d, i) => (
            <DayColumn key={d.day} day={d} index={i} />
          ))}
        </Flex>
      </VStack>
    </MotionBox>
  )
}
