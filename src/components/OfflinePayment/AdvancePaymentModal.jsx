import React, { useState, useEffect } from "react";

export default function AdvancePaymentModal({
  isOpen,
  onClose,
  propertyId = "V01103",
  isOnlineMode = false,
  mobileNo = "9876543210",
  onProceedToOnlineGateway,
  onAdvanceSuccess,
}) {
  const [advanceStep, setAdvanceStep] = useState("form"); // 'form' | 'success'
  const advanceYear = "2027-2028";
  const [advanceAmount, setAdvanceAmount] = useState(1200);
  const [advancePayMode, setAdvancePayMode] = useState("Cash");
  const [advanceInstrumentNo, setAdvanceInstrumentNo] = useState("");
  const [advanceError, setAdvanceError] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      setAdvanceStep("form");
      setAdvanceError("");
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function formatCurrency(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const handleProceedToRazorpayAdvance = (amtToUse) => {
    const amt = parseFloat(amtToUse !== undefined ? amtToUse : advanceAmount);
    if (isNaN(amt) || amt < 100) {
      setAdvanceError("Please enter a valid amount (minimum ₹100).");
      return;
    }
    setAdvanceError("");
    onClose();
    if (onProceedToOnlineGateway) {
      onProceedToOnlineGateway({
        payingAmount: amt,
        paymentType: "advance",
        paymentMode: "Razorpay",
        mobileNo: mobileNo || "9876543210",
        remarks: `Advance Payment for ${advanceYear} (Property ${propertyId})`,
      });
    }
  };

  const handleAdvanceSubmit = () => {
    const amt = parseFloat(advanceAmount);
    if (isNaN(amt) || amt < 100) {
      setAdvanceError("Please enter a valid amount (minimum ₹100).");
      return;
    }
    setAdvanceError("");
    setAdvanceStep("success");
    if (onAdvanceSuccess) {
      onAdvanceSuccess({
        amount: amt,
        year: advanceYear,
        paymentMode: advancePayMode,
        instrumentNo: advanceInstrumentNo,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 overflow-y-auto backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-xl shadow-2xl overflow-hidden my-8 border border-border-default animate-in zoom-in-95 duration-150">
        <div className="bg-[#062B6F] p-4 flex justify-between items-center text-on-primary">
          <div>
            <h3 className="font-headline-md text-base font-bold text-white">
              Make Advance Payment
            </h3>
            <p className="font-label-sm text-xs opacity-80 text-primary-fixed">
              अग्रिम कर भरणा - Vadgaon Mawal
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="text-on-primary hover:opacity-80 p-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {advanceStep === "form" ? (
          <div className="p-6 flex flex-col gap-4">
            <div className="bg-surface-muted p-3.5 rounded-lg border border-border-default flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-label-sm text-xs text-on-surface-variant">
                  Property Number
                </span>
                <span className="font-body-md text-sm font-bold text-primary">
                  {propertyId}
                </span>
              </div>
              <div className="flex items-center gap-1 text-success-leaf font-semibold text-xs">
                <span className="material-symbols-outlined text-base">
                  check_circle
                </span>
                <span>No dues pending</span>
              </div>
            </div>

            <div>
              <label className="block font-label-sm text-xs text-on-surface-variant mb-1 font-medium">
                Custom Advance Payment Amount (₹) *
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-on-surface-variant font-bold text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min={100}
                  step={50}
                  value={advanceAmount}
                  onChange={(e) => setAdvanceAmount(e.target.value)}
                  placeholder="Enter custom amount"
                  className="w-full pl-8 pr-3 py-2 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none font-headline-md text-base font-bold text-on-surface"
                />
              </div>
              {advanceError && (
                <p className="text-error text-xs mt-1 font-semibold">
                  {advanceError}
                </p>
              )}
            </div>

            <div>
              <span className="block font-label-sm text-xs text-on-surface-variant mb-1.5 font-medium">
                Quick Preset Amounts
              </span>
              <div className="flex flex-wrap gap-2">
                {[1000, 2000, 5000, 1200].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      setAdvanceAmount(preset);
                      setAdvanceError("");
                    }}
                    className={`px-3 py-1 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
                      advanceAmount === preset
                        ? "border-secondary text-secondary bg-secondary-fixed"
                        : "border-border-default text-on-surface hover:bg-surface-container"
                    }`}
                  >
                    {preset === 1200
                      ? `Full Year Estimate (₹1,200)`
                      : `₹${formatCurrency(preset)}`}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-label-sm text-xs text-on-surface-variant mb-1.5 font-medium">
                Select Payment Mode *
              </label>
              {isOnlineMode ? (
                <div
                  onClick={() => handleProceedToRazorpayAdvance()}
                  className="group flex items-center justify-between p-3.5 border-2 border-primary bg-primary/5 hover:bg-primary/10 rounded-xl cursor-pointer transition-all shadow-xs"
                  role="button"
                  tabIndex={0}
                  title="Click to proceed with Razorpay"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="advancePaymentMode"
                      checked={true}
                      readOnly
                      className="w-4 h-4 text-primary focus:ring-primary accent-primary cursor-pointer"
                    />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors">
                          Razorpay
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                          Online Gateway
                        </span>
                      </div>
                      <span className="text-xs text-on-surface-variant">
                        UPI, Credit / Debit Cards, Net Banking
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-primary">
                    <span className="text-xs font-semibold text-primary group-hover:underline">
                      Pay Now
                    </span>
                    <span className="material-symbols-outlined text-base">
                      arrow_forward
                    </span>
                  </div>
                </div>
              ) : (
                <select
                  value={advancePayMode}
                  onChange={(e) => setAdvancePayMode(e.target.value)}
                  className="w-full p-2.5 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none font-body-md text-sm text-on-surface bg-white cursor-pointer font-medium"
                >
                  <option value="Cash">Cash</option>
                  <option value="DD">DD</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Card Payment">Card Payment</option>
                  <option value="NEFT">NEFT</option>
                  <option value="RTGS">RTGS</option>
                </select>
              )}
            </div>

            {!isOnlineMode && advancePayMode !== "Cash" && (
              <div>
                <label className="block font-label-sm text-xs text-on-surface-variant mb-1 font-medium">
                  {advancePayMode === "Cheque"
                    ? "Cheque Number (Optional)"
                    : advancePayMode === "DD"
                    ? "DD Number (Optional)"
                    : advancePayMode === "Card Payment"
                    ? "Transaction / Auth Code (Optional)"
                    : "UTR / Transaction Reference (Optional)"}
                </label>
                <input
                  type="text"
                  value={advanceInstrumentNo}
                  onChange={(e) => setAdvanceInstrumentNo(e.target.value)}
                  placeholder={
                    advancePayMode === "Cheque"
                      ? "e.g. 123456"
                      : advancePayMode === "DD"
                      ? "e.g. DD-789456"
                      : advancePayMode === "Card Payment"
                      ? "e.g. TXN-9842"
                      : "e.g. UTR123456789"
                  }
                  className="w-full px-3 py-2 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none font-body-md text-sm text-on-surface bg-white"
                />
              </div>
            )}

            <div className="bg-surface-container p-3 rounded-lg border border-border-default flex items-start gap-2.5 text-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-secondary text-lg flex-shrink-0 mt-0.5">
                info
              </span>
              <p>
                Advance payment helps you avoid future late fees and qualifies you for municipal early-bird rebates of up to 5%.
              </p>
            </div>

            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2 border border-outline-variant rounded-lg font-button-text text-sm hover:bg-surface-container transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (isOnlineMode) {
                    handleProceedToRazorpayAdvance();
                  } else {
                    handleAdvanceSubmit();
                  }
                }}
                className="flex-1 py-2 bg-[#062B6F] hover:bg-[#041F52] text-white rounded-lg font-button-text text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer font-bold"
              >
                <span className="material-symbols-outlined text-base">
                  {isOnlineMode ? "credit_card" : "payments"}
                </span>
                <span>
                  {isOnlineMode
                    ? "Proceed to Razorpay"
                    : "Proceed to Pay Advance"}
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 flex flex-col items-center text-center gap-4">
            <span
              className="material-symbols-outlined text-success-leaf text-6xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
            <h4 className="text-headline-md font-headline-md text-primary font-bold text-lg">
              Advance Payment Recorded!
            </h4>
            <p className="text-on-surface-variant text-sm">
              Advance payment of{" "}
              <strong className="text-success-leaf font-bold">
                ₹{formatCurrency(advanceAmount)}.00
              </strong>{" "}
              has been processed successfully.
            </p>
            <div className="bg-surface-muted p-4 rounded-lg w-full text-xs text-on-surface-variant flex flex-col gap-1 text-left border border-border-default">
              <div className="flex justify-between">
                <span>Property No:</span>
                <strong className="text-on-surface">{propertyId}</strong>
              </div>
              <div className="flex justify-between">
                <span>Payment Mode:</span>
                <strong className="text-on-surface">{advancePayMode}</strong>
              </div>
              {advanceInstrumentNo && (
                <div className="flex justify-between">
                  <span>Instrument / Ref No:</span>
                  <strong className="text-on-surface">
                    {advanceInstrumentNo}
                  </strong>
                </div>
              )}
              <div className="flex justify-between">
                <span>Reference ID:</span>
                <strong className="text-on-surface">
                  ADV-8067-{advanceYear.split("-")[0]}
                </strong>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 bg-[#062B6F] hover:bg-[#041F52] text-white rounded-lg font-button-text text-sm transition-all cursor-pointer font-bold shadow-sm"
            >
              Done / Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
