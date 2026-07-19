import AskAiShareBar from '@/components/ui/AskAiShareBar'
import Container from '@/components/ui/Container'

export const metadata = {
  title: 'AI Bar Preview',
  robots: { index: false, follow: false },
}

export default function TestAiBarPage() {
  return (
    <main className="py-16 bg-white min-h-screen">
      <Container>
        <div className="max-w-4xl mx-auto space-y-16">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              AskAiShareBar preview
            </h1>
            <p className="text-neutral-600">
              Standalone preview of the Ask AI / Share bar. Not linked from any
              nav; noindex.
            </p>
          </div>

          {/* Plain — sits on any background */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-3">
              Plain (borders only)
            </h2>
            <div className="border-t border-b border-neutral-200">
              <AskAiShareBar
                aiPrompt="Tell me about RosterLab"
              />
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              Hover any icon to see the primary-blue on-brand hover state.
            </p>
          </section>

          {/* Branded — soft primary card with brand accent bar */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-3">
              Branded (RosterLab palette)
            </h2>
            <AskAiShareBar
              aiPrompt="Tell me about RosterLab"
              variant="branded"
            />
            <p className="text-xs text-neutral-500 mt-2">
              Soft primary-50 → white → primary-50 gradient card, thin
              primary-to-secondary accent along the top, primary-blue hover.
            </p>
          </section>

          {/* Colored icons — plain background */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-3">
              Colored icons (plain)
            </h2>
            <div className="border-t border-b border-neutral-200">
              <AskAiShareBar
                aiPrompt="Tell me about RosterLab"
                coloredIcons
              />
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              Each icon uses its official brand color.
            </p>
          </section>

          {/* Colored icons — branded card */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-3">
              Colored icons + branded card
            </h2>
            <AskAiShareBar
              aiPrompt="Tell me about RosterLab"
              variant="branded"
              coloredIcons
            />
            <p className="text-xs text-neutral-500 mt-2">
              Brand-colored icons on the RosterLab-tinted card.
            </p>
          </section>

          {/* Custom prompt example */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-3">
              Branded with a page-specific prompt
            </h2>
            <AskAiShareBar
              aiPrompt="Summarise RosterLab pricing and who each plan is for"
              variant="branded"
            />
            <p className="text-xs text-neutral-500 mt-2">
              The prompt above is what gets prefilled in each AI chat.
            </p>
          </section>
        </div>
      </Container>
    </main>
  )
}
