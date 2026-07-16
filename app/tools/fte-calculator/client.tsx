"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiInformationCircle } from "react-icons/hi";
import Container from "@/components/ui/Container";

const FTE_GATE_KEY = "rl_fte_pdf_gate_v1";

type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

const DAYS: { key: DayKey; label: string; weekend: boolean }[] = [
  { key: "mon", label: "Mon", weekend: false },
  { key: "tue", label: "Tue", weekend: false },
  { key: "wed", label: "Wed", weekend: false },
  { key: "thu", label: "Thu", weekend: false },
  { key: "fri", label: "Fri", weekend: false },
  { key: "sat", label: "Sat", weekend: true },
  { key: "sun", label: "Sun", weekend: true },
];

interface ShiftRow {
  id: number;
  name: string;
  start: string;
  finish: string;
  duration: string;
  qty: Record<DayKey, string>;
}

function defaultQty(all: number = 1): Record<DayKey, string> {
  return {
    mon: String(all),
    tue: String(all),
    wed: String(all),
    thu: String(all),
    fri: String(all),
    sat: String(all),
    sun: String(all),
  };
}

let nextRowId = 1;
function makeRow(preset: Partial<Omit<ShiftRow, "id" | "qty">> & { qty?: Partial<Record<DayKey, string | number>> } = {}): ShiftRow {
  const qty = defaultQty(1);
  if (preset.qty) {
    (Object.keys(preset.qty) as DayKey[]).forEach((d) => {
      const v = preset.qty![d];
      if (v !== undefined && v !== null) qty[d] = String(v);
    });
  }
  return {
    id: nextRowId++,
    name: preset.name ?? "",
    start: preset.start ?? "",
    finish: preset.finish ?? "",
    duration: preset.duration ?? "",
    qty,
  };
}

function timeToMinutes(v: string): number | null {
  if (!v) return null;
  const parts = v.split(":");
  if (parts.length < 2) return null;
  const h = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10);
  if (isNaN(h) || isNaN(m)) return null;
  return h * 60 + m;
}

function deriveDurationFromTimes(start: string, finish: string): string {
  const s = timeToMinutes(start);
  const f = timeToMinutes(finish);
  if (s === null || f === null) return "";
  let mins = (f - s + 1440) % 1440;
  if (mins === 0) mins = 1440;
  return String(Math.round((mins / 60) * 100) / 100);
}

function rowWeeklyHours(row: ShiftRow): number {
  const dur = parseFloat(row.duration);
  if (isNaN(dur) || dur < 0) return 0;
  let totalQty = 0;
  (Object.keys(row.qty) as DayKey[]).forEach((d) => {
    const v = parseFloat(row.qty[d]);
    if (!isNaN(v) && v > 0) totalQty += v;
  });
  return dur * totalQty;
}

function fmt(n: number, dp: number): string {
  return n.toLocaleString("en-NZ", {
    minimumFractionDigits: dp,
    maximumFractionDigits: dp,
  });
}

function csvEscape(v: string | number): string {
  const s = v == null ? "" : String(v);
  return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}

function parseCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line.charAt(i);
    if (inQ) {
      if (c === '"') {
        if (line.charAt(i + 1) === '"') {
          cur += '"';
          i++;
        } else {
          inQ = false;
        }
      } else {
        cur += c;
      }
    } else {
      if (c === '"') {
        inQ = true;
      } else if (c === ",") {
        out.push(cur);
        cur = "";
      } else {
        cur += c;
      }
    }
  }
  out.push(cur);
  return out;
}

function normTime(v: string | undefined): string | null {
  const m = /^\s*(\d{1,2}):(\d{2})/.exec(v || "");
  if (!m) return null;
  const h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  if (h > 23 || min > 59) return null;
  return (h < 10 ? "0" + h : String(h)) + ":" + m[2];
}

