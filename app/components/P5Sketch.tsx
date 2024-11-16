"use client"

import React, { useRef, useEffect } from 'react'
import p5 from 'p5'

interface P5SketchProps {
  onLoad: () => void
}

const P5Sketch: React.FC<P5SketchProps> = ({ onLoad }) => {
  const sketchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sketchRef.current) return

    const sketch = (p: p5) => {
      let t = 0
      let w: number
      let h: number

      const mag = (x: number, y: number) => Math.sqrt(x * x + y * y)

      const a = (x: number, y: number, d = mag(x / 8 - w/16, y / 8 - h/16) ** 2 / 99) => {
        const k = x / 8 - w/16
        const e = y / 8 - h/16
        const q = x / 3 + k * 0.5 / Math.cos(y * 5) * Math.sin(d * d - t)
        const c = d / 2 - t / 8
        return [
          q * Math.sin(c) + e * Math.sin(d + k - t) + w/2,
          (q + y / 8 + d * 9) * Math.cos(c) + h/2
        ]
      }

      p.setup = () => {
        w = p.windowWidth
        h = p.windowHeight
        p.createCanvas(w, h)
        onLoad()
      }

      p.draw = () => {
        p.background(0, 180) // Added alpha for slight trail effect
        p.strokeWeight(1) // Slightly thicker points
        p.stroke(255, 50) // Increased opacity from 30 to 80
        
        // Decreased step size for more points
        for (let y = 0; y < h; y += 8) {
          for (let x = 0; x < w; x += 8) {
            const [px, py] = a(x, y)
            p.point(px, py)
          }
        }
        t += Math.PI / 360
      }

      p.windowResized = () => {
        w = p.windowWidth
        h = p.windowHeight
        p.resizeCanvas(w, h)
      }
    }

    const p5Instance = new p5(sketch, sketchRef.current)

    return () => {
      p5Instance.remove()
    }
  }, [onLoad])

  return <div ref={sketchRef} className="fixed inset-0 z-0" />
}

export default P5Sketch
