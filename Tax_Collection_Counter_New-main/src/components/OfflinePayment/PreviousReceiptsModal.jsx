import React, { useState, useEffect } from "react";
import CounterReceiptModal from "./CounterReceiptModal";

export default function PreviousReceiptsModal({ isOpen, onClose }) {
  const [toastMessage, setToastMessage] = useState("");
  const [selectedReceipt, setSelectedReceipt] = useState(null);

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

  const triggerDownload = (receipt) => {
    setSelectedReceipt(receipt);
  };

  if (!isOpen) return null;

  const receipts = [
    {
      no: "RCP-2023-8821",
      amount: "₹ 18,450",
      date: "15 May 2023",
      source: "Online Portal",
      mode: "Credit Card",
      year: "2023-24",
      remark: "Full Payment",
    },
    {
      no: "RCP-2022-4412",
      amount: "₹ 17,200",
      date: "12 Jun 2022",
      source: "CFC Counter",
      mode: "Cash",
      year: "2022-23",
      remark: "Full Payment",
    },
    {
      no: "RCP-2021-1092",
      amount: "₹ 16,800",
      date: "20 May 2021",
      source: "Online Portal",
      mode: "UPI",
      year: "2021-22",
      remark: "Full Payment",
    },
  ];

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal Window */}
        <div className="relative bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200 z-10">
          {/* Header */}
          <div className="bg-primary px-6 py-4 flex justify-between items-center text-white">
            <h3 className="font-headline-md text-headline-md text-white flex items-center gap-2 font-bold">
              <span className="material-symbols-outlined">history</span>
              Download Bill Receipt
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

          {/* Table Container */}
          <div className="p-6 overflow-y-auto max-h-[70vh]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead className="bg-surface-muted text-on-surface-variant font-label-md text-label-sm uppercase tracking-wider">
                  <tr className="border-b border-border-default">
                    <th className="p-3 font-semibold">Download</th>
                    <th className="p-3 font-semibold">Receipt No.</th>
                    <th className="p-3 font-semibold">Amount</th>
                    <th className="p-3 font-semibold">Transaction Date</th>
                    <th className="p-3 font-semibold">Payment Resource</th>
                    <th className="p-3 font-semibold">Payment Mode</th>
                    <th className="p-3 font-semibold">Finance Year</th>
                    <th className="p-3 font-semibold">Remark</th>
                  </tr>
                </thead>
                <tbody className="font-body-sm text-body-sm text-on-surface divide-y divide-border-default">
                  {receipts.map((r) => (
                    <tr key={r.no} className="hover:bg-surface-container-low transition-colors">
                      <td className="p-3">
                        <button
                          type="button"
                          onClick={() => triggerDownload(r)}
                          title="View & Download Official Receipt"
                          className="text-primary hover:scale-110 transition-transform cursor-pointer p-1 rounded-md hover:bg-surface-container"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            description
                          </span>
                        </button>
                      </td>
                      <td className="p-3 font-semibold text-primary">{r.no}</td>
                      <td className="p-3 font-medium">{r.amount}</td>
                      <td className="p-3 text-on-surface-variant">{r.date}</td>
                      <td className="p-3 text-on-surface-variant">{r.source}</td>
                      <td className="p-3 text-on-surface-variant">{r.mode}</td>
                      <td className="p-3 text-on-surface-variant">{r.year}</td>
                      <td className="p-3 text-on-surface-variant">{r.remark}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-surface-muted border-t border-border-default flex justify-end">
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

      {/* Floating Toast */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] bg-success-leaf text-white px-6 py-3 rounded-full shadow-lg font-label-md animate-in fade-in slide-in-from-bottom-4 duration-300 flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Official Counter Receipt Modal for Previous Receipts */}
      <CounterReceiptModal
        isOpen={!!selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
        receiptData={{
          receiptNo: selectedReceipt?.no || "RCP-2023-8821",
          amount: selectedReceipt?.amount ? selectedReceipt.amount.replace(/[^0-9]/g, "") : "18450",
          amountWords: "अठरा हजार चारशे पन्नास रुपये फक्त.",
          ownerName: "गायकवाड मंगेश पुंडळीक",
          propertyNo: "१०२",
          wardNo: "४१",
          oldPropNo: "२७२६+४१५५",
          bookNo: "२०२६VDC१",
        }}
      />
    </>
  );
}
