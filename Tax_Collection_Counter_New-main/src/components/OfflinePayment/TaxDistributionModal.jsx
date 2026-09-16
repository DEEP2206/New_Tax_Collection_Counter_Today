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
    { name: "सामान्य कर रु.", prev: "₹ 3,555", curr: "₹ 1,185", total: "₹ 4,740" },
    { name: "शिक्षण कर रु.", prev: "₹ 321", curr: "₹ 107", total: "₹ 428" },
    { name: "रोजगार कर रु.", prev: "₹ 42", curr: "₹ 14", total: "₹ 56" },
    { name: "उपयोगकर्ता शुल्क रु.", prev: "₹ 1,620", curr: "₹ 540", total: "₹ 2,160" },
    { name: "पथकर कर रु.", prev: "₹ 75", curr: "₹ 25", total: "₹ 100" },
    { name: "वृक्ष संवर्धन कर रु", prev: "₹ 25", curr: "₹ 0", total: "₹ 25" },
    { name: "स्वच्छता कर रु.", prev: "₹ 123", curr: "₹ 41", total: "₹ 164" },
    { name: "अग्नि शमन कर रु", prev: "₹ 25", curr: "₹ 0", total: "₹ 25" },
    { name: "दिवाबत्ती कर रु", prev: "₹ 0", curr: "₹ 0", total: "₹ 0" },
    { name: "पाणीपट्टी कर रु.", prev: "₹ 0", curr: "₹ 0", total: "₹ 0" },
    { name: "अनाधिकृत शास्ती कर रु.", prev: "₹ 7,110", curr: "₹ 2,370", total: "₹ 9,480" },
    { name: "थकीत रक्कमेवरील शास्ती रु", prev: "₹ 3,357", curr: "₹ 0", total: "₹ 3,357" },
    { name: "एकूण भरावयाची रक्कम रु", prev: "₹ 16,253", curr: "₹ 4,282", total: "₹ 20,535", isBold: true },
    { name: "एकूण करात सूट", prev: "₹ 0", curr: "₹ 157", total: "-₹ 157" },
    { name: "सूट वजा नंतर एकूण रु.", prev: "₹ 16,253", curr: "₹ 4,125", total: "₹ 20,378", isBold: true },
    { name: "अग्रीम रक्कम /इतर कर रु.", prev: "₹ 0", curr: "₹ 0", total: "₹ 0" },
    { name: "अग्रीम रक्कम नंतर एकूण भरणा", prev: "₹ 16,253", curr: "₹ 4,125", total: "₹ 20,378", isBold: true },
    { name: "एकूण भरणा रु.", prev: "₹ 16,253", curr: "₹ 4,125", total: "₹ 20,378", isBold: true },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200 z-10">
        {/* Header */}
        <div className="bg-primary px-6 py-4 flex justify-between items-center text-white">
          <h3 className="font-headline-md text-headline-md text-white flex items-center gap-2 font-bold">
            <span className="material-symbols-outlined">analytics</span>
            Tax Distribution
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
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-muted text-on-surface-variant font-label-md text-label-sm uppercase tracking-wider">
                <th className="p-3 border-b border-border-default font-semibold">Tax Details</th>
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

        {/* Footer */}
        <div className="p-6 bg-surface-muted border-t border-border-default">
          <div className="flex flex-col gap-2 items-end">
            <div className="flex justify-between w-full max-w-[300px]">
              <span className="font-label-md text-on-surface-variant">Total Tax:</span>
              <span className="font-label-md text-on-surface font-semibold">₹ 20,535</span>
            </div>
            <div className="flex justify-between w-full max-w-[300px] text-success-leaf font-semibold">
              <span className="font-label-md">Discount:</span>
              <span className="font-label-md">-₹ 157</span>
            </div>
            <div className="flex justify-between w-full max-w-[300px] pt-2 border-t border-outline-variant">
              <span className="font-headline-md text-primary font-bold">Net Total Payable:</span>
              <span className="font-headline-md text-primary font-bold text-xl">₹ 20,378</span>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg font-button-text text-button-text bg-primary text-white hover:opacity-90 transition-colors shadow-sm cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
