import React, { useEffect, useState, memo } from "react";
import { motion } from "framer-motion";
import {
  Sword,
  Scroll,
  Users,
  Twitch,
  MessageSquare,
  Skull,
  Flame,
  Play,
  Tv,
  Trophy,
  Crown,
} from "lucide-react";

// --- ANIMATION VARIANTS ---
const FADE_IN_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
// --- DATA: SORTED BY PB TIME (Fastest to Slowest) ---
const CONTESTANTS = [
  { name: "WormdogBS", pb: "28:37", seed: 1 },
  { name: "ramonchi_5", pb: "28:55", seed: 2 },
  { name: "mommyemma77", pb: "28:56", seed: 3 },
  { name: "Holm_GG", pb: "28:57", seed: 4 },
  { name: "ymir_happy", pb: "29:10", seed: 5 },
  { name: "Th38atman", pb: "29:25", seed: 6 },
  { name: "sara_toga", pb: "29:50", seed: 7 },
  { name: "Lecentz", pb: "29:54", seed: 8 },
  { name: "gunjou1213", pb: "30:30", seed: 9 },
  { name: "zerowww7", pb: "30:46", seed: 10 },
  { name: "pennek", pb: "31:05", seed: 11 },
  { name: "GamingMusume", pb: "31:11", seed: 12 },
  { name: "sugarod1", pb: "32:49", seed: 13 },
  { name: "gilachi", pb: "36:44", seed: 14 },
  { name: "leech1208", pb: "39:50", seed: 15 },
];

// --- PAIRINGS: 1 BYE + 7 MATCHES ---
const FIRST_MATCHES = [
  // THE TITAN (Seed 1 gets auto-entry to Round 2)
  { 
    p1: CONTESTANTS[0], 
    p2: { name: "BYE" }, 
    type: "Seed 1 - Qualified R2" 
  },

  // THE GAUNTLET (Seeds 2-15 fight)
  { p1: CONTESTANTS[1], p2: CONTESTANTS[2], type: "Upper Bracket - Round 1" }, // 28:55 vs 28:56 (CLOSE MATCH!)
  { p1: CONTESTANTS[3], p2: CONTESTANTS[4], type: "Upper Bracket - Round 1" }, // 28:57 vs 29:10
  { p1: CONTESTANTS[5], p2: CONTESTANTS[6], type: "Upper Bracket - Round 1" }, // 29:25 vs 29:50
  { p1: CONTESTANTS[7], p2: CONTESTANTS[8], type: "Upper Bracket - Round 1" }, // 29:54 vs 30:30
  { p1: CONTESTANTS[9], p2: CONTESTANTS[10], type: "Upper Bracket - Round 1" }, // 30:46 vs 31:05
  { p1: CONTESTANTS[11], p2: CONTESTANTS[12], type: "Upper Bracket - Round 1" }, // 31:11 vs 32:49
  { p1: CONTESTANTS[13], p2: CONTESTANTS[14], type: "Upper Bracket - Round 1" }, // 36:44 vs 39:50
];

const REGULATIONS = [
  {
    label: "Category",
    desc: "Shura Glitchless. Rulesets are governed by current community speedrun.com standards.",
  },
  {
    label: "Execution",
    desc: "Players are requested to use the layout provided on discord. No quits or resets permitted.",
  },
  {
    label: "Hardware",
    desc: "Multi-platform eligibility (PC/Console). Third-party software or macro assistance is strictly prohibited.",
  },
  {
    label: "Verification",
    desc: "All participants must live broadcast their official matches.",
  },
];

// --- COMPONENTS ---

// 1. The Animated Slash (SVG)
const AnimatedUnderline = () => (
  <motion.svg
    className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-[12px] md:h-[20px] z-0 pointer-events-none"
    viewBox="0 0 100 10"
    preserveAspectRatio="none"
  >
    <motion.path
      d="M 0 5 Q 50 10, 100 5"
      fill="transparent"
      strokeWidth="2"
      stroke="currentColor"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.8 }}
      transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
      className="text-red-600"
      style={{ filter: "drop-shadow(0px 0px 8px rgba(220, 38, 38, 0.8))" }}
    />
  </motion.svg>
);

