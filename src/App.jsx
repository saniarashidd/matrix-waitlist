import './index.css'
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import { useEffect, useRef, useState } from 'react'

function App() {
  const [showBlurb, setShowBlurb] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const iframeRef = useRef(null)
  const words = [
    'Welcome.',
    
  ]
  const [title] = useTypewriter({
    words,
    loop: 1,
    typeSpeed: 170,
    deleteSpeed: 50,
    delaySpeed: 1500,
    onLoopDone: () => {
      setTimeout(() => {
        setShowBlurb(true)
        setShowButton(true)
      }, 1000) // 1000ms = 1 s delay
    },
  })

  useEffect(() => {
    if (!showForm) return

    const loadTally = () => {
      if (typeof window.Tally !== 'undefined') {
        window.Tally.loadEmbeds()
      } else {
        const script = document.createElement('script')
        script.src = 'https://tally.so/widgets/embed.js'
        script.onload = () => window.Tally && window.Tally.loadEmbeds()
        document.body.appendChild(script)
      }
    }

    loadTally()
  }, [showForm])

  return (
    <div className="relative h-screen flex flex-col items-center justify-center bg-black text-white text-center px-4">
      <div className="absolute top-4 left-4">
        <img src="/matrixdark.jpg" alt="Matrix logo" className="h-12 w-auto" />
      </div>
  
      {/* Title */}
      <div className="min-h-[220px] flex flex-col items-center justify-center">
        <h1 className="text-5xl sm:text-6xl font-bold min-h-[80px]">
          {title}
          {!showBlurb && <Cursor />}
        </h1>
  
        <div
          className={`text-xl italic min-h-[120px] mt-6 transition-opacity duration-500 ${
            showBlurb ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {showBlurb && <Blurb />}
        </div>
      </div>
  
      {/* Button */}
      <div
        className={`transition-opacity duration-[3000ms] ${
          showButton ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <button
          className="mt-2 bg-white text-black px-6 py-2 rounded-md hover:bg-cream"
          onClick={() => setShowForm(true)}
        >
          Join Waitlist
        </button>
      </div>
  
      {/* Tally Form Overlay */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center transition-opacity duration-700 opacity-100">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-red-400 transition"
          onClick={() => setShowForm(false)}
          aria-label="Close form"
        >
          &times;
        </button>
    
        {/* Embedded Tally Form */}
        <iframe
          data-tally-src="https://tally.so/embed/wk8Zkj?alignLeft=1&hideTitle=1&dynamicHeight=1"
          loading="lazy"
          width="100%"
          height="100%"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Matrix Waitlist"
          className="w-full h-full max-w-2xl mx-auto rounded-md shadow-xl"
          ref={iframeRef}
        />
      </div>
      )}
    </div>
  )
  
}

/*
 <form className="flex flex-col items-center gap-4">
        <input
          type="email"
          placeholder="you@example.com"
          className="px-4 py-2 border border-gray-300 rounded-md w-64 text-black"
        />
      </form>
  */

function Blurb() {
  const [showSecondLine, setShowSecondLine] = useState(false)

  const [line1Text] = useTypewriter({
    words: ['Most apps help you make connections.'],
    loop: 1,
    typeSpeed: 75,
    deleteSpeed: 0,
    delaySpeed: 2000,
    onLoopDone: () => {
      setTimeout(() => {
        setShowSecondLine(true)
        
      }, 1200) // 1000ms = 1 s delay
    },
    
    //onLoopDone: () => setShowSecondLine(true),
  })

  return (
    <div className="text-xl leading-relaxed min-h-[80px]">
      <p>{line1Text}</p>
      {showSecondLine && <SecondLine />}
    </div>
  )
}

function SecondLine() {
  const [line2Text] = useTypewriter({
    words: ['Matrix helps you keep them.'],
    loop: 1,
    typeSpeed: 75,
    deleteSpeed: 0,
    delaySpeed: 1000,
  })

  return (
    <p>
      {line2Text}
      <Cursor />
    </p>
  )
}

export default App
