// This internal test endpoint is retired, not a public content page.
export function GET() {
  return new Response("This test URL has been retired.", {
    status: 410,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
