import './index.css'
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import { useEffect, useRef, useState } from 'react'

function App() {
  const [showBlurb, setShowBlurb] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [showForm, setShowForm] = useState(false)
  //const iframeRef = useRef(null)
  const words = [
    'Welcome to Your [Matrix]',
  ]
  const [title] = useTypewriter({
    words,
    loop: 1,
    typeSpeed: 120,
    deleteSpeed: 50,
    delaySpeed: 1500,
    onLoopDone: () => {
      setTimeout(() => {
        setShowBlurb(true)
      }, 1000) // 1000ms = 1 s delay
    },
  })

  useEffect(() => {
    if (!showForm) return

    const script = document.createElement('script')
    script.src = 'https://server.fillout.com/embed/v1/'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
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
          {showBlurb && <Blurb setShowButton={setShowButton}/>}
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
          Join the Waitlist
        </button>
      </div>
  
      {/* Fillout Form Overlay */}
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
    
        {/* Embedded Form */}
        <div
          className="w-full max-w-2xl h-[90vh] overflow-y-auto px-4"
          data-fillout-id="iuzeH2a1Kbus"
          data-fillout-embed-type="standard"
          data-fillout-inherit-parameters
          data-fillout-dynamic-resize
        ></div>

         {/* <div className="w-full max-w-2xl h-[90vh] overflow-y-auto px-4">
          <iframe
            data-tally-src="https://tally.so/embed/wk8Zkj?alignLeft=1&hideTitle=1&dynamicHeight=1"
            loading="lazy"
            width="100%"
            height="1000px"  // Ensure this is tall enough to include submit button
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="Matrix Waitlist"
            className="w-full rounded-md shadow-xl"
            ref={iframeRef}
          />
        </div>  */}
      </div>
      )}
    </div>
  )
  
}



function Blurb({setShowButton}) {
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
      {showSecondLine && <SecondLine setShowButton={setShowButton}/>}
    </div>
  )
}

function SecondLine({setShowButton}) {
  const [line2Text] = useTypewriter({
    words: ['Matrix helps you keep them.'],
    loop: 1,
    typeSpeed: 75,
    deleteSpeed: 0,
    delaySpeed: 1000,
    onLoopDone: () => {
      setShowButton(true)
    }
  })

  return (
    <p>
      {line2Text}
      <Cursor />
    </p>
  )
}

export default App
