import backgrounds from "./backgrounds.module.css";

const targets = [
  { fte: "0.4", nights: 2.1, weekends: 2.5 },
  { fte: "0.6", nights: 3.2, weekends: 3.7 },
  { fte: "0.7", nights: 3.7, weekends: 4.3 },
  { fte: "0.9", nights: 4.7, weekends: 5.6 },
  { fte: "1.0", nights: 5.3, weekends: 6.2 },
];

const series = [
  { key: "nights", label: "Nights", bar: "bg-[#1396A6]", text: "text-[#096773]" },
  { key: "weekends", label: "Weekends", bar: "bg-[#F0A232]", text: "text-[#895005]" },
] as const;

export default function OttoAnalyseDemo() {
  return (
    <div className={`${backgrounds.analyse} flex flex-col justify-center gap-3 rounded-2xl p-3 sm:p-5 lg:aspect-[4/3] lg:gap-4 xl:p-6`}>
      <p className={`${backgrounds.userMessage} ${backgrounds.userBubble}`}>
        Chart how fairly night and weekend shifts are shared across the team
      </p>

      <figure className="min-w-0 rounded-2xl border border-[#D9DDF0] bg-white p-3 shadow-md shadow-[#1F2A5C]/10 sm:p-4 xl:p-5">
        <figcaption>
          <p className="font-semibold leading-snug text-[#1F2A5C] lg:text-lg">Fair-share shift targets</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">Adjusted for each person’s contracted hours</p>
        </figcaption>

        <div aria-hidden="true">
          <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs text-slate-600">
            <span>Shifts per 28 days</span>
            <div className="flex gap-3">
              {series.map(({ key, label, bar }) => (
                <span key={key} className="inline-flex items-center gap-1.5">
                  <span className={`size-2.5 rounded-sm ${bar}`} />
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div className="relative mt-3 h-28 pl-4 sm:h-32 lg:h-40">
            {[0, 2, 4, 6].map((tick) => (
              <div key={tick} className="absolute inset-x-0 flex items-center gap-1.5" style={{ bottom: `${(tick / 7) * 100}%` }}>
                <span className="absolute text-[10px] tabular-nums text-slate-600">{tick}</span>
                <span className="ml-4 w-full border-t border-slate-200" />
              </div>
            ))}
            <div className="relative grid h-full grid-cols-5">
              {targets.map((target) => (
                <div key={target.fte} className="flex h-full items-end justify-center gap-1 sm:gap-1.5">
                  {series.map(({ key, bar, text }) => (
                    <div key={key} className={`relative w-1/3 max-w-7 rounded-t-sm ${bar}`} style={{ height: `${(target[key] / 7) * 100}%` }}>
                      <span className={`absolute bottom-full left-1/2 -translate-x-1/2 pb-0.5 text-[10px] font-semibold tabular-nums sm:text-xs ${text}`}>
                        {target[key].toFixed(1)}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-5 pl-4 pt-1.5 text-center text-[10px] font-medium text-slate-700 sm:text-xs">
            {targets.map(({ fte }) => <span key={fte}>{fte} FTE</span>)}
          </div>
        </div>

        <table className="sr-only">
          <caption>Target shifts per person over 28 days by full-time equivalent (FTE)</caption>
          <thead>
            <tr><th scope="col">FTE</th><th scope="col">Night shifts</th><th scope="col">Weekend shifts</th></tr>
          </thead>
          <tbody>
            {targets.map(({ fte, nights, weekends }) => (
              <tr key={fte}><th scope="row">{fte}</th><td>{nights}</td><td>{weekends}</td></tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 border-t border-slate-100 pt-2 text-xs leading-relaxed text-slate-600">
          Based on 27 staff and 21.3 total FTE.
        </p>
      </figure>
    </div>
  );
}
