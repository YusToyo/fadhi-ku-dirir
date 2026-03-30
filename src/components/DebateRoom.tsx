"use client";

import {
  LiveKitRoom,
  VideoTrack,
  AudioTrack,
  useParticipants,
  useTracks,
  useLocalParticipant,
  useRoomContext,
} from "@livekit/components-react";
import "@livekit/components-styles";
import {
  Track,
  RoomEvent,
  RemoteParticipant,
} from "livekit-client";
import { useState, useEffect, useCallback, useRef } from "react";

const DEFAULT_TURN_DURATION = 300; // 5 minutes in seconds

// --- Types ---
interface TimerMessage {
  type: "TIMER_START" | "TIMER_TICK" | "TIMER_SWITCH" | "TIMER_PAUSE";
  speakerIndex?: number;
  duration?: number;
  timeLeft?: number;
}

// --- Web Audio beep ---
function playDing() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.8);
  } catch {
    // Silently fail if audio context not available
  }
}

// --- Debater Video ---
function DebaterVideo({
  participant,
  side,
  isSpeaking,
  statusLabel,
}: {
  participant: { identity: string; name?: string; sid: string };
  side: "left" | "right";
  isSpeaking: boolean;
  statusLabel: string;
}) {
  const tracks = useTracks([Track.Source.Camera]);
  const videoTrack = tracks.find(
    (t) => t.participant.identity === participant.identity
  );

  const bg = side === "left" ? "bg-forest/10" : "bg-gold/10";
  const badge =
    side === "left" ? "bg-forest text-cream" : "bg-gold text-charcoal";
  const initial = (participant.name || participant.identity)
    .slice(0, 2)
    .toUpperCase();
  const speakingRing = isSpeaking ? "ring-4 ring-forest shadow-lg" : "";

  return (
    <div className="flex-1 flex flex-col items-center p-3 sm:p-4 min-w-0">
      <div
        className={`w-full aspect-video rounded-xl overflow-hidden ${bg} relative flex items-center justify-center transition-all duration-300 ${speakingRing}`}
      >
        {videoTrack ? (
          <VideoTrack
            trackRef={videoTrack}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full ${badge} flex items-center justify-center text-2xl sm:text-3xl font-serif font-bold shadow-xl ${isSpeaking ? "speaking-pulse" : ""}`}
          >
            {initial}
          </div>
        )}
        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
          {participant.name || participant.identity}
        </div>
      </div>
      <div
        className={`mt-2 text-xs font-semibold px-3 py-1 rounded-full ${
          isSpeaking
            ? "bg-forest text-cream"
            : "bg-charcoal/10 text-charcoal/50"
        }`}
      >
        {statusLabel}
      </div>
    </div>
  );
}

// --- Audience Counter ---
function AudienceCounter() {
  const participants = useParticipants();
  const room = useRoomContext();
  const [count, setCount] = useState(participants.length);

  const updateCount = useCallback(() => {
    setCount(room.numParticipants);
  }, [room]);

  useEffect(() => {
    setCount(participants.length);
    room.on(RoomEvent.ParticipantConnected, updateCount);
    room.on(RoomEvent.ParticipantDisconnected, updateCount);
    return () => {
      room.off(RoomEvent.ParticipantConnected, updateCount);
      room.off(RoomEvent.ParticipantDisconnected, updateCount);
    };
  }, [room, participants.length, updateCount]);

  return (
    <div className="flex items-center gap-1.5 text-charcoal/60">
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
      <span className="text-sm font-semibold">{count}</span>
    </div>
  );
}

// --- Timer Display ---
function TimerDisplay({
  timeLeft,
  isRunning,
}: {
  timeLeft: number;
  isRunning: boolean;
}) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const display = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  let colorClass = "text-forest border-forest/30";
  let bgRing = "stroke-forest";
  if (timeLeft <= 60) {
    colorClass = "text-red-600 border-red-300";
    bgRing = "stroke-red-500";
  } else if (timeLeft <= 120) {
    colorClass = "text-gold border-gold/50";
    bgRing = "stroke-gold";
  }

  const pulsing = timeLeft <= 30 && timeLeft > 0 && isRunning;
  const progress = timeLeft / DEFAULT_TURN_DURATION;
  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference * (1 - progress);

  return (
    <div
      className={`flex flex-col items-center justify-center px-2 sm:px-4 ${pulsing ? "timer-pulse" : ""}`}
    >
      <div className="relative w-28 h-28 sm:w-36 sm:h-36">
        {/* Background circle */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-charcoal/10"
          />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            className={bgRing}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
        {/* Time in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`text-2xl sm:text-3xl font-bold font-mono ${colorClass.split(" ")[0]}`}
          >
            {display}
          </span>
        </div>
      </div>
      {!isRunning && timeLeft === DEFAULT_TURN_DURATION && (
        <span className="text-xs text-charcoal/40 mt-1">Diyaar</span>
      )}
      {!isRunning && timeLeft < DEFAULT_TURN_DURATION && timeLeft > 0 && (
        <span className="text-xs text-gold mt-1 font-semibold">Joojisan</span>
      )}
    </div>
  );
}

// --- Debate Controls with Moderator Panel ---
function DebateControls({
  onLeave,
  isModerator,
  debateStarted,
  isRunning,
  speakerIndex,
  debaterCount,
  onStart,
  onPause,
  onSkip,
  onSelectFirst,
}: {
  onLeave: () => void;
  isModerator: boolean;
  debateStarted: boolean;
  isRunning: boolean;
  speakerIndex: number;
  debaterCount: number;
  onStart: () => void;
  onPause: () => void;
  onSkip: () => void;
  onSelectFirst: (idx: number) => void;
}) {
  const { localParticipant } = useLocalParticipant();
  const [micEnabled, setMicEnabled] = useState(true);
  const [camEnabled, setCamEnabled] = useState(true);
  const canPublish = localParticipant.permissions?.canPublish ?? false;

  const toggleMic = async () => {
    await localParticipant.setMicrophoneEnabled(!micEnabled);
    setMicEnabled(!micEnabled);
  };

  const toggleCam = async () => {
    await localParticipant.setCameraEnabled(!camEnabled);
    setCamEnabled(!camEnabled);
  };

  return (
    <div className="py-3 px-4">
      {/* Moderator controls */}
      {isModerator && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-3 pb-3 border-b border-charcoal/10">
          {!debateStarted ? (
            <>
              {/* Turn selector before start */}
              <div className="flex items-center gap-1 text-xs text-charcoal/60 mr-2">
                Marka hore:
              </div>
              <button
                onClick={() => onSelectFirst(0)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  speakerIndex === 0
                    ? "bg-forest text-cream"
                    : "bg-charcoal/10 text-charcoal/60 hover:bg-charcoal/20"
                }`}
              >
                Doodayaha A
              </button>
              <button
                onClick={() => onSelectFirst(1)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  speakerIndex === 1
                    ? "bg-gold text-charcoal"
                    : "bg-charcoal/10 text-charcoal/60 hover:bg-charcoal/20"
                }`}
              >
                Doodayaha B
              </button>
              <button
                onClick={onStart}
                disabled={debaterCount < 2}
                className="px-5 py-2 rounded-full bg-forest text-cream font-semibold text-sm hover:bg-forest-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed ml-2"
              >
                Bilow Doodda
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onPause}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors ${
                  isRunning
                    ? "bg-gold text-charcoal hover:bg-gold/80"
                    : "bg-forest text-cream hover:bg-forest-light"
                }`}
              >
                {isRunning ? "Jooji" : "Sii Wad"}
              </button>
              <button
                onClick={onSkip}
                className="px-4 py-2 rounded-full bg-charcoal/10 text-charcoal/70 font-semibold text-sm hover:bg-charcoal/20 transition-colors"
              >
                U Gudbi
              </button>
            </>
          )}
        </div>
      )}

      {/* Standard controls */}
      <div className="flex items-center justify-center gap-3">
        {canPublish && (
          <>
            <button
              onClick={toggleMic}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                micEnabled ? "bg-forest text-cream" : "bg-red-500 text-white"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                {micEnabled ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                  />
                )}
              </svg>
            </button>
            <button
              onClick={toggleCam}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                camEnabled ? "bg-forest text-cream" : "bg-red-500 text-white"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                {camEnabled ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                  />
                )}
              </svg>
            </button>
          </>
        )}
        <button
          onClick={onLeave}
          className="px-6 h-12 rounded-full bg-red-500 text-white font-semibold flex items-center gap-2 hover:bg-red-600 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Ka Bax
        </button>
      </div>
    </div>
  );
}

