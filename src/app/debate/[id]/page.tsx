"use client";

import { liveDebate } from "@/lib/mock-data";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import LivePoll from "@/components/LivePoll";

function DebaterPanel({
  name,
  title,
  initials,
  side,
  isSpeaking,
  pollPct,
}: {
  name: string;
  title: string;
  initials: string;
  side: "left" | "right";
  isSpeaking: boolean;
  pollPct: number;
}) {
  const bg = side === "left" ? "bg-forest" : "bg-gold";
  const text = side === "left" ? "text-cream" : "text-charcoal";

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 relative">
      {/* Video placeholder */}
      <div
        className={`w-full aspect-video rounded-xl mb-6 flex items-center justify-center relative overflow-hidden ${
          side === "left" ? "bg-forest/10" : "bg-gold/10"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
        <div
          className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full ${bg} ${text} flex items-center justify-center text-3xl sm:text-4xl font-serif font-bold shadow-xl ${
            isSpeaking ? "speaking-pulse" : ""
          }`}
        >
          {initials}
        </div>

        {/* Speaking indicator */}
        {isSpeaking && (
          <div className="absolute top-3 left-3 flex items-center gap-2 bg-forest/90 text-cream px-3 py-1.5 rounded-full text-xs font-semibold">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-live-pulse" />
            Hadlaya
          </div>
        )}
      </div>

      {/* Speaker info */}
      <div className="text-center">
        <h3 className="font-serif font-bold text-xl sm:text-2xl">{name}</h3>
        <p className="text-charcoal/50 text-sm">{title}</p>
        <div className={`mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold ${
          side === "left" ? "bg-forest/10 text-forest" : "bg-gold/10 text-gold"
        }`}>
          {pollPct}% codad
        </div>
      </div>
    </div>
  );
}

