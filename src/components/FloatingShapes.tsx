import { Box, Image } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { keyframes } from '@emotion/react'

// Scroll animations for different rows - alternating directions
const scrollRight = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`

const scrollLeft = keyframes`
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
`

// Pulse glow animation
const pulseGlow = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
`

const imageRows = [
  { images: ['/img/img1.jpg', '/img/img2.jpg', '/img/img3.jpg', '/img/img4.jpg', '/img/img5.jpg', '/img/img8.jpg', '/img/img10.jpg'], speed: 80, direction: 'right' },
  { images: ['/img/img4.jpg', '/img/img10.jpg', '/img/img1.jpg', '/img/img5.jpg', '/img/img2.jpg', '/img/img8.jpg', '/img/img3.jpg'], speed: 100, direction: 'left' },
  { images: ['/img/img8.jpg', '/img/img3.jpg', '/img/img5.jpg', '/img/img1.jpg', '/img/img10.jpg', '/img/img4.jpg', '/img/img2.jpg'], speed: 70, direction: 'right' },
  { images: ['/img/img2.jpg', '/img/img5.jpg', '/img/img8.jpg', '/img/img3.jpg', '/img/img1.jpg', '/img/img10.jpg', '/img/img4.jpg'], speed: 90, direction: 'left' },
  { images: ['/img/img10.jpg', '/img/img1.jpg', '/img/img4.jpg', '/img/img8.jpg', '/img/img3.jpg', '/img/img2.jpg', '/img/img5.jpg'], speed: 110, direction: 'right' },
  { images: ['/img/img3.jpg', '/img/img4.jpg', '/img/img2.jpg', '/img/img10.jpg', '/img/img5.jpg', '/img/img1.jpg', '/img/img8.jpg'], speed: 85, direction: 'left' },
]

// Floating Lines Canvas Component
function FloatingLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    interface Line {
      x: number
      y: number
      length: number
      angle: number
      speed: number
      opacity: number
      width: number
      color: string
    }

    const lines: Line[] = []
    const lineCount = 25
    const colors = ['169, 200, 230'] // Blue only

    // Initialize lines
    for (let i = 0; i < lineCount; i++) {
      lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: 80 + Math.random() * 200,
        angle: -15 * (Math.PI / 180) + (Math.random() - 0.5) * 0.2,
        speed: 0.2 + Math.random() * 0.5,
        opacity: 0.05 + Math.random() * 0.15,
        width: 1 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw lines
      lines.forEach((line) => {
        const endX = line.x + Math.cos(line.angle) * line.length
        const endY = line.y + Math.sin(line.angle) * line.length
        
        const gradient = ctx.createLinearGradient(line.x, line.y, endX, endY)
        gradient.addColorStop(0, `rgba(${line.color}, 0)`)
        gradient.addColorStop(0.5, `rgba(${line.color}, ${line.opacity})`)
        gradient.addColorStop(1, `rgba(${line.color}, 0)`)

        ctx.beginPath()
        ctx.strokeStyle = gradient
        ctx.lineWidth = line.width
        ctx.lineCap = 'round'
        ctx.moveTo(line.x, line.y)
        ctx.lineTo(endX, endY)
        ctx.stroke()

        // Move line
        line.x += Math.cos(line.angle) * line.speed
        line.y += Math.sin(line.angle) * line.speed

        // Reset if off screen
        if (line.x > canvas.width + 250 || line.y > canvas.height + 250) {
          line.x = -150 + Math.random() * canvas.width * 0.3
          line.y = -150 + Math.random() * canvas.height * 0.3
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 3,
        pointerEvents: 'none',
      }}
    />
  )
}

export default function FloatingShapes() {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      pointerEvents="none"
      zIndex={0}
      overflow="hidden"
      bg="#0A0A0A"
    >
      {/* Ambient glow spots */}
      <Box
        position="absolute"
        top="20%"
        left="10%"
        w="400px"
        h="400px"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(169, 200, 230, 0.04) 0%, transparent 70%)"
        animation={`${pulseGlow} 8s ease-in-out infinite`}
        zIndex={1}
      />
      <Box
        position="absolute"
        bottom="30%"
        right="15%"
        w="500px"
        h="500px"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(169, 200, 230, 0.03) 0%, transparent 70%)"
        animation={`${pulseGlow} 10s ease-in-out infinite 2s`}
        zIndex={1}
      />

      {/* Rotated container - all rows at -15 degrees */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        w="250vmax"
        h="250vmax"
        transform="translate(-50%, -50%) rotate(-15deg)"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        gap={3}
      >
        {imageRows.map((row, rowIndex) => (
          <Box
            key={rowIndex}
            display="flex"
            gap={3}
            animation={`${row.direction === 'right' ? scrollRight : scrollLeft} ${row.speed}s linear infinite`}
          >
            {[...row.images, ...row.images].map((src, imgIndex) => (
              <Box
                key={imgIndex}
                flexShrink={0}
                w="350px"
                h="250px"
                overflow="hidden"
                borderRadius="md"
              >
                <Image
                  src={src}
                  alt="Game jam"
                  objectFit="cover"
                  w="100%"
                  h="100%"
                  transform="rotate(15deg) scale(1.3)"
                  opacity={0.2}
                  filter="grayscale(40%) contrast(1.1)"
                />
              </Box>
            ))}
          </Box>
        ))}
      </Box>

      {/* Enhanced gradient overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="linear-gradient(180deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.5) 30%, rgba(10,10,10,0.5) 70%, rgba(10,10,10,0.9) 100%)"
        zIndex={2}
      />

      {/* Vignette effect */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="radial-gradient(ellipse at center, transparent 0%, rgba(10,10,10,0.4) 100%)"
        zIndex={2}
      />

      {/* Floating lines + particles overlay */}
      <FloatingLines />
    </Box>
  )
}
