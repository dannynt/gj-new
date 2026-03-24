import {
  Box,
  Text,
  VStack,
  HStack,
  Link,
  Icon,
  Image,
  Flex,
  Heading,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaFacebook, FaYoutube, FaInstagram, FaEnvelope, FaDiscord } from 'react-icons/fa'

const MotionBox = motion(Box)

const socialLinks = [
  { icon: FaFacebook, href: 'https://www.facebook.com/cgvrlab', label: 'Facebook', color: '#4267B2' },
  { icon: FaInstagram, href: 'https://www.instagram.com/cgvrlab/', label: 'Instagram', color: '#E4405F' },
  { icon: FaYoutube, href: 'https://www.youtube.com/@cgvrlab', label: 'YouTube', color: '#FF0000' },
  { icon: FaEnvelope, href: 'mailto:gamejams.cs@ut.ee', label: 'Email', color: '#71BDFF' },
  { icon: FaDiscord, href: 'https://discord.com/invite/Z8Hzm6s9A7', label: 'Discord', color: '#5865F2' },
]

const partners = [
  { src: '/cgvr.svg', href: 'https://cgvr.cs.ut.ee', alt: 'CGVR Lab' },
  { src: '/ati.svg', href: 'https://cs.ut.ee', alt: 'Arvutiteaduse instituut' },
]

function SocialButton({ social, index }: { social: typeof socialLinks[0]; index: number }) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.05 }}
    >
      <Link href={social.href} isExternal aria-label={social.label}>
        <Flex
          bg="rgba(10, 10, 10, 0.9)"
          w={{ base: 12, md: 14 }}
          h={{ base: 12, md: 14 }}
          borderRadius="md"
          border="2px solid"
          borderColor="#71BDFF20"
          align="center"
          justify="center"
          _hover={{
            borderColor: `${social.color}60`,
            bg: `${social.color}10`,
            '& svg': { color: social.color },
          }}
          transition="all 0.3s"
        >
          <Icon as={social.icon} boxSize={{ base: 5, md: 6 }} color="#71BDFF80" transition="color 0.3s" />
        </Flex>
      </Link>
    </MotionBox>
  )
}

function PartnerLogo({ src, href, alt, delay }: { src: string; href: string; alt: string; delay: number }) {
  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
    >
      <Link href={href} isExternal>
        <Image
          src={src}
          alt={alt}
          h={{ base: '40px', md: '50px' }}
          w="auto"
          opacity={1}
          _hover={{ opacity: 0.9 }}
          transition="opacity 0.3s"
        />
      </Link>
    </MotionBox>
  )
}

export default function Footer() {
  return (
    <MotionBox
      id="footer"
      scrollMarginTop="80px"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      w="full"
      py={{ base: 12, md: 20 }}
      position="relative"
      zIndex={1}
    >
      <VStack spacing={{ base: 10, md: 14 }}>

        {/* ─── CONTACT CARD ─── */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          w="full"
        >
          <Box
            bg="rgba(10, 10, 10, 0.92)"
            border="2px solid"
            borderColor="#71BDFF20"
            borderRadius="md"
            p={{ base: 8, md: 10 }}
            textAlign="center"
          >
            <Heading
              fontSize={{ base: 'lg', md: 'xl' }}
              color="white"
              fontFamily="'Fredoka One', cursive"
              mb={3}
            >
              KÜSIMUSED?
            </Heading>
            <Text color="#888" fontSize="sm" mb={6}>
              Võta meiega ühendust või liitu meie Discordi kogukonnaga!
            </Text>

            <HStack justify="center" spacing={5} mb={8}>
              {socialLinks.filter(s => s.label !== 'Discord').map((social, index) => (
                <SocialButton key={social.label} social={social} index={index} />
              ))}
            </HStack>

             <HStack
              spacing={3}
              bg="rgba(113, 189, 255, 0.06)"
              px={6}
              py={3}
              borderRadius="md"
              border="1px solid"
              borderColor="#71BDFF20"
              display="inline-flex"
              mb={6}
            >
              <Icon as={FaEnvelope} color="#71BDFF70" boxSize={4} />
              <Link
                href="mailto:gamejams.cs@ut.ee"
                color="#71BDFF"
                fontWeight="medium"
                fontSize="sm"
                _hover={{ color: 'white', textDecoration: 'none' }}
                transition="color 0.2s"
              >
                gamejams.cs@ut.ee
              </Link>
            </HStack>

            {/* Discord invitation card */}
            <Flex
              as="a"
              href="https://discord.com/invite/Z8Hzm6s9A7"
              target="_blank"
              rel="noopener noreferrer"
              align="center"
              justify="center"
              direction={{ base: 'column', md: 'row' }}
              gap={3}
              bg="rgba(88, 101, 242, 0.10)"
              border="2px solid"
              borderColor="#5865F2"
              borderRadius="md"
              px={{ base: 4, md: 8 }}
              py={{ base: 4, md: 5 }}
              _hover={{ bg: 'rgba(88, 101, 242, 0.18)', borderColor: '#5865F2' }}
              transition="all 0.2s"
              boxShadow="0 2px 16px rgba(88,101,242,0.08)"
            >
              <Icon as={FaDiscord} color="#5865F2" boxSize={8} />
              <Box textAlign={{ base: 'center', md: 'left' }}>
                <Text color="#5865F2" fontWeight="bold" fontSize={{ base: 'md', md: 'lg' }} fontFamily="'Fredoka One', cursive">
                  Liitu TÜ Mängujämmi Discordiga!
                </Text>
                <Text color="#5865F2" fontSize="sm" mt={1}>
                  Küsi nõu, leia tiimikaaslasi, saa osa mänguarenduse kogukonnast ja saa esimesena teada uutest üritustest.
                </Text>
              </Box>
            </Flex>

           
          </Box>
        </MotionBox>

        {/* ─── PARTNERS ─── */}
        <VStack spacing={4}>
          <Text
            fontSize="xs"
            color="#555"
            textTransform="uppercase"
            letterSpacing="widest"
            fontFamily="'Fredoka One', cursive"
            mb={6}
          >
            Korraldajad
          </Text>
          <Flex
            justify="center"
            gap={{ base: 12, md: 24 }}
            py={2}
            flexWrap="wrap"
          >
            {partners.map((p, i) => (
              <PartnerLogo key={p.alt} src={p.src} href={p.href} alt={p.alt} delay={0.1 + i * 0.1} />
            ))}
          </Flex>
        </VStack>

        {/* ─── BOTTOM LINE ─── */}
        <VStack spacing={3}>
          <Box w="200px" h="1px" bg="#71BDFF15" />
          <Text color="#333" fontSize="xs" letterSpacing="wider">
            © 2026 TÜ Mängujämm
          </Text>
        </VStack>
      </VStack>
    </MotionBox>
  )
}
