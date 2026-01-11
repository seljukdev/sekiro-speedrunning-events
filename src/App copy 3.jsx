import React from 'react';
import { motion } from 'framer-motion';

// Assume Google Fonts import in index.html: <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&display=swap" rel="stylesheet">
// Custom font in Tailwind: extend theme.fontFamily { serif: ['Noto Serif JP', 'serif'] }

// Icons Components
const DiscordIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.24,3.24H3.76A1.76,1.76,0,0,0,2,5V19a1.76,1.76,0,0,0,1.76,1.76H20.24A1.76,1.76,0,0,0,22,19V5A1.76,1.76,0,0,0,20.24,3.24ZM18.06,8.23c-0.65-0.65-1.42-1.07-2.3-1.28A9.74,9.74,0,0,0,12,6.5a9.74,9.74,0,0,0-3.76,0.45c-0.88,0.21-1.65,0.63-2.3,1.28-0.66,0.65-1.08,1.43-1.29,2.31A9.74,9.74,0,0,0,6.5,12a9.74,9.74,0,0,0,0.45,3.76c0.21,0.88,0.63,1.65,1.28,2.3,0.65,0.66,1.43,1.08,2.31,1.29A9.74,9.74,0,0,0,12,17.5a9.74,9.74,0,0,0,3.76-0.45c0.88-0.21,1.65-0.63,2.3-1.28,0.66-0.65,1.08-1.43,1.29-2.31A9.74,9.74,0,0,0,17.5,12a9.74,9.74,0,0,0-0.45-3.76C16.84,9.08,16.21,8.51,15.55,7.85Z" />
    <path d="M12,10.25a2,2,0,1,0,2,2A2,2,0,0,0,12,10.25Zm-4.5,0a2,2,0,1,0,2,2A2,2,0,0,0,7.5,10.25Zm9,0a2,2,0,1,0,2,2A2,2,0,0,0,16.5,10.25Z" />
  </svg>
);

const TwitchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
    <path d="M11.571 6.046h-2.143v4.286H7.286v-4.286H5.143V13.5H1.996L.004 18h5.139v2.143H8.57V18h3.857L17.143 24h-1.071l-2.735-3.214h4.81L23.996 15V.953h-12.425v5.093zM18.857 15l-2.143 2.143H11.57l-2.143-2.143V8.182h9.428V15z" />
  </svg>
);

const FormIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

// Data
const contestants = [
  { name: 'WormdogBS', pb: '28:37', seed: 1, avatar: '/avatars/wormdogbs.png' }, // Assume avatar images
  { name: 'mommyemma77', pb: '28:56', seed: 2, avatar: '/avatars/mommyemma77.png' },
  { name: 'ymir_happy', pb: '29:10', seed: 3, avatar: '/avatars/ymir_happy.png' },
  { name: 'sara_toga', pb: '29:50', seed: 4, avatar: '/avatars/sara_toga.png' },
  { name: 'gunjou1213', pb: '30:30', seed: 5, avatar: '/avatars/gunjou1213.png' },
  { name: 'zerowww7', pb: '30:46', seed: 6, avatar: '/avatars/zerowww7.png' },
  { name: 'GamingMusume', pb: '31:11', seed: 7, avatar: '/avatars/gamingmusume.png' },
  { name: 'gilachi', pb: '36:44', seed: 8, avatar: '/avatars/gilachi.png' },
  { name: 'leech1208', pb: '39:50', seed: 9, avatar: '/avatars/leech1208.png' },
];

const firstMatches = [
  { p1: contestants[7], p2: contestants[8], type: 'Play-In Match' },
  { p1: contestants[0], p2: contestants[1], type: 'Round 1' },
  { p1: contestants[2], p2: contestants[3], type: 'Round 1' },
  { p1: contestants[4], p2: contestants[5], type: 'Round 1' },
  { p1: contestants[6], p2: { name: '[Play-In Winner]', pb: null, avatar: '/avatars/placeholder.png' }, type: 'Round 1' },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, duration: 0.8 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 120 } },
};

const hoverVariants = {
  hover: { scale: 1.05, rotate: 1, boxShadow: '0 0 30px rgba(255, 0, 0, 0.4)', transition: { duration: 0.3 } },
  tap: { scale: 0.98, rotate: -1 },
};

const sectionHeaderVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, delay: 0.3 } },
};

