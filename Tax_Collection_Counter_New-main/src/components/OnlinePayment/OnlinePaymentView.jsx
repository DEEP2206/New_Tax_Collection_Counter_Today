import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import {
  OnlineQuickPayForm,
  OnlinePropertyNoForm,
  OnlineOwnerNameForm,
  OnlineOldPropertyNoForm,
} from "./OnlineSearchCriteriaForms";
import SearchResultsTable from "../OfflinePayment/SearchResultsTable";
import ScannerModal from "../OfflinePayment/ScannerModal";
import OtpModal from "../OfflinePayment/OtpModal";
import PropertyVerifyView from "../OfflinePayment/PropertyVerifyView";
import OnlinePaymentGatewayStep from "./OnlinePaymentGatewayStep";
import PaymentSuccessStep from "../OfflinePayment/PaymentSuccessStep";
import PaymentFailureStep from "./PaymentFailureStep";

export default function OnlinePaymentView({ onNavigateBack }) {
  const { t } = useLanguage();
  // Navigation & Step state (1: Search, 2: Verify, 3: Payment, 4: Receipt)
  const [step, setStep] = useState(1);

  // Active Criteria Tab: 'quick_pay' | 'property_no' | 'owner_name' | 'old_property_no'
  const [activeTab, setActiveTab] = useState("quick_pay");

  // Form Data state
  const [formData, setFormData] = useState({
    quickPayInput: "",
    zone: "Zone 1 - Wadgaon Central",
    ward: "Ward 1A - Main Market / Gaothan",
    propertyNo: "A3-102()",
    ownerNameOpt: "e.g. John Doe",
    ownerNameMarathi: "गायकवाड मंगेश पुंडळीक",
    ownerNameEnglish: "Gaikwad Mangesh Pundalik",
    oldWard: "Ward 1 - Gaothan",
    oldPropertyNo: "102/A",
  });

  // Modal states
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);

  // Search Results & Selected Property state
  const [showResultsTable, setShowResultsTable] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [transactionResult, setTransactionResult] = useState(null);
  const [failureData, setFailureData] = useState(null);
  const [attemptCount, setAttemptCount] = useState(1);
  const [gatewayOriginStep, setGatewayOriginStep] = useState(2);

  // Form input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Tab change handler - below section is hidden until user clicks search
  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    setShowResultsTable(false);
  };

  // Clear form handler - clears inputs and hides below section
  const handleClear = () => {
    setFormData((prev) => ({
      ...prev,
      quickPayInput: "",
      propertyNo: "",
      ownerNameOpt: "",
      ownerNameMarathi: "",
      ownerNameEnglish: "",
      oldPropertyNo: "",
    }));
    setShowResultsTable(false);
  };

  // Search execution handler
  const handleSearch = () => {
    if (activeTab === "quick_pay") {
      setShowResultsTable(true);
      return;
    }

    // For property_no, owner_name, old_property_no: DO NOT show below search property section
    setShowResultsTable(false);
    setSelectedProperty({
      propertyNo: formData.propertyNo || formData.oldPropertyNo || "A3-102()",
      ownerName: formData.ownerNameOpt || formData.ownerNameEnglish || formData.ownerNameMarathi || "John Doe",
      address: "123 Main St, Apt 4B\nNorth Zone, Ward 1A",
      currentYearDues: "₹ 5,200",
      arrears: "₹ 0",
      totalAmount: "₹ 5,200",
    });
    setStep(2); // Advance directly to Verify Step
  };

  const handleSelectPropertyRecord = (record) => {
    setSelectedProperty({
      propertyNo: record.propertyNo,
      ownerName: record.ownerName,
      address: record.address || "Ward 1A, Gaothan, Vadgaon Maval",
      currentYearDues: record.currentYearDues || "₹ 5,200",
      arrears: record.arrears || "₹ 0",
      totalAmount: record.totalAmount || "₹ 5,200",
    });
    setStep(2);
  };

  const handleScanSuccess = (detectedProperty) => {
    setSelectedProperty(detectedProperty);
    setStep(2);
  };

  const handleOtpSuccess = () => {
    setSelectedProperty({
      propertyNo: "A3-102()",
      ownerName: "John Doe",
      address: "123 Main St, Apt 4B\nNorth Zone, Ward 1A",
      currentYearDues: "₹ 5,200",
      arrears: "₹ 0",
      totalAmount: "₹ 5,200",
    });
    setStep(2);
  };

  const criteriaNavItems = [
    { key: "quick_pay", label: t("quickPay", "Quick Pay"), icon: "bolt" },
    { key: "property_no", label: t("propertyNo", "Property No."), icon: "tag" },
    { key: "owner_name", label: t("ownerOccupierName", "Owner / Occupier Name"), icon: "person" },
    { key: "old_property_no", label: t("oldPropertyNo", "Old Property No."), icon: "history" },
  ];

  // Step 2: Verify Property Details
  if (step === 2) {
    return (
      <PropertyVerifyView
        isOnlinePayment={true}
        propertyData={selectedProperty}
        onProceedToPayment={(info) => {
          setGatewayOriginStep(2);
          setPaymentDetails(info);
          setStep(3); // Advance to Step 3: Online Payment Gateway
        }}
        onCancel={() => setStep(1)}
      />
    );
  }

  // Step 3: Online Payment Gateway (Razorpay Gateway Flow)
  if (step === 3) {
    return (
      <OnlinePaymentGatewayStep
        propertyData={
          selectedProperty || {
            propertyNo: transactionResult?.propertyId || "V1-109-10(A9)",
            ownerName: transactionResult?.payerName || "Uttam Ananda Patil",
          }
        }
        paymentDetails={paymentDetails}
        attemptCount={gatewayOriginStep === 4 ? 2 : attemptCount}
        onBackToVerify={() => {
          if (gatewayOriginStep === 4) {
            setStep(4);
          } else {
            setStep(2);
          }
        }}
        onConfirmPayment={(result) => {
          setTransactionResult(result);
          setStep(4); // Advance to Step 4: Digital Receipt
        }}
        onPaymentFailure={(failInfo) => {
          setFailureData(failInfo);
          setStep(5); // Advance to Step 5: Payment Failed
        }}
      />
    );
  }

  // Step 4: Digital Receipt & Success
  if (step === 4) {
    return (
      <PaymentSuccessStep
        transactionData={transactionResult}
        isOnline={true}
        onReturnToSearch={() => {
          setStep(1);
          setSelectedProperty(null);
          setPaymentDetails(null);
          setFailureData(null);
          setAttemptCount(1);
          setShowResultsTable(false);
        }}
        onBackToVerify={() => setStep(2)}
        onProceedToOnlineGateway={(gatewayDetails) => {
          setGatewayOriginStep(4);
          setPaymentDetails((prev) => ({
            ...prev,
            ...gatewayDetails,
          }));
          setStep(3);
        }}
      />
    );
  }

  // Step 5: Payment Failed Screen
  if (step === 5) {
    return (
      <PaymentFailureStep
        failureData={failureData}
        propertyData={selectedProperty}
        onRetryTransaction={() => {
          setAttemptCount((prev) => prev + 1);
          setStep(3);
        }}
        onBackToProperty={() => setStep(2)}
        onReturnToSearch={() => {
          setStep(1);
          setSelectedProperty(null);
          setPaymentDetails(null);
          setFailureData(null);
          setAttemptCount(1);
          setShowResultsTable(false);
        }}
      />
    );
  }

  // Step 1: Online Property Lookup View
  return (
    <div className="max-w-container-max mx-auto p-margin-mobile md:p-margin-desktop space-y-stack-lg animate-in fade-in duration-300">
      {/* Breadcrumb & Session Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border-default pb-4">
        <div className="flex items-center text-body-sm font-body-sm text-on-surface-variant gap-2">
          <span className="material-symbols-outlined text-[18px]">home</span>
          <span className="text-outline">/</span>
          <button
            type="button"
            onClick={onNavigateBack}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            PropertyTax
          </button>
          <span className="text-outline">/</span>
          <span className="font-semibold text-on-surface">Online Payment</span>
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
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[15%] h-1 bg-primary z-0 transition-all duration-500"></div>

          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-body-sm shadow-md ring-4 ring-surface-background">
              1
            </div>
            <span className="text-label-sm font-label-sm text-primary font-bold">
              {t("step1", "Search Property")}
            </span>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-bold text-body-sm ring-4 ring-surface-background">
              2
            </div>
            <span className="text-label-sm font-label-sm text-on-surface-variant">
              {t("step2", "Verify Details")}
            </span>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-bold text-body-sm ring-4 ring-surface-background">
              3
            </div>
            <span className="text-label-sm font-label-sm text-on-surface-variant">
              {t("step3", "Collect Payment")}
            </span>
          </div>

          {/* Step 4 */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-bold text-body-sm ring-4 ring-surface-background">
              4
            </div>
            <span className="text-label-sm font-label-sm text-on-surface-variant">
              {t("step4", "Receipt")}
            </span>
          </div>
        </div>
      </div>

      {/* Primary Search Card */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-border-default overflow-hidden flex flex-col md:flex-row">
        {/* Left: SEARCH CRITERIA Sidebar */}
        <div className="w-full md:w-64 bg-primary text-on-primary flex flex-col flex-shrink-0 p-4 border-b md:border-b-0 md:border-r border-primary/20">
          <div className="px-3 py-2 mb-2">
            <p className="text-xs font-bold tracking-wider text-primary-fixed uppercase">
              {t("searchCriteria", "Search Criteria")}
            </p>
          </div>
          <nav className="flex flex-col gap-1.5">
            {criteriaNavItems.map((item) => {
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleTabChange(item.key)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all text-left cursor-pointer ${
                    isActive
                      ? "bg-secondary-container text-on-secondary-container shadow-sm"
                      : "text-primary-fixed hover:bg-primary-container hover:text-on-primary"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Dynamic Form Area */}
        {activeTab === "quick_pay" && (
          <OnlineQuickPayForm
            formData={formData}
            onChange={handleInputChange}
            onOpenScanner={() => setIsScannerOpen(true)}
            onSearch={handleSearch}
            onClear={handleClear}
          />
        )}

        {activeTab === "property_no" && (
          <OnlinePropertyNoForm
            formData={formData}
            onChange={handleInputChange}
            onSearch={handleSearch}
            onClear={handleClear}
          />
        )}

        {activeTab === "owner_name" && (
          <OnlineOwnerNameForm
            formData={formData}
            onChange={handleInputChange}
            onSearch={handleSearch}
            onClear={handleClear}
          />
        )}

        {activeTab === "old_property_no" && (
          <OnlineOldPropertyNoForm
            formData={formData}
            onChange={handleInputChange}
            onSearch={handleSearch}
            onClear={handleClear}
          />
        )}
      </div>

      {/* Search Results Section (Rendered only for quick_pay) */}
      {showResultsTable && activeTab === "quick_pay" && (
        <SearchResultsTable
          onSelectProperty={handleSelectPropertyRecord}
          filterQuery={formData.quickPayInput}
        />
      )}

      {/* Recent Searches & Need Assistance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mt-8">
        {/* Recent Searches */}
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-border-default">
          <h3 className="text-headline-md font-headline-md text-on-surface mb-4 flex items-center gap-2 font-bold">
            <span className="material-symbols-outlined text-outline">history</span>
            Recent Searches
          </h3>
          <div className="text-center py-6 text-on-surface-variant font-body-sm">
            <span className="material-symbols-outlined text-[32px] mb-2 opacity-50 block">
              manage_search
            </span>
            <p>No recent searches in this session.</p>
          </div>
        </div>

        {/* Need Assistance? */}
        <div className="bg-primary-fixed/30 rounded-xl p-6 shadow-sm border border-primary-fixed flex flex-col justify-center items-center text-center">
          <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center mb-3">
            <span className="material-symbols-outlined">support_agent</span>
          </div>
          <h3 className="text-body-lg font-bold text-on-primary-fixed mb-1">
            Need Assistance?
          </h3>
          <p className="text-body-sm text-on-primary-fixed-variant mb-4 max-w-sm">
            Contact the zonal office for help with property identification.
          </p>
          <a
            className="text-primary font-button-text hover:underline flex items-center gap-1 font-semibold cursor-pointer"
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              alert("Contact Directory: Helpdesk: 02114-235000 / tax@vadgaonmc.org");
            }}
          >
            View Contact Directory{" "}
            <span className="material-symbols-outlined text-[16px]">
              arrow_forward
            </span>
          </a>
        </div>
      </div>

      {/* QR Scanner Modal */}
      <ScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
      />

      {/* OTP Verification Modal */}
      <OtpModal
        isOpen={isOtpOpen}
        onClose={() => setIsOtpOpen(false)}
        phoneNumber={formData.quickPayInput}
        onVerifySuccess={handleOtpSuccess}
      />
    </div>
  );
}
