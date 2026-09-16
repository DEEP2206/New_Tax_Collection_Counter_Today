import React, { useState } from "react";
import { generateSmoothPath } from "../data/chartData";

export default function CollectionTrendChart({ data }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const chartWidth = 700;
  const chartHeight = 280;
  const padding = { top: 25, right: 35, bottom: 45, left: 65 };
  const graphW = chartWidth - padding.left - padding.right;
  const graphH = chartHeight - padding.top - padding.bottom;
  const bottomY = padding.top + graphH;

  if (!data || !data.points || data.points.length === 0) return null;

  const count = data.points.length;
  const stepX = count > 1 ? graphW / (count - 1) : graphW;
  const maxY = data.maxRange;

  const collPoints = data.points.map((p, idx) => {
    const x = padding.left + idx * stepX;
    const y = padding.top + graphH - (p.collNum / maxY) * graphH;
    return { x, y, raw: p };
  });

  const txPoints = data.points.map((p, idx) => {
    const x = padding.left + idx * stepX;
    const y = padding.top + graphH - (p.txNorm / maxY) * graphH;
    return { x, y, raw: p };
  });

  const effPoints = data.points.map((p, idx) => {
    const x = padding.left + idx * stepX;
    const effVal = parseFloat(p.eff);
    const ratio = Math.max(0, Math.min(1, (effVal - 80) / 22));
    const y = padding.top + graphH - ratio * (graphH * 0.7) - 15;
    return { x, y, raw: p };
  });

  const pathCollStr = generateSmoothPath(collPoints);
  const pathTxStr = generateSmoothPath(txPoints);
  const pathEffStr = generateSmoothPath(effPoints);

  const areaCollStr =
    collPoints.length > 1
      ? `${pathCollStr} L ${collPoints[collPoints.length - 1].x} ${bottomY} L ${collPoints[0].x} ${bottomY} Z`
      : "";
  const areaTxStr =
    txPoints.length > 1
      ? `${pathTxStr} L ${txPoints[txPoints.length - 1].x} ${bottomY} L ${txPoints[0].x} ${bottomY} Z`
      : "";

  const rows = 4;
  const gridRows = Array.from({ length: rows + 1 }, (_, r) => ({
    y: padding.top + (graphH / rows) * r,
    label: data.yLabels[r] || ""
  }));

  const activePoint = hoveredIdx !== null ? collPoints[hoveredIdx] : null;

  return (
    <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-stack-lg shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-surface-container flex flex-col relative">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Collection Trend
          </h2>
          <p className="text-body-sm text-on-surface-variant text-xs mt-0.5">
            Real-time revenue &amp; transaction cadence
          </p>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-label-sm">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-primary inline-block"></span>
            <span className="text-on-surface-variant font-medium">Total Collection</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-secondary inline-block"></span>
            <span className="text-on-surface-variant font-medium">Transactions</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 rounded-full bg-warning-amber inline-block"></span>
            <span className="text-on-surface-variant font-medium">Efficiency %</span>
          </div>
          <button
            title="Options"
            className="text-on-surface-variant hover:bg-surface-container p-1 rounded-md transition-colors ml-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">more_vert</span>
          </button>
        </div>
      </div>

      {/* Dynamic SVG Chart Container */}
      <div
        className="relative w-full h-[320px] flex-1 bg-surface-muted/50 rounded-lg p-2 overflow-hidden border border-outline-variant/30 flex flex-col justify-between"
      >
        {/* Floating Tooltip */}
        {activePoint && (
          <div
            className="absolute pointer-events-none transition-all duration-150 bg-inverse-surface text-inverse-on-surface px-3 py-2 rounded-lg shadow-xl text-xs z-30 transform -translate-x-1/2 -translate-y-full border border-white/10"
            style={{
              left: `${(activePoint.x / chartWidth) * 100}%`,
              top: `${(activePoint.y / chartHeight) * 100}%`
            }}
          >
            <p className="font-bold border-b border-white/20 pb-1 mb-1 text-[11px] text-primary-fixed">
              {activePoint.raw.label}
            </p>
            <div className="space-y-0.5 font-label-sm text-[11px]">
              <div className="flex justify-between gap-3">
                <span className="text-outline-variant">Collection:</span>
                <span className="font-semibold text-white">
                  {activePoint.raw.collVal}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-outline-variant">Transactions:</span>
                <span className="font-semibold text-white">
                  {activePoint.raw.tx}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-outline-variant">Efficiency:</span>
                <span className="font-semibold text-warning-amber">
                  {activePoint.raw.eff}
                </span>
              </div>
            </div>
          </div>
        )}

        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        >
          <defs>
            <linearGradient id="collGradient" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#002665" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#002665" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="txGradient" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#0051d5" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#0051d5" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines */}
          <g stroke="#e2e2e9" strokeDasharray="4 4" strokeWidth="1">
            {gridRows.map((row, i) => (
              <line
                key={`grid-${i}`}
                x1={padding.left}
                x2={chartWidth - padding.right}
                y1={row.y}
                y2={row.y}
              />
            ))}
          </g>

          {/* Y-Axis Labels */}
          <g className="text-[11px] fill-[#747783] font-sans">
            {gridRows.map((row, i) => (
              <text
                key={`ylabel-${i}`}
                textAnchor="end"
                x={padding.left - 12}
                y={row.y + 4}
              >
                {row.label}
              </text>
            ))}
          </g>

          {/* Area fills */}
          {areaTxStr && (
            <path
              className="chart-transition"
              d={areaTxStr}
              fill="url(#txGradient)"
            />
          )}
          {areaCollStr && (
            <path
              className="chart-transition"
              d={areaCollStr}
              fill="url(#collGradient)"
            />
          )}

          {/* Lines */}
          {pathEffStr && (
            <path
              className="chart-transition"
              d={pathEffStr}
              fill="none"
              stroke="#ea580c"
              strokeDasharray="3 3"
              strokeWidth="2"
            />
          )}
          {pathTxStr && (
            <path
              className="chart-transition"
              d={pathTxStr}
              fill="none"
              stroke="#0051d5"
              strokeWidth="2.5"
            />
          )}
          {pathCollStr && (
            <path
              className="chart-transition"
              d={pathCollStr}
              fill="none"
              stroke="#002665"
              strokeWidth="3"
            />
          )}

          {/* Data points & interactive trigger hit areas */}
          <g>
            {collPoints.map((pt, idx) => (
              <g
                key={`pt-${idx}`}
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Hit area */}
                <rect
                  x={pt.x - stepX / 2}
                  y={padding.top}
                  width={stepX}
                  height={graphH}
                  fill="transparent"
                />
                {/* Transaction point circle */}
                <circle
                  cx={pt.x}
                  cy={txPoints[idx].y}
                  r={hoveredIdx === idx ? 6 : 4}
                  fill="#0051d5"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="transition-all duration-150"
                />
                {/* Collection point circle */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={hoveredIdx === idx ? 7 : 5}
                  fill="#002665"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="transition-all duration-150"
                />
              </g>
            ))}
          </g>

          {/* X-Axis Labels */}
          <g className="text-[11px] fill-[#434652] font-medium font-sans">
            {collPoints.map((pt, i) => (
              <text
                key={`xlabel-${i}`}
                textAnchor="middle"
                x={pt.x}
                y={bottomY + 22}
              >
                {data.xLabels[i]}
              </text>
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}
