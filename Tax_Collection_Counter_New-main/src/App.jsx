import React, { useState } from "react";
import TopNav from "./components/TopNav";
import Sidebar from "./components/Sidebar";
import KpiCards from "./components/KpiCards";
import CollectionTrendChart from "./components/CollectionTrendChart";
import PaymentModeCard from "./components/PaymentModeCard";
import DateFilterBar from "./components/DateFilterBar";
import OfflinePaymentView from "./components/OfflinePayment/OfflinePaymentView";
import OnlinePaymentView from "./components/OnlinePayment/OnlinePaymentView";
import { chartDatasets as initialDatasets } from "./data/chartData";

import { useLanguage } from "./context/LanguageContext";

export default function App() {
  const { t } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState("today");
  const [datasets, setDatasets] = useState(initialDatasets);
  const [activeMenu, setActiveMenu] = useState("property_tax");
  const [isPropertyTaxOpen, setIsPropertyTaxOpen] = useState(true);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState("offline_payment");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle Property Tax accordion in sidebar
  const handleTogglePropertyTax = () => {
    setIsPropertyTaxOpen((prev) => !prev);
    setActiveMenu("property_tax");
  };

  // Toggle Dashboard accordion in sidebar
  const handleToggleDashboard = () => {
    setIsDashboardOpen((prev) => !prev);
    setActiveMenu("dashboard");
    if (!activeSubmenu || activeSubmenu === "offline_payment" || activeSubmenu === "online_payment") {
      setActiveSubmenu("propertytax_dashboard");
    }
  };

  // Select submenu item (Offline/Online Payment or any Dashboard submenu)
  const handleSelectSubmenu = (submenuKey) => {
    setActiveSubmenu(submenuKey);
    if (submenuKey === "offline_payment" || submenuKey === "online_payment") {
      setActiveMenu("property_tax");
    } else {
      setActiveMenu("dashboard");
    }
  };

  // Main navigation selection
  const handleSelectMenu = (menuKey) => {
    setActiveMenu(menuKey);
    if (menuKey === "dashboard") {
      setIsDashboardOpen(true);
      if (activeSubmenu === "offline_payment" || activeSubmenu === "online_payment") {
        setActiveSubmenu("propertytax_dashboard");
      }
    } else if (menuKey !== "property_tax") {
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

  const getDashboardDetails = () => {
    switch (activeSubmenu) {
      case "payment_mode_wise":
        return {
          title: t("payment_mode_wise", "Payment Mode wise"),
          desc: t("desc_payment_mode_wise", "Breakdown of property tax collection across payment instruments & modes."),
          badge: "Mode Wise",
        };
      case "use_type_wise":
        return {
          title: t("use_type_wise", "Use Type Wise"),
          desc: t("desc_use_type_wise", "Property tax revenue segmented by usage: Residential, Commercial, Industrial, and Mixed."),
          badge: "Use Type",
        };
      case "zone_wise_collection":
        return {
          title: t("zone_wise_collection", "Zone Wise Collection"),
          desc: t("desc_zone_wise_collection", "Geographic performance analysis across municipal zones and prabhags."),
          badge: "Zone Wise",
        };
      case "bill_distribution_dashboard":
        return {
          title: t("bill_distribution_dashboard", "Bill Distribution Dashboard"),
          desc: t("desc_bill_distribution_dashboard", "Tracking property tax demand notices, deliveries, and digital dispatch status."),
          badge: "Bill Distribution",
        };
      case "analytics_dashboard":
        return {
          title: t("analytics_dashboard", "Analytics Dashboard"),
          desc: t("desc_analytics_dashboard", "High-level municipal KPIs, target compliance, and collection efficiency trends."),
          badge: "Analytics",
        };
      case "collection_trend":
        return {
          title: t("collection_trend", "Collection Trend"),
          desc: t("desc_collection_trend", "Time-series revenue trends, hourly collection cadence, and forecasting."),
          badge: "Trend Analysis",
        };
      case "propertytax_dashboard":
      default:
        return {
          title: t("propertytax_dashboard", "PropertyTax Dashboard"),
          desc: t("desc_propertytax_dashboard", "Monitor revenue performance and tax collection metrics."),
          badge: "Overview",
        };
    }
  };

  const dashboardInfo = getDashboardDetails();

  return (
    <div className="bg-surface-background text-on-surface font-body-md h-screen overflow-hidden flex flex-col antialiased">
      {/* Top Navigation */}
      <TopNav
        onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
        isMobileMenuOpen={isMobileMenuOpen}
        onSelectSubmenu={handleSelectSubmenu}
        onSelectMenu={handleSelectMenu}
        activeSubmenu={activeSubmenu}
      />

      <div className="flex flex-1 pt-16 h-full w-full">
        {/* Left Sidebar */}
        <Sidebar
          activeMenu={activeMenu}
          onSelectMenu={handleSelectMenu}
          isPropertyTaxOpen={isPropertyTaxOpen}
          onTogglePropertyTax={handleTogglePropertyTax}
          isDashboardOpen={isDashboardOpen}
          onToggleDashboard={handleToggleDashboard}
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
                setActiveSubmenu("propertytax_dashboard");
                setActiveMenu("dashboard");
              }}
            />
          ) : activeSubmenu === "online_payment" ? (
            /* Online Payment View with 4 search criteria tabs */
            <OnlinePaymentView
              onNavigateBack={() => {
                setActiveSubmenu("propertytax_dashboard");
                setActiveMenu("dashboard");
              }}
            />
          ) : (
            /* Dashboard View */
            <div className="p-margin-mobile md:p-margin-desktop space-y-stack-lg">
              {/* Page Header & Filters */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-stack-lg gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-primary text-2xl">
                      dashboard
                    </span>
                    <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
                      {dashboardInfo.title}
                    </h1>
                    <span className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                      {dashboardInfo.badge}
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                    {dashboardInfo.desc}
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

              {/* Specific Submenu Views */}
              {activeSubmenu === "zone_wise_collection" && (
                <div className="bg-surface-container-lowest rounded-xl p-6 border border-surface-container shadow-sm mb-stack-lg animate-in fade-in duration-200">
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">location_city</span>
                    Zone &amp; Prabhag Wise Collection
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      { name: "Zone 1 - Wadgaon Central", amount: "₹ 18,40,000", pct: "43.3%", count: "542 Tx", color: "bg-primary" },
                      { name: "Zone 2 - Talegaon Road", amount: "₹ 12,20,000", pct: "28.7%", count: "365 Tx", color: "bg-secondary" },
                      { name: "Zone 3 - Station Ward", amount: "₹ 7,50,000", pct: "17.6%", count: "218 Tx", color: "bg-cyan-600" },
                      { name: "Zone 4 - Industrial Belt", amount: "₹ 4,40,000", pct: "10.4%", count: "120 Tx", color: "bg-amber-600" },
                    ].map((z) => (
                      <div key={z.name} className="p-4 rounded-lg bg-surface-container/40 border border-outline-variant/50">
                        <p className="text-xs font-semibold text-on-surface-variant mb-1">{z.name}</p>
                        <p className="text-lg font-bold text-on-surface">{z.amount}</p>
                        <div className="flex justify-between items-center text-xs text-outline mt-2 mb-1.5">
                          <span>{z.count}</span>
                          <span className="font-bold text-on-surface">{z.pct}</span>
                        </div>
                        <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                          <div className={`h-1.5 rounded-full ${z.color}`} style={{ width: z.pct }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSubmenu === "use_type_wise" && (
                <div className="bg-surface-container-lowest rounded-xl p-6 border border-surface-container shadow-sm mb-stack-lg animate-in fade-in duration-200">
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">category</span>
                    Use Type Wise Property Revenue
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      { type: "Residential", amount: "₹ 24,50,000", pct: "57.6%", propCount: "8,420 Props", color: "bg-primary" },
                      { type: "Commercial", amount: "₹ 13,80,000", pct: "32.5%", propCount: "2,150 Props", color: "bg-secondary" },
                      { type: "Industrial", amount: "₹ 3,20,000", pct: "7.5%", propCount: "420 Props", color: "bg-warning-amber" },
                      { type: "Open Land / Other", amount: "₹ 1,00,000", pct: "2.4%", propCount: "255 Props", color: "bg-surface-variant" },
                    ].map((u) => (
                      <div key={u.type} className="p-4 rounded-lg bg-surface-container/40 border border-outline-variant/50">
                        <p className="text-xs font-semibold text-on-surface-variant mb-1">{u.type}</p>
                        <p className="text-lg font-bold text-on-surface">{u.amount}</p>
                        <div className="flex justify-between items-center text-xs text-outline mt-2 mb-1.5">
                          <span>{u.propCount}</span>
                          <span className="font-bold text-on-surface">{u.pct}</span>
                        </div>
                        <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                          <div className={`h-1.5 rounded-full ${u.color}`} style={{ width: u.pct }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSubmenu === "bill_distribution_dashboard" && (
                <div className="bg-surface-container-lowest rounded-xl p-6 border border-surface-container shadow-sm mb-stack-lg animate-in fade-in duration-200">
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">receipt_long</span>
                    Bill Distribution &amp; Notice Status
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      { status: "Total Bills Generated", val: "45,200", sub: "100% Demand generated", color: "text-primary" },
                      { status: "Hand Delivered (Physical)", val: "28,400", sub: "62.8% Field dispatched", color: "text-secondary" },
                      { status: "SMS / WhatsApp Delivered", val: "13,700", sub: "30.3% Digital receipts", color: "text-success-leaf" },
                      { status: "Pending / In-Transit", val: "3,100", sub: "6.9% Under distribution", color: "text-warning-amber" },
                    ].map((b) => (
                      <div key={b.status} className="p-4 rounded-lg bg-surface-container/40 border border-outline-variant/50">
                        <p className="text-xs font-semibold text-on-surface-variant mb-1">{b.status}</p>
                        <p className={`text-2xl font-bold ${b.color}`}>{b.val}</p>
                        <p className="text-xs text-outline mt-1">{b.sub}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
