import React, { useState } from "react";
import AdvancePaymentModal from "./AdvancePaymentModal";

export default function FullyPaidPropertyDetails({
  propertyData,
  onReturnToSearch,
  isOnlinePayment = false,
  onProceedToOnlineGateway,
}) {
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);

  const upicId = propertyData?.upicId || "V01103";
  const propertyNo = propertyData?.propertyNo || "A3-102()";
  const propertyDescription = propertyData?.propertyDescription || "निवासी";
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

  return (
    <div className="w-full p-margin-mobile md:p-margin-desktop flex-1 flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border-default pb-4">
          <div className="flex items-center text-body-sm font-body-sm text-on-surface-variant gap-2 flex-wrap">
            <button
              type="button"
              onClick={onReturnToSearch}
              className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">home</span> Home
            </button>
            <span className="material-symbols-outlined text-sm text-outline">
              chevron_right
            </span>
            <button
              type="button"
              onClick={onReturnToSearch}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Property Tax
            </button>
            <span className="material-symbols-outlined text-sm text-outline">
              chevron_right
            </span>
            <span className="text-primary font-bold">
              Property Details
            </span>
          </div>

          <button
            type="button"
            onClick={onReturnToSearch}
            className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border border-outline-variant bg-surface-container hover:bg-surface-container-highest cursor-pointer transition-colors shadow-xs whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Back to Search</span>
          </button>
        </div>

        {/* Page Title Row */}
        <div>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-primary tracking-tight">
            Property Details
          </h2>
          <p className="text-on-surface-variant mt-1 text-body-sm">
            Property record after complete dues settlement.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col gap-6 w-full">
        {/* Section 1: Property Information Card */}
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

        {/* Section 2: Note Card */}
        <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-border-default overflow-hidden flex flex-col">
          <div className="bg-surface-muted px-6 py-3 border-b border-border-default flex items-center gap-2 text-on-surface">
            <span className="material-symbols-outlined text-primary">note</span>
            <h3 className="font-headline-md text-base md:text-lg font-bold">
              Note
            </h3>
          </div>

          <div className="p-6 flex flex-col gap-5 bg-white">
            <p className="text-on-surface text-sm sm:text-base leading-relaxed font-medium">
              Thank you, No Dues are pending for this Property. if any queries Please contact to Property tax department
            </p>

            <div className="pt-4 border-t border-border-default flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4 sm:gap-5 bg-surface-container-low/40 p-4 rounded-lg">
              <p className="text-on-surface-variant text-sm font-medium">
                Please click here to pay advance payment.
              </p>

              <button
                type="button"
                onClick={() => setIsAdvanceModalOpen(true)}
                className="flex items-center gap-2 bg-[#062B6F] hover:bg-[#041F52] text-white font-button-text font-semibold px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap text-sm"
              >
                <span className="material-symbols-outlined text-lg text-white">
                  payments
                </span>
                <span className="text-white">Advance Payment</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Advance Payment Modal */}
      <AdvancePaymentModal
        isOpen={isAdvanceModalOpen}
        onClose={() => setIsAdvanceModalOpen(false)}
        propertyId={propertyNo}
        isOnlineMode={isOnlinePayment}
        mobileNo={propMobileNo}
        onProceedToOnlineGateway={onProceedToOnlineGateway}
      />
    </div>
  );
}
