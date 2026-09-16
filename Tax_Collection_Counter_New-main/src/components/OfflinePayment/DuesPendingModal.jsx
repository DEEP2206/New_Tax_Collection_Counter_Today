import React, { useEffect } from "react";

export default function DuesPendingModal({
  isOpen,
  onClose,
  propertyNo,
  ownerName,
}) {
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

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200 z-10 border border-border-default">
        {/* Header */}
        <div className="bg-amber-600 px-6 py-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-2xl">warning</span>
            <div>
              <h3 className="font-bold text-base leading-tight">Dues Are Pending</h3>
              <p className="text-xs text-amber-100">थकबाकी प्रलंबित आहे</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="text-white/80 hover:text-white transition-colors cursor-pointer p-1 rounded-md"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-4 text-on-surface">
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 p-4 rounded-xl">
            <span className="material-symbols-outlined text-amber-600 text-2xl flex-shrink-0 mt-0.5">
              error_outline
            </span>
            <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              <p className="font-bold text-amber-950 mb-1">
                Cannot Download Abstract Register
              </p>
              <p>
                Property tax dues are pending for this property. The official{" "}
                <strong>Abstract from Assessment Register (आकारणी नोंदवही उतारा)</strong>{" "}
                is only accessible after completing the <strong>Total Payment</strong> in full.
              </p>
            </div>
          </div>

          {/* Property Summary */}
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 flex flex-col gap-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 font-medium">Property No:</span>
              <span className="font-bold text-primary">{propertyNo || "A3-102()"}</span>
            </div>
            {ownerName && (
              <div className="flex justify-between items-center">
                <span className="text-slate-600 font-medium">Owner Name:</span>
                <span className="font-semibold text-slate-800 truncate max-w-[220px]">
                  {ownerName}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-slate-600 font-medium">Payment Status:</span>
              <span className="inline-flex items-center gap-1 font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full text-[11px]">
                <span className="material-symbols-outlined text-xs">pending</span>
                Dues Pending (थकबाकी बाकी)
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500 text-center px-2">
            Please proceed with the <strong>Total Payment</strong> to view and download the official Abstract Register document.
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 bg-primary text-on-primary rounded-lg font-button-text text-sm hover:opacity-90 transition-opacity cursor-pointer font-bold shadow-xs"
          >
            Understood / Close
          </button>
        </div>
      </div>
    </div>
  );
}
