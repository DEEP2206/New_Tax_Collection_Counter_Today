import React from "react";

export default function PaymentModeCard() {
  const modes = [
    { label: "Online (POS)", percent: "40%", color: "bg-[#002665]" },
    { label: "Cash", percent: "25%", color: "bg-[#16a34a]" },
    { label: "NEFT", percent: "10%", color: "bg-[#06b6d4]" },
    { label: "RTGS", percent: "8%", color: "bg-[#0051d5]" },
    { label: "DD (Clear)", percent: "4%", color: "bg-[#f59e0b]" },
    { label: "Cheque (Clear)", percent: "5%", color: "bg-[#ea580c]" },
    { label: "Cheque (InProcess)", percent: "3%", color: "bg-[#eab308]" },
    { label: "Other Payment", percent: "2%", color: "bg-[#ba1a1a]" },
    { label: "Offline Posting (CFC)", percent: "1%", color: "bg-[#9333ea]" },
    { label: "Property Tax Discounts", percent: "1%", color: "bg-[#4f46e5]" },
    { label: "Interest Discounts", percent: "1%", color: "bg-[#8b5cf6]" },
  ];

  return (
    <div className="bg-surface-container-lowest rounded-xl p-stack-lg shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-surface-container flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-headline-md text-headline-md text-on-surface">
          Payment Mode
        </h2>
        <button
          title="More options"
          className="text-on-surface-variant hover:bg-surface-container p-2 rounded-md transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {/* Donut Visualization */}
        <div className="flex justify-center mb-5">
          <div
            className="w-40 h-40 rounded-full flex items-center justify-center relative shadow-xs"
            style={{
              background: `conic-gradient(
                #002665 0% 40%,
                #16a34a 40% 65%,
                #06b6d4 65% 75%,
                #0051d5 75% 83%,
                #f59e0b 83% 87%,
                #ea580c 87% 92%,
                #eab308 92% 95%,
                #ba1a1a 95% 97%,
                #9333ea 97% 98%,
                #4f46e5 98% 99%,
                #8b5cf6 99% 100%
              )`,
            }}
          >
            <div className="w-28 h-28 bg-surface-container-lowest rounded-full flex flex-col items-center justify-center text-center shadow-inner">
              <span className="font-headline-md text-headline-md text-on-surface block font-bold leading-tight">
                100%
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant text-[11px] uppercase tracking-wider">
                Total
              </span>
            </div>
          </div>
        </div>

        {/* Breakdown Items */}
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
          {modes.map((m) => (
            <div
              key={m.label}
              className="flex items-center justify-between p-2.5 rounded-lg border border-border-default hover:bg-surface-container-low transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${m.color}`}></div>
                <span className="font-label-md text-label-md text-on-surface truncate">
                  {m.label}
                </span>
              </div>
              <span className="font-label-md text-label-md text-on-surface font-bold flex-shrink-0">
                {m.percent}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
