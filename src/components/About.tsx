import { useState, useCallback } from 'react'
import {
  Box,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Icon,
  HStack,
  Badge,
  Flex,
  Image,
} from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaLightbulb,
  FaLaptopCode,
  FaPalette,
  FaMusic,
  FaUsers,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa'

const MotionBox = motion(Box)

const galleryImages = [
  '/img/img1.jpg',
  '/img/img2.jpg',
  '/img/img3.jpg',
  '/img/img4.jpg',
  '/img/img5.jpg',
  '/img/img10.jpg',
  '/img/img11.jpg',
  '/img/img12.jpg',
  '/img/img14.png',
  '/img/img15.png',
  '/img/img18.png',
  '/img/img14.jpg',
]

const roles = [
  { icon: FaLaptopCode, title: 'Programmeerijad', desc: 'Loo mängu loogika ja tee oma ideed elavaks.' },
  { icon: FaPalette, title: 'Kunstnikud', desc: 'Disaini tegelased, maailmad ja visuaalid.' },
  { icon: FaMusic, title: 'Helidisainerid', desc: 'Loo muusikat ja heliefekte.' },
  { icon: FaUsers, title: 'Disainerid', desc: 'Kujunda mängumehaanikaid ja kasutajakogemust.' },
]

function RoleCard({ role, index }: { role: typeof roles[0]; index: number }) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Box
        bg="rgba(10, 10, 10, 0.9)"
        border="2px solid"
        borderColor="#71BDFF25"
        borderRadius="md"
        p={{ base: 5, md: 6 }}
        h="full"
        _hover={{ borderColor: '#71BDFF70', transform: 'translateY(-4px)' }}
        transition="all 0.3s"
        position="relative"
        overflow="hidden"
      >
        {/* accent top line */}
        <Box position="absolute" top={0} left={0} right={0} h="3px" bg="#71BDFF" opacity={0.4} />
        <VStack spacing={4} align="start">
          <Flex
            w={12}
            h={12}
            borderRadius="md"
            bg="rgba(113, 189, 255, 0.08)"
            border="2px solid"
            borderColor="#71BDFF30"
            align="center"
            justify="center"
          >
            <Icon as={role.icon} color="#71BDFF" boxSize={6} />
          </Flex>
          <Text fontFamily="'Fredoka One', cursive" color="white" fontSize={{ base: 'md', md: 'lg' }}>
            {role.title}
          </Text>
          <Text fontSize="sm" color="#999" lineHeight="1.7">
            {role.desc}
          </Text>
        </VStack>
      </Box>
    </MotionBox>
  )
}