// Hero Component
const Hero = () => (
  <header className="relative py-20 md:py-32 text-center mb-20 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: 'url(/sekiro-bg-mist.jpg)' }} // Parallax-like with bg-fixed
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent opacity-80"></div>
      {/* Ash Particle Effect - Simple CSS animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gray-400 rounded-full opacity-20 animate-float"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>
    </div>
    <motion.div className="relative z-10" initial="hidden" animate="visible" variants={containerVariants}>
      <motion.img
        src="/sekiro-wolf-logo.png" // Stylized Sekiro logo with wolf prosthetic
        alt="Sekiro Speedrunning Event"
        className="mx-auto h-56 md:h-80 object-contain mb-6 filter drop-shadow-[0_0_20px_rgba(255,0,0,0.7)]"
        variants={itemVariants}
      />
      <motion.h1
        className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-orange-600 mb-6 tracking-wide drop-shadow-[0_0_12px_rgba(255,0,0,0.8)]"
        variants={itemVariants}
      >
        Sekiro Speedrunning Event
      </motion.h1>
      <motion.h2
        className="text-4xl md:text-6xl text-gold-300 font-extrabold mb-8 italic tracking-wider"
        variants={itemVariants}
      >
        SHURA RACE - Jan 2026
      </motion.h2>
      <motion.p
        className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto mb-10 leading-relaxed px-4"
        variants={itemVariants}
      >
        Embrace the shinobi way! Compete in fierce real-time speedrun battles, wield your prosthetic tools, and conquer the shadows of Ashina.
      </motion.p>
      <motion.a
        href="https://forms.gle/FwnG3Xt4E3hAat2q8"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center bg-red-800 hover:bg-red-900 text-white font-bold py-4 px-10 rounded-full shadow-2xl border-2 border-red-950 transform transition duration-300 group"
        variants={hoverVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <span className="mr-2">Register Now</span>
        <span className="h-6 w-6 bg-red-600 rounded-full group-hover:animate-ping"></span> {/* Sword slash effect */}
      </motion.a>
    </motion.div>
  </header>
);

// MatchCard Component
const MatchCard = ({ match }) => (
  <motion.div
    className="bg-black/50 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-red-800/50 flex flex-col items-center justify-between overflow-hidden group"
    variants={itemVariants}
    whileHover={{ scale: 1.03, borderColor: 'rgba(255,0,0,0.8)' }}
    transition={{ duration: 0.3 }}
  >
    <h4 className="text-2xl font-bold text-orange-500 mb-4 border-b-2 border-orange-700 pb-2 w-full text-center relative">
      {match.type}
      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span> {/* Blood drip divider */}
    </h4>
    <div className="flex flex-col items-center gap-3 text-lg w-full">
      <div className="flex items-center justify-between w-full p-3 bg-gray-900/50 rounded-lg border border-gray-700 group-hover:border-red-600 transition-colors">
        <div className="flex items-center gap-2">
          <img src={match.p1.avatar || '/avatars/default.png'} alt={match.p1.name} className="h-10 w-10 rounded-full border-2 border-gold-400" />
          <span>{match.p1.name}</span>
        </div>
        {match.p1.pb && <span className="text-gray-300 italic">({match.p1.pb})</span>}
      </div>
      <span className="text-red-500 font-extrabold text-2xl animate-pulse">VS</span>
      <div className="flex items-center justify-between w-full p-3 bg-gray-900/50 rounded-lg border border-gray-700 group-hover:border-red-600 transition-colors">
        <div className="flex items-center gap-2">
          <img src={match.p2.avatar || '/avatars/default.png'} alt={match.p2.name} className="h-10 w-10 rounded-full border-2 border-gold-400" />
          <span>{match.p2.name}</span>
        </div>
        {match.p2.pb && <span className="text-gray-300 italic">({match.p2.pb})</span>}
      </div>
    </div>
    {match.type === 'Play-In Match' && (
      <p className="mt-4 text-sm text-gray-400 text-center">Victor claims glory against GamingMusume in Round 1.</p>
    )}
  </motion.div>
);

