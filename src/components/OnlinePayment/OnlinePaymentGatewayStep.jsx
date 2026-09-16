import React, { useState, useEffect, useRef } from "react";

export default function OnlinePaymentGatewayStep({
  propertyData,
  paymentDetails,
  attemptCount = 1,
  onConfirmPayment,
  onPaymentFailure,
  onBackToVerify,
}) {
  const propertyId = propertyData?.propertyNo || "JALA726741";
  const ownerName = propertyData?.ownerName || "Uttam Ananda Patil";
  const mobileNumber = paymentDetails?.mobileNo || "9876543210";
  const payingAmount = paymentDetails?.payingAmount || 20378;
  const paymentType = paymentDetails?.paymentType || "total";

  // Overlay views: 'main' | 'upi' | 'card' | 'netbanking'
  const [currentOverlay, setCurrentOverlay] = useState("main");
  const [cardVariant, setCardVariant] = useState("all"); // 'all' | 'credit' | 'debit'
  const [selectedBankName, setSelectedBankName] = useState("HDFC Bank");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState("");
  const [showTaxBreakdown, setShowTaxBreakdown] = useState(false);
  const [qrState, setQrState] = useState("Show QR");

  // Form states
  const [upiIdInput, setUpiIdInput] = useState("");
  const [cardNumber, setCardNumber] = useState("5241 8492 0184 7621");
  const [cardExpiry, setCardExpiry] = useState("08 / 28");
  const [cardCvv, setCardCvv] = useState("749");
  const [cardholderName, setCardholderName] = useState(ownerName);
  const [saveCard, setSaveCard] = useState(true);

  function formatCurrency(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Breakdown calculations based on payingAmount
  const cessAmount = Math.round(payingAmount * 0.1);
  const assessmentAmount = payingAmount - cessAmount;

  // Open overlays
  const handleOpenOverlay = (overlayType, variant = "all") => {
    setCurrentOverlay(overlayType);
    setCardVariant(variant);
  };

  const handleCloseOverlay = () => {
    setCurrentOverlay("main");
  };

  const handleToggleQR = () => {
    if (qrState === "Show QR") {
      setQrState("Scan Now");
    } else {
      handleStartProcessing();
    }
  };

  const processingTimersRef = useRef([]);

  useEffect(() => {
    return () => {
      processingTimersRef.current.forEach(clearTimeout);
    };
  }, []);

  const handleStartProcessing = () => {
    setIsProcessing(true);
    processingTimersRef.current.forEach(clearTimeout);
    processingTimersRef.current = [];

    let methodUsed = "Razorpay (Online)";
    let bankDesc = "bank";
    if (currentOverlay === "netbanking") {
      methodUsed = `Razorpay Netbanking (${selectedBankName})`;
      bankDesc = selectedBankName;
    } else if (currentOverlay === "card") {
      methodUsed = `Razorpay Card (${cardVariant.toUpperCase()})`;
      bankDesc = "HDFC Card server";
    } else if (currentOverlay === "upi") {
      methodUsed = "Razorpay UPI";
      bankDesc = "UPI gateway";
    }

    if (attemptCount === 1) {
      // First attempt: takes time and automatically transitions to Payment Failure screen
      setProcessingMessage(
        `Connecting securely with ${bankDesc}... Please do not press back or refresh.`
      );

      const t1 = setTimeout(() => {
        setProcessingMessage(
          `Awaiting bank response... transaction verification taking longer than expected.`
        );
      }, 1800);

      const t2 = setTimeout(() => {
        setProcessingMessage(
          `Gateway signature verification delayed. Finalizing response...`
        );
      }, 3400);

      const t3 = setTimeout(() => {
        if (onPaymentFailure) {
          onPaymentFailure({
            transactionId:
              "TXN-" +
              Math.floor(1000000000 + Math.random() * 9000000000) +
              "VAD",
            transactionDate: new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
            propertyNo: propertyId || "A7-101()",
            ward: "Ward 04",
            attemptedAmount: payingAmount,
            errorMessage:
              "Your transaction could not be verified: Invalid signature passed.",
          });
        }
      }, 4300);

      processingTimersRef.current = [t1, t2, t3];
    } else {
      // Retry attempt: succeeds after normal gateway verification
      setProcessingMessage(
        `Re-authenticating transaction credentials with ${bankDesc}...`
      );

      const t1 = setTimeout(() => {
        setProcessingMessage(
          `Transaction verified successfully. Generating receipt...`
        );
      }, 1400);

      const t2 = setTimeout(() => {
        onConfirmPayment({
          propertyId,
          payerName: paymentDetails?.behalfPayerName || ownerName,
          mobileNumber,
          paymentMode: methodUsed,
          totalPayable: payingAmount,
          paymentType,
          remarks: `Online Payment via ${methodUsed}`,
          details: {
            gateway: "Razorpay",
            paymentId:
              "pay_" +
              Math.random().toString(36).substring(2, 11).toUpperCase(),
            orderId:
              "order_" + Math.random().toString(36).substring(2, 10),
            bankName:
              currentOverlay === "netbanking" ? selectedBankName : undefined,
            timestamp: new Date().toISOString(),
          },
        });
      }, 2400);

      processingTimersRef.current = [t1, t2];
    }
  };

  const handleCancelProcessing = () => {
    processingTimersRef.current.forEach(clearTimeout);
    processingTimersRef.current = [];
    setIsProcessing(false);
  };

  // Compute CTA label
  let ctaLabel = "Continue";
  if (currentOverlay === "card") {
    ctaLabel = `Pay ₹ ${formatCurrency(payingAmount)}`;
  } else if (currentOverlay === "netbanking") {
    ctaLabel = `Pay via ${selectedBankName}`;
  }

  return (
    <div className="bg-[#f0f3f7] font-sans antialiased text-slate-800 min-h-[calc(100vh-140px)] relative flex flex-col justify-between select-none overflow-x-hidden rounded-2xl my-2 pb-6">
      {/* Angled Header Geometric Accents */}
      <div className="sub-angle pointer-events-none rounded-t-2xl"></div>
      <div className="hero-angled-bg pointer-events-none rounded-t-2xl"></div>

      {/* Top Announcement Banner */}
      <header className="relative z-10 w-full pt-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Civic Ledger Left Identifier */}
          <div className="flex items-center gap-3 text-white">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center font-bold text-xl shadow-inner">
              🏛️
            </div>
            <div className="hidden sm:block">
              <p className="text-xs uppercase tracking-widest text-blue-100 font-semibold leading-tight">
                MahaGov E-Services
              </p>
              <h1 className="text-sm font-bold tracking-tight text-white">
                Civic Ledger • Tax Gateway
              </h1>
            </div>
          </div>

          {/* Bank Announcement Bar */}
          <div className="bg-[#124285]/80 backdrop-blur-sm border border-blue-300/20 text-white text-xs sm:text-sm font-medium px-5 py-2 rounded-lg shadow-xs text-center">
            Pay through <span className="font-bold tracking-wide text-amber-300">EASYEMI</span> with HDFC Bank Credit Cards
          </div>

          {/* Secure SSL Pill */}
          <div className="hidden md:flex items-center gap-1.5 text-xs text-blue-100 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
            <i className="ph ph-shield-check text-emerald-300 text-base"></i>
            <span>256-Bit SSL Encrypted</span>
          </div>
        </div>
      </header>

      {/* Main Gateway Card */}
      <main className="relative z-10 flex-grow flex items-center justify-center p-3 sm:p-6 my-2">
        <div
          className="w-full max-w-[430px] bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col transition-all duration-300 relative min-h-[580px]"
          id="checkout-card"
        >
          {/* VIEW 5: PROCESSING OVERLAY */}
          {isProcessing ? (
            <div className="flex flex-col items-center justify-center p-8 text-center flex-grow space-y-4 bg-white animate-in fade-in duration-200">
              <div className="relative flex items-center justify-center my-4">
                {/* Spinning coin element */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 border-4 border-amber-600 shadow-xl flex items-center justify-center text-2xl coin-spin">
                  🪙
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-base">
                  Contacting Gateway...
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  {processingMessage}
                </p>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden max-w-xs mx-auto mt-2">
                <div className="bg-blue-600 h-full w-2/3 animate-pulse"></div>
              </div>
              <button
                type="button"
                onClick={handleCancelProcessing}
                className="text-xs text-slate-400 hover:text-slate-600 underline pt-4 cursor-pointer"
              >
                Cancel &amp; return
              </button>
            </div>
          ) : (
            <>
              {/* VIEW 1: MAIN PAYMENT METHODS LISTING */}
              {currentOverlay === "main" && (
                <div className="flex flex-col h-full flex-grow animate-in fade-in duration-150">
                  {/* Main Modal Header */}
                  <div className="bg-gradient-to-r from-[#175dc8] to-[#1250ae] px-4 py-3.5 text-white flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        aria-label="Go Back"
                        onClick={onBackToVerify}
                        className="p-1 hover:bg-white/15 rounded-full transition-colors text-white text-lg flex items-center justify-center cursor-pointer"
                      >
                        <i className="ph ph-arrow-left font-bold"></i>
                      </button>
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-base shadow-xs ring-1 ring-white/50 overflow-hidden p-0.5">
                          <span className="text-amber-600 font-serif font-black text-xs">
                            🏛️
                          </span>
                        </div>
                        <div className="leading-snug">
                          <h2 className="font-semibold text-sm tracking-normal truncate max-w-[210px] text-white">
                            वडगाव मावळ नगरपं...
                          </h2>
                          <p className="text-[10px] text-blue-200 uppercase tracking-wider font-mono">
                            ID: {propertyId}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
                    >
                      <i className="ph ph-user text-base font-semibold"></i>
                    </button>
                  </div>

                  {/* Main Modal Body */}
                  <div className="p-4 overflow-y-auto max-h-[60vh] space-y-4 text-slate-800 flex-grow">
                    {/* Header Label */}
                    <div className="flex items-center justify-between pt-1">
                      <h3 className="font-bold text-slate-900 text-sm tracking-tight">
                        Payment Options
                      </h3>
                      <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Instant Confirmation
                      </span>
                    </div>

                    {/* Section: UPI QR (Clickable preview) */}
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                        UPI QR
                      </p>
                      <div
                        onClick={() => handleOpenOverlay("upi")}
                        className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/70 flex items-center gap-4 hover:border-blue-400 hover:shadow-xs transition cursor-pointer group"
                      >
                        {/* QR Graphic Box */}
                        <div className="relative w-24 h-24 bg-white border border-slate-200 rounded-lg p-1.5 flex flex-col items-center justify-center shadow-xs shrink-0 group-hover:border-blue-300 transition overflow-hidden">
                          <div className="w-full h-full qr-noise-pattern opacity-85 rounded flex items-center justify-center relative">
                            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-slate-900"></div>
                            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-slate-900"></div>
                            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-slate-900"></div>
                            <span className="relative z-10 text-[10px] font-bold text-slate-800 bg-white/95 px-2 py-1 rounded shadow-xs border border-slate-200 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                              Show QR
                            </span>
                          </div>
                        </div>

                        {/* QR Details & Apps */}
                        <div className="grow space-y-2">
                          <p className="text-xs font-semibold text-slate-700 leading-snug group-hover:text-blue-600 transition-colors">
                            Scan the QR using any UPI App
                          </p>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                              पे
                            </span>
                            <span className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[10px] font-bold text-blue-600 shadow-xs">
                              G
                            </span>
                            <span className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center text-[9px] font-extrabold shadow-xs">
                              Pay
                            </span>
                            <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[9px] font-bold shadow-xs">
                              C
                            </span>
                            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-bold shadow-xs">
                              UPI
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500">
                            Auto-verifies upon payment receipt
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Section: Preferred / Bank Specific Options */}
                    <div className="space-y-1.5 pt-1">
                      <p className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                        Pay using HDFC Bank
                      </p>

                      {/* HDFC Netbanking Option */}
                      <div
                        onClick={() => {
                          setSelectedBankName("HDFC Bank");
                          handleOpenOverlay("netbanking");
                        }}
                        className="flex items-center justify-between p-3 border border-slate-200 rounded-xl bg-white hover:bg-slate-50/90 hover:border-slate-300 transition cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 text-red-600 flex items-center justify-center text-sm font-bold">
                            <i className="ph ph-bank"></i>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                              HDFC Bank Netbanking
                            </p>
                            <p className="text-[10px] text-slate-500">
                              Fast authentication enabled
                            </p>
                          </div>
                        </div>
                        <i className="ph ph-caret-right text-slate-400 group-hover:text-slate-700"></i>
                      </div>

                      {/* Pay via Card (HDFC Credit) */}
                      <div
                        onClick={() => handleOpenOverlay("card", "credit")}
                        className="flex items-center justify-between p-3 border border-slate-200 rounded-xl bg-white hover:bg-slate-50/90 hover:border-slate-300 transition cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center text-base">
                            <i className="ph ph-credit-card"></i>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                              Pay Via Card
                            </p>
                            <p className="text-[10px] text-slate-500">
                              Only HDFC Bank credit cards supported
                            </p>
                          </div>
                        </div>
                        <i className="ph ph-caret-right text-slate-400 group-hover:text-slate-700"></i>
                      </div>

                      {/* Pay via Card (HDFC Debit) */}
                      <div
                        onClick={() => handleOpenOverlay("card", "debit")}
                        className="flex items-center justify-between p-3 border border-slate-200 rounded-xl bg-white hover:bg-slate-50/90 hover:border-slate-300 transition cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center text-base">
                            <i className="ph ph-identification-card"></i>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                              Pay Via Card
                            </p>
                            <p className="text-[10px] text-slate-500">
                              Only HDFC Bank debit cards supported
                            </p>
                          </div>
                        </div>
                        <i className="ph ph-caret-right text-slate-400 group-hover:text-slate-700"></i>
                      </div>
                    </div>

                    {/* Section: All Payment Options */}
                    <div className="space-y-1.5 pt-1">
                      <p className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                        All Payment Options
                      </p>

                      {/* UPI Accordion Item */}
                      <div
                        onClick={() => handleOpenOverlay("upi")}
                        className="flex items-center justify-between p-3 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 hover:border-blue-200 transition cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-base font-bold">
                            <i className="ph ph-lightning"></i>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                              UPI
                            </p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="text-[9px] font-medium text-slate-600 bg-slate-100 px-1 rounded">
                                GPay
                              </span>
                              <span className="text-[9px] font-medium text-slate-600 bg-slate-100 px-1 rounded">
                                PhonePe
                              </span>
                              <span className="text-[9px] font-medium text-slate-600 bg-slate-100 px-1 rounded">
                                Paytm
                              </span>
                            </div>
                          </div>
                        </div>
                        <i className="ph ph-caret-right text-slate-400 group-hover:text-slate-700"></i>
                      </div>

                      {/* Cards Accordion Item */}
                      <div
                        onClick={() => handleOpenOverlay("card", "all")}
                        className="flex items-center justify-between p-3 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 hover:border-blue-200 transition cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center text-base">
                            <i className="ph ph-cards"></i>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                              Cards
                            </p>
                            <div className="flex items-center gap-1 mt-0.5">
                              <span className="text-[9px] font-bold text-blue-900 bg-blue-100/60 px-1 rounded">
                                VISA
                              </span>
                              <span className="text-[9px] font-bold text-red-600 bg-red-50 px-1 rounded">
                                Mastercard
                              </span>
                              <span className="text-[9px] font-bold text-green-700 bg-green-50 px-1 rounded">
                                RuPay
                              </span>
                            </div>
                          </div>
                        </div>
                        <i className="ph ph-caret-right text-slate-400 group-hover:text-slate-700"></i>
                      </div>

                      {/* Netbanking Accordion Item */}
                      <div
                        onClick={() => handleOpenOverlay("netbanking")}
                        className="flex items-center justify-between p-3 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 hover:border-blue-200 transition cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center text-base">
                            <i className="ph ph-buildings"></i>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                              Netbanking
                            </p>
                            <p className="text-[10px] text-slate-500">
                              SBI, ICICI, Axis, Kotak &amp; 45+ more
                            </p>
                          </div>
                        </div>
                        <i className="ph ph-caret-right text-slate-400 group-hover:text-slate-700"></i>
                      </div>
                    </div>

                    {/* Terms and Gateway Security Notice */}
                    <div className="pt-2 text-center text-[10px] text-slate-500 space-y-1">
                      <p className="text-slate-600 font-medium">
                        Secured by{" "}
                        <span className="font-bold text-blue-800 tracking-tight">
                          Razorpay
                        </span>{" "}
                        • <span className="underline cursor-pointer">Account &amp; Terms</span>
                      </p>
                      <p className="text-[9.5px] text-slate-400">
                        By proceeding, I agree to Razorpay's{" "}
                        <span className="text-blue-600 underline cursor-pointer">
                          Privacy Notice
                        </span>{" "}
                        •{" "}
                        <span className="underline cursor-pointer">
                          Edit Preferences
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 2: UPI OVERLAY */}
              {currentOverlay === "upi" && (
                <div className="flex flex-col h-full flex-grow animate-in fade-in duration-150">
                  {/* Overlay Header */}
                  <div className="bg-gradient-to-r from-[#175dc8] to-[#1250ae] px-4 py-3.5 text-white flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        aria-label="Go Back to Main View"
                        onClick={handleCloseOverlay}
                        className="p-1 hover:bg-white/15 rounded-full transition-colors text-white text-lg flex items-center justify-center cursor-pointer"
                      >
                        <i className="ph ph-arrow-left font-bold"></i>
                      </button>
                      <h2 className="font-bold text-base tracking-normal text-white">
                        UPI
                      </h2>
                    </div>
                    <button
                      type="button"
                      aria-label="Close"
                      onClick={handleCloseOverlay}
                      className="w-8 h-8 rounded-full hover:bg-white/15 text-white flex items-center justify-center transition-colors text-sm cursor-pointer"
                    >
                      <i className="ph ph-x font-bold"></i>
                    </button>
                  </div>

                  {/* Overlay Body */}
                  <div className="p-4 overflow-y-auto max-h-[60vh] space-y-4 flex-grow">
                    <div>
                      <p className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                        UPI QR
                      </p>
                    </div>

                    {/* Dedicated Sharp QR Card Container */}
                    <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/60 shadow-xs flex flex-col sm:flex-row items-center gap-4">
                      {/* Sharp QR Box with Centered Show QR Badge */}
                      <div className="relative w-32 h-32 bg-white border border-slate-300 rounded-xl p-2 flex flex-col items-center justify-center shadow-xs shrink-0 group cursor-pointer overflow-hidden">
                        {/* Corner Finder Squares */}
                        <div className="absolute top-2 left-2 w-5 h-5 border-2 border-slate-900 flex items-center justify-center">
                          <div className="w-2.5 h-2.5 bg-slate-900"></div>
                        </div>
                        <div className="absolute top-2 right-2 w-5 h-5 border-2 border-slate-900 flex items-center justify-center">
                          <div className="w-2.5 h-2.5 bg-slate-900"></div>
                        </div>
                        <div className="absolute bottom-2 left-2 w-5 h-5 border-2 border-slate-900 flex items-center justify-center">
                          <div className="w-2.5 h-2.5 bg-slate-900"></div>
                        </div>
                        {/* Pattern background */}
                        <div className="w-full h-full qr-noise-pattern opacity-80 rounded flex items-center justify-center relative">
                          <button
                            type="button"
                            onClick={handleToggleQR}
                            className={`relative z-10 text-xs font-bold shadow-md border px-3 py-1.5 rounded-lg transition-all active:scale-95 cursor-pointer ${
                              qrState === "Scan Now"
                                ? "bg-blue-600 text-white border-blue-700"
                                : "bg-white text-slate-800 border-slate-300 hover:bg-blue-600 hover:text-white"
                            }`}
                          >
                            {qrState}
                          </button>
                        </div>
                      </div>

                      {/* Details on the Right */}
                      <div className="grow space-y-2.5 text-center sm:text-left">
                        <p className="text-xs font-semibold text-slate-800 leading-snug">
                          Scan the QR using any UPI App
                        </p>
                        {/* Official UPI App Badges */}
                        <div className="flex items-center justify-center sm:justify-start gap-1.5 flex-wrap">
                          <div className="flex items-center gap-1 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-xs" title="BHIM">
                            <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[8px] font-bold">
                              UPI
                            </span>
                            <span className="text-[10px] font-bold text-slate-700">
                              BHIM
                            </span>
                          </div>
                          <div className="flex items-center gap-1 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-xs" title="Google Pay">
                            <span className="w-4 h-4 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[9px] font-black">
                              G
                            </span>
                            <span className="text-[10px] font-bold text-slate-700">
                              GPay
                            </span>
                          </div>
                          <div className="flex items-center gap-1 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-xs" title="PhonePe">
                            <span className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center text-[8px] font-bold">
                              पे
                            </span>
                            <span className="text-[10px] font-bold text-slate-700">
                              PhonePe
                            </span>
                          </div>
                          <div className="flex items-center gap-1 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-xs" title="Paytm">
                            <span className="text-[10px] font-extrabold text-sky-600">
                              Paytm
                            </span>
                          </div>
                          <div className="flex items-center gap-1 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-xs" title="Navi UPI">
                            <span className="text-[10px] font-bold text-indigo-600">
                              navi
                            </span>
                          </div>
                        </div>
                        <p className="text-[10.5px] text-slate-500">
                          Auto-verifies instantly once scanned &amp; paid
                        </p>
                      </div>
                    </div>

                    {/* Enter VPA / UPI ID alternative */}
                    <div className="pt-1">
                      <p className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase mb-2">
                        Or Pay via UPI ID
                      </p>
                      <div className="relative">
                        <input
                          type="text"
                          value={upiIdInput}
                          onChange={(e) => setUpiIdInput(e.target.value)}
                          placeholder="mobileNumber@upi or user@okhdfcbank"
                          className="w-full text-xs py-2.5 pl-3 pr-16 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white placeholder-slate-400 font-mono outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleStartProcessing}
                          className="absolute right-1.5 top-1.5 bottom-1.5 px-3 text-[11px] font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                        >
                          Verify
                        </button>
                      </div>
                    </div>

                    {/* Gateway Security Footnote */}
                    <div className="pt-4 text-center text-[10px] text-slate-500 space-y-1">
                      <p className="text-slate-600 font-medium">
                        Secured by{" "}
                        <span className="font-bold text-blue-800 tracking-tight">
                          Razorpay
                        </span>{" "}
                        • Account &amp; Terms
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 3: CARD OVERLAY */}
              {currentOverlay === "card" && (
                <div className="flex flex-col h-full flex-grow animate-in fade-in duration-150">
                  {/* Overlay Header */}
                  <div className="bg-gradient-to-r from-[#175dc8] to-[#1250ae] px-4 py-3.5 text-white flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        aria-label="Go Back to Main View"
                        onClick={handleCloseOverlay}
                        className="p-1 hover:bg-white/15 rounded-full transition-colors text-white text-lg flex items-center justify-center cursor-pointer"
                      >
                        <i className="ph ph-arrow-left font-bold"></i>
                      </button>
                      <h2 className="font-bold text-base tracking-normal text-white">
                        Card
                      </h2>
                    </div>
                    <button
                      type="button"
                      aria-label="Close"
                      onClick={handleCloseOverlay}
                      className="w-8 h-8 rounded-full hover:bg-white/15 text-white flex items-center justify-center transition-colors text-sm cursor-pointer"
                    >
                      <i className="ph ph-x font-bold"></i>
                    </button>
                  </div>

                  {/* Overlay Body */}
                  <div className="p-4 overflow-y-auto max-h-[60vh] space-y-4 flex-grow">
                    <div className="space-y-1.5">
                      <h3 className="font-bold text-slate-900 text-sm tracking-tight">
                        Add a new card
                      </h3>
                      {cardVariant !== "all" && (
                        <div className="bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-medium px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                          <i className="ph ph-info font-bold text-amber-600"></i>
                          <span>
                            Only HDFC Bank {cardVariant} cards supported for this option
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Structured Unified Input Box with Inner Borders */}
                    <div className="border border-slate-300 rounded-xl overflow-hidden shadow-xs bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                      {/* Row 1: Card Number */}
                      <div className="p-3 border-b border-slate-200 flex items-center justify-between bg-white">
                        <div className="grow">
                          <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                            Card Number
                          </label>
                          <input
                            type="text"
                            maxLength={19}
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="•••• •••• •••• ••••"
                            className="w-full text-sm font-mono text-slate-900 p-0 border-0 focus:ring-0 focus:outline-none bg-transparent placeholder-slate-400 tracking-wider font-semibold"
                          />
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-[9px] font-black text-blue-900 bg-blue-50 px-1 py-0.5 rounded border border-blue-200">
                            VISA
                          </span>
                          <span className="text-[9px] font-black text-red-600 bg-red-50 px-1 py-0.5 rounded border border-red-200">
                            MC
                          </span>
                        </div>
                      </div>

                      {/* Row 2: Split Columns for MM / YY and CVV */}
                      <div className="grid grid-cols-2 divide-x divide-slate-200 border-b border-slate-200 bg-white">
                        {/* MM / YY Column */}
                        <div className="p-3">
                          <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                            Expiry (MM / YY)
                          </label>
                          <input
                            type="text"
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM / YY"
                            className="w-full text-sm font-mono text-slate-900 p-0 border-0 focus:ring-0 focus:outline-none bg-transparent placeholder-slate-400 font-semibold"
                          />
                        </div>
                        {/* CVV Column */}
                        <div className="p-3 relative">
                          <div className="flex items-center justify-between">
                            <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                              CVV
                            </label>
                            <i
                              className="ph ph-question text-slate-400 text-xs"
                              title="3 or 4 digits on back of card"
                            ></i>
                          </div>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            placeholder="•••"
                            className="w-full text-sm font-mono text-slate-900 p-0 border-0 focus:ring-0 focus:outline-none bg-transparent placeholder-slate-400 font-semibold tracking-widest"
                          />
                        </div>
                      </div>

                      {/* Row 3: Cardholder / Property Holder Name */}
                      <div className="p-3 bg-white">
                        <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          value={cardholderName}
                          onChange={(e) => setCardholderName(e.target.value)}
                          placeholder="Property Holder"
                          className="w-full text-sm font-medium text-slate-900 p-0 border-0 focus:ring-0 focus:outline-none bg-transparent placeholder-slate-400"
                        />
                      </div>
                    </div>

                    {/* Save card for future check */}
                    <div className="flex items-center gap-2 pt-0.5 px-0.5">
                      <input
                        id="save-card-check"
                        type="checkbox"
                        checked={saveCard}
                        onChange={(e) => setSaveCard(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                      />
                      <label
                        htmlFor="save-card-check"
                        className="text-xs text-slate-600 cursor-pointer"
                      >
                        Securely save card as per RBI guidelines
                      </label>
                    </div>

                    {/* Gateway Security Footnote */}
                    <div className="pt-3 text-center text-[10px] text-slate-500 space-y-1">
                      <p className="text-slate-600 font-medium">
                        Secured by{" "}
                        <span className="font-bold text-blue-800 tracking-tight">
                          Razorpay
                        </span>{" "}
                        • Account &amp; Terms
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 4: NETBANKING OVERLAY */}
              {currentOverlay === "netbanking" && (
                <div className="flex flex-col h-full flex-grow animate-in fade-in duration-150">
                  {/* Overlay Header */}
                  <div className="bg-gradient-to-r from-[#175dc8] to-[#1250ae] px-4 py-3.5 text-white flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        aria-label="Go Back to Main View"
                        onClick={handleCloseOverlay}
                        className="p-1 hover:bg-white/15 rounded-full transition-colors text-white text-lg flex items-center justify-center cursor-pointer"
                      >
                        <i className="ph ph-arrow-left font-bold"></i>
                      </button>
                      <div className="flex items-center gap-2">
                        <h2 className="font-bold text-base tracking-normal text-white">
                          Netbanking
                        </h2>
                        <i className="ph ph-caret-up text-white/80 text-sm"></i>
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label="Close"
                      onClick={handleCloseOverlay}
                      className="w-8 h-8 rounded-full hover:bg-white/15 text-white flex items-center justify-center transition-colors text-sm cursor-pointer"
                    >
                      <i className="ph ph-x font-bold"></i>
                    </button>
                  </div>

                  {/* Overlay Body */}
                  <div className="p-4 overflow-y-auto max-h-[60vh] space-y-4 flex-grow">
                    {/* Expanded Payment Methods Preview Bar */}
                    <div className="flex items-center justify-between bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                          <i className="ph ph-buildings"></i>
                        </div>
                        <span className="font-semibold text-slate-700">
                          Selected: {selectedBankName}
                        </span>
                      </div>
                      <span
                        onClick={handleCloseOverlay}
                        className="text-[10px] text-blue-600 font-semibold cursor-pointer hover:underline"
                      >
                        Change
                      </span>
                    </div>

                    {/* Section Subtitle */}
                    <div>
                      <p className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                        Popular Banks
                      </p>
                    </div>

                    {/* Grid of Popular Banks */}
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        { name: "HDFC Bank", short: "HDFC", sub: "Retail / Corp", color: "bg-blue-900" },
                        { name: "ICICI Bank", short: "ICICI", sub: "Netbanking", color: "bg-amber-600" },
                        { name: "Bank of Baroda", short: "BOB", sub: "Baroda Connect", color: "bg-orange-600" },
                        { name: "Canara Bank", short: "CAN", sub: "CanBank Net", color: "bg-sky-500" },
                        { name: "Punjab National Bank", short: "PNB", sub: "PNB One", color: "bg-red-700" },
                      ].map((b) => (
                        <button
                          key={b.name}
                          type="button"
                          onClick={() => setSelectedBankName(b.name)}
                          className={`flex items-center gap-2.5 p-2.5 rounded-xl text-left transition shadow-2xs group relative cursor-pointer ${
                            selectedBankName === b.name
                              ? "border-2 border-blue-500 bg-blue-50/50"
                              : "border border-slate-200 bg-white hover:border-blue-400 hover:bg-slate-50/70"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-lg ${b.color} text-white flex items-center justify-center text-xs font-bold shrink-0`}
                          >
                            <span className="text-[10px] font-black">{b.short}</span>
                          </div>
                          <div className="truncate">
                            <p
                              className={`text-xs font-bold ${
                                selectedBankName === b.name
                                  ? "text-blue-700"
                                  : "text-slate-900 group-hover:text-blue-700"
                              }`}
                            >
                              {b.short}
                            </p>
                            <p className="text-[9.5px] text-slate-500 truncate">
                              {b.sub}
                            </p>
                          </div>
                          {selectedBankName === b.name && (
                            <div className="absolute top-1.5 right-1.5 text-blue-600 text-xs">
                              <i className="ph ph-check-circle-fill"></i>
                            </div>
                          )}
                        </button>
                      ))}

                      {/* More Banks Button */}
                      <button
                        type="button"
                        onClick={() => alert("Showing 45+ scheduled Indian banks list")}
                        className="flex items-center gap-2.5 p-2.5 border border-dashed border-slate-300 bg-slate-50/80 rounded-xl text-left hover:border-blue-400 hover:bg-blue-50/30 transition shadow-2xs group cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center text-sm font-black shrink-0">
                          <i className="ph ph-dots-three-bold"></i>
                        </div>
                        <div className="truncate">
                          <p className="text-xs font-bold text-slate-700 group-hover:text-blue-700">
                            ... More Ba...
                          </p>
                          <p className="text-[9.5px] text-slate-500">
                            45+ Other Banks
                          </p>
                        </div>
                      </button>
                    </div>

                    {/* Below the grid: Razorpay Security Notice */}
                    <div className="pt-4 text-center text-[10.5px] text-slate-500 space-y-1">
                      <p className="text-slate-600 font-medium">
                        Secured by{" "}
                        <span className="font-bold text-blue-800 tracking-tight">
                          Razorpay
                        </span>{" "}
                        •{" "}
                        <span className="text-slate-700 underline cursor-pointer">
                          Account &amp; Terms
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* SHARED FOOTER: TAX BREAKDOWN & STICKY ACTION BAR */}
              {showTaxBreakdown && (
                <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 text-xs text-slate-600 space-y-1 animate-in fade-in duration-150">
                  <div className="flex justify-between">
                    <span>Current Assessment (2024-25):</span>
                    <span className="font-mono font-medium text-slate-900">
                      ₹ {formatCurrency(assessmentAmount)}.00
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Swachhata / Civic Cess:</span>
                    <span className="font-mono font-medium text-slate-900">
                      ₹ {formatCurrency(cessAmount)}.00
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Early Bird Rebate (applied):</span>
                    <span className="font-mono font-medium text-emerald-600">
                      -₹ 0.00
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-1 font-semibold text-slate-900">
                    <span>Net Payable Amount:</span>
                    <span className="font-mono text-blue-700">
                      ₹ {formatCurrency(payingAmount)}.00
                    </span>
                  </div>
                </div>
              )}

              {/* Sticky Action Bar */}
              <div className="p-3.5 bg-white border-t border-slate-200 flex items-center justify-between gap-3 shadow-lg z-20">
                {/* Price Display & Breakdown Toggle */}
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-semibold text-slate-500">₹</span>
                    <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                      {formatCurrency(payingAmount)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowTaxBreakdown((prev) => !prev)}
                    className="text-[11px] text-blue-600 font-medium hover:text-blue-800 flex items-center gap-0.5 focus:outline-none cursor-pointer"
                  >
                    <span>View Details</span>
                    <i
                      className={`ph ${
                        showTaxBreakdown ? "ph-caret-down" : "ph-caret-up"
                      } text-[10px]`}
                    ></i>
                  </button>
                </div>

                {/* Main CTA */}
                <button
                  type="button"
                  onClick={handleStartProcessing}
                  className="grow max-w-[210px] bg-[#1a65d6] hover:bg-[#1556b8] active:bg-[#0f4494] text-white font-semibold text-sm py-2.5 px-4 rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>{ctaLabel}</span>
                  <i className="ph ph-arrow-right font-bold text-xs"></i>
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Bottom Trust Badges Footer */}
      <footer className="relative z-10 w-full pb-3 pt-2 px-4">
        <div className="max-w-2xl mx-auto bg-white/95 backdrop-blur-md rounded-xl border border-slate-200/90 shadow-xs px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          {/* Logos Container */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {/* UPI */}
            <div className="flex items-center font-black italic tracking-tighter text-slate-800 text-sm">
              <span>UPI</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-0.5"></span>
            </div>
            <div className="h-3 w-px bg-slate-300"></div>

            {/* VISA */}
            <span className="font-bold tracking-wider text-blue-900 text-xs italic font-serif">
              VISA
            </span>

            {/* Mastercard circles */}
            <div className="flex items-center -space-x-1">
              <div className="w-3.5 h-3.5 rounded-full bg-red-600 opacity-90"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-amber-500 opacity-90"></div>
            </div>

            {/* RuPay */}
            <span className="font-extrabold text-xs text-sky-800 tracking-tight">
              RuPay<span className="text-orange-500 font-black">❯</span>
            </span>
            <div className="h-3 w-px bg-slate-300"></div>

            {/* PCI DSS Compliant Badge */}
            <div className="inline-flex items-center gap-1 text-[9px] font-bold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200">
              <i className="ph ph-shield-check text-blue-600 text-xs"></i>
              <span>PCI-DSS</span>
            </div>
            <div className="h-3 w-px bg-slate-300"></div>

            {/* Razorpay Wordmark */}
            <div className="flex items-center text-xs font-bold text-blue-900 tracking-tight">
              <span className="text-blue-500 mr-0.5 font-mono font-black">⚡</span>
              Razorpay
            </div>
          </div>

          {/* Tagline */}
          <div className="text-[10px] text-slate-500 font-medium">
            Accept, process and disburse digital payments securely for civic services.
          </div>
        </div>
      </footer>
    </div>
  );
}