export default function About() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  const closeLightbox = useCallback(() => setLightboxIdx(null), [])
  const goPrev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setLightboxIdx((i) => (i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null))
  }, [])
  const goNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setLightboxIdx((i) => (i !== null ? (i + 1) % galleryImages.length : null))
  }, [])

  return (
    <MotionBox
      id="about"
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
      {/* ─── LIGHTBOX OVERLAY ─── */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="rgba(0, 0, 0, 0.92)"
            zIndex={9999}
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            onClick={closeLightbox}
            p={{ base: 4, md: 10 }}
          >
            {/* close button */}
            <Flex
              position="absolute"
              top={4}
              right={4}
              w={10}
              h={10}
              borderRadius="md"
              bg="rgba(255,255,255,0.1)"
              border="1px solid"
              borderColor="rgba(255,255,255,0.2)"
              align="center"
              justify="center"
              _hover={{ bg: 'rgba(255,255,255,0.25)' }}
              transition="all 0.2s"
              zIndex={10000}
              cursor="pointer"
            >
              <Icon as={FaTimes} color="white" boxSize={5} />
            </Flex>

            {/* prev arrow */}
            <Flex
              position="absolute"
              left={{ base: 2, md: 6 }}
              top="50%"
              transform="translateY(-50%)"
              w={{ base: 10, md: 12 }}
              h={{ base: 10, md: 12 }}
              borderRadius="full"
              bg="rgba(255,255,255,0.1)"
              border="1px solid"
              borderColor="rgba(255,255,255,0.2)"
              align="center"
              justify="center"
              _hover={{ bg: 'rgba(255,255,255,0.25)' }}
              transition="all 0.2s"
              cursor="pointer"
              onClick={goPrev}
              zIndex={10000}
            >
              <Icon as={FaChevronLeft} color="white" boxSize={{ base: 4, md: 5 }} />
            </Flex>

            {/* next arrow */}
            <Flex
              position="absolute"
              right={{ base: 2, md: 6 }}
              top="50%"
              transform="translateY(-50%)"
              w={{ base: 10, md: 12 }}
              h={{ base: 10, md: 12 }}
              borderRadius="full"
              bg="rgba(255,255,255,0.1)"
              border="1px solid"
              borderColor="rgba(255,255,255,0.2)"
              align="center"
              justify="center"
              _hover={{ bg: 'rgba(255,255,255,0.25)' }}
              transition="all 0.2s"
              cursor="pointer"
              onClick={goNext}
              zIndex={10000}
            >
              <Icon as={FaChevronRight} color="white" boxSize={{ base: 4, md: 5 }} />
            </Flex>

            {/* image counter */}
            <Text
              position="absolute"
              bottom={4}
              left="50%"
              transform="translateX(-50%)"
              color="#888"
              fontSize="sm"
              fontFamily="'Fredoka One', cursive"
              zIndex={10000}
            >
              {lightboxIdx + 1} / {galleryImages.length}
            </Text>

            <MotionBox
              key={lightboxIdx}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2 }}
              maxW="88vw"
              maxH="82vh"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              cursor="default"
            >
              <Image
                src={galleryImages[lightboxIdx]}
                alt="Game Jam"
                maxW="88vw"
                maxH="82vh"
                objectFit="contain"
                borderRadius="md"
                border="2px solid"
                borderColor="#71BDFF30"
              />
            </MotionBox>
          </MotionBox>
        )}
      </AnimatePresence>

      <VStack spacing={{ base: 12, md: 16 }}>

        {/* ─── HERO INTRO CARD ─── */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          w="full"
        >
          <Box
            bg="rgba(10, 10, 10, 0.92)"
            border="2px solid"
            borderColor="#71BDFF25"
            borderRadius="md"
            p={{ base: 8, md: 12 }}
            position="relative"
            overflow="hidden"
          >
            {/* decorative side accent */}
            <Box
              position="absolute"
              left={0}
              top={0}
              bottom={0}
              w="4px"
              bg="#71BDFF"
              opacity={0.5}
            />

            <VStack spacing={6} align="start">
              <HStack spacing={3}>
                <Flex
                  w={10}
                  h={10}
                  borderRadius="md"
                  bg="rgba(113, 189, 255, 0.1)"
                  align="center"
                  justify="center"
                >
                  <Icon as={FaLightbulb} boxSize={5} color="#71BDFF" />
                </Flex>
                <Heading
                  fontSize={{ base: 'xl', md: '2xl' }}
                  color="white"
                  fontFamily="'Fredoka One', cursive"
                >
                  MIS ON <Text as="span" color="#71BDFF">MÄNGUJÄMM?</Text>
                </Heading>
              </HStack>

              <Text
                fontSize={{ base: 'md', md: 'lg' }}
                color="#cccccc"
                lineHeight="1.9"
              >
                Mängujämm on tavaliselt{' '}
                <Text as="span" color="#71BDFF" fontWeight="bold">2–3-päevane üritus</Text>,
                {' '}kus leiad huvitavaid inimesi ja lood nendega koos väikese mängu.
                Enamasti pole sul eelnevalt plaani ega tiimi – ürituse alguses antakse teema,
                mille põhjal hakkad oma mängu looma. See tähendab, et satud{' '}
                <Text as="span" color="#71BDFF" fontWeight="bold">täiesti uude olukorda</Text>:
                {' '}ajurünnakud mänguideede üle, enda oskuste hindamine, uute asjade õppimine
                ja uute inimestega tutvumine. Lõpuks on sul valmis väike mäng, mida sa enne
                jämmi poleks arvanudki, et suudad teha. See on{' '}
                <Text as="span" color="#71BDFF" fontWeight="bold">hariv, inspireeriv ja jõustav kogemus</Text>.
              </Text>

              <Text
                fontSize={{ base: 'md', md: 'lg' }}
                color="#cccccc"
                lineHeight="1.9"
              >
                Tartu Ülikooli arvutiteaduse instituudi arvutigraafika ja virtuaalreaalsuse õppelabor korraldab{' '}
                <Text as="span" color="#71BDFF" fontWeight="bold">kolm mängujämmi aastas</Text>.
                {' '}Kaks neist on õppejämmid, mis toimuvad aprillis ja oktoobris globaalse
                Ludum Dare mängujämmi raames – need on suunatud kooliõpilastele ning algajatele mänguarendajatele. Kolmas on profijämm, mis toimub
                jaanuaris ja on mõeldud kogenud mängutegijatele.
              </Text>

            </VStack>
          </Box>
        </MotionBox>


        {/* ─── PHOTO GALLERY ─── */}
        <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} spacing={4} w="full">
          {galleryImages.map((src, i) => (
            <MotionBox
              key={src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ scale: 1.04, y: -4 }}
              cursor="pointer"
              onClick={() => setLightboxIdx(i)}
            >
              <Box
                overflow="hidden"
                borderRadius="md"
                border="2px solid"
                borderColor="#71BDFF18"
                _hover={{ borderColor: '#71BDFF60', boxShadow: '0 8px 30px rgba(113,189,255,0.12)' }}
                transition="all 0.3s"
              >
                <Image
                  src={src}
                  alt="Game Jam"
                  w="full"
                  h={{ base: '160px', md: '210px' }}
                  objectFit="cover"
                  loading="lazy"
                  transition="transform 0.4s"
                  _hover={{ transform: 'scale(1.05)' }}
                />
              </Box>
            </MotionBox>
          ))}
        </SimpleGrid>

        {/* ─── ROLES SECTION ─── */}
        <VStack spacing={{ base: 6, md: 8 }} w="full">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <VStack spacing={2}>
              <Heading
                fontSize={{ base: 'xl', md: '2xl' }}
                color="white"
                fontFamily="'Fredoka One', cursive"
                textAlign="center"
              >
                MÄNGUJÄMMIL ON <Text as="span" color="#71BDFF">ROLL KÕIGILE</Text>
              </Heading>
              <Text color="#666" fontSize="sm" textAlign="center">
                Vali endale sobiv roll ja aita tiimi
              </Text>
            </VStack>
          </MotionBox>

          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4} w="full">
            {roles.map((r, i) => (
              <RoleCard key={r.title} role={r} index={i} />
            ))}
          </SimpleGrid>
        </VStack>

        {/* ─── WELCOME BADGE ─── */}
        <MotionBox
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Badge
            bg="rgba(113, 189, 255, 0.08)"
            color="#71BDFF"
            px={6}
            py={3}
            borderRadius="md"
            fontFamily="'Fredoka One', cursive"
            fontSize={{ base: 'xs', md: 'sm' }}
            letterSpacing="wider"
            border="2px solid"
            borderColor="#71BDFF30"
          >
            KOGEMUST POLE VAJA! ALGAJAD ON TERETULNUD!
          </Badge>
        </MotionBox>
      </VStack>
    </MotionBox>
  )
}
