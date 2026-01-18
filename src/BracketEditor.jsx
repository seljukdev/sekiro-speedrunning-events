import React, { useState, useEffect } from 'react';

// --- YOUR OFFICIAL CONTESTANT LIST ---
const CONTESTANT_NAMES = [
  "WormdogBS", "albertitotf", "ramonchi_5", "mommyemma77", 
  "Holm_GG", "ymir_happy", "Th38atman", "sara_toga", 
  "Lecentz", "gunjou1213", "zerowww7", "ZenoZilch", 
  "krrag2", "pennek", "GamingMusume", "Limmitd", 
  "sugarod1", "banjobunny", "gilachi", "leech1208", "papa_pp69"
].sort(); // Alphabetical for easier finding

const PLAYER_OPTIONS = ["TBD", "BYE", ...CONTESTANT_NAMES];

const EMPTY_MATCH = { p1: 'TBD', p2: 'TBD', winner: '', time: '' };

const INITIAL_STATE = {
  winners: [
    { name: "Winners Round 1 (Play-Ins)", matches: Array(16).fill(null).map(() => ({ ...EMPTY_MATCH })) },
    { name: "Winners Round 2", matches: Array(8).fill(null).map(() => ({ ...EMPTY_MATCH })) },
    { name: "Quarter-Finals", matches: Array(4).fill(null).map(() => ({ ...EMPTY_MATCH })) },
    { name: "Semi-Finals", matches: Array(2).fill(null).map(() => ({ ...EMPTY_MATCH })) },
    { name: "Winners Final", matches: Array(1).fill(null).map(() => ({ ...EMPTY_MATCH })) },
  ],
  losers: [
    { name: "Losers R1", matches: Array(8).fill(null).map(() => ({ ...EMPTY_MATCH })) },
    { name: "Losers R2", matches: Array(4).fill(null).map(() => ({ ...EMPTY_MATCH })) },
    { name: "Losers Final", matches: Array(1).fill(null).map(() => ({ ...EMPTY_MATCH })) },
  ],
  grandFinal: { name: "Grand Final", match: { ...EMPTY_MATCH } }
};

