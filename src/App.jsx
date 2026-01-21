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
import BracketEditor from "./BracketEditor";

// --- ANIMATION VARIANTS ---
const FADE_IN_VARIANTS = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const CONTESTANTS = [
    { name: "WormdogBS", pb: "28:37", seed: 1 },
    { name: "albertitotf", pb: "28:50", seed: 2 },
    { name: "ramonchi_5", pb: "28:55", seed: 3 },
    { name: "mommyemma77", pb: "28:56", seed: 4 },
    { name: "Holm_GG", pb: "28:57", seed: 5 },
    { name: "ymir_happy", pb: "29:10", seed: 6 },
    { name: "Th38atman", pb: "29:25", seed: 7 },
    { name: "sara_toga", pb: "29:50", seed: 8 },
    { name: "Lecentz", pb: "29:54", seed: 9 },
    { name: "gunjou1213", pb: "30:30", seed: 10 },
    { name: "zerowww7", pb: "30:46", seed: 11 },
    { name: "ZenoZilch", pb: "30:51", seed: 12 },
    { name: "krrag2", pb: "30:59", seed: 13 },
    { name: "pennek", pb: "31:05", seed: 14 },
    { name: "GamingMusume", pb: "31:11", seed: 15 },
    { name: "Limmitd", pb: "31:40", seed: 16 },
    { name: "sugarod1", pb: "32:49", seed: 17 },
    { name: "banjobunny", pb: "33:36", seed: 18 },
    { name: "gilachi", pb: "36:44", seed: 19 },
    { name: "leech1208", pb: "39:50", seed: 20 },
    { name: "papa_pp69", pb: "59:11", seed: 21 },
];

const FIRST_MATCHES = [
    // Round 1 Pairings (Actual Results Included)
    {
        p1: CONTESTANTS[11],
        p2: CONTESTANTS[12],
        type: "Elimination R1",
        winner: "ZenoZilch",
        matchLink: "https://www.youtube.com/live/DbKLyeGvkdY?si=b4qApfUAvminFW0d&t=954"
    }, // Zeno vs Krrag 
    {
        p1: CONTESTANTS[13],
        p2: CONTESTANTS[14],
        type: "Elimination R1",
        winner: "GamingMusume",
        matchLink: "https://www.youtube.com/live/c1e-cULX3HQ",
    }, // Pennek vs Musume
    {
        p1: CONTESTANTS[15],
        p2: CONTESTANTS[16],
        type: "Elimination R1",
        winner: "Limmitd",
        matchLink: "https://www.youtube.com/live/J86_IBXVN00?si=MC5VdOM7NIPHR2lx&t=13618",
    }, // Limmitd vs Sugarod
    {
        p1: CONTESTANTS[17],
        p2: CONTESTANTS[18],
        type: "Elimination R1",
        winner: "banjobunny",
        matchLink: "https://www.youtube.com/live/J86_IBXVN00?si=hDfHjvfXeLwrRigA&t=8673",
    }, // Banjo vs Gilachi
    {
        p1: CONTESTANTS[19],
        p2: CONTESTANTS[20],
        type: "Elimination R1",
        winner: "papa_pp69",
        matchLink: "https://www.youtube.com/live/J86_IBXVN00?si=CyMsX3EVpMPMUIVe&t=17396",
    }, // Leech vs Papa
 
];

const SECOND_MATCHES = [
    { p1: CONTESTANTS[0], p2: CONTESTANTS[20], type: "Winners R2", status: "WormdogBS vs papa_pp69" },
    { 
        p1: CONTESTANTS[1], 
        p2: CONTESTANTS[17], 
        type: "Winners R2 Result", 
        winner: "albertitotf", 
        matchLink: "https://www.youtube.com/live/u73CbxgfP6c?si=kksrUbfJMIEH5dhK&t=19294"
    },
    { p1: CONTESTANTS[2], p2: CONTESTANTS[7], type: "Winners R2" }, // Sara vs Ramon 
    { p1: CONTESTANTS[3], p2: CONTESTANTS[14], type: "Winners R2", status: "mommyemma77 vs GamingMusume" },
    { p1: CONTESTANTS[4], p2: CONTESTANTS[11], type: "Winners R2", status: "Holm_GG vs ZenoZilch" },
    { p1: CONTESTANTS[5], p2: CONTESTANTS[10], type: "Winners R2 Result", winner: "ymir_happy", matchLink: "https://www.youtube.com/live/G3nxvPQn6rE?si=bYa_HkpnBidwC5Zy&t=4194" },
    { p1: CONTESTANTS[9], p2: CONTESTANTS[6], type: "Winners R2 Result", winner: "gunjou1213", matchLink: "https://www.youtube.com/live/G3nxvPQn6rE?si=W6Tub0my2Fvy0-nz&t=361"  }, 
];

