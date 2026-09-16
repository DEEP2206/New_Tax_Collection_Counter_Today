import React, { useState } from "react";
import TopNav from "./components/TopNav";
import Sidebar from "./components/Sidebar";
import KpiCards from "./components/KpiCards";
import CollectionTrendChart from "./components/CollectionTrendChart";
import PaymentModeCard from "./components/PaymentModeCard";
import DateFilterBar from "./components/DateFilterBar";
import OfflinePaymentView from "./components/OfflinePayment/OfflinePaymentView";
import { chartDatasets as initialDatasets } from "./data/chartData";

export default function App() {
  const [selectedPeriod, setSelectedPeriod] = useState("today");
  const [datasets, setDatasets] = useState(initialDatasets);
  const [activeMenu, setActiveMenu] = useState("property_tax");
  const [isPropertyTaxOpen, setIsPropertyTaxOpen] = useState(true);
  const [activeSubmenu, setActiveSubmenu] = useState("offline_payment");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle Property Tax accordion in sidebar
  const handleTogglePropertyTax = () => {
    setIsPropertyTaxOpen((prev) => !prev);
    setActiveMenu("property_tax");
  };

  // Select submenu item (Offline Payment or Online Payment)
  const handleSelectSubmenu = (submenuKey) => {
    setActiveSubmenu(submenuKey);
    setActiveMenu("property_tax");
  };

  // Main navigation selection
  const handleSelectMenu = (menuKey) => {
    setActiveMenu(menuKey);
    if (menuKey !== "property_tax") {
      setActiveSubmenu(null);
    }
  };

  // Apply custom date filter for Analytics view
  const handleApplyCustomRange = (sDate, eDate) => {
    function formatShortDate(dStr) {
      if (!dStr) return "";
      const d = new Date(dStr);
      return d.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
    }

    const startLabel = sDate ? formatShortDate(sDate) : "Oct 01";
    const endLabel = eDate ? formatShortDate(eDate) : "Oct 25";

    setDatasets((prev) => ({
      ...prev,
      custom: {
        ...prev.custom,
        periodLabel: `Total Collection (${startLabel} - ${endLabel})`,
      },
    }));

    setSelectedPeriod("custom");
  };

  const currentData = datasets[selectedPeriod] || datasets.today;

  return (
    <div className="bg-surface-background text-on-surface font-body-md h-screen overflow-hidden flex flex-col antialiased">
      {/* Top Navigation */}
      <TopNav
        onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      <div className="flex flex-1 pt-16 h-full w-full">
        {/* Left Sidebar */}
        <Sidebar
          activeMenu={activeMenu}
          onSelectMenu={handleSelectMenu}
          isPropertyTaxOpen={isPropertyTaxOpen}
          onTogglePropertyTax={handleTogglePropertyTax}
          activeSubmenu={activeSubmenu}
          onSelectSubmenu={handleSelectSubmenu}
          isMobileMenuOpen={isMobileMenuOpen}
          onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Content Area */}
        <main className="flex-1 md:ml-64 h-full overflow-y-auto bg-surface-background">
          {activeSubmenu === "offline_payment" ? (
            /* Offline Payment View with 5 search criteria tabs */
            <OfflinePaymentView
              onNavigateBack={() => {
                setActiveSubmenu(null);
                setActiveMenu("reports");
              }}
            />
          ) : activeSubmenu === "online_payment" ? (
            /* Online Payment Placeholder / Information View */
            <div className="p-margin-mobile md:p-margin-desktop max-w-container-max mx-auto space-y-stack-lg">
              <div className="flex items-center justify-between border-b border-border-default pb-4">
                <div className="flex items-center text-body-sm text-on-surface-variant gap-2">
                  <span className="material-symbols-outlined text-[18px]">home</span>
                  <span className="text-outline">/</span>
                  <span>PropertyTax</span>
                  <span className="text-outline">/</span>
                  <span className="font-semibold text-on-surface">Online Payment</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveSubmenu(null);
                    setActiveMenu("reports");
                  }}
                  className="px-3 py-1.5 text-xs font-semibold bg-surface-container rounded-lg border border-outline-variant hover:bg-surface-container-highest cursor-pointer"
                >
                  Back to Reports
                </button>
              </div>

              <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-border-default text-center py-16">
                <div className="w-16 h-16 rounded-full bg-secondary-container/20 text-secondary-container flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-3xl">
                    credit_card
                  </span>
                </div>
                <h2 className="text-headline-lg font-headline-lg font-bold text-on-surface mb-2">
                  Online Payment Gateway
                </h2>
                <p className="text-body-md text-on-surface-variant max-w-md mx-auto mb-6">
                  Online Citizen Payment Gateway for instant UPI, Credit/Debit cards, and Net Banking collections.
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveSubmenu("offline_payment")}
                    className="px-5 py-2.5 bg-primary text-on-primary rounded-lg font-button-text text-sm font-semibold shadow-sm cursor-pointer"
                  >
                    Go to Offline Payment
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Default Collection Analytics & Insights Dashboard */
            <div className="p-margin-mobile md:p-margin-desktop space-y-stack-lg">
              {/* Page Header & Filters */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-stack-lg gap-4">
                <div>
                  <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
                    Collection Analytics &amp; Insights
                  </h1>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                    Monitor revenue performance and tax collection metrics.
                  </p>
                </div>

                {/* Filter Bar & Export */}
                <DateFilterBar
                  selectedPeriod={selectedPeriod}
                  onSelectPeriod={(period) => setSelectedPeriod(period)}
                  onApplyCustomRange={handleApplyCustomRange}
                />
              </div>

              {/* Overview Stats Cards */}
              <KpiCards data={currentData} />

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter mb-stack-lg">
                <CollectionTrendChart data={currentData} />
                <PaymentModeCard />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
