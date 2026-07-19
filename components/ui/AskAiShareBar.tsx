'use client'

import { useEffect, useState } from 'react'

interface AskAiShareBarProps {
  url?: string
  /** Optional short question to prefill in AI chat links (e.g. "Tell me about RosterLab"). */
  aiPrompt?: string
  /**
   * Visual style. `plain` sits on any background; `branded` adds a soft
   * primary-tinted card with a top brand accent, matching the RosterLab palette.
   */
  variant?: 'plain' | 'branded'
  /**
   * Render each icon in its provider's brand color instead of monochrome.
   * Composes with either `variant`.
   */
  coloredIcons?: boolean
  /**
   * Optional node rendered as the last item in the bar (e.g. a close button
   * when the bar is embedded in a widget). Sits inline, part of the flex row.
   */
  trailingSlot?: React.ReactNode
}

export default function AskAiShareBar({
  url,
  aiPrompt = 'Tell me about RosterLab',
  variant = 'plain',
  coloredIcons = false,
  trailingSlot,
}: AskAiShareBarProps) {
  const [currentUrl, setCurrentUrl] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setCurrentUrl(url || window.location.href)
  }, [url])

  const encodedPrompt = encodeURIComponent(
    `${aiPrompt}. Reference: ${currentUrl}`,
  )

  const aiLinks = {
    chatgpt: `https://chatgpt.com/?q=${encodedPrompt}`,
    claude: `https://claude.ai/new?q=${encodedPrompt}`,
    perplexity: `https://www.perplexity.ai/?q=${encodedPrompt}`,
    gemini: `https://gemini.google.com/app?q=${encodedPrompt}`,
  }

  // RosterLab social accounts (from footer).
  const socialLinks = {
    linkedin: 'https://www.linkedin.com/company/rosterlab/',
    facebook: 'https://www.facebook.com/p/RosterLab-100084645549356/',
    youtube: 'https://www.youtube.com/@rosterlab',
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // no-op
    }
  }

  const iconBtnBase =
    'p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 transition-colors'

  const iconBtn = coloredIcons
    ? `${iconBtnBase} hover:bg-primary-50`
    : `${iconBtnBase} text-neutral-700 hover:text-primary-600 hover:bg-primary-50`

  // Official brand hexes; used only when coloredIcons is on.
  const brand = {
    chatgpt: '#10A37F',
    claude: '#D97757',
    gemini: '#4285F4',
    perplexity: '#22B8CD',
    linkedin: '#0A66C2',
    facebook: '#1877F2',
    youtube: '#FF0000',
    copy: '#0284C7', // primary-600
  }

  const labelClass = 'text-sm font-medium text-neutral-800 mr-1'

  const wrapperClass =
    variant === 'branded'
      ? 'relative overflow-hidden rounded-xl border border-primary-100 bg-gradient-to-r from-primary-50 via-white to-primary-50 px-4 sm:px-6 shadow-sm'
      : ''

  return (
    <div className={wrapperClass}>
      {variant === 'branded' && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary-500 via-primary-400 to-secondary-500"
        />
      )}
      <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-x-8 gap-y-3 py-4 whitespace-nowrap">
      {/* Ask AI group */}
      <div className="flex items-center gap-2">
        <span className={labelClass}>Ask AI about RosterLab:</span>

        <a
          href={aiLinks.chatgpt}
          target="_blank"
          rel="noopener noreferrer"
          className={iconBtn}
          aria-label="Ask ChatGPT about RosterLab"
          title="ChatGPT"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={coloredIcons ? { color: brand.chatgpt } : undefined}
            aria-hidden="true"
          >
            <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
          </svg>
        </a>

        <a
          href={aiLinks.claude}
          target="_blank"
          rel="noopener noreferrer"
          className={iconBtn}
          aria-label="Ask Claude about RosterLab"
          title="Claude"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={coloredIcons ? { color: brand.claude } : undefined}
            aria-hidden="true"
          >
            <path d="M4.709 15.955l4.72-2.647.079-.23-.079-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.755l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.42 1.005 2.234 1.559 3.038.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.729-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.59 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.913-1.312-.011.006z" />
          </svg>
        </a>

        <a
          href={aiLinks.gemini}
          target="_blank"
          rel="noopener noreferrer"
          className={iconBtn}
          aria-label="Ask Gemini about RosterLab"
          title="Gemini"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            fillRule="evenodd"
            style={coloredIcons ? { color: brand.gemini } : undefined}
            aria-hidden="true"
          >
            <path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" />
          </svg>
        </a>

        <a
          href={aiLinks.perplexity}
          target="_blank"
          rel="noopener noreferrer"
          className={iconBtn}
          aria-label="Ask Perplexity about RosterLab"
          title="Perplexity"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={coloredIcons ? { color: brand.perplexity } : undefined}
            aria-hidden="true"
          >
            <path
              fillRule="nonzero"
              d="M19.785 0v7.272H22.5V17.62h-2.935V24l-7.037-6.194v6.145h-1.091v-6.152L4.392 24v-6.465H1.5V7.188h2.884V0l7.053 6.494V.19h1.09v6.49L19.786 0zm-7.257 9.044v7.319l5.946 5.234V14.44l-5.946-5.397zm-1.099-.08l-5.946 5.398v7.235l5.946-5.234V8.965zm8.136 7.58h1.844V8.349H13.46l6.105 5.54v2.655zm-8.982-8.28H2.59v8.195h1.8v-2.576l6.192-5.62zM5.475 2.476v4.71h5.115l-5.115-4.71zm13.219 0l-5.115 4.71h5.115v-4.71z"
            />
          </svg>
        </a>
      </div>

      {/* Follow us — RosterLab social accounts */}
      <div className="flex items-center gap-2">
        <span className={labelClass}>Follow us:</span>

        <a
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={iconBtn}
          aria-label="Follow RosterLab on LinkedIn"
          title="LinkedIn"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={coloredIcons ? { color: brand.linkedin } : undefined}
            aria-hidden="true"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>

        <a
          href={socialLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className={iconBtn}
          aria-label="Follow RosterLab on Facebook"
          title="Facebook"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={coloredIcons ? { color: brand.facebook } : undefined}
            aria-hidden="true"
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </a>

        <a
          href={socialLinks.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className={iconBtn}
          aria-label="Follow RosterLab on YouTube"
          title="YouTube"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={coloredIcons ? { color: brand.youtube } : undefined}
            aria-hidden="true"
          >
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </a>
      </div>

      {/* Share group — copy link only */}
      <div className="flex items-center gap-2">
        <span className={labelClass}>Share this:</span>

        <button
          type="button"
          onClick={handleCopy}
          className={iconBtn}
          aria-label={copied ? 'Link copied' : 'Copy link'}
          title={copied ? 'Copied!' : 'Copy link'}
        >
          {copied ? (
            <svg
              className="w-5 h-5 text-primary-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={coloredIcons ? { color: brand.copy } : undefined}
              aria-hidden="true"
            >
              <rect x="9" y="9" width="12" height="12" rx="2" />
              <path d="M6 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </button>
      </div>

      {trailingSlot ? (
        <div className="flex items-center lg:ml-2 lg:pl-3 lg:border-l lg:border-neutral-200">
          {trailingSlot}
        </div>
      ) : null}
      </div>
    </div>
  )
}
