import React, { useState, useEffect } from "react";

export default function ScannerModal({ isOpen, onClose, onScanSuccess }) {
  const [status, setStatus] = useState("scanning"); // 'scanning' | 'success'

  useEffect(() => {
    if (!isOpen) {
      setStatus("scanning");
      return;
    }

    setStatus("scanning");
    const scanTimer = setTimeout(() => {
      setStatus("success");
      const redirectTimer = setTimeout(() => {
        onScanSuccess({
          propertyNo: "A3-102()",
          ownerName: "John Doe",
          address: "123 Main St, Apt 4B\nNorth Zone, Ward 1A",
          currentYearDues: "₹ 5,200",
          arrears: "₹ 0",
          totalAmount: "₹ 5,200",
        });
        onClose();
      }, 1500);
      return () => clearTimeout(redirectTimer);
    }, 2500);

    return () => clearTimeout(scanTimer);
  }, [isOpen, onClose, onScanSuccess]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300">
      <div className="bg-surface-container-lowest rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-transform duration-300">
        {/* Modal Header */}
        <div className="p-6 border-b border-border-default flex justify-between items-center">
          <h3 className="text-headline-md font-headline-md text-on-surface flex items-center gap-2 font-bold">
            <span className="material-symbols-outlined text-primary">
              qr_code_scanner
            </span>
            Scan Barcode / QR
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close scanner"
            className="text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-full p-2 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8 flex flex-col items-center justify-center bg-surface-muted">
          {/* Scanner Frame */}
          <div className="relative w-64 h-64 border-4 border-primary/30 rounded-xl overflow-hidden mb-6 bg-white shadow-inner">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg z-10"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg z-10"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg z-10"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg z-10"></div>

            {/* QR Background */}
            <img
              alt="QR Code target"
              className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale"
              src="https://lh3.googleusercontent.com/aida/AEtjO1UFJ_pO3EvU7u4UYdaLQVoJTtgLr9B-nub_PusN1XJGqdXg3wtQ2PfLC-p_jgOfxe_ZiwGkByNkkLqghliFquVTAG5AFsaC9VrK883aHMTV4Lj_CLinDGItLsHAZseGebCrnVqceaV0fNk_uLoY4J54Lm7C63OPtoghhZ7Cjz5utzRsvNM3K3JGVFwOUE_53IIExS7Vy-xqQOadMaQQugrXV62_RTzc-rRbfnMid0cm3HfcMnfonMNdg9mP"
            />

            {/* Scanning Laser Line */}
            {status === "scanning" && (
              <div className="absolute left-0 w-full h-0.5 bg-error shadow-[0_0_8px_2px_rgba(186,26,26,0.6)] animate-scan z-20"></div>
            )}
          </div>

          {/* Status Indicator */}
          <div className="text-center h-16 flex flex-col items-center justify-center">
            {status === "scanning" ? (
              <p className="text-body-lg font-body-lg text-on-surface-variant animate-pulse font-medium">
                Scanning barcode / QR code...
              </p>
            ) : (
              <div className="flex flex-col items-center animate-in fade-in duration-200">
                <span className="text-success-leaf font-bold text-headline-md flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-[24px]">
                    check_circle
                  </span>
                  Scan Successful
                </span>
                <p className="text-on-surface-variant text-body-sm">
                  Property Found:{" "}
                  <span className="font-bold text-on-surface">A3-102()</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
