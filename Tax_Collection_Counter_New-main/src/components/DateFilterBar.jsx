import React, { useState, useRef, useEffect } from "react";

export default function DateFilterBar({
  selectedPeriod,
  onSelectPeriod,
  onApplyCustomRange,
}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [startDate, setStartDate] = useState("2024-10-01");
  const [endDate, setEndDate] = useState("2024-10-25");
  const popoverWrapperRef = useRef(null);

  // Close popover on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        popoverWrapperRef.current &&
        !popoverWrapperRef.current.contains(event.target)
      ) {
        setIsPopoverOpen(false);
      }
    }
    if (isPopoverOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopoverOpen]);

  const handlePreset = (presetType) => {
    const end = new Date();
    let start = new Date();
    if (presetType === "15") {
      start.setDate(end.getDate() - 15);
    } else if (presetType === "30") {
      start.setDate(end.getDate() - 30);
    } else if (presetType === "quarter") {
      start.setMonth(end.getMonth() - 3);
    }
    setStartDate(start.toISOString().split("T")[0]);
    setEndDate(end.toISOString().split("T")[0]);
  };

  const handleApply = () => {
    onApplyCustomRange(startDate, endDate);
    setIsPopoverOpen(false);
  };

  const filterOptions = [
    { key: "today", label: "Today" },
    { key: "week", label: "Week" },
    { key: "month", label: "Month" },
    { key: "custom", label: "Custom", hasIcon: true },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto relative">
      {/* Period Selector with Custom Date Picker Popover */}
      <div className="relative" ref={popoverWrapperRef}>
        <div className="flex items-center bg-surface-container-lowest rounded-lg border border-outline-variant p-1 shadow-sm">
          {filterOptions.map((opt) => {
            const isActive = selectedPeriod === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => {
                  if (opt.key === "custom") {
                    setIsPopoverOpen((prev) => !prev);
                  } else {
                    setIsPopoverOpen(false);
                    onSelectPeriod(opt.key);
                  }
                }}
                className={`px-4 py-2 font-label-md text-label-md rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                  isActive
                    ? "bg-primary text-on-primary font-semibold shadow-xs"
                    : "text-on-surface-variant hover:bg-surface-container-low"
                }`}
              >
                <span>{opt.label}</span>
                {opt.hasIcon && (
                  <span className="material-symbols-outlined text-[16px]">
                    calendar_month
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Custom Date Picker Popover */}
        {isPopoverOpen && (
          <div className="absolute right-0 mt-2 z-50 w-80 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.12)] p-4 text-on-surface animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/60">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-lg">
                  calendar_today
                </span>
                <span className="font-headline-md text-[15px] font-bold text-on-surface">
                  Select Date Range
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsPopoverOpen(false)}
                className="text-on-surface-variant hover:bg-surface-container p-1 rounded-md transition-colors flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            {/* Quick Range Presets */}
            <div className="py-2.5">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-outline block mb-1.5 font-label-sm">
                Quick Select
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => handlePreset("15")}
                  className="text-[12px] font-label-sm py-1 px-2 rounded border border-outline-variant/70 hover:bg-surface-container-low text-on-surface-variant hover:text-primary transition-all text-center cursor-pointer"
                >
                  Last 15 Days
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset("30")}
                  className="text-[12px] font-label-sm py-1 px-2 rounded border border-outline-variant/70 hover:bg-surface-container-low text-on-surface-variant hover:text-primary transition-all text-center cursor-pointer"
                >
                  Last 30 Days
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset("quarter")}
                  className="text-[12px] font-label-sm py-1 px-2 rounded border border-outline-variant/70 hover:bg-surface-container-low text-on-surface-variant hover:text-primary transition-all text-center cursor-pointer"
                >
                  This Quarter
                </button>
              </div>
            </div>

            {/* Date Inputs */}
            <div className="space-y-2.5 pt-1 pb-3">
              <div>
                <label
                  htmlFor="customStartDate"
                  className="block text-[12px] font-label-sm text-on-surface-variant mb-1 font-medium"
                >
                  Start Date
                </label>
                <input
                  id="customStartDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full text-[13px] font-body-sm px-3 py-1.5 bg-surface-container-low border border-outline-variant rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-on-surface"
                />
              </div>
              <div>
                <label
                  htmlFor="customEndDate"
                  className="block text-[12px] font-label-sm text-on-surface-variant mb-1 font-medium"
                >
                  End Date
                </label>
                <input
                  id="customEndDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full text-[13px] font-body-sm px-3 py-1.5 bg-surface-container-low border border-outline-variant rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-on-surface"
                />
              </div>
            </div>

            {/* Popover Actions */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-outline-variant/60">
              <button
                type="button"
                onClick={() => setIsPopoverOpen(false)}
                className="px-3 py-1.5 text-[13px] font-label-md font-medium text-on-surface-variant hover:bg-surface-container rounded-md transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApply}
                className="px-4 py-1.5 text-[13px] font-label-md font-semibold bg-primary text-on-primary hover:opacity-90 rounded-md transition-opacity shadow-sm flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">
                  check
                </span>
                <span>Apply</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Export Report Button */}
      <button
        type="button"
        onClick={() => {
          alert("Exporting report for period: " + selectedPeriod);
        }}
        className="flex items-center gap-2 bg-primary text-on-primary font-button-text text-button-text px-5 py-2.5 rounded-lg shadow-[0_4px_14px_rgba(0,38,101,0.2)] hover:opacity-90 transition-opacity cursor-pointer"
      >
        <span className="material-symbols-outlined text-xl">download</span>
        <span>Export Report</span>
      </button>
    </div>
  );
}
