'use client'

import { useEffect, useState } from 'react'
import AskAiShareBar from './AskAiShareBar'

interface AskAiShareWidgetProps {
  aiPrompt?: string
  /**
   * Page the AI should learn from (without the utm_source param — the widget
   * appends `?utm_source=<provider>_summary` per AI).
   */
  learnFromUrl?: string
  /**
   * Whether the widget starts open. Defaults to closed so it doesn't cover
   * page content on load.
   */
  defaultOpen?: boolean
}

const NUDGE_KEY = 'rl_ai_widget_last_nudge'
const FIRST_NUDGE_DELAY_MS = 10_000
const NUDGE_DURATION_MS = 5_000
// Suppress repeat nudges for this many minutes after one fires.
// Short enough that a returning visitor sees the reminder again, long
// enough that reloading in a burst doesn't spam it.
const NUDGE_COOLDOWN_MS = 20 * 60 * 1000
// After the first nudge on a page, remind again every N seconds while
// the pill is idle (until the user hovers/opens).
const NUDGE_REPEAT_MS = 45_000

export default function AskAiShareWidget({
  aiPrompt = 'Summarise what RosterLab is, how it differs from competitors, and why I should choose it. Reference:',
  learnFromUrl = 'https://rosterlab.com',
  defaultOpen = false,
}: AskAiShareWidgetProps) {
  const [open, setOpen] = useState(defaultOpen)
  const [interacted, setInteracted] = useState(false)
  const [entered, setEntered] = useState(false)
  const [nudge, setNudge] = useState(false)

  // Entrance: slide/fade in after a short delay so users notice it.
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 800)
    return () => clearTimeout(t)
  }, [])

  // Attention nudge: after the user has stayed 10s+ on the page, briefly
  // highlight the expand chevron (pulsing ring + arrow drift). Repeat every
  // 45s while the pill is idle so returning visitors get a reminder, but
  // stop the moment they hover, focus, or open. Cross-page cooldown via
  // localStorage prevents rapid navigation from spamming it.
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (interacted || open) return

    let recentlyNudged = false
    try {
      const raw = window.localStorage.getItem(NUDGE_KEY)
      const last = raw ? parseInt(raw, 10) : 0
      recentlyNudged =
        Number.isFinite(last) && last > 0 && Date.now() - last < NUDGE_COOLDOWN_MS
    } catch {
      recentlyNudged = false
    }

    let stopTimer: ReturnType<typeof setTimeout> | undefined
    let repeatTimer: ReturnType<typeof setInterval> | undefined

    const kick = () => {
      setNudge(true)
      try {
        window.localStorage.setItem(NUDGE_KEY, String(Date.now()))
      } catch {
        // ignore
      }
      stopTimer = setTimeout(() => setNudge(false), NUDGE_DURATION_MS)
    }

    // Initial delay: give a full 10s on first eligible visit, but skip
    // straight to the repeat cadence if we recently nudged elsewhere.
    const firstDelay = recentlyNudged ? NUDGE_REPEAT_MS : FIRST_NUDGE_DELAY_MS
    const startTimer = setTimeout(() => {
      kick()
      repeatTimer = setInterval(kick, NUDGE_REPEAT_MS)
    }, firstDelay)

    return () => {
      clearTimeout(startTimer)
      if (stopTimer) clearTimeout(stopTimer)
      if (repeatTimer) clearInterval(repeatTimer)
    }
  }, [interacted, open])

  const openWidget = () => {
    setInteracted(true)
    setNudge(false)
    setOpen(true)
  }
  const closeWidget = () => {
    setInteracted(true)
    setNudge(false)
    setOpen(false)
  }
  const handleHoverOrFocus = () => {
    setInteracted(true)
    setNudge(false)
  }

  if (open) {
    return (
      <div
        className="fixed inset-x-0 bottom-0 z-40 print:hidden animate-slide-up"
        role="region"
        aria-label="Ask AI about RosterLab"
      >
        <div className="relative bg-white/95 backdrop-blur border-t border-primary-100 shadow-[0_-8px_24px_-12px_rgba(15,23,42,0.15)]">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary-500 via-primary-400 to-secondary-500"
          />
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <AskAiShareBar
              aiPrompt={aiPrompt}
              variant="plain"
              trailingSlot={
                <button
                  type="button"
                  onClick={closeWidget}
                  aria-label="Collapse Ask AI bar"
                  title="Collapse"
                  className="group/collapse ml-2 -mr-1 h-7 w-7 rounded-md text-neutral-500 hover:text-primary-600 hover:bg-primary-50 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors"
                >
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-hover/collapse:-translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                </button>
              }
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`fixed bottom-4 left-4 z-40 print:hidden transition-all duration-500 ${
        entered
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      onMouseEnter={handleHoverOrFocus}
      onFocus={handleHoverOrFocus}
    >
      <div className="relative flex items-center gap-2 rounded-full bg-white border border-primary-100 shadow-lg pl-3 pr-1.5 py-1.5 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 ease-out">
        {/* Label with brand-gradient sparkle */}
        <span className="relative flex items-center gap-1.5 text-sm font-semibold pr-1">
          <span
            aria-hidden="true"
            className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-inner"
          >
            <svg
              className={`w-3 h-3 ${nudge ? 'animate-twinkle motion-reduce:animate-none' : ''}`}
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2 14 9l7 2-7 2-2 7-2-7-7-2 7-2 2-7Z" />
            </svg>
          </span>
          <span className="bg-gradient-to-r from-primary-700 via-primary-600 to-secondary-600 bg-clip-text text-transparent whitespace-nowrap">
            Ask AI about RosterLab:
          </span>
        </span>

        {/* AI icon links — same list as the bar */}
        <AiIconLinks aiPrompt={aiPrompt} learnFromUrl={learnFromUrl} />

        {/* Divider */}
        <span
          aria-hidden="true"
          className="mx-0.5 h-6 w-px bg-neutral-200"
        />

        {/* Expand toggle — separate from icons so clicking a logo doesn't expand */}
        <button
          type="button"
          onClick={openWidget}
          aria-label="Expand to show share and follow options"
          title="Show more"
          className={`group/expand relative inline-flex h-7 w-7 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors ${
            nudge
              ? 'text-primary-600 bg-primary-50'
              : 'text-neutral-500 hover:text-primary-600 hover:bg-primary-50'
          }`}
        >
          {/* Soft ping ring during the nudge window */}
          {nudge && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full bg-primary-400/40 animate-ping motion-reduce:hidden"
            />
          )}
          <svg
            className={`relative w-4 h-4 transition-transform duration-200 group-hover/expand:translate-x-0.5 ${
              nudge ? 'rl-nudge-arrow motion-reduce:animate-none' : ''
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
          <style jsx>{`
            @keyframes rl-nudge-arrow {
              0%,
              100% {
                transform: translateX(0);
              }
              50% {
                transform: translateX(3px);
              }
            }
            .rl-nudge-arrow {
              animation: rl-nudge-arrow 1.1s ease-in-out infinite;
            }
          `}</style>
        </button>
      </div>
    </div>
  )
}

// Inline AI icon links (ChatGPT, Claude, Gemini, Perplexity) for the
// collapsed pill. Kept local so it stays in sync with the expanded bar's set.
function AiIconLinks({
  aiPrompt,
  learnFromUrl,
}: {
  aiPrompt: string
  learnFromUrl: string
}) {
  const providers = [
    {
      key: 'chatgpt',
      label: 'ChatGPT',
      utm: 'chatgpt_summary',
      chatBase: 'https://chatgpt.com/',
      path: 'M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z',
    },
    {
      key: 'claude',
      label: 'Claude',
      utm: 'claude_summary',
      chatBase: 'https://claude.ai/new',
      path: 'M4.709 15.955l4.72-2.647.079-.23-.079-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.755l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.42 1.005 2.234 1.559 3.038.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.729-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.59 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.913-1.312-.011.006z',
    },
    {
      key: 'gemini',
      label: 'Gemini (AI Studio)',
      utm: 'gemini_summary',
      chatBase: 'https://aistudio.google.com/prompts/new_chat',
      queryParam: 'prompt',
      path: 'M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z',
    },
    {
      key: 'perplexity',
      label: 'Perplexity',
      utm: 'perplexity_summary',
      chatBase: 'https://www.perplexity.ai/',
      path: 'M19.785 0v7.272H22.5V17.62h-2.935V24l-7.037-6.194v6.145h-1.091v-6.152L4.392 24v-6.465H1.5V7.188h2.884V0l7.053 6.494V.19h1.09v6.49L19.786 0zm-7.257 9.044v7.319l5.946 5.234V14.44l-5.946-5.397zm-1.099-.08l-5.946 5.398v7.235l5.946-5.234V8.965zm8.136 7.58h1.844V8.349H13.46l6.105 5.54v2.655zm-8.982-8.28H2.59v8.195h1.8v-2.576l6.192-5.62zM5.475 2.476v4.71h5.115l-5.115-4.71zm13.219 0l-5.115 4.71h5.115v-4.71z',
    },
  ]

  const links = providers.map((p) => {
    const separator = learnFromUrl.includes('?') ? '&' : '?'
    const url = `${learnFromUrl}${separator}utm_source=${p.utm}`
    const promptText = `${aiPrompt} ${url}`
    const encoded = encodeURIComponent(promptText)
    const param = 'queryParam' in p ? (p as { queryParam: string }).queryParam : 'q'
    return { ...p, href: `${p.chatBase}?${param}=${encoded}` }
  })

  return (
    <div className="flex items-center gap-0.5">
      {links.map((l) => (
        <a
          key={l.key}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ask ${l.label} about RosterLab`}
          title={l.label}
          className="inline-flex h-7 w-7 items-center justify-center rounded-full text-neutral-700 hover:text-primary-600 hover:bg-primary-50 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-all duration-150 ease-out motion-reduce:transform-none"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d={l.path} />
          </svg>
        </a>
      ))}
    </div>
  )
}
