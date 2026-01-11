import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sword, 
  Trophy, 
  Scroll, 
  Gamepad2, 
  Users, 
  ExternalLink, 
  Youtube, 
  Twitch, 
  MessageSquare,
  Skull
} from 'lucide-react';

// --- ANIMATION VARIANTS ---
const slashReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
  visible: { 
    clipPath: 'inset(0 0% 0 0)', 
    opacity: 1, 
    transition: { duration: 0.8, ease: [0.45, 0, 0.55, 1] } 
  }
};

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// --- COMPONENTS ---

// 1. Falling Petals Effect (Sakura)
const SakuraBackground = () => {
  const [petals, setPetals] = useState([]);
  useEffect(() => {
    const p = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + "%",
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 20
    }));
    setPetals(p);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map(p => (
        <motion.div
          key={p.id}
          initial={{ y: -20, opacity: 0, rotate: 0 }}
          animate={{ 
            y: "110vh", 
            opacity: [0, 0.8, 0], 
            rotate: 360,
            x: [0, 50, -50, 0]
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            delay: p.delay,
            ease: "linear" 
          }}
          className="absolute w-3 h-3 bg-red-400/30 rounded-full blur-[1px]"
          style={{ left: p.left }}
        />
      ))}
    </div>
  );
};

// 2. Themed Section Header
const SectionTitle = ({ title, subtitle }) => (
  <motion.div 
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="text-center mb-16 relative"
  >
    <motion.h2 
      variants={slashReveal}
      className="text-5xl md:text-7xl font-['Cinzel'] font-bold text-stone-200 tracking-widest uppercase opacity-20 absolute inset-0 -top-8 select-none"
    >
      {title}
    </motion.h2>
    <motion.div variants={fadeIn} className="relative z-10">
      <h3 className="text-3xl md:text-5xl font-['Cinzel'] text-red-600 font-bold drop-shadow-lg uppercase tracking-tighter">
        {title}
      </h3>
      <div className="h-[2px] w-48 bg-gradient-to-r from-transparent via-red-800 to-transparent mx-auto mt-4" />
      {subtitle && <p className="text-stone-400 mt-4 italic font-['Noto_Serif_JP']">{subtitle}</p>}
    </motion.div>
  </motion.div>
);

// 3. Match Card with "Slash" divider
const MatchCard = ({ p1, p2, type, index }) => (
  <motion.div
    variants={fadeIn}
    whileHover={{ scale: 1.02 }}
    className="relative group bg-stone-900/60 backdrop-blur-md border-l-4 border-red-900 p-6 shadow-2xl overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
      <Skull size={40} className="text-red-600" />
    </div>
    
    <div className="text-xs font-bold text-stone-500 uppercase tracking-[0.2em] mb-4 border-b border-stone-800 pb-2">
      {type} — Slot {index + 1}
    </div>

    <div className="space-y-4 relative">
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold text-stone-100">{p1.name}</span>
        <span className="text-sm font-mono text-red-500/80">{p1.pb}</span>
      </div>

      <div className="relative h-8 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-[1px] bg-stone-800" />
        </div>
        <div className="relative bg-stone-900 px-4 text-red-600 font-black italic transform -skew-x-12 border border-red-900/50">
          VS
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xl font-bold text-stone-300">{p2.name}</span>
        <span className="text-sm font-mono text-red-500/80">{p2.pb || "--:--"}</span>
      </div>
    </div>
    
    {/* Decorative Brush Stroke at bottom */}
    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-900/0 via-red-600/40 to-red-900/0" />
  </motion.div>
);

