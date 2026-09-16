import React, { useState } from "react";
import CounterReceiptModal from "./CounterReceiptModal";
import AssessmentRegisterModal from "./AssessmentRegisterModal";
import NoticeBillModal from "./NoticeBillModal";
import ValuationSheetModal from "./ValuationSheetModal";
import PreviousReceiptsModal from "./PreviousReceiptsModal";
import DuesPendingModal from "./DuesPendingModal";
import AdvancePaymentModal from "./AdvancePaymentModal";

export default function PaymentSuccessStep({
  transactionData,
  onReturnToSearch,
  onBackToVerify,
  isOnline = false,
  onProceedToOnlineGateway,
}) {
  const isOnlineMode =
    isOnline ||
    Boolean(transactionData?.isOnline) ||
    Boolean(transactionData?.details?.gateway === "Razorpay") ||
    Boolean(transactionData?.remarks?.includes("Online Payment"));

  const propertyId =
    transactionData?.propertyId ||
    transactionData?.propertyData?.propertyNo ||
    (isOnlineMode ? "V1-109-10(A9)" : "A7-101()");
  const amountPaid = transactionData?.totalPayable || (isOnlineMode ? 500 : 20378);
  const transactionId = "8067Q7AW7P101D";
  const transactionDate = "Aug 31, 2026, 11:42 AM";
  const paymentType = transactionData?.paymentType || "total";
  const isPartialPayment = paymentType === "partial";
  const isPendingPayment =
    paymentType === "pending" ||
    transactionData?.totalPayable === 16044 ||
    amountPaid === 16044;
  const isFullPayment =
    !isPartialPayment &&
    !isPendingPayment &&
    (paymentType === "total" || amountPaid >= 20000 || paymentType === "advance" || paymentType === "no_due");

  const propertyData = transactionData?.propertyData || {
    propertyNo: propertyId,
    ownerName: transactionData?.ownerName || "Uttam Ananda Patil",
    address: transactionData?.address || "Housing Society, Vadgaon Mawal",
    totalPayable: amountPaid,
  };

  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isAssessmentRegisterOpen, setIsAssessmentRegisterOpen] = useState(false);
  const [isNoticeBillOpen, setIsNoticeBillOpen] = useState(false);
  const [isValuationSheetOpen, setIsValuationSheetOpen] = useState(false);
  const [isReceiptsModalOpen, setIsReceiptsModalOpen] = useState(false);
  const [isDuesPendingModalOpen, setIsDuesPendingModalOpen] = useState(false);

  function formatCurrency(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Toast Notification
  const [toastMessage, setToastMessage] = useState("");
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // No Due Modal State
  const [isNoDueModalOpen, setIsNoDueModalOpen] = useState(false);
  const [noDueStep, setNoDueStep] = useState("form"); // 'form' | 'confirm' | 'success'
  const [noDueMobile, setNoDueMobile] = useState("9876543210");
  const [noDueEmail, setNoDueEmail] = useState("");
  const [noDuePaymentMode, setNoDuePaymentMode] = useState("");
  const [noDueError, setNoDueError] = useState("");

  // Advance Payment Modal State
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [advanceStep, setAdvanceStep] = useState("form"); // 'form' | 'success'
  const advanceYear = "2027-2028";
  const [advanceAmount, setAdvanceAmount] = useState(1200);
  const [advancePayMode, setAdvancePayMode] = useState("Cash");
  const [advanceInstrumentNo, setAdvanceInstrumentNo] = useState("");
  const [advanceError, setAdvanceError] = useState("");

  // PDF download simulation
  const handleDownloadReceipt = () => {
    showToast("Receipt PDF downloaded successfully.");
  };

  // No Due Proceed Handlers
  const handleProceedToRazorpayNoDue = () => {
    if (!noDueMobile || !/^\d{10}$/.test(noDueMobile)) {
      setNoDueError("Please enter a valid 10-digit Mobile Number.");
      return;
    }
    setNoDueError("");
    setIsNoDueModalOpen(false);
    if (onProceedToOnlineGateway) {
      onProceedToOnlineGateway({
        payingAmount: 50,
        paymentType: "no_due",
        paymentMode: "Razorpay",
        mobileNo: noDueMobile,
        email: noDueEmail,
        remarks: `Payment for No Due Certificate (Property ${propertyId})`,
      });
    }
  };

  const handleNoDueValidate = () => {
    if (!noDueMobile || !/^\d{10}$/.test(noDueMobile)) {
      setNoDueError("Please enter a valid 10-digit Mobile Number.");
      return;
    }
    if (!noDuePaymentMode) {
      setNoDueError("Please select a Payment Mode.");
      return;
    }
    setNoDueError("");
    setNoDueStep("confirm");
  };

  const handleNoDueConfirm = () => {
    setNoDueStep("success");
    setTimeout(() => {
      showToast("No Due Certificate downloaded successfully.");
      setIsNoDueModalOpen(false);
      setNoDueStep("form");
    }, 1800);
  };

  // Advance Payment Handlers
  const handleProceedToRazorpayAdvance = (amtToUse) => {
    const amt = parseFloat(amtToUse !== undefined ? amtToUse : advanceAmount);
    if (isNaN(amt) || amt < 100) {
      setAdvanceError("Please enter a valid amount (minimum ₹100).");
      return;
    }
    setAdvanceError("");
    setIsAdvanceModalOpen(false);
    if (onProceedToOnlineGateway) {
      onProceedToOnlineGateway({
        payingAmount: amt,
        paymentType: "advance",
        paymentMode: "Razorpay",
        mobileNo: transactionData?.mobileNumber || "9876543210",
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
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-start py-6 px-margin-mobile md:px-margin-desktop animate-in fade-in duration-300 gap-4">
      {/* Top Action Buttons Row */}
      {!isOnlineMode && (
        <div className="w-full max-w-3xl flex flex-wrap items-center justify-start gap-3">
          <button
            type="button"
            onClick={() => {
              if (isFullPayment) {
                setIsAssessmentRegisterOpen(true);
              } else {
                setIsDuesPendingModalOpen(true);
              }
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-[#059669] to-[#0d9488] text-white border border-transparent px-4 py-2 rounded-lg font-button-text text-sm hover:opacity-95 hover:shadow-md transition-all shadow-xs whitespace-nowrap cursor-pointer btn-gradient-abstract"
          >
            <span className="material-symbols-outlined text-[19px]">
              description
            </span>
            <span>Abstract Register</span>
          </button>

          <button
            type="button"
            onClick={() => setIsNoticeBillOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] text-white border border-transparent px-4 py-2 rounded-lg font-button-text text-sm hover:opacity-95 hover:shadow-md transition-all shadow-xs whitespace-nowrap cursor-pointer btn-gradient-notice"
          >
            <span className="material-symbols-outlined text-[19px]">mail</span>
            <span>Notice Bill</span>
          </button>

          <button
            type="button"
            onClick={() => setIsValuationSheetOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-[#d97706] to-[#ea580c] text-white border border-transparent px-4 py-2 rounded-lg font-button-text text-sm hover:opacity-95 hover:shadow-md transition-all shadow-xs whitespace-nowrap cursor-pointer btn-gradient-valuation"
          >
            <span className="material-symbols-outlined text-[19px]">
              receipt
            </span>
            <span>Valuation Sheet</span>
          </button>

          <button
            type="button"
            onClick={() => setIsReceiptsModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-[#0284c7] to-[#0891b2] text-white border border-transparent px-4 py-2 rounded-lg font-button-text text-sm hover:opacity-95 hover:shadow-md transition-all shadow-xs whitespace-nowrap cursor-pointer btn-gradient-receipts"
          >
            <span className="material-symbols-outlined text-[19px]">
              history
            </span>
            <span>Previous Receipts</span>
          </button>
        </div>
      )}

      <div className="w-full max-w-3xl bg-surface-container-lowest rounded-xl shadow-lg border border-border-default overflow-hidden">
        {/* Success Banner */}
        <div className="bg-success-leaf text-on-primary py-stack-lg px-gutter flex flex-col items-center justify-center text-center">
          <span
            className="material-symbols-outlined text-6xl mb-4"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
          <h1 className="font-headline-lg text-headline-lg font-bold mb-2">
            Payment Done Successfully
          </h1>
          <p className="font-body-md text-body-md opacity-90">
            Your property tax payment has been processed.
          </p>
        </div>

        {/* Digital Receipt Content */}
        <div className="p-gutter md:p-margin-desktop flex flex-col gap-stack-lg">
          <h2 className="font-headline-md text-headline-md text-primary font-bold border-b border-border-default pb-2">
            Digital Receipt Details
          </h2>

          {/* Bento Grid Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
            <div className="bg-surface-muted p-4 rounded-lg border border-border-default">
              <span className="font-label-sm text-xs text-on-surface-variant block mb-1">
                Transaction ID
              </span>
              <span className="font-body-lg text-sm md:text-base font-semibold text-on-surface break-all">
                {transactionId}
              </span>
            </div>

            <div className="bg-surface-muted p-4 rounded-lg border border-border-default">
              <span className="font-label-sm text-xs text-on-surface-variant block mb-1">
                Transaction Date &amp; Time
              </span>
              <span className="font-body-lg text-sm md:text-base font-semibold text-on-surface">
                {transactionDate}
              </span>
            </div>

            <div className="bg-surface-muted p-4 rounded-lg border border-border-default">
              <span className="font-label-sm text-xs text-on-surface-variant block mb-1">
                Property No.
              </span>
              <span className="font-body-lg text-sm md:text-base font-semibold text-on-surface">
                {propertyId}
              </span>
            </div>

            <div className="bg-surface-muted p-4 rounded-lg border border-border-default">
              <span className="font-label-sm text-xs text-on-surface-variant block mb-1">
                Total Amount Paid
              </span>
              <span className="font-headline-md text-xl font-bold text-success-leaf">
                ₹{formatCurrency(amountPaid)}.00
              </span>
            </div>
          </div>

          {/* Actions Row */}
          {!isFullPayment ? (
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 pt-stack-lg mt-stack-md border-t border-border-default">
              {/* Download Receipt */}
              <button
                type="button"
                onClick={() => setIsReceiptModalOpen(true)}
                className="btn-gradient-download h-11 w-full text-white font-button-text text-xs rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 px-2 text-center min-w-0 cursor-pointer font-semibold"
              >
                <span className="material-symbols-outlined text-base flex-shrink-0 text-white">
                  download
                </span>
                <span className="truncate text-white">Download Receipt (PDF)</span>
              </button>

              {/* Back button */}
              <button
                type="button"
                onClick={onBackToVerify}
                className="h-11 w-full bg-surface-container border border-outline-variant text-on-surface font-button-text text-xs rounded-lg hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2 px-2 text-center min-w-0 cursor-pointer font-semibold"
              >
                <span className="material-symbols-outlined text-base flex-shrink-0">
                  arrow_back
                </span>
                <span className="truncate">Back</span>
              </button>

              {/* Return to Search */}
              <button
                type="button"
                onClick={onReturnToSearch}
                className="h-11 w-full bg-surface text-secondary border border-secondary font-button-text text-xs rounded-lg hover:bg-secondary-fixed transition-colors flex items-center justify-center gap-2 px-2 text-center min-w-0 cursor-pointer font-semibold"
              >
                <span className="material-symbols-outlined text-base flex-shrink-0">
                  search
                </span>
                <span className="truncate">Return to Search</span>
              </button>
            </div>
          ) : (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-stack-lg mt-stack-md border-t border-border-default">
              {/* Download Receipt */}
              <button
                type="button"
                onClick={() => setIsReceiptModalOpen(true)}
                className="btn-gradient-download h-11 w-full text-white font-button-text text-xs rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 px-2 text-center min-w-0 cursor-pointer font-semibold"
              >
                <span className="material-symbols-outlined text-base flex-shrink-0 text-white">
                  download
                </span>
                <span className="truncate text-white">Download Receipt (PDF)</span>
              </button>

              {/* Back */}
              <button
                type="button"
                onClick={onBackToVerify}
                className="h-11 w-full bg-surface-container border border-outline-variant text-on-surface font-button-text text-xs rounded-lg hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2 px-2 text-center min-w-0 cursor-pointer font-semibold"
              >
                <span className="material-symbols-outlined text-base flex-shrink-0">
                  arrow_back
                </span>
                <span className="truncate">Back</span>
              </button>

              {/* Return to Search */}
              <button
                type="button"
                onClick={onReturnToSearch}
                className="h-11 w-full bg-surface text-secondary border border-secondary font-button-text text-xs rounded-lg hover:bg-secondary-fixed transition-colors flex items-center justify-center gap-2 px-2 text-center min-w-0 cursor-pointer font-semibold"
              >
                <span className="material-symbols-outlined text-base flex-shrink-0">
                  search
                </span>
                <span className="truncate">Return to Search</span>
              </button>

              {/* Advance Payment */}
              <button
                type="button"
                onClick={() => {
                  setIsAdvanceModalOpen(true);
                  setAdvanceStep("form");
                }}
                className="h-11 w-full bg-[#062B6F] hover:bg-[#041F52] border border-transparent text-white font-button-text text-xs rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 px-2 text-center min-w-0 cursor-pointer font-semibold"
              >
                <span className="material-symbols-outlined text-base flex-shrink-0 text-white">
                  payments
                </span>
                <span className="truncate text-white">Advance Payment</span>
              </button>
            </div>
          )}

          {/* No Due Certificate Card - only for full payment */}
          {isFullPayment && (
            <div className="mt-stack-lg pt-stack-lg border-t border-border-default">
              <h2 className="font-headline-md text-headline-md text-primary font-bold mb-4">
                No Due Certificate
              </h2>
              <div className="bg-surface-muted p-6 rounded-lg border border-border-default flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-success-leaf text-3xl">
                    verified
                  </span>
                  <p className="font-body-md text-sm md:text-base text-on-surface">
                    No dues are pending for this property.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsNoDueModalOpen(true);
                    setNoDueStep("form");
                    setNoDueError("");
                  }}
                  className="btn-gradient-download w-full md:w-auto text-white font-button-text text-sm py-2.5 px-6 rounded-lg shadow-sm hover:-translate-y-1 hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer font-semibold"
                >
                  <span className="material-symbols-outlined text-lg text-white">
                    download
                  </span>
                  <span className="text-white">Download No Due Certificate</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* No Due Certificate Modal */}
      {isNoDueModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-xl shadow-2xl overflow-hidden border border-border-default animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="bg-primary p-4 flex justify-between items-center text-on-primary">
              <h3 className="text-on-primary font-headline-md text-base font-bold">
                Payment for No Due Certificate
              </h3>
              <button
                type="button"
                onClick={() => setIsNoDueModalOpen(false)}
                className="text-on-primary hover:opacity-80 p-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Step 1: Form */}
            {noDueStep === "form" && (
              <div className="p-6 flex flex-col gap-4">
                <div>
                  <label className="block font-label-sm text-xs text-on-surface-variant mb-1 font-medium">
                    Mobile No. *
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    value={noDueMobile}
                    onChange={(e) => setNoDueMobile(e.target.value)}
                    className="w-full p-2 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-xs text-on-surface-variant mb-1 font-medium">
                    Email ID
                  </label>
                  <input
                    type="email"
                    value={noDueEmail}
                    onChange={(e) => setNoDueEmail(e.target.value)}
                    placeholder="optional@example.com"
                    className="w-full p-2 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-xs text-on-surface-variant mb-1.5 font-medium">
                    Payment Mode *
                  </label>
                  {isOnlineMode ? (
                    <div
                      onClick={handleProceedToRazorpayNoDue}
                      className="group flex items-center justify-between p-3.5 border-2 border-primary bg-primary/5 hover:bg-primary/10 rounded-xl cursor-pointer transition-all shadow-xs"
                      role="button"
                      tabIndex={0}
                      title="Click to proceed with Razorpay"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="noDuePaymentMode"
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
                      value={noDuePaymentMode}
                      onChange={(e) => setNoDuePaymentMode(e.target.value)}
                      className="w-full p-2 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm bg-white cursor-pointer"
                    >
                      <option value="">Select Mode</option>
                      <option value="Cash">Cash</option>
                      <option value="DD">DD</option>
                      <option value="Cheque">Cheque</option>
                      <option value="Card Payment">Card Payment</option>
                      <option value="NEFT">NEFT</option>
                      <option value="RTGS">RTGS</option>
                    </select>
                  )}
                </div>
                <div>
                  <label className="block font-label-sm text-xs text-on-surface-variant mb-1 font-medium">
                    Total Payable Amount
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="₹50"
                    className="w-full p-2 bg-surface-muted border border-outline-variant rounded-lg outline-none font-bold text-sm"
                  />
                </div>

                {noDueError && (
                  <p className="text-error text-xs font-semibold">{noDueError}</p>
                )}

                <div className="flex gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsNoDueModalOpen(false)}
                    className="flex-1 py-2 border border-outline-variant rounded-lg font-button-text text-sm hover:bg-surface-container transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (isOnlineMode) {
                        handleProceedToRazorpayNoDue();
                      } else {
                        handleNoDueValidate();
                      }
                    }}
                    className="flex-1 py-2 bg-success-leaf text-on-primary rounded-lg font-button-text text-sm hover:opacity-90 transition-opacity cursor-pointer font-bold flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base">
                      {isOnlineMode ? "credit_card" : "check"}
                    </span>
                    <span>
                      {isOnlineMode ? "Pay via Razorpay (₹50)" : "Pay Now"}
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Confirm */}
            {noDueStep === "confirm" && (
              <div className="p-6 flex flex-col gap-4">
                <div className="bg-surface-muted p-4 rounded-lg flex flex-col gap-2 text-xs font-body-sm">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Property No:</span>
                    <span className="font-bold">{propertyId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Certificate:</span>
                    <span className="font-bold">No Due Certificate</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Amount:</span>
                    <span className="font-bold">₹50</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Payment Mode:</span>
                    <span className="font-bold">{noDuePaymentMode}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setNoDueStep("form")}
                    className="flex-1 py-2 border border-outline-variant rounded-lg font-button-text text-sm hover:bg-surface-container transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNoDueConfirm}
                    className="flex-1 py-2 bg-primary text-on-primary rounded-lg font-button-text text-sm hover:opacity-90 transition-opacity cursor-pointer font-bold"
                  >
                    Confirm Payment
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Success */}
            {noDueStep === "success" && (
              <div className="p-8 flex flex-col items-center text-center gap-4">
                <span className="material-symbols-outlined text-success-leaf text-6xl">
                  check_circle
                </span>
                <h4 className="text-headline-md font-headline-md text-base font-bold">
                  Payment Successful!
                </h4>
                <p className="text-on-surface-variant text-sm">
                  Your No Due Certificate is being downloaded.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Advance Payment Modal */}
      <AdvancePaymentModal
        isOpen={isAdvanceModalOpen}
        onClose={() => setIsAdvanceModalOpen(false)}
        propertyId={propertyId}
        isOnlineMode={isOnlineMode}
        mobileNo={transactionData?.mobileNumber || "9876543210"}
        onProceedToOnlineGateway={onProceedToOnlineGateway}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[110] bg-success-leaf text-white px-6 py-3 rounded-full shadow-lg font-label-md animate-in fade-in slide-in-from-bottom-4 duration-300 flex items-center gap-2 text-sm font-semibold">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Official Counter Payment Receipt Modal */}
      <CounterReceiptModal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        receiptData={{
          ownerName: "देवयानी संजय कामत,सिद्धेश संजय कामत,नीता पांडुरंग फुगरे",
          propertyNo: propertyId || "१०४",
          amount: amountPaid || "५",
          amountWords: "पाच रुपये फक्त मिळाले.",
          receiptNo: "१४४",
          bookNo: "२०२६VDC१",
        }}
      />

      {/* Abstract Register Modal */}
      <AssessmentRegisterModal
        isOpen={isAssessmentRegisterOpen}
        onClose={() => setIsAssessmentRegisterOpen(false)}
        propertyData={propertyData}
      />

      {/* Notice Bill Modal */}
      <NoticeBillModal
        isOpen={isNoticeBillOpen}
        onClose={() => setIsNoticeBillOpen(false)}
        propertyData={propertyData}
      />

      {/* Valuation Sheet Modal */}
      <ValuationSheetModal
        isOpen={isValuationSheetOpen}
        onClose={() => setIsValuationSheetOpen(false)}
        propertyData={propertyData}
      />

      {/* Previous Receipts Modal */}
      <PreviousReceiptsModal
        isOpen={isReceiptsModalOpen}
        onClose={() => setIsReceiptsModalOpen(false)}
      />

      {/* Dues Pending Modal */}
      <DuesPendingModal
        isOpen={isDuesPendingModalOpen}
        onClose={() => setIsDuesPendingModalOpen(false)}
        propertyNo={propertyId}
        ownerName={propertyData?.ownerName}
      />
    </div>
  );
}
