import React from 'react';
import { motion } from 'framer-motion';

// SVG Icons (You might want to put these in a separate components/icons folder)
const DiscordIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M20.24,3.24H3.76A1.76,1.76,0,0,0,2,5V19a1.76,1.76,0,0,0,1.76,1.76H20.24A1.76,1.76,0,0,0,22,19V5A1.76,1.76,0,0,0,20.24,3.24ZM18.06,8.23c-0.65-0.65-1.42-1.07-2.3-1.28A9.74,9.74,0,0,0,12,6.5a9.74,9.74,0,0,0-3.76,0.45c-0.88,0.21-1.65,0.63-2.3,1.28-0.66,0.65-1.08,1.43-1.29,2.31A9.74,9.74,0,0,0,6.5,12a9.74,9.74,0,0,0,0.45,3.76c0.21,0.88,0.63,1.65,1.28,2.3,0.65,0.66,1.43,1.08,2.31,1.29A9.74,9.74,0,0,0,12,17.5a9.74,9.74,0,0,0,3.76-0.45c0.88-0.21,1.65-0.63,2.3-1.28,0.66-0.65,1.08-1.43,1.29-2.31A9.74,9.74,0,0,0,17.5,12a9.74,9.74,0,0,0-0.45-3.76C16.84,9.08,16.21,8.51,15.55,7.85Z" />
    <path d="M12,10.25a2,2,0,1,0,2,2A2,2,0,0,0,12,10.25Zm-4.5,0a2,2,0,1,0,2,2A2,2,0,0,0,7.5,10.25Zm9,0a2,2,0,1,0,2,2A2,2,0,0,0,16.5,10.25Z" />
  </svg>
);

const TwitchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M11.571 6.046h-2.143v4.286H7.286v-4.286H5.143V13.5H1.996L.004 18h5.139v2.143H8.57V18h3.857L17.143 24h-1.071l-2.735-3.214h4.81L23.996 15V.953h-12.425v5.093zM18.857 15l-2.143 2.143H11.57l-2.143-2.143V8.182h9.428V15z" />
  </svg>
);

const FormIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
    />
  </svg>
);

