"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { z } from "zod";
import { HiOutlineDocumentText, HiOutlineMail, HiX } from "react-icons/hi";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { analytics } from "@/components/analytics/tracking";
import { cn } from "@/lib/utils";

const API_URL =
  process.env.NEXT_PUBLIC_ANALYZE_API_URL ||
  "https://analyze-api-test.rosterlab.com";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const MAX_CONTEXT_LENGTH = 500;
const ALLOWED_EXTENSIONS = [".xlsx", ".csv"];

const emailSchema = z.string().email("Please enter a valid email address");

type PageState =
  | "email"
  | "upload"
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

export default function RosterAnalysisClient() {
  const [pageState, setPageState] = useState<PageState>("email");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [file, setFile] = useState<File | null>(null);
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

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setEmailError(result.error.errors[0].message);
      return;
    }
    analytics.identify(email, {
      email,
      source: "roster_analysis_tool",
    });
    analytics.track("roster_analysis_email_entered", {
      email_domain: email.split("@")[1],
    });
    setPageState("upload");
  };

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
    (event: { type: string; content?: string; filename?: string; mimeType?: string; statusCode?: number }) => {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Hero */}
      <div className="pt-20 pb-12">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              AI-POWERED ANALYSIS
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Instant{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Roster Analysis
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Upload your roster file and get AI-powered insights in seconds.
              Identify fairness issues, coverage gaps, and optimisation
              opportunities.
            </p>
          </div>
        </Container>
      </div>

      {/* Main interaction area */}
      <div className="pb-20">
        <Container>
          <div className="max-w-2xl mx-auto">
            {/* Email Step */}
            {pageState === "email" && (
              <div className="bg-white rounded-2xl shadow-lg p-8 animate-fade-in">
                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HiOutlineMail className="w-7 h-7 text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Get started
                  </h2>
                  <p className="text-gray-600">
                    Enter your email to receive your analysis report.
                  </p>
                </div>
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="sr-only">
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
                      aria-describedby={emailError ? "email-error" : undefined}
                      autoFocus
                    />
                    {emailError && (
                      <p
                        id="email-error"
                        className="mt-2 text-sm text-red-600"
                        role="alert"
                      >
                        {emailError}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary-600 text-white hover:bg-primary-700 py-3 text-lg font-semibold"
                    analyticsLabel="Roster Analysis Continue"
                    analyticsLocation="Roster Analysis Page"
                  >
                    Continue
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    We&apos;ll only use this to send your analysis results. No
                    spam.
                  </p>
                </form>
              </div>
            )}

            {/* Upload Step */}
            {pageState === "upload" && (
              <div className="bg-white rounded-2xl shadow-lg p-8 animate-fade-in">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Upload your roster
                  </h2>
                  <p className="text-gray-600">
                    Drag and drop your file, or click to browse. Supports .xlsx
                    and .csv files up to 2MB.
                  </p>
                </div>

                {/* Drop zone */}
                <div
                  className={cn(
                    "border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer mb-6",
                    isDragging
                      ? "border-primary-500 bg-primary-50 scale-[1.02]"
                      : file
                        ? "border-green-300 bg-green-50"
                        : "border-gray-300 hover:border-primary-400 hover:bg-gray-50",
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

                  {file ? (
                    <div className="flex items-center justify-center gap-3">
                      <HiOutlineDocumentText className="w-8 h-8 text-green-600 flex-shrink-0" />
                      <div className="text-left">
                        <p className="font-medium text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-500">
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
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <HiOutlineDocumentText className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-gray-600 font-medium">
                        {isDragging
                          ? "Drop your file here"
                          : "Drag and drop your roster file here"}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        or click to browse
                      </p>
                    </>
                  )}
                </div>

                {fileError && (
                  <p className="text-sm text-red-600 mb-4 text-center" role="alert">
                    {fileError}
                  </p>
                )}

                {/* Context textarea */}
                <div className="mb-6">
                  <label
                    htmlFor="context"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Context{" "}
                    <span className="text-gray-400 font-normal">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id="context"
                    value={context}
                    onChange={(e) => setContext(e.target.value.slice(0, MAX_CONTEXT_LENGTH))}
                    placeholder="e.g. This is a nursing ward roster for ICU, covering 4 weeks..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                    maxLength={MAX_CONTEXT_LENGTH}
                  />
                  <p className="text-xs text-gray-400 text-right mt-1">
                    {context.length}/{MAX_CONTEXT_LENGTH}
                  </p>
                </div>

                <Button
                  onClick={startAnalysis}
                  disabled={!file}
                  className="w-full bg-primary-600 text-white hover:bg-primary-700 py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  analyticsLabel="Roster Analysis Analyze"
                  analyticsLocation="Roster Analysis Page"
                  analyticsProperties={{
                    has_context: context.length > 0,
                    file_type: file ? getFileExtension(file.name) : undefined,
                  }}
                >
                  Analyse My Roster
                </Button>
              </div>
            )}

            {/* Streaming / Complete / Error / Rate Limited */}
            {(pageState === "streaming" ||
              pageState === "complete" ||
              pageState === "error" ||
              pageState === "rate_limited") && (
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
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Something went wrong
                    </h3>
                    <p className="text-gray-600 mb-6">{errorMessage}</p>
                    <Button
                      onClick={handleRetry}
                      className="bg-primary-600 text-white hover:bg-primary-700 px-6 py-3 font-semibold"
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
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Analysis limit reached
                    </h3>
                    <p className="text-gray-600 mb-6">{errorMessage}</p>
                    <p className="text-gray-600 mb-6">
                      Want a more comprehensive review? Our rostering
                      consultants can help.
                    </p>
                    <Button
                      href="/free-roster-audit"
                      className="bg-primary-600 text-white hover:bg-primary-700 px-6 py-3 font-semibold"
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
                        <p className="font-medium text-gray-900">{pdfFilename}</p>
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
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </a>
                  </div>
                )}

                {/* Completion CTA */}
                {pageState === "complete" && (
                  <div className="mt-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-center text-white animate-fade-in">
                    <h3 className="text-2xl font-bold mb-3">
                      Want a deeper analysis?
                    </h3>
                    <p className="text-lg opacity-90 mb-6">
                      Our rostering experts can provide a comprehensive audit
                      with personalised recommendations for your team.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        href="/free-roster-audit"
                        className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 font-semibold"
                        analyticsLabel="Roster Analysis Book Audit"
                        analyticsLocation="Roster Analysis Page"
                        analyticsProperties={{ cta_type: "audit" }}
                      >
                        Book a Free Audit
                      </Button>
                      <Button
                        href="/book-a-demo"
                        className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 font-semibold"
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
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}
