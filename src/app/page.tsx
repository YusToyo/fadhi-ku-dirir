import Link from "next/link";
import Image from "next/image";
import { liveDebate, upcomingDebates, communityPollTopics } from "@/lib/mock-data";

function DebaterAvatar({ initials, side }: { initials: string; side: "left" | "right" }) {
  return (
    <div
      className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-xl sm:text-2xl font-serif font-bold shadow-lg ${
        side === "left"
          ? "bg-forest text-cream"
          : "bg-gold text-charcoal"
      }`}
    >
      {initials}
    </div>
  );
}

export default function HomePage() {
  const d = liveDebate;

  return (
    <div className="mic-pattern">
      {/* Hero Section */}
      <section className="hero-gradient text-cream py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 border border-cream/20 rounded-full" />
          <div className="absolute bottom-10 right-10 w-60 h-60 border border-cream/20 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-cream/10 rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <Image src="/logo.jpg" alt="Fadhi Ku Dirir" width={80} height={80} className="rounded-lg shadow-xl" />
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">
              The Somali<br />
              <span className="text-gold">Debate Platform</span>
            </h1>
            <p className="text-xl sm:text-2xl text-cream/80 font-light mb-8">
              Watch, Vote, Decide
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/debate/live-1"
                className="bg-gold text-charcoal px-8 py-3.5 rounded-full font-semibold text-lg hover:bg-gold-light transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-live-pulse" />
                Watch Live
              </Link>
              <Link
                href="/debate/live-1"
                className="border-2 border-cream/40 text-cream px-8 py-3.5 rounded-full font-semibold text-lg hover:bg-cream/10 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="22" />
                </svg>
                Join Audience
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Live Debate */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-live-pulse" />
              TOOS — LIVE NOW
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest">Doodda Socota</h2>
          </div>

          <Link href="/debate/live-1" className="block">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
              <div className="bg-forest/5 px-6 py-4 border-b border-forest/10">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-charcoal text-center">
                  {d.topic}
                </h3>
                <p className="text-charcoal/50 text-sm text-center mt-1">{d.topicEn}</p>
              </div>

              <div className="p-6 sm:p-10">
                <div className="flex items-center justify-between gap-4 sm:gap-8">
                  <div className="flex-1 text-center">
                    <div className="flex justify-center">
                      <DebaterAvatar initials={d.debaters[0].avatar} side="left" />
                    </div>
                    <h4 className="font-serif font-bold text-lg mt-3">{d.debaters[0].name}</h4>
                    <p className="text-charcoal/50 text-sm">{d.debaters[0].title}</p>
                  </div>

                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center">
                      <span className="font-serif font-bold text-gold text-lg">VS</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-charcoal/50 text-sm">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {d.viewers.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex-1 text-center">
                    <div className="flex justify-center">
                      <DebaterAvatar initials={d.debaters[1].avatar} side="right" />
                    </div>
                    <h4 className="font-serif font-bold text-lg mt-3">{d.debaters[1].name}</h4>
                    <p className="text-charcoal/50 text-sm">{d.debaters[1].title}</p>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-forest">{d.debaters[0].name} — {d.debaters[0].pollPercentage}%</span>
                    <span className="text-gold">{d.debaters[1].name} — {d.debaters[1].pollPercentage}%</span>
                  </div>
                  <div className="h-4 bg-cream-dark rounded-full overflow-hidden flex">
                    <div
                      className="bg-forest h-full rounded-l-full transition-all duration-1000"
                      style={{ width: `${d.debaters[0].pollPercentage}%` }}
                    />
                    <div
                      className="bg-gold h-full rounded-r-full transition-all duration-1000"
                      style={{ width: `${d.debaters[1].pollPercentage}%` }}
                    />
                  </div>
                  <p className="text-center text-charcoal/40 text-xs mt-2">Codeynta tooska ah — Live Poll</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Upcoming Debates */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest text-center mb-10">
            Doodaha Soo Socda
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingDebates.map((debate) => (
              <div
                key={debate.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden group"
              >
                <div className="bg-forest/5 p-4 border-b border-forest/10">
                  <span className="text-xs font-semibold text-forest/60 uppercase tracking-wider">
                    {debate.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif font-bold text-lg mb-1 group-hover:text-forest transition-colors">
                    {debate.topic}
                  </h3>
                  <p className="text-charcoal/40 text-sm mb-4">{debate.topicEn}</p>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-forest text-cream flex items-center justify-center text-xs font-bold border-2 border-white">
                        {debate.debaters[0].avatar}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gold text-charcoal flex items-center justify-center text-xs font-bold border-2 border-white">
                        {debate.debaters[1].avatar}
                      </div>
                    </div>
                    <div className="text-sm text-charcoal/60">
                      {debate.debaters[0].name} vs {debate.debaters[1].name}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-charcoal/50">
                      <span className="font-medium">
                        {new Date(debate.date).toLocaleDateString("so-SO", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      {" "}&middot; {debate.time}
                    </div>
                    <button className="text-sm font-semibold text-forest border border-forest/30 px-4 py-1.5 rounded-full hover:bg-forest hover:text-cream transition-all">
                      Xasuusi
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest text-center mb-12">
            Sidee u Shaqeysaa?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Dooro Dood",
                titleEn: "Choose a Debate",
                desc: "Ka dooro doodaha socda ama kuwa soo socda ee aad xiisaynayso.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ),
              },
              {
                step: "2",
                title: "Daawad & Codee",
                titleEn: "Watch Live & Vote",
                desc: "Si toos ah u daawad doodda oo u codeey qofka aad taageerto.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                step: "3",
                title: "Arag Natiijada",
                titleEn: "See Who Wins",
                desc: "Eeg qofka uu dadweynuhu taageeray oo gaaray guusha doodda.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.step} className="text-center group">
                <div className="w-20 h-20 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-5 text-forest group-hover:bg-forest group-hover:text-cream transition-all duration-300">
                  {item.icon}
                </div>
                <div className="text-gold font-serif font-bold text-sm mb-1">Tallaabada {item.step}</div>
                <h3 className="font-serif font-bold text-xl mb-1">{item.title}</h3>
                <p className="text-charcoal/40 text-xs mb-2">{item.titleEn}</p>
                <p className="text-charcoal/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Poll */}
      <section className="py-16 sm:py-20 bg-white/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
              U Codee Mawduuca Xiga
            </h2>
            <p className="text-charcoal/50 mt-2">Vote for the next debate topic</p>
          </div>

          <div className="space-y-4">
            {communityPollTopics.map((topic, i) => (
              <div
                key={topic.id}
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold group-hover:text-forest transition-colors">{topic.topic}</h4>
                    <p className="text-charcoal/40 text-sm">{topic.topicEn}</p>
                  </div>
                  <span className="font-serif font-bold text-lg text-forest">{topic.percentage}%</span>
                </div>
                <div className="h-2 bg-cream rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      i === 0 ? "bg-forest" : i === 1 ? "bg-forest/70" : i === 2 ? "bg-gold" : "bg-gold/60"
                    }`}
                    style={{ width: `${topic.percentage}%` }}
                  />
                </div>
                <p className="text-charcoal/30 text-xs mt-1.5">{topic.votes.toLocaleString()} codad</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
