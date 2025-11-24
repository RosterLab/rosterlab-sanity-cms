"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const conversations = [
  {
    question: "How many weekends did Daniel work this term?",
    answer: "Daniel worked 3 weekends this term (Oct 5-6, Oct 19-20, Nov 2-3).",
  },
  {
    question: "Who worked last Christmas?",
    answer:
      "Dr. Sarah Chen and Dr. James Mitchell worked 25th December in 2025, but not 2024.",
  },
  {
    question:
      "I want Emma and Lucas always scheduled together because they carpool together",
    answer:
      "Both Emma and Lucas should be scheduled together on these shifts: Night shifts (10pm-8am).",
  },
  {
    question: "How many night shifts did I give Sarah?",
    answer:
      "Sarah has been assigned 8 night shifts this month. You can set a max night shift constraint of 6 per month to prevent this.",
  },
  {
    question:
      "Yesterday, Michael told me he felt fatigued - have I given him too many night shifts?",
    answer:
      "You gave Michael 7 night shifts in 10 days. I recommend spacing them at least 3 days to improve his circadian rhythm.",
  },
];

interface Message {
  type: "question" | "answer" | "thinking";
  text: string;
  conversationIndex: number;
}

// Function to shuffle all conversation indices
function shuffleAllConversations(): number[] {
  const indices = [0, 1, 2, 3, 4];
  return indices.sort(() => Math.random() - 0.5);
}

export default function OttoChatWidgetUS() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationQueue, setConversationQueue] = useState<number[]>(() =>
    shuffleAllConversations(),
  );
  const [queuePosition, setQueuePosition] = useState(0);
  const [stage, setStage] = useState(0); // 0: typing question, 1: thinking, 2: typing answer

  const currentConversation = conversations[conversationQueue[queuePosition]];

  useEffect(() => {
    // Stage 0: Show question immediately
    if (stage === 0) {
      // Add question to messages immediately
      setMessages((prev) => [
        ...prev,
        {
          type: "question",
          text: currentConversation.question,
          conversationIndex: queuePosition,
        },
      ]);
      // Calculate reading time based on question length (longer questions = more time)
      // Base time 0.8s + 15ms per character for faster thinking indicator
      const questionReadTime = 800 + currentConversation.question.length * 15;
      const questionTimeout = setTimeout(() => setStage(1), questionReadTime);
      return () => clearTimeout(questionTimeout);
    }

    // Stage 1: Otto thinking (wait 0.8 seconds then show answer)
    if (stage === 1) {
      // Add thinking indicator to messages
      setMessages((prev) => [
        ...prev,
        {
          type: "thinking",
          text: "",
          conversationIndex: queuePosition,
        },
      ]);
      const thinkingTimeout = setTimeout(() => {
        // Remove thinking indicator
        setMessages((prev) => prev.filter((msg) => msg.type !== "thinking"));
        setStage(2);
      }, 800);
      return () => clearTimeout(thinkingTimeout);
    }

    // Stage 2: Show Otto's answer immediately
    if (stage === 2) {
      // Add completed answer to messages immediately
      setMessages((prev) => [
        ...prev,
        {
          type: "answer",
          text: currentConversation.answer,
          conversationIndex: queuePosition,
        },
      ]);
      // Calculate reading time based on answer length (longer answers = more time)
      // Base time 3.2s + 40ms per character (20% faster than previous)
      const answerReadTime = 3200 + currentConversation.answer.length * 40;
      const answerTimeout = setTimeout(() => {
        // Clear messages and move to next question in queue
        setMessages([]);

        const nextPosition = queuePosition + 1;

        // If we've gone through all questions, reshuffle the queue
        if (nextPosition >= conversationQueue.length) {
          setConversationQueue(shuffleAllConversations());
          setQueuePosition(0);
        } else {
          setQueuePosition(nextPosition);
        }

        setStage(0);
      }, answerReadTime);
      return () => clearTimeout(answerTimeout);
    }
  }, [stage, queuePosition, currentConversation, conversationQueue.length]);

  return (
    <div className="w-full min-h-[500px] md:aspect-[4/3] bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg shadow-xl p-6 flex flex-col">
      {/* Chat Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
          <Image
            src="/images/ottopus.png"
            alt="Otto"
            width={28}
            height={28}
            className="rounded-full object-contain"
          />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Otto</h3>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-500">Online</span>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 py-6 space-y-4 overflow-y-auto overflow-x-hidden">
        {/* Render all completed messages */}
        {messages.map((message, index) => {
          if (message.type === "question") {
            return (
              <div key={index} className="flex justify-end">
                <div className="max-w-[85%] bg-[#1c82fd] text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            );
          } else if (message.type === "thinking") {
            return (
              <div key={index} className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1 items-end h-4">
                      <span
                        className="w-1 bg-gray-400 rounded-full"
                        style={{
                          animation: "wave 1.2s ease-in-out infinite",
                          animationDelay: "0ms",
                        }}
                      />
                      <span
                        className="w-1 bg-gray-400 rounded-full"
                        style={{
                          animation: "wave 1.2s ease-in-out infinite",
                          animationDelay: "150ms",
                        }}
                      />
                      <span
                        className="w-1 bg-gray-400 rounded-full"
                        style={{
                          animation: "wave 1.2s ease-in-out infinite",
                          animationDelay: "300ms",
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">
                      Otto is thinking...
                    </span>
                  </div>
                </div>
                <style jsx>{`
                  @keyframes wave {
                    0%,
                    100% {
                      height: 0.5rem;
                    }
                    50% {
                      height: 1rem;
                    }
                  }
                `}</style>
              </div>
            );
          } else if (message.type === "answer") {
            return (
              <div key={index} className="flex justify-start">
                <div className="max-w-[85%] bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-200">
                  <p className="text-sm text-gray-800 leading-relaxed">
                    {message.text}
                  </p>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Chat Input */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-gray-300">
          <input
            type="text"
            placeholder="Ask Otto about your schedule..."
            className="flex-1 bg-transparent outline-none text-sm text-gray-600 sm:hidden"
            disabled
          />
          <input
            type="text"
            placeholder="Ask Otto anything about your schedule..."
            className="flex-1 bg-transparent outline-none text-sm text-gray-600 hidden sm:block"
            disabled
          />
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-4 h-4 text-white transform rotate-45"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
