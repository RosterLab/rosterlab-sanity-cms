"use client";

import { ottoText } from "./otto-copy";
import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import backgrounds from "./backgrounds.module.css";

const examples = [
  {
    label: "Fairness",
    question: "Who worked last Christmas?",
    answer: [
      "Last Christmas Day was covered by Zac, Daniel and Becca.",
      "Daniel and Becca are rostered again this Christmas Day.",
    ],
  },
  {
    label: "Fatigue",
    question: "Are there any fatigue risks next week?",
    answer: [
      "I found one short turnaround. Priya has eight hours between her Tuesday evening and Wednesday morning shifts.",
      "Your roster requires ten hours between shifts.",
    ],
  },
  {
    label: "Coverage",
    question: "Are there any gaps in overnight cover?",
    answer: [
      "Yes. Thursday’s overnight shift has two staff assigned and requires three.",
      "The other overnight shifts meet their staffing requirements.",
    ],
  },
] as const;

export default function OttoAnswerDemo({ isUS = false }: { isUS?: boolean }) {
  const [{ topic, characters }, setPlayback] = useState({ topic: 0, characters: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const demoRef = useRef<HTMLDivElement>(null);
  const responseId = useId();
  const selected = examples[topic];
  const messages = useMemo(
    () => selected.answer.map((message) => ottoText(message, isUS)),
    [selected, isUS],
  );
  const replyGap = 18;
  const totalCharacters = messages.reduce((total, message) => total + message.length, 0)
    + (messages.length - 1) * replyGap;
  const isComplete = reduceMotion || isPaused || characters >= totalCharacters;

  useEffect(() => {
    const node = demoRef.current;
    if (!node) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.35 });
    observer.observe(node);

    return () => {
      observer.disconnect();
      preference.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    if (!isVisible || isPaused || reduceMotion) return;

    const timer = window.setTimeout(() => {
      setPlayback((current) =>
        isComplete
          ? { topic: (current.topic + 1) % examples.length, characters: 0 }
          : { ...current, characters: Math.min(current.characters + 3, totalCharacters) },
      );
    }, isComplete ? 10000 : characters === 0 ? 450 : 55);

    return () => window.clearTimeout(timer);
  }, [characters, isComplete, isPaused, isVisible, reduceMotion, topic, totalCharacters]);

  return (
    <div ref={demoRef} className={`${backgrounds.role} grid content-center gap-4 rounded-2xl p-3 sm:p-5 lg:min-h-[30rem] xl:p-7`}>
      <div
        role="group"
        aria-label="Example question topics"
        className="flex flex-wrap justify-center gap-2"
      >
        {examples.map((example, index) => (
          <button
            key={example.label}
            type="button"
            aria-pressed={selected.label === example.label}
            aria-controls={responseId}
            onClick={() => setPlayback({ topic: index, characters: 0 })}
            className={`min-h-11 rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
              selected.label === example.label
                ? "bg-[#1F2A5C] text-white"
                : "bg-white text-[#1F2A5C] hover:bg-blue-50"
            }`}
          >
            {example.label}
          </button>
        ))}
        {!reduceMotion && (
          <button
            type="button"
            onClick={() => {
              if (!isPaused) setPlayback({ topic, characters: totalCharacters });
              setIsPaused(!isPaused);
            }}
            className="min-h-11 rounded-full border border-[#1F2A5C]/25 px-3 text-xs font-semibold text-[#1F2A5C] hover:bg-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            {isPaused ? "Play examples" : "Pause examples"}
          </button>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-[#1F2A5C]/10">
        <div className="border-b border-[#ECEEF0] px-4 py-3 sm:px-5 sm:py-4">
          <p className="text-xl font-semibold leading-tight text-[#242B30]">Otto</p>
          <p className="mt-1 text-sm text-[#48515B]">{ottoText("Your AI rostering assistant", isUS)}</p>
        </div>
        <div id={responseId} className="grid min-h-[17rem] content-start gap-3 p-4 sm:gap-4 sm:p-5">
          <p className={`${backgrounds.userMessage} ${backgrounds.userBubble}`}>
            {ottoText(selected.question, isUS)}
          </p>
          <div className="grid grid-cols-[1.75rem_minmax(0,1fr)] items-end gap-2 sm:grid-cols-[2.25rem_minmax(0,1fr)] sm:gap-3">
            <Image
              src="/landing/otto/answer-mascot.webp"
              alt=""
              width={36}
              height={37}
              className="h-auto w-full object-contain"
            />
            <div className="grid gap-2.5">
              <div aria-live="polite" aria-atomic="true" className="sr-only">
                {isComplete ? messages.join(" ") : ""}
              </div>
              {messages.map((message, index) => {
                const start = messages.slice(0, index).reduce(
                  (total, previous) => total + previous.length + replyGap,
                  0,
                );
                const visible = isComplete ? message : message.slice(0, Math.max(0, characters - start));

                if (!visible) return null;

                return (
                  <p key={message} aria-hidden="true" className="grid w-fit rounded-2xl rounded-bl-sm bg-[#EEF0F2] px-4 py-3 text-sm leading-snug text-[#242B30] lg:text-base">
                    <span className="invisible col-start-1 row-start-1">{message}</span>
                    <span className="col-start-1 row-start-1">{visible}</span>
                  </p>
                );
              })}
              <div
                aria-hidden="true"
                className={`flex w-fit items-center gap-1 rounded-full rounded-bl-sm bg-[#EEF0F2] px-3 py-2.5 ${isComplete ? "invisible" : ""}`}
              >
                {[0, 1, 2].map((dot) => (
                  <span key={dot} className={`${backgrounds.typingDot} size-1.5 rounded-full bg-slate-500`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
