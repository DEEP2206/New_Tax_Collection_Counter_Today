import React, { useState } from "react";
import NoticeBillModal from "../OfflinePayment/NoticeBillModal";
import ValuationSheetModal from "../OfflinePayment/ValuationSheetModal";
import AssessmentRegisterModal from "../OfflinePayment/AssessmentRegisterModal";
import PreviousReceiptsModal from "../OfflinePayment/PreviousReceiptsModal";

export default function PaymentFailureStep({
  failureData,
  propertyData,
  onRetryTransaction,
  onBackToProperty,
  onReturnToSearch,
}) {
  const transactionId = failureData?.transactionId || "TXN-9847291048VAD";
  const transactionDate =
    failureData?.transactionDate ||
    new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  const propertyNo = failureData?.propertyNo || propertyData?.propertyNo || "A7-101()";
  const ward = failureData?.ward || "Ward 04";
  const attemptedAmount = failureData?.attemptedAmount || failureData?.totalPayable || 500;
  const errorMessage =
    failureData?.errorMessage ||
    "Your transaction could not be verified: Invalid signature passed.";

  // Modals state
  const [isNoticeBillOpen, setIsNoticeBillOpen] = useState(false);
  const [isValuationSheetOpen, setIsValuationSheetOpen] = useState(false);
  const [isAssessmentRegisterOpen, setIsAssessmentRegisterOpen] = useState(false);
  const [isReceiptsModalOpen, setIsReceiptsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  function formatCurrency(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-slate-50 text-slate-800 flex flex-col justify-between antialiased selection:bg-rose-100 selection:text-rose-900 rounded-2xl my-2 overflow-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <span className="material-symbols-outlined text-emerald-400 text-lg">
            check_circle
          </span>
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main
        className="flex-1 bg-slate-100/70 py-6 sm:py-8 px-4 flex flex-col items-center"
        data-purpose="error-presentation"
      >
        <div className="w-full max-w-4xl space-y-6">
          {/* Quick Action Bar like reference image */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsAssessmentRegisterOpen(true)}
              className="inline-flex items-center space-x-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-medium px-3.5 py-1.5 rounded-full hover:bg-slate-50 transition-colors shadow-xs cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-sm text-slate-500">
                description
              </span>
              <span>Abstract Register</span>
            </button>

            <button
              type="button"
              onClick={() => setIsNoticeBillOpen(true)}
              className="inline-flex items-center space-x-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-medium px-3.5 py-1.5 rounded-full hover:bg-slate-50 transition-colors shadow-xs cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-sm text-slate-500">
                mail
              </span>
              <span>Notice Bill</span>
            </button>

            <button
              type="button"
              onClick={() => setIsValuationSheetOpen(true)}
              className="inline-flex items-center space-x-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-medium px-3.5 py-1.5 rounded-full hover:bg-slate-50 transition-colors shadow-xs cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-sm text-slate-500">
                receipt_long
              </span>
              <span>Valuation Sheet</span>
            </button>

            <button
              type="button"
              onClick={() => setIsReceiptsModalOpen(true)}
              className="inline-flex items-center space-x-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-medium px-3.5 py-1.5 rounded-full hover:bg-slate-50 transition-colors shadow-xs cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-sm text-slate-500">
                history
              </span>
              <span>Previous Receipts</span>
            </button>
          </div>

          {/* Main Failure Card Container */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md overflow-hidden p-6 sm:p-8 space-y-6 animate-error-card">
            {/* Top Red Banner (Failed Counterpart to Green Success Banner) */}
            <div className="bg-red-600 rounded-xl text-white text-center py-7 px-4 shadow-inner flex flex-col items-center justify-center space-y-2.5">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-red-600 shadow-sm">
                <span className="material-symbols-outlined text-3xl font-bold">
                  close
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                Payment Failed
              </h2>
              <p className="text-xs sm:text-sm text-red-100 max-w-md font-normal">
                {errorMessage}
              </p>
            </div>

            {/* Section Heading */}
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Transaction Details
              </h3>
            </div>

            {/* 2x2 Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Card 1: Transaction ID */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex flex-col justify-center space-y-1">
                <span className="text-xs text-slate-500 font-medium">
                  Transaction ID
                </span>
                <span className="text-sm sm:text-base font-bold font-mono text-slate-800 tracking-wide">
                  {transactionId}
                </span>
              </div>

              {/* Card 2: Date & Time */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex flex-col justify-center space-y-1">
                <span className="text-xs text-slate-500 font-medium">
                  Transaction Date &amp; Time
                </span>
                <span className="text-sm sm:text-base font-bold text-slate-800">
                  {transactionDate}
                </span>
              </div>

              {/* Card 3: Property No. / Ward */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex flex-col justify-center space-y-1">
                <span className="text-xs text-slate-500 font-medium">
                  Property No. / Ward
                </span>
                <span className="text-sm sm:text-base font-bold text-slate-800">
                  {propertyNo} • {ward}
                </span>
              </div>

              {/* Card 4: Attempted Amount */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex flex-col justify-center space-y-1">
                <span className="text-xs text-slate-500 font-medium">
                  Attempted Amount
                </span>
                <span className="text-base sm:text-lg font-bold text-red-600">
                  ₹ {formatCurrency(attemptedAmount)}.00
                </span>
              </div>
            </div>

            {/* Failure Notice Callout */}
            <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded-r-lg text-xs text-amber-900 flex items-start space-x-2.5">
              <span className="material-symbols-outlined text-amber-600 text-lg shrink-0">
                warning
              </span>
              <p className="leading-relaxed">
                If your bank account was debited, the amount will be automatically
                refunded by the gateway within 3–5 working days. No tax liability
                credit has been applied.
              </p>
            </div>

            {/* Action Buttons Row */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onRetryTransaction}
                className="inline-flex items-center space-x-1.5 bg-[#073b8f] hover:bg-[#002665] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg shadow-xs transition-colors cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-base">refresh</span>
                <span>Retry Transaction</span>
              </button>

              <button
                type="button"
                onClick={onBackToProperty}
                className="inline-flex items-center space-x-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs sm:text-sm font-medium px-4 py-2.5 rounded-lg transition-colors cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-base">
                  arrow_back
                </span>
                <span>Back to Property</span>
              </button>

              <button
                type="button"
                onClick={onReturnToSearch}
                className="inline-flex items-center space-x-1.5 bg-white hover:bg-slate-50 text-sky-600 border border-sky-300 text-xs sm:text-sm font-medium px-4 py-2.5 rounded-lg transition-colors cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-base">search</span>
                <span>Return to Search</span>
              </button>
            </div>

            {/* Help / Grievance Card */}
            <div className="border-t border-slate-100 pt-5">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                Need Assistance?
              </h4>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100/70 text-[#073b8f] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">
                      support_agent
                    </span>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800">
                      Municipal Helpline: 1800-120-8040
                    </p>
                    <p className="text-xs text-slate-500">
                      Have your Transaction ID {transactionId} ready when contacting support.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    showToast(
                      "Support request initiated. A civic officer will contact you."
                    )
                  }
                  className="inline-flex items-center space-x-1.5 bg-[#073b8f] hover:bg-[#002665] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shrink-0 shadow-xs cursor-pointer active:scale-95"
                >
                  <span className="material-symbols-outlined text-base">
                    contact_support
                  </span>
                  <span>Contact Helpdesk</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Compliance & Trust Badges Footer */}
      <footer
        className="w-full bg-white border-t border-slate-200 py-4 px-4"
        data-purpose="security-footer"
      >
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center flex-wrap justify-center gap-4 sm:gap-6 font-semibold tracking-wider text-slate-600">
            {/* UPI */}
            <div className="flex items-center space-x-1">
              <span className="text-sm font-extrabold italic text-slate-800">
                UPI
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
            <span className="text-slate-300">|</span>

            {/* Visa */}
            <span className="font-black italic text-blue-900 text-sm tracking-tighter">
              VISA
            </span>

            {/* MasterCard Circles */}
            <div className="flex items-center -space-x-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-red-500 opacity-90"></span>
              <span className="w-3.5 h-3.5 rounded-full bg-amber-400 opacity-90"></span>
            </div>

            {/* RuPay */}
            <span className="font-bold text-slate-800">
              RuPay<span className="text-orange-500">❯</span>
            </span>
            <span className="text-slate-300">|</span>

            {/* PCI-DSS */}
            <div className="flex items-center space-x-1 border border-slate-300 rounded px-1.5 py-0.5 text-[10px] font-mono uppercase bg-slate-50 text-slate-700">
              <svg
                className="w-3 h-3 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  clipRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  fillRule="evenodd"
                ></path>
              </svg>
              <span>PCI-DSS</span>
            </div>
            <span className="text-slate-300 hidden sm:inline">|</span>

            {/* Razorpay */}
            <div className="flex items-center space-x-1 text-slate-800">
              <svg
                className="w-3 h-3 text-amber-500 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
              </svg>
              <span className="font-bold text-xs tracking-tight text-slate-700">
                Razorpay
              </span>
            </div>
          </div>

          <div className="text-center md:text-right text-[11px] text-slate-400">
            Accept, process and disburse digital payments securely for civic
            services.
          </div>
        </div>
      </footer>

      {/* Modals */}
      <NoticeBillModal
        isOpen={isNoticeBillOpen}
        onClose={() => setIsNoticeBillOpen(false)}
        propertyData={propertyData}
      />
      <ValuationSheetModal
        isOpen={isValuationSheetOpen}
        onClose={() => setIsValuationSheetOpen(false)}
        propertyData={propertyData}
      />
      <AssessmentRegisterModal
        isOpen={isAssessmentRegisterOpen}
        onClose={() => setIsAssessmentRegisterOpen(false)}
        propertyData={propertyData}
      />
      <PreviousReceiptsModal
        isOpen={isReceiptsModalOpen}
        onClose={() => setIsReceiptsModalOpen(false)}
      />
    </div>
  );
}