// --- MAIN APP ---
export default function App() {
  const contestants = [
    { name: 'WormdogBS', pb: '28:37' }, { name: 'mommyemma77', pb: '28:56' },
    { name: 'ymir_happy', pb: '29:10' }, { name: 'sara_toga', pb: '29:50' },
    { name: 'gunjou1213', pb: '30:30' }, { name: 'zerowww7', pb: '30:46' },
    { name: 'GamingMusume', pb: '31:11' }, { name: 'gilachi', pb: '36:44' },
    { name: 'leech1208', pb: '39:50' }
  ];

  const firstMatches = [
    { p1: contestants[7], p2: contestants[8], type: 'Play-In Match' },
    { p1: contestants[0], p2: contestants[1], type: 'Winners R1' },
    { p1: contestants[2], p2: contestants[3], type: 'Winners R1' },
    { p1: contestants[4], p2: contestants[5], type: 'Winners R1' },
    { p1: contestants[6], p2: { name: 'Play-In Winner' }, type: 'Winners R1' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-200 font-['Noto_Serif_JP'] selection:bg-red-900/50 selection:text-white">
      <SakuraBackground />
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden border-b border-red-950/30">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-40 z-0" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="z-10"
        >
          <motion.div 
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 6 }}
            className="mb-6 inline-block"
          >
            <Sword size={64} className="text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
          </motion.div>
          
          <h1 className="text-6xl md:text-9xl font-['Cinzel'] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-stone-100 to-stone-500 drop-shadow-2xl">
            SEKIRO <span className="text-red-600">SHURA</span>
          </h1>
          <p className="text-xl md:text-3xl font-['Cinzel'] tracking-[0.5em] text-stone-400 mt-2 uppercase">
            Glitchless Race 2026
          </p>
          
          <div className="mt-12 flex flex-wrap gap-6 justify-center">
            <motion.a
              whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(220,38,38,0.3)" }}
              whileTap={{ scale: 0.95 }}
              href="https://forms.gle/FwnG3Xt4E3hAat2q8"
              className="bg-red-700 hover:bg-red-600 text-white px-10 py-4 font-bold rounded-sm border-b-4 border-red-900 transition-all uppercase tracking-widest"
            >
              Enter the Fray
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="#brackets"
              className="bg-transparent border border-stone-700 hover:border-red-600 px-10 py-4 font-bold rounded-sm transition-all uppercase tracking-widest backdrop-blur-sm"
            >
              View Brackets
            </motion.a>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 text-stone-500"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-red-600 to-transparent mx-auto" />
          <p className="text-[10px] uppercase tracking-[0.3em] mt-4">Scroll to Begin</p>
        </motion.div>
      </section>

      {/* 2. BRACKETS SECTION */}
      <section id="brackets" className="py-24 px-4 max-w-7xl mx-auto relative z-10">
        <SectionTitle title="Opening Matchups" subtitle="Seeding based on Personal Best (PB) times" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {firstMatches.map((match, i) => (
            <MatchCard key={i} index={i} {...match} />
          ))}
        </div>
      </section>

      {/* 3. INFO & RULES (INK STYLE) */}
      <section className="py-24 bg-stone-950/80 backdrop-blur-xl border-y border-red-950/20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <div className="flex items-center gap-4 mb-8">
              <Scroll className="text-red-600" size={32} />
              <h2 className="text-4xl font-['Cinzel'] font-bold">The Rules of War</h2>
            </div>
            <div className="space-y-6 text-stone-400 border-l border-stone-800 pl-8">
              {[
                "Shura Glitchless: Strict adherence to official rules.",
                "No Resets: Once the bell rings, your fate is sealed. Use safety idols.",
                "Simultaneous Start: Runners begin at the exact same moment.",
                "Connection Loss: Opponent must pause if a stream fails.",
                "Proof of Honor: All races must be streamed live."
              ].map((rule, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="h-2 w-2 bg-red-600 mt-2 rotate-45" />
                  <p className="text-lg">{rule}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <div className="flex items-center gap-4 mb-8">
              <Users className="text-red-600" size={32} />
              <h2 className="text-4xl font-['Cinzel'] font-bold">The Gathering</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-stone-900/40 rounded border border-stone-800">
                <h4 className="text-red-500 font-bold mb-2 uppercase text-xs">Platform</h4>
                <p>PC & Console Welcome</p>
              </div>
              <div className="p-6 bg-stone-900/40 rounded border border-stone-800">
                <h4 className="text-red-500 font-bold mb-2 uppercase text-xs">Deadline</h4>
                <p>Jan 16, 2026 - 10 AM EST</p>
              </div>
              <div className="p-6 bg-stone-900/40 rounded border border-stone-800">
                <h4 className="text-red-500 font-bold mb-2 uppercase text-xs">Host</h4>
                <p>Seljuz & Special Guests</p>
              </div>
              <div className="p-6 bg-stone-900/40 rounded border border-stone-800">
                <h4 className="text-red-500 font-bold mb-2 uppercase text-xs">New Runners</h4>
                <p>Training recommended 😉</p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 4. LINKS (MODERN CARDS) */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Discord', icon: <MessageSquare />, link: 'https://discord.gg/c7XCh5ZnCG', color: 'hover:text-indigo-400' },
            { label: 'Twitch Live', icon: <Twitch />, link: 'https://www.twitch.tv/seljuz', color: 'hover:text-purple-400' },
            { label: 'Register', icon: <Scroll />, link: 'https://forms.gle/FwnG3Xt4E3hAat2q8', color: 'hover:text-green-400' },
          ].map((item, i) => (
            <motion.a
              key={i}
              href={item.link}
              target="_blank"
              whileHover={{ y: -10 }}
              className={`p-8 bg-stone-900/20 border border-stone-800 rounded-lg flex flex-col items-center gap-4 transition-colors ${item.color}`}
            >
              {React.cloneElement(item.icon, { size: 48 })}
              <span className="text-2xl font-['Cinzel']">{item.label}</span>
              <ExternalLink size={16} className="opacity-30" />
            </motion.a>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 text-center border-t border-stone-900">
        <p className="text-stone-600 text-xs tracking-[0.5em] uppercase mb-4">A Shinobi's Fate is Sealed</p>
        <p className="text-stone-500 italic">Created for the Sekiro Speedrunning Community by SELJUZ</p>
      </footer>
    </div>
  );
}