const LOWER_MATCHES_R2 = [
    { 
        p1: CONTESTANTS[13], // pennek
        p2: CONTESTANTS[16], // sugarod1
        type: "Lower R2: Survival", 
        winner: "pennek" ,
        matchLink: "https://www.youtube.com/live/u73CbxgfP6c?si=V_PeStxagsOcuQE_&t=15661"
    },
    { p1: CONTESTANTS[19], p2: CONTESTANTS[18], type: "Lower R2: Survival" }, // Leech vs Gilachi
    { p1: CONTESTANTS[12], p2: { name: "BYE" }, type: "Lower R2: Bye", winner: "krrag2" }, 
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
            style={{
                filter: "drop-shadow(0px 0px 8px rgba(220, 38, 38, 0.8))",
            }}
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
        className={`flex items-center justify-between py-1 transition-all duration-500 ${
            isLoser ? "opacity-40 grayscale" : "opacity-100"
        }`}
    >
        <div className="flex items-center gap-3 relative group/player">
            {/* WINNER/BYE ICON */}
            <div className="w-5 flex justify-center">
                {isWinner && (
                    <Trophy
                        size={16}
                        className="text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]"
                    />
                )}
                {isBye && <Crown size={16} className="text-yellow-600" />}
            </div>

            {/* PLAYER NAME + TWITCH LINK */}
            <div className="relative">
                <a
                    href={`https://twitch.tv/${player.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xl font-['Cinzel'] font-black tracking-tight transition-colors hover:text-red-500 ${
                        isWinner || isBye ? "text-white" : "text-stone-300"
                    }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {player.name}
                </a>

                {/* DEATH SLASH FOR LOSERS */}
                {isLoser && (
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "110%" }}
                        className="absolute top-1/2 -left-[5%] h-[2px] bg-red-700 shadow-[0_0_5px_rgba(185,28,28,0.8)]"
                    />
                )}
            </div>
        </div>
    </div>
));

const MatchCard = memo(
    ({ p1, p2, type, winner = null, matchLink = null, isLive = false }) => {
        const isBye = p2.name === "BYE";
        const isP1Winner = winner === p1.name;
        const isP2Winner = winner === p2.name;
        const isFinished = winner !== null;

        return (
            <motion.div
                variants={FADE_IN_VARIANTS}
                whileHover={{ scale: 1.01, borderColor: "rgba(220,38,38,0.4)" }}
                className={`relative bg-[#080808] border border-stone-800/60 p-4 transition-all duration-300 shadow-2xl overflow-hidden ${
                    isLive
                        ? "border-red-600 ring-1 ring-red-600/20 shadow-red-900/10"
                        : ""
                }`}
            >
                {/* TYPE & STATUS HEADER */}
                <div className="flex justify-between items-center mb-4 border-b border-stone-800/40 pb-2">
                    <span
                        className={`text-[10px] font-['Cinzel'] font-bold uppercase tracking-[0.3em] ${
                            isBye ? "text-yellow-600" : "text-stone-500"
                        }`}
                    >
                        {type}
                    </span>
                    {isLive && (
                        <span className="flex items-center gap-1.5 px-2 py-0.5 bg-red-600 text-[9px] font-black text-white uppercase tracking-tighter animate-pulse rounded-sm">
                            <span className="w-1.5 h-1.5 bg-white rounded-full" />{" "}
                            Live Now
                        </span>
                    )}
                </div>

                {/* MATCHUP AREA */}
                <div className="flex flex-col gap-1">
                    <PlayerRow
                        player={p1}
                        isWinner={isP1Winner}
                        isLoser={isFinished && !isP1Winner}
                        isBye={isBye}
                    />

                    {!isBye && (
                        <div className="flex items-center gap-4 my-1 opacity-20">
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-stone-500" />
                            <span className="text-[10px] font-black italic font-['Cinzel']">
                                VS
                            </span>
                            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-stone-500" />
                        </div>
                    )}

                    <PlayerRow
                        player={p2}
                        isWinner={isP2Winner}
                        isLoser={isFinished && !isP2Winner}
                        isBye={false}
                    />
                </div>

                {/* WATCH VOD / REPLAY BUTTON */}
                {matchLink && !isBye && (
                    <div className="mt-4 pt-4 border-t border-stone-800/40">
                        <a
                            href={matchLink}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center gap-2 w-full text-[10px] font-['Cinzel'] font-bold tracking-[0.2em] uppercase py-2 bg-stone-900 border border-stone-800 hover:bg-red-700 hover:border-red-600 transition-all duration-300"
                        >
                            {isLive ? <Tv size={14} /> : <Play size={14} />}
                            {isLive ? "Enter Stream" : "Watch Full VOD"}
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
                        Glitchless Race{" "}
                        <span className="text-stone-700 mx-2">|</span> Jan 2026
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
                    {/* <SocialLink
                        href="https://forms.gle/FwnG3Xt4E3hAat2q8"
                        Icon={Scroll}
                        label="Register"
                    /> */}
                </div>
            </section>

            {/* BRACKETS SECTION */}
            <section
                id="brackets"
                className="py-24 px-4 max-w-7xl mx-auto space-y-20"
            >
                {/* ROUND 1: THE PLAY-INS */}
                <div>
                    <SectionTitle title="The Conflict" />
                    {/* subtitle="Round 1: Play-ins & Initial Byes"  */}

                    {/* THE NICE DIVIDER */}
                    <div className="relative flex py-12 items-center justify-center">
                        <div
                            className="absolute inset-0 flex items-center"
                            aria-hidden="true"
                        >
                            <div className="w-full border-t border-red-900/40"></div>
                        </div>
                        <div className="relative bg-[#0c0c0c] px-6 flex flex-col items-center">
                            <span className="text-red-600 font-black italic tracking-[0.3em] text-2xl uppercase">
                                Round 1: Play-ins
                            </span>
                            <div className="h-1 w-24 bg-red-600 mt-2 shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {FIRST_MATCHES.map((match, i) => (
                            <MatchCard
                                key={`r1-${i}-${match.p1.name}`}
                                {...match}
                            />
                        ))}
                    </div>
                </div>

                {/* THE NICE DIVIDER */}
                <div className="relative flex py-12 items-center justify-center">
                    <div
                        className="absolute inset-0 flex items-center"
                        aria-hidden="true"
                    >
                        <div className="w-full border-t border-red-900/40"></div>
                    </div>
                    <div className="relative bg-[#0c0c0c] px-6 flex flex-col items-center">
                        <span className="text-red-600 font-black italic tracking-[0.3em] text-2xl uppercase">
                            Round 2: The Top 16
                        </span>
                        <div className="h-1 w-24 bg-red-600 mt-2 shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
                    </div>
                </div>

                {/* ROUND 2: THE TOP 16 MATCHUPS */}
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {SECOND_MATCHES.map((match, i) => (
                            <MatchCard
                                key={`r2-${i}-${match.p1.name}`}
                                {...match}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* LOWER BRACKET R2 */}
            <section
                id="lower-bracket-r2"
                className="pb-12 px-4 max-w-7xl mx-auto space-y-12"
            >
                <div className="relative flex py-12 items-center justify-center">
                    <div
                        className="absolute inset-0 flex items-center"
                        aria-hidden="true"
                    >
                        <div className="w-full border-t border-orange-900/30"></div>
                    </div>
                    <div className="relative bg-[#0c0c0c] px-8 flex flex-col items-center">
                        <span className="text-orange-600 font-['Cinzel'] font-black italic tracking-[0.4em] text-2xl uppercase">
                            The Abyss
                        </span>
                        <p className="text-[10px] text-stone-500 font-bold uppercase tracking-[0.2em] mt-2 text-center">
                            Lower Bracket R2 — Survival Matches
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {LOWER_MATCHES_R2.map((match, i) => (
                        <MatchCard key={`lower-r2-${i}`} {...match} />
                    ))}
                </div>
            </section>

            {/* <BracketEditor /> */}

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
