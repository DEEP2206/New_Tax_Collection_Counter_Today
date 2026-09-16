import React from "react";

export default function KpiCards({ data }) {
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-stack-lg">
      {/* Stat 1: Total Collection */}
      <div className="bg-surface-container-lowest rounded-xl p-stack-lg shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-transform border border-surface-container">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-primary-fixed rounded-lg text-primary">
            <span className="material-symbols-outlined text-2xl">
              account_balance_wallet
            </span>
          </div>
          <span className="bg-success-leaf/10 text-success-leaf font-label-sm text-label-sm px-2.5 py-1 rounded-full flex items-center gap-1 font-bold">
            <span className="material-symbols-outlined text-[14px]">
              trending_up
            </span>
            <span>{data.kpiGrowth}</span>
          </span>
        </div>
        <p className="font-label-md text-label-md text-on-surface-variant mb-1">
          {data.periodLabel}
        </p>
        <h3 className="font-headline-lg text-headline-lg text-on-surface">
          {data.kpiCollection}
        </h3>
        <p className="font-body-sm text-body-sm text-outline mt-2">
          {data.kpiTarget}
        </p>
        <div className="w-full bg-surface-container-highest rounded-full h-1.5 mt-3 overflow-hidden">
          <div
            className="bg-primary h-1.5 rounded-full transition-all duration-500"
            style={{ width: data.kpiProgress }}
          ></div>
        </div>
      </div>

      {/* Stat 2: Transactions */}
      <div className="bg-surface-container-lowest rounded-xl p-stack-lg shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-transform border border-surface-container">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-secondary-fixed rounded-lg text-secondary">
            <span className="material-symbols-outlined text-2xl">
              receipt_long
            </span>
          </div>
          <span className="bg-success-leaf/10 text-success-leaf font-label-sm text-label-sm px-2.5 py-1 rounded-full flex items-center gap-1 font-bold">
            <span className="material-symbols-outlined text-[14px]">
              trending_up
            </span>
            <span>{data.kpiTxGrowth}</span>
          </span>
        </div>
        <p className="font-label-md text-label-md text-on-surface-variant mb-1">
          Transactions Processed
        </p>
        <h3 className="font-headline-lg text-headline-lg text-on-surface">
          {data.kpiTransactions}
        </h3>
        <p className="font-body-sm text-body-sm text-outline mt-2">
          {data.kpiAvgTicket}
        </p>
      </div>

      {/* Stat 3: Efficiency */}
      <div className="bg-surface-container-lowest rounded-xl p-stack-lg shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-transform border border-surface-container">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-surface-container-highest rounded-lg text-on-surface">
            <span className="material-symbols-outlined text-2xl">
              verified_user
            </span>
          </div>
          <span
            className={`${data.kpiEffColorClass} font-label-sm text-label-sm px-2.5 py-1 rounded-full flex items-center gap-1 font-bold`}
          >
            <span className="material-symbols-outlined text-[14px]">
              verified
            </span>
            <span>{data.kpiEffStatus}</span>
          </span>
        </div>
        <p className="font-label-md text-label-md text-on-surface-variant mb-1">
          Collection Efficiency
        </p>
        <h3 className="font-headline-lg text-headline-lg text-on-surface">
          {data.kpiEfficiency}
        </h3>
        <p className="font-body-sm text-body-sm text-outline mt-2">
          YTD Target Compliance
        </p>
      </div>
    </div>
  );
}
