import { useState } from 'react'
import {
  Box,
  Heading,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaPaperPlane, FaCheckCircle } from 'react-icons/fa'

const MotionBox = motion(Box)

// Styled box matching poster design
const PosterBox = ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
  <Box
    bg="rgba(10, 10, 10, 0.9)"
    border="3px solid"
    borderColor="#A9C8E6"
    p={6}
    borderRadius="sm"
    {...props}
  >
    {children}
  </Box>
)

interface FormData {
  name: string
  email: string
  experience: string
  role: string
}

const initialFormData: FormData = {
  name: '',
  email: '',
  experience: '',
  role: '',
}

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || ''

export default function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const toast = useToast()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!GOOGLE_SCRIPT_URL) {
      toast({
        title: 'Demo režiim',
        description: 'Registreerimine õnnestus (demo).',
        status: 'success',
        duration: 3000,
      })
      setIsSubmitted(true)
      return
    }

    setIsSubmitting(true)

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, timestamp: new Date().toISOString() }),
      })
      setIsSubmitted(true)
      toast({
        title: 'Registreerimine õnnestus! 🎉',
        status: 'success',
        duration: 3000,
      })
    } catch {
      toast({
        title: 'Viga',
        description: 'Proovi uuesti.',
        status: 'error',
        duration: 3000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <MotionBox
        id="register"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        w="full"
        maxW="500px"
        mx="auto"
        zIndex={1}
      >
        <PosterBox textAlign="center">
          <VStack spacing={4}>
            <FaCheckCircle size={40} color="#A9C8E6" />
            <Heading fontSize="xl" color="#A9C8E6" fontFamily="'Fredoka One', cursive">
              OLED REGISTREERITUD! 🎮
            </Heading>
            <Text color="white">
              Kontrollime sinu e-posti: <Text as="span" color="#A9C8E6">{formData.email}</Text>
            </Text>
            <Text color="#8B8B8B" fontSize="sm">
              Näeme 17. aprillil!
            </Text>
          </VStack>
        </PosterBox>
      </MotionBox>
    )
  }

  return (
    <MotionBox
      id="register"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      w="full"
      maxW="500px"
      mx="auto"
      zIndex={1}
    >
      <PosterBox>
        <VStack spacing={5} align="stretch">
          <Heading
            fontSize="xl"
            color="#A9C8E6"
            textAlign="center"
            fontFamily="'Fredoka One', cursive"
          >
            REGISTREERU
          </Heading>

          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
                <FormControl isRequired>
                  <FormLabel color="#A9C8E6" fontSize="sm" fontWeight="bold">
                    Nimi
                  </FormLabel>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Sinu nimi"
                    bg="rgba(0,0,0,0.3)"
                    border="2px solid"
                    borderColor="#A9C8E6"
                    _focus={{ borderColor: '#DB551C' }}
                    _placeholder={{ color: '#8B8B8B' }}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel color="#A9C8E6" fontSize="sm" fontWeight="bold">
                    E-post
                  </FormLabel>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="sina@example.com"
                    bg="rgba(0,0,0,0.3)"
                    border="2px solid"
                    borderColor="#A9C8E6"
                    _focus={{ borderColor: '#DB551C' }}
                    _placeholder={{ color: '#8B8B8B' }}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel color="#A9C8E6" fontSize="sm" fontWeight="bold">
                    Kogemus
                  </FormLabel>
                  <Select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Vali"
                    bg="rgba(0,0,0,0.3)"
                    border="2px solid"
                    borderColor="#A9C8E6"
                    _focus={{ borderColor: '#DB551C' }}
                  >
                    <option value="beginner">Algaja</option>
                    <option value="some">Natuke</option>
                    <option value="experienced">Kogenud</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel color="#A9C8E6" fontSize="sm" fontWeight="bold">
                    Roll
                  </FormLabel>
                  <Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="Vali"
                    bg="rgba(0,0,0,0.3)"
                    border="2px solid"
                    borderColor="#A9C8E6"
                    _focus={{ borderColor: '#DB551C' }}
                  >
                    <option value="programmer">Programmeerija</option>
                    <option value="artist">Kunstnik</option>
                    <option value="audio">Helidisainer</option>
                    <option value="gamedesigner">Disainer</option>
                  </Select>
                </FormControl>
              </SimpleGrid>

              <Button
                type="submit"
                w="full"
                bg="#A9C8E6"
                color="#0A0A0A"
                fontFamily="'Fredoka One', cursive"
                fontSize="lg"
                py={6}
                border="3px solid #A9C8E6"
                _hover={{
                  bg: 'transparent',
                  color: '#A9C8E6',
                }}
                leftIcon={<FaPaperPlane />}
                isLoading={isSubmitting}
              >
                REGISTREERU
              </Button>
            </VStack>
          </form>
        </VStack>
      </PosterBox>
    </MotionBox>
  )
}
