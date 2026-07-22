"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { z } from "zod";
import { HiCheck, HiOutlineDocumentText, HiX } from "react-icons/hi";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import LogoMarquee from "@/components/sections/LogoMarquee";
import { analytics } from "@/components/analytics/tracking";
import { cn } from "@/lib/utils";

const API_URL =
  process.env.NEXT_PUBLIC_ANALYZE_API_URL ||
  "https://analyze-api-test.rosterlab.com";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const MAX_CONTEXT_LENGTH = 500;
const MAX_ORG_NAME_LENGTH = 80;
const ALLOWED_EXTENSIONS = [".xlsx", ".csv"];

const emailSchema = z.string().email("Please enter a valid email address");

type PageState =
  | "upload"
  | "details"
  | "streaming"
  | "complete"
  | "error"
  | "rate_limited";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function getFileExtension(filename: string): string {
  return filename.slice(filename.lastIndexOf(".")).toLowerCase();
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type CaseStudy = {
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string | null;
  imageAlt: string;
};

interface RosterAnalysisClientProps {
  caseStudies?: CaseStudy[];
}

export default function RosterAnalysisClient({
  caseStudies = [],
}: RosterAnalysisClientProps) {
  const [pageState, setPageState] = useState<PageState>("upload");
  const [heroImageHover, setHeroImageHover] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [organisationName, setOrganisationName] = useState("");
  const [context, setContext] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [markdownContent, setMarkdownContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfFilename, setPdfFilename] = useState("roster-analysis.pdf");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const analysisStartTime = useRef<number>(0);

  useEffect(() => {
    analytics.track("roster_analysis_page_viewed", {
      page: "/tools/roster-analysis",
    });
  }, []);

  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  useEffect(() => {
    if (pageState === "streaming" && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [markdownContent, pageState]);

  const validateFile = useCallback((f: File): string | null => {
    const ext = getFileExtension(f.name);
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return "Only .xlsx and .csv files are supported.";
    }
    if (f.size > MAX_FILE_SIZE) {
      return `File is too large (${formatFileSize(f.size)}). Maximum size is 2MB.`;
    }
    return null;
  }, []);

  const handleFileSelect = useCallback(
    (f: File) => {
      const error = validateFile(f);
      if (error) {
        setFileError(error);
        setFile(null);
        return;
      }
      setFileError("");
      setFile(f);
      analytics.track("roster_analysis_file_uploaded", {
        filename: f.name,
        file_size: f.size,
        file_type: getFileExtension(f.name),
      });
    },
    [validateFile],
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFileSelect(droppedFile);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) handleFileSelect(selected);
  };

  const removeFile = () => {
    setFile(null);
    setFileError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleStreamEvent = useCallback(
    (event: {
      type: string;
      content?: string;
      filename?: string;
      mimeType?: string;
      statusCode?: number;
    }) => {
      switch (event.type) {
        case "message.start":
          break;
        case "status":
          setStatusMessage(event.content || "Processing...");
          break;
        case "text":
          setMarkdownContent((prev) => prev + (event.content || ""));
          break;
        case "file": {
          if (!event.content) break;
          const [header, base64] = event.content.split(",");
          const mime = header.match(/:(.*?);/)?.[1] || "application/pdf";
          const bytes = atob(base64);
          const array = new Uint8Array(bytes.length);
          for (let i = 0; i < bytes.length; i++) {
            array[i] = bytes.charCodeAt(i);
          }
          const blob = new Blob([array], { type: mime });
          setPdfUrl(URL.createObjectURL(blob));
          setPdfFilename(event.filename || "roster-analysis.pdf");
          analytics.track("roster_analysis_pdf_generated", {
            filename: event.filename,
          });
          break;
        }
        case "message.stop":
          setPageState("complete");
          analytics.track("roster_analysis_complete", {
            duration_ms: Date.now() - analysisStartTime.current,
            content_length: markdownContent.length,
            has_pdf: !!pdfUrl,
          });
          break;
        case "error":
          setErrorMessage(
            event.content || "An unexpected error occurred. Please try again.",
          );
          setPageState("error");
          analytics.track("roster_analysis_error", {
            error_message: event.content,
            status_code: event.statusCode,
          });
          break;
        case "rate_limit":
          setErrorMessage(
            event.content || "Rate limit reached. Please try again later.",
          );
          setPageState("rate_limited");
          analytics.track("roster_analysis_rate_limited");
          break;
      }
    },
    [markdownContent.length, pdfUrl],
  );

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setEmailError("");
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      setEmailError(emailResult.error.errors[0].message);
      return;
    }

    analytics.identify(email, {
      email,
      source: "roster_analysis_tool",
    });
    analytics.track("roster_analysis_details_submitted", {
      email_domain: email.split("@")[1],
      has_context: context.length > 0,
    });

    // non-blocking: HubSpot sync failure must not affect analysis.
    // Failures are reported to analytics, never to the browser console.
    fetch("/api/roster-analysis-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        organisationName: organisationName || undefined,
      }),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => null);
        if (!res.ok || data?.hubspot === "error") {
          analytics.track("roster_analysis_lead_sync_failed", {
            reason: data?.hubspot ?? `http_${res.status}`,
          });
        }
      })
      .catch((err) => {
        analytics.track("roster_analysis_lead_sync_failed", {
          reason: "network_error",
          error_message: err instanceof Error ? err.message : "Unknown error",
        });
      });

    startAnalysis();
  };

  const startAnalysis = async () => {
    if (!file) return;

    setPageState("streaming");
    setMarkdownContent("");
    setStatusMessage("Preparing your roster...");
    setErrorMessage("");
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setPdfUrl(null);
    setPdfFilename("roster-analysis.pdf");
    analysisStartTime.current = Date.now();

    analytics.track("roster_analysis_started", {
      has_context: context.length > 0,
      file_type: getFileExtension(file.name),
    });

    try {
      const base64 = await fileToBase64(file);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          turnstileToken: "",
          file: base64,
          filename: file.name,
          context: context || undefined,
          organisationName: organisationName || undefined,
        }),
      });

      if (!response.body) {
        throw new Error("No response body received");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const event = JSON.parse(line);
            handleStreamEvent(event);
          } catch {
            // Skip malformed lines
          }
        }
      }

      if (buffer.trim()) {
        try {
          const event = JSON.parse(buffer);
          handleStreamEvent(event);
        } catch {
          // Skip malformed trailing data
        }
      }
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "A network error occurred. Please check your connection and try again.",
      );
      setPageState("error");
      analytics.track("roster_analysis_error", {
        error_message:
          err instanceof Error ? err.message : "Unknown network error",
      });
    }
  };

  const handleRetry = () => {
    setErrorMessage("");
    setPageState("upload");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero — 2 column: upload on left, visual on right */}
      {pageState === "upload" && (
        <div className="min-h-screen lg:min-h-[calc(100vh-5rem)] flex flex-col justify-start pt-8 pb-8 lg:pt-8 lg:pb-0 relative overflow-hidden bg-white">
          <Container className="lg:flex-1 lg:flex lg:flex-col">
            <div className="grid lg:grid-cols-12 gap-8 items-center lg:flex-1">
              {/* Left column: copy + upload */}
              <div className="lg:col-span-5 lg:self-center max-w-lg mx-auto flex flex-col items-center text-center">
                <p className="text-sm font-semibold text-primary-600 tracking-[0.15em] uppercase mb-3">
                  Free Roster Audit · Powered by RosterLab
                </p>
                <h1 className="text-4xl sm:text-[48px] font-bold text-gray-900 mb-4 leading-[1.1]">
                  Get Detailed Feedback On Your Roster{" "}
                  <span className="text-primary-600">— Free</span>
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-md leading-[1.55]">
                  Our free AI roster audit checks your current roster against
                  the criteria that matter most: fairness, coverage, cost, and
                  compliance. Get clear, actionable insights to build a better
                  schedule for your team.
                </p>

                {/* Drop zone */}
                <div
                  className={cn(
                    "relative border-2 rounded-xl px-6 py-10 text-center transition-all cursor-pointer mb-3 shadow-sm max-w-md",
                    isDragging
                      ? "border-primary-500 ring-2 ring-primary-200 bg-primary-50"
                      : file
                        ? "border-green-400 bg-green-50/60"
                        : "border-primary-300 bg-white hover:border-primary-500 hover:shadow-md",
                  )}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      fileInputRef.current?.click();
                    }
                  }}
                  aria-label="Upload roster file"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx,.csv"
                    onChange={handleFileInputChange}
                    className="hidden"
                    aria-hidden="true"
                  />

                  {/* Privacy badge */}
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-full px-2.5 py-1">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    100% privacy
                  </span>

                  {file ? (
                    <div className="flex items-center justify-center gap-3">
                      <HiOutlineDocumentText className="w-8 h-8 text-green-600 flex-shrink-0" />
                      <div className="text-left">
                        <p className="font-medium text-gray-900 text-base">
                          {file.name}
                        </p>
                        <p className="text-base text-gray-500">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile();
                        }}
                        className="ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remove file"
                      >
                        <HiX className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="w-14 h-14 flex items-center justify-center mx-auto mb-3 rounded-full bg-primary-100 text-primary-600">
                        <svg
                          className="w-8 h-8"
                          viewBox="0 0 256 256"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z" />
                        </svg>
                      </div>
                      <p className="text-gray-900 font-semibold text-base">
                        {isDragging ? (
                          "Drop your file here"
                        ) : (
                          <>
                            Drop your roster here or{" "}
                            <span className="text-primary-600 underline decoration-2 underline-offset-2">
                              choose a file
                            </span>
                          </>
                        )}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Upload a .xlsx or .csv file. Max size 2MB.
                      </p>
                    </>
                  )}
                </div>

                {fileError && (
                  <p className="text-base text-red-600 mb-3" role="alert">
                    {fileError}
                  </p>
                )}

                {/* Reveal once a file is selected */}
                {file && (
                  <div className="animate-fade-in mb-3">
                    <Button
                      onClick={() => setPageState("details")}
                      className="w-full bg-primary-600 text-white hover:bg-primary-700 min-h-12 px-8 py-3 text-base font-semibold"
                      analyticsLabel="Roster Analysis Upload Continue"
                      analyticsLocation="Roster Analysis Page"
                      analyticsProperties={{
                        file_type: getFileExtension(file.name),
                      }}
                    >
                      Continue
                    </Button>
                  </div>
                )}

                <p className="text-sm text-gray-500 mt-2">
                  Trusted by over 150 teams optimising their rosters worldwide.
                </p>

                {/* Scroll cue — sits under the copy so it centres with the column */}
                <a
                  href="#learn-more"
                  className="hidden md:flex mt-8 flex-col items-center text-gray-500 hover:text-primary-600 transition-colors group"
                  aria-label="Learn more"
                >
                  <span className="text-sm font-medium mb-2">Learn more</span>
                  <svg
                    className={cn(
                      "w-6 h-6 transition-transform",
                      heroImageHover && "animate-bounce",
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </a>
              </div>

              {/* Right column: hero visual (full-bleed) */}
              <div className="hidden lg:block lg:col-span-7" />
            </div>
          </Container>
          <div
            aria-hidden="false"
            onMouseEnter={() => setHeroImageHover(true)}
            onMouseLeave={() => setHeroImageHover(false)}
            className="hidden lg:block absolute inset-y-0 right-0 w-[58%] xl:w-[55%]"
          >
            <Image
              src="/images/tools/hero.png"
              alt="Free AI roster analysis report — Roster Summary, Potential Problems and Improvement Opportunities"
              fill
              className="object-cover object-left"
              priority
              sizes="(min-width: 1024px) 58vw, 0vw"
            />
            {/* Left-edge shadow fade over the image */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-black/25 via-black/10 to-transparent"
            />
          </div>
        </div>
      )}

      {/* Details step */}
      {pageState === "details" && (
        <div className="min-h-screen flex flex-col justify-center pt-20 pb-12">
          <Container>
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 animate-fade-in">
                <div className="text-center mb-6">
                  <h2 className="text-3xl sm:text-[40px] font-bold text-gray-900 mb-4 leading-[1.15]">
                    A few details before we analyse
                  </h2>
                  <p className="text-base sm:text-[20px] text-gray-600 leading-[1.5]">
                    We&apos;ll send the report to your inbox and tailor the
                    analysis to your context.
                  </p>
                </div>

                <form onSubmit={handleDetailsSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError("");
                      }}
                      placeholder="you@company.com"
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors",
                        emailError ? "border-red-300" : "border-gray-300",
                      )}
                      aria-invalid={!!emailError}
                      autoFocus
                    />
                    {emailError && (
                      <p className="mt-2 text-sm text-red-600" role="alert">
                        {emailError}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      We&apos;ll send your roster analysis report here.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="organisationName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Organisation / team name{" "}
                      <span className="text-gray-400 font-normal">
                        (optional)
                      </span>
                    </label>
                    <input
                      id="organisationName"
                      type="text"
                      value={organisationName}
                      onChange={(e) =>
                        setOrganisationName(
                          e.target.value.slice(0, MAX_ORG_NAME_LENGTH),
                        )
                      }
                      placeholder="e.g. Auckland City Hospital — ICU"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      maxLength={MAX_ORG_NAME_LENGTH}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      We&apos;ll add this to the &quot;Prepared for&quot; line
                      on your report.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="context"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Add more context{" "}
                      <span className="text-gray-400 font-normal">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      id="context"
                      value={context}
                      onChange={(e) =>
                        setContext(e.target.value.slice(0, MAX_CONTEXT_LENGTH))
                      }
                      placeholder="e.g. ICU nursing roster covering 4 weeks, 25 staff, mix of full-time and part-time, EBA applies…"
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                      maxLength={MAX_CONTEXT_LENGTH}
                    />
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-gray-500">
                        The more context you give, the better the analysis.
                      </p>
                      <p className="text-xs text-gray-400">
                        {context.length}/{MAX_CONTEXT_LENGTH}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Button
                      onClick={() => setPageState("upload")}
                      className="sm:w-auto bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 min-h-12 px-8 py-3 text-base font-semibold"
                      analyticsLabel="Roster Analysis Details Back"
                      analyticsLocation="Roster Analysis Page"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-primary-600 text-white hover:bg-primary-700 min-h-12 px-8 py-3 text-base font-semibold"
                      analyticsLabel="Roster Analysis Analyze"
                      analyticsLocation="Roster Analysis Page"
                      analyticsProperties={{
                        has_context: context.length > 0,
                        file_type: file
                          ? getFileExtension(file.name)
                          : undefined,
                      }}
                    >
                      Analyse My Roster
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 text-center">
                    We&apos;ll only use this to send your analysis results. No
                    spam.
                  </p>
                </form>
              </div>
            </div>
          </Container>
        </div>
      )}

      {/* Main interaction area (streaming / results) */}
      {(pageState === "streaming" ||
        pageState === "complete" ||
        pageState === "error" ||
        pageState === "rate_limited") && (
        <div className="pt-28 pb-20">
          <Container>
            <div className="max-w-2xl mx-auto">
              <div ref={resultRef}>
                {/* Status bar during streaming */}
                {pageState === "streaming" && (
                  <div className="flex items-center gap-3 mb-4 p-4 bg-white rounded-xl shadow-sm">
                    <LoadingSpinner size="sm" label={statusMessage} />
                    <p
                      className="text-sm text-gray-600 font-medium"
                      aria-live="polite"
                    >
                      {statusMessage}
                    </p>
                  </div>
                )}

                {/* Markdown content */}
                {markdownContent && (
                  <div
                    className="bg-white rounded-2xl shadow-lg p-8 animate-fade-in"
                    aria-busy={pageState === "streaming"}
                  >
                    <div className="prose prose-blue max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-td:text-gray-700 prose-th:text-gray-900 prose-th:bg-gray-50">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          img: ({ ...props }) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              {...props}
                              alt={props.alt || "Analysis chart"}
                              className="max-w-full h-auto rounded-lg my-4"
                              loading="lazy"
                            />
                          ),
                        }}
                      >
                        {markdownContent}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}

                {/* Error state */}
                {pageState === "error" && (
                  <div className="bg-white rounded-2xl shadow-lg p-8 text-center mt-4 animate-fade-in">
                    <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-7 h-7 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl sm:text-[28px] font-bold text-gray-900 mb-4 leading-[1.2]">
                      Something went wrong
                    </h3>
                    <p className="text-base sm:text-[20px] text-gray-600 mb-6 leading-[1.5]">
                      {errorMessage}
                    </p>
                    <Button
                      onClick={handleRetry}
                      className="bg-primary-600 text-white hover:bg-primary-700 min-h-12 px-8 py-3 text-base font-semibold"
                      analyticsLabel="Roster Analysis Retry"
                      analyticsLocation="Roster Analysis Page"
                    >
                      Try Again
                    </Button>
                  </div>
                )}

                {/* Rate limit state */}
                {pageState === "rate_limited" && (
                  <div className="bg-white rounded-2xl shadow-lg p-8 text-center mt-4 animate-fade-in">
                    <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-7 h-7 text-amber-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl sm:text-[28px] font-bold text-gray-900 mb-4 leading-[1.2]">
                      Analysis limit reached
                    </h3>
                    <p className="text-base sm:text-[20px] text-gray-600 mb-4 leading-[1.5]">
                      {errorMessage}
                    </p>
                    <p className="text-base sm:text-[20px] text-gray-600 mb-6 leading-[1.5]">
                      Want a more comprehensive review? Our rostering
                      consultants can help.
                    </p>
                    <Button
                      href="/free-roster-audit"
                      className="bg-primary-600 text-white hover:bg-primary-700 min-h-12 px-8 py-3 text-base font-semibold"
                      analyticsLabel="Roster Analysis Book Audit"
                      analyticsLocation="Roster Analysis Page"
                      analyticsProperties={{ cta_type: "audit" }}
                    >
                      Book a Free Roster Audit
                    </Button>
                  </div>
                )}

                {/* PDF Download */}
                {pdfUrl && (
                  <div className="mt-6 bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between animate-fade-in">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <HiOutlineDocumentText className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {pdfFilename}
                        </p>
                        <p className="text-sm text-gray-500">PDF Report</p>
                      </div>
                    </div>
                    <a
                      href={pdfUrl}
                      download={pdfFilename}
                      className="inline-flex items-center gap-2 bg-primary-600 text-white hover:bg-primary-700 px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
                      onClick={() => {
                        analytics.track("roster_analysis_pdf_downloaded", {
                          filename: pdfFilename,
                        });
                      }}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Download
                    </a>
                  </div>
                )}

                {/* Completion CTA */}
                {pageState === "complete" && (
                  <div className="mt-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-center text-white animate-fade-in">
                    <h3 className="text-2xl sm:text-[28px] font-bold mb-4 leading-[1.2]">
                      Want a deeper analysis?
                    </h3>
                    <p className="text-base sm:text-[20px] opacity-90 mb-6 leading-[1.5]">
                      Our rostering experts can provide a comprehensive audit
                      with personalised recommendations for your team.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        href="/free-roster-audit"
                        className="bg-white text-blue-600 hover:bg-gray-100 min-h-12 px-8 py-3 text-base font-semibold"
                        analyticsLabel="Roster Analysis Book Audit"
                        analyticsLocation="Roster Analysis Page"
                        analyticsProperties={{ cta_type: "audit" }}
                      >
                        Book a Free Audit
                      </Button>
                      <Button
                        href="/book-a-demo"
                        className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 min-h-12 px-8 py-3 text-base font-semibold"
                        analyticsLabel="Roster Analysis Book Demo"
                        analyticsLocation="Roster Analysis Page"
                        analyticsProperties={{ cta_type: "demo" }}
                      >
                        Book a Demo
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </div>
      )}

      {/* Below the fold */}
      {pageState === "upload" && (
        <div id="learn-more" className="scroll-mt-24">
          {/* What's inside the report */}
          <div className="bg-[#0b1530] py-16 lg:py-[120px] overflow-hidden">
            <Container>
              <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                  <div className="lg:col-span-6">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-sm font-semibold uppercase tracking-[0.12em] mb-4">
                      What&apos;s inside
                    </div>
                    <h2 className="text-3xl sm:text-[40px] font-bold text-white mb-4 leading-[1.15]">
                      What&apos;s in your report
                    </h2>
                    <p className="text-base sm:text-[20px] text-gray-400 mb-8 leading-[1.5]">
                      A close look at how your roster is really performing, and
                      what to do about it. Everything below is drawn from the
                      roster you submitted, so the findings reflect your team,
                      your shifts, and your rules.
                    </p>

                    <ul className="space-y-5 mb-8">
                      {[
                        {
                          number: "01",
                          title: "Roster summary",
                          description:
                            "Your staff numbers, hours and shift patterns at a glance.",
                        },
                        {
                          number: "02",
                          title: "Potential problems",
                          description:
                            "The fairness, coverage and compliance issues in your roster, ranked by impact.",
                        },
                        {
                          number: "03",
                          title: "Improvement opportunities",
                          description:
                            "The specific changes that would make the biggest difference.",
                        },
                        {
                          number: "04",
                          title: "How we can help",
                          description:
                            "How RosterLab builds better rosters automatically, even for large teams.",
                        },
                      ].map((item) => (
                        <li key={item.number} className="flex gap-4">
                          <span className="text-base font-bold text-emerald-400 leading-[1.6] shrink-0 w-8">
                            {item.number}
                          </span>
                          <p className="text-base text-gray-200 leading-[1.6]">
                            <span className="font-semibold text-white">
                              {item.title}
                            </span>
                            <br />
                            <span className="text-gray-400">
                              {item.description}
                            </span>
                          </p>
                        </li>
                      ))}
                    </ul>

                    <a
                      href="#top"
                      onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-[#0b1530] font-semibold rounded-full px-8 min-h-12 py-3 transition-colors"
                    >
                      Get your free audit
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                  <div className="lg:col-span-6 relative flex lg:justify-end">
                    <Image
                      src="/images/tools/whats-in-your-report.png"
                      alt="What's in your roster analysis report — Roster Summary, Potential Problems, Improvement Opportunities, How We Can Help"
                      width={990}
                      height={743}
                      className="w-full lg:w-[80%] h-auto rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </Container>
          </div>

          {/* What is RosterLab */}
          <div className="bg-gray-50 border-t border-gray-100 py-16 lg:py-[120px] overflow-hidden">
            <Container>
              <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                  <div className="lg:col-span-7 relative flex lg:justify-start order-2 lg:order-1">
                    <Image
                      src="/images/tools/about-us-image-mockup.png"
                      alt="RosterLab — AI-powered staff rostering software"
                      width={1320}
                      height={990}
                      className="w-full lg:w-[80%] h-auto rounded-2xl"
                    />
                  </div>
                  <div className="lg:col-span-5 order-1 lg:order-2">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold uppercase tracking-[0.12em] mb-4">
                      What is RosterLab
                    </div>
                    <h2 className="text-3xl sm:text-[40px] font-bold text-gray-900 mb-4 leading-[1.15]">
                      AI-powered staff rostering for complex teams
                    </h2>
                    <p className="text-base sm:text-[20px] text-gray-600 mb-4 leading-[1.5]">
                      Generate and optimise staff rosters in minutes, not days.
                      Built for healthcare, 24/7 operations, and teams with
                      rules too complex for spreadsheets.
                    </p>
                    <p className="text-base sm:text-[20px] text-gray-600 mb-8 leading-[1.5]">
                      Our advanced mathematical optimisation engine allocates
                      staff efficiently, reduces penalty costs, improves
                      coverage, and helps you plan ahead with confidence.
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-3 mb-8">
                      {[
                        "Optimise skill mix",
                        "Allocate staff efficiently",
                        "Minimise costs",
                        "Dynamic scenario planning",
                      ].map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-base text-gray-800"
                        >
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mt-0.5">
                            <HiCheck className="w-4 h-4" />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      href="/book-a-demo"
                      className="bg-primary-600 text-white hover:bg-primary-700 min-h-12 px-8 py-3 text-base font-semibold"
                      analyticsLabel="Roster Analysis About Book Demo"
                      analyticsLocation="Roster Analysis Page"
                    >
                      Book a Demo
                    </Button>
                  </div>
                </div>
              </div>
            </Container>
          </div>

          {/* Trusted by carousel */}
          <LogoMarquee />

          {/* Case studies / success stories */}
          {caseStudies.length > 0 && (
            <div className="bg-white border-t border-gray-100 py-16 lg:py-[120px]">
              <Container>
                <div className="max-w-3xl mx-auto text-center mb-12">
                  <h2 className="text-3xl sm:text-[40px] font-bold text-gray-900 mb-4 leading-[1.15]">
                    Case Studies
                  </h2>
                  <p className="text-base sm:text-[20px] text-gray-600 leading-[1.5]">
                    See how global organizations are transforming their
                    workforce management with RosterLab.
                  </p>
                </div>

                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-12">
                  {caseStudies.map((cs) => (
                    <Link
                      key={cs.slug}
                      href={`/case-studies/${cs.slug}`}
                      className="group bg-gray-50 border border-gray-200 rounded-xl overflow-hidden hover:border-primary-300 hover:shadow-lg transition-all flex flex-col"
                    >
                      <div className="aspect-[16/9] bg-gray-100 relative overflow-hidden">
                        {cs.imageUrl && (
                          <Image
                            src={cs.imageUrl}
                            alt={cs.imageAlt}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        )}
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <div className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">
                          Case study
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-[1.25]">
                          {cs.title}
                        </h3>
                        {cs.excerpt && (
                          <p className="text-base text-gray-600 mb-4 leading-[1.5] line-clamp-3">
                            {cs.excerpt}
                          </p>
                        )}
                        <span className="text-base font-semibold text-primary-600 group-hover:underline mt-auto">
                          Read story →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </Container>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
