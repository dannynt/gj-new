import { useState, useEffect } from 'react'
import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  Heading,
  Link,
  Flex,
  Image,
} from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGamepad } from 'react-icons/fa'

const MotionBox = motion(Box)
const MotionText = motion(Text)
const MotionHeading = motion(Heading)

const GOOGLE_FORM_URL = 'https://forms.gle/RHBXeyshtYZ1kqTX6'
const TARGET_DATE = new Date('2026-04-17T19:30:00')

const CountdownDigit = ({ value }: { value: string }) => (
  <AnimatePresence mode="popLayout">
    <MotionText
      key={value}
      initial={{ y: -20, opacity: 0, scale: 0.8 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 20, opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
      fontWeight="bold"
      color="white"
      fontFamily="'Fredoka One', cursive"
      lineHeight={1}
    >
      {value}
    </MotionText>
  </AnimatePresence>
)

const CountdownUnit = ({
  value,
  label,
  color = '#A9C8E6',
}: {
  value: number
  label: string
  color?: string
}) => {
  const displayValue = String(value).padStart(2, '0')

  return (
    <VStack spacing={1}>
      <Box
        bg="rgba(10, 10, 10, 0.9)"
        border="2px solid"
        borderColor={`${color}60`}
        borderRadius="md"
        px={{ base: 4, md: 8 }}
        py={{ base: 3, md: 5 }}
        minW={{ base: '70px', md: '110px' }}
      >
        <HStack spacing={0} justify="center">
          <CountdownDigit value={displayValue[0]} />
          <CountdownDigit value={displayValue[1]} />
        </HStack>
      </Box>
      <Text
        fontSize={{ base: '2xs', md: 'xs' }}
        color={`${color}99`}
        fontFamily="'Fredoka One', cursive"
        letterSpacing="widest"
        textTransform="uppercase"
      >
        {label}
      </Text>
    </VStack>
  )
}

const ColonSeparator = () => (
  <MotionBox
    animate={{ opacity: [1, 0.2, 1] }}
    transition={{ duration: 1, repeat: Infinity }}
    pb={{ base: 6, md: 10 }}
  >
    <Text
      fontSize={{ base: '3xl', md: '5xl' }}
      color="#A9C8E640"
      fontFamily="'Fredoka One', cursive"
    >
      :
    </Text>
  </MotionBox>
)

const AnimatedText = ({
  text,
  delay = 0,
  ...props
}: {
  text: string
  delay?: number
  [key: string]: unknown
}) => (
  <Flex justify="center" flexWrap="wrap">
    {text.split('').map((char, i) => (
      <MotionText
        key={i}
        initial={{ opacity: 0, y: 30, rotateX: -90 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{
          duration: 0.4,
          delay: delay + i * 0.03,
          ease: 'easeOut',
        }}
        {...props}
      >
        {char === ' ' ? '\u00A0' : char}
      </MotionText>
    ))}
  </Flex>
)

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = TARGET_DATE.getTime() - now.getTime()
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }
    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <MotionBox
      id="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      w="full"
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      position="relative"
      zIndex={1}
      pt={{ base: 16, md: 16 }}
      py={{ base: 4, md: 0 }}
      textAlign="center"
    >
      {/* Top tagline */}
      

      {/* Logo */}
      <MotionBox
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        my={{ base: 2, md: 4 }}
      >
        <Image
          src="/img/logo.png"
          alt="Game Jam 2026"
          w={{ base: '220px', md: '320px', lg: '380px' }}
          h="auto"

        />
      </MotionBox>
      <VStack spacing={0} mb={{ base: 5, md: 0 }}>
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Text
            fontSize={{ base: 'xs', md: 'sm' }}
            color="#ffffff"
            fontFamily="'Fredoka One', cursive"
            letterSpacing="0.4em"
            textTransform="uppercase"
          >
            TULE JA TEE OMA
          </Text>
        </MotionBox>
        <AnimatedText
          text="ESIMENE MÄNG!"
          delay={0.4}
          fontSize={{ base: 'xl', md: '3xl' }}
          fontFamily="'Fredoka One', cursive"
          color="white"
        />
      </VStack>

      {/* Date & Location strip */}
      <MotionBox
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        w="full"
        maxW="700px"
        mb={{ base: 6, md: 8 }}
      >
        <Box
          bg="rgba(10, 10, 10, 0.9)"
          border="2px solid"
          borderColor="#A9C8E640"
          borderRadius="md"
          px={{ base: 6, md: 12 }}
          py={{ base: 5, md: 6 }}
        >
          <HStack justify="center" spacing={{ base: 4, md: 10 }} flexWrap="wrap">
            <VStack spacing={0}>
              <MotionHeading
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                fontSize={{ base: '2xl', md: '3xl' }}
                color="white"
                fontFamily="'Fredoka One', cursive"
                letterSpacing="wider"
              >
                17 – 19
              </MotionHeading>
              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                color="#A9C8E6"
                fontFamily="'Fredoka One', cursive"
              >
                APRILL
              </Text>
            </VStack>
            <Box
              w="2px"
              h="50px"
              bg="#A9C8E640"
              display={{ base: 'none', md: 'block' }}
            />
            <VStack spacing={0}>
              <Text
                fontSize={{ base: 'sm', md: 'md' }}
                color="white"
                fontWeight="bold"
                fontFamily="'Fredoka One', cursive"
              >
                DELTA ÕPPEHOONES
              </Text>
              <Text fontSize="s" color="white" fontFamily="'Fredoka One', cursive" >
                Narva mnt 18, Tartu
              </Text>
              <Text fontSize="xs" color="#A9C8E680" fontStyle="italic">
                ja võrgupõhiselt
              </Text>
            </VStack>
          </HStack>
        </Box>
      </MotionBox>

      {/* Countdown */}
      <MotionBox
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        mb={{ base: 6, md: 8 }}
      >
        <VStack spacing={4}>
          <Text
            fontSize={{ base: 'xs', md: 'sm' }}
            color="#8B8B8B"
            fontFamily="'Fredoka One', cursive"
            letterSpacing="0.3em"
          >
            ALGUSENI JÄÄNUD
          </Text>
          <Flex
            gap={{ base: 1, md: 4 }}
            align="flex-start"
            justify="center"
            flexWrap="wrap"
          >
            <CountdownUnit value={timeLeft.days} label="päeva" />
            <ColonSeparator />
            <CountdownUnit value={timeLeft.hours} label="tundi" />
            <ColonSeparator />
            <CountdownUnit value={timeLeft.minutes} label="minutit" />
            <ColonSeparator />
            <CountdownUnit value={timeLeft.seconds} label="sekundit" />
          </Flex>
        </VStack>
      </MotionBox>

      {/* CTA */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        mb={{ base: 8, md: 12 }}
      >
        <Button
          as={Link}
          href={GOOGLE_FORM_URL}
          isExternal
          size="lg"
          bg="transparent"
          color="#DB551C"
          fontFamily="'Fredoka One', cursive"
          fontSize={{ base: 'md', md: 'lg' }}
          px={{ base: 8, md: 12 }}
          py={7}
          border="2px solid #DB551C"
          borderRadius="md"
          position="relative"
          overflow="hidden"
          _hover={{
            bg: '#DB551C',
            color: 'white',
            textDecoration: 'none',
            transform: 'translateY(-2px)',
          }}
          _active={{ transform: 'translateY(-1px)' }}
          transition="all 0.3s"
          leftIcon={<FaGamepad />}
        >
          REGISTREERU
        </Button>
      </MotionBox>
    </MotionBox>
  )
}
