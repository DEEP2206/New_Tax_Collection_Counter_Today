export const chartDatasets = {
  today: {
    periodLabel: "Total Collection (Today)",
    kpiCollection: "₹ 42,50,000",
    kpiTarget: "Target: ₹ 50,00,000 (85% Achieved)",
    kpiProgress: "85%",
    kpiGrowth: "12.5%",
    kpiTransactions: "1,245",
    kpiTxGrowth: "8.2%",
    kpiAvgTicket: "Avg. Ticket Size: ₹ 3,413",
    kpiEfficiency: "92.4%",
    kpiEffStatus: "Pending",
    kpiEffColorClass: "bg-warning-amber/10 text-warning-amber",
    yLabels: ["₹45L", "₹35L", "₹25L", "₹15L", "₹5L"],
    xLabels: ["8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"],
    points: [
      { label: "8:00 AM", collVal: "₹ 4,20,000", collNum: 4.2, tx: "110", txNorm: 3.5, eff: "88%" },
      { label: "10:00 AM", collVal: "₹ 11,50,000", collNum: 11.5, tx: "340", txNorm: 9.8, eff: "90%" },
      { label: "12:00 PM", collVal: "₹ 21,80,000", collNum: 21.8, tx: "620", txNorm: 18.0, eff: "93%" },
      { label: "2:00 PM", collVal: "₹ 29,40,000", collNum: 29.4, tx: "845", txNorm: 25.1, eff: "91%" },
      { label: "4:00 PM", collVal: "₹ 38,10,000", collNum: 38.1, tx: "1,110", txNorm: 33.4, eff: "94%" },
      { label: "6:00 PM", collVal: "₹ 42,50,000", collNum: 42.5, tx: "1,245", txNorm: 38.0, eff: "92.4%" }
    ],
    maxRange: 50
  },
  week: {
    periodLabel: "Total Collection (This Week)",
    kpiCollection: "₹ 2,84,50,000",
    kpiTarget: "Target: ₹ 3,00,00,000 (94.8% Achieved)",
    kpiProgress: "94.8%",
    kpiGrowth: "16.4%",
    kpiTransactions: "8,420",
    kpiTxGrowth: "11.1%",
    kpiAvgTicket: "Avg. Ticket Size: ₹ 3,378",
    kpiEfficiency: "94.2%",
    kpiEffStatus: "Healthy",
    kpiEffColorClass: "bg-success-leaf/10 text-success-leaf",
    yLabels: ["₹60L", "₹45L", "₹30L", "₹15L", "₹0L"],
    xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    points: [
      { label: "Monday", collVal: "₹ 32,40,000", collNum: 32.4, tx: "980", txNorm: 26, eff: "91.2%" },
      { label: "Tuesday", collVal: "₹ 38,90,000", collNum: 38.9, tx: "1,140", txNorm: 31, eff: "93.0%" },
      { label: "Wednesday", collVal: "₹ 45,20,000", collNum: 45.2, tx: "1,320", txNorm: 37, eff: "94.5%" },
      { label: "Thursday", collVal: "₹ 41,10,000", collNum: 41.1, tx: "1,210", txNorm: 34, eff: "92.8%" },
      { label: "Friday", collVal: "₹ 54,60,000", collNum: 54.6, tx: "1,680", txNorm: 48, eff: "96.4%" },
      { label: "Saturday", collVal: "₹ 48,30,000", collNum: 48.3, tx: "1,440", txNorm: 42, eff: "95.1%" },
      { label: "Sunday", collVal: "₹ 24,00,000", collNum: 24.0, tx: "650", txNorm: 18, eff: "94.2%" }
    ],
    maxRange: 60
  },
  month: {
    periodLabel: "Total Collection (This Month)",
    kpiCollection: "₹ 11,45,20,000",
    kpiTarget: "Target: ₹ 12,00,00,000 (95.4% Achieved)",
    kpiProgress: "95.4%",
    kpiGrowth: "19.8%",
    kpiTransactions: "34,180",
    kpiTxGrowth: "14.5%",
    kpiAvgTicket: "Avg. Ticket Size: ₹ 3,350",
    kpiEfficiency: "96.1%",
    kpiEffStatus: "Exceeded",
    kpiEffColorClass: "bg-success-leaf/10 text-success-leaf",
    yLabels: ["₹4 Cr", "₹3 Cr", "₹2 Cr", "₹1 Cr", "₹0 Cr"],
    xLabels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    points: [
      { label: "Week 1", collVal: "₹ 2,40,50,000", collNum: 24.0, tx: "7,200", txNorm: 20, eff: "93.4%" },
      { label: "Week 2", collVal: "₹ 2,95,00,000", collNum: 29.5, tx: "8,950", txNorm: 26, eff: "95.2%" },
      { label: "Week 3", collVal: "₹ 3,45,20,000", collNum: 34.5, tx: "10,210", txNorm: 33, eff: "97.0%" },
      { label: "Week 4", collVal: "₹ 2,64,50,000", collNum: 26.4, tx: "7,820", txNorm: 24, eff: "96.1%" }
    ],
    maxRange: 40
  },
  custom: {
    periodLabel: "Total Collection (Oct 01 - Oct 25)",
    kpiCollection: "₹ 9,62,40,000",
    kpiTarget: "Target: ₹ 10,00,00,000 (96.2% Achieved)",
    kpiProgress: "96.2%",
    kpiGrowth: "18.3%",
    kpiTransactions: "28,640",
    kpiTxGrowth: "13.8%",
    kpiAvgTicket: "Avg. Ticket Size: ₹ 3,360",
    kpiEfficiency: "95.8%",
    kpiEffStatus: "Healthy",
    kpiEffColorClass: "bg-success-leaf/10 text-success-leaf",
    yLabels: ["₹10 Cr", "₹7.5 Cr", "₹5 Cr", "₹2.5 Cr", "₹0 Cr"],
    xLabels: ["Oct 01", "Oct 05", "Oct 10", "Oct 15", "Oct 20", "Oct 25"],
    points: [
      { label: "Oct 01", collVal: "₹ 1,20,00,000", collNum: 1.2, tx: "3,580", txNorm: 1.1, eff: "93.0%" },
      { label: "Oct 05", collVal: "₹ 2,85,00,000", collNum: 2.85, tx: "8,490", txNorm: 2.6, eff: "94.5%" },
      { label: "Oct 10", collVal: "₹ 4,70,00,000", collNum: 4.7, tx: "14,020", txNorm: 4.3, eff: "95.2%" },
      { label: "Oct 15", collVal: "₹ 6,35,00,000", collNum: 6.35, tx: "18,910", txNorm: 5.9, eff: "96.4%" },
      { label: "Oct 20", collVal: "₹ 8,10,00,000", collNum: 8.1, tx: "24,150", txNorm: 7.6, eff: "95.9%" },
      { label: "Oct 25", collVal: "₹ 9,62,40,000", collNum: 9.62, tx: "28,640", txNorm: 8.9, eff: "95.8%" }
    ],
    maxRange: 10
  }
};

export function generateSmoothPath(pts) {
  if (!pts || pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i === 0 ? 0 : i - 1];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}
