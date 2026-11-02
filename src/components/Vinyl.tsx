interface VinylProps {
  isPlaying: boolean;
  photoUrl?: string;
}

export function VinylRecord({ isPlaying, photoUrl }: VinylProps) {
  const defaultPhoto = "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=300";

  return (
    <div className="relative flex items-center justify-center w-44 h-44 my-6">
      
      {/* Jarum Pemutar (Tonearm) */}
      <div 
        className={`absolute -top-4 right-5 w-12 h-18 z-20 transition-transform duration-1000 origin-top-right ${
          isPlaying ? 'rotate-[14deg]' : '-rotate-12'
        }`}
      >
        <div className="w-1.5 h-14 bg-zinc-400 mx-auto rounded-full shadow-md"></div>
        <div className="w-3 h-4 bg-zinc-300 rounded-sm mx-auto -mt-1 shadow-sm"></div>
      </div>

      {/* Piringan Hitam (Vinyl) */}
      <div 
        className={`w-full h-full rounded-full relative overflow-hidden border-4 border-zinc-900 shadow-2xl flex items-center justify-center transition-all ${
          isPlaying ? 'animate-[spin_10s_linear_infinite]' : '[animation-play-state:paused]'
        }`}
      >
        {/* 1. Foto Memenuhi Seluruh Permukaan Piringan */}
        <img 
          src={photoUrl || defaultPhoto} 
          alt="Full Vinyl Memory" 
          className="absolute inset-0 w-full h-full object-cover rounded-full"
        />

        {/* 2. Overlay Bayangan Gelap untuk Efek Piringan Hitam */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-black/50 rounded-full pointer-events-none"></div>

        {/* 3. Efek Alur Garis Melingkar Vinyl (Grooves) */}
        <div className="absolute inset-2 rounded-full border border-black/40 flex items-center justify-center pointer-events-none">
          <div className="w-[85%] h-[85%] rounded-full border border-white/10 flex items-center justify-center">
            <div className="w-[70%] h-[70%] rounded-full border border-black/30 flex items-center justify-center">
              <div className="w-[50%] h-[50%] rounded-full border border-white/15"></div>
            </div>
          </div>
        </div>

        {/* 4. Efek Pantulan Kilau Cahaya (Shine Reflection) */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent pointer-events-none"></div>

        {/* 5. Lubang Poros Tengah Piringan (Spindle Hole) */}
        <div className="w-4 h-4 rounded-full bg-black border border-zinc-700 z-10 relative shadow-inner flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-900"></div>
        </div>
      </div>
    </div>
  )
}