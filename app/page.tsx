"use client"

import React, { useRef, useEffect, useState } from 'react'
import p5 from 'p5'
import { Twitter, Github } from 'lucide-react'

const UouCat = () => {
  const sketchRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [memberCount, setMemberCount] = useState<number>(0)

  useEffect(() => {
    fetch('/api/members')
      .then(res => res.json())
      .then(data => setMemberCount(data.count))
      .catch(error => {
        console.error('Error fetching members:', error);
        setMemberCount(0);
      });
  }, []);

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
        setIsLoaded(true)
      }

      p.draw = () => {
        p.background(0)
        p.stroke(255, 30)
        for (let y = 0; y < h; y += 10) {
          for (let x = 0; x < w; x += 10) {
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
  }, [])

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div ref={sketchRef} className="fixed inset-0 z-0" />
      
      <div className={`relative z-10 min-h-screen ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center">
          <h1 className="text-xl font-bold">uou.cat</h1>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/uoucat" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-75 transition-opacity"
              aria-label="Visit us on GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://twitter.com/uoucat" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-75 transition-opacity"
              aria-label="Follow us on Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex items-center justify-center min-h-screen px-4">
          <div className="max-w-lg text-center space-y-8">
            <p className="text-base">
              We are the innovation team behind spiritu.al & more
            </p>
            
            <div className="space-y-4">
              <p className="text-xs opacity-75">
                Currently at {memberCount} members. Want to grind with us?
              </p>
              <a 
                href="mailto:hi@uou.cat"
                className="inline-block bg-white text-black px-6 py-2 rounded-lg hover:bg-white/80 transition-colors text-xs"
              >
                hi@uou.cat
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default UouCat

