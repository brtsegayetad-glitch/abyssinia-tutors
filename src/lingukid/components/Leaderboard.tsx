import { useMemo } from 'react';
import { LeaderboardUser, UserProgress } from '../types';
import { INITIAL_LEADERBOARD } from '../data';
import { Trophy, Medal, Sparkles, UserCheck, Flame, ArrowUp } from 'lucide-react';

interface LeaderboardProps {
  progress: UserProgress;
}

export default function Leaderboard({ progress }: LeaderboardProps) {
  
  // Reactively calculate full leaderboard list by merging the current user data
  const sortedLeaderboard = useMemo(() => {
    // Check if current user is already in the general list or if we should add them
    const currentUserRow: LeaderboardUser = {
      rank: 0, // calculated later
      name: progress.userName || "Scholar Child",
      avatar: progress.userAvatar || "🎓",
      xp: progress.xp,
      badge: progress.xp >= 1500 ? "Senior Scribe" : progress.xp >= 600 ? "Conversationalist" : "Novice",
      isCurrentUser: true,
    };

    const combinedList = [...INITIAL_LEADERBOARD, currentUserRow];
    
    // Sort descending based on XP
    const sorted = combinedList.sort((a, b) => b.xp - a.xp);
    
    // Assign proper rankings
    return sorted.map((user, idx) => ({
      ...user,
      rank: idx + 1,
    }));
  }, [progress.xp, progress.userName, progress.userAvatar]);

  // Find where the user resides
  const currentUserStandings = sortedLeaderboard.find((u) => u.isCurrentUser);

  return (
    <div id="leaderboard-section" className="space-y-6 max-w-4xl mx-auto py-4 px-2">
      
      {/* Upper overview card */}
      <div id="leaderboard-header-tile" className="bg-zinc-900 rounded-2xl p-6 text-white space-y-4 shadow-md relative overflow-hidden">
        
        {/* Background visual graphics */}
        <div className="absolute right-0 bottom-0 opacity-10 select-none text-9xl font-mono text-white pointer-events-none translate-y-8 translate-x-4">
          ፩
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-sans font-extrabold tracking-tight">Social Leaderboard</h2>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed max-w-lg">
              Interact with peers and children in the diaspora. Complete more exercises, quiz challenges, and flashcards to climb your way up!
            </p>
          </div>
          
          <div className="flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-lg text-xs font-mono font-bold self-start sm:self-auto">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-300" />
            <span>Weekly Competition Active</span>
          </div>
        </div>

        {/* Current user mini state summary card */}
        {currentUserStandings && (
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{currentUserStandings.avatar}</span>
              <div>
                <span className="block text-xs text-zinc-400 font-mono">Your Current Rank</span>
                <span className="block font-bold font-sans text-sm text-zinc-100 italic">
                  Rank #{currentUserStandings.rank} — {currentUserStandings.name}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="block text-xs text-zinc-400 font-mono">My Points</span>
              <span className="block text-amber-400 font-mono font-bold text-lg">{currentUserStandings.xp} XP</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Leaderboard Table */}
      <div id="leaderboard-list-box" className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
        
        <div className="hidden sm:grid grid-cols-12 gap-2 px-6 py-3 border-b border-zinc-100 text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest bg-zinc-50">
          <div className="col-span-2">Rank</div>
          <div className="col-span-5">Scholar (Name)</div>
          <div className="col-span-3">Title / Achievement Badge</div>
          <div className="col-span-2 text-right">Points (XP)</div>
        </div>

        <div className="divide-y divide-zinc-100">
          {sortedLeaderboard.map((user) => {
            const isTopThree = user.rank <= 3;
            const isUserRow = user.isCurrentUser;

            return (
              <div 
                key={user.rank}
                id={`leaderboard-user-row-${user.rank}`}
                className={`grid grid-cols-12 gap-2 px-6 py-4 items-center transition ${
                  isUserRow 
                    ? 'bg-amber-50/50 hover:bg-amber-50 font-medium border-l-4 border-amber-500' 
                    : 'hover:bg-zinc-50'
                }`}
              >
                
                {/* 1. Rank designation */}
                <div className="col-span-2 sm:col-span-2 flex items-center gap-1.5 font-mono font-bold">
                  {user.rank === 1 && (
                    <span className="w-7 h-7 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center shadow-sm text-xs">
                      <Trophy className="w-3.5 h-3.5 text-amber-600 fill-amber-300" />
                    </span>
                  )}
                  {user.rank === 2 && (
                    <span className="w-7 h-7 bg-slate-100 text-slate-800 rounded-full flex items-center justify-center shadow-sm text-xs">
                      <Medal className="w-3.5 h-3.5 text-slate-600 fill-slate-300" />
                    </span>
                  )}
                  {user.rank === 3 && (
                    <span className="w-7 h-7 bg-orange-100 text-orange-800 rounded-full flex items-center justify-center shadow-sm text-xs">
                      <Medal className="w-3.5 h-3.5 text-orange-600 fill-orange-300" />
                    </span>
                  )}
                  {user.rank > 3 && (
                    <span className="w-7 h-7 font-mono font-bold text-zinc-500 flex items-center justify-center text-sm">
                      {user.rank}
                    </span>
                  )}
                </div>

                {/* 2. Avatar/Name column */}
                <div className="col-span-6 sm:col-span-5 flex items-center gap-3">
                  <span className="text-2xl select-none" role="img" aria-label="avatar">
                    {user.avatar}
                  </span>
                  <div>
                    <h4 className="font-sans font-bold text-sm text-zinc-800 flex items-center gap-1 leading-normal">
                      <span>{user.name}</span>
                      {isUserRow && (
                        <span className="text-[9px] font-mono uppercase bg-amber-600 text-white rounded px-1 py-0.5 leading-none shadow-sm select-none">
                          YOU
                        </span>
                      )}
                    </h4>
                    <span className="block sm:hidden text-[10px] font-mono text-zinc-500 tracking-tight">
                      {user.badge} • <span className="font-bold text-amber-700">{user.xp} XP</span>
                    </span>
                  </div>
                </div>

                {/* 3. Achievements Badge (Desktop only) */}
                <div className="hidden sm:block col-span-3 text-sm text-zinc-600 font-sans">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 border border-zinc-200/50 text-xs font-mono font-medium text-zinc-700">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    {user.badge}
                  </span>
                </div>

                {/* 4. Total points (XP) */}
                <div className="col-span-4 sm:col-span-2 text-right">
                  <span className="font-mono font-extrabold text-sm text-zinc-800 bg-zinc-100/50 px-2.5 py-1 rounded-md border border-zinc-200/50">
                    {user.xp} XP
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Encouragement note */}
      <div id="leaderboard-motivation-note" className="text-center text-xs font-mono text-zinc-400">
        Competing builds retention! Standard leaderboards sync offline locally.
      </div>

    </div>
  );
}