// BracketSection Component
const BracketSection = () => (
  <section className="mb-24 relative">
    <motion.h3
      className="text-5xl font-bold text-center text-red-500 mb-16 pb-4 border-b-4 border-red-900/50 relative"
      variants={sectionHeaderVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      First Match Schedule
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-red-600 rounded-full shadow-lg"></span>
    </motion.h3>
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {firstMatches.map((match, index) => (
        <MatchCard key={index} match={match} />
      ))}
    </motion.div>
  </section>
);

// DetailsPanel Component
const DetailsPanel = ({ title, content }) => (
  <motion.div
    className="bg-black/40 backdrop-blur-lg rounded-xl p-8 shadow-xl border border-gray-800/50 group hover:border-orange-600 transition-all duration-500"
    variants={itemVariants}
    whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(255, 165, 0, 0.3)' }}
  >
    <h4 className="text-3xl font-bold text-orange-500 mb-6 relative">
      {title}
      <span className="absolute bottom-0 left-0 w-0 h-1 bg-orange-600 group-hover:w-full transition-all duration-300"></span>
    </h4>
    <ul className="list-inside space-y-4 text-lg text-gray-200">
      {content.map((item, index) => (
        <li key={index} className="flex items-start gap-2">
          <span className="text-red-500">•</span> {item}
        </li>
      ))}
    </ul>
  </motion.div>
);

// DetailsSection Component
const DetailsSection = () => {
  const howItWorks = [
    'Brackets forged from PBs for balanced duels.',
    'Mutually agreed times – honor your opponent.',
    'Simultaneous Shura Glitchless runs begin.',
    'Custom layouts for epic commentary.',
    'PC: mIGT; Console: In-game time.',
    'Live streams with dual views and shinobi insights.',
    'Overflow matches? We prioritize the fiercest.',
  ];

  const whoCanJoin = [
    'All shinobi welcome – from wolf pups to legends!',
    'PB-based matchmaking for fair fights.',
    '**Deadline:** Jan 16, 2026 - 10 AM EST',
    '**Host:** Seljuz with guest commentators at <a href="https://www.twitch.tv/seljuz" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline inline-flex items-center gap-1"><TwitchIcon className="h-5 w-5" /> twitch.tv/seljuz</a>',
    '**Category:** Shura Glitchless',
    '**Consoles:** Welcome – no shinobi left behind!',
    '**Newbies:** Practice your parries!',
  ];

  return (
    <section className="mb-24">
      <motion.h3
        className="text-5xl font-bold text-center text-red-500 mb-16 pb-4 border-b-4 border-red-900/50 relative"
        variants={sectionHeaderVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Event Details
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-red-600 rounded-full shadow-lg"></span>
      </motion.h3>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <DetailsPanel title="How Does It Work?" content={howItWorks} />
        <DetailsPanel title="Who Can Participate?" content={whoCanJoin} />
      </motion.div>
    </section>
  );
};

// RulesSection Component
const RulesSection = () => {
  const rules = [
    'Adhere to official Shura Glitchless rules – no forbidden arts.',
    'Brackets revealed post-registration – prepare your prosthetics.',
    '**No resets:** Once begun, face death or victory!',
    'Disconnects: Pause honorably – resume the duel.',
    'All battles must be streamed – let the world witness.',
  ];

  return (
    <section className="mb-24">
      <motion.h3
        className="text-5xl font-bold text-center text-red-500 mb-16 pb-4 border-b-4 border-red-900/50 relative"
        variants={sectionHeaderVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Rules of Engagement
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-red-600 rounded-full shadow-lg"></span>
      </motion.h3>
      <motion.div
        className="bg-black/40 backdrop-blur-lg rounded-xl p-8 shadow-xl border border-gray-800/50"
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <ul className="list-inside space-y-4 text-lg text-gray-200">
          {rules.map((rule, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-red-500">•</span> <span dangerouslySetInnerHTML={{ __html: rule }} />
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
};

// LinkCard Component
const LinkCard = ({ href, icon: Icon, title, description }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex flex-col items-center p-6 bg-black/50 backdrop-blur-md rounded-xl shadow-lg border border-gray-800/50 text-center text-white hover:border-red-600 transition-all duration-300 group"
    variants={hoverVariants}
    whileHover="hover"
    whileTap="tap"
  >
    <Icon />
    <span className="text-2xl font-semibold mt-4 group-hover:text-red-500 transition-colors">{title}</span>
    <p className="text-gray-300 mt-2">{description}</p>
  </motion.a>
);

// LinksSection Component
const LinksSection = () => (
  <section className="mb-24">
    <motion.h3
      className="text-5xl font-bold text-center text-red-500 mb-16 pb-4 border-b-4 border-red-900/50 relative"
      variants={sectionHeaderVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      Vital Scrolls
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-red-600 rounded-full shadow-lg"></span>
    </motion.h3>
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-8" // Bento-like grid
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <LinkCard href="https://discord.gg/c7XCh5ZnCG" icon={DiscordIcon} title="Discord Dojo" description="Train & query with fellow shinobi" />
      <LinkCard href="https://www.twitch.tv/seljuz" icon={TwitchIcon} title="Host's Lair" description="Witness live duels" />
      <LinkCard href="https://forms.gle/FwnG3Xt4E3hAat2q8" icon={FormIcon} title="Registration Scroll" description="Inscribe your name!" />
    </motion.div>
    <motion.p className="text-center text-gray-300 mt-12 text-xl" variants={itemVariants}>
      Seek me on Discord: <strong className="text-red-500">SELJUZ</strong>
    </motion.p>
    <motion.p className="text-center text-gray-300 mt-4 text-xl" variants={itemVariants}>
      Aid in commentary or forge better events – your wisdom is prized.
    </motion.p>
  </section>
);

// Main App
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-gray-100 font-serif relative overflow-hidden">
      {/* Global Ash/Mist Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/sekiro-texture-ash.png')] bg-repeat animate-slow-drift"></div> {/* Custom texture */}
      </div>
      <div className="relative z-10 p-4 md:p-8 max-w-7xl mx-auto">
        <Hero />
        <BracketSection />
        <DetailsSection />
        <RulesSection />
        <LinksSection />
      </div>
      <footer className="relative z-10 py-8 text-center text-gray-400 text-base border-t border-gray-900/50">
        Shadows Die Twice – But Speedrunners Rise Eternal!
      </footer>
    </div>
  );
}

export default App;

// Add to index.css or global CSS for animations
/*
@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0); }
}
.animate-float {
  animation: float linear infinite;
}

@keyframes slow-drift {
  0% { background-position: 0 0; }
  100% { background-position: 100px 100px; }
}
.animate-slow-drift {
  animation: slow-drift 20s linear infinite;
}
*/