export default function DebatePage() {
  const params = useParams();
  const debateId = params.id as string;
  const d = liveDebate;
  const [voted, setVoted] = useState<string | null>(null);
  const [minutes] = useState(23);
  const [seconds] = useState(47);

  return (
    <div className="min-h-screen bg-cream">
      {/* Header Bar */}
      <div className="bg-forest-dark text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-red-600/90 px-3 py-1 rounded-full text-xs font-bold">
              <span className="w-2 h-2 bg-white rounded-full animate-live-pulse" />
              TOOS AH
            </div>
            <span className="text-cream/60 text-sm hidden sm:inline">|</span>
            <span className="text-cream/80 text-sm">{d.category}</span>
          </div>
          <div className="font-serif font-bold text-lg sm:text-xl text-center flex-1 px-4">
            {d.topic}
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-cream/70">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {d.viewers.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Debate Area */}
          <div className="flex-1">
            {/* Split Screen Debaters */}
            <div className="bg-cream-light rounded-2xl shadow-xl overflow-hidden border-l-4 border-l-forest">
              <div className="flex flex-col sm:flex-row">
                <DebaterPanel
                  name={d.debaters[0].name}
                  title={d.debaters[0].title}
                  initials={d.debaters[0].avatar}
                  side="left"
                  isSpeaking={true}
                  pollPct={d.debaters[0].pollPercentage}
                />
                <div className="hidden sm:flex items-center">
                  <div className="w-px h-full bg-forest/10" />
                </div>
                <div className="sm:hidden h-px bg-forest/10" />
                <DebaterPanel
                  name={d.debaters[1].name}
                  title={d.debaters[1].title}
                  initials={d.debaters[1].avatar}
                  side="right"
                  isSpeaking={false}
                  pollPct={d.debaters[1].pollPercentage}
                />
              </div>
            </div>

            {/* Timer & Controls */}
            <div className="mt-6 bg-cream-light rounded-xl shadow-md p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Timer */}
                <div className="text-center sm:text-left">
                  <p className="text-charcoal/40 text-xs uppercase tracking-wider mb-1">Waqtiga Haray</p>
                  <div className="font-serif text-4xl font-bold text-gold tabular-nums">
                    {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                  </div>
                </div>

                {/* Currently Speaking */}
                <div className="flex items-center gap-3 bg-forest/5 px-5 py-3 rounded-xl">
                  <span className="w-3 h-3 bg-green-500 rounded-full animate-live-pulse" />
                  <div>
                    <p className="text-xs text-charcoal/40">Hadda Hadlaya</p>
                    <p className="font-serif font-bold text-forest">{d.debaters[0].name}</p>
                  </div>
                </div>

                {/* Vote Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setVoted(d.debaters[0].name)}
                    className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
                      voted === d.debaters[0].name
                        ? "bg-forest text-cream shadow-lg"
                        : "bg-forest/10 text-forest hover:bg-forest/20"
                    }`}
                  >
                    {d.debaters[0].avatar}
                  </button>
                  <button
                    onClick={() => setVoted(d.debaters[1].name)}
                    className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
                      voted === d.debaters[1].name
                        ? "bg-gold text-charcoal shadow-lg"
                        : "bg-gold/10 text-gold hover:bg-gold/20"
                    }`}
                  >
                    {d.debaters[1].avatar}
                  </button>
                </div>
              </div>

              {/* Join Live Room */}
              <div className="mt-6 flex justify-center">
                <Link
                  href={`/debate/join/${debateId}`}
                  className="inline-flex items-center gap-2 bg-forest text-cream px-8 py-3 rounded-full font-semibold hover:bg-forest-light transition-colors shadow-lg hover:shadow-xl"
                >
                  <span className="w-2.5 h-2.5 bg-red-400 rounded-full animate-live-pulse" />
                  Ku Biir Qolka Tooska ah
                </Link>
              </div>

            </div>

            {/* Live Poll */}
            <div className="mt-6">
              <LivePoll
                debateId={debateId}
                debaterAName={d.debaters[0].name}
                debaterBName={d.debaters[1].name}
              />
            </div>
          </div>

          {/* Comment Feed */}
          <div className="w-full lg:w-80 xl:w-96">
            <div className="bg-cream-light rounded-2xl shadow-xl overflow-hidden h-full flex flex-col">
              <div className="bg-forest/5 px-5 py-3 border-b border-forest/10 flex items-center justify-between">
                <h3 className="font-serif font-bold text-forest">Faallooyinka</h3>
                <span className="text-xs text-charcoal/40">{d.comments.length} faallo</span>
              </div>

              <div className="flex-1 overflow-y-auto comment-feed p-4 space-y-3 max-h-[500px] lg:max-h-none">
                {d.comments.map((comment) => (
                  <div key={comment.id} className="group">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-forest/10 flex items-center justify-center text-xs font-bold text-forest shrink-0">
                        {comment.user[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className="font-semibold text-sm text-charcoal">{comment.user}</span>
                          <span className="text-xs text-charcoal/30">{comment.time}</span>
                        </div>
                        <p className="text-sm text-charcoal/70 mt-0.5">{comment.text}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Extra mock comments for scrolling */}
                {[
                  { user: "Nasra_M", text: "Waa dood aad u wanaagsan!" },
                  { user: "Jaamac_A", text: "Cabdirashiid xujada waa xooggan" },
                  { user: "Deeqa_H", text: "Labadaba waa dad aqoon leh" },
                  { user: "Bile_C", text: "Soomaaliya ha noolaato 🇸🇴" },
                ].map((c, i) => (
                  <div key={`extra-${i}`} className="group">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-xs font-bold text-gold shrink-0">
                        {c.user[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className="font-semibold text-sm text-charcoal">{c.user}</span>
                          <span className="text-xs text-charcoal/30">hadda</span>
                        </div>
                        <p className="text-sm text-charcoal/70 mt-0.5">{c.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comment Input */}
              <div className="p-4 border-t border-forest/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Faallo qor..."
                    className="flex-1 bg-cream rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forest/20 placeholder:text-charcoal/30"
                    readOnly
                  />
                  <button className="bg-forest text-cream w-10 h-10 rounded-full flex items-center justify-center hover:bg-forest-light transition-colors shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