// --- Main Room Content ---
function RoomContent({ onLeave }: { onLeave: () => void }) {
  const participants = useParticipants();
  const room = useRoomContext();
  const { localParticipant } = useLocalParticipant();
  const debaters = participants.filter((p) => p.permissions?.canPublish);
  const audioTracks = useTracks([Track.Source.Microphone], {
    onlySubscribed: true,
  });

  // The first debater to join is the moderator
  const isModerator =
    localParticipant.permissions?.canPublish === true &&
    (debaters.length === 0 ||
      debaters[0]?.identity === localParticipant.identity);

  // Timer state
  const [debateStarted, setDebateStarted] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TURN_DURATION);
  const [speakerIndex, setSpeakerIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Broadcast timer message via LiveKit data channel
  const broadcastTimerMessage = useCallback(
    (msg: TimerMessage) => {
      const data = new TextEncoder().encode(JSON.stringify(msg));
      localParticipant.publishData(data, { reliable: true });
    },
    [localParticipant]
  );

  // Apply auto-mute based on speaker index
  const applyAutoMute = useCallback(
    (newSpeakerIdx: number) => {
      if (!localParticipant.permissions?.canPublish) return;

      const localDebaterIndex = debaters.findIndex(
        (d) => d.identity === localParticipant.identity
      );
      if (localDebaterIndex === -1) return;

      if (localDebaterIndex === newSpeakerIdx) {
        // It's our turn — unmute
        localParticipant.setMicrophoneEnabled(true);
      } else {
        // Not our turn — mute
        localParticipant.setMicrophoneEnabled(false);
      }
    },
    [localParticipant, debaters]
  );

  // Switch speaker turn
  const switchSpeaker = useCallback(
    (nextIdx?: number) => {
      const newIdx = nextIdx ?? (speakerIndex === 0 ? 1 : 0);
      playDing();
      setSpeakerIndex(newIdx);
      setTimeLeft(DEFAULT_TURN_DURATION);
      applyAutoMute(newIdx);

      if (isModerator) {
        broadcastTimerMessage({
          type: "TIMER_SWITCH",
          speakerIndex: newIdx,
        });
      }
    },
    [speakerIndex, isModerator, broadcastTimerMessage, applyAutoMute]
  );

  // Timer countdown (moderator drives the timer)
  useEffect(() => {
    if (!isRunning || !isModerator) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        // Broadcast tick every 5 seconds to keep clients synced
        if (next % 5 === 0 && next >= 0) {
          const data = new TextEncoder().encode(
            JSON.stringify({
              type: "TIMER_TICK",
              timeLeft: next,
              speakerIndex,
            } as TimerMessage)
          );
          localParticipant.publishData(data, { reliable: true });
        }
        if (next <= 0) {
          // Time's up — switch happens in the effect below
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, isModerator, speakerIndex, localParticipant]);

  // When timeLeft hits 0, switch speaker
  useEffect(() => {
    if (timeLeft === 0 && isRunning && debateStarted) {
      switchSpeaker();
    }
  }, [timeLeft, isRunning, debateStarted, switchSpeaker]);

  // Listen for data messages from other participants
  useEffect(() => {
    const handleData = (
      payload: Uint8Array,
      participant?: RemoteParticipant
    ) => {
      // Only process messages from remote participants
      if (!participant) return;

      try {
        const msg: TimerMessage = JSON.parse(
          new TextDecoder().decode(payload)
        );
        switch (msg.type) {
          case "TIMER_START":
            setDebateStarted(true);
            setIsRunning(true);
            setTimeLeft(msg.duration ?? DEFAULT_TURN_DURATION);
            if (msg.speakerIndex !== undefined) {
              setSpeakerIndex(msg.speakerIndex);
              applyAutoMute(msg.speakerIndex);
            }
            break;
          case "TIMER_TICK":
            if (msg.timeLeft !== undefined) setTimeLeft(msg.timeLeft);
            if (msg.speakerIndex !== undefined) setSpeakerIndex(msg.speakerIndex);
            break;
          case "TIMER_SWITCH":
            playDing();
            if (msg.speakerIndex !== undefined) {
              setSpeakerIndex(msg.speakerIndex);
              setTimeLeft(DEFAULT_TURN_DURATION);
              applyAutoMute(msg.speakerIndex);
            }
            break;
          case "TIMER_PAUSE":
            setIsRunning((prev) => !prev);
            break;
        }
      } catch {
        // Ignore non-timer messages
      }
    };

    room.on(RoomEvent.DataReceived, handleData);
    return () => {
      room.off(RoomEvent.DataReceived, handleData);
    };
  }, [room, applyAutoMute]);

  // Moderator controls
  const handleStart = () => {
    if (debaters.length < 2) return;
    setDebateStarted(true);
    setIsRunning(true);
    setTimeLeft(DEFAULT_TURN_DURATION);
    applyAutoMute(speakerIndex);
    broadcastTimerMessage({
      type: "TIMER_START",
      speakerIndex,
      duration: DEFAULT_TURN_DURATION,
    });
  };

  const handlePause = () => {
    setIsRunning((prev) => !prev);
    broadcastTimerMessage({ type: "TIMER_PAUSE" });
  };

  const handleSkip = () => {
    switchSpeaker();
  };

  const handleSelectFirst = (idx: number) => {
    setSpeakerIndex(idx);
  };

  // Derive speaker labels
  const getSpeakerLabel = (debaterIdx: number) => {
    if (!debateStarted) return debaterIdx === 0 ? "Doodayaha A" : "Doodayaha B";
    if (debaterIdx === speakerIndex) return "Hadlaya";
    return "Sugaya";
  };

  const getSpeakerDisplayName = (debaterIdx: number) => {
    if (debaters[debaterIdx]) {
      const name = debaters[debaterIdx].name || debaters[debaterIdx].identity;
      if (debaterIdx === speakerIndex && debateStarted) {
        return `🎙️ ${name} Hadlaya`;
      }
      return `⏳ ${name} Sugaysa`;
    }
    return "";
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Audio tracks */}
      {audioTracks
        .filter((t) => !t.participant.isLocal)
        .map((t) => (
          <AudioTrack key={t.participant.sid + "-audio"} trackRef={t} />
        ))}

      {/* Header */}
      <div className="bg-forest-dark text-cream">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 bg-red-600/90 px-3 py-1 rounded-full text-xs font-bold">
            <span className="w-2 h-2 bg-white rounded-full animate-live-pulse" />
            TOOS AH
          </div>
          <h1 className="font-serif font-bold text-lg">Dood Toos ah</h1>
          <AudienceCounter />
        </div>
      </div>

      {/* Main layout: Debater A | Timer | Debater B */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-cream-light rounded-2xl shadow-xl overflow-hidden border-l-4 border-l-forest">
          {debaters.length > 0 ? (
            <div className="flex flex-col sm:flex-row items-center">
              {/* Debater A */}
              <DebaterVideo
                participant={debaters[0]}
                side="left"
                isSpeaking={debateStarted && speakerIndex === 0}
                statusLabel={getSpeakerLabel(0)}
              />

              {/* Center Timer */}
              <div className="flex flex-col items-center py-4 sm:py-0 sm:px-2">
                <TimerDisplay timeLeft={timeLeft} isRunning={isRunning} />
                {debateStarted && debaters.length >= 2 && (
                  <p className="text-xs text-charcoal/60 mt-2 text-center max-w-[160px] leading-tight">
                    {getSpeakerDisplayName(speakerIndex)}
                  </p>
                )}
              </div>

              {/* Debater B */}
              {debaters.length >= 2 ? (
                <DebaterVideo
                  participant={debaters[1]}
                  side="right"
                  isSpeaking={debateStarted && speakerIndex === 1}
                  statusLabel={getSpeakerLabel(1)}
                />
              ) : (
                <div className="flex-1 flex items-center justify-center py-12 text-charcoal/30">
                  <p className="font-serif text-sm">
                    Sugitaan Doodayaha B...
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center py-20 text-charcoal/40">
              <p className="font-serif text-lg">
                Sugitaan... Doodayaasha wali kama soo galinin
              </p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="mt-4 bg-cream-light rounded-xl shadow-md">
          <DebateControls
            onLeave={onLeave}
            isModerator={isModerator}
            debateStarted={debateStarted}
            isRunning={isRunning}
            speakerIndex={speakerIndex}
            debaterCount={debaters.length}
            onStart={handleStart}
            onPause={handlePause}
            onSkip={handleSkip}
            onSelectFirst={handleSelectFirst}
          />
        </div>
      </div>
    </div>
  );
}

export default function DebateRoom({
  token,
  wsUrl,
  onLeave,
}: {
  token: string;
  wsUrl: string;
  onLeave: () => void;
}) {
  return (
    <LiveKitRoom
      token={token}
      serverUrl={wsUrl}
      connect={true}
      video={true}
      audio={true}
      data-lk-theme="default"
    >
      <RoomContent onLeave={onLeave} />
    </LiveKitRoom>
  );
}
