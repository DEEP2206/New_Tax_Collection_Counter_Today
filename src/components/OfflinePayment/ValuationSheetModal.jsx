import React, { useState, useEffect } from "react";

export default function ValuationSheetModal({ isOpen, onClose, propertyData }) {
  const [zoom, setZoom] = useState(1.0);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3200);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 1.6));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.6));
  const handleFitWidth = () => {
    const containerWidth = document.getElementById("document-viewport")?.clientWidth || 900;
    const targetWidth = 900;
    const newZoom = Math.min(Math.max((containerWidth - 60) / targetWidth, 0.6), 1.6);
    setZoom(newZoom);
    showToast(`Fit to width (${Math.round(newZoom * 100)}%)`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    showToast("Generating and downloading Valuation_Sheet_WADGAON_1_102.pdf...");
    setTimeout(() => {
      const element = document.createElement("a");
      const file = new Blob([document.querySelector(".a4-sheet")?.innerHTML || ""], {
        type: "text/html",
      });
      element.href = URL.createObjectURL(file);
      element.download = "Valuation_Sheet_WADGAON_1_102.html";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      showToast("Downloaded: Valuation_Sheet_WADGAON_1_102.pdf");
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#1e2530] overflow-hidden font-sans text-gray-900 animate-in fade-in duration-200">
      {/* BEGIN: TopViewerToolbar */}
      <header
        className="no-print bg-gray-900 border-b border-gray-800 text-gray-200 px-4 py-2.5 flex items-center justify-between sticky top-0 z-50 shadow-md flex-shrink-0 select-none"
        id="viewer-toolbar"
      >
        {/* Left Navigation & Title */}
        <div className="flex items-center space-x-3 overflow-hidden">
          <button
            onClick={onClose}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-gray-800 hover:bg-gray-700 text-xs font-medium text-gray-200 border border-gray-700 transition cursor-pointer"
            id="left-nav-btn"
            type="button"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
            <span>Back to Verify Property Details</span>
          </button>
          <div className="h-5 w-px bg-gray-700 hidden sm:block"></div>
          <div className="flex items-center space-x-2 truncate">
            {/* PDF red file badge icon */}
            <svg className="w-5 h-5 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 3C5.9 3 5 3.9 5 5v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V9l-6-6H7zm6 7V4.5l5.5 5.5H13zM9 13h1.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5H9v2H7.5v-5H9zm1.5 2c.3 0 .5-.2.5-.5s-.2-.5-.5-.5H9V15h1.5zm3.5-2h1.8c1 0 1.7.7 1.7 1.7v1.6c0 1-.7 1.7-1.7 1.7H14v-5zm1.5 3.8c.2 0 .5-.2.5-.5v-1.6c0-.3-.3-.5-.5-.5h-.5v2.6h.5z"></path>
            </svg>
            <h1 className="text-xs sm:text-sm font-semibold text-white tracking-wide truncate">
              Valuation Sheet (मालमत्ता विवरण व कर आकारणी तक्ता) -{" "}
              <span className="text-amber-400 font-mono">WADGAON-1-102</span>
            </h1>
          </div>
        </div>

        {/* Center/Right Controls: Zoom, Print, Download, Close */}
        <div className="flex items-center space-x-2 shrink-0">
          {/* Zoom controls */}
          <div className="hidden md:flex items-center bg-gray-800/80 rounded-md border border-gray-700 px-1 py-0.5 text-xs text-gray-300">
            <button
              onClick={handleZoomOut}
              className="p-1 hover:text-white hover:bg-gray-700 rounded transition cursor-pointer"
              title="Zoom Out"
              type="button"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M20 12H4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </button>
            <span className="px-2 font-mono text-xs font-medium text-gray-200">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1 hover:text-white hover:bg-gray-700 rounded transition cursor-pointer"
              title="Zoom In"
              type="button"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </button>
            <div className="h-3 w-px bg-gray-700 mx-1"></div>
            <button
              onClick={handleFitWidth}
              className="p-1 hover:text-white hover:bg-gray-700 rounded transition cursor-pointer"
              title="Fit to width"
              type="button"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
              </svg>
            </button>
          </div>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold shadow-sm transition cursor-pointer"
            type="button"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
            <span className="hidden sm:inline">Print</span>
          </button>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold shadow-sm transition cursor-pointer"
            type="button"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
            <span>Download</span>
          </button>

          {/* Close Action */}
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-800 text-gray-400 hover:text-white rounded transition cursor-pointer"
            title="Close"
            type="button"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
          </button>
        </div>
      </header>
      {/* END: TopViewerToolbar */}

      {/* BEGIN: DocumentCanvasContainer */}
      <main
        className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 flex justify-center items-start print-document-target"
        id="document-viewport"
      >
        {/* Government Valuation Sheet Document (A4 proportioned frame) */}
        <div
          className="a4-sheet bg-white text-gray-950 w-full max-w-[900px] border-[3px] border-red-800 shadow-2xl p-4 sm:p-5 relative select-text transition-transform duration-200 origin-top font-mukta"
          style={{ transform: `scale(${zoom})` }}
        >
          {/* Internal Double Red Decorative Frame */}
          <div className="border border-red-700 p-2.5 space-y-2">
            {/* BEGIN: MunicipalHeaderSection */}
            <section className="relative pb-1 border-b border-red-700" data-purpose="official-header">
              <div className="flex items-start justify-between">
                {/* Municipal Emblem / Logo */}
                <div className="w-14 h-14 shrink-0 flex items-center justify-center p-1 rounded-full border border-red-600 bg-amber-50 shadow-xs">
                  <svg className="w-12 h-12 text-red-700" fill="currentColor" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" fill="none" r="45" stroke="#b91c1c" strokeWidth="4"></circle>
                    <circle cx="50" cy="50" fill="#fef2f2" r="38" stroke="#b91c1c" strokeWidth="1.5"></circle>
                    {/* Emblem Graphic Symbol */}
                    <path
                      d="M50 16 L56 30 L72 30 L58 40 L64 56 L50 46 L36 56 L42 40 L28 30 L44 30 Z"
                      fill="#b91c1c"
                      opacity="0.85"
                    ></path>
                    <circle cx="50" cy="50" fill="#ffffff" r="14" stroke="#991b1b" strokeWidth="2"></circle>
                    <path d="M50 38 L50 62 M38 50 L62 50" stroke="#991b1b" strokeWidth="2.5"></path>
                    <text fill="#7f1d1d" fontSize="8" fontWeight="bold" textAnchor="middle" x="50" y="80">
                      महाराष्ट्र शासन
                    </text>
                  </svg>
                </div>

                {/* Central Official Title */}
                <div className="text-center flex-1 px-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-red-800 tracking-tight leading-snug">
                    वडगाव नगरपंचायत, वडगाव जि. पुणे
                  </h2>
                  <p className="text-[11px] sm:text-xs font-semibold text-blue-900 mt-0.5">
                    महाराष्ट्र नगरपरिषदा, नगरपंचायती व औद्योगिक नगरी अधिनियम, १९६५ चे कलम ११० व ११५ अन्वये
                  </p>
                  {/* Red Header Banner */}
                  <div className="mt-1.5 inline-block bg-red-700 text-white text-[11px] sm:text-xs font-bold px-4 py-0.5 rounded-sm shadow-xs">
                    २०२१-२२ ते २०२६-२७ या वर्षांसाठी कायमस्वरूपी व चालू वर्षातील कर आकारणी तक्ता
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-red-900 underline decoration-red-700 underline-offset-4 mt-1 tracking-wider">
                    मालमत्ता विवरण व कर आकारणी तक्ता
                  </h3>
                </div>

                {/* Space placeholder balancing emblem */}
                <div className="w-14 shrink-0 text-right">
                  <span className="inline-block text-[9px] font-mono text-gray-500 border border-gray-300 px-1 py-0.5 rounded">
                    Form No. 8
                  </span>
                </div>
              </div>
            </section>
            {/* END: MunicipalHeaderSection */}

            {/* BEGIN: PropertyMetaGrid */}
            <section data-purpose="property-master-metadata">
              <table className="govt-table text-center bg-white">
                <thead>
                  <tr className="bg-red-50 text-red-900 font-bold text-[10px]">
                    <th className="w-[8%]">वॉर्ड क्र.</th>
                    <th className="w-[10%]">मालमत्ता क्र.</th>
                    <th className="w-[7%]">भाग क्र.</th>
                    <th className="w-[10%]">प्रभाग क्र.</th>
                    <th className="w-[13%]">भांडवली मूल्य</th>
                    <th className="w-[9%]">वापरणारा कर</th>
                    <th className="w-[9%]">एकूण कर</th>
                    <th className="w-[9%]">सिटी सर्व्हे नं.</th>
                    <th className="w-[8%]">मोजणीप्रमाण</th>
                    <th className="w-[10%]">बांधकाम क्षेत्रफळ</th>
                    <th className="w-[7%]">यु.आय.डी</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Row 1: Navin (New) */}
                  <tr className="font-medium text-[10.5px]">
                    <td className="bg-amber-50/50 font-bold text-red-900">नवीन</td>
                    <td className="font-bold text-blue-900">V1</td>
                    <td className="font-bold text-red-800">102</td>
                    <td>२</td>
                    <td className="font-mono font-semibold">2786605</td>
                    <td className="font-mono">4180</td>
                    <td className="font-mono font-semibold text-red-800">4871</td>
                    <td>6</td>
                    <td>1.3.2</td>
                    <td className="font-mono">141.53</td>
                    <td>निवासी / निवासी</td>
                  </tr>
                  {/* Row 2: Juna (Old) */}
                  <tr className="font-medium text-[10px] text-gray-700 bg-gray-50/50">
                    <td className="bg-gray-100 font-bold">जुना</td>
                    <td className="font-mono">WAD GAON</td>
                    <td className="font-mono">2726+4155</td>
                    <td>-</td>
                    <td>-</td>
                    <td className="font-mono">1</td>
                    <td className="font-mono">1</td>
                    <td>-</td>
                    <td className="font-mono">0.97</td>
                    <td>1</td>
                    <td>0</td>
                  </tr>
                </tbody>
              </table>

              {/* Ownership & Location Details Table */}
              <table className="govt-table mt-1 bg-white">
                <tbody>
                  <tr>
                    <td className="w-[8%] font-bold text-red-900 bg-red-50/70 text-center">पत्ता</td>
                    <td className="w-[42%] text-left font-medium px-2">केशव नगर वडगाव मावळ</td>
                    <td className="w-[20%] font-bold text-red-900 bg-red-50/70 text-center">
                      दुकानाचा व इमारतीचे नाव
                    </td>
                    <td className="w-[15%] text-center">-</td>
                    <td className="w-[15%] font-bold text-red-900 bg-red-50/70 text-center">
                      भाड्याने वर्णन / निवासी
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold text-red-900 bg-red-50/70 text-center align-middle" rowSpan="2">
                      भोगवटादार
                    </td>
                    <td className="font-bold text-blue-950 bg-amber-50/40 text-center">
                      प्राथमिक कर धारकाचे नाव
                    </td>
                    <td className="font-bold text-red-900 bg-red-50/70 text-center" colSpan="2">
                      भाडेकरू / भोगवटादाराचे नाव
                    </td>
                    <td className="text-center font-bold text-red-900 bg-red-50/70">मजला / भाडे</td>
                  </tr>
                  <tr>
                    {/* Taxpayer Name */}
                    <td className="text-center font-bold text-sm text-red-950 py-1 bg-white">
                      गायकवाड मंगेश गुंडाजी
                    </td>
                    <td className="text-center font-medium text-gray-600 bg-white" colSpan="2">
                      भोगवटादार स्वतः
                    </td>
                    <td className="text-center font-semibold text-gray-800 bg-white">स्वतः / -</td>
                  </tr>
                </tbody>
              </table>
            </section>
            {/* END: PropertyMetaGrid */}

            {/* BEGIN: ConstructionMeasurementTable */}
            <section data-purpose="construction-measurement-details">
              <div className="overflow-x-auto">
                <table className="govt-table text-center bg-white">
                  <thead>
                    <tr className="bg-red-50 text-red-950 font-bold text-[9.5px]">
                      <th className="w-[4%]">मजला</th>
                      <th className="w-[6%]">बांधकामाचे वर्ष</th>
                      <th className="w-[6%]">बांधकाम प्रकार</th>
                      <th className="w-[6%]">वापराचा उपयोग</th>
                      <th className="w-[8%]">चटई.क्षे. चौ.मी.</th>
                      <th className="w-[8%]">प्लरींथ.क्षे. चौ.मी.</th>
                      <th className="w-[7%]">जागेचे दर चौ.मी.</th>
                      <th className="w-[7%]">जागेचे मूल्य (रु)</th>
                      <th className="w-[7%]">बांधकामाचे दर चौ.मी.</th>
                      <th className="w-[8%]">बांधकामाचे मूल्य (रु)</th>
                      <th className="w-[8%]">एकूण मूल्य (रु)</th>
                      <th className="w-[5%]">उपयोग भारांक</th>
                      <th className="w-[5%]">बांधकाम प्रकार भारांक</th>
                      <th className="w-[5%]">इमारतीच्या वयाचा भारांक</th>
                      <th className="w-[10%]">भांडवली मूल्य</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono text-[10px] text-gray-900">
                    {/* Ground Floor */}
                    <tr>
                      <td className="font-sans font-bold">G</td>
                      <td>2017</td>
                      <td className="font-sans">A</td>
                      <td className="font-sans">R</td>
                      <td>57.99</td>
                      <td>0.00</td>
                      <td>0</td>
                      <td>0</td>
                      <td>23158</td>
                      <td>1343011</td>
                      <td>1343011</td>
                      <td>1.00</td>
                      <td>1.00</td>
                      <td>0.90</td>
                      <td className="font-bold text-red-950 bg-amber-50/50">1200719</td>
                    </tr>
                    {/* Floor 1 */}
                    <tr className="bg-gray-50/30">
                      <td className="font-sans font-bold">१</td>
                      <td>2017</td>
                      <td className="font-sans">A</td>
                      <td className="font-sans">WR</td>
                      <td>30.34</td>
                      <td>0.00</td>
                      <td>0</td>
                      <td>0</td>
                      <td>23158</td>
                      <td>702708</td>
                      <td>702708</td>
                      <td>1.00</td>
                      <td>1.00</td>
                      <td>0.90</td>
                      <td className="font-bold text-red-950 bg-amber-50/50">631438</td>
                    </tr>
                    {/* Floor 2 */}
                    <tr>
                      <td className="font-sans font-bold">२</td>
                      <td>2017</td>
                      <td className="font-sans">A</td>
                      <td className="font-sans">R</td>
                      <td>55.22</td>
                      <td>0.00</td>
                      <td>0</td>
                      <td>0</td>
                      <td>23158</td>
                      <td>1232502</td>
                      <td>1232502</td>
                      <td>1.00</td>
                      <td>1.00</td>
                      <td>0.90</td>
                      <td className="font-bold text-red-950 bg-amber-50/50">1109252</td>
                    </tr>
                    {/* Open Land / Terrace */}
                    <tr className="bg-gray-50/30">
                      <td className="font-sans font-bold">OP</td>
                      <td>-</td>
                      <td className="font-sans">OP</td>
                      <td className="font-sans">OP</td>
                      <td>0.00</td>
                      <td>136.91</td>
                      <td>9840</td>
                      <td>1347294</td>
                      <td>0</td>
                      <td>1347294</td>
                      <td>1347294</td>
                      <td>1.00</td>
                      <td>1.00</td>
                      <td>0.70</td>
                      <td className="font-bold text-red-950 bg-amber-50/50">943106</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            {/* END: ConstructionMeasurementTable */}

            {/* BEGIN: TaxRateBreakdown */}
            <section data-purpose="tax-computation-summary">
              {/* Section Banner */}
              <div className="text-center font-bold text-xs text-red-900 bg-red-100/70 border border-red-700 py-0.5 mb-1">
                एकूण कर विवरण
              </div>
              <table className="govt-table text-center bg-white">
                <thead>
                  <tr className="bg-red-50 text-red-950 font-bold text-[10px]">
                    <th className="w-[20%]">भांडवली मूल्य रु.</th>
                    <th className="w-[18%]">सामान्य कर रु.</th>
                    <th className="w-[12%]">दर %</th>
                    <th className="w-[18%]">म.शिक्षण कर रु.</th>
                    <th className="w-[12%]">दर %</th>
                    <th className="w-[20%]">रोजगार हमी उपकर रु.</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-[11px] font-semibold">
                  <tr>
                    <td className="text-blue-950 font-bold">३९६६७५७</td>
                    <td className="text-red-900 font-bold">८१५०</td>
                    <td>०.२५</td>
                    <td>१७४१</td>
                    <td>०.०१</td>
                    <td>०</td>
                  </tr>
                </tbody>
              </table>

              {/* Comparison Assessment Grid */}
              <table className="govt-table text-center mt-1 bg-white">
                <thead>
                  <tr className="bg-red-50 text-red-950 font-bold text-[9.5px]">
                    <th className="w-[16%]">जुने भांडवली मूल्य रु.</th>
                    <th className="w-[16%]">जुना मालमत्ता कर रु.</th>
                    <th className="w-[20%]">आकारणी निकष</th>
                    <th className="w-[24%]">प्रस्तावित भांडवली मूल्य</th>
                    <th className="w-[24%]">प्रस्तावित मालमत्ता कर रु.</th>
                  </tr>
                </thead>
                <tbody className="text-[10.5px]">
                  <tr>
                    <td className="font-mono text-gray-500">-</td>
                    <td className="font-mono text-gray-500">-</td>
                    <td className="font-mono font-semibold text-gray-800 bg-gray-50">F2Appeal</td>
                    <td className="font-mono font-bold text-blue-900">३९६६७५७</td>
                    <td className="font-mono font-bold text-red-900 bg-amber-50/70">८१५०</td>
                  </tr>
                </tbody>
              </table>

              {/* Consolidated Itemized Taxes Table */}
              <table className="govt-table text-center mt-1 bg-white">
                <thead>
                  <tr className="bg-red-50 text-red-950 font-bold text-[9.5px]">
                    <th className="w-[12%]">सामान्य कर रु.</th>
                    <th className="w-[12%]">दिवाबत्ती कर रु.</th>
                    <th className="w-[13%]">वृक्ष संवर्धन कर रु.</th>
                    <th className="w-[13%]">अग्निशमन कर रु.</th>
                    <th className="w-[12%]">पथकर रु.</th>
                    <th className="w-[12%]">शिक्षण कर रु.</th>
                    <th className="w-[12%]">रोजगार कर रु.</th>
                    <th className="w-[14%] bg-red-100 text-red-900">एकूण कर रु.</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-[10.5px] font-semibold">
                  <tr>
                    <td className="text-gray-900">८१५०</td>
                    <td className="text-gray-500">०</td>
                    <td className="text-gray-900">२६१</td>
                    <td className="text-gray-900">१२०</td>
                    <td className="text-gray-500">०</td>
                    <td className="text-gray-900">१७४१</td>
                    <td className="text-gray-500">०</td>
                    <td className="bg-red-50 text-red-900 font-bold text-xs">१२८५२</td>
                  </tr>
                </tbody>
              </table>
            </section>
            {/* END: TaxRateBreakdown */}

            {/* BEGIN: SitePhotoAndFloorplanSection */}
            <section className="pt-1" data-purpose="site-photos-and-technical-blueprint">
              <div className="border-2 border-red-700 bg-white grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x-2 divide-red-700">
                {/* Left: Building Site Photo Frame */}
                <div className="p-2 flex flex-col items-center justify-between bg-neutral-100">
                  <div className="w-full text-left font-mono text-[9px] text-gray-600 mb-1">
                    Date: 07-08-2021 15:24:22.564
                  </div>
                  {/* Building Architecture Photo Representation */}
                  <div className="w-full h-56 border border-gray-400 bg-gradient-to-b from-sky-200 via-amber-50 to-stone-300 relative overflow-hidden rounded-xs flex flex-col justify-end shadow-inner">
                    {/* Sky and horizon line */}
                    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    {/* Facade of Multi-storey Building */}
                    <div className="relative w-11/12 mx-auto bg-stone-200 border-2 border-stone-400 p-2 shadow-lg mb-1">
                      {/* Building Name Plate */}
                      <div className="bg-amber-100 border border-amber-400 text-center py-0.5 px-2 mb-2 rounded-xs shadow-xs">
                        <span className="text-xs font-bold text-red-800 tracking-wider">
                          ॥ श्री समर्थ कृपा ॥
                        </span>
                      </div>
                      {/* Windows & Balconies */}
                      <div className="grid grid-cols-3 gap-1.5 pt-1">
                        <div className="h-10 bg-sky-900/20 border border-stone-400 flex items-center justify-center">
                          <div className="w-full border-t border-stone-400"></div>
                        </div>
                        <div className="h-10 bg-amber-800/20 border border-stone-400 flex items-center justify-center">
                          <span className="text-[8px] font-mono text-stone-600">MAIN</span>
                        </div>
                        <div className="h-10 bg-sky-900/20 border border-stone-400 flex items-center justify-center">
                          <div className="w-full border-t border-stone-400"></div>
                        </div>
                      </div>
                      {/* Ground floor gate */}
                      <div className="mt-2 h-14 bg-stone-300 border-t-2 border-stone-500 grid grid-cols-2 gap-2 p-1">
                        <div className="border border-stone-500 bg-stone-400/30 flex items-center justify-center">
                          <span className="text-[9px] font-bold text-stone-700">GARAGE</span>
                        </div>
                        <div className="border border-stone-500 bg-stone-400/30 flex items-center justify-center">
                          <span className="text-[9px] font-bold text-stone-700">ENTRY</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-stone-600 h-2 border-t border-stone-700"></div>
                  </div>
                  <div className="text-[10px] font-bold text-gray-700 mt-1">
                    इमारत प्रत्यक्ष छायाचित्र (Building Front Elevation)
                  </div>
                </div>

                {/* Right: Architectural Floor Plan Blueprint */}
                <div className="p-2 flex flex-col justify-between blueprint-grid relative">
                  {/* Header ID Tag */}
                  <div className="text-center font-mono font-bold text-[11px] text-blue-900 bg-white/90 border border-gray-300 py-0.5 rounded shadow-xs mb-1">
                    WADGAON-1-102 (नकाशा मजला रेखाटन)
                  </div>
                  {/* Cadastral Blueprint Vector Diagram */}
                  <div className="border-2 border-red-600 p-1.5 bg-white/80 relative my-1 min-h-[210px] flex flex-col justify-between">
                    {/* Dimension markers & boundary walls */}
                    <div className="relative w-full h-44 border border-emerald-800 p-1">
                      {/* Boundary Dimensions */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold text-emerald-800 bg-white px-1">
                        OPEN 10'
                      </div>
                      <div className="absolute -left-3.5 top-10 text-[9px] font-mono font-bold text-emerald-800 bg-white">
                        12'10"
                      </div>
                      <div className="absolute -right-3 top-10 text-[9px] font-mono font-bold text-emerald-800 bg-white">
                        13'6"
                      </div>
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold text-emerald-800 bg-white px-1">
                        OPEN 10'3"
                      </div>
                      {/* Internal Floor Division Grid */}
                      <div className="grid grid-cols-12 h-full gap-1 border border-emerald-600 p-1">
                        {/* Left Section: Rooms, BA, PASS */}
                        <div className="col-span-5 flex flex-col justify-between border-r border-emerald-600 pr-1">
                          <div className="border border-emerald-700 p-1 text-center bg-emerald-50/40">
                            <span className="text-[9px] font-mono font-bold text-emerald-900 block">W 3'</span>
                            <span className="text-[8px] font-mono text-gray-700">GAR</span>
                          </div>
                          <div className="border border-dashed border-emerald-600 my-0.5 text-center text-[8px] font-mono font-semibold text-emerald-800">
                            PASS 3'
                          </div>
                          <div className="flex space-x-1">
                            <div className="flex-1 border border-emerald-700 text-center py-1 bg-emerald-50/40">
                              <span className="text-[8px] font-mono font-bold text-emerald-900">BA</span>
                            </div>
                            <div className="flex-1 border border-emerald-700 text-center py-1 bg-emerald-50/40">
                              <span className="text-[8px] font-mono font-bold text-emerald-900">P</span>
                            </div>
                          </div>
                        </div>
                        {/* Right Section: Staircase & Large Hall/Garage */}
                        <div className="col-span-7 flex flex-col justify-between pl-1">
                          {/* Staircase / Steps representation */}
                          <div className="flex items-center justify-between border-b border-emerald-600 pb-1">
                            <div className="text-[8px] font-mono text-emerald-900 font-bold">GAR 11'</div>
                            <div className="w-12 h-6 border border-emerald-700 flex flex-col justify-between px-0.5 bg-emerald-100/60">
                              <div className="border-b border-emerald-600 h-1"></div>
                              <div className="border-b border-emerald-600 h-1"></div>
                              <div className="border-b border-emerald-600 h-1"></div>
                            </div>
                          </div>
                          {/* Center Area with measurement labels */}
                          <div className="my-auto py-2 text-center">
                            <span className="text-[10px] font-mono font-bold text-emerald-950 block">17'3"</span>
                            <span className="text-[8px] font-mono text-gray-600">GAR / HALL</span>
                          </div>
                          {/* Bottom Exit & Open Terrace Passage */}
                          <div className="border-t border-emerald-600 pt-1 flex justify-between text-[8px] font-mono font-semibold text-emerald-800">
                            <span>PASS</span>
                            <span>11'10" OPEN</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Plan Ownership Label Tag */}
                    <div className="mt-2 text-center bg-amber-50 border border-amber-300 py-0.5 px-2 shadow-2xs">
                      <span className="text-[10px] font-mono font-bold text-emerald-950 uppercase tracking-tight">
                        THE HOLDER (GAYAKWAD MANGESH GUNDAGI)
                      </span>
                    </div>
                  </div>
                  <div className="text-[9.5px] font-mono text-right text-gray-500 pr-1">
                    Scale: 1:100 (Approx Cadastral Measurement)
                  </div>
                </div>
              </div>
            </section>
            {/* END: SitePhotoAndFloorplanSection */}

            {/* BEGIN: StatutoryNotesAndLegend */}
            <section
              className="border border-red-700 bg-red-50/30 p-1.5 text-[8.5px] leading-tight text-gray-800 space-y-0.5"
              data-purpose="statutory-legend"
            >
              <p className="font-bold text-red-900">
                टिप:- फुटपाथची मालकी तथा संपादनविषयक हक्क नगरपालिकेकडे अधिकार राहतील/ठेवण्यात आले आहेत.
              </p>
              <div className="text-[8px] text-gray-700 space-y-0.5 border-t border-red-200 pt-0.5">
                <p>
                  <span className="font-bold text-red-950">सांकेतिक :</span> १) मजला :{" "}
                  <span className="font-mono font-semibold">G</span> : तळमजला,{" "}
                  <span className="font-mono font-semibold">M</span> : मेझनाईन (पोटमाळा),{" "}
                  <span className="font-mono font-semibold">1</span> : पहिला मजला,{" "}
                  <span className="font-mono font-semibold">2</span> : दुसरा मजला... | २) बांधकाम प्रकार :{" "}
                  <span className="font-mono font-semibold">A</span> : आर.सी.सी. स्लॅबची घरे,{" "}
                  <span className="font-mono font-semibold">B</span> : विटा सिमेंटच्या भिंती विटा सिमेंटची छत,{" "}
                  <span className="font-mono font-semibold">C</span> : विटा सिमेंटच्या भिंती व टीन छप्पर...
                </p>
                <p>
                  ३) वापराचा प्रकार : <span className="font-mono font-semibold">R</span> : रहिवासी (निवासी),{" "}
                  <span className="font-mono font-semibold">S</span> : दुकान,{" "}
                  <span className="font-mono font-semibold">C</span> : वाणिज्यिक (ऑफिसेस),{" "}
                  <span className="font-mono font-semibold">GO</span> : गोडाउन,{" "}
                  <span className="font-mono font-semibold">EG</span> : न्यायालयीन/इतर... | ४) विशेष प्रकार :{" "}
                  <span className="font-mono font-semibold">WR</span> : वॉटर रेसिस्टंट स्लॅब,{" "}
                  <span className="font-mono font-semibold">OP</span> : ओपन टेरेस / मोकळी जागा.
                </p>
              </div>
            </section>
            {/* END: StatutoryNotesAndLegend */}

            {/* BEGIN: OfficialSignaturesSection */}
            <footer className="pt-2 pb-1" data-purpose="signatures-and-authority">
              <div className="grid grid-cols-2 items-end pt-4">
                {/* Left Official Signature */}
                <div className="text-center space-y-1">
                  <div className="w-32 mx-auto border-b border-gray-400 border-dashed mb-1"></div>
                  <p className="text-[11px] font-bold text-gray-950 leading-tight">कर लिपिक</p>
                  <p className="text-[10px] font-medium text-red-900">वडगाव नगरपंचायत, वडगाव</p>
                </div>
                {/* Right Official Signature with Seal */}
                <div className="text-center space-y-1 relative">
                  {/* Digital Stamp Watermark */}
                  <div className="absolute right-4 bottom-2 w-16 h-16 border-2 border-red-700/30 rounded-full flex items-center justify-center pointer-events-none rotate-[-12deg]">
                    <span className="text-[7px] font-bold text-red-800/40 text-center uppercase tracking-tighter">
                      VADGAON NAGAR PANCHAYAT
                    </span>
                  </div>
                  <div className="w-36 mx-auto border-b border-gray-400 border-dashed mb-1"></div>
                  <p className="text-[11px] font-bold text-gray-950 leading-tight">
                    मुख्याधिकारी / कर निरीक्षक
                  </p>
                  <p className="text-[10px] font-medium text-red-900">
                    वडगाव नगरपंचायत, वडगाव जि. पुणे
                  </p>
                </div>
              </div>
            </footer>
            {/* END: OfficialSignaturesSection */}
          </div>
        </div>
      </main>
      {/* END: DocumentCanvasContainer */}

      {/* Toast Notification */}
      {toastMessage && (
        <div
          className="fixed bottom-4 right-4 z-50 bg-slate-900 text-white border border-slate-700 rounded-lg shadow-xl px-4 py-3 text-xs flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-2 duration-200"
          id="toast-notification"
        >
          <svg
            className="h-5 w-5 text-emerald-400 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 13l4 4L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
          </svg>
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
