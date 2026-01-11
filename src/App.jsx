import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Sword,
    Scroll,
    Users,
    ExternalLink,
    Twitch,
    MessageSquare,
    Skull,
    Flame,
} from "lucide-react";
import "./App.css";

// --- ANIMATION VARIANTS ---
const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// --- COMPONENTS ---
const SakuraBackground = () => {
    const [petals, setPetals] = useState([]);
    useEffect(() => {
        const p = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100 + "%",
            delay: Math.random() * 10,
            duration: 15 + Math.random() * 20,
        }));
        setPetals(p);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {petals.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{
                        y: "110vh",
                        opacity: [0, 0.5, 0],
                        x: [0, 30, -30, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear",
                    }}
                    className="absolute w-2 h-2 bg-red-500/20 rounded-full blur-[1px]"
                    style={{ left: p.left }}
                />
            ))}
        </div>
    );
};

const SectionTitle = ({ title, subtitle }) => (
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
);

import { Play, Tv, Trophy, CheckCircle2 } from "lucide-react"; // Add these to your imports



    // Helper component for the Player Rows to keep code clean
    const PlayerRow = ({ player, isWinner, isLoser }) => (
        <div
            className={`relative flex justify-between items-center p-4 border-l-2 transition-all duration-700 
      ${
          isWinner
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

                <div className="relative">
                    <span
                        className={`text-xl font-['Cinzel'] font-bold tracking-wide ${
                            isWinner ? "text-white" : "text-stone-200"
                        }`}
                    >
                        {player.name}
                    </span>
                    {/* Shinobi Slash Animation for Loser */}
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
    );
    
const MatchCard = ({
    p1,
    p2,
    type,
    winner = null, // Name of the winner: e.g., "WormdogBS"
    matchLink = null, // URL for the stream/VOD
    isLive = false, // If true, shows a pulsating "LIVE" badge
    statusText = null, // Custom text like "Finals" or "Rescheduled"
    index,
}) => {
    const isP1Winner = winner === p1.name;
    const isP2Winner = winner === p2.name;
    const isFinished = winner !== null;


    return (
        <motion.div
            variants={fadeIn}
            whileHover={{ y: -5 }}
            className={`relative group bg-stone-900/40 backdrop-blur-md border border-stone-800/50 p-6 shadow-2xl overflow-hidden transition-all duration-500
        ${isLive ? "border-red-600/50 ring-1 ring-red-600/20" : ""}`}
        >
            {/* Background Decorative Skull */}
            <div className="absolute top-0 right-0 p-2 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                <Skull size={80} />
            </div>

            {/* Header Info */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <span className="text-[11px] font-['Cinzel'] font-bold text-red-700 uppercase tracking-[0.4em]">
                        {type}
                    </span>
                    {isLive && (
                        <span className="flex items-center gap-1.5 px-2 py-0.5 bg-red-600 text-[9px] font-black text-white tracking-widest uppercase animate-pulse rounded-sm">
                            <span className="w-1.5 h-1.5 bg-white rounded-full" />{" "}
                            Live
                        </span>
                    )}
                </div>
                {statusText && (
                    <span className="text-[10px] text-stone-600 italic font-['Cinzel']">
                        {statusText}
                    </span>
                )}
            </div>

            {/* Players Section */}
            <div className="flex flex-col gap-3 relative">
                <PlayerRow
                    player={p1}
                    isWinner={isP1Winner}
                    isLoser={isFinished && !isP1Winner}
                />

                <div className="flex justify-center -my-3 relative z-10">
                    <div className="bg-stone-900 border border-stone-800 text-[10px] px-3 py-1 font-['Cinzel'] font-black italic transform -skew-x-12 shadow-lg text-stone-500 group-hover:text-red-600 group-hover:border-red-900 transition-colors">
                        VS
                    </div>
                </div>

                <PlayerRow
                    player={p2}
                    isWinner={isP2Winner}
                    isLoser={isFinished && !isP2Winner}
                />
            </div>

            {/* Call to Action Button (Optional) */}
            {(matchLink || isLive) && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 pt-4 border-t border-stone-800/50 flex justify-center"
                >
                    <a
                        href={matchLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-[10px] font-['Cinzel'] font-bold tracking-[0.3em] uppercase py-2 px-6 bg-white/5 hover:bg-red-700 hover:text-white transition-all duration-300 border border-white/10"
                    >
                        {isLive ? <Tv size={14} /> : <Play size={14} />}
                        {isLive ? "Watch Stream" : "View Replay"}
                    </a>
                </motion.div>
            )}
        </motion.div>
    );
};

export default function App() {
    const contestants = [
        { name: "WormdogBS", pb: "28:37" },
        { name: "mommyemma77", pb: "28:56" },
        { name: "ymir_happy", pb: "29:10" },
        { name: "sara_toga", pb: "29:50" },
        { name: "gunjou1213", pb: "30:30" },
        { name: "zerowww7", pb: "30:46" },
        { name: "GamingMusume", pb: "31:11" },
        { name: "gilachi", pb: "36:44" },
        { name: "leech1208", pb: "39:50" },
    ];

    const firstMatches = [
        { p1: contestants[7], p2: contestants[8], type: "Play-In Match" },
        { p1: contestants[0], p2: contestants[1], type: "Upper Bracket" },
        { p1: contestants[2], p2: contestants[3], type: "Upper Bracket" },
        { p1: contestants[4], p2: contestants[5], type: "Upper Bracket" },
        {
            p1: contestants[6],
            p2: { name: "Play-In Winner" },
            type: "Upper Bracket",
        },
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-stone-300 font-['EB_Garamond'] text-lg selection:bg-red-900">
            <SakuraBackground />

            {/* 1. COMPACT HERO SECTION */}
            <section className="relative h-[65vh] flex items-center justify-center overflow-hidden border-b border-red-950/30">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505] z-10" />
                    <img
                        src="/sekirox.gif"
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
                        <span className="text-red-700 underline decoration-red-900/40 underline-offset-8">
                            SHURA
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl font-['Cinzel'] tracking-[0.6em] text-stone-500 mt-6 font-bold uppercase">
                        Glitchless Race{" "}
                        <span className="text-stone-700 mx-2">|</span> Jan 2026
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center">
                        <a
                            rel="noopener noreferrer"
                            target="_blank"
                            href="https://twitch.tv/seljuz"
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

            <section className="py-24 max-w-4xl mx-auto px-4">
                <div className="flex flex-wrap justify-center gap-12 opacity-50 hover:opacity-100 transition-opacity duration-500">
                    <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href="https://discord.gg/c7XCh5ZnCG"
                        className="flex items-center gap-3 hover:text-red-600 transition-colors"
                    >
                        <MessageSquare size={22} />{" "}
                        <span className="font-['Cinzel'] font-bold tracking-[0.3em] text-lg uppercase">
                            SEKIRO SPEEDRUNNING Discord
                        </span>
                    </a>
                    <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href="https://www.twitch.tv/seljuz"
                        className="flex items-center gap-3 hover:text-red-600 transition-colors"
                    >
                        <Twitch size={22} />{" "}
                        <span className="font-['Cinzel'] font-bold tracking-[0.3em] text-lg uppercase">
                            Watch RACES LIVE HERE
                        </span>
                    </a>
                    <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href="https://forms.gle/FwnG3Xt4E3hAat2q8"
                        className="flex items-center gap-3 hover:text-red-600 transition-colors"
                    >
                        <Scroll size={22} />{" "}
                        <span className="font-['Cinzel'] font-bold tracking-[0.3em] text-lg uppercase">
                            Sign Up
                        </span>
                    </a>
                </div>
            </section>

            {/* 2. MATCHUPS SECTION */}
            <section id="brackets" className="py-24 px-4 max-w-7xl mx-auto">
                <SectionTitle
                    title="The Conflict"
                    subtitle="Opening Matchups"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {firstMatches.map((match, i) => (
                        <MatchCard key={i} index={i} {...match} />
                    ))}
                </div>
            </section>

            {/* 3. INFO SECTION */}
            <section className="py-24 bg-stone-900/10 border-y border-stone-900/50">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="border-l border-red-900/50 pl-10 py-2">
                        <div className="flex items-center gap-4 mb-8">
                            <Scroll className="text-red-700" size={28} />
                            <h2 className="text-3xl font-['Cinzel'] font-bold text-stone-100 tracking-widest">
                                Codex of War
                            </h2>
                        </div>
                        <ul className="space-y-6 text-stone-400 italic leading-relaxed">
                            <li>
                                • Shura Glitchless rules strictly enforced via
                                community standards.
                            </li>
                            <li>
                                • No resets allowed once the starting bell
                                rings.
                            </li>
                            <li>
                                • PC and Console platforms are both permitted
                                for entry.
                            </li>
                            <li>
                                • All runners must provide live proof of honor
                                via stream.
                            </li>
                        </ul>
                    </div>

                    <div className="border-l border-stone-800 pl-10 py-2">
                        <div className="flex items-center gap-4 mb-8">
                            <Users className="text-stone-600" size={28} />
                            <h2 className="text-3xl font-['Cinzel'] font-bold text-stone-100 tracking-widest">
                                The Assembly
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 gap-6 text-sm">
                            <div className="p-6 bg-stone-950/40 border border-stone-900">
                                <p className="text-red-700 font-['Cinzel'] font-bold mb-2 uppercase tracking-widest">
                                    Host
                                </p>
                                <p className="text-stone-200 text-lg">Seljuz</p>
                            </div>
                            <div className="p-6 bg-stone-950/40 border border-stone-900">
                                <p className="text-red-700 font-['Cinzel'] font-bold mb-2 uppercase tracking-widest">
                                    Deadline
                                </p>
                                <p className="text-stone-200 text-lg">
                                    Jan 16, 10 AM
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="py-12 text-center border-t border-stone-950 bg-black">
                <p className="text-[11px] font-['Cinzel'] text-stone-800 tracking-[1.5em] uppercase">
                    Shinobi Execution
                </p>
            </footer>
        </div>
    );
}
