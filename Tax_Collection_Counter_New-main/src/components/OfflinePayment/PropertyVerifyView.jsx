import React, { useState } from "react";
import TaxDistributionModal from "./TaxDistributionModal";
import PreviousReceiptsModal from "./PreviousReceiptsModal";
import NoticeBillModal from "./NoticeBillModal";
import ValuationSheetModal from "./ValuationSheetModal";
import AssessmentRegisterModal from "./AssessmentRegisterModal";
import DuesPendingModal from "./DuesPendingModal";

export default function PropertyVerifyView({
  propertyData,
  onProceedToPayment,
  onCancel,
  isOnlinePayment = false,
}) {
  const [isTaxDistModalOpen, setIsTaxDistModalOpen] = useState(false);
  const [isReceiptsModalOpen, setIsReceiptsModalOpen] = useState(false);
  const [isNoticeBillOpen, setIsNoticeBillOpen] = useState(false);
  const [isValuationSheetOpen, setIsValuationSheetOpen] = useState(false);
  const [isAssessmentRegisterOpen, setIsAssessmentRegisterOpen] = useState(false);
  const [isDuesPendingModalOpen, setIsDuesPendingModalOpen] = useState(false);

  // Search input state on top bar
  const [searchQuery, setSearchQuery] = useState("");

  // Payment form states
  const [mobileNo, setMobileNo] = useState("9876543210");
  const [emailId, setEmailId] = useState("");
  const [paymentMode, setPaymentMode] = useState(isOnlinePayment ? "Razorpay" : "");
  const [behalfPayerName, setBehalfPayerName] = useState("");
  const [paymentType, setPaymentType] = useState("total"); // 'total' | 'partial' | 'pending'
  const [partialAmount, setPartialAmount] = useState(500);
  const [isDistributedMode, setIsDistributedMode] = useState(false);
  const [distributedVal, setDistributedVal] = useState(500);
  const [partialError, setPartialError] = useState("");
  const [distributionSuccess, setDistributionSuccess] = useState(false);

  // Property info data
  const baseTotal = 20378;
  const pendingTotalVal = 16044; // Arrears only: A+C-G (12686 + 3425 - 67)
  const currentTotal = baseTotal;

  const upicId = propertyData?.upicId || "V01103";
  const propertyNo = propertyData?.propertyNo || "V1-103()";
  const propertyDescription =
    propertyData?.propertyDescription ||
    propertyData?.propertyType ||
    "निवासी";
  const ownerName =
    propertyData?.ownerName &&
    propertyData?.ownerName !== "John Doe" &&
    propertyData?.ownerName !== "Uttam Ananda Patil"
      ? propertyData.ownerName
      : "धारक संतोष गुंडाजी गायकवाड";
  const oldPropertyNo =
    propertyData?.oldPropertyNo || "WADGAON-2725+4155";
  const propMobileNo = propertyData?.mobileNo || "9823294379";
  const occupierName =
    propertyData?.occupierName || "संतोष गुणाजी गायकवाड";
  const shopBuildingName =
    propertyData?.shopBuildingName || propertyData?.buildingName || "/";
  const billDistributionDate = propertyData?.billDistributionDate || "";
  const societyName = propertyData?.societyName || "";
  const plotNo = propertyData?.plotNo || "";
  const sangankiyKr =
    propertyData?.sangankiyKr || propertyData?.computerNo || "";
  const address =
    propertyData?.address &&
    !propertyData?.address.includes("123 Main St") &&
    !propertyData?.address.includes("Jalgaon")
      ? propertyData.address
      : "केशव नगर वडगाव मावळ";
  const shopBuildingNo =
    propertyData?.shopBuildingNo || propertyData?.buildingNo || "";

  const mergedPropertyData = {
    ...propertyData,
    upicId,
    propertyNo,
    ownerName,
    occupierName,
    oldPropertyNo,
    mobileNo: propMobileNo,
    address,
    propertyDescription,
    shopBuildingName,
    billDistributionDate,
    societyName,
    plotNo,
    sangankiyKr,
    shopBuildingNo,
  };

  function formatCurrency(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Handle distribution of partial amount
  const handleApplyDistribution = () => {
    const val = parseFloat(partialAmount);
    if (isNaN(val) || val <= 0 || val > currentTotal) {
      setPartialError(
        `Amount must be greater than 0 and less than or equal to ₹ ${formatCurrency(
          currentTotal
        )}.`
      );
      setDistributionSuccess(false);
      setIsDistributedMode(false);
      return;
    }

    setPartialError("");
    setDistributionSuccess(true);
    setIsDistributedMode(true);
    setDistributedVal(val);
  };

  // Payment selection switch
  const handlePaymentTypeChange = (type) => {
    setPaymentType(type);
    if (type === "total") {
      setIsDistributedMode(false);
      setDistributionSuccess(false);
      setPartialError("");
    } else {
      setIsDistributedMode(false);
      setDistributionSuccess(false);
    }
  };

  // Compute summary values
  const payingAmount =
    paymentType === "total"
      ? currentTotal
      : paymentType === "pending"
      ? pendingTotalVal
      : isDistributedMode
      ? distributedVal
      : 0;

  const remainingAmount = Math.max(0, currentTotal - payingAmount);

  const isProceedDisabled =
    paymentType === "partial" && (!isDistributedMode || payingAmount <= 0);

  const handleProceedClick = () => {
    if (!paymentMode) {
      alert("Please select a Payment Mode before proceeding.");
      return;
    }
    if (onProceedToPayment) {
      onProceedToPayment({
        upicId,
        ownerName,
        mobileNo,
        paymentMode,
        paymentType,
        payingAmount,
      });
    } else {
      alert(
        `Processing payment of ₹ ${formatCurrency(
          payingAmount
        )} via ${paymentMode}`
      );
    }
  };

  return (
    <div className="p-margin-mobile md:p-margin-desktop flex-1 flex flex-col gap-6 max-w-container-max mx-auto w-full animate-in fade-in duration-300">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border-default pb-4">
          {isOnlinePayment ? (
            <div className="flex items-center text-body-sm font-body-sm text-on-surface-variant gap-2">
              <button
                type="button"
                onClick={onCancel}
                className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">home</span> Home
              </button>
              <span className="material-symbols-outlined text-sm text-outline">
                chevron_right
              </span>
              <span className="text-primary font-bold">
                Property Tax Verify / Online Payment
              </span>
            </div>
          ) : (
            <div className="flex items-center text-body-sm font-body-sm text-on-surface-variant gap-2">
              <button
                type="button"
                onClick={onCancel}
                className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">home</span> Home
              </button>
              <span className="material-symbols-outlined text-sm text-outline">
                chevron_right
              </span>
              <button
                type="button"
                onClick={onCancel}
                className="hover:text-primary transition-colors cursor-pointer"
              >
                Property Tax
              </button>
              <span className="material-symbols-outlined text-sm text-outline">
                chevron_right
              </span>
              <span className="text-primary font-bold">
                Verify Property Details
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-outline-variant bg-surface-container hover:bg-surface-container-highest cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Back to Search</span>
          </button>
        </div>

        {/* Page Title */}
        <div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold">
            Verify Property Details
          </h2>
          <p className="text-on-surface-variant mt-1 text-body-sm">
            Review ledger information before processing payment.
          </p>
        </div>

        {/* Full-width Search Bar */}
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Property by UPIC ID, Owner Name or Address..."
            className="w-full pl-4 pr-14 py-3.5 rounded-xl border-2 border-primary-container focus:ring-2 focus:ring-primary focus:border-primary font-body-md text-on-surface bg-white shadow-sm outline-none"
          />
          <button
            type="button"
            aria-label="Search"
            onClick={() => {
              if (searchQuery.trim()) {
                alert("Searching for: " + searchQuery);
              }
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-primary-container text-white flex items-center justify-center hover:opacity-90 transition-all shadow-sm focus:outline-none cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center gap-3 w-full justify-start">
          <button
            type="button"
            onClick={() => setIsDuesPendingModalOpen(true)}
            className="flex items-center gap-2 bg-surface-container-lowest border border-border-default px-4 py-2 rounded-lg font-button-text text-sm text-primary hover:bg-surface-muted transition-colors shadow-xs whitespace-nowrap cursor-pointer"
          >
            <span className="material-symbols-outlined text-[19px]">
              description
            </span>
            <span>Abstract Register</span>
          </button>

          <button
            type="button"
            onClick={() => setIsNoticeBillOpen(true)}
            className="flex items-center gap-2 bg-surface-container-lowest border border-border-default px-4 py-2 rounded-lg font-button-text text-sm text-primary hover:bg-surface-muted transition-colors shadow-xs whitespace-nowrap cursor-pointer"
          >
            <span className="material-symbols-outlined text-[19px]">mail</span>
            <span>Notice Bill</span>
          </button>

          <button
            type="button"
            onClick={() => setIsValuationSheetOpen(true)}
            className="flex items-center gap-2 bg-surface-container-lowest border border-border-default px-4 py-2 rounded-lg font-button-text text-sm text-primary hover:bg-surface-muted transition-colors shadow-xs whitespace-nowrap cursor-pointer"
          >
            <span className="material-symbols-outlined text-[19px]">
              receipt
            </span>
            <span>Valuation Sheet</span>
          </button>

          <button
            type="button"
            onClick={() => setIsReceiptsModalOpen(true)}
            className="flex items-center gap-2 bg-surface-container-lowest border border-border-default px-4 py-2 rounded-lg font-button-text text-sm text-primary hover:bg-surface-muted transition-colors shadow-xs whitespace-nowrap cursor-pointer"
          >
            <span className="material-symbols-outlined text-[19px]">
              history
            </span>
            <span>Previous Receipts</span>
          </button>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Property Info & Ledger (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Property Information Card */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-border-default overflow-hidden flex flex-col">
            <div className="bg-primary px-6 py-3 border-b border-border-default flex items-center gap-2 text-white">
              <span className="material-symbols-outlined">info</span>
              <h3 className="font-headline-md text-base md:text-lg font-bold">
                Property Information
              </h3>
            </div>

            <div className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-3 bg-white text-xs sm:text-sm">
              {/* Column 1 */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-slate-800 font-medium whitespace-nowrap">UPIC ID :</span>
                  <span className="text-primary font-bold">{upicId}</span>
                </div>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-slate-800 font-medium whitespace-nowrap">Owner Name :</span>
                  <span className="text-primary font-bold">{ownerName}</span>
                </div>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-slate-800 font-medium whitespace-nowrap">Occupier Name :</span>
                  <span className="text-primary font-bold">{occupierName}</span>
                </div>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-slate-800 font-medium whitespace-nowrap">Society Name :</span>
                  <span className="text-primary font-bold">{societyName}</span>
                </div>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-slate-800 font-medium whitespace-nowrap">Address :</span>
                  <span className="text-primary font-bold">{address}</span>
                </div>
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-slate-800 font-medium whitespace-nowrap">Property No. :</span>
                  <span className="text-primary font-bold">{propertyNo}</span>
                </div>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-slate-800 font-medium whitespace-nowrap">Old Property No :</span>
                  <span className="text-primary font-bold">{oldPropertyNo}</span>
                </div>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-slate-800 font-medium whitespace-nowrap">Shop / Building Name :</span>
                  <span className="text-primary font-bold">{shopBuildingName}</span>
                </div>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-slate-800 font-medium whitespace-nowrap">Plot No. :</span>
                  <span className="text-primary font-bold">{plotNo}</span>
                </div>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-slate-800 font-medium whitespace-nowrap">Shop / Building No. :</span>
                  <span className="text-primary font-bold">{shopBuildingNo}</span>
                </div>
              </div>

              {/* Column 3 */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-slate-800 font-medium whitespace-nowrap">Property Description :</span>
                  <span className="text-primary font-bold">{propertyDescription}</span>
                </div>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-slate-800 font-medium whitespace-nowrap">Mobile No. :</span>
                  <span className="text-primary font-bold">{propMobileNo}</span>
                </div>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-slate-800 font-medium whitespace-nowrap">Bill Distribution Date :</span>
                  <span className="text-primary font-bold">{billDistributionDate}</span>
                </div>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-slate-800 font-medium whitespace-nowrap">संगणकीय क्र :</span>
                  <span className="text-primary font-bold">{sangankiyKr}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tax Ledger Card */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-border-default overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-border-default flex flex-wrap justify-between items-center bg-surface-muted gap-3">
              <div className="flex items-center gap-3">
                <h3 className="font-headline-md text-base md:text-lg text-on-surface flex items-center gap-2 font-bold">
                  <span className="material-symbols-outlined text-primary">
                    receipt_long
                  </span>
                  Total Tax Breakdown
                </h3>
                {isDistributedMode && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-secondary border border-blue-200 shadow-xs animate-in fade-in duration-200">
                    <span className="material-symbols-outlined text-sm">
                      alt_route
                    </span>
                    Distributed Mode Active
                  </span>
                )}
              </div>

              {/* Tax Distribution Button */}
              <button
                type="button"
                onClick={() => setIsTaxDistModalOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold text-xs text-primary hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xs cursor-pointer"
                style={{
                  background:
                    "linear-gradient(rgb(237, 242, 249) 0%, rgb(228, 236, 247) 100%)",
                  border: "1px solid rgba(0, 38, 101, 0.28)",
                  boxShadow:
                    "rgba(255, 255, 255, 0.8) 0px 1px 0px inset, rgba(0, 0, 0, 0.08) 0px 1px 2px",
                }}
              >
                <span className="material-symbols-outlined text-[18px] text-primary">
                  query_stats
                </span>
                <span className="text-primary font-bold tracking-tight">
                  Tax Distribution
                </span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-primary text-on-primary font-label-md text-xs">
                    <th className="p-4 border-b border-border-default whitespace-nowrap">
                      Tax Details
                    </th>
                    <th className="p-4 border-b border-border-default text-right whitespace-nowrap">
                      {isDistributedMode ? "Tax Rs." : "Amount (Rs.)"}
                    </th>
                  </tr>
                </thead>
                <tbody className="font-body-sm text-sm text-on-surface divide-y divide-border-default">
                  {isDistributedMode ? (
                    <>
                      <tr className="hover:bg-surface-container-low transition-colors">
                        <td className="p-4">Arrears Tax Rs. (A)</td>
                        <td className="p-4 text-right font-medium">0</td>
                      </tr>
                      <tr className="hover:bg-surface-container-low transition-colors bg-surface-container-lowest">
                        <td className="p-4 font-semibold text-primary">
                          Current Tax Rs. (B)
                        </td>
                        <td className="p-4 text-right font-semibold text-primary">
                          {formatCurrency(distributedVal)}
                        </td>
                      </tr>
                      <tr className="hover:bg-surface-container-low transition-colors">
                        <td className="p-4">Arrears Interest Rs. (C)</td>
                        <td className="p-4 text-right font-medium">0</td>
                      </tr>
                      <tr className="hover:bg-surface-container-low transition-colors">
                        <td className="p-4">Current Interest Rs. (D)</td>
                        <td className="p-4 text-right font-medium">0</td>
                      </tr>
                      <tr className="hover:bg-surface-container-low transition-colors">
                        <td className="p-4">Advance Payment (E)</td>
                        <td className="p-4 text-right font-medium">0</td>
                      </tr>
                      <tr className="hover:bg-surface-container-low transition-colors">
                        <td className="p-4">Cheque Bounce Fee (F) (If so)</td>
                        <td className="p-4 text-right font-medium">0</td>
                      </tr>
                      <tr className="hover:bg-surface-container-low transition-colors">
                        <td className="p-4">Discount Rs. (G)</td>
                        <td className="p-4 text-right font-medium">0</td>
                      </tr>
                      <tr className="bg-surface-muted border-t-2 border-border-default">
                        <td className="p-4 font-label-md text-on-surface font-semibold">
                          Total Payable Rs. (A+B+C+D+E+F-G)
                        </td>
                        <td className="p-4 text-right font-headline-md text-error font-bold text-lg">
                          {formatCurrency(distributedVal)}
                        </td>
                      </tr>
                    </>
                  ) : paymentType === "pending" ? (
                    <>
                      <tr className="hover:bg-surface-container-low transition-colors">
                        <td className="p-4">Arrears Tax Rs. (A)</td>
                        <td className="p-4 text-right font-medium">12,686</td>
                      </tr>
                      <tr className="hover:bg-surface-container-low transition-colors text-warning-amber">
                        <td className="p-4 font-medium">Arrears Interest Rs. (C)</td>
                        <td className="p-4 text-right font-medium">3,425</td>
                      </tr>
                      <tr className="hover:bg-surface-container-low transition-colors">
                        <td className="p-4">Current Interest Rs. (D)</td>
                        <td className="p-4 text-right font-medium">0</td>
                      </tr>
                      <tr className="hover:bg-surface-container-low transition-colors">
                        <td className="p-4">Advance Payment (E)</td>
                        <td className="p-4 text-right font-medium">0</td>
                      </tr>
                      <tr className="hover:bg-surface-container-low transition-colors">
                        <td className="p-4">Cheque Bounce Fee (F) (If so)</td>
                        <td className="p-4 text-right font-medium">0</td>
                      </tr>
                      <tr className="hover:bg-surface-container-low transition-colors text-success-leaf">
                        <td className="p-4 font-medium">Discount Rs. (G)</td>
                        <td className="p-4 text-right font-medium">-67</td>
                      </tr>
                      <tr className="bg-surface-muted border-t-2 border-border-default">
                        <td className="p-4 font-label-md text-on-surface font-semibold">
                          Total Payable Rs. (A+C+D+E+F-G)
                        </td>
                        <td className="p-4 text-right font-headline-md text-error font-bold text-lg">
                          {formatCurrency(pendingTotalVal)}
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr className="hover:bg-surface-container-low transition-colors">
                        <td className="p-4">Arrears Tax Rs. (A)</td>
                        <td className="p-4 text-right font-medium">12,686</td>
                      </tr>
                      <tr className="hover:bg-surface-container-low transition-colors bg-surface-container-lowest">
                        <td className="p-4">Current Tax Rs. (B)</td>
                        <td className="p-4 text-right font-medium">4,334</td>
                      </tr>
                      <tr className="hover:bg-surface-container-low transition-colors text-warning-amber">
                        <td className="p-4 font-medium">Arrears Interest Rs. (C)</td>
                        <td className="p-4 text-right font-medium">3,425</td>
                      </tr>
                      <tr className="hover:bg-surface-container-low transition-colors">
                        <td className="p-4">Current Interest Rs. (D)</td>
                        <td className="p-4 text-right font-medium">0</td>
                      </tr>
                      <tr className="hover:bg-surface-container-low transition-colors">
                        <td className="p-4">Advance Payment (E)</td>
                        <td className="p-4 text-right font-medium">0</td>
                      </tr>
                      <tr className="hover:bg-surface-container-low transition-colors">
                        <td className="p-4">Cheque Bounce Fee (F) (If so)</td>
                        <td className="p-4 text-right font-medium">0</td>
                      </tr>
                      <tr className="hover:bg-surface-container-low transition-colors text-success-leaf">
                        <td className="p-4 font-medium">Discount Rs. (G)</td>
                        <td className="p-4 text-right font-medium">-67</td>
                      </tr>
                      <tr className="bg-surface-muted border-t-2 border-border-default">
                        <td className="p-4 font-label-md text-on-surface font-semibold">
                          Total Payable Rs. (A+B+C+D+E+F-G)
                        </td>
                        <td className="p-4 text-right font-headline-md text-error font-bold text-lg">
                          {formatCurrency(currentTotal)}
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Payment Action Card (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-surface-container-lowest rounded-xl shadow-lg border border-border-default p-6 sticky top-24">
            <h3 className="font-headline-md text-headline-md text-primary mb-6 flex items-center gap-2 border-b border-border-default pb-4 font-bold">
              <span className="material-symbols-outlined">payments</span>
              Pay Property Tax
            </h3>

            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleProceedClick();
              }}
            >
              {/* Mobile No */}
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-xs text-on-surface-variant font-medium">
                  Mobile No. <span className="text-error">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-md border border-border-default focus:ring-2 focus:ring-secondary focus:border-secondary bg-white shadow-xs outline-none"
                />
              </div>

              {/* Email ID */}
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-xs text-on-surface-variant font-medium">
                  Email ID
                </label>
                <input
                  type="email"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  placeholder="Enter Email"
                  className="w-full px-3 py-2 text-sm rounded-md border border-border-default focus:ring-2 focus:ring-secondary focus:border-secondary bg-white shadow-xs outline-none"
                />
              </div>

              {/* Payment Mode */}
              {isOnlinePayment ? (
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-xs text-on-surface-variant font-medium">
                    Payment Mode <span className="text-error">*</span>
                  </label>
                  <label className="flex items-center justify-between p-3 rounded-lg border border-border-default cursor-pointer bg-surface-container-lowest hover:bg-surface-muted transition-colors shadow-xs">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMode"
                        value="Razorpay"
                        checked={paymentMode === "Razorpay"}
                        onChange={() => setPaymentMode("Razorpay")}
                        className="form-radio text-primary focus:ring-primary h-4 w-4 cursor-pointer"
                      />
                      <span className="font-label-md text-sm text-on-surface font-semibold">
                        Razorpay
                      </span>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-secondary border border-blue-200">
                      Online
                    </span>
                  </label>
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-xs text-on-surface-variant font-medium">
                    Payment Mode <span className="text-error">*</span>
                  </label>
                  <select
                    required
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value)}
                    className="w-full rounded-md border border-border-default focus:ring-2 focus:ring-secondary focus:border-secondary bg-white text-on-surface text-sm shadow-xs py-2 px-3 outline-none cursor-pointer"
                  >
                    <option value="">--select--</option>
                    <option value="Cash">Cash</option>
                    <option value="DD">DD</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Card Payment">Card Payment</option>
                    <option value="NEFT">NEFT</option>
                    <option value="RTGS">RTGS</option>
                    <option value="QR">QR</option>
                  </select>
                </div>
              )}

              {/* Behalf Payer Name */}
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-xs text-on-surface-variant font-medium">
                  Behalf Payer Name
                </label>
                <input
                  type="text"
                  value={behalfPayerName}
                  onChange={(e) => setBehalfPayerName(e.target.value)}
                  placeholder="Enter payer name if paying on behalf"
                  className="w-full px-3 py-2 text-sm rounded-md border border-border-default focus:ring-2 focus:ring-secondary focus:border-secondary bg-white shadow-xs outline-none"
                />
              </div>

              {/* Payment Type Selection (Radio Group) */}
              <div className="mt-2 pt-4 border-t border-border-default">
                <label className="font-label-md text-sm text-on-surface mb-3 block font-semibold">
                  Payment Amount Selection
                </label>

                <div className="flex flex-col gap-2">
                  {/* Total Payment Radio */}
                  <label
                    onClick={() => handlePaymentTypeChange("total")}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      paymentType === "total"
                        ? "border-primary bg-primary-fixed/20"
                        : "border-border-default hover:bg-surface-muted"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentType"
                      value="total"
                      checked={paymentType === "total"}
                      onChange={() => handlePaymentTypeChange("total")}
                      className="text-primary focus:ring-primary h-4 w-4"
                    />
                    <span className="font-label-md text-sm text-on-surface font-medium">
                      Total Payment
                    </span>
                  </label>

                  {/* Partial Payment Radio */}
                  <label
                    onClick={() => handlePaymentTypeChange("partial")}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      paymentType === "partial"
                        ? "border-primary bg-primary-fixed/20"
                        : "border-border-default hover:bg-surface-muted"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentType"
                      value="partial"
                      checked={paymentType === "partial"}
                      onChange={() => handlePaymentTypeChange("partial")}
                      className="text-primary focus:ring-primary h-4 w-4"
                    />
                    <span className="font-label-md text-sm text-on-surface font-medium">
                      Partial Payment
                    </span>
                  </label>

                  {/* Pending Payment Radio */}
                  <label
                    onClick={() => handlePaymentTypeChange("pending")}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      paymentType === "pending"
                        ? "border-primary bg-primary-fixed/20"
                        : "border-border-default hover:bg-surface-muted"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentType"
                      value="pending"
                      checked={paymentType === "pending"}
                      onChange={() => handlePaymentTypeChange("pending")}
                      className="text-primary focus:ring-primary h-4 w-4"
                    />
                    <span className="font-label-md text-sm text-on-surface font-medium">
                      Pending Payment
                    </span>
                  </label>

                  {/* Partial Payment Input Container */}
                  {paymentType === "partial" && (
                    <div className="flex flex-col gap-2 p-3 bg-surface-container-low rounded-lg border border-secondary/20 animate-in fade-in duration-150 mt-1">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-on-surface-variant text-sm font-semibold">
                            ₹
                          </span>
                          <input
                            type="number"
                            min="1"
                            max={currentTotal}
                            value={partialAmount}
                            onChange={(e) => {
                              setPartialAmount(e.target.value);
                              setIsDistributedMode(false);
                              setDistributionSuccess(false);
                              setPartialError("");
                            }}
                            placeholder="Enter Amount (₹)"
                            className="w-full pl-7 pr-2 py-2 text-sm rounded-lg border border-border-default focus:ring-2 focus:ring-secondary focus:border-secondary bg-white shadow-xs font-medium outline-none"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleApplyDistribution}
                          className="flex items-center justify-center gap-1 px-3 py-2 bg-secondary text-white rounded-lg font-button-text text-xs font-semibold hover:bg-primary transition-all shadow-xs active:scale-95 whitespace-nowrap cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-base">
                            alt_route
                          </span>
                          <span>Distributed</span>
                        </button>
                      </div>

                      {distributionSuccess && (
                        <div className="flex items-center gap-1.5 text-xs text-success-leaf font-semibold bg-green-50 border border-green-200 px-2.5 py-1.5 rounded-md animate-in fade-in duration-150">
                          <span className="material-symbols-outlined text-[16px]">
                            check_circle
                          </span>
                          <span>Amount Distributed Successfully</span>
                        </div>
                      )}

                      {partialError && (
                        <span className="text-xs text-error font-medium">
                          {partialError}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Amount Display Box */}
              <div className="flex flex-col gap-3 mt-2">
                {paymentType === "pending" && (
                  <p className="font-body-sm text-xs text-on-surface-variant italic">
                    Pending Payment will clear the currently outstanding property tax amount.
                  </p>
                )}
                <div className="bg-surface-muted p-4 rounded-lg border border-border-default flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-on-surface-variant">Payment Type:</span>
                    <span className="text-on-surface font-bold">
                      {paymentType === "total"
                        ? "Total Payment"
                        : paymentType === "pending"
                        ? "Pending Payment"
                        : "Partial Payment"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-on-surface-variant">
                      Total Pending Amount:
                    </span>
                    <span className="text-on-surface font-bold">
                      ₹ {formatCurrency(currentTotal)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-outline-variant/60">
                    <span className="text-xs font-medium text-on-surface-variant">
                      Paying Amount:
                    </span>
                    <span className="text-lg font-bold text-primary">
                      ₹ {formatCurrency(payingAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-on-surface-variant">
                      Remaining Amount:
                    </span>
                    <span className="text-warning-amber font-bold">
                      ₹ {formatCurrency(remainingAmount)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Proceed CTA */}
              <button
                type="submit"
                disabled={isProceedDisabled}
                className={`mt-3 w-full py-3 rounded-lg shadow-md font-button-text font-semibold transition-all flex items-center justify-center gap-2 text-base ${
                  isProceedDisabled
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed opacity-60"
                    : "bg-success-leaf text-white hover:opacity-90 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                }`}
              >
                <span>Proceed to Payment</span>
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Tax Distribution Modal */}
      <TaxDistributionModal
        isOpen={isTaxDistModalOpen}
        onClose={() => setIsTaxDistModalOpen(false)}
      />

      {/* Previous Receipts Modal */}
      <PreviousReceiptsModal
        isOpen={isReceiptsModalOpen}
        onClose={() => setIsReceiptsModalOpen(false)}
      />

      {/* Notice Bill Modal */}
      <NoticeBillModal
        isOpen={isNoticeBillOpen}
        onClose={() => setIsNoticeBillOpen(false)}
        propertyData={mergedPropertyData}
      />

      {/* Valuation Sheet Modal */}
      <ValuationSheetModal
        isOpen={isValuationSheetOpen}
        onClose={() => setIsValuationSheetOpen(false)}
        propertyData={mergedPropertyData}
      />

      {/* Abstract Register Modal */}
      <AssessmentRegisterModal
        isOpen={isAssessmentRegisterOpen}
        onClose={() => setIsAssessmentRegisterOpen(false)}
        propertyData={mergedPropertyData}
      />

      {/* Dues Pending Modal */}
      <DuesPendingModal
        isOpen={isDuesPendingModalOpen}
        onClose={() => setIsDuesPendingModalOpen(false)}
        propertyNo={propertyNo}
        ownerName={ownerName}
      />
    </div>
  );
}
