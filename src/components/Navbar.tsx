import { useState, useEffect } from 'react'
import { Box, HStack, Text, Flex, IconButton, VStack, Collapse } from '@chakra-ui/react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'

const MotionBox = motion(Box)
const MotionVStack = motion(VStack)

const sections = [
  { id: 'hero', label: 'Avaleht' },
  { id: 'about', label: 'Mängujämmist' },
  { id: 'schedule', label: 'Ajakava' },
  { id: 'past-jams', label: 'Varasemad jämmid' },
]

// Animated hamburger icon
function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <Box w="22px" h="16px" position="relative" cursor="pointer">
      {[0, 1, 2].map((i) => (
        <MotionBox
          key={i}
          position="absolute"
          left={0}
          right={0}
          h="2px"
          borderRadius="full"
          bg={isOpen ? '#71BDFF' : '#999'}
          animate={
            i === 0
              ? { top: isOpen ? '7px' : '0px', rotate: isOpen ? 45 : 0, opacity: 1 }
              : i === 1
              ? { top: '7px', opacity: isOpen ? 0 : 1 }
              : { top: isOpen ? '7px' : '14px', rotate: isOpen ? -45 : 0, opacity: 1 }
          }
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        />
      ))}
    </Box>
  )
}

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const scrollPos = window.scrollY + window.innerHeight / 3

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id)
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const scrollTo = (id: string) => {
    setMobileOpen(false)
    setTimeout(() => {
      if (id === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      const el = document.getElementById(id)
      if (el) {
        const offset = 80
        const top = el.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }, mobileOpen ? 200 : 0) // slight delay so menu closes before scroll on mobile
  }

  const bgActive = 'rgba(5, 5, 10, 0.92)'
  const bgTransparent = 'transparent'

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      transition="all 0.3s"
    >
      {/* Scroll progress bar */}
      <MotionBox
        style={{ scaleX, transformOrigin: '0%' }}
        h="3px"
        bg="#71BDFF"
        position="absolute"
        top={0}
        left={0}
        right={0}
        zIndex={1}
      />

      {/* Main nav bar */}
      <Flex
        justify="center"
        align="center"
        py={3}
        px={6}
        bg={isScrolled || mobileOpen ? bgActive : bgTransparent}
        backdropFilter={isScrolled || mobileOpen ? 'blur(12px)' : 'none'}
        borderBottom={isScrolled || mobileOpen ? '1px solid rgba(113, 189, 255, 0.1)' : '1px solid transparent'}
        transition="all 0.3s"
        position="relative"
      >
        {/* Desktop nav links */}
        <HStack spacing={6} display={{ base: 'none', md: 'flex' }}>
          {sections.map((section) => {
            const isActive = activeSection === section.id
            return (
              <Box
                key={section.id}
                as="button"
                onClick={() => scrollTo(section.id)}
                position="relative"
                px={3}
                py={1.5}
                cursor="pointer"
                _hover={{ '& > p': { color: '#71BDFF' } }}
                transition="all 0.2s"
              >
                <Text
                  fontSize="sm"
                  fontWeight={isActive ? '700' : '500'}
                  color={isActive ? '#71BDFF' : '#999'}
                  textTransform="uppercase"
                  letterSpacing="wider"
                  transition="all 0.2s"
                  fontFamily="'Fredoka One', cursive"
                >
                  {section.label}
                </Text>
                {isActive && (
                  <MotionBox
                    layoutId="nav-indicator"
                    position="absolute"
                    bottom={0}
                    left="50%"
                    transform="translateX(-50%)"
                    w="4px"
                    h="4px"
                    borderRadius="full"
                    bg="#71BDFF"
                  />
                )}
              </Box>
            )
          })}
        </HStack>

        {/* Mobile: hamburger button — right-aligned */}
        <Box
          display={{ base: 'flex', md: 'none' }}
          w="100%"
          justify="flex-end"
          alignItems="center"
        >
          <Box
            as="button"
            onClick={() => setMobileOpen((o) => !o)}
            p={2}
            borderRadius="md"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            _hover={{ bg: 'rgba(113,189,255,0.08)' }}
            transition="background 0.2s"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <HamburgerIcon isOpen={mobileOpen} />
          </Box>
        </Box>
      </Flex>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileOpen && (
          <MotionBox
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            display={{ base: 'block', md: 'none' }}
            bg="rgba(5, 5, 10, 0.97)"
            backdropFilter="blur(16px)"
            borderBottom="1px solid rgba(113, 189, 255, 0.12)"
            overflow="hidden"
          >
            <VStack spacing={0} align="stretch" py={2}>
              {sections.map((section, i) => {
                const isActive = activeSection === section.id
                return (
                  <MotionBox
                    key={section.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                    as="button"
                    onClick={() => scrollTo(section.id)}
                    px={6}
                    py={4}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    cursor="pointer"
                    bg={isActive ? 'rgba(113,189,255,0.06)' : 'transparent'}
                    borderLeft={isActive ? '2px solid #71BDFF' : '2px solid transparent'}
                    _hover={{ bg: 'rgba(113,189,255,0.08)' }}
                    transition="all 0.15s"
                    textAlign="left"
                    w="100%"
                  >
                    <Text
                      fontSize="sm"
                      fontWeight={isActive ? '700' : '500'}
                      color={isActive ? '#71BDFF' : '#aaa'}
                      textTransform="uppercase"
                      letterSpacing="wider"
                      fontFamily="'Fredoka One', cursive"
                    >
                      {section.label}
                    </Text>
                    {isActive && (
                      <Box
                        w="6px"
                        h="6px"
                        borderRadius="full"
                        bg="#71BDFF"
                        flexShrink={0}
                        boxShadow="0 0 8px #71BDFF"
                      />
                    )}
                  </MotionBox>
                )
              })}
            </VStack>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  )
}