export default function FTECalculatorClient() {
  const [rows, setRows] = useState<ShiftRow[]>(() => [
    makeRow({
      name: "Morning",
      start: "07:00",
      finish: "15:30",
      duration: deriveDurationFromTimes("07:00", "15:30"),
      qty: { mon: 2, tue: 2, wed: 2, thu: 2, fri: 2, sat: 1, sun: 1 },
    }),
    makeRow({
      name: "Evening",
      start: "15:00",
      finish: "23:30",
      duration: deriveDurationFromTimes("15:00", "23:30"),
      qty: { mon: 2, tue: 2, wed: 2, thu: 2, fri: 2, sat: 1, sun: 1 },
    }),
    makeRow({
      name: "Night",
      start: "23:00",
      finish: "07:30",
      duration: deriveDurationFromTimes("23:00", "07:30"),
    }),
  ]);
  const [hoursPerFte, setHoursPerFte] = useState("40");
  const [scaleFactor, setScaleFactor] = useState("15");
  const [fteAvailable, setFteAvailable] = useState("8");
  const [printDate, setPrintDate] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateRow = useCallback((id: number, patch: Partial<ShiftRow>) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }, []);

  const updateRowQty = useCallback((id: number, day: DayKey, value: string) => {
    setRows((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, qty: { ...r.qty, [day]: value } } : r,
      ),
    );
  }, []);

  const handleTimeChange = useCallback(
    (id: number, field: "start" | "finish", value: string) => {
      setRows((prev) =>
        prev.map((r) => {
          if (r.id !== id) return r;
          const next = { ...r, [field]: value } as ShiftRow;
          if (next.start && next.finish) {
            next.duration = deriveDurationFromTimes(next.start, next.finish);
          }
          return next;
        }),
      );
    },
    [],
  );

  const handleDurationChange = useCallback((id: number, value: string) => {
    setRows((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, duration: value, start: "", finish: "" } : r,
      ),
    );
  }, []);

  const addRow = useCallback(() => {
    setRows((prev) => [...prev, makeRow()]);
  }, []);

  const removeRow = useCallback((id: number) => {
    setRows((prev) => {
      const next = prev.filter((r) => r.id !== id);
      return next.length ? next : [makeRow()];
    });
  }, []);

  const { totalHours, requiredFte, weeklyByRow } = useMemo(() => {
    const weeklyByRow = new Map<number, number>();
    let total = 0;
    rows.forEach((r) => {
      const hrs = rowWeeklyHours(r);
      weeklyByRow.set(r.id, hrs);
      total += hrs;
    });
    const hpf = parseFloat(hoursPerFte);
    let scale = parseFloat(scaleFactor);
    if (isNaN(scale) || scale < 0) scale = 0;
    let required: number | null = null;
    if (!isNaN(hpf) && hpf > 0) {
      required = (total / hpf) * (1 + scale / 100);
    }
    return { totalHours: total, requiredFte: required, weeklyByRow };
  }, [rows, hoursPerFte, scaleFactor]);

  const scaleNumber = (() => {
    const s = parseFloat(scaleFactor);
    return !isNaN(s) && s > 0 ? s : 0;
  })();

  const balance = useMemo(() => {
    const avail = parseFloat(fteAvailable);
    if (requiredFte === null || isNaN(avail) || avail < 0) {
      return { label: "Surplus / deficit", value: "—", state: "neutral" as const };
    }
    const diff = avail - requiredFte;
    const shown = Math.round(diff * 100) / 100;
    if (shown > 0) {
      return {
        label: "Surplus",
        value: "+" + fmt(shown, 2) + " FTE",
        state: "surplus" as const,
      };
    }
    if (shown < 0) {
      return {
        label: "Deficit",
        value: fmt(shown, 2) + " FTE",
        state: "deficit" as const,
      };
    }
    return {
      label: "Balanced",
      value: "0.00 FTE",
      state: "neutral" as const,
    };
  }, [fteAvailable, requiredFte]);

  const buildCsv = useCallback((): string => {
    const lines: string[] = [];
    lines.push("# RosterLab FTE Calculator export");
    lines.push("# Hours per FTE," + (hoursPerFte || ""));
    lines.push("# Scaling factor %," + (scaleFactor || ""));
    lines.push("# FTE available," + (fteAvailable || ""));
    lines.push(
      "Shift name,Start,Finish,Duration (hrs),Mon,Tue,Wed,Thu,Fri,Sat,Sun",
    );
    rows.forEach((r) => {
      const cells: string[] = [
        csvEscape(r.name),
        r.start,
        r.finish,
        r.duration,
        r.qty.mon,
        r.qty.tue,
        r.qty.wed,
        r.qty.thu,
        r.qty.fri,
        r.qty.sat,
        r.qty.sun,
      ];
      lines.push(cells.join(","));
    });
    return lines.join("\r\n");
  }, [rows, hoursPerFte, scaleFactor, fteAvailable]);

  const handleDownloadCsv = useCallback(() => {
    const blob = new Blob([buildCsv()], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download =
      "rosterlab-fte-model-" + new Date().toISOString().slice(0, 10) + ".csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  }, [buildCsv]);

  const importCsv = useCallback((text: string) => {
    const lines = text.split(/\r\n|\n|\r/);
    const shifts: ShiftRow[] = [];
    const meta: { hpf?: string; scale?: string; avail?: string } = {};
    let skipped = 0;
    lines.forEach((raw) => {
      if (!raw.trim()) return;
      if (raw.trim().charAt(0) === "#") {
        const m = parseCsvLine(raw.trim().replace(/^#\s*/, ""));
        const key = (m[0] || "").toLowerCase();
        if (key.indexOf("hours per fte") === 0) meta.hpf = m[1];
        else if (key.indexOf("scaling factor") === 0) meta.scale = m[1];
        else if (key.indexOf("fte available") === 0) meta.avail = m[1];
        return;
      }
      const cells = parseCsvLine(raw);
      if (/^start$/i.test((cells[1] || "").trim())) return;
      const qty: Partial<Record<DayKey, string>> = {};
      DAYS.forEach((d, i) => {
        const v = parseFloat(cells[4 + i]);
        qty[d.key] = !isNaN(v) && v >= 0 ? String(v) : "1";
      });
      const st = normTime(cells[1]);
      const fi = normTime(cells[2]);
      const durNum = parseFloat(cells[3]);
      const preset: Partial<ShiftRow> & { qty?: Record<DayKey, string> } = {
        name: (cells[0] || "").trim(),
        qty: qty as Record<DayKey, string>,
      };
      if (st && fi) {
        preset.start = st;
        preset.finish = fi;
        preset.duration = deriveDurationFromTimes(st, fi);
      } else if (!isNaN(durNum) && durNum >= 0 && durNum <= 24) {
        preset.duration = String(durNum);
      } else {
        skipped++;
        return;
      }
      shifts.push(makeRow(preset));
    });

    if (!shifts.length) {
      alert(
        "No shifts found in that CSV.\n\nExpected columns: Shift name, Start, Finish, Duration (hrs), Mon, Tue, Wed, Thu, Fri, Sat, Sun — each shift needs either start and finish times or a duration.",
      );
      return;
    }
    setRows(shifts);
    if (meta.hpf !== undefined && parseFloat(meta.hpf) > 0) {
      setHoursPerFte(String(parseFloat(meta.hpf)));
    }
    if (meta.scale !== undefined && parseFloat(meta.scale) >= 0) {
      setScaleFactor(String(parseFloat(meta.scale)));
    }
    if (meta.avail !== undefined) {
      if (meta.avail === "") setFteAvailable("");
      else if (parseFloat(meta.avail) >= 0)
        setFteAvailable(String(parseFloat(meta.avail)));
    }
    if (skipped) {
      alert(
        "Loaded " +
          shifts.length +
          " shift" +
          (shifts.length === 1 ? "" : "s") +
          ". Skipped " +
          skipped +
          " row" +
          (skipped === 1 ? "" : "s") +
          " with no valid times or duration.",
      );
    }
  }, []);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => importCsv(String(reader.result));
      reader.readAsText(file);
      e.target.value = "";
    },
    [importCsv],
  );

  const stampPrintDate = useCallback(() => {
    setPrintDate(
      new Date().toLocaleDateString("en-NZ", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    );
  }, []);

  useEffect(() => {
    const handler = () => stampPrintDate();
    window.addEventListener("beforeprint", handler);
    return () => window.removeEventListener("beforeprint", handler);
  }, [stampPrintDate]);

  const generatePdfSnapshot = useCallback(async () => {
    const { default: jsPDF } = await import("jspdf");
    const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const marginX = 40;
    let y = 48;

    const dateStr = new Date().toLocaleDateString("en-NZ", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // Header brand bar
    doc.setFillColor(3, 249, 190);
    doc.rect(0, 0, pageW, 6, "F");

    // Try to include the RosterLab logo (best-effort, capped at 800ms so it
    // doesn't delay the download).
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 800);
      const res = await fetch("/images/rosterlab-logo.png", {
        signal: controller.signal,
      });
      const blob = await res.blob();
      clearTimeout(timeout);
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
      doc.addImage(dataUrl, "PNG", marginX, 24, 110, 28);
    } catch {
      // If it fails or times out, skip the logo — the title still renders
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(30, 30, 30);
    doc.text("FTE Requirement Report", marginX, (y += 24));

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(110, 110, 110);
    doc.text(`Generated ${dateStr} · rosterlab.com`, marginX, (y += 16));
    y += 8;

    // Summary tiles
    const scale = parseFloat(scaleFactor);
    const scaleClean = !isNaN(scale) && scale > 0 ? scale : 0;
    const summary: [string, string][] = [
      ["Total weekly demand", `${fmt(totalHours, totalHours % 1 ? 1 : 0)} hrs`],
      ["Hours per FTE", hoursPerFte || "—"],
      ["Scaling factor", `${fmt(scaleClean, scaleClean % 1 ? 1 : 0)}%`],
      [
        "Required FTE",
        requiredFte === null ? "—" : fmt(requiredFte, 2),
      ],
      ["FTE available", fteAvailable || "—"],
      [balance.label, balance.value],
    ];
    const tileW = (pageW - marginX * 2 - 5 * 8) / 6;
    const tileH = 54;
    let tileX = marginX;
    y += 12;
    summary.forEach(([label, value]) => {
      doc.setDrawColor(228, 232, 236);
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(tileX, y, tileW, tileH, 6, 6, "FD");
      doc.setFillColor(36, 217, 220);
      doc.rect(tileX, y, tileW, 3, "F");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(85, 96, 107);
      doc.text(label.toUpperCase(), tileX + 10, y + 18);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(30, 30, 30);
      doc.text(String(value), tileX + 10, y + 40);
      tileX += tileW + 8;
    });
    y += tileH + 24;

    // Shift table
    const headers = [
      "Shift",
      "Start",
      "Finish",
      "Dur (h)",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
      "Weekly (h)",
    ];
    const colWidths = [
      120, 55, 55, 55, 44, 44, 44, 44, 44, 44, 44, 70,
    ];
    const tableW = colWidths.reduce((a, b) => a + b, 0);
    const startX = marginX;

    // Header row
    doc.setFillColor(250, 251, 252);
    doc.rect(startX, y, tableW, 22, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(85, 96, 107);
    let cx = startX;
    headers.forEach((h, i) => {
      doc.text(h, cx + 6, y + 15);
      cx += colWidths[i];
    });
    doc.setDrawColor(228, 232, 236);
    doc.line(startX, y + 22, startX + tableW, y + 22);
    y += 22;

    // Body rows
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(50, 50, 50);
    rows.forEach((r) => {
      const hrs = weeklyByRow.get(r.id) ?? 0;
      const cells = [
        r.name || "—",
        r.start || "—",
        r.finish || "—",
        r.duration || "—",
        r.qty.mon,
        r.qty.tue,
        r.qty.wed,
        r.qty.thu,
        r.qty.fri,
        r.qty.sat,
        r.qty.sun,
        hrs > 0 ? fmt(hrs, hrs % 1 ? 2 : 0) : "—",
      ];
      let cellX = startX;
      cells.forEach((v, i) => {
        doc.text(String(v), cellX + 6, y + 15);
        cellX += colWidths[i];
      });
      doc.setDrawColor(240, 243, 246);
      doc.line(startX, y + 22, startX + tableW, y + 22);
      y += 22;
      if (y > doc.internal.pageSize.getHeight() - 60) {
        doc.addPage();
        y = 60;
      }
    });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      "Generated by the RosterLab FTE Requirement Calculator · rosterlab.com/tools/fte-calculator",
      marginX,
      doc.internal.pageSize.getHeight() - 24,
    );

    doc.save(
      `rosterlab-fte-report-${new Date().toISOString().slice(0, 10)}.pdf`,
    );
  }, [
    rows,
    weeklyByRow,
    totalHours,
    hoursPerFte,
    scaleFactor,
    requiredFte,
    fteAvailable,
    balance,
  ]);

  const runPrint = useCallback(async () => {
    stampPrintDate();
    try {
      await generatePdfSnapshot();
    } catch (err) {
      console.error("PDF generation failed", err);
      alert("Sorry — we couldn't generate the PDF. Please try again.");
    }
  }, [stampPrintDate, generatePdfSnapshot]);

  const [showGate, setShowGate] = useState(false);
  const [gateFirstName, setGateFirstName] = useState("");
  const [gateLastName, setGateLastName] = useState("");
  const [gateEmail, setGateEmail] = useState("");
  const [gateCompany, setGateCompany] = useState("");
  const [gateSubmitting, setGateSubmitting] = useState(false);
  const [gateError, setGateError] = useState<string | null>(null);

  // Preload jsPDF as soon as the gate modal opens (or on first render for
  // already-gated users) so the download starts instantly after submit.
  useEffect(() => {
    if (!showGate) return;
    import("jspdf").catch(() => {
      // ignore preload failures — real generation will retry
    });
  }, [showGate]);

  const handlePdf = useCallback(() => {
    if (typeof window !== "undefined") {
      try {
        if (window.localStorage.getItem(FTE_GATE_KEY) === "true") {
          runPrint();
          return;
        }
      } catch {
        // localStorage unavailable — fall through to the gate
      }
    }
    // Warm the jsPDF chunk in the background while the user fills in the form
    import("jspdf").catch(() => {
      // ignore
    });
    setGateError(null);
    setShowGate(true);
  }, [runPrint]);

  const handleGateSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setGateError(null);
      setGateSubmitting(true);

      // Fire the API call, but don't block the download on it — HubSpot upsert
      // can take ~1s. If it fails we still let the user download.
      const apiPromise = fetch("/api/conversion-point", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: gateFirstName.trim(),
          lastname: gateLastName.trim(),
          email: gateEmail.trim(),
          company: gateCompany.trim(),
          conversion_point: "FTE calculator",
        }),
      }).catch((err) => {
        console.error("conversion-point request failed:", err);
        return null;
      });

      try {
        try {
          window.localStorage.setItem(FTE_GATE_KEY, "true");
        } catch {
          // ignore
        }
        setShowGate(false);
        // Kick off PDF generation immediately (chunk is already preloaded)
        await runPrint();
        // Await the API in the background so we know if it errored, but the
        // PDF is already downloading by this point.
        apiPromise.then((res) => {
          if (res && !res.ok) {
            console.warn("conversion-point returned non-OK:", res.status);
          }
        });
      } catch (err) {
        setGateError(
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
        );
      } finally {
        setGateSubmitting(false);
      }
    },
    [gateFirstName, gateLastName, gateEmail, gateCompany, runPrint],
  );

  const requiredFteDisplay =
    requiredFte === null ? "—" : fmt(requiredFte, 2);
  const requiredFteSub =
    scaleNumber > 0
      ? `Total weekly demand ÷ hours per FTE, scaled up by ${fmt(
          scaleNumber,
          scaleNumber % 1 ? 1 : 0,
        )}%`
      : "Total weekly demand ÷ hours per FTE";

  const balanceBorder =
    balance.state === "surplus"
      ? "border-t-[#03F9BE]"
      : balance.state === "deficit"
        ? "border-t-[#F67D00]"
        : "border-t-[#24D9DC]";
  const balanceValueClass =
    balance.state === "surplus"
      ? "text-[#00B389]"
      : balance.state === "deficit"
        ? "text-[#F67D00]"
        : "text-neutral-900";

  return (
    <div className="bg-[#F7F9FB] py-8 sm:py-12 print:bg-white print:py-0">
      <style jsx global>{`
        @media print {
          header,
          nav,
          footer,
          .no-print {
            display: none !important;
          }
          body {
            background: #fff !important;
          }
        }
      `}</style>
      <Container className="max-w-[1400px]">
        <section className="mb-6 sm:mb-7">
          <h1 className="text-2xl sm:text-3xl md:text-[30px] font-semibold leading-tight pl-3 sm:pl-3.5 border-l-[5px] border-[#03F9BE]">
            FTE Requirement Calculator
          </h1>
          <p className="mt-2.5 text-sm sm:text-[15px] text-[#55606B] max-w-none">
            Enter each shift in your demand model with its times and how many staff you need on each day of the week. We&apos;ll total the weekly hours and convert them into the full-time equivalents (FTE) required to cover the roster.
          </p>
          {printDate && (
            <p className="hidden print:block mt-2 text-xs font-light text-[#6B7280]">
              FTE requirement report · Generated {printDate} · rosterlab.com
            </p>
          )}
        </section>

        <section className="bg-white border border-[#E4E8EC] border-t-4 border-t-[#03F9BE] rounded-[10px] shadow-[0_2px_10px_rgba(26,26,46,0.05)] overflow-hidden">
          <div className="hidden xl:block overflow-x-auto print:overflow-visible">
            <table className="w-full min-w-[1200px] print:min-w-0 border-collapse">
              <thead>
                <tr>
                  <th
                    rowSpan={2}
                    className="text-left pl-5 pr-1 py-3 text-xs font-medium uppercase tracking-wider text-[#55606B] bg-[#FAFBFC] border-b-2 border-[#E4E8EC] whitespace-nowrap"
                  >
                    Shift name{" "}
                    <span className="font-light normal-case">(optional)</span>
                  </th>
                  <th
                    rowSpan={2}
                    className="text-left pl-3 pr-1 py-3 text-[11px] font-medium uppercase tracking-wider text-[#55606B] bg-[#FAFBFC] border-b-2 border-[#E4E8EC] whitespace-nowrap"
                  >
                    Start
                  </th>
                  <th
                    rowSpan={2}
                    className="text-left pl-3 pr-1 py-3 text-[11px] font-medium uppercase tracking-wider text-[#55606B] bg-[#FAFBFC] border-b-2 border-[#E4E8EC] whitespace-nowrap"
                  >
                    Finish
                  </th>
                  <th
                    rowSpan={2}
                    className="text-left pl-3 pr-1 py-3 text-[11px] font-medium uppercase tracking-wider text-[#55606B] bg-[#FAFBFC] border-b-2 border-[#E4E8EC] whitespace-nowrap"
                  >
                    Duration (hrs)
                  </th>
                  <th
                    colSpan={7}
                    className="text-left pl-1 py-2 text-xs font-semibold text-neutral-900 bg-[#FAFBFC] border-b border-[#E4E8EC]"
                  >
                    Staff required per day
                  </th>
                  <th
                    rowSpan={2}
                    className="text-center px-2 py-3 text-[11px] font-medium uppercase tracking-wider text-[#55606B] bg-[#FAFBFC] border-b-2 border-[#E4E8EC] whitespace-nowrap"
                  >
                    Weekly hours
                  </th>
                  <th
                    rowSpan={2}
                    className="px-1 py-3 bg-[#FAFBFC] border-b-2 border-[#E4E8EC] print:hidden"
                  />
                </tr>
                <tr>
                  {DAYS.map((d) => (
                    <th
                      key={d.key}
                      className={
                        "text-left pl-2 pr-0.5 py-3 text-[11px] font-medium uppercase tracking-wider text-[#55606B] border-b-2 border-[#E4E8EC] whitespace-nowrap " +
                        (d.weekend ? "bg-[#FAFBFC]" : "bg-[#FAFBFC]")
                      }
                    >
                      {d.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const hrs = weeklyByRow.get(row.id) ?? 0;
                  return (
                    <tr key={row.id} className="border-b border-[#E4E8EC] last:border-b-0">
                      <td className="pl-3 pr-1 py-2.5 text-left align-middle">
                        <input
                          type="text"
                          className="w-full min-w-[200px] border border-[#E4E8EC] rounded-md py-2 px-3 text-sm bg-white focus:outline-none focus:border-[#24D9DC] focus:ring-2 focus:ring-[#24D9DC]/20"
                          placeholder="e.g. Morning"
                          value={row.name}
                          onChange={(e) => updateRow(row.id, { name: e.target.value })}
                        />
                      </td>
                      <td className="pl-3 pr-1 py-2.5 text-left align-middle">
                        <input
                          type="time"
                          className="w-full min-w-[170px] border border-[#E4E8EC] rounded-md py-2 px-3 text-sm bg-white focus:outline-none focus:border-[#24D9DC] focus:ring-2 focus:ring-[#24D9DC]/20"
                          value={row.start}
                          onChange={(e) =>
                            handleTimeChange(row.id, "start", e.target.value)
                          }
                        />
                      </td>
                      <td className="pl-3 pr-1 py-2.5 text-left align-middle">
                        <input
                          type="time"
                          className="w-full min-w-[170px] border border-[#E4E8EC] rounded-md py-2 px-3 text-sm bg-white focus:outline-none focus:border-[#24D9DC] focus:ring-2 focus:ring-[#24D9DC]/20"
                          value={row.finish}
                          onChange={(e) =>
                            handleTimeChange(row.id, "finish", e.target.value)
                          }
                        />
                      </td>
                      <td className="pl-3 pr-1 py-2.5 text-left align-middle">
                        <input
                          type="number"
                          className="w-full min-w-[110px] border border-[#E4E8EC] rounded-md py-2 px-3 text-sm text-center bg-white focus:outline-none focus:border-[#24D9DC] focus:ring-2 focus:ring-[#24D9DC]/20"
                          min="0"
                          max="24"
                          step="0.25"
                          placeholder="hrs"
                          value={row.duration}
                          onChange={(e) => handleDurationChange(row.id, e.target.value)}
                        />
                      </td>
                      {DAYS.map((d) => (
                        <td
                          key={d.key}
                          className={
                            "pl-2 pr-0.5 py-2.5 text-left align-middle " +
                            (d.weekend ? "bg-[#FAFBFC]" : "")
                          }
                        >
                          <input
                            type="number"
                            className="w-full min-w-[50px] border border-[#E4E8EC] rounded-md py-2 px-1 text-sm text-center bg-white focus:outline-none focus:border-[#24D9DC] focus:ring-2 focus:ring-[#24D9DC]/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            min="0"
                            step="1"
                            value={row.qty[d.key]}
                            onChange={(e) =>
                              updateRowQty(row.id, d.key, e.target.value)
                            }
                          />
                        </td>
                      ))}
                      <td className="px-2 py-2.5 text-center align-middle font-semibold text-sm whitespace-nowrap min-w-[90px]">
                        {hrs > 0 ? fmt(hrs, hrs % 1 ? 2 : 0) : "—"}
                      </td>
                      <td className="px-1 py-2.5 text-center align-middle print:hidden">
                        <button
                          type="button"
                          onClick={() => removeRow(row.id)}
                          className="text-[#9AA3AC] hover:text-[#F67D00] hover:bg-[#FFF4E8] rounded-md px-2.5 py-1.5 text-lg leading-none transition-colors"
                          aria-label="Remove shift"
                          title="Remove shift"
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile / tablet card layout — shown below lg breakpoint */}
          <div className="xl:hidden print:hidden divide-y divide-[#E4E8EC]">
            {rows.map((row, idx) => {
              const hrs = weeklyByRow.get(row.id) ?? 0;
              return (
                <div key={row.id} className="p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-[11px] font-medium uppercase tracking-wider text-[#55606B]">
                      Shift {idx + 1}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeRow(row.id)}
                      className="text-[#9AA3AC] hover:text-[#F67D00] hover:bg-[#FFF4E8] rounded-md px-2.5 py-1 text-lg leading-none transition-colors"
                      aria-label="Remove shift"
                      title="Remove shift"
                    >
                      ×
                    </button>
                  </div>

                  <div className="mb-3">
                    <label className="block text-[11px] font-medium text-[#55606B] mb-1">
                      Shift name <span className="font-light">(optional)</span>
                    </label>
                    <input
                      type="text"
                      className="w-full border border-[#E4E8EC] rounded-md py-2 px-3 text-sm bg-white focus:outline-none focus:border-[#24D9DC] focus:ring-2 focus:ring-[#24D9DC]/20"
                      placeholder="e.g. Morning"
                      value={row.name}
                      onChange={(e) => updateRow(row.id, { name: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div>
                      <label className="block text-[11px] font-medium text-[#55606B] mb-1">
                        Start
                      </label>
                      <input
                        type="time"
                        className="w-full border border-[#E4E8EC] rounded-md py-2 px-2 text-sm bg-white focus:outline-none focus:border-[#24D9DC] focus:ring-2 focus:ring-[#24D9DC]/20"
                        value={row.start}
                        onChange={(e) =>
                          handleTimeChange(row.id, "start", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-[#55606B] mb-1">
                        Finish
                      </label>
                      <input
                        type="time"
                        className="w-full border border-[#E4E8EC] rounded-md py-2 px-2 text-sm bg-white focus:outline-none focus:border-[#24D9DC] focus:ring-2 focus:ring-[#24D9DC]/20"
                        value={row.finish}
                        onChange={(e) =>
                          handleTimeChange(row.id, "finish", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-[#55606B] mb-1">
                        Duration (hrs)
                      </label>
                      <input
                        type="number"
                        className="w-full border border-[#E4E8EC] rounded-md py-2 px-2 text-sm text-center bg-white focus:outline-none focus:border-[#24D9DC] focus:ring-2 focus:ring-[#24D9DC]/20"
                        min="0"
                        max="24"
                        step="0.25"
                        placeholder="hrs"
                        value={row.duration}
                        onChange={(e) => handleDurationChange(row.id, e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-medium uppercase tracking-wider text-[#55606B] mb-1.5">
                      Staff required per day
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {DAYS.map((d) => (
                        <div key={d.key}>
                          <div className="text-[10px] font-medium uppercase text-[#55606B] text-center mb-0.5">
                            {d.label}
                          </div>
                          <input
                            type="number"
                            className={
                              "w-full border border-[#E4E8EC] rounded-md py-2 px-1 text-sm text-center bg-white focus:outline-none focus:border-[#24D9DC] focus:ring-2 focus:ring-[#24D9DC]/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none " +
                              (d.weekend ? "bg-[#FAFBFC]" : "")
                            }
                            min="0"
                            step="1"
                            value={row.qty[d.key]}
                            onChange={(e) =>
                              updateRowQty(row.id, d.key, e.target.value)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 flex justify-between items-center pt-3 border-t border-[#F0F3F6]">
                    <span className="text-xs font-medium uppercase tracking-wider text-[#55606B]">
                      Weekly hours
                    </span>
                    <span className="font-semibold text-sm">
                      {hrs > 0 ? fmt(hrs, hrs % 1 ? 2 : 0) : "—"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-between sm:items-center gap-3 px-4 sm:px-5 py-3.5 bg-[#FAFBFC] border-t border-[#E4E8EC] print:hidden">
            <button
              type="button"
              onClick={addRow}
              className="w-full sm:w-auto border-2 border-[#2D3BEA] text-[#2D3BEA] bg-white font-semibold text-sm px-4 py-2 rounded-lg hover:bg-[#2D3BEA] hover:text-white transition-colors"
            >
              + Add shift
            </button>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5">
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,text/csv"
                hidden
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={handleUploadClick}
                title="Load a demand model from a CSV file"
                className="border-2 border-[#2D3BEA] text-[#2D3BEA] bg-white font-semibold text-sm px-4 py-2 rounded-lg hover:bg-[#2D3BEA] hover:text-white transition-colors"
              >
                Upload CSV
              </button>
              <button
                type="button"
                onClick={handleDownloadCsv}
                title="Save this demand model as a CSV file"
                className="border-2 border-[#2D3BEA] text-[#2D3BEA] bg-white font-semibold text-sm px-4 py-2 rounded-lg hover:bg-[#2D3BEA] hover:text-white transition-colors"
              >
                Download CSV
              </button>
              <button
                type="button"
                onClick={handlePdf}
                title="Download this demand model as a PDF report"
                className="col-span-2 sm:col-auto border-2 border-[#03F9BE] bg-[#03F9BE] text-[#0D0D0D] font-semibold text-sm px-4 py-2 rounded-lg hover:brightness-95 transition"
              >
                Download PDF report
              </button>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 mt-6 sm:mt-7">
          <div className="bg-white border border-[#E4E8EC] border-t-4 border-t-[#24D9DC] rounded-[10px] p-4 sm:p-5 shadow-[0_2px_10px_rgba(26,26,46,0.05)]">
            <div className="text-xs font-medium uppercase tracking-wider text-[#55606B] mb-2">
              Total weekly demand
            </div>
            <div className="text-[28px] sm:text-[34px] font-semibold leading-tight">
              {fmt(totalHours, totalHours % 1 ? 1 : 0)}{" "}
              <span className="text-base sm:text-lg font-normal">hrs</span>
            </div>
            <div className="text-xs font-light text-[#6B7280] mt-1.5">
              Sum of all shift hours across the week
            </div>
          </div>

          <div className="bg-white border border-[#E4E8EC] border-t-4 border-t-[#24D9DC] rounded-[10px] p-4 sm:p-5 shadow-[0_2px_10px_rgba(26,26,46,0.05)]">
            <div className="text-xs font-medium uppercase tracking-wider text-[#55606B] mb-2">
              Hours per FTE
            </div>
            <div>
              <input
                type="number"
                className="w-[100px] sm:w-[110px] text-[22px] sm:text-[26px] font-semibold text-center py-1 px-2 border border-[#E4E8EC] rounded-md focus:outline-none focus:border-[#24D9DC] focus:ring-2 focus:ring-[#24D9DC]/20"
                min="1"
                step="0.5"
                value={hoursPerFte}
                onChange={(e) => setHoursPerFte(e.target.value)}
              />
            </div>
            <div className="text-xs font-light text-[#6B7280] mt-1.5">
              Contracted weekly hours for one full-time staff member
            </div>
          </div>

          <div className="bg-white border border-[#E4E8EC] border-t-4 border-t-[#24D9DC] rounded-[10px] p-4 sm:p-5 shadow-[0_2px_10px_rgba(26,26,46,0.05)]">
            <div className="text-xs font-medium uppercase tracking-wider text-[#55606B] mb-2 flex items-center gap-1.5">
              <span>Scaling factor</span>
              <span className="group relative inline-flex">
                <HiInformationCircle
                  className="w-4 h-4 text-[#9AA3AC] hover:text-[#24D9DC] cursor-help"
                  aria-label="About the scaling factor"
                />
                <span
                  role="tooltip"
                  className="pointer-events-none absolute left-1/2 sm:left-full top-full sm:top-1/2 z-20 mt-2 sm:mt-0 sm:ml-3 w-[280px] sm:w-[420px] max-w-[calc(100vw-2rem)] -translate-x-1/2 sm:translate-x-0 sm:-translate-y-1/2 rounded-lg bg-neutral-900 px-4 py-3 text-[13px] font-normal normal-case tracking-normal leading-relaxed text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
                >
                  With a 0% scaling factor, this is the FTE needed to cover
                  demand exactly as entered. Since staff take annual leave,
                  sick leave and training, the FTE you employ typically needs
                  to be higher. A common starting point is 15–20% — tune it
                  to your team&apos;s historical leave and absence rates.
                  <span className="hidden sm:block absolute top-1/2 -left-1 h-2 w-2 -translate-y-1/2 rotate-45 bg-neutral-900" />
                </span>
              </span>
            </div>
            <div>
              <input
                type="number"
                className="w-[80px] sm:w-[90px] text-[22px] sm:text-[26px] font-semibold text-center py-1 px-2 border border-[#E4E8EC] rounded-md focus:outline-none focus:border-[#24D9DC] focus:ring-2 focus:ring-[#24D9DC]/20"
                min="0"
                step="1"
                value={scaleFactor}
                onChange={(e) => setScaleFactor(e.target.value)}
              />
              <span className="text-[20px] sm:text-[22px] font-medium text-[#55606B] ml-1">%</span>
            </div>
            <div className="text-xs font-light text-[#6B7280] mt-1.5">
              Uplift for annual leave, sick leave, training and other systemic
              inefficiency
            </div>
          </div>

          <div className="bg-[#E6FDF8] border border-[#E4E8EC] border-t-4 border-t-[#03F9BE] rounded-[10px] p-4 sm:p-5 shadow-[0_2px_10px_rgba(26,26,46,0.05)]">
            <div className="text-xs font-medium uppercase tracking-wider text-[#55606B] mb-2">
              Required FTE
            </div>
            <div className="text-[32px] sm:text-[42px] font-semibold leading-tight">
              {requiredFteDisplay}
            </div>
            <div className="text-xs font-light text-[#6B7280] mt-1.5">
              {requiredFteSub}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-4 sm:mt-5">
          <div className="bg-white border border-[#E4E8EC] border-t-4 border-t-[#24D9DC] rounded-[10px] p-4 sm:p-5 shadow-[0_2px_10px_rgba(26,26,46,0.05)]">
            <div className="text-xs font-medium uppercase tracking-wider text-[#55606B] mb-2">
              FTE available
            </div>
            <div>
              <input
                type="number"
                className="w-[100px] sm:w-[110px] text-[22px] sm:text-[26px] font-semibold text-center py-1 px-2 border border-[#E4E8EC] rounded-md focus:outline-none focus:border-[#24D9DC] focus:ring-2 focus:ring-[#24D9DC]/20"
                min="0"
                step="0.1"
                placeholder="—"
                value={fteAvailable}
                onChange={(e) => setFteAvailable(e.target.value)}
              />
            </div>
            <div className="text-xs font-light text-[#6B7280] mt-1.5">
              The FTE you currently have (or plan to have) on this roster
            </div>
          </div>

          <div
            className={
              "bg-white border border-[#E4E8EC] border-t-4 rounded-[10px] p-4 sm:p-5 shadow-[0_2px_10px_rgba(26,26,46,0.05)] " +
              balanceBorder
            }
          >
            <div className="text-xs font-medium uppercase tracking-wider text-[#55606B] mb-2">
              {balance.label}
            </div>
            <div className={"text-[32px] sm:text-[42px] font-semibold leading-tight " + balanceValueClass}>
              {balance.value}
            </div>
            <div className="text-xs font-light text-[#6B7280] mt-1.5">
              FTE available − required FTE
            </div>
          </div>
        </section>

        <section className="mt-10 sm:mt-14 print:hidden">
          <div className="mb-5 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
              More useful pieces for you
            </h2>
            <p className="mt-1 text-sm text-[#55606B]">
              Now that you know your FTE requirement, here&apos;s what to look
              at next.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <Link
              href="/tools/roi-calculator"
              className="group bg-white rounded-[10px] border border-[#E4E8EC] shadow-[0_2px_10px_rgba(26,26,46,0.05)] overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-40 bg-gradient-to-br from-[#E6FDF8] to-[#F7F9FB]">
                <Image
                  src="/images/og-images/ROICalc.png"
                  alt="ROI Calculator"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <div className="text-xs font-semibold text-[#2D3BEA] uppercase tracking-wide mb-1">
                  Tool
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-1 group-hover:text-[#2D3BEA] transition-colors">
                  ROI Calculator
                </h3>
                <p className="text-sm text-[#55606B]">
                  Estimate the time and money you&apos;ll save by automating
                  your rostering with RosterLab.
                </p>
                <span className="mt-3 inline-flex items-center text-sm font-semibold text-[#2D3BEA] group-hover:gap-2 gap-1 transition-all">
                  Calculate savings
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </Link>

            <Link
              href="/whitepapers/rostering-as-a-strategic-workforce-lever"
              className="group bg-white rounded-[10px] border border-[#E4E8EC] shadow-[0_2px_10px_rgba(26,26,46,0.05)] overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-40 bg-gradient-to-br from-[#E6FDF8] to-[#F7F9FB]">
                <Image
                  src="/images/og-images/whitepaper start.png"
                  alt="Rostering as a Strategic Workforce Lever whitepaper"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <div className="text-xs font-semibold text-[#2D3BEA] uppercase tracking-wide mb-1">
                  Whitepaper
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-1 group-hover:text-[#2D3BEA] transition-colors">
                  Rostering as a strategic workforce lever
                </h3>
                <p className="text-sm text-[#55606B]">
                  How healthcare executives turn rostering into a lever for
                  cost, retention and patient outcomes.
                </p>
                <span className="mt-3 inline-flex items-center text-sm font-semibold text-[#2D3BEA] group-hover:gap-2 gap-1 transition-all">
                  Read the whitepaper
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </Link>

            <Link
              href="/book-a-demo"
              className="group relative bg-gradient-to-br from-[#2D3BEA] to-[#0369a1] text-white rounded-[10px] border border-[#E4E8EC] shadow-[0_2px_10px_rgba(26,26,46,0.05)] overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
            >
              {/* Decorative background pattern */}
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-8 w-56 h-56 text-white/10"
                viewBox="0 0 200 200"
                fill="none"
              >
                <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="100" cy="100" r="65" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="1.5" />
              </svg>

              {/* Floating icon */}
              <div
                aria-hidden="true"
                className="absolute right-6 bottom-6 w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/20 group-hover:scale-105 transition-transform"
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <div className="relative p-6 flex flex-col h-full">
                <div className="text-xs font-semibold uppercase tracking-wide mb-2 opacity-90">
                  Talk to us
                </div>
                <h3 className="text-xl font-semibold mb-4 max-w-[85%]">
                  Turn your FTE requirement into an optimal roster
                </h3>
                <p className="text-sm opacity-90 mb-6 leading-relaxed max-w-[85%]">
                  Book a walkthrough with our experts. See how RosterLab plans
                  your coverage across every skill, rule and preference — so
                  you can focus on the work that matters.
                </p>
                <span className="mt-auto inline-flex items-center text-sm font-semibold group-hover:gap-2 gap-1 transition-all">
                  Book a demo
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </section>

      </Container>

      {showGate && (
        <div
          className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto print:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="fte-gate-title"
          onClick={() => setShowGate(false)}
        >
          <div
            className="bg-white rounded-xl max-w-md w-full p-5 sm:p-6 shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-3">
              <h3
                id="fte-gate-title"
                className="text-xl sm:text-2xl font-semibold text-neutral-900"
              >
                Download your FTE report
              </h3>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setShowGate(false)}
                className="text-neutral-400 hover:text-neutral-600 -mr-1 -mt-1 text-2xl leading-none"
              >
                ×
              </button>
            </div>
            <p className="text-sm text-[#55606B] mb-5">
              Enter your details and we&apos;ll open the PDF report for you.
              We&apos;ll also share workforce planning insights from time to
              time — no spam.
            </p>

            <form onSubmit={handleGateSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="fte-gate-firstname"
                    className="block text-xs font-medium text-[#55606B] mb-1"
                  >
                    First name
                  </label>
                  <input
                    id="fte-gate-firstname"
                    type="text"
                    autoComplete="given-name"
                    value={gateFirstName}
                    onChange={(e) => setGateFirstName(e.target.value)}
                    className="w-full border border-[#E4E8EC] rounded-md py-2 px-3 text-sm bg-white focus:outline-none focus:border-[#24D9DC] focus:ring-2 focus:ring-[#24D9DC]/20"
                  />
                </div>
                <div>
                  <label
                    htmlFor="fte-gate-lastname"
                    className="block text-xs font-medium text-[#55606B] mb-1"
                  >
                    Last name
                  </label>
                  <input
                    id="fte-gate-lastname"
                    type="text"
                    autoComplete="family-name"
                    value={gateLastName}
                    onChange={(e) => setGateLastName(e.target.value)}
                    className="w-full border border-[#E4E8EC] rounded-md py-2 px-3 text-sm bg-white focus:outline-none focus:border-[#24D9DC] focus:ring-2 focus:ring-[#24D9DC]/20"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="fte-gate-email"
                  className="block text-xs font-medium text-[#55606B] mb-1"
                >
                  Work email <span className="text-[#F67D00]">*</span>
                </label>
                <input
                  id="fte-gate-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={gateEmail}
                  onChange={(e) => setGateEmail(e.target.value)}
                  className="w-full border border-[#E4E8EC] rounded-md py-2 px-3 text-sm bg-white focus:outline-none focus:border-[#24D9DC] focus:ring-2 focus:ring-[#24D9DC]/20"
                />
              </div>
              <div>
                <label
                  htmlFor="fte-gate-company"
                  className="block text-xs font-medium text-[#55606B] mb-1"
                >
                  Company
                </label>
                <input
                  id="fte-gate-company"
                  type="text"
                  autoComplete="organization"
                  value={gateCompany}
                  onChange={(e) => setGateCompany(e.target.value)}
                  className="w-full border border-[#E4E8EC] rounded-md py-2 px-3 text-sm bg-white focus:outline-none focus:border-[#24D9DC] focus:ring-2 focus:ring-[#24D9DC]/20"
                />
              </div>

              {gateError && (
                <p className="text-sm text-[#F67D00]" role="alert">
                  {gateError}
                </p>
              )}

              <button
                type="submit"
                disabled={gateSubmitting}
                className="w-full mt-2 bg-[#2D3BEA] hover:bg-[#2431c4] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm py-2.5 px-4 rounded-md transition-colors"
              >
                {gateSubmitting ? "Preparing report…" : "Download PDF report"}
              </button>
              <p className="text-[11px] text-neutral-500 text-center">
                By downloading, you agree to receive occasional updates from
                RosterLab. Unsubscribe any time.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
