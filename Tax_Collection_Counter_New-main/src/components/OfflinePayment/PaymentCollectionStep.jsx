import React, { useState } from "react";

export default function PaymentCollectionStep({
  propertyData,
  paymentDetails,
  onConfirmPayment,
  onBackToVerify,
}) {
  const propertyId = propertyData?.propertyNo || "JALA726741";
  const initialPayer = propertyData?.ownerName || "Uttam Ananda Patil";
  const initialMobile = paymentDetails?.mobileNo || "8975485804";
  const initialMode = paymentDetails?.paymentMode || "Cash";
  const totalPayable = paymentDetails?.payingAmount || 20378;

  const [paymentMode, setPaymentMode] = useState(initialMode);
  const [payerName, setPayerName] = useState(initialPayer);
  const [mobileNumber, setMobileNumber] = useState(initialMobile);
  const [remarks, setRemarks] = useState("");

  // Cash specific
  const [cashReceived, setCashReceived] = useState(totalPayable);

  // Cheque specific
  const [chequeNo, setChequeNo] = useState("");
  const [chequeDate, setChequeDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [bankName, setBankName] = useState("");
  const [branchName, setBranchName] = useState("");

  // DD specific
  const [ddNo, setDdNo] = useState("");
  const [ddDate, setDdDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // NEFT / RTGS specific
  const [transferType, setTransferType] = useState("NEFT"); // 'NEFT' | 'RTGS'
  const [utrNumber, setUtrNumber] = useState("");
  const [transactionDate, setTransactionDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Card specific
  const [cardRefNo, setCardRefNo] = useState("");

  // QR specific
  const [qrRefNo, setQrRefNo] = useState("");

  // Confirmation Modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  function formatCurrency(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const handleFinalConfirm = () => {
    setShowConfirmModal(false);
    onConfirmPayment({
      propertyId,
      payerName,
      mobileNumber,
      paymentMode,
      totalPayable,
      paymentType: paymentDetails?.paymentType || "total",
      remarks,
      details: {
        chequeNo,
        chequeDate,
        bankName,
        branchName,
        ddNo,
        ddDate,
        transferType,
        utrNumber,
        transactionDate,
        cardRefNo,
        qrRefNo,
      },
    });
  };

  return (
    <div className="max-w-container-max mx-auto p-margin-mobile md:p-margin-desktop space-y-stack-lg animate-in fade-in duration-300">
      {/* Header & Back */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border-default pb-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-primary">
            Offline Payment Collection
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Process property tax payments securely via offline methods.
          </p>
        </div>

        <button
          type="button"
          onClick={onBackToVerify}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-outline-variant bg-surface-container hover:bg-surface-container-highest cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Back to Verify Details</span>
        </button>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Column: Payment Modes & Details (8 cols) */}
        <div className="lg:col-span-8 space-y-stack-lg">
          {/* Step Indicator */}
          <div className="bg-surface-container-lowest rounded-xl p-stack-md shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-border-default flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-success-leaf text-white flex items-center justify-center font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[14px]">check</span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                Property Details
              </span>
            </div>
            <div className="h-px bg-border-default flex-1 mx-4"></div>

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-success-leaf text-white flex items-center justify-center font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[14px]">check</span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                Tax Calculation
              </span>
            </div>
            <div className="h-px bg-border-default flex-1 mx-4"></div>

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-label-sm text-label-sm font-bold">
                3
              </div>
              <span className="font-label-md text-label-md text-primary font-bold">
                Payment Collection
              </span>
            </div>
          </div>

          {/* Payment Transaction Details Card */}
          <div className="bg-surface-container-lowest rounded-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-border-default overflow-hidden">
            {/* Card Header with Mode Selector */}
            <div className="bg-surface-muted px-6 py-4 border-b border-border-default flex flex-wrap justify-between items-center gap-3">
              <h3 className="font-headline-md text-headline-md text-on-surface font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  payments
                </span>
                Payment Transaction Details
              </h3>

              <div className="flex items-center gap-2">
                <span className="text-xs text-on-surface-variant font-medium">Mode:</span>
                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className="bg-primary/10 text-primary border border-primary/20 text-xs font-semibold px-3 py-1 rounded-full outline-none cursor-pointer focus:ring-1 focus:ring-primary"
                >
                  <option value="Cash">Cash</option>
                  <option value="Cheque">Cheque</option>
                  <option value="DD">DD</option>
                  <option value="NEFT">NEFT / RTGS</option>
                  <option value="Card Payment">Card Payment</option>
                  <option value="QR">QR / UPI</option>
                </select>
              </div>
            </div>

            {/* Form Fields according to selected Payment Mode */}
            <form onSubmit={handleFormSubmit} className="p-6 space-y-6">
              {/* 1. Cheque Form (Screenshot 1) */}
              {paymentMode === "Cheque" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-label-md text-sm text-on-surface mb-2 font-medium">
                        Cheque Number <span className="text-error">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={chequeNo}
                        onChange={(e) => setChequeNo(e.target.value)}
                        placeholder="Enter 6-digit number"
                        className="w-full rounded-[10px] border border-border-default px-4 py-2 text-sm focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-label-md text-sm text-on-surface mb-2 font-medium">
                        Cheque Date <span className="text-error">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={chequeDate}
                        onChange={(e) => setChequeDate(e.target.value)}
                        className="w-full rounded-[10px] border border-border-default px-4 py-2 text-sm focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-label-md text-sm text-on-surface mb-2 font-medium">
                        Bank Name <span className="text-error">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        placeholder="Enter bank name"
                        className="w-full rounded-[10px] border border-border-default px-4 py-2 text-sm focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-label-md text-sm text-on-surface mb-2 font-medium">
                        Branch Name
                      </label>
                      <input
                        type="text"
                        value={branchName}
                        onChange={(e) => setBranchName(e.target.value)}
                        placeholder="Enter branch name"
                        className="w-full rounded-[10px] border border-border-default px-4 py-2 text-sm focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 2. DD Form (Screenshot 2) */}
              {paymentMode === "DD" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-label-md text-sm text-on-surface mb-2 font-medium">
                        DD Number <span className="text-error">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={ddNo}
                        onChange={(e) => setDdNo(e.target.value)}
                        placeholder="Enter DD number"
                        className="w-full rounded-[10px] border border-border-default px-4 py-2 text-sm focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-label-md text-sm text-on-surface mb-2 font-medium">
                        DD Date <span className="text-error">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={ddDate}
                        onChange={(e) => setDdDate(e.target.value)}
                        className="w-full rounded-[10px] border border-border-default px-4 py-2 text-sm focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-label-md text-sm text-on-surface mb-2 font-medium">
                        Bank Name <span className="text-error">*</span>
                      </label>
                      <select
                        required
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        className="w-full rounded-[10px] border border-border-default px-4 py-2 text-sm focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none bg-white cursor-pointer"
                      >
                        <option value="">Select bank name</option>
                        <option value="State Bank of India">State Bank of India</option>
                        <option value="Bank of Maharashtra">Bank of Maharashtra</option>
                        <option value="HDFC Bank">HDFC Bank</option>
                        <option value="ICICI Bank">ICICI Bank</option>
                        <option value="Axis Bank">Axis Bank</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-label-md text-sm text-on-surface mb-2 font-medium">
                        Branch Name <span className="text-error">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={branchName}
                        onChange={(e) => setBranchName(e.target.value)}
                        placeholder="Enter branch name"
                        className="w-full rounded-[10px] border border-border-default px-4 py-2 text-sm focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 3. NEFT / RTGS Form (Screenshot 3) */}
              {(paymentMode === "NEFT" || paymentMode === "RTGS") && (
                <div className="space-y-6">
                  <div>
                    <label className="block font-label-md text-sm text-on-surface mb-2 font-medium">
                      Transfer Type <span className="text-error">*</span>
                    </label>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="radio"
                          name="transferType"
                          value="NEFT"
                          checked={transferType === "NEFT"}
                          onChange={() => setTransferType("NEFT")}
                          className="text-primary focus:ring-primary h-4 w-4"
                        />
                        <span className="font-semibold text-on-surface">NEFT</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="radio"
                          name="transferType"
                          value="RTGS"
                          checked={transferType === "RTGS"}
                          onChange={() => setTransferType("RTGS")}
                          className="text-primary focus:ring-primary h-4 w-4"
                        />
                        <span className="font-semibold text-on-surface">RTGS</span>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-label-md text-sm text-on-surface mb-2 font-medium">
                        UTR / Transaction Reference Number{" "}
                        <span className="text-error">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={utrNumber}
                        onChange={(e) => setUtrNumber(e.target.value)}
                        placeholder="Enter UTR number"
                        className="w-full rounded-[10px] border border-border-default px-4 py-2 text-sm focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-label-md text-sm text-on-surface mb-2 font-medium">
                        Bank Name <span className="text-error">*</span>
                      </label>
                      <select
                        required
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        className="w-full rounded-[10px] border border-border-default px-4 py-2 text-sm focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none bg-white cursor-pointer"
                      >
                        <option value="">Select bank</option>
                        <option value="State Bank of India">State Bank of India</option>
                        <option value="Bank of Maharashtra">Bank of Maharashtra</option>
                        <option value="HDFC Bank">HDFC Bank</option>
                        <option value="ICICI Bank">ICICI Bank</option>
                        <option value="Punjab National Bank">Punjab National Bank</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-label-md text-sm text-on-surface mb-2 font-medium">
                      Transaction Date <span className="text-error">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={transactionDate}
                      onChange={(e) => setTransactionDate(e.target.value)}
                      className="w-full md:w-1/2 rounded-[10px] border border-border-default px-4 py-2 text-sm focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                    />
                  </div>
                </div>
              )}

              {/* 4. Card Payment Form (Screenshot 4) */}
              {paymentMode === "Card Payment" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-label-md text-sm text-on-surface mb-2 font-medium">
                        Card Transaction / Reference Number{" "}
                        <span className="text-error">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={cardRefNo}
                        onChange={(e) => setCardRefNo(e.target.value)}
                        placeholder="Enter reference number"
                        className="w-full rounded-[10px] border border-border-default px-4 py-2 text-sm focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-label-md text-sm text-on-surface mb-2 font-medium">
                        Transaction Date <span className="text-error">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={transactionDate}
                        onChange={(e) => setTransactionDate(e.target.value)}
                        className="w-full rounded-[10px] border border-border-default px-4 py-2 text-sm focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 5. Cash Form (HTML Default) */}
              {paymentMode === "Cash" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-label-md text-sm text-on-surface mb-2 font-medium">
                      Cash Received Amount <span className="text-error">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={cashReceived}
                      onChange={(e) => setCashReceived(e.target.value)}
                      placeholder="Enter amount received"
                      className="w-full rounded-[10px] border border-border-default px-4 py-2 text-sm focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                    />
                  </div>
                </div>
              )}

              {/* 6. QR / UPI */}
              {paymentMode === "QR" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-label-md text-sm text-on-surface mb-2 font-medium">
                      UPI / Transaction Reference No. <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={qrRefNo}
                      onChange={(e) => setQrRefNo(e.target.value)}
                      placeholder="Enter UPI reference or UTR"
                      className="w-full rounded-[10px] border border-border-default px-4 py-2 text-sm focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Common Fields: Payer Name & Mobile Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div>
                  <label className="block font-label-md text-sm text-on-surface mb-2 font-medium">
                    Payer Name <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={payerName}
                    onChange={(e) => setPayerName(e.target.value)}
                    placeholder="Enter payer name"
                    className="w-full rounded-[10px] border border-border-default px-4 py-2 text-sm focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block font-label-md text-sm text-on-surface mb-2 font-medium">
                    Mobile Number <span className="text-error">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter mobile number"
                    className="w-full rounded-[10px] border border-border-default px-4 py-2 text-sm focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                  />
                </div>
              </div>

              {/* Remarks */}
              <div>
                <label className="block font-label-md text-sm text-on-surface mb-2 font-medium">
                  Remarks (Optional)
                </label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Add any notes..."
                  rows={2}
                  className="w-full rounded-[10px] border border-border-default px-4 py-2 text-sm focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                />
              </div>

              {/* Submit triggers confirmation modal */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full md:hidden bg-success-leaf hover:bg-success-leaf/90 text-white font-button-text text-sm py-3 px-4 rounded-lg shadow-md transition-all flex justify-center items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                  <span>Confirm &amp; Generate Receipt</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Payment Summary (4 cols) */}
        <div className="lg:col-span-4">
          <div className="bg-surface-container-lowest rounded-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] border-t-4 border-t-primary sticky top-24 border border-border-default">
            <div className="p-6">
              <h3 className="font-headline-md text-headline-md text-on-surface font-semibold mb-6">
                Payment Summary
              </h3>

              <div className="space-y-4 font-body-sm text-sm">
                <div className="flex justify-between items-center pb-3 border-b border-border-default">
                  <span className="text-on-surface-variant">Property ID:</span>
                  <span className="font-semibold text-on-surface">{propertyId}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border-default">
                  <span className="text-on-surface-variant">Total Tax (incl. Arrears):</span>
                  <span className="font-medium text-on-surface">₹ 20,445.00</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border-default">
                  <span className="text-on-surface-variant">Discount Applied:</span>
                  <span className="font-medium text-success-leaf">- ₹ 67.00</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border-default">
                  <span className="text-on-surface-variant">Payment Mode:</span>
                  <span className="font-medium text-on-surface">{paymentMode}</span>
                </div>
              </div>

              <div className="mt-6 bg-surface-muted p-4 rounded-lg flex justify-between items-center border border-border-default">
                <span className="font-label-md text-sm font-bold text-on-surface">
                  Total Payable
                </span>
                <span className="font-headline-lg text-2xl font-bold text-primary">
                  ₹ {formatCurrency(totalPayable)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setShowConfirmModal(true)}
                className="w-full mt-6 bg-success-leaf hover:bg-success-leaf/90 text-white font-button-text text-sm py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all flex justify-center items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">lock</span>
                <span>Confirm &amp; Generate Receipt</span>
              </button>

              <p className="text-center font-label-sm text-xs text-on-surface-variant mt-4 flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[14px]">info</span>
                <span>Please verify amount before confirming.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal (Are you sure you want to pay?) */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-border-default animate-in zoom-in-95 duration-150">
            <div className="bg-primary px-6 py-4 flex items-center gap-3 text-white">
              <span className="material-symbols-outlined text-2xl">
                help
              </span>
              <h3 className="font-headline-md text-lg font-bold">
                Confirm Payment Transaction
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-sm text-on-surface font-body-md">
                Are you sure you want to confirm and generate a receipt for this transaction?
              </p>

              <div className="bg-surface-muted p-4 rounded-xl space-y-2 text-xs font-body-sm border border-border-default">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Property ID:</span>
                  <span className="font-bold text-on-surface">{propertyId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Payer Name:</span>
                  <span className="font-bold text-on-surface">{payerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Payment Mode:</span>
                  <span className="font-bold text-on-surface">{paymentMode}</span>
                </div>
                <div className="flex justify-between border-t border-outline-variant/60 pt-2 text-sm">
                  <span className="text-on-surface-variant font-medium">
                    Total Amount:
                  </span>
                  <span className="font-bold text-success-leaf text-base">
                    ₹ {formatCurrency(totalPayable)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-2.5 px-4 rounded-lg border border-outline-variant bg-surface-container hover:bg-surface-container-highest text-on-surface font-button-text text-sm transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleFinalConfirm}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-success-leaf hover:bg-success-leaf/90 text-white font-button-text text-sm transition-opacity shadow-sm flex items-center justify-center gap-1.5 cursor-pointer font-bold"
                >
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                  <span>Yes, Confirm</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