const SakuraBackground = memo(() => {
  const [petals] = useState(() =>
    Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + "%",
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 20,
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: ["-5vh", "110vh"],
            opacity: [0, 0.5, 0],
            x: [0, 30, -30, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
          className="absolute w-2 h-2 bg-red-500/50 rounded-full blur-[1px]"
          style={{ left: p.left }}
        />
      ))}
    </div>
  );
});

const SectionTitle = memo(({ title, subtitle }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="text-center mb-12"
  >
    <div className="relative inline-block">
      <h3 className="text-4xl md:text-6xl font-['Cinzel_Decorative'] text-stone-100 font-bold uppercase tracking-[0.15em] relative z-10">
        {title}
      </h3>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        className="h-[2px] bg-gradient-to-r from-transparent via-red-700 to-transparent mt-2 mx-auto shadow-[0_0_10px_rgba(185,28,28,0.8)]"
      />
    </div>
    {subtitle && (
      <p className="text-red-600 mt-4 font-['Cinzel'] font-bold tracking-[0.4em] uppercase text-xs opacity-80">
        {subtitle}
      </p>
    )}
  </motion.div>
));

const PlayerRow = memo(({ player, isWinner, isLoser, isBye }) => (
  <div
    className={`relative flex justify-between items-center p-4 border-l-2 transition-all duration-700 
      ${
        isWinner || isBye
          ? "bg-red-950/30 border-red-600 shadow-[inset_0_0_20px_rgba(220,38,38,0.1)]"
          : "bg-stone-950/50 border-stone-800"
      } 
      ${isLoser ? "opacity-30 grayscale" : "opacity-100"}`}
  >
    <div className="relative flex items-center gap-3">
      {isWinner && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-red-500"
        >
          <Trophy size={16} />
        </motion.div>
      )}
      {isBye && (
        <div className="text-yellow-600">
          <Crown size={16} />
        </div>
      )}
      <div className="relative">
        <span
          className={`text-xl font-['Cinzel'] font-bold tracking-wide ${
            isWinner || isBye ? "text-white" : "text-stone-200"
          }`}
        >
          
      <a 
        href={`https://twitch.tv/${player.name}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:text-red-700  transition-colors z-10 relative"
        title={`Visit ${player.name} on Twitch`}
        onClick={(e) => e.stopPropagation()} 
      >
        {player.name}
      </a>
        </span>
        {isLoser && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "110%" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute top-1/2 -left-[5%] h-[2px] bg-red-700 z-20"
          />
        )}
      </div>
    </div>
    <span className="text-xs font-['JetBrains_Mono'] text-stone-500">
      {player.pb ? `PB: ${player.pb}` : "ADVANCING"}
    </span>
  </div>
));

const MatchCard = memo(
  ({
    p1,
    p2,
    type,
    winner = null,
    matchLink = null,
    isLive = false,
    statusText = null,
  }) => {
    const isBye = p2.name === "BYE"; // CHECK IF THIS IS A BYE ROUND
    const isP1Winner = winner === p1.name;
    const isP2Winner = winner === p2.name;
    const isFinished = winner !== null;

    return (
      <motion.div
        variants={FADE_IN_VARIANTS}
        whileHover={{ y: -5 }}
        className={`relative group bg-stone-900/40 backdrop-blur-md border p-6 shadow-2xl overflow-hidden transition-all duration-500 ${
          isBye
            ? "border-yellow-900/30"
            : isLive
            ? "border-red-600/50 ring-1 ring-red-600/20"
            : "border-stone-800/50"
        }`}
      >
        <div className="absolute top-0 right-0 p-2 opacity-[0.03] group-hover:opacity-10 transition-opacity">
          <Skull size={80} />
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <span
              className={`text-[11px] font-['Cinzel'] font-bold uppercase tracking-[0.2em] ${
                isBye ? "text-yellow-600" : "text-red-700"
              }`}
            >
              {type}
            </span>
            {isLive && (
              <span className="flex items-center gap-1.5 px-2 py-0.5 bg-red-600 text-[9px] font-black text-white tracking-widest uppercase animate-pulse rounded-sm">
                <span className="w-1.5 h-1.5 bg-white rounded-full" /> Live
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 relative">
          {/* PLAYER 1 */}
          <PlayerRow
            player={p1}
            isWinner={isP1Winner}
            isLoser={isFinished && !isP1Winner}
            isBye={isBye}
          />

          {!isBye && (
            <>
              <div className="flex justify-center -my-3 relative z-10">
                <div className="bg-stone-900 border border-stone-800 text-[10px] px-3 py-1 font-['Cinzel'] font-black italic transform -skew-x-12 shadow-lg text-stone-500 group-hover:text-red-600 group-hover:border-red-900 transition-colors">
                  VS
                </div>
              </div>
              {/* PLAYER 2 */}
              <PlayerRow
                player={p2}
                isWinner={isP2Winner}
                isLoser={isFinished && !isP2Winner}
              />
            </>
          )}

          {isBye && (
            <div className="mt-2 text-center">
              <span className="text-[10px] font-['JetBrains_Mono'] uppercase tracking-widest text-stone-600">
                Awaiting Challenger from Round 1
              </span>
            </div>
          )}
        </div>

        {(matchLink || isLive) && !isBye && (
          <div className="mt-6 pt-4 border-t border-stone-800/50 flex justify-center">
            <a
              href={matchLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-[10px] font-['Cinzel'] font-bold tracking-[0.3em] uppercase py-2 px-6 bg-white/5 hover:bg-red-700 hover:text-white transition-all duration-300 border border-white/10"
            >
              {isLive ? <Tv size={14} /> : <Play size={14} />}
              {isLive ? "Watch Stream" : "View Replay"}
            </a>
          </div>
        )}
      </motion.div>
    );
  }
);

// --- MAIN APP ---
export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-stone-300 font-['EB_Garamond'] text-lg selection:bg-red-900 overflow-x-hidden">
      <SakuraBackground />

      {/* HERO SECTION */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden border-b border-red-950/30">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505] z-10" />
          <img
            src="/sekirox.gif" // MAKE SURE THIS FILE EXISTS IN PUBLIC FOLDER
            className="w-full h-full object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"
            alt="Sekiro Background"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative z-20 text-center px-4"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="mb-6 inline-block"
          >
            <Flame
              size={48}
              className="text-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)]"
            />
          </motion.div>
          <h1 className="text-6xl md:text-9xl font-['Cinzel_Decorative'] font-black tracking-[-0.05em] text-white drop-shadow-[0_10px_20px_rgba(0,0,0,1)]">
            SEKIRO{" "}
            <span className="relative inline-block text-red-700 z-10">
              SHURA
              <AnimatedUnderline />
            </span>
          </h1>
          <p className="text-xl md:text-2xl font-['Cinzel'] tracking-[0.6em] text-stone-500 mt-6 font-bold uppercase">
            Glitchless Race <span className="text-stone-700 mx-2">|</span> Jan
            2026
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="https://twitch.tv/seljuz"
              target="_blank"
              rel="noreferrer"
              className="bg-red-800 hover:bg-red-700 text-white px-10 py-4 font-['Cinzel'] font-bold text-sm tracking-[0.3em] transition-all uppercase border-b-4 border-red-950 shadow-xl"
            >
              Watch LIVE Races
            </a>
            <a
              href="#brackets"
              className="backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 text-white px-10 py-4 font-['Cinzel'] font-bold text-sm tracking-[0.3em] transition-all uppercase"
            >
              Brackets
            </a>
          </div>
        </motion.div>
      </section>

      {/* SOCIAL LINKS */}
      <section className="py-4 max-w-4xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-50 hover:opacity-100 transition-opacity duration-500">
          <SocialLink
            href="https://discord.gg/c7XCh5ZnCG"
            Icon={MessageSquare}
            label="Discord"
          />
          <SocialLink
            href="https://www.twitch.tv/seljuz"
            Icon={Twitch}
            label="Twitch"
          />
          <SocialLink
            href="https://forms.gle/FwnG3Xt4E3hAat2q8"
            Icon={Scroll}
            label="Register"
          />
        </div>
      </section>

      {/* BRACKETS */}
      <section id="brackets" className="py-24 px-4 max-w-7xl mx-auto">
        <SectionTitle title="The Conflict" subtitle="Round 1 & Byes" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FIRST_MATCHES.map((match, i) => (
            <MatchCard
              key={`${match.p1.name}-${match.p2.name}`}
              {...match}
            />
          ))}
        </div>
      </section>

      {/* INFO SECTION */}
      <section className="py-16 md:py-32 bg-[#080808] border-y border-stone-900/80 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4 mb-10">
                <div className="h-12 w-[2px] bg-red-700" />
                <div>
                  <h2 className="text-3xl md:text-4xl font-['Cinzel'] font-bold text-white tracking-tight">
                    Technical Regulations
                  </h2>
                  <p className="text-red-700 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.3em] mt-1">
                    Official Competition Standards
                  </p>
                </div>
              </div>
              <div className="space-y-8">
                {REGULATIONS.map((item, idx) => (
                  <div key={idx} className="group flex gap-6">
                    <span className="text-stone-700 font-['Cinzel'] text-xl font-bold group-hover:text-red-900 transition-colors">
                      0{idx + 1}
                    </span>
                    <div>
                      <h4 className="text-stone-100 font-bold uppercase tracking-widest text-sm mb-2 font-['Cinzel']">
                        {item.label}
                      </h4>
                      <p className="text-stone-500 leading-relaxed text-sm md:text-base font-sans">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 w-full">
              <div className="bg-stone-900/30 border border-stone-800 p-8 md:p-10 backdrop-blur-sm relative">
                <h3 className="text-xl font-['Cinzel'] font-bold text-white mb-8 border-b border-stone-800 pb-4 tracking-widest uppercase">
                  Event Brief
                </h3>
                <div className="space-y-6">
                  <BriefItem
                    label="Tournament Director"
                    value="Seljuz"
                    Icon={Users}
                  />
                  <BriefItem
                    label="Registration Deadline"
                    value="January 16, 2026"
                    Icon={Scroll}
                  />
                  <BriefItem
                    label="Format"
                    value="Double Elimination"
                    Icon={Sword}
                  />
                </div>
                <div className="mt-10 p-4 bg-red-950/10 border border-red-900/20">
                  <p className="text-[11px] text-stone-400 leading-relaxed italic text-center">
                    Hesitation is Defeat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 text-center border-t border-stone-950 bg-black">
        <p className="text-[11px] font-['Cinzel'] text-stone-800 tracking-[1.5em] uppercase">
          Shinobi Execution
        </p>
      </footer>
    </div>
  );
}

// Helper Components
const SocialLink = ({ href, Icon, label }) => (
  <a
    href={href}
    rel="noopener noreferrer"
    target="_blank"
    className="flex items-center gap-3 hover:text-red-600 transition-colors"
  >
    <Icon size={22} />
    <span className="font-['Cinzel'] font-bold tracking-[0.3em] text-lg uppercase">
      {label}
    </span>
  </a>
);

const BriefItem = ({ label, value, Icon }) => (
  <div className="flex justify-between items-end border-b border-stone-800/50 pb-4">
    <div>
      <p className="text-[10px] text-red-700 font-['JetBrains_Mono'] uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className="text-xl text-stone-200 font-['Cinzel']">{value}</p>
    </div>
    <Icon size={20} className="text-stone-700 mb-1" />
  </div>
);