const BracketEditor = () => {
  const [data, setData] = useState(INITIAL_STATE);
  const [isEditMode, setIsEditMode] = useState(false);
  const [password, setPassword] = useState('');
  const [activeBracket, setActiveBracket] = useState('winners');

  useEffect(() => {
    const saved = localStorage.getItem('sekiro_tournament_data');
    if (saved) setData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('sekiro_tournament_data', JSON.stringify(data));
  }, [data]);

  const handleUnlock = () => {
    if (password === 'sekiro2026') {
      setIsEditMode(true);
    } else {
      alert("Unauthorized Access");
    }
  };

  const updateMatch = (bracket, roundIdx, matchIdx, field, value) => {
    const newData = { ...data };
    if (bracket === 'grandFinal') {
      newData.grandFinal.match[field] = value;
    } else {
      newData[bracket][roundIdx].matches[matchIdx][field] = value;
    }
    setData(newData);
  };

  const formatUserTime = (iso) => {
    if (!iso) return "TIME TBD";
    return new Date(iso).toLocaleString([], { 
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  // Helper to render the player selection or display
  const PlayerSlot = ({ bracket, rIdx, mIdx, playerKey, playerName, isWinner }) => {
    if (!isEditMode) {
      return (
        <div className={`p-3 flex justify-between items-center ${isWinner ? 'bg-green-900/30 text-green-400 font-bold' : 'text-gray-300'}`}>
          <span className="truncate">{playerName}</span>
          {isWinner && <span className="text-[10px] ml-2">🏆</span>}
        </div>
      );
    }

    return (
      <div className={`p-2 flex gap-2 items-center border-b border-gray-800 last:border-b-0 ${isWinner ? 'bg-green-900/20' : ''}`}>
        <select 
          className="bg-gray-900 text-white text-xs p-1 rounded w-full border border-gray-700 focus:border-red-500"
          value={playerName}
          onChange={(e) => updateMatch(bracket, rIdx, mIdx, playerKey, e.target.value)}
        >
          {PLAYER_OPTIONS.map(name => <option key={name} value={name}>{name}</option>)}
        </select>
        <button 
          title="Mark as Winner"
          onClick={() => updateMatch(bracket, rIdx, mIdx, 'winner', playerName)}
          className={`px-2 py-1 rounded text-[10px] font-bold ${isWinner ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
        >
          WIN
        </button>
      </div>
    );
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-gray-200 p-4 font-sans uppercase">
      {/* Admin Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 border-b-2 border-red-900 pb-4 gap-4">
        <h1 className="text-2xl font-black italic text-red-600 tracking-widest">Sekiro Tournament Manager</h1>
        
        <div className="flex items-center gap-2 bg-gray-900 p-2 rounded">
          {!isEditMode ? (
            <>
              <input 
                type="password" 
                placeholder="Key" 
                className="bg-black border border-gray-700 px-2 py-1 text-xs rounded"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleUnlock} className="bg-red-800 hover:bg-red-700 text-white px-3 py-1 text-xs font-bold rounded">EDIT</button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-green-500 text-[10px] font-bold">MODE: EDITOR UNLOCKED</span>
              <button onClick={() => setIsEditMode(false)} className="text-gray-400 hover:text-white text-[10px] underline">LOCK VIEW</button>
            </div>
          )}
        </div>
      </div>

      {/* Bracket Toggle */}
      <div className="flex gap-1 mb-8">
        {['winners', 'losers'].map(b => (
          <button 
            key={b}
            onClick={() => setActiveBracket(b)}
            className={`flex-1 py-3 font-bold transition-all ${activeBracket === b ? 'bg-red-800 text-white' : 'bg-gray-900 text-gray-600'}`}
          >
            {b === 'winners' ? 'UPPER BRACKET' : 'LOWER BRACKET'}
          </button>
        ))}
      </div>

      {/* Rounds Display */}
      <div className="overflow-x-auto flex gap-6 pb-10 scrollbar-hide">
        {data[activeBracket].map((round, rIdx) => (
          <div key={rIdx} className="flex-shrink-0 w-64">
            <div className="bg-red-900/20 text-red-500 text-[11px] font-black p-2 mb-4 border-l-2 border-red-600">
              {round.name}
            </div>
            
            <div className="space-y-6">
              {round.matches.map((match, mIdx) => (
                <div key={mIdx} className="bg-[#111] border border-gray-800 rounded shadow-md overflow-hidden">
                  <PlayerSlot 
                    bracket={activeBracket} rIdx={rIdx} mIdx={mIdx} 
                    playerKey="p1" playerName={match.p1} isWinner={match.winner === match.p1 && match.p1 !== 'TBD'} 
                  />
                  <div className="h-[1px] bg-gray-900"></div>
                  <PlayerSlot 
                    bracket={activeBracket} rIdx={rIdx} mIdx={mIdx} 
                    playerKey="p2" playerName={match.p2} isWinner={match.winner === match.p2 && match.p2 !== 'TBD'} 
                  />

                  {/* Time Section */}
                  <div className="bg-black p-2 flex flex-col gap-1 border-t border-gray-900">
                    <span className="text-[9px] text-yellow-600 font-bold">
                      🕒 {formatUserTime(match.time)}
                    </span>
                    {isEditMode && (
                      <input 
                        type="datetime-local" 
                        className="bg-gray-900 text-[9px] text-white p-1 rounded border border-gray-700"
                        value={match.time}
                        onChange={(e) => updateMatch(activeBracket, rIdx, mIdx, 'time', e.target.value)}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Footer Info */}
      <div className="mt-10 text-[10px] text-gray-600 text-center">
        * Times are automatically adjusted to your local timezone.
      </div>
    </div>
  );
};

export default BracketEditor;