import React, { useEffect } from "react";

export default function TaxDistributionModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const distributionData = [
    {
      name: "सामान्य कर रु.",
      yearWise: "2023-24 & 2024-25",
      yearBreakdown: "23-24: ₹3,555 | 24-25: ₹1,185",
      prev: "₹ 3,555",
      curr: "₹ 1,185",
      total: "₹ 4,740",
    },
    {
      name: "शिक्षण कर रु.",
      yearWise: "2023-24 & 2024-25",
      yearBreakdown: "23-24: ₹321 | 24-25: ₹107",
      prev: "₹ 321",
      curr: "₹ 107",
      total: "₹ 428",
    },
    {
      name: "रोजगार कर रु.",
      yearWise: "2023-24 & 2024-25",
      yearBreakdown: "23-24: ₹42 | 24-25: ₹14",
      prev: "₹ 42",
      curr: "₹ 14",
      total: "₹ 56",
    },
    {
      name: "उपयोगकर्ता शुल्क रु.",
      yearWise: "2023-24 & 2024-25",
      yearBreakdown: "23-24: ₹1,620 | 24-25: ₹540",
      prev: "₹ 1,620",
      curr: "₹ 540",
      total: "₹ 2,160",
    },
    {
      name: "पथकर कर रु.",
      yearWise: "2023-24 & 2024-25",
      yearBreakdown: "23-24: ₹75 | 24-25: ₹25",
      prev: "₹ 75",
      curr: "₹ 25",
      total: "₹ 100",
    },
    {
      name: "वृक्ष संवर्धन कर रु",
      yearWise: "2023-24 (Previous)",
      yearBreakdown: "23-24: ₹25",
      prev: "₹ 25",
      curr: "₹ 0",
      total: "₹ 25",
    },
    {
      name: "स्वच्छता कर रु.",
      yearWise: "2023-24 & 2024-25",
      yearBreakdown: "23-24: ₹123 | 24-25: ₹41",
      prev: "₹ 123",
      curr: "₹ 41",
      total: "₹ 164",
    },
    {
      name: "अग्नि शमन कर रु",
      yearWise: "2023-24 (Previous)",
      yearBreakdown: "23-24: ₹25",
      prev: "₹ 25",
      curr: "₹ 0",
      total: "₹ 25",
    },
    {
      name: "दिवाबत्ती कर रु",
      yearWise: "-",
      yearBreakdown: "-",
      prev: "₹ 0",
      curr: "₹ 0",
      total: "₹ 0",
    },
    {
      name: "पाणीपट्टी कर रु.",
      yearWise: "-",
      yearBreakdown: "-",
      prev: "₹ 0",
      curr: "₹ 0",
      total: "₹ 0",
    },
    {
      name: "अनाधिकृत शास्ती कर रु.",
      yearWise: "2023-24 & 2024-25",
      yearBreakdown: "23-24: ₹7,110 | 24-25: ₹2,370",
      penaltyNote: "Penalty (शास्ती)",
      prev: "₹ 7,110",
      curr: "₹ 2,370",
      total: "₹ 9,480",
    },
    {
      name: "थकीत रक्कमेवरील शास्ती (व्याज) रु",
      yearWise: "2023-24 (Arrears)",
      yearBreakdown: "23-24 Interest: ₹3,357",
      interestNote: "Interest Applicable (12%)",
      prev: "₹ 3,357",
      curr: "₹ 0",
      total: "₹ 3,357",
      hasInterest: true,
    },
    {
      name: "एकूण भरावयाची रक्कम रु",
      yearWise: "2023-24 & 2024-25",
      yearBreakdown: "Prev: ₹16,253 | Curr: ₹4,282",
      prev: "₹ 16,253",
      curr: "₹ 4,282",
      total: "₹ 20,535",
      isBold: true,
    },
    {
      name: "एकूण करात सूट",
      yearWise: "2024-25 (Current)",
      yearBreakdown: "Early Payment Rebate",
      prev: "₹ 0",
      curr: "₹ 157",
      total: "-₹ 157",
    },
    {
      name: "सूट वजा नंतर एकूण रु.",
      yearWise: "2023-24 & 2024-25",
      yearBreakdown: "Prev: ₹16,253 | Curr: ₹4,125",
      prev: "₹ 16,253",
      curr: "₹ 4,125",
      total: "₹ 20,378",
      isBold: true,
    },
    {
      name: "अग्रीम रक्कम /इतर कर रु.",
      yearWise: "-",
      yearBreakdown: "-",
      prev: "₹ 0",
      curr: "₹ 0",
      total: "₹ 0",
    },
    {
      name: "अग्रीम रक्कम नंतर एकूण भरणा",
      yearWise: "2023-24 & 2024-25",
      yearBreakdown: "Net Payable",
      prev: "₹ 16,253",
      curr: "₹ 4,125",
      total: "₹ 20,378",
      isBold: true,
    },
    {
      name: "एकूण भरणा रु.",
      yearWise: "2023-24 & 2024-25",
      yearBreakdown: "Net Payable",
      prev: "₹ 16,253",
      curr: "₹ 4,125",
      total: "₹ 20,378",
      isBold: true,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200 z-10">
        {/* Header */}
        <div className="bg-primary px-6 py-4 flex justify-between items-center text-white">
          <h3 className="font-headline-md text-headline-md text-white flex items-center gap-2 font-bold text-base sm:text-lg">
            <span className="material-symbols-outlined">analytics</span>
            Tax Distribution (कर वाटणी तपशील)
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[70vh]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-surface-muted text-on-surface-variant font-label-md text-xs uppercase tracking-wider">
                  <th className="p-3 border-b border-border-default font-semibold">
                    Tax Details
                  </th>
                  <th className="p-3 border-b border-border-default font-semibold text-slate-700">
                    Year Wise Taxes
                  </th>
                  <th className="p-3 border-b border-border-default text-right font-semibold">
                    Previous Balance
                  </th>
                  <th className="p-3 border-b border-border-default text-right font-semibold">
                    Current Balance
                  </th>
                  <th className="p-3 border-b border-border-default text-right font-semibold">
                    Total Amount
                  </th>
                </tr>
              </thead>
              <tbody className="font-body-sm text-body-sm text-on-surface divide-y divide-border-default">
                {distributionData.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      row.isBold
                        ? "bg-surface-container-low/50 font-semibold"
                        : "hover:bg-surface-container-low"
                    }`}
                  >
                    <td
                      className={`p-3 ${
                        row.isBold
                          ? "font-bold text-red-700"
                          : "font-medium text-red-700"
                      }`}
                    >
                      {row.name}
                    </td>

                    {/* Year Wise Taxes Column */}
                    <td className="p-3 text-xs">
                      {row.yearWise !== "-" ? (
                        <div className="flex flex-col gap-0.5">
                          <span className="font-semibold text-slate-800 whitespace-nowrap">
                            {row.yearWise}
                          </span>
                          {row.yearBreakdown && row.yearBreakdown !== "-" && (
                            <span className="text-[11px] text-slate-500 whitespace-nowrap font-mono">
                              {row.yearBreakdown}
                            </span>
                          )}
                          {row.interestNote && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100/90 px-1.5 py-0.5 rounded border border-amber-300 w-fit mt-0.5">
                              <span className="material-symbols-outlined text-[12px]">
                                percent
                              </span>
                              {row.interestNote}
                            </span>
                          )}
                          {row.penaltyNote && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-800 bg-red-100/90 px-1.5 py-0.5 rounded border border-red-300 w-fit mt-0.5">
                              {row.penaltyNote}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-400 font-mono">-</span>
                      )}
                    </td>

                    <td
                      className={`p-3 text-right ${
                        row.isBold
                          ? "font-bold text-on-surface"
                          : "text-on-surface-variant"
                      }`}
                    >
                      {row.prev}
                    </td>
                    <td
                      className={`p-3 text-right ${
                        row.isBold
                          ? "font-bold text-on-surface"
                          : "text-on-surface-variant"
                      }`}
                    >
                      {row.curr}
                    </td>
                    <td
                      className={`p-3 text-right font-semibold ${
                        row.isBold
                          ? "font-bold text-primary text-base"
                          : "text-primary"
                      }`}
                    >
                      {row.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-surface-muted border-t border-border-default">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-xs text-on-surface-variant flex flex-col gap-1">
              <span className="font-semibold text-slate-800">
                Financial Years Reference:
              </span>
              <span className="text-slate-600">
                • <strong>Previous Balance:</strong> FY 2023-24 (including applicable 12% interest on arrears)
              </span>
              <span className="text-slate-600">
                • <strong>Current Balance:</strong> FY 2024-25 (includes early payment discount)
              </span>
            </div>

            <div className="flex flex-col gap-1.5 items-end w-full sm:w-auto">
              <div className="flex justify-between gap-8 w-full sm:min-w-[280px]">
                <span className="font-label-md text-sm text-on-surface-variant">
                  Total Tax:
                </span>
                <span className="font-label-md text-sm text-on-surface font-semibold">
                  ₹ 20,535
                </span>
              </div>
              <div className="flex justify-between gap-8 w-full sm:min-w-[280px] text-success-leaf font-semibold">
                <span className="font-label-md text-sm">Discount (सवलत):</span>
                <span className="font-label-md text-sm">-₹ 157</span>
              </div>
              <div className="flex justify-between gap-8 w-full sm:min-w-[280px] pt-2 border-t border-outline-variant">
                <span className="font-headline-md text-primary font-bold text-sm sm:text-base">
                  Net Total Payable:
                </span>
                <span className="font-headline-md text-primary font-bold text-lg sm:text-xl">
                  ₹ 20,378
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg font-button-text text-sm bg-primary text-white hover:opacity-90 transition-colors shadow-sm cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
