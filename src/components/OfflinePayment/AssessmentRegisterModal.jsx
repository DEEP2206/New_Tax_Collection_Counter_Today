import React, { useState, useEffect } from "react";

export default function AssessmentRegisterModal({ isOpen, onClose, propertyData }) {
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
    const containerWidth = document.getElementById("document-viewport")?.clientWidth || 1240;
    const targetWidth = 1240;
    const newZoom = Math.min(Math.max((containerWidth - 60) / targetWidth, 0.6), 1.6);
    setZoom(newZoom);
    showToast(`Fit to width (${Math.round(newZoom * 100)}%)`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    showToast("Generating and downloading Assessment_Register_V102.pdf...");
    setTimeout(() => {
      const element = document.createElement("a");
      const file = new Blob([document.querySelector(".document-sheet")?.innerHTML || ""], {
        type: "text/html",
      });
      element.href = URL.createObjectURL(file);
      element.download = "Assessment_Register_V102.html";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      showToast("Downloaded: Assessment_Register_V102.pdf");
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#1e293b] overflow-hidden font-devanagari text-slate-900 animate-in fade-in duration-200">
      {/* BEGIN: TopViewerToolbar */}
      <header
        className="no-print h-14 bg-[#111827] text-white flex items-center justify-between px-4 sticky top-0 z-50 shadow-md border-b border-slate-800 flex-shrink-0 select-none"
        id="viewer-toolbar"
      >
        {/* Left: Navigation and Document Title */}
        <div className="flex items-center space-x-3 overflow-hidden">
          <button
            onClick={onClose}
            className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md border border-slate-700 transition cursor-pointer"
            type="button"
          >
            <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
            Back to Verify Property Details
          </button>
          <div className="h-4 w-[1px] bg-slate-700"></div>
          <div className="flex items-center space-x-2 truncate">
            <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path
                clipRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                fillRule="evenodd"
              ></path>
            </svg>
            <span className="text-sm font-medium text-slate-100 truncate">
              Abstract from Assessment Register (आकारणी नोंदवही उतारा) -{" "}
              <span className="font-bold text-amber-400">V-102</span>
            </span>
          </div>
        </div>

        {/* Right: Viewer Controls (Zoom, Fit, Print, Download, Close) */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          {/* Zoom Controls */}
          <div className="hidden sm:flex items-center bg-slate-800 rounded px-1.5 py-0.5 border border-slate-700 text-xs text-slate-300">
            <button
              onClick={handleZoomOut}
              className="p-1 hover:text-white cursor-pointer"
              title="Zoom Out"
              type="button"
            >
              -
            </button>
            <span className="px-2 font-mono">{Math.round(zoom * 100)}%</span>
            <button
              onClick={handleZoomIn}
              className="p-1 hover:text-white cursor-pointer"
              title="Zoom In"
              type="button"
            >
              +
            </button>
          </div>
          {/* Fit Page */}
          <button
            onClick={handleFitWidth}
            className="hidden sm:inline-flex items-center p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded text-xs cursor-pointer"
            title="Fit to width"
            type="button"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0 0l-5-5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
          </button>
          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded shadow-sm transition cursor-pointer"
            type="button"
          >
            <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
            Print
          </button>
          {/* Download PDF Button */}
          <button
            onClick={handleDownload}
            className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded shadow-sm transition cursor-pointer"
            type="button"
          >
            <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
            Download
          </button>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition cursor-pointer"
            title="Close"
            type="button"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        className="flex-1 overflow-auto p-4 sm:p-6 md:p-8 flex justify-center items-start bg-slate-900/90 print-document-target"
        id="document-viewport"
      >
        {/* BEGIN: OfficialMunicipalDocument */}
        <article
          className="document-sheet w-full max-w-[1240px] bg-white text-slate-900 shadow-2xl p-6 sm:p-8 transition-transform duration-200 origin-top border border-slate-400 select-text text-[11px] leading-tight"
          style={{ transform: `scale(${zoom})` }}
          data-purpose="municipal-assessment-document"
        >
          {/* Official Double Outer Border Wrapper */}
          <div className="border-2 border-slate-900 p-2 sm:p-3 relative">
            {/* BEGIN: HeaderSection */}
            <header className="border-b-2 border-slate-900 pb-2 mb-2">
              <div className="grid grid-cols-12 items-center gap-2">
                {/* Left: Official Municipal Emblem / Logo */}
                <div className="col-span-2 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 border border-slate-400 rounded-full flex items-center justify-center p-1 relative bg-amber-50/20">
                    <svg className="w-full h-full text-[#991b1b]" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" fill="none" r="46" stroke="currentColor" strokeDasharray="3 2" strokeWidth="2.5"></circle>
                      <circle cx="50" cy="50" fill="none" r="41" stroke="#d97706" strokeWidth="1.5"></circle>
                      <path d="M25,75 Q50,45 75,75 L75,80 L25,80 Z" fill="#b91c1c" opacity="0.3"></path>
                      <polygon fill="#d97706" points="50,15 60,35 40,35"></polygon>
                      <circle cx="50" cy="45" fill="#fef3c7" r="16" stroke="#b91c1c" strokeWidth="1.5"></circle>
                      <path d="M50,30 L50,22 M50,60 L50,68 M35,45 L27,45 M65,45 L73,45" stroke="#d97706" strokeWidth="2"></path>
                      <path d="M22,82 Q50,92 78,82" fill="none" stroke="#1e3a8a" strokeWidth="3"></path>
                    </svg>
                  </div>
                  <span className="text-[9px] font-bold text-slate-800 mt-1 tracking-tight">
                    वडगाव नगरपंचायत
                  </span>
                  <span className="text-[8px] text-slate-600">।। सत्यमेव जयते ।।</span>
                </div>

                {/* Center: Heading and Form Category */}
                <div className="col-span-7 text-center">
                  {/* Dark Banner Header Bar */}
                  <div className="bg-black text-white py-1.5 px-3 rounded-sm mb-1 inline-block w-full shadow-sm">
                    <h1 className="text-xl sm:text-2xl font-extrabold tracking-wide font-devanagari">
                      वडगाव नगरपंचायत, वडगाव जि.पुणे
                    </h1>
                  </div>
                  {/* Register Subtitle */}
                  <div className="text-center mt-0.5">
                    <h2 className="text-xs sm:text-sm font-black italic tracking-wider text-slate-800 font-sans">
                      ABSTRACT FROM ASSESMENT REGISTER
                    </h2>
                    <p className="text-[12px] font-bold text-slate-900 mt-0.5">
                      सन २०२२-२०२३ ते २०२६-२०२७ या वर्षासाठी कर आकारणीस पात्र असलेल्या इमारती आणि जमिनी यांची आकारणी सूची
                    </p>
                  </div>
                </div>

                {/* Right: Meta details & Scan QR */}
                <div className="col-span-3 flex flex-col items-end justify-between h-full pl-2 border-l border-slate-300 text-right">
                  <div className="w-full text-right text-[10px] space-y-0.5">
                    <div className="font-medium text-slate-700">
                      <span className="font-bold">Printed On -</span> ०८/०१/२०२६ १२:१९:३०
                    </div>
                    <div className="font-medium text-slate-700">
                      <span className="font-bold">Printed By -</span> 29
                    </div>
                    <div className="font-bold text-slate-900 pt-0.5">फॉर्म १४ (नियम ७४ पहा)</div>
                  </div>
                  {/* Official QR code box */}
                  <div className="flex flex-col items-center mt-1">
                    <div className="w-16 h-16 bg-white border border-slate-900 p-0.5 relative flex items-center justify-center shadow-inner">
                      <svg className="w-full h-full text-slate-900" fill="currentColor" viewBox="0 0 100 100">
                        <rect fill="black" height="28" width="28" x="5" y="5"></rect>
                        <rect fill="white" height="20" width="20" x="9" y="9"></rect>
                        <rect fill="black" height="12" width="12" x="13" y="13"></rect>
                        <rect fill="black" height="28" width="28" x="67" y="5"></rect>
                        <rect fill="white" height="20" width="20" x="71" y="9"></rect>
                        <rect fill="black" height="12" width="12" x="75" y="13"></rect>
                        <rect fill="black" height="28" width="28" x="5" y="67"></rect>
                        <rect fill="white" height="20" width="20" x="9" y="71"></rect>
                        <rect fill="black" height="12" width="12" x="13" y="75"></rect>
                        <rect height="6" width="6" x="38" y="10"></rect>
                        <rect height="6" width="6" x="48" y="10"></rect>
                        <rect height="6" width="12" x="42" y="20"></rect>
                        <rect height="8" width="8" x="38" y="38"></rect>
                        <rect height="12" width="6" x="52" y="38"></rect>
                        <rect height="6" width="10" x="20" y="42"></rect>
                        <rect height="6" width="14" x="68" y="42"></rect>
                        <rect height="6" width="16" x="42" y="56"></rect>
                        <rect height="16" width="6" x="68" y="56"></rect>
                        <rect height="12" width="12" x="80" y="66"></rect>
                        <rect height="14" width="8" x="40" y="74"></rect>
                        <rect height="8" width="14" x="56" y="76"></rect>
                      </svg>
                    </div>
                    <span className="text-[7.5px] text-slate-800 text-center font-bold tracking-tighter mt-0.5 leading-none">
                      Scan with QR Scanner<br />
                      <span className="text-[6.5px] font-normal text-slate-600">
                        Do not use UPI App Scanner
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </header>
            {/* END: HeaderSection */}

            {/* BEGIN: PropertyMasterGrid */}
            <section className="mb-2" data-purpose="property-master-table">
              <div className="overflow-x-auto">
                <table className="w-full text-center table-bordered compact-table text-[10px]">
                  <thead className="bg-slate-50 font-bold text-slate-900">
                    <tr>
                      <th className="w-[6%] py-1">वॉर्ड क्र.</th>
                      <th className="w-[7%] py-1">मालमत्ता क्र.</th>
                      <th className="w-[6%] py-1">भाग क्र.</th>
                      <th className="w-[12%] py-1">जुना मालमत्ता क्र.</th>
                      <th className="w-[9%] py-1">सीमा/ विभाग क्र.</th>
                      <th className="w-[12%] py-1">सिटी सर्व्हे क्रं/ सर्व्हे नं/ गट नं</th>
                      <th className="w-[7%] py-1">प्लॉट क्र.</th>
                      <th className="w-[9%] py-1">दुकान /फ्लॅट नं</th>
                      <th className="w-[10%] py-1">UPICID</th>
                      <th className="w-[8%] py-1">मालमत्तेचे वर्णन</th>
                      <th className="w-[7%] py-1">प्लॉट क्षेत्रफळ चौ.फु.</th>
                      <th className="w-[7%] py-1">प्लॉट क्षेत्रफळ चौ.मी.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="font-bold text-[11px] bg-white">
                      <td className="font-black text-slate-900">V१</td>
                      <td className="font-black text-slate-900">१०२</td>
                      <td>-</td>
                      <td>२७२६+४१५५</td>
                      <td>१.३.२</td>
                      <td>६</td>
                      <td>-</td>
                      <td>-</td>
                      <td className="font-mono tracking-tight font-black">V०११०२</td>
                      <td>निवासी</td>
                      <td>१४७०.००</td>
                      <td>१३६.६२७</td>
                    </tr>
                    {/* Owner Details Span Row */}
                    <tr className="text-left bg-slate-50/50">
                      <td className="p-1 border border-slate-900" colSpan={12}>
                        <div className="flex flex-wrap items-center justify-between gap-y-1 text-[10.5px]">
                          <div className="flex items-center">
                            <span className="font-bold text-slate-900 mr-1.5">
                              प्राथमिक कर धारकाचे नाव:-
                            </span>
                            <span className="text-slate-600 font-medium mr-2">श्री/श्रीमती</span>
                            <span className="font-extrabold text-slate-950">गायकवाड मंगेश गुंडाजी</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-bold text-slate-900 mr-1">
                              दुकान व इमारतीचे नाव:-
                            </span>
                            <span className="text-slate-700 font-medium">-</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                    {/* Occupier and Address Span Row */}
                    <tr className="text-left bg-white">
                      <td className="p-1 border border-slate-900" colSpan={12}>
                        <div className="flex flex-wrap items-center gap-x-8 text-[10.5px]">
                          <div className="flex items-center">
                            <span className="font-bold text-slate-900 mr-2">भोगवटदाराचे नाव:-</span>
                            <span className="text-slate-700">-</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-bold text-slate-900 mr-2">पत्ता:-</span>
                            <span className="font-bold text-slate-900">केशव नगर वडगाव मावळ</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            {/* END: PropertyMasterGrid */}

            {/* BEGIN: ValuationDetailsGrid */}
            <section className="mb-2" data-purpose="valuation-assessment-table">
              <div className="overflow-x-auto">
                <table className="w-full text-center table-bordered compact-table text-[9.5px]">
                  <thead className="bg-slate-50 font-bold text-slate-900 leading-tight">
                    <tr>
                      <th className="w-[7%] align-middle py-1" rowSpan={2}>
                        मालमत्तेचे उपयोग
                      </th>
                      <th className="w-[5%] align-middle py-1" rowSpan={2}>
                        मजला
                      </th>
                      <th className="w-[6%] align-middle py-1" rowSpan={2}>
                        मालमत्तेचे बांधकामाचे प्रकार
                      </th>
                      <th className="w-[6%] align-middle py-1" rowSpan={2}>
                        मालमत्ता बांधकामाचे अंदाजीत वर्ष
                      </th>
                      <th className="w-[6%] align-middle py-1" rowSpan={2}>
                        बांधकामाचे चटई क्षे. चौ.मी.
                      </th>
                      <th className="w-[6%] align-middle py-1" rowSpan={2}>
                        बांधकामाचे दर. चौ.मी.
                      </th>
                      <th className="w-[8%] align-middle py-1" rowSpan={2}>
                        बांधकामाचे मूल्य (अ)
                      </th>
                      <th className="w-[5%] align-middle py-1" rowSpan={2}>
                        प्लॉट.क्षे. चौ.मी.
                      </th>
                      <th className="w-[5%] align-middle py-1" rowSpan={2}>
                        जागेचे दर. चौ.मी.
                      </th>
                      <th className="w-[7%] align-middle py-1" rowSpan={2}>
                        जागेचे मूल्य (ब)
                      </th>
                      <th className="w-[8%] align-middle py-1" rowSpan={2}>
                        एकूण मूल्य (अ+ब)
                      </th>
                      <th className="w-[21%] py-0.5 border-b border-slate-900" colSpan={3}>
                        इमारत / जमिनीवरील भारांक
                      </th>
                      <th
                        className="w-[10%] align-middle py-1 bg-amber-50/60 font-black"
                        rowSpan={2}
                      >
                        एकूण भांडवली मूल्य
                      </th>
                    </tr>
                    <tr>
                      <th className="w-[7%] py-0.5">उपयोगा नुसार भारांक</th>
                      <th className="w-[7%] py-0.5">बांधकाम प्रकारावर भारांक</th>
                      <th className="w-[7%] py-0.5">इमारतीच्या वयानुसार भारांक</th>
                    </tr>
                  </thead>
                  <tbody className="font-medium text-slate-800 text-[10px]">
                    {/* Row 1: Residential Construction */}
                    <tr>
                      <td className="font-bold text-slate-900">निवासी</td>
                      <td className="font-bold">G,२</td>
                      <td>A</td>
                      <td>२०१३</td>
                      <td>१४१.५६</td>
                      <td>२३९५८</td>
                      <td className="font-semibold">३३९१४१४</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td className="font-semibold">३३९१४१४</td>
                      <td>१.००</td>
                      <td>१.००</td>
                      <td>०.९०</td>
                      <td
                        className="font-black text-[13px] text-slate-950 align-middle bg-slate-50/40"
                        rowSpan={3}
                      >
                        ३९८६७५७
                      </td>
                    </tr>
                    {/* Row 2: Non-residential */}
                    <tr>
                      <td className="font-bold text-slate-900">अतिवासी</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    {/* Row 3: Open Plot (OP) */}
                    <tr>
                      <td className="font-bold text-slate-900">OP</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>१३७</td>
                      <td>६८४०</td>
                      <td>९३४४१२</td>
                      <td className="font-semibold">९३४४१२</td>
                      <td>१.००</td>
                      <td>१.००</td>
                      <td>१.००</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            {/* END: ValuationDetailsGrid */}

            {/* BEGIN: TaxComputationSection */}
            <section
              className="mb-3 grid grid-cols-12 gap-3 items-center"
              data-purpose="tax-computation-grid"
            >
              {/* Left 10 Columns: Municipal Tax Table */}
              <div className="col-span-10">
                <div className="bg-slate-100 border-t border-l border-r border-slate-900 text-center py-1 font-bold text-slate-950 text-[11px]">
                  आकारण्यात आलेल्या करांच्या रकमा
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-center table-bordered compact-table text-[9.5px]">
                    <thead className="bg-slate-50 font-bold text-slate-900">
                      <tr>
                        <th className="py-1">सामान्य कर रु.</th>
                        <th className="py-1">दिवाबत्ती कर रु.</th>
                        <th className="py-1">वृक्ष संवर्धन कर रु.</th>
                        <th className="py-1">अग्निशमन कर रु.</th>
                        <th className="py-1">पथकर कर रु.</th>
                        <th className="py-1">उपयोग कर्ता शुल्क रु.</th>
                        <th className="py-1">शिक्षण कर रु.</th>
                        <th className="py-1">रोजगार कर रु.</th>
                        <th className="py-1">पाणीपट्टी कर रु.</th>
                        <th className="py-1">अनाधिकृत शास्ती कर रु.</th>
                        <th className="py-1 bg-amber-100/70 font-black text-[10px]">
                          एकूण कर रु.
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-[11px] font-bold text-slate-900">
                      <tr className="h-8">
                        <td>८१५०</td>
                        <td>०</td>
                        <td>२६१</td>
                        <td>१२०</td>
                        <td>०</td>
                        <td>१८०</td>
                        <td>१७४१</td>
                        <td>०</td>
                        <td>२४००</td>
                        <td>०</td>
                        <td className="bg-amber-50 font-black text-[12px] text-slate-950">१२८५२</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right 2 Columns: Azadi Ka Amrit Mahotsav Branding Motif */}
              <div className="col-span-2 flex flex-col items-center justify-center pt-1">
                <div className="w-16 sm:w-20 flex flex-col items-center">
                  <svg className="w-full h-auto drop-shadow-sm" viewBox="0 0 100 85">
                    <path d="M20,18 C40,4 70,8 82,24 C72,26 50,22 30,30 Z" fill="#f97316"></path>
                    <path
                      d="M26,33 C45,26 68,28 85,42 C75,44 52,38 34,44 Z"
                      fill="#e2e8f0"
                      stroke="#cbd5e1"
                      strokeWidth="0.5"
                    ></path>
                    <path d="M35,46 C52,40 72,44 88,58 C75,60 55,54 42,56 Z" fill="#16a34a"></path>
                    <circle cx="58" cy="68" fill="#1e3a8a" opacity="0.8" r="6"></circle>
                    <path d="M52,65 Q62,75 58,80 Q50,75 52,65" fill="#1e40af"></path>
                  </svg>
                  <div className="text-center mt-1">
                    <span className="text-[9px] font-extrabold text-[#c2410c] tracking-tight block leading-none">
                      स्वातंत्र्याचा
                    </span>
                    <span className="text-[8px] font-bold text-[#b45309] tracking-tight block leading-tight">
                      अमृत महोत्सव
                    </span>
                  </div>
                </div>
              </div>
            </section>
            {/* END: TaxComputationSection */}

            {/* BEGIN: CertificationAndSignatures */}
            <section className="border-t border-slate-900 pt-2 mb-2" data-purpose="officer-signatures">
              <div className="grid grid-cols-12 gap-3 items-end">
                {/* Left: Swachh Bharat Specs Logo & Print Date */}
                <div className="col-span-3 flex flex-col items-start justify-between">
                  <div className="flex items-center space-x-1 border border-slate-800 rounded-full px-2 py-0.5 bg-slate-50">
                    <div className="w-5 h-5 rounded-full border-2 border-slate-800 flex items-center justify-center text-[7px] font-bold">
                      स्वच्छ
                    </div>
                    <div className="w-2.5 h-[1.5px] bg-slate-800 -mx-0.5"></div>
                    <div className="w-5 h-5 rounded-full border-2 border-slate-800 flex items-center justify-center text-[7px] font-bold">
                      भारत
                    </div>
                  </div>
                  <span className="text-[8px] font-bold text-slate-800 mt-0.5 ml-1">
                    एक कदम स्वच्छता की ओर
                  </span>
                  <div className="text-[11px] font-bold text-slate-900 mt-2">दि. ८/९/२०२६</div>
                </div>

                {/* Middle: Official Note / Disclaimer Clause */}
                <div className="col-span-5 text-left px-1">
                  <div className="text-[8px] sm:text-[8.5px] text-slate-800 leading-tight border border-slate-300 p-1.5 bg-slate-50/70 rounded">
                    <p className="font-bold text-slate-900 mb-0.5">टीप:-</p>
                    <p className="mb-0.5">
                      "सदर मालमत्तेवर नगरपालिकेमार्फत केवळ कर आकारणीपुरती मर्यादित नोंद घेण्यात आली आहे, तरी हा कुठलाही मालकीहक्क किंवा त्याबाबत कोणताही कायदेशीर पुरावा ग्राह्य धरण्यात येऊ नये.
                    </p>
                    <p>
                      "मालमत्ता धारकाचे/भोगवटदाराचे नाव हे कलम क्र १११ अन्वये केवळ कर वसुली करिता मर्यादित असून यास मालकी हक्क संबंधातील पुरावा अथवा वस्तु म्हणूनच ग्राह्य धरता येणार नाही.
                    </p>
                  </div>
                </div>

                {/* Right: Officer Signature Columns */}
                <div className="col-span-4 grid grid-cols-2 gap-2 text-center text-[9.5px]">
                  {/* Assistant Tax Inspector */}
                  <div className="flex flex-col justify-end h-16 pb-0.5">
                    <div className="h-8 flex items-center justify-center">
                      <div className="w-16 h-5 border-b border-dashed border-slate-400"></div>
                    </div>
                    <div className="font-bold text-slate-900">सहा. कर निरीक्षक</div>
                    <div className="text-[8.5px] text-slate-700">वडगाव नगरपंचायत, वडगाव</div>
                  </div>
                  {/* Chief Officer */}
                  <div className="flex flex-col justify-end h-16 pb-0.5">
                    <div className="h-8 flex items-center justify-center">
                      <div className="w-16 h-5 border-b border-dashed border-slate-400"></div>
                    </div>
                    <div className="font-bold text-slate-900">मुख्याधिकारी</div>
                    <div className="text-[8.5px] text-slate-700">वडगाव नगरपंचायत, वडगाव</div>
                  </div>
                </div>
              </div>
            </section>
            {/* END: CertificationAndSignatures */}

            {/* BEGIN: FootnotesAndLegend */}
            <footer
              className="border-t border-slate-900 pt-1.5 text-[8.5px] text-slate-800 leading-relaxed"
              data-purpose="register-legend"
            >
              <div className="space-y-0.5">
                <p>
                  <strong className="font-bold text-slate-950">१) मजला :-</strong> B तळघर/बेसमेंट, G:तळमजला, M:पोटमाळा, 1:पहिला मजला, 2:दुसरा मजला या प्रकारे
                </p>
                <p>
                  <strong className="font-bold text-slate-950">२) बांधकाम प्रकार :-</strong> A आर.सी.सी. स्लॅबची घरे B विटा सिमेंटच्या भिंती विटा सिमेंटची भारवाहू संरचना C विटा सिमेंटच्या भिंती व टीन कवेलूचे छत D मातीच्या भिंती व टीन कवेलूचे छत E अस्थायी कुडाचे बांधकाम OP खुला भुखंड (प्लॉट)
                </p>
                <p>
                  <strong className="font-bold text-slate-950">३) उपयोगाचा प्रकार :-</strong> R-रहिवासी S-दुकान C-वाणिज्य (अनिवासी) EG- शासकीय शैक्षणिक इमारत, H-हॉटेल G-शासकीय D-दवाखाना T-मंदिर M-मंगल कार्यालय I-औद्योगिक B-बँक/वित्तीय संस्था TW-मोबाईल टॉवर, N-उपयोगात नाही. Y: UTILITY: इमारतीमध्ये असलेले स्नानगृह, शौचालय, जिना (Stair) /पुजाघर, पॅसेज
                </p>
              </div>
            </footer>
            {/* END: FootnotesAndLegend */}
          </div>
        </article>
        {/* END: OfficialMunicipalDocument */}
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
