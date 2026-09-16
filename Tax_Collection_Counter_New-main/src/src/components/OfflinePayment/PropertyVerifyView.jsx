import React from "react";

export default function PropertyVerifyView({
  propertyData,
  onProceedToPayment,
  onCancel,
}) {
  const data = propertyData || {
    propertyNo: "A3-102()",
    ownerName: "John Doe",
    address: "123 Main St, Apt 4B\nNorth Zone, Ward 1A",
    currentYearDues: "₹ 5,200",
    arrears: "₹ 0",
    totalAmount: "₹ 5,200",
  };

  return (
    <div className="max-w-container-max mx-auto p-margin-mobile md:p-margin-desktop space-y-stack-lg animate-in fade-in duration-300">
      {/* Breadcrumb & Session Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border-default pb-4">
        <div className="flex items-center text-body-sm font-body-sm text-on-surface-variant gap-2">
          <span className="material-symbols-outlined text-[18px]">home</span>
          <span className="text-outline">/</span>
          <span className="hover:text-primary transition-colors cursor-pointer" onClick={onCancel}>
            PropertyTax
          </span>
          <span className="text-outline">/</span>
          <span className="font-semibold text-on-surface">Offline Payment</span>
        </div>
        <div className="flex items-center gap-4 text-body-sm font-body-sm">
          <div className="flex items-center gap-2 bg-error-container/20 text-error px-3 py-1.5 rounded-full border border-error-container">
            <span className="material-symbols-outlined text-[16px]">timer</span>
            <span>
              Session expires in <strong>19:53</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="py-4">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-surface-container-highest z-0"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[50%] h-1 bg-primary z-0 transition-all duration-500"></div>

          {/* Step 1: Search Done */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-body-sm shadow-md ring-4 ring-surface-background">
              <span className="material-symbols-outlined text-[18px]">check</span>
            </div>
            <span className="text-label-sm font-label-sm text-primary font-bold">
              Search
            </span>
          </div>

          {/* Step 2: Verify Active */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-body-sm shadow-md ring-4 ring-surface-background">
              2
            </div>
            <span className="text-label-sm font-label-sm text-primary font-bold">
              Verify
            </span>
          </div>

          {/* Step 3: Payment Pending */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-bold text-body-sm ring-4 ring-surface-background">
              3
            </div>
            <span className="text-label-sm font-label-sm text-on-surface-variant">
              Payment
            </span>
          </div>

          {/* Step 4: Receipt Pending */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-bold text-body-sm ring-4 ring-surface-background">
              4
            </div>
            <span className="text-label-sm font-label-sm text-on-surface-variant">
              Receipt
            </span>
          </div>
        </div>
      </div>

      {/* Verify Property Details Card */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-border-default overflow-hidden p-6 md:p-8">
        <h2 className="text-headline-md font-headline-md text-on-surface mb-6 border-b border-border-default pb-4 font-bold">
          Verify Property Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Property Information */}
          <div className="bg-surface-muted/50 p-5 rounded-xl border border-outline-variant/30">
            <h3 className="text-label-md text-primary font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">info</span>
              Property Information
            </h3>
            <div className="space-y-4 text-sm font-body-sm">
              <div className="flex justify-between border-b border-border-default/60 pb-2">
                <span className="text-on-surface-variant">Property No:</span>
                <span className="font-semibold text-on-surface">{data.propertyNo}</span>
              </div>
              <div className="flex justify-between border-b border-border-default/60 pb-2">
                <span className="text-on-surface-variant">Owner Name:</span>
                <span className="font-semibold text-on-surface">{data.ownerName}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-on-surface-variant">Address:</span>
                <span className="font-semibold text-on-surface text-right whitespace-pre-line">
                  {data.address}
                </span>
              </div>
            </div>
          </div>

          {/* Tax Dues */}
          <div className="bg-surface-muted/50 p-5 rounded-xl border border-outline-variant/30 flex flex-col justify-between">
            <div>
              <h3 className="text-label-md text-primary font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">receipt</span>
                Tax Dues
              </h3>
              <div className="space-y-4 text-sm font-body-sm">
                <div className="flex justify-between border-b border-border-default/60 pb-2">
                  <span className="text-on-surface-variant">Current Year:</span>
                  <span className="font-semibold text-on-surface">{data.currentYearDues}</span>
                </div>
                <div className="flex justify-between border-b border-border-default/60 pb-2">
                  <span className="text-on-surface-variant">Arrears:</span>
                  <span className="font-semibold text-on-surface">{data.arrears}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 mt-4 border-t-2 border-primary/20">
              <span className="text-on-surface font-bold text-base">Total Amount:</span>
              <span className="font-bold text-primary text-2xl">
                {data.totalAmount}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 border-t border-border-default pt-6">
          <button
            type="button"
            onClick={onProceedToPayment}
            className="flex justify-center items-center gap-2 bg-primary hover:bg-primary/90 text-on-primary px-6 py-2.5 rounded-lg font-button-text text-button-text transition-colors shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">payment</span>
            Proceed to Payment
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex justify-center items-center gap-2 bg-surface-container border border-outline-variant hover:bg-surface-container-highest text-on-surface px-6 py-2.5 rounded-lg font-button-text text-button-text transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
