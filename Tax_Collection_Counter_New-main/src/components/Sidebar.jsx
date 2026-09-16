import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Sidebar({
  activeMenu = "reports",
  onSelectMenu,
  isPropertyTaxOpen,
  onTogglePropertyTax,
  isDashboardOpen,
  onToggleDashboard,
  activeSubmenu,
  onSelectSubmenu,
  isMobileMenuOpen,
  onCloseMobileMenu,
}) {
  const { t } = useLanguage();
  const [localDashboardOpen, setLocalDashboardOpen] = React.useState(
    isDashboardOpen ?? (activeMenu === "dashboard")
  );

  const effectiveDashboardOpen =
    isDashboardOpen !== undefined ? isDashboardOpen : localDashboardOpen;

  const handleDashboardClick = (e) => {
    e.preventDefault();
    if (onToggleDashboard) {
      onToggleDashboard();
    } else {
      setLocalDashboardOpen((prev) => !prev);
    }
  };

  const handlePropertyTaxClick = (e) => {
    e.preventDefault();
    onTogglePropertyTax();
  };

  const dashboardSubmenuItems = [
    { key: "propertytax_dashboard", label: t("propertytax_dashboard", "PropertyTax Dashboard"), icon: "dashboard" },
    { key: "payment_mode_wise", label: t("payment_mode_wise", "Payment Mode wise"), icon: "payments" },
    { key: "use_type_wise", label: t("use_type_wise", "Use Type Wise"), icon: "category" },
    { key: "zone_wise_collection", label: t("zone_wise_collection", "Zone Wise Collection"), icon: "location_city" },
    { key: "bill_distribution_dashboard", label: t("bill_distribution_dashboard", "Bill Distribution Dashboard"), icon: "receipt_long" },
    { key: "analytics_dashboard", label: t("analytics_dashboard", "Analytics Dashboard"), icon: "insights" },
    { key: "collection_trend", label: t("collection_trend", "Collection Trend"), icon: "trending_up" },
  ];

  const navContent = (
    <div className="flex flex-col h-full">
      <div className="mb-6 px-2">
        <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
          {t("govTechPortal", "GovTech Portal")}
        </p>
      </div>

      <nav className="flex-1 space-y-1.5 overflow-y-auto">
        {/* Dashboard with Expandable Submenu */}
        <div>
          <button
            type="button"
            onClick={handleDashboardClick}
            aria-expanded={effectiveDashboardOpen}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all font-label-md text-label-md text-left cursor-pointer ${
              activeMenu === "dashboard" || effectiveDashboardOpen
                ? "bg-surface-container-highest text-primary font-bold shadow-xs"
                : "text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-xl">dashboard</span>
              <span>{t("dashboard", "Dashboard")}</span>
            </div>
            <span
              className={`material-symbols-outlined text-lg transition-transform duration-200 ${
                effectiveDashboardOpen ? "rotate-180 text-primary" : "text-outline"
              }`}
            >
              expand_more
            </span>
          </button>

          {/* Dashboard Submenu Options */}
          {effectiveDashboardOpen && (
            <div className="mt-1 ml-4 pl-3 border-l-2 border-primary/20 space-y-1 transition-all duration-200">
              {dashboardSubmenuItems.map((item) => {
                const isActive =
                  activeMenu === "dashboard" &&
                  (activeSubmenu === item.key ||
                    (!activeSubmenu && item.key === "propertytax_dashboard"));
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => {
                      onSelectSubmenu(item.key);
                      onSelectMenu("dashboard");
                      if (onCloseMobileMenu) onCloseMobileMenu();
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] font-label-md transition-all text-left cursor-pointer ${
                      isActive
                        ? "bg-primary text-on-primary font-semibold shadow-xs"
                        : "text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[17px]">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Property Tax with Expandable Submenu */}
        <div>
          <button
            type="button"
            onClick={handlePropertyTaxClick}
            aria-expanded={isPropertyTaxOpen}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all font-label-md text-label-md text-left cursor-pointer ${
              activeMenu === "property_tax" || isPropertyTaxOpen
                ? "bg-surface-container-highest text-primary font-bold shadow-xs"
                : "text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-xl">home_work</span>
              <span>{t("propertyTax", "Property Tax")}</span>
            </div>
            <span
              className={`material-symbols-outlined text-lg transition-transform duration-200 ${
                isPropertyTaxOpen ? "rotate-180 text-primary" : "text-outline"
              }`}
            >
              expand_more
            </span>
          </button>

          {/* Submenu Options: Offline Payment & Online Payment */}
          {isPropertyTaxOpen && (
            <div className="mt-1 ml-4 pl-3 border-l-2 border-primary/20 space-y-1 transition-all duration-200">
              <button
                type="button"
                onClick={() => {
                  onSelectSubmenu("offline_payment");
                  if (onCloseMobileMenu) onCloseMobileMenu();
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] font-label-md transition-all text-left cursor-pointer ${
                  activeSubmenu === "offline_payment"
                    ? "bg-primary text-on-primary font-semibold shadow-xs"
                    : "text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  point_of_sale
                </span>
                <span>{t("offlinePayment", "Offline Payment")}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onSelectSubmenu("online_payment");
                  if (onCloseMobileMenu) onCloseMobileMenu();
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] font-label-md transition-all text-left cursor-pointer ${
                  activeSubmenu === "online_payment"
                    ? "bg-primary text-on-primary font-semibold shadow-xs"
                    : "text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  credit_card
                </span>
                <span>{t("onlinePayment", "Online Payment")}</span>
              </button>
            </div>
          )}
        </div>

        {/* Water Tax */}
        <button
          type="button"
          onClick={() => {
            onSelectMenu("water_tax");
            if (onCloseMobileMenu) onCloseMobileMenu();
          }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-label-md text-label-md text-left cursor-pointer ${
            activeMenu === "water_tax"
              ? "bg-secondary-container text-on-secondary-container font-bold translate-x-1 duration-150 shadow-sm"
              : "text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface"
          }`}
        >
          <span className="material-symbols-outlined text-xl">water_drop</span>
          <span>{t("waterTax", "Water Tax")}</span>
        </button>

        {/* Reports */}
        <button
          type="button"
          onClick={() => {
            onSelectMenu("reports");
            if (onCloseMobileMenu) onCloseMobileMenu();
          }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-label-md text-label-md text-left cursor-pointer ${
            activeMenu === "reports" && !activeSubmenu
              ? "bg-secondary-container text-on-secondary-container font-bold translate-x-1 duration-150 shadow-sm"
              : "text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface"
          }`}
        >
          <span className="material-symbols-outlined text-xl">assessment</span>
          <span>{t("reports", "Reports")}</span>
        </button>
      </nav>

      {/* Bottom Section: Settings & Logout */}
      <div className="mt-auto space-y-1 pt-4 border-t border-outline-variant">
        <button
          type="button"
          onClick={() => {
            onSelectMenu("settings");
            if (onCloseMobileMenu) onCloseMobileMenu();
          }}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface transition-all font-label-md text-label-md text-left cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">settings</span>
          <span>{t("settings", "Settings")}</span>
        </button>
        <button
          type="button"
          onClick={() => {
            if (window.confirm("Are you sure you want to log out?")) {
              alert("Logged out successfully");
            }
          }}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-error hover:bg-error-container hover:text-on-error-container transition-all font-label-md text-label-md text-left cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">logout</span>
          <span>{t("logout", "Logout")}</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 flex flex-col p-4 z-40 bg-surface-container-low hidden md:flex border-r border-outline-variant">
        {navContent}
      </aside>

      {/* Mobile Drawer Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobileMenu}
          ></div>
          {/* Drawer content */}
          <aside className="relative w-64 max-w-[80vw] h-full bg-surface-container-low p-4 flex flex-col border-r border-outline-variant shadow-2xl z-10 pt-6">
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
}
