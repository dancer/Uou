"use client"

import React, { useState, useEffect } from 'react'
import { Twitter, Github } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import P5Sketch with SSR disabled
const P5Sketch = dynamic(() => import('./components/P5Sketch'), {
  ssr: false
})

const UouCat = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [memberCount, setMemberCount] = useState<number>(0)

  useEffect(() => {
    fetch('/api/members')
      .then(res => res.json())
      .then(data => setMemberCount(data.count))
      .catch(error => console.error('Error fetching members:', error))
  }, [])

  return (
    <div className="relative min-h-screen bg-black text-white">
      <P5Sketch onLoad={() => setIsLoaded(true)} />
      
      <div className={`relative z-10 min-h-screen ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
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