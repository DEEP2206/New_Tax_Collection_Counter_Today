import React, { useState } from "react";
import {
  QuickPayForm,
  PropertyNoForm,
  OwnerNameForm,
  OldPropertyNoForm,
  EtcForm,
} from "./SearchCriteriaForms";
import SearchResultsTable from "./SearchResultsTable";
import ScannerModal from "./ScannerModal";
import OtpModal from "./OtpModal";
import PropertyVerifyView from "./PropertyVerifyView";

export default function OfflinePaymentView({ onNavigateBack }) {
  const [activeTab, setActiveTab] = useState("property_no"); // 'quick_pay' | 'property_no' | 'owner_name' | 'old_property_no' | 'etc'
  const [step, setStep] = useState(1); // 1 = Search, 2 = Verify, 3 = Payment, 4 = Receipt
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showResultsTable, setShowResultsTable] = useState(false);

  // Form State across criteria tabs
  const [formData, setFormData] = useState({
    quickPayInput: "9876543210",
    zone: "Zone 1 - Wadgaon Central",
    ward: "Ward 1A - Main Market / Gaothan",
    propertyNo: "A3-102()",
    ownerName: "",
    marathiName: "",
    englishName: "",
    oldWard: "Ward 1 - Gaothan",
    oldPropertyNo: "",
    node: "",
    sector: "",
    societyMarathi: "",
    societyEnglish: "",
    shopMarathi: "",
    shopEnglish: "",
    plotNo: "",
    flatNo: "",
  });

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleClear = () => {
    setFormData((prev) => ({
      ...prev,
      quickPayInput: "",
      propertyNo: "",
      ownerName: "",
      marathiName: "",
      englishName: "",
      oldPropertyNo: "",
      node: "",
      sector: "",
      societyMarathi: "",
      societyEnglish: "",
      shopMarathi: "",
      shopEnglish: "",
      plotNo: "",
      flatNo: "",
    }));
    if (activeTab === "quick_pay" || activeTab === "etc") {
      setShowResultsTable(true);
    } else {
      setShowResultsTable(false);
    }
  };

  const handleSearch = () => {
    if (activeTab === "quick_pay") {
      const input = (formData.quickPayInput || "").trim();
      // If mobile number (starts with 6-9 and is 10 digits or contains phone), open OTP modal
      if (input.length >= 10 && /^\d+$/.test(input)) {
        setIsOtpOpen(true);
        return;
      }
      setShowResultsTable(true);
      return;
    }

    if (activeTab === "etc") {
      setShowResultsTable(true);
      return;
    }

    // For property_no, owner_name, old_property_no: DO NOT show below search property section
    setShowResultsTable(false);
    setSelectedProperty({
      propertyNo: formData.propertyNo || formData.oldPropertyNo || "A3-102()",
      ownerName: formData.ownerName || formData.englishName || formData.marathiName || "John Doe",
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
    setStep(2); // Advance to Verify Step
  };

  const handleScanSuccess = (detectedProperty) => {
    setSelectedProperty(detectedProperty);
    setStep(2); // Advance to Verify Step
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
    setStep(2); // Advance to Verify Step
  };

  const criteriaNavItems = [
    { key: "quick_pay", label: "Quick Pay", icon: "bolt" },
    { key: "property_no", label: "Property No.", icon: "tag" },
    { key: "owner_name", label: "Owner / Occupier Name", icon: "person" },
    { key: "old_property_no", label: "Old Property No.", icon: "history" },
    { key: "etc", label: "Etc.", icon: "description" },
  ];

  // If in Step 2, render Verify View
  if (step === 2) {
    return (
      <PropertyVerifyView
        propertyData={selectedProperty}
        onProceedToPayment={() => {
          alert("Proceeding to payment gateway for " + (selectedProperty?.propertyNo || "A3-102()"));
        }}
        onCancel={() => {
          setStep(1);
        }}
      />
    );
  }

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

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-border-default flex justify-between items-center hover:-translate-y-1 transition-transform duration-300">
          <div>
            <p className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider mb-1 font-semibold">
              Today's Collection
            </p>
            <h3 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg font-bold text-on-surface flex items-center gap-1">
              <span className="text-[20px] text-outline">₹</span> 0
            </h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-warning-amber/10 text-warning-amber flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">query_stats</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-border-default flex justify-between items-center hover:-translate-y-1 transition-transform duration-300">
          <div>
            <p className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider mb-1 font-semibold">
              Total Collection
            </p>
            <h3 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg font-bold text-on-surface flex items-center gap-1">
              <span className="text-[20px] text-outline">₹</span> 66,61,138
            </h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-secondary-container/20 text-secondary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">payments</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-border-default flex justify-between items-center hover:-translate-y-1 transition-transform duration-300">
          <div>
            <p className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider mb-1 font-semibold">
              Receipts (Cancel / Total)
            </p>
            <h3 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg font-bold text-on-surface flex items-center gap-2">
              <span className="text-error">0</span>{" "}
              <span className="text-outline text-body-lg font-normal">/</span> 0
            </h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-success-leaf/10 text-success-leaf flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">receipt_long</span>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="py-4">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-surface-container-highest z-0"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[15%] h-1 bg-primary z-0 transition-all duration-500"></div>

          {/* Step 1: Search Active */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-body-sm shadow-md ring-4 ring-surface-background">
              1
            </div>
            <span className="text-label-sm font-label-sm text-primary font-bold">
              Search
            </span>
          </div>

          {/* Step 2: Verify */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-bold text-body-sm ring-4 ring-surface-background">
              2
            </div>
            <span className="text-label-sm font-label-sm text-on-surface-variant">
              Verify
            </span>
          </div>

          {/* Step 3: Payment */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-bold text-body-sm ring-4 ring-surface-background">
              3
            </div>
            <span className="text-label-sm font-label-sm text-on-surface-variant">
              Payment
            </span>
          </div>

          {/* Step 4: Receipt */}
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

      {/* Primary Search Card with Criteria Navigation */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-border-default overflow-hidden flex flex-col md:flex-row">
        {/* Left: SEARCH CRITERIA Sidebar */}
        <div className="w-full md:w-64 bg-primary text-on-primary flex flex-col flex-shrink-0 p-4 border-b md:border-b-0 md:border-r border-primary/20">
          <div className="px-3 py-2 mb-2">
            <p className="text-xs font-bold tracking-wider text-primary-fixed uppercase">
              Search Criteria
            </p>
          </div>
          <nav className="flex flex-col gap-1.5">
            {criteriaNavItems.map((item) => {
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.key);
                    if (item.key === "quick_pay" || item.key === "etc") {
                      setShowResultsTable(true);
                    } else {
                      setShowResultsTable(false);
                    }
                  }}
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

        {/* Right: Dynamic Content Based on Selected Tab */}
        {activeTab === "quick_pay" && (
          <QuickPayForm
            formData={formData}
            onChange={handleFieldChange}
            onOpenScanner={() => setIsScannerOpen(true)}
            onSearch={handleSearch}
            onClear={handleClear}
          />
        )}

        {activeTab === "property_no" && (
          <PropertyNoForm
            formData={formData}
            onChange={handleFieldChange}
            onSearch={handleSearch}
            onClear={handleClear}
          />
        )}

        {activeTab === "owner_name" && (
          <OwnerNameForm
            formData={formData}
            onChange={handleFieldChange}
            onSearch={handleSearch}
            onClear={handleClear}
          />
        )}

        {activeTab === "old_property_no" && (
          <OldPropertyNoForm
            formData={formData}
            onChange={handleFieldChange}
            onSearch={handleSearch}
            onClear={handleClear}
          />
        )}

        {activeTab === "etc" && (
          <EtcForm
            formData={formData}
            onChange={handleFieldChange}
            onSearch={handleSearch}
            onClear={handleClear}
          />
        )}
      </div>

      {/* Search Results Table (Shown only for Quick Pay and Etc. options) */}
      {(activeTab === "quick_pay" || activeTab === "etc") && showResultsTable && (
        <SearchResultsTable onSelectProperty={handleSelectPropertyRecord} />
      )}

      {/* Recent Searches / Help Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mt-8">
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

        <div className="bg-primary-fixed/30 rounded-xl p-6 shadow-sm border border-primary-fixed flex flex-col justify-center items-center text-center">
          <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-2xl">
              support_agent
            </span>
          </div>
          <h3 className="text-body-lg font-bold text-on-primary-fixed mb-1">
            Need Assistance?
          </h3>
          <p className="text-body-sm text-on-primary-fixed-variant mb-4">
            Contact the zonal office for help with property identification.
          </p>
          <a
            className="text-primary font-button-text text-sm hover:underline flex items-center gap-1 font-semibold"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert("Contact Directory: Wadgaon Maval Nagarpanchayat Toll Free: 1800-233-1234");
            }}
          >
            <span>View Contact Directory</span>
            <span className="material-symbols-outlined text-[16px]">
              arrow_forward
            </span>
          </a>
        </div>
      </div>

      {/* Scanner Modal */}
      <ScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
      />

      {/* OTP Verification Modal */}
      <OtpModal
        isOpen={isOtpOpen}
        phoneNumber={formData.quickPayInput || "9876543210"}
        onClose={() => setIsOtpOpen(false)}
        onVerifySuccess={handleOtpSuccess}
      />
    </div>
  );
}
