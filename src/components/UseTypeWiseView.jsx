import React, { useState, useRef, useEffect } from "react";

export default function UseTypeWiseView() {
  // Exact initial data from the Reference UI
  const initialData = [
    {
      sr: 1,
      useType: "R",
      yearlyReceiptCount: 0,
      yearlyCollectionAmount: 0,
      todayReceiptCount: 0,
      todayCollectionAmount: 0,
    },
    {
      sr: 2,
      useType: "R-C",
      yearlyReceiptCount: 0,
      yearlyCollectionAmount: 0,
      todayReceiptCount: 0,
      todayCollectionAmount: 0,
    },
    {
      sr: 3,
      useType: "अशिवासी",
      yearlyReceiptCount: 0,
      yearlyCollectionAmount: 0,
      todayReceiptCount: 0,
      todayCollectionAmount: 0,
    },
    {
      sr: 4,
      useType: "औद्योगिक",
      yearlyReceiptCount: 1,
      yearlyCollectionAmount: 29358,
      todayReceiptCount: 0,
      todayCollectionAmount: 0,
    },
    {
      sr: 5,
      useType: "औद्योगिक व अशिवासी",
      yearlyReceiptCount: 0,
      yearlyCollectionAmount: 0,
      todayReceiptCount: 0,
      todayCollectionAmount: 0,
    },
    {
      sr: 6,
      useType: "औद्योगिक व मिश्र",
      yearlyReceiptCount: 0,
      yearlyCollectionAmount: 0,
      todayReceiptCount: 0,
      todayCollectionAmount: 0,
    },
    {
      sr: 7,
      useType: "धार्मिक",
      yearlyReceiptCount: 0,
      yearlyCollectionAmount: 0,
      todayReceiptCount: 0,
      todayCollectionAmount: 0,
    },
    {
      sr: 8,
      useType: "गायरनीध्द्य मानमत्ता",
      yearlyReceiptCount: 0,
      yearlyCollectionAmount: 0,
      todayReceiptCount: 0,
      todayCollectionAmount: 0,
    },
    {
      sr: 9,
      useType: "निवासी",
      yearlyReceiptCount: 207,
      yearlyCollectionAmount: 1355724,
      todayReceiptCount: 0,
      todayCollectionAmount: 0,
    },
    {
      sr: 10,
      useType: "प्लॉट",
      yearlyReceiptCount: 35,
      yearlyCollectionAmount: 283562,
      todayReceiptCount: 0,
      todayCollectionAmount: 0,
    },
    {
      sr: 11,
      useType: "मिश्र",
      yearlyReceiptCount: 26,
      yearlyCollectionAmount: 123909,
      todayReceiptCount: 0,
      todayCollectionAmount: 0,
    },
  ];

  const [tableData, setTableData] = useState(initialData);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Carousel ref and hover-pause state for 11 Use Types
  const carouselRef = useRef(null);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  // Auto-sliding carousel effect: moves smoothly from RIGHT to LEFT every 3.2s
  useEffect(() => {
    if (isCarouselHovered) return;

    const interval = setInterval(() => {
      if (!carouselRef.current) return;
      const container = carouselRef.current;
      const step = 150;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: step, behavior: "smooth" });
      }
    }, 3200);

    return () => clearInterval(interval);
  }, [isCarouselHovered]);

  const handlePrevSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -150, behavior: "smooth" });
    }
  };

  const handleNextSlide = () => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: 150, behavior: "smooth" });
      }
    }
  };

  // Indian currency / number formatter
  const formatIndianNumber = (val) => {
    if (val === 0 || val === "0") return "0";
    return Number(val).toLocaleString("en-IN");
  };

  // Sort handler for table columns
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...tableData].sort((a, b) => {
      let aVal = a[key];
      let bVal = b[key];

      if (typeof aVal === "string") {
        return direction === "asc"
          ? aVal.localeCompare(bVal, "mr")
          : bVal.localeCompare(aVal, "mr");
      }
      return direction === "asc" ? aVal - bVal : bVal - aVal;
    });
    setTableData(sorted);
  };

  // Download Excel functionality (CSV format with UTF-8 BOM so Marathi characters display correctly)
  const handleDownloadExcel = () => {
    const headers = [
      "Sr. No.",
      "Use Type",
      "Yearly Receipt Count",
      "Yearly Collection Amount (₹)",
      "Today's Receipt Count",
      "Today's Collection Amount (₹)",
    ];

    const rows = tableData.map((row) => [
      row.sr,
      `"${row.useType}"`,
      row.yearlyReceiptCount,
      row.yearlyCollectionAmount,
      row.todayReceiptCount,
      row.todayCollectionAmount,
    ]);

    const totalRow = ["Total", "", 302, 2045594, 0, 0];

    const csvContent =
      "\uFEFF" +
      [
        headers.join(","),
        ...rows.map((r) => r.join(",")),
        totalRow.join(","),
      ].join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Use_Type_Wise_Collection_17-09-2026.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-margin-mobile md:p-margin-desktop space-y-stack-lg animate-in fade-in duration-200">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mb-1">
        <span className="material-symbols-outlined text-sm text-outline">
          home
        </span>
        <span className="hover:text-primary transition-colors cursor-pointer">
          Property Tax
        </span>
        <span className="text-outline">›</span>
        <span className="text-primary font-semibold">Use Type Wise</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-stack-lg">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary shadow-xs">
            <span className="material-symbols-outlined text-2xl font-bold">
              bar_chart
            </span>
          </div>
          <div>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-2xl lg:text-[28px] font-bold text-on-surface tracking-tight">
              Use Type Wise Collection
            </h1>
            <p className="font-body-md text-body-sm md:text-sm text-on-surface-variant mt-0.5">
              View and analyze property tax collection details by property use type
            </p>
          </div>
        </div>

        {/* Date/Time Badge in Current UI style */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/60 shadow-xs">
          <span className="material-symbols-outlined text-primary text-base">
            calendar_today
          </span>
          <span className="font-label-md text-xs sm:text-sm font-semibold text-primary">
            Today Date : 17-09-2026 10:34:33
          </span>
        </div>
      </div>

      {/* 4 Summary Cards in One Responsive Row - Compact with subtle gradient top border */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 md:gap-4">
        {/* Card 1: Total Use Types - Red Gradient Accent */}
        <div className="relative overflow-hidden bg-surface-container-lowest rounded-xl p-3.5 sm:p-4 pt-4 border border-surface-container shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 transition-transform flex items-center gap-3.5">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500" />
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-xl">
              description
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-label-md text-xs font-semibold text-on-surface-variant truncate">
              Total Use Types
            </p>
            <h3 className="font-headline-lg text-xl md:text-2xl font-bold text-on-surface mt-0.5 tracking-tight">
              11
            </h3>
            <p className="font-body-sm text-[11px] text-outline mt-0.5 truncate">
              Property use categories
            </p>
          </div>
        </div>

        {/* Card 2: Current Year Receipts - Green Gradient Accent */}
        <div className="relative overflow-hidden bg-surface-container-lowest rounded-xl p-3.5 sm:p-4 pt-4 border border-surface-container shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 transition-transform flex items-center gap-3.5">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500" />
          <div className="w-10 h-10 rounded-lg bg-success-leaf/10 border border-success-leaf/20 flex items-center justify-center text-success-leaf shrink-0">
            <span className="material-symbols-outlined text-xl">
              receipt_long
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-label-md text-xs font-semibold text-on-surface-variant truncate">
              Current Year Receipts
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <h3 className="font-headline-lg text-xl md:text-2xl font-bold text-on-surface tracking-tight">
                302
              </h3>
              <span className="bg-success-leaf/10 text-success-leaf font-label-sm text-[10px] px-1.5 py-0.5 rounded-full flex items-center gap-0.5 font-bold">
                <span className="material-symbols-outlined text-[12px]">
                  arrow_drop_up
                </span>
                <span>0%</span>
              </span>
            </div>
            <p className="font-body-sm text-[11px] text-outline mt-0.5 truncate">
              Total receipts collected
            </p>
          </div>
        </div>

        {/* Card 3: Current Year Collection - Blue Gradient Accent */}
        <div className="relative overflow-hidden bg-surface-container-lowest rounded-xl p-3.5 sm:p-4 pt-4 border border-surface-container shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 transition-transform flex items-center gap-3.5">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-500" />
          <div className="w-10 h-10 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary shrink-0">
            <span className="material-symbols-outlined text-xl">
              payments
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-label-md text-xs font-semibold text-on-surface-variant truncate">
              Current Year Collection
            </p>
            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
              <h3 className="font-headline-lg text-lg md:text-xl font-bold text-on-surface tracking-tight">
                ₹ 20,45,594
              </h3>
              <span className="bg-success-leaf/10 text-success-leaf font-label-sm text-[10px] px-1.5 py-0.5 rounded-full flex items-center gap-0.5 font-bold">
                <span className="material-symbols-outlined text-[12px]">
                  arrow_drop_up
                </span>
                <span>0%</span>
              </span>
            </div>
            <p className="font-body-sm text-[11px] text-outline mt-0.5 truncate">
              Total collection amount
            </p>
          </div>
        </div>

        {/* Card 4: Today’s Receipts - Orange Gradient Accent */}
        <div className="relative overflow-hidden bg-surface-container-lowest rounded-xl p-3.5 sm:p-4 pt-4 border border-surface-container shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 transition-transform flex items-center gap-3.5">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-400" />
          <div className="w-10 h-10 rounded-lg bg-warning-amber/10 border border-warning-amber/20 flex items-center justify-center text-warning-amber shrink-0">
            <span className="material-symbols-outlined text-xl">
              today
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-label-md text-xs font-semibold text-on-surface-variant truncate">
              Today’s Receipts
            </p>
            <h3 className="font-headline-lg text-xl md:text-2xl font-bold text-on-surface mt-0.5 tracking-tight">
              0
            </h3>
            <p className="font-body-sm text-[11px] text-outline mt-0.5 truncate">
              Receipts collected today
            </p>
          </div>
        </div>
      </div>

      {/* Use Type Wise Property Revenue / Collection Section */}
      <div className="bg-surface-container-lowest rounded-xl p-3.5 sm:p-4 md:p-5 border border-surface-container shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl font-semibold">
              category
            </span>
            <h2 className="font-headline-md text-base md:text-lg font-bold text-on-surface">
              Use Type Wise Property Revenue
            </h2>
          </div>
          <span className="text-[11px] text-outline font-medium hidden sm:inline-block">
            Major Segments &amp; Use Type Categories
          </span>
        </div>

        {/* 1. Four Compact Main Category Cards (Approx. half previous visual footprint) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 mb-3.5">
          {[
            {
              type: "Residential",
              amount: "₹ 24,50,000",
              pct: "57.6%",
              propCount: "8,420 Props",
              color: "bg-primary",
            },
            {
              type: "Commercial",
              amount: "₹ 13,80,000",
              pct: "32.5%",
              propCount: "2,150 Props",
              color: "bg-secondary",
            },
            {
              type: "Industrial",
              amount: "₹ 3,20,000",
              pct: "7.5%",
              propCount: "420 Props",
              color: "bg-warning-amber",
            },
            {
              type: "Open Land / Other",
              amount: "₹ 1,00,000",
              pct: "2.4%",
              propCount: "255 Props",
              color: "bg-slate-400",
            },
          ].map((u) => (
            <div
              key={u.type}
              className="p-2 sm:p-2.5 rounded-lg bg-surface-container/30 border border-outline-variant/40 hover:border-primary/30 transition-all shadow-xs"
            >
              <p className="text-[11px] font-semibold text-on-surface-variant mb-0.5 truncate">
                {u.type}
              </p>
              <p className="text-sm sm:text-[15px] font-bold text-on-surface tracking-tight leading-snug">
                {u.amount}
              </p>
              <div className="flex justify-between items-center text-[10px] text-outline mt-1 mb-1">
                <span>{u.propCount}</span>
                <span className="font-bold text-on-surface">{u.pct}</span>
              </div>
              <div className="w-full bg-surface-container-highest rounded-full h-1 overflow-hidden">
                <div
                  className={`h-1 rounded-full ${u.color}`}
                  style={{ width: u.pct }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Integrated 11 Use Type Items Auto-Sliding Carousel with Hover-Pause */}
        <div
          className="pt-2.5 border-t border-outline-variant/30"
          onMouseEnter={() => setIsCarouselHovered(true)}
          onMouseLeave={() => setIsCarouselHovered(false)}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant">
              <span className="material-symbols-outlined text-sm text-secondary">
                sync_alt
              </span>
              <span>Use Type Breakdown ({initialData.length} Types)</span>
              <span className="text-[10px] text-outline font-normal hidden sm:inline">
                (Auto-sliding • Hover to pause)
              </span>
            </div>

            {/* Subtle Prev / Next Navigation Controls */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevSlide}
                aria-label="Scroll left"
                title="Scroll Left"
                className="w-6 h-6 rounded hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors cursor-pointer flex items-center justify-center border border-outline-variant/30"
              >
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button
                type="button"
                onClick={handleNextSlide}
                aria-label="Scroll right"
                title="Scroll Right"
                className="w-6 h-6 rounded hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors cursor-pointer flex items-center justify-center border border-outline-variant/30"
              >
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Carousel Track */}
          <div
            ref={carouselRef}
            className="flex gap-2 overflow-x-auto scroll-smooth py-0.5"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {initialData.map((item) => (
              <div
                key={item.sr}
                className="w-[130px] sm:w-[145px] flex-shrink-0 p-2 sm:p-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/50 hover:border-secondary/60 hover:shadow-xs transition-all flex flex-col justify-between group cursor-default"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-bold text-outline group-hover:text-secondary bg-surface-container/60 px-1 py-0.2 rounded">
                    #{item.sr}
                  </span>
                  <span className="text-[9px] text-outline font-medium">
                    {item.yearlyReceiptCount} Tx
                  </span>
                </div>
                <h4
                  className="text-xs sm:text-[13px] font-bold text-on-surface font-mukta truncate my-0.5 group-hover:text-secondary transition-colors"
                  title={item.useType}
                >
                  {item.useType}
                </h4>
                <div className="flex items-center justify-between text-[10px] pt-1 border-t border-outline-variant/20 mt-1">
                  <span className="text-outline text-[9px]">Amount</span>
                  <span className="font-semibold text-secondary text-[11px]">
                    ₹ {formatIndianNumber(item.yearlyCollectionAmount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Card: Collection Details Section */}
      <div className="bg-surface-container-lowest rounded-xl border border-surface-container shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
        {/* Section Header */}
        <div className="p-5 md:p-6 border-b border-surface-container flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-xl">
                bar_chart
              </span>
            </div>
            <div>
              <h2 className="font-headline-md text-base md:text-lg font-bold text-on-surface">
                Use Type Wise Collection Details
              </h2>
              <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                Current year vs today’s collection comparison by property use type
              </p>
            </div>
          </div>

          {/* Download Excel Button */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleDownloadExcel}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#007a3d] hover:bg-[#006633] active:bg-[#005229] text-white rounded-lg text-xs md:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">
                file_download
              </span>
              <span>Download Excel</span>
            </button>
          </div>
        </div>

        {/* Collection Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              {/* Header Tier 1 */}
              <tr className="bg-surface-container/60 text-on-surface-variant font-label-md text-xs border-b border-outline-variant/40">
                <th
                  rowSpan={2}
                  onClick={() => handleSort("sr")}
                  className="p-3.5 pl-5 border-r border-outline-variant/30 text-center font-bold text-primary cursor-pointer hover:bg-surface-container transition-colors w-16"
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>#</span>
                    <span className="material-symbols-outlined text-xs text-outline">
                      unfold_more
                    </span>
                  </div>
                </th>
                <th
                  rowSpan={2}
                  onClick={() => handleSort("useType")}
                  className="p-3.5 border-r border-outline-variant/30 font-bold text-primary cursor-pointer hover:bg-surface-container transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Use Type</span>
                    <span className="material-symbols-outlined text-xs text-outline">
                      unfold_more
                    </span>
                  </div>
                </th>
                <th
                  colSpan={2}
                  className="p-2.5 border-r border-outline-variant/30 text-center font-bold text-primary bg-primary/5"
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <span>Current Year Collection Details</span>
                    <span className="material-symbols-outlined text-xs text-outline">
                      unfold_more
                    </span>
                  </div>
                </th>
                <th
                  colSpan={2}
                  className="p-2.5 text-center font-bold text-primary bg-secondary/5"
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <span>Today’s Collection Details</span>
                    <span className="material-symbols-outlined text-xs text-outline">
                      unfold_more
                    </span>
                  </div>
                </th>
              </tr>

              {/* Header Tier 2 */}
              <tr className="bg-surface-container/40 text-on-surface-variant font-label-md text-xs border-b border-outline-variant/40">
                <th
                  onClick={() => handleSort("yearlyReceiptCount")}
                  className="p-2.5 px-4 border-r border-outline-variant/30 text-right font-semibold text-on-surface-variant cursor-pointer hover:bg-surface-container transition-colors"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Yearly Receipt Count</span>
                    <span className="material-symbols-outlined text-xs text-outline">
                      unfold_more
                    </span>
                  </div>
                </th>
                <th
                  onClick={() => handleSort("yearlyCollectionAmount")}
                  className="p-2.5 px-4 border-r border-outline-variant/30 text-right font-semibold text-on-surface-variant cursor-pointer hover:bg-surface-container transition-colors"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Yearly Collection Amount (₹)</span>
                    <span className="material-symbols-outlined text-xs text-outline">
                      unfold_more
                    </span>
                  </div>
                </th>
                <th
                  onClick={() => handleSort("todayReceiptCount")}
                  className="p-2.5 px-4 border-r border-outline-variant/30 text-right font-semibold text-on-surface-variant cursor-pointer hover:bg-surface-container transition-colors"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Today’s Receipt Count</span>
                    <span className="material-symbols-outlined text-xs text-outline">
                      unfold_more
                    </span>
                  </div>
                </th>
                <th
                  onClick={() => handleSort("todayCollectionAmount")}
                  className="p-2.5 px-4 text-right font-semibold text-on-surface-variant cursor-pointer hover:bg-surface-container transition-colors"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Today’s Collection Amount (₹)</span>
                    <span className="material-symbols-outlined text-xs text-outline">
                      unfold_more
                    </span>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-outline-variant/30 font-body-sm text-sm text-on-surface">
              {tableData.map((row, idx) => (
                <tr
                  key={row.sr}
                  className={`transition-colors hover:bg-primary/5 ${
                    idx % 2 === 1 ? "bg-surface-container-low/30" : "bg-surface-container-lowest"
                  }`}
                >
                  <td className="p-3 pl-5 border-r border-outline-variant/20 text-center font-medium text-on-surface-variant">
                    {row.sr}
                  </td>
                  <td className="p-3 border-r border-outline-variant/20 font-medium text-secondary font-mukta">
                    {row.useType}
                  </td>
                  <td className="p-3 px-4 border-r border-outline-variant/20 text-right font-semibold text-on-surface">
                    {formatIndianNumber(row.yearlyReceiptCount)}
                  </td>
                  <td className="p-3 px-4 border-r border-outline-variant/20 text-right font-semibold text-on-surface">
                    {formatIndianNumber(row.yearlyCollectionAmount)}
                  </td>
                  <td className="p-3 px-4 border-r border-outline-variant/20 text-right font-semibold text-on-surface">
                    {formatIndianNumber(row.todayReceiptCount)}
                  </td>
                  <td className="p-3 px-4 text-right font-semibold text-on-surface">
                    {formatIndianNumber(row.todayCollectionAmount)}
                  </td>
                </tr>
              ))}

              {/* Total Row matching Current UI theme */}
              <tr className="bg-[#eef4ff] border-t-2 border-primary/20 font-bold text-secondary">
                <td
                  colSpan={2}
                  className="p-3.5 pl-5 border-r border-outline-variant/30"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg text-secondary">
                      calculate
                    </span>
                    <span className="font-bold text-secondary text-sm">
                      Total
                    </span>
                  </div>
                </td>
                <td className="p-3.5 px-4 border-r border-outline-variant/30 text-right font-bold text-secondary text-sm">
                  302
                </td>
                <td className="p-3.5 px-4 border-r border-outline-variant/30 text-right font-bold text-secondary text-sm">
                  20,45,594
                </td>
                <td className="p-3.5 px-4 border-r border-outline-variant/30 text-right font-bold text-secondary text-sm">
                  0
                </td>
                <td className="p-3.5 px-4 text-right font-bold text-secondary text-sm">
                  0
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer from Reference UI styled in Current UI theme */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-on-surface-variant/70 pt-4 pb-2 border-t border-outline-variant/30 gap-2">
        <p>© 2026 वडगाव मावळ नगरपंचायत. All rights reserved.</p>
        <p>Design &amp; Developed by Sthapatya Consultants (I) Pvt. Ltd. Amaravati</p>
      </div>
    </div>
  );
}