function App() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const linkVariants = {
    hover: { scale: 1.05, boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)' },
    tap: { scale: 0.95 },
  };

  const sectionHeaderVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, delay: 0.2 },
    },
  };

  // Your contestant data
  const contestants = [
    { name: 'WormdogBS', pb: '28:37', seed: 1 },
    { name: 'mommyemma77', pb: '28:56', seed: 2 },
    { name: 'ymir_happy', pb: '29:10', seed: 3 },
    { name: 'sara_toga', pb: '29:50', seed: 4 },
    { name: 'gunjou1213', pb: '30:30', seed: 5 },
    { name: 'zerowww7', pb: '30:46', seed: 6 },
    { name: 'GamingMusume', pb: '31:11', seed: 7 },
    { name: 'gilachi', pb: '36:44', seed: 8 },
    { name: 'leech1208', pb: '39:50', seed: 9 },
  ];

  const firstMatches = [
    { p1: contestants[7], p2: contestants[8], type: 'Play-In Match' }, // gilachi vs leech1208
    { p1: contestants[0], p2: contestants[1], type: 'Round 1' }, // WormdogBS vs mommyemma77
    { p1: contestants[2], p2: contestants[3], type: 'Round 1' }, // ymir_happy vs sara_toga
    { p1: contestants[4], p2: contestants[5], type: 'Round 1' }, // gunjou1213 vs zerowww7
    { p1: contestants[6], p2: { name: '[Play-In Winner]' }, type: 'Round 1' }, // GamingMusume vs Play-In Winner
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#1a1a1a] text-gray-100 font-serif relative overflow-hidden">
      {/* Background elements - Faint cherry blossoms and subtle Japanese patterns */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/sekiro-bg.webp)' }} // Replace with your Sekiro themed background image
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] to-transparent"></div>
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 p-4 md:p-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <header className="py-16 text-center mb-16 relative">
          <motion.img
            src="/sekiro-logo.png" // Replace with your event logo/stylized Sekiro title
            alt="Sekiro Speedrunning Event Logo"
            className="mx-auto h-48 sm:h-64 object-contain mb-4 filter drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 mb-4 filter drop-shadow-[0_0_8px_rgba(255,0,0,0.6)]"
            variants={itemVariants}
          >
            Sekiro Speedrunning Event
          </motion.h1>
          <motion.h2
            className="text-3xl md:text-5xl text-gray-200 font-bold mb-6 italic"
            variants={itemVariants}
          >
            SHURA RACE - Jan 2026
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Welcome, Sekiro enthusiasts! Are you ready to compete in real-time speedrun races against your
            fellow runners? Inspired by Taiga’s Silksong speedrun race contest, we're bringing the thrill
            to Sekiro. Join us for live matches with side-by-side streams and commentary!
          </motion.p>
          <motion.a
            href="https://forms.gle/FwnG3Xt4E3hAat2q8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105 active:scale-95 border-2 border-red-900"
            variants={itemVariants}
          >
            Register Now!
          </motion.a>
        </header>

        {/* Brackets Section */}
        <section className="mb-20">
          <motion.h3
            className="text-4xl font-bold text-center text-red-400 mb-12 relative pb-4 border-b-2 border-red-700"
            variants={sectionHeaderVariants}
          >
            First Match Schedule
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-red-500 rounded-full"></span>
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {/* Play-In Match */}
            <motion.div
              className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-lg p-6 shadow-xl border border-gray-700 flex flex-col items-center justify-between"
              variants={itemVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <h4 className="text-xl font-bold text-orange-400 mb-4 border-b border-orange-600 pb-2 w-full text-center">
                Play-In Match
              </h4>
              <div className="flex flex-col items-center gap-2 text-lg w-full">
                <div className="flex items-center justify-between w-full p-2 bg-gray-900 rounded-md">
                  <span className="flex items-center">
                    {firstMatches[0].p1.name}
                  </span>
                  <span className="text-gray-400 italic">({firstMatches[0].p1.pb})</span>
                </div>
                <span className="text-red-400 font-bold text-xl">VS</span>
                <div className="flex items-center justify-between w-full p-2 bg-gray-900 rounded-md">
                  <span className="flex items-center">
                    {firstMatches[0].p2.name}
                  </span>
                  <span className="text-gray-400 italic">({firstMatches[0].p2.pb})</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-400 text-center">Winner advances to Round 1 against GamingMusume.</p>
            </motion.div>

            {/* Main Round 1 Matches */}
            <motion.div
              className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8"
              variants={containerVariants}
            >
              {firstMatches.slice(1).map((match, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-lg p-6 shadow-xl border border-gray-700 flex flex-col items-center justify-between"
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <h4 className="text-xl font-bold text-red-400 mb-4 border-b border-red-700 pb-2 w-full text-center">
                    Winner's Bracket - {match.type}
                  </h4>
                  <div className="flex flex-col items-center gap-2 text-lg w-full">
                    <div className="flex items-center justify-between w-full p-2 bg-gray-900 rounded-md">
                      <span className="flex items-center">
                        
                        {match.p1.name}
                      </span>
                      {match.p1.pb && <span className="text-gray-400 italic">({match.p1.pb})</span>}
                    </div>
                    <span className="text-red-400 font-bold text-xl">VS</span>
                    <div className="flex items-center justify-between w-full p-2 bg-gray-900 rounded-md">
                      <span className="flex items-center">
                        
                        {match.p2.name}
                      </span>
                      {match.p2.pb && <span className="text-gray-400 italic">({match.p2.pb})</span>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Event Details */}
        <section className="mb-20">
          <motion.h3
            className="text-4xl font-bold text-center text-red-400 mb-12 relative pb-4 border-b-2 border-red-700"
            variants={sectionHeaderVariants}
          >
            Event Details
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-red-500 rounded-full"></span>
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-lg p-8 shadow-xl border border-gray-700"
              variants={itemVariants}
            >
              <h4 className="text-2xl font-bold text-orange-400 mb-4">How Does It Work?</h4>
              <ul className="list-disc list-inside space-y-3 text-lg text-gray-300">
                <li>After runners register, brackets are set in a 1v1 format based on PB.</li>
                <li>Match dates/times will be mutually agreed upon.</li>
                <li>Both runners start the Shura Glitchless run simultaneously.</li>
                <li>We provide a stream layout for easier commentary and hosting.</li>
                <li>PC runners submit mIGT (LiveSplit time), Console runners submit in-game time.</li>
                <li>We will host live matches with side-by-side streams and commentary for live audience.</li>
                <li>Note: If too many matches, we will try to host commentary for as many as possible.</li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-lg p-8 shadow-xl border border-gray-700"
              variants={itemVariants}
            >
              <h4 className="text-2xl font-bold text-orange-400 mb-4">Who Can Participate?</h4>
              <ul className="list-disc list-inside space-y-3 text-lg text-gray-300">
                <li>Every Sekiro speedrunning enthusiast is welcome!</li>
                <li>Initial matchmaking is based on your PB for fair competition.</li>
                <li>**Submission deadline:** Jan 16, 2026 - 10 AM EST</li>
                <li>**Event Host:** Seljuz, with special guests for commentary at{' '}
                  <a
                    href="https://www.twitch.tv/seljuz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:underline flex items-center gap-2 inline-flex"
                  >
                    <TwitchIcon /> twitch.tv/seljuz
                  </a>
                </li>
                <li>**Runs:** Shura Glitchless Run</li>
                <li>**Console players:** Yes, you can join!</li>
                <li>**New to speedrunning:** Yes, you can join! Make sure to practice 😉</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Rules Section */}
        <section className="mb-20">
          <motion.h3
            className="text-4xl font-bold text-center text-red-400 mb-12 relative pb-4 border-b-2 border-red-700"
            variants={sectionHeaderVariants}
          >
            Rules
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-red-500 rounded-full"></span>
          </motion.h3>

          <motion.div
            className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-lg p-8 shadow-xl border border-gray-700"
            variants={itemVariants}
          >
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-300">
              <li>Matches follow official speedrun rules (no glitches allowed for Shura Glitchless).</li>
              <li>Brackets and match schedules will be announced after registration closes.</li>
              <li>**No run resets once the match starts** – safety idols might be your friend!</li>
              <li>
                In case of network issues or stream disconnects, the other runner will be instructed to pause their run.
              </li>
              <li>All event races must be streamed.</li>
            </ul>
          </motion.div>
        </section>

        {/* Important Links */}
        <section className="mb-20">
          <motion.h3
            className="text-4xl font-bold text-center text-red-400 mb-12 relative pb-4 border-b-2 border-red-700"
            variants={sectionHeaderVariants}
          >
            Important Links
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-red-500 rounded-full"></span>
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.a
              href="https://discord.gg/c7XCh5ZnCG"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700 text-center text-white hover:border-blue-500 transition-all duration-300"
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <DiscordIcon className="w-16 h-16 text-blue-400 mb-4" />
              <span className="text-xl font-semibold">Discord Community</span>
              <p className="text-gray-400 mt-2">For updates & queries</p>
            </motion.a>

            <motion.a
              href="https://www.twitch.tv/seljuz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700 text-center text-white hover:border-purple-500 transition-all duration-300"
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <TwitchIcon className="w-16 h-16 text-purple-400 mb-4" />
              <span className="text-xl font-semibold">Host Channel</span>
              <p className="text-gray-400 mt-2">Watch live races</p>
            </motion.a>

            <motion.a
              href="https://forms.gle/FwnG3Xt4E3hAat2q8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700 text-center text-white hover:border-green-500 transition-all duration-300"
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FormIcon className="w-16 h-16 text-green-400 mb-4" />
              <span className="text-xl font-semibold">Registration Form</span>
              <p className="text-gray-400 mt-2">Sign up here!</p>
            </motion.a>
          </div>

          <motion.p
            className="text-center text-gray-400 mt-12 text-lg"
            variants={itemVariants}
          >
            You can also personally contact me on Discord - **Username: SELJUZ**
          </motion.p>
          <motion.p
            className="text-center text-gray-400 mt-4 text-lg"
            variants={itemVariants}
          >
            Any help in co-commentary, suggestions to improve the event etc. is very much welcome and appreciated.
          </motion.p>
        </section>
      </motion.div>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-gray-500 text-sm border-t border-gray-800">
        Hello There!
      </footer>
    </div>
  );
}

export default App;