"use client";

import { supabase } from "@/lib/supabase";
import { useState, useEffect, useCallback } from "react";

interface LivePollProps {
  debateId: string;
  debaterAName: string;
  debaterBName: string;
}

export default function LivePoll({
  debateId,
  debaterAName,
  debaterBName,
}: LivePollProps) {
  const [votesA, setVotesA] = useState(0);
  const [votesB, setVotesB] = useState(0);
  const [voted, setVoted] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const total = votesA + votesB;
  const pctA = total > 0 ? Math.round((votesA / total) * 100) : 50;
  const pctB = total > 0 ? 100 - pctA : 50;
  const aLeads = votesA >= votesB;

  // Get or create voter ID
  const getVoterId = useCallback(() => {
    let id = localStorage.getItem("fkd_voter_id");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("fkd_voter_id", id);
    }
    return id;
  }, []);

  // Check if already voted
  useEffect(() => {
    const voterId = getVoterId();
    const key = `fkd_vote_${debateId}`;
    const existing = localStorage.getItem(key);
    if (existing) setVoted(existing);

    // Also check server
    supabase
      .from("debate_votes")
      .select("vote_for")
      .eq("debate_id", debateId)
      .eq("voter_id", voterId)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setVoted(data.vote_for);
          localStorage.setItem(key, data.vote_for);
        }
      });
  }, [debateId, getVoterId]);

  // Fetch initial counts
  const fetchCounts = useCallback(async () => {
    const { count: countA } = await supabase
      .from("debate_votes")
      .select("*", { count: "exact", head: true })
      .eq("debate_id", debateId)
      .eq("vote_for", "debaterA");

    const { count: countB } = await supabase
      .from("debate_votes")
      .select("*", { count: "exact", head: true })
      .eq("debate_id", debateId)
      .eq("vote_for", "debaterB");

    setVotesA(countA ?? 0);
    setVotesB(countB ?? 0);
  }, [debateId]);

  useEffect(() => {
    fetchCounts();
  }, [fetchCounts]);

  // Subscribe to realtime changes
  useEffect(() => {
    const channel = supabase
      .channel(`votes_${debateId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "debate_votes",
          filter: `debate_id=eq.${debateId}`,
        },
        (payload) => {
          const voteFor = payload.new.vote_for;
          if (voteFor === "debaterA") setVotesA((v) => v + 1);
          if (voteFor === "debaterB") setVotesB((v) => v + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [debateId]);

  // Cast vote
  const castVote = async (voteFor: "debaterA" | "debaterB") => {
    if (voted || loading) return;
    setLoading(true);

    const voterId = getVoterId();
    const { error } = await supabase.from("debate_votes").insert({
      debate_id: debateId,
      voter_id: voterId,
      vote_for: voteFor,
    });

    if (!error) {
      setVoted(voteFor);
      localStorage.setItem(`fkd_vote_${debateId}`, voteFor);
    }
    setLoading(false);
  };

  return (
    <div className="bg-cream-light rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif font-bold text-forest">Codaynta Tooska ah</h3>
        <span className="text-xs text-charcoal/40">
          {total} cod{total !== 1 ? "ad" : ""}
        </span>
      </div>

      {/* Vote bars */}
      <div className="space-y-3">
        {/* Debater A */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-semibold text-forest">{debaterAName}</span>
            <span className="text-charcoal/50">{pctA}%</span>
          </div>
          <div className="h-8 bg-cream-dark rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-3 ${
                aLeads ? "bg-forest" : "bg-gold"
              }`}
              style={{ width: `${Math.max(pctA, 3)}%` }}
            >
              {pctA > 10 && (
                <span className={`text-xs font-bold ${aLeads ? "text-cream" : "text-charcoal"}`}>
                  {votesA}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Debater B */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-semibold text-gold">{debaterBName}</span>
            <span className="text-charcoal/50">{pctB}%</span>
          </div>
          <div className="h-8 bg-cream-dark rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-3 ${
                !aLeads ? "bg-forest" : "bg-gold"
              }`}
              style={{ width: `${Math.max(pctB, 3)}%` }}
            >
              {pctB > 10 && (
                <span className={`text-xs font-bold ${!aLeads ? "text-cream" : "text-charcoal"}`}>
                  {votesB}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Vote buttons or confirmation */}
      <div className="mt-5">
        {voted ? (
          <div className="text-center py-3 bg-forest/5 rounded-xl">
            <p className="text-forest font-semibold text-sm">
              Codkeygii waa la xusay
            </p>
            <p className="text-charcoal/40 text-xs mt-1">
              {voted === "debaterA" ? debaterAName : debaterBName} ayaad u codaysay
            </p>
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => castVote("debaterA")}
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-forest text-cream font-semibold text-sm hover:bg-forest-light transition-colors disabled:opacity-50"
            >
              Cod {debaterAName}
            </button>
            <button
              onClick={() => castVote("debaterB")}
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-gold text-charcoal font-semibold text-sm hover:bg-gold/80 transition-colors disabled:opacity-50"
            >
              Cod {debaterBName}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
