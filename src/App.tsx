import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { VinylRecord } from './components/Vinyl'

type Message = {
  id: string;
  sender: string;
  preview: string;
  fullText: string;
}

// 3. Masukkan path foto kenangan Anda di sini (bisa juga ditaruh di folder public)
const fotoKenangan = "foto.jpg"; // Ganti dengan "/foto-galau.jpg" jika ditaruh di public

const lyricsData = [
  { time: 0, text: "" },
  { time: 0.5, text: "jujur aku tak kuasa" },
  { time: 7.0, text: "saat terakhir kugenggam tanganmu" },
  { time: 15.0, text: "namun yang pasti terjadi" },
  { time: 21.0, text: "Kita Mungkin" },
  { time: 25.0, text: "Tak Bersama Lagi" },
  { time: 30.0, text: "Bilaaaaa" },
  { time: 32.0, text: "Nanti" },
  { time: 33.0, text: "Esok Hari" },
  { time: 37.0, text: "Kutemukan dirimu" },
  { time: 40.0, text: "BAHAGIA" },
  { time: 44.0, text: "Izinkan" },
  { time: 46.0, text: "Aku Titipkan" },
  { time: 51.0, text: "Kisah Cinta kita" },
]


export default function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeMessage, setActiveMessage] = useState<Message | null>(null)
  const [currentLyric, setCurrentLyric] = useState("")
  const audioRef = useRef<HTMLAudioElement>(null)

  const messageData: Message = {
    id: "1",
    sender: "Undangan Digital",
    preview: "Absen Tamu dengan mengklik tombol ini",
    fullText: "kadang aku mikir, apa kita pernah benar-benar ada di halaman yang sama? atau cuma aku yang baca sendirian..."
  }

  const handleOpenMessage = (msg: Message) => {
    setActiveMessage(msg)
    setIsOpen(true)
    
    if (audioRef.current) {
      audioRef.current.volume = 0.6
      audioRef.current.play()
    }
  }

  const handleCloseMessage = () => {
    setIsOpen(false)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setCurrentLyric("")
    }
  }

  const handleTimeUpdate = () => {
    if (!audioRef.current) return
    const time = audioRef.current.currentTime
    const activeLyric = [...lyricsData].reverse().find(lyric => time >= lyric.time)
    
    if (activeLyric && activeLyric.text !== currentLyric) {
      setCurrentLyric(activeLyric.text)
    }
  }

  return (
    <div className="bg-zinc-950 min-h-screen flex items-center justify-center font-sans selection:bg-zinc-800">
      
      {/* Frame Tampilan HP */}
      <div className="w-full max-w-sm h-[100dvh] bg-black relative overflow-hidden text-zinc-300 shadow-2xl sm:border-x sm:border-zinc-900">
        
        <audio 
          ref={audioRef} 
          src="/bgm.mp3" 
          onTimeUpdate={handleTimeUpdate} 
          loop 
        />

        {!isOpen ? (
          /* Halaman Inbox */
          <div className="p-6 h-full flex flex-col pt-24">
            <h1 className="font-sans text-3xl font-medium mb-10 text-zinc-100 tracking-tight lowercase">
              Iyan Paris
            </h1>
            
            <div 
              onClick={() => handleOpenMessage(messageData)}
              className="p-5 bg-zinc-900/40 rounded-2xl cursor-pointer active:scale-95 transition-all duration-300 backdrop-blur-md border border-zinc-800/60 hover:bg-zinc-900/60"
            >
              <p className="font-sans font-medium text-zinc-100 lowercase">{messageData.sender}</p>
              <p className="font-mono text-xs text-zinc-500 mt-2 lowercase">{messageData.preview}</p>
            </div>
          </div>
        ) : (
          /* Halaman Pesan Terbuka */
          <div className="absolute inset-0 z-10 bg-black/90 backdrop-blur-xl p-8 flex flex-col justify-center items-center text-center">
            
            <p className="font-mono text-xs leading-relaxed text-zinc-500 mb-4 lowercase opacity-60 px-4">
              "{activeMessage?.fullText}"
            </p>

            {/* 4. Piringan Hitam Terintegrasi dengan Foto Kenangan */}
            <VinylRecord isPlaying={isOpen} photoUrl={fotoKenangan} />

            {/* Animasi Transisi Lirik */}
            <div className="h-24 flex items-center justify-center relative w-full overflow-hidden mt-4">
              <AnimatePresence mode="popLayout">
                {currentLyric && (
                  <motion.p 
                    key={currentLyric}
                    initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute font-serif italic text-xl leading-relaxed text-zinc-100 tracking-wide lowercase w-full text-center px-2"
                  >
                    {currentLyric}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            
            <button 
              onClick={handleCloseMessage}
              className="absolute bottom-10 text-xs font-mono text-zinc-600 hover:text-zinc-400 transition-colors lowercase tracking-widest"
            >
              tutup
            </button>
          </div>
        )}

        {/* Layer Noise/Grain Analog */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-screen"></div>
      </div>
    </div>
  )
}