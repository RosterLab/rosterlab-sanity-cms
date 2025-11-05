"use client";

import Image from "next/image";

const messages = [
  {
    question: "Why is Dr. Martinez flagged for tomorrow's shift?",
    answer:
      "Dr. Martinez would exceed 60 hours this week if assigned tomorrow. I recommend Dr. Chen or Dr. Patel who are both under 50 hours.",
  },
  {
    question: "Who can cover the emergency department on Easter Weekend?",
    answer:
      "Dr. Johnson and Dr. Lee are available and certified for ED. Dr. Johnson worked last Easter, so Dr. Lee would be the fairer choice.",
  },
];

export default function OttoStaticChatFeature1() {
  return (
    <div className="w-full max-w-[550px] mx-auto bg-white rounded-lg shadow-xl p-6 flex flex-col">
      {/* Chat Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
          <Image
            src="/images/ottopus.png"
            alt="Otto"
            width={32}
            height={32}
            className="rounded-full"
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
      <div className="py-6 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className="space-y-3">
            {/* Question */}
            <div className="flex justify-end">
              <div className="max-w-[85%] bg-[#1c82fd] text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
                <p className="text-sm leading-relaxed">{message.question}</p>
              </div>
            </div>

            {/* Answer */}
            <div className="flex justify-start">
              <div className="max-w-[85%] bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-200">
                <p className="text-sm text-gray-800 leading-relaxed">
                  {message.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
