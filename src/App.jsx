import React, { useState } from "react";
import TopNav from "./components/TopNav";
import Sidebar from "./components/Sidebar";
import KpiCards from "./components/KpiCards";
import CollectionTrendChart from "./components/CollectionTrendChart";
import PaymentModeCard from "./components/PaymentModeCard";
import DateFilterBar from "./components/DateFilterBar";
import OfflinePaymentView from "./components/OfflinePayment/OfflinePaymentView";
import OnlinePaymentView from "./components/OnlinePayment/OnlinePaymentView";
import UseTypeWiseView from "./components/UseTypeWiseView";
import { chartDatasets as initialDatasets } from "./data/chartData";
import { getBillDistributionSummary } from "./data/billDistributionData";

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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const billSummary = getBillDistributionSummary();

  // Toggle Desktop Sidebar collapse/expand or Mobile drawer
  const handleToggleSidebar = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setIsMobileMenuOpen((prev) => !prev);
    } else {
      setIsSidebarCollapsed((prev) => !prev);
    }
  };

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
        onToggleSidebar={handleToggleSidebar}
        isSidebarCollapsed={isSidebarCollapsed}
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
          isSidebarCollapsed={isSidebarCollapsed}
        />

        {/* Main Content Area */}
        <main
          className={`flex-1 h-full overflow-y-auto bg-surface-background transition-all duration-300 ease-in-out ${
            isSidebarCollapsed ? "md:ml-0" : "md:ml-64"
          }`}
        >
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
          ) : activeSubmenu === "use_type_wise" ? (
            /* Redesigned Use Type Wise Collection View */
            <UseTypeWiseView />
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

              {activeSubmenu === "bill_distribution_dashboard" && (
                <div className="bg-surface-container-lowest rounded-xl p-6 border border-surface-container shadow-sm mb-stack-lg animate-in fade-in duration-200">
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">receipt_long</span>
                    Bill Distribution &amp; Notice Status
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      {
                        key: "total_properties",
                        status: t("totalProperties", "Total Properties"),
                        val: (billSummary.totalProperties || 0).toLocaleString("en-IN"),
                        sub: "Total registered in Ward",
                        color: "text-primary",
                        icon: "home_work",
                        gradient: "from-blue-600 via-indigo-500 to-sky-500",
                      },
                      {
                        key: "total_bill_distribution",
                        status: t("totalBillDistribution", "Total Bill Distribution"),
                        val: (billSummary.totalBillDistribution || 0).toLocaleString("en-IN"),
                        sub: "0% Distribution rate",
                        color: "text-secondary",
                        icon: "assignment_turned_in",
                        gradient: "from-purple-600 via-violet-500 to-indigo-400",
                      },
                      {
                        key: "bills_delivered",
                        status: t("billsDelivered", "Bills Delivered"),
                        val: (billSummary.billsDelivered || 0).toLocaleString("en-IN"),
                        sub: "Direct hand delivery",
                        color: "text-success-leaf",
                        icon: "mark_email_read",
                        gradient: "from-emerald-500 via-teal-500 to-green-400",
                      },
                      {
                        key: "bills_affixed",
                        status: t("billsAffixed", "Bills Affixed"),
                        val: (billSummary.billsAffixed || 0).toLocaleString("en-IN"),
                        sub: "Affixed on premises",
                        color: "text-primary",
                        icon: "push_pin",
                        gradient: "from-cyan-500 via-sky-500 to-blue-400",
                      },
                      {
                        key: "bill_refused",
                        status: t("billRefused", "Bill Refused"),
                        val: (billSummary.billRefused || 0).toLocaleString("en-IN"),
                        sub: "Refused by occupier",
                        color: "text-warning-amber",
                        icon: "cancel",
                        gradient: "from-amber-500 via-orange-500 to-rose-400",
                      },
                      {
                        key: "property_not_found",
                        status: t("propertyNotFound", "Property Not Found"),
                        val: (billSummary.propertyNotFound || 0).toLocaleString("en-IN"),
                        sub: "Untraceable premises",
                        color: "text-error",
                        icon: "location_off",
                        gradient: "from-red-600 via-rose-500 to-pink-500",
                      },
                      {
                        key: "seizure_notice",
                        status: t("seizureNotice", "Seizure Notice"),
                        val: (billSummary.seizureNotice || 0).toLocaleString("en-IN"),
                        sub: "Property attachment notice",
                        color: "text-rose-600",
                        icon: "gavel",
                        gradient: "from-rose-600 via-pink-600 to-fuchsia-500",
                      },
                      {
                        key: "legal_demand_notice",
                        status: t("legalDemandNotice", "Legal Demand Notice"),
                        val: (billSummary.legalDemandNotice || 0).toLocaleString("en-IN"),
                        sub: "Formal statutory demand",
                        color: "text-indigo-600",
                        icon: "policy",
                        gradient: "from-indigo-600 via-blue-600 to-cyan-500",
                      },
                      {
                        key: "mobile_number_updated",
                        status: t("mobileNumberUpdated", "Mobile Number Updated"),
                        val: (billSummary.mobileNumberUpdated || 0).toLocaleString("en-IN"),
                        sub: "Primary contact verified",
                        color: "text-secondary",
                        icon: "phonelink_ring",
                        gradient: "from-teal-500 via-emerald-400 to-cyan-400",
                      },
                      {
                        key: "email_id_updated",
                        status: t("emailIdUpdated", "Email ID Updated"),
                        val: (billSummary.emailIdUpdated || 0).toLocaleString("en-IN"),
                        sub: "Digital contact verified",
                        color: "text-success-leaf",
                        icon: "alternate_email",
                        gradient: "from-green-600 via-emerald-500 to-teal-400",
                      },
                      {
                        key: "alternate_mobile_number",
                        status: t("alternateMobileNumber", "Alternate Mobile Number"),
                        val: (billSummary.alternateMobileNumber || 0).toLocaleString("en-IN"),
                        sub: "Secondary contact captured",
                        color: "text-cyan-600",
                        icon: "contact_phone",
                        gradient: "from-yellow-400 via-amber-500 to-orange-400",
                      },
                      {
                        key: "alternate_address",
                        status: t("alternateAddress", "Alternate Address"),
                        val: (billSummary.alternateAddress || 0).toLocaleString("en-IN"),
                        sub: "Secondary address captured",
                        color: "text-primary",
                        icon: "home_pin",
                        gradient: "from-blue-700 via-indigo-600 to-slate-600",
                      },
                    ].map((b) => (
                      <div
                        key={b.key}
                        className="relative overflow-hidden p-4 pt-4.5 rounded-lg bg-surface-container/40 border border-outline-variant/50 hover:border-primary/30 transition-all shadow-xs"
                      >
                        {/* Distinct subtle rounded gradient top border */}
                        <div
                          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${b.gradient}`}
                        />
                        <span className="material-symbols-outlined text-xl text-outline mb-2 block">
                          {b.icon}
                        </span>
                        <p className="text-xs font-semibold text-on-surface-variant mb-1 line-clamp-1" title={b.status}>
                          {b.status}
                        </p>
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
