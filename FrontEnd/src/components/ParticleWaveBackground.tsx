import React, { useEffect, useRef } from 'react'

interface RenderableItem {
  type: 'grid' | 'floating'
  x: number
  y: number
  z: number
  projX: number
  projY: number
  projZ: number // Depth value used for sorting (back-to-front)
  size: number
  alpha: number
  color: string
}

export const ParticleWaveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  
  // Mouse coordinates for interactive parallax
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    let animationId: number
    let time = 0

    // Particle settings
    const cols = 55
    const rows = 55
    const spacingX = 26
    const spacingZ = 26
    const cameraZ = 850
    const fov = 800

    // Setup mouse listener
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to [-1, 1]
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.targetY = (e.clientY / window.innerHeight) * 2 - 1
    }

    // Touch listener for mobile interaction
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.targetX = (e.touches[0].clientX / window.innerWidth) * 2 - 1
        mouseRef.current.targetY = (e.touches[0].clientY / window.innerHeight) * 2 - 1
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)

    // Resize handler with High-DPI screen support
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2) // Cap at 2 for performance
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas() // Initial call

    // Initialize floating embers
    const floatingCount = 130
    const floatingParticles = Array.from({ length: floatingCount }, () => ({
      x: (Math.random() - 0.5) * 1600,
      y: (Math.random() - 0.5) * 600,
      z: (Math.random() - 0.5) * 1600,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -0.15 - Math.random() * 0.3, // Drift upwards slowly
      vz: (Math.random() - 0.5) * 0.4,
      baseSize: 1.2 + Math.random() * 1.5,
      // Goldish-white highlight colors
      color: Math.random() > 0.4 
        ? 'rgba(255, 235, 180, ' // Warm bright gold base
        : 'rgba(255, 255, 255, ' // White highlight base
    }))

    // Grid particle base configurations
    const gridBaseX: number[] = []
    const gridBaseZ: number[] = []
    const colHalf = (cols - 1) / 2
    const rowHalf = (rows - 1) / 2

    for (let i = 0; i < cols; i++) {
      gridBaseX.push((i - colHalf) * spacingX)
    }
    for (let j = 0; j < rows; j++) {
      gridBaseZ.push((j - rowHalf) * spacingZ)
    }

    // Dynamic wave equation
    const calculateY = (gx: number, gz: number, t: number) => {
      // Primary wave: slow, sweeping flow
      let y = Math.sin(gx * 0.06 + t * 0.35) * Math.cos(gz * 0.06 + t * 0.28) * 110
      
      // Secondary waves: add organic visual complexity
      y += Math.sin(gx * 0.12 - t * 0.6) * Math.cos(gz * 0.14 + t * 0.45) * 35
      y += Math.sin((gx + gz) * 0.045 + t * 0.18) * 65

      // Circular edge dampening to fade out coordinates smoothly
      const distFromCenter = Math.sqrt(gx * gx + gz * gz)
      const maxDist = Math.sqrt(colHalf * colHalf + rowHalf * rowHalf)
      const dampening = Math.cos(Math.min(1, distFromCenter / (maxDist * 0.95)) * Math.PI * 0.5)
      
      return y * Math.max(0, dampening)
    }

    // Luxury palette color mapping based on height
    const getGridColor = (y: number): string => {
      // Map y (roughly -180 to 180) to [0, 1] range
      const normY = Math.max(0, Math.min(1, (y + 120) / 240))
      
      if (normY > 0.8) {
        // High peaks: bright highlight gold / white-gold
        return '255, 238, 170' 
      } else if (normY > 0.45) {
        // Mid-height waves: brand gold
        return '196, 121, 86'
      } else {
        // Troughs/valleys: deep warm copper-bronze
        return '92, 44, 22'
      }
    }

    // Render loop
    const render = () => {
      time += 0.015

      const width = canvas.width / (window.devicePixelRatio || 1)
      const height = canvas.height / (window.devicePixelRatio || 1)
      const centerX = width / 2
      const centerY = height / 2

      // Interpolate mouse coordinates for buttery smooth parallax
      const mouse = mouseRef.current
      mouse.x += (mouse.targetX - mouse.x) * 0.05
      mouse.y += (mouse.targetY - mouse.y) * 0.05

      // Compute camera angles (drift + mouse parallax)
      const yaw = mouse.x * 0.07 + Math.sin(time * 0.04) * 0.04 // Y-axis rotation
      const pitch = 0.55 + mouse.y * 0.06 + Math.cos(time * 0.04) * 0.03 // X-axis rotation (tilted down)

      const cosYaw = Math.cos(yaw)
      const sinYaw = Math.sin(yaw)
      const cosPitch = Math.cos(pitch)
      const sinPitch = Math.sin(pitch)

      // Draw volumetric black background with deep glowing golden center spotlight
      const bgGrad = ctx.createRadialGradient(
        centerX, centerY - 50, 20, 
        centerX, centerY, Math.max(width, height) * 0.85
      )
      bgGrad.addColorStop(0, '#150f0b') // Very subtle, warm luxury glow center
      bgGrad.addColorStop(0.4, '#0b0c10') // Brand background
      bgGrad.addColorStop(1, '#050507') // Absolute black on edges
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, width, height)

      // Render items aggregator
      const items: RenderableItem[] = []

      // 1. Process Grid Wave Particles
      const gridItemsMap: (RenderableItem | null)[] = new Array(cols * rows).fill(null)

      for (let i = 0; i < cols; i++) {
        const gx = i - colHalf
        const baseX = gridBaseX[i]

        for (let j = 0; j < rows; j++) {
          const gz = j - rowHalf
          const baseZ = gridBaseZ[j]
          const baseY = calculateY(gx, gz, time)

          // Rotate Y (yaw)
          const rx = baseX * cosYaw - baseZ * sinYaw
          const rz1 = baseX * sinYaw + baseZ * cosYaw

          // Rotate X (pitch)
          const ry = baseY * cosPitch - rz1 * sinPitch
          const rz = baseY * sinPitch + rz1 * cosPitch

          // Perspective depth calculation
          const projZ = rz + cameraZ
          if (projZ <= 50) continue // Behind camera clip

          const scale = fov / projZ
          const projX = centerX + rx * scale
          const projY = centerY + ry * scale

          // Fake depth of field (DoF): particles away from focus depth expand and fade out
          const focusZ = cameraZ + 50
          const distToFocus = Math.abs(projZ - focusZ)
          const dofScale = 1 + distToFocus * 0.0055

          const size = Math.max(0.4, Math.min(10, (1.6 * scale) * dofScale))
          
          // Calculate opacity: closer or further fades, sharpest at focusZ
          let alpha = 0.85 * (1.2 / (1 + distToFocus * 0.005))
          
          // Fade out items that are extremely close to screen to prevent camera-clipping artifacts
          if (projZ < 300) {
            alpha *= Math.max(0, (projZ - 100) / 200)
          }
          // Fade out items very far in background
          if (projZ > 1600) {
            alpha *= Math.max(0, 1 - (projZ - 1600) / 400)
          }

          if (alpha <= 0.01) continue

          const color = getGridColor(baseY)
          const item: RenderableItem = {
            type: 'grid',
            x: baseX,
            y: baseY,
            z: baseZ,
            projX,
            projY,
            projZ,
            size,
            alpha,
            color
          }

          items.push(item)
          gridItemsMap[i * rows + j] = item
        }
      }

      // 2. Process Floating Embers
      for (let idx = 0; idx < floatingCount; idx++) {
        const fp = floatingParticles[idx]

        // Drift updates
        fp.x += fp.vx
        fp.y += fp.vy
        fp.z += fp.vz

        // Natural micro-oscillation
        fp.x += Math.sin(time + idx) * 0.15

        // Reset if drifted too far out of bounds
        if (fp.y < -380) {
          fp.y = 380
          fp.x = (Math.random() - 0.5) * 1600
          fp.z = (Math.random() - 0.5) * 1600
        }
        if (Math.abs(fp.x) > 900) fp.x = -fp.x
        if (Math.abs(fp.z) > 950) fp.z = -fp.z

        // Rotate Y (yaw)
        const rx = fp.x * cosYaw - fp.z * sinYaw
        const rz1 = fp.x * sinYaw + fp.z * cosYaw

        // Rotate X (pitch)
        const ry = fp.y * cosPitch - rz1 * sinPitch
        const rz = fp.y * sinPitch + rz1 * cosPitch

        const projZ = rz + cameraZ
        if (projZ <= 50) continue

        const scale = fov / projZ
        const projX = centerX + rx * scale
        const projY = centerY + ry * scale

        // Fake DoF for embers: larger, dreamy bokeh circles
        const focusZ = cameraZ + 50
        const distToFocus = Math.abs(projZ - focusZ)
        const dofScale = 1 + distToFocus * 0.0075

        const size = Math.max(0.6, Math.min(15, (fp.baseSize * scale) * dofScale))
        
        let alpha = 0.75 * (1.5 / (1 + distToFocus * 0.006))
        
        // Embers fade at edges and clips
        if (projZ < 200) alpha *= Math.max(0, (projZ - 50) / 150)
        if (projZ > 1700) alpha *= Math.max(0, 1 - (projZ - 1700) / 300)

        if (alpha <= 0.01) continue

        items.push({
          type: 'floating',
          x: fp.x,
          y: fp.y,
          z: fp.z,
          projX,
          projY,
          projZ,
          size,
          alpha,
          color: fp.color // e.g. "rgba(255, 235, 180, " or "rgba(255, 255, 255, "
        })
      }

      // 3. Draw Grid Lines (Wireframe Mesh)
      // To run at 60 FPS, draw all wireframe paths in a single batch
      ctx.beginPath()
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const p1 = gridItemsMap[i * rows + j]
          if (!p1) continue

          // Draw horizontal connection
          if (i + 1 < cols) {
            const p2 = gridItemsMap[(i + 1) * rows + j]
            if (p2) {
              ctx.moveTo(p1.projX, p1.projY)
              ctx.lineTo(p2.projX, p2.projY)
            }
          }

          // Draw vertical connection
          if (j + 1 < rows) {
            const p3 = gridItemsMap[i * rows + (j + 1)]
            if (p3) {
              ctx.moveTo(p1.projX, p1.projY)
              ctx.lineTo(p3.projX, p3.projY)
            }
          }
        }
      }

      ctx.strokeStyle = 'rgba(196, 121, 86, 0.06)' // Very subtle luxury gold color
      ctx.lineWidth = 0.5
      ctx.stroke()

      // 4. Sort particles back-to-front for proper depth layering
      items.sort((a, b) => b.projZ - a.projZ)

      // 5. Draw Particles
      for (let idx = 0; idx < items.length; idx++) {
        const p = items[idx]

        if (p.type === 'grid') {
          // Double circle render for glowing bloom effect
          // Outer bloom ring
          ctx.beginPath()
          ctx.arc(p.projX, p.projY, p.size * 2.2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${p.color}, ${p.alpha * 0.15})`
          ctx.fill()

          // Inner solid core
          ctx.beginPath()
          ctx.arc(p.projX, p.projY, p.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${p.color}, ${p.alpha * 0.85})`
          ctx.fill()
        } else {
          // Floating bokeh ember - diffuse look with soft glowing edge
          ctx.beginPath()
          ctx.arc(p.projX, p.projY, p.size, 0, Math.PI * 2)
          ctx.fillStyle = p.color + (p.alpha * 0.45) + ')'
          ctx.fill()

          ctx.beginPath()
          ctx.arc(p.projX, p.projY, p.size * 0.4, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(255, 255, 255, ' + (p.alpha * 0.85) + ')'
          ctx.fill()
        }
      }

      animationId = requestAnimationFrame(render)
    }

    render()

    // Cleanup listeners and cancel animation frame
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover z-0 select-none pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

export default ParticleWaveBackground
