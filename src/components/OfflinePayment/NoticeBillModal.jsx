import React, { useState, useEffect } from "react";

export default function NoticeBillModal({ isOpen, onClose, propertyData }) {
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
    const containerWidth = document.getElementById("document-container")?.clientWidth || 850;
    const targetWidth = 850;
    const newZoom = Math.min(Math.max((containerWidth - 60) / targetWidth, 0.6), 1.6);
    setZoom(newZoom);
    showToast(`Fit to width (${Math.round(newZoom * 100)}%)`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    showToast("Generating and downloading Notice_Bill_V01102.pdf...");
    setTimeout(() => {
      // Simulate download trigger
      const element = document.createElement("a");
      const file = new Blob([document.getElementById("printable-bill")?.innerHTML || ""], {
        type: "text/html",
      });
      element.href = URL.createObjectURL(file);
      element.download = "Notice_Bill_V01102.html";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      showToast("Downloaded: Notice_Bill_V01102.pdf");
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-900/95 overflow-hidden font-devanagari animate-in fade-in duration-200">
      {/* BEGIN: ViewerToolbar */}
      <header
        className="no-print bg-slate-900 border-b border-slate-700 px-4 py-2.5 flex items-center justify-between text-white shadow-md select-none flex-shrink-0"
        id="viewer-toolbar"
      >
        {/* Document Information & Back Navigation */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs md:text-sm font-medium transition border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
            id="btn-back"
            title="Return to Verify Property Details"
            type="button"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
            <span className="hidden sm:inline">Back to Verify Property Details</span>
          </button>
          <div className="h-5 w-px bg-slate-700 hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-red-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                fillRule="evenodd"
              ></path>
            </svg>
            <span className="font-semibold text-xs md:text-sm tracking-wide text-slate-100 truncate max-w-[220px] md:max-w-md">
              Notice Bill (मालमत्ता कर देयक) - V01102
            </span>
          </div>
        </div>

        {/* Toolbar Controls (Zoom, Fit, Print, Download, Close) */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* Zoom Controls */}
          <div className="flex items-center bg-slate-800 rounded border border-slate-700 p-0.5">
            <button
              onClick={handleZoomOut}
              className="p-1.5 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition cursor-pointer"
              id="btn-zoom-out"
              title="Zoom Out (-)"
              type="button"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 12H4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
              </svg>
            </button>
            <span
              className="text-xs font-mono px-2 text-slate-300 min-w-[48px] text-center"
              id="zoom-level"
            >
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1.5 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition cursor-pointer"
              id="btn-zoom-in"
              title="Zoom In (+)"
              type="button"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4v16m8-8H4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
              </svg>
            </button>
          </div>
          <button
            onClick={handleFitWidth}
            className="px-2 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded border border-slate-700 hidden md:inline-flex items-center gap-1 cursor-pointer"
            id="btn-fit-width"
            title="Fit to width"
            type="button"
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
            <span>Fit</span>
          </button>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs md:text-sm font-medium transition shadow-sm cursor-pointer"
            id="btn-print"
            title="Print document"
            type="button"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs md:text-sm font-medium transition shadow-sm cursor-pointer"
            id="btn-download"
            title="Download PDF"
            type="button"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
            <span className="hidden md:inline">Download</span>
          </button>

          {/* Close (X) Button */}
          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-red-600 rounded-md transition ml-1 cursor-pointer"
            id="btn-close"
            title="Close Viewer"
            type="button"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
              ></path>
            </svg>
          </button>
        </div>
      </header>
      {/* END: ViewerToolbar */}

      {/* BEGIN: DocumentCanvasWrapper */}
      <main
        className="flex-1 overflow-auto p-3 sm:p-6 md:p-8 flex justify-center items-start bg-slate-900/90 print-document-target"
        id="document-container"
      >
        {/* Printable / Scalable Document Surface (A4 Proportion) */}
        <article
          className="bg-white text-black w-full max-w-[850px] shadow-2xl border border-gray-300 p-4 sm:p-7 relative font-devanagari select-text text-sm transition-transform duration-200 origin-top"
          id="printable-bill"
          style={{ transform: `scale(${zoom})` }}
        >
          {/* Top Half (Original Counterfoil / Record Notice) */}
          <section className="border border-green-800 p-2 mb-3 bg-white">
            {/* Top Small Header */}
            <div className="flex items-center justify-between border-b pb-1">
              <div className="w-16 h-16 flex items-center justify-center">
                {/* Municipal Emblem Placeholder Logo */}
                <div className="w-14 h-14 rounded-full border border-yellow-600 bg-amber-50 flex items-center justify-center text-center p-1 leading-tight">
                  <span className="text-[9px] font-bold text-red-700">वडगाव नगरपंचायत</span>
                </div>
              </div>
              <div className="text-center flex-1 px-2">
                <h1 className="text-base sm:text-lg font-bold text-[#002B7F] tracking-tight">
                  वडगांव नगरपंचायत,वडगांव जि. पुणे
                </h1>
                <p className="text-[10px] text-gray-700 leading-tight">
                  महाराष्ट्र नगरपरिषदा, नगरपंचायती व औद्योगिक नगरी अधिनियम, १९६५ कलम १५० बंधपत्र (नमुना ४८ नियम ७७)
                </p>
                <div className="inline-block bg-[#A30000] text-white text-[11px] font-semibold px-4 py-0.5 mt-1 rounded">
                  आर्थिक वर्ष २०२६ या वर्षाकरिता मालमत्ता कर देयक
                </div>
              </div>
              <div className="text-right text-[11px] border border-gray-700 p-1 min-w-[130px]">
                <div className="flex justify-between border-b border-gray-400 pb-0.5">
                  <span className="font-bold">दि.-</span>
                  <span className="font-semibold">०४/०१/२०२६</span>
                </div>
                <div className="flex justify-between pt-0.5 text-[#A30000] font-bold">
                  <span>बिल क्र.-</span>
                  <span>V01102</span>
                </div>
              </div>
            </div>

            {/* Top Property Details Condensed */}
            <div className="grid grid-cols-3 text-[11px] gap-1 mt-1 border-b border-gray-400 pb-1">
              <div>
                <span className="font-bold">नविन वॉर्ड क्र.:-</span>{" "}
                <span className="text-red-700 font-bold">४१</span>
              </div>
              <div className="text-center">
                <span className="font-bold">नविन मालमत्ता क्र.:-</span>{" "}
                <span className="text-red-700 font-bold">१०२</span>
              </div>
              <div className="text-right">
                <span className="font-bold">सांकेतिक क्र. (UPIC ID):</span>{" "}
                <span className="text-red-700 font-bold">V01102</span>
              </div>
              <div className="col-span-2">
                <span className="font-bold">प्राथमिक करदात्याचे नाव :-</span> गायकवाड मंगेश पुंडळीक
              </div>
              <div className="text-right">
                <span className="font-bold">जुना मालमत्ता क्र :-</span> २७२६+४१५५
              </div>
              <div className="col-span-2">
                <span className="font-bold">भोगवटदाराचे नाव :-</span> श्री/श्रीमती/मे.:-
              </div>
              <div className="text-right">
                <span className="font-bold">वापरचे वर्णन :-</span> निवासी
              </div>
              <div className="col-span-2">
                <span className="font-bold">पत्ता:</span> केशव नगर वडगाव मावळ
              </div>
              <div className="text-right">
                <span className="font-bold">मोबाईल क्र.</span> ८४२१०३८३०६
              </div>
            </div>

            {/* Top Condensed Table */}
            <div className="mt-1 overflow-x-auto">
              <table className="w-full text-[10px] text-center border-collapse border border-gray-600">
                <thead>
                  <tr className="bg-gray-100 text-gray-900 font-bold">
                    <th className="border border-gray-600 p-0.5">कराचे विवरण</th>
                    <th className="border border-gray-600 p-0.5">सामान्य कर</th>
                    <th className="border border-gray-600 p-0.5">दिवाबत्ती कर</th>
                    <th className="border border-gray-600 p-0.5">वृक्ष संवर्धन कर</th>
                    <th className="border border-gray-600 p-0.5">अग्निशमन कर</th>
                    <th className="border border-gray-600 p-0.5">पथ कर</th>
                    <th className="border border-gray-600 p-0.5">स्वच्छता कर</th>
                    <th className="border border-gray-600 p-0.5">उपयोगकर्ता शुल्क</th>
                    <th className="border border-gray-600 p-0.5">पाणीपट्टी कर</th>
                    <th className="border border-gray-600 p-0.5">शिक्षण कर</th>
                    <th className="border border-gray-600 p-0.5">रोजगार कर</th>
                    <th className="border border-gray-600 p-0.5">अनाधिकृत शास्ती</th>
                    <th className="border border-gray-600 p-0.5">शास्ती रु.</th>
                    <th className="border border-gray-600 p-0.5">एकूण कर</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-600 font-bold text-left px-1">मागील मागणी रु.</td>
                    <td className="border border-gray-600"></td>
                    <td className="border border-gray-600"></td>
                    <td className="border border-gray-600"></td>
                    <td className="border border-gray-600"></td>
                    <td className="border border-gray-600"></td>
                    <td className="border border-gray-600"></td>
                    <td className="border border-gray-600"></td>
                    <td className="border border-gray-600"></td>
                    <td className="border border-gray-600"></td>
                    <td className="border border-gray-600"></td>
                    <td className="border border-gray-600"></td>
                    <td className="border border-gray-600 font-bold text-red-600">२१६</td>
                    <td className="border border-gray-600 font-bold text-red-600">२१६</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 font-bold text-left px-1">चालू मागणी रु.</td>
                    <td className="border border-gray-600 font-bold text-red-600">८१५०</td>
                    <td className="border border-gray-600"></td>
                    <td className="border border-gray-600 font-bold text-red-600">२६१</td>
                    <td className="border border-gray-600 font-bold text-red-600">१२०</td>
                    <td className="border border-gray-600"></td>
                    <td className="border border-gray-600"></td>
                    <td className="border border-gray-600 font-bold text-red-600">१८०</td>
                    <td className="border border-gray-600 font-bold text-red-600">२४००</td>
                    <td className="border border-gray-600 font-bold text-red-600">१७४१</td>
                    <td className="border border-gray-600"></td>
                    <td className="border border-gray-600"></td>
                    <td className="border border-gray-600"></td>
                    <td className="border border-gray-600 font-bold text-red-600">१२८५२</td>
                  </tr>
                  <tr className="bg-gray-50 font-bold">
                    <td className="border border-gray-600 text-left px-1">एकूण कर रु.</td>
                    <td className="border border-gray-600 text-red-600">८१५०</td>
                    <td className="border border-gray-600"></td>
                    <td className="border border-gray-600 text-red-600">२६१</td>
                    <td className="border border-gray-600 text-red-600">१२०</td>
                    <td className="border border-gray-600"></td>
                    <td className="border border-gray-600"></td>
                    <td className="border border-gray-600 text-red-600">१८०</td>
                    <td className="border border-gray-600 text-red-600">२४००</td>
                    <td className="border border-gray-600 text-red-600">१७४१</td>
                    <td className="border border-gray-600"></td>
                    <td className="border border-gray-600"></td>
                    <td className="border border-gray-600 text-red-600">२१६</td>
                    <td className="border border-gray-600 text-red-600">१३०६८</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Top Counterfoil Signatures */}
            <div className="flex justify-between items-center text-[10px] mt-2 pt-1 font-semibold text-gray-700">
              <div>बिल मिळणाऱ्याची दिनांक :- .................................................</div>
              <div>बिल देणाऱ्याचे नाव व सही:- .................................................</div>
            </div>
          </section>

          {/* Perforation Divider Line */}
          <div className="border-dotted-custom my-3 relative flex items-center justify-center">
            <span className="bg-white px-3 text-[10px] text-gray-500 font-mono">
              ✂ कृपया येथून कापा (Tear Here)
            </span>
          </div>

          {/* BEGIN: MainOfficialDemandNotice (Lower Full Bill) */}
          <section className="border-2 border-green-800 p-2.5 sm:p-3 bg-white">
            {/* Document Header */}
            <div className="flex items-center justify-between border-b pb-2">
              {/* Nagar Panchayat Emblem */}
              <div className="w-18 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-yellow-600 bg-amber-50/80 flex flex-col items-center justify-center p-1 text-center shadow-inner">
                  <svg
                    className="w-7 h-7 text-amber-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    ></path>
                  </svg>
                  <span className="text-[8px] font-extrabold text-[#A30000] tracking-tighter uppercase leading-none mt-0.5">
                    वडगाव नगरपंचायत
                  </span>
                </div>
              </div>

              {/* Main Title & Act Name */}
              <div className="text-center flex-1 px-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-[#002B7F] tracking-tight">
                  वडगांव नगरपंचायत,वडगांव जि. पुणे
                </h2>
                <p className="text-[11px] sm:text-xs text-gray-800 font-medium">
                  महाराष्ट्र नगरपरिषदा, नगरपंचायती व औद्योगिक नगरी अधिनियम, १९६५ कलम १५० बंधपत्र (नमुना ४८ नियम ७७)
                </p>
                <div className="inline-block bg-[#A30000] text-white text-xs sm:text-sm font-bold px-5 py-0.5 mt-1 rounded shadow-sm">
                  आर्थिक वर्ष २०२६ या वर्षाकरिता मालमत्ता कर देयक
                </div>
              </div>

              {/* Bill No & Quick Identifier */}
              <div className="border-2 border-red-600 rounded px-2 py-1 text-right min-w-[130px] bg-red-50/30">
                <div className="text-xs text-gray-700 font-bold">
                  बिल क्र.-{" "}
                  <span className="text-[#A30000] font-extrabold text-sm sm:text-base">
                    V01102
                  </span>
                </div>
              </div>
            </div>

            {/* Property Details Grid Table */}
            <div className="mt-2 border border-red-600 text-xs">
              <div className="grid grid-cols-6 border-b border-red-400 bg-red-50/40">
                <div className="p-1 font-bold border-r border-red-300 text-[#A30000]">
                  नविन वॉर्ड क्र.
                </div>
                <div className="p-1 font-extrabold text-red-600 border-r border-red-300 text-center">
                  ४१
                </div>
                <div className="p-1 font-bold border-r border-red-300 text-[#A30000]">
                  नविन मालमत्ता क्र.
                </div>
                <div className="p-1 font-extrabold text-red-600 border-r border-red-300 text-center">
                  १०२
                </div>
                <div className="p-1 font-bold border-r border-red-300 text-[#A30000]">
                  देयक दिनांक
                </div>
                <div className="p-1 font-bold text-center">०३/०१/२०२६</div>
              </div>
              <div className="grid grid-cols-6 border-b border-red-400">
                <div className="p-1 font-bold border-r border-red-300 text-[#A30000]">
                  मालमत्तेचे वर्णन
                </div>
                <div className="p-1 font-semibold border-r border-red-300 text-center">
                  निवासी
                </div>
                <div className="p-1 font-bold border-r border-red-300 text-[#A30000]">
                  जुना मालमत्ता क्र.
                </div>
                <div className="p-1 font-semibold border-r border-red-300 text-center">
                  २७२६+४१५५
                </div>
                <div className="p-1 font-bold border-r border-red-300 text-[#A30000] col-span-1">
                  सांकेतिक क्र. (UPIC ID):
                </div>
                <div className="p-1 font-extrabold text-red-600 text-center text-sm">
                  V01102
                </div>
              </div>
              <div className="grid grid-cols-6 border-b border-red-400">
                <div className="p-1 font-bold border-r border-red-300 text-[#A30000]">
                  प्राथमिक करदात्याचे नाव
                </div>
                <div className="p-1 font-semibold col-span-2 border-r border-red-300">
                  श्री/श्रीमती/मे:- <span className="font-bold text-gray-900">गायकवाड मंगेश पुंडळीक</span>
                </div>
                <div className="p-1 font-bold border-r border-red-300 text-[#A30000]">
                  भोगवटदाराचे नाव
                </div>
                <div className="p-1 font-semibold col-span-2">श्री/श्रीमती/मे:-</div>
              </div>
              <div className="grid grid-cols-6">
                <div className="p-1 font-bold border-r border-red-300 text-[#A30000]">
                  पत्ता
                </div>
                <div className="p-1 font-semibold col-span-3 border-r border-red-300">
                  केशव नगर वडगाव मावळ
                </div>
                <div className="p-1 font-bold border-r border-red-300 text-[#A30000]">
                  मोबाईल क्र.
                </div>
                <div className="p-1 font-bold text-center">८४२१०३८३०६</div>
              </div>
            </div>

            {/* Middle Content: Tax Breakdown (Left) & Payment / Swachh Bharat (Right) */}
            <div className="mt-3 grid grid-cols-1 md:grid-cols-12 gap-2">
              {/* LEFT SIDE: Tax Component Breakdown Table (8 cols) */}
              <div className="md:col-span-8 overflow-x-auto">
                <table className="w-full text-xs border-collapse border border-red-600 text-center">
                  <thead>
                    <tr className="bg-amber-100/60 text-[#A30000] font-bold border-b border-red-600">
                      <th className="border-r border-red-600 p-1 text-left">कराचे नाव</th>
                      <th className="border-r border-red-600 p-1 leading-tight">
                        ३१ मार्च २०२५<br />पर्यंत मागील थकबाकी रु.
                      </th>
                      <th className="border-r border-red-600 p-1">
                        चालू मागणी रु.<br />
                        <span className="text-[10px] font-normal font-sans">सन</span>
                      </th>
                      <th className="border-r border-red-600 p-1 text-[10px] leading-tight">
                        चालू वसुली (सवलतसह)<br />
                        <span className="font-normal text-[9px]">पावती क्र. पावती दि. शिल्लक</span>
                      </th>
                      <th className="p-1 font-extrabold text-[#A30000]">एकूण मागणी रु.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-red-200">
                    <tr className="hover:bg-gray-50">
                      <td className="border-r border-red-400 p-1 font-bold text-left text-[#A30000]">
                        सामान्य कर रु.
                      </td>
                      <td className="border-r border-red-400 p-1">०</td>
                      <td className="border-r border-red-400 p-1 font-bold text-blue-900">८१५०</td>
                      <td className="border-r border-red-400 p-1 text-green-700 font-bold">०</td>
                      <td className="p-1 font-bold text-red-600">८१५०</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border-r border-red-400 p-1 font-bold text-left text-[#A30000]">
                        दिवाबत्ती कर रु.
                      </td>
                      <td className="border-r border-red-400 p-1">०</td>
                      <td className="border-r border-red-400 p-1 font-bold text-blue-900">०</td>
                      <td className="border-r border-red-400 p-1 text-green-700 font-bold">०</td>
                      <td className="p-1 font-bold text-red-600">०</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border-r border-red-400 p-1 font-bold text-left text-[#A30000]">
                        वृक्ष संवर्धन कर रु.
                      </td>
                      <td className="border-r border-red-400 p-1">०</td>
                      <td className="border-r border-red-400 p-1 font-bold text-blue-900">२६१</td>
                      <td className="border-r border-red-400 p-1 text-green-700 font-bold">०</td>
                      <td className="p-1 font-bold text-red-600">२६१</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border-r border-red-400 p-1 font-bold text-left text-[#A30000]">
                        अग्निशमन कर रु.
                      </td>
                      <td className="border-r border-red-400 p-1">०</td>
                      <td className="border-r border-red-400 p-1 font-bold text-blue-900">१२०</td>
                      <td className="border-r border-red-400 p-1 text-green-700 font-bold">०</td>
                      <td className="p-1 font-bold text-red-600">१२०</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border-r border-red-400 p-1 font-bold text-left text-[#A30000]">
                        पथकर रु.
                      </td>
                      <td className="border-r border-red-400 p-1">०</td>
                      <td className="border-r border-red-400 p-1 font-bold text-blue-900">०</td>
                      <td className="border-r border-red-400 p-1 text-green-700 font-bold">०</td>
                      <td className="p-1 font-bold text-red-600">०</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border-r border-red-400 p-1 font-bold text-left text-[#A30000]">
                        स्वच्छता कर रु.
                      </td>
                      <td className="border-r border-red-400 p-1">०</td>
                      <td className="border-r border-red-400 p-1 font-bold text-blue-900">०</td>
                      <td className="border-r border-red-400 p-1 text-green-700 font-bold">०</td>
                      <td className="p-1 font-bold text-red-600">०</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border-r border-red-400 p-1 font-bold text-left text-[#A30000]">
                        उपयोगकर्ता शुल्क रु.
                      </td>
                      <td className="border-r border-red-400 p-1">०</td>
                      <td className="border-r border-red-400 p-1 font-bold text-blue-900">१८०</td>
                      <td className="border-r border-red-400 p-1 text-green-700 font-bold">०</td>
                      <td className="p-1 font-bold text-red-600">१८०</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border-r border-red-400 p-1 font-bold text-left text-[#A30000]">
                        पाणीपट्टी कर रु.
                      </td>
                      <td className="border-r border-red-400 p-1">०</td>
                      <td className="border-r border-red-400 p-1 font-bold text-blue-900">२४००</td>
                      <td className="border-r border-red-400 p-1 text-green-700 font-bold">०</td>
                      <td className="p-1 font-bold text-red-600">२४००</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border-r border-red-400 p-1 font-bold text-left text-[#A30000]">
                        शिक्षण कर रु.
                      </td>
                      <td className="border-r border-red-400 p-1">०</td>
                      <td className="border-r border-red-400 p-1 font-bold text-blue-900">१७४१</td>
                      <td className="border-r border-red-400 p-1 text-green-700 font-bold">०</td>
                      <td className="p-1 font-bold text-red-600">१७४१</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border-r border-red-400 p-1 font-bold text-left text-[#A30000]">
                        रोजगार कर रु.
                      </td>
                      <td className="border-r border-red-400 p-1">०</td>
                      <td className="border-r border-red-400 p-1 font-bold text-blue-900">०</td>
                      <td className="border-r border-red-400 p-1 text-green-700 font-bold">०</td>
                      <td className="p-1 font-bold text-red-600">०</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border-r border-red-400 p-1 font-bold text-left text-[#A30000]">
                        अनाधिकृत इमारत शास्ती कर रु.
                      </td>
                      <td className="border-r border-red-400 p-1">०</td>
                      <td className="border-r border-red-400 p-1 font-bold text-blue-900">०</td>
                      <td className="border-r border-red-400 p-1 text-green-700 font-bold">०</td>
                      <td className="p-1 font-bold text-red-600">०</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border-r border-red-400 p-1 font-bold text-left text-[#A30000]">
                        शास्ती रु.
                      </td>
                      <td className="border-r border-red-400 p-1 font-bold text-red-600">२१६</td>
                      <td className="border-r border-red-400 p-1 font-bold text-blue-900">०</td>
                      <td className="border-r border-red-400 p-1 text-green-700 font-bold">०</td>
                      <td className="p-1 font-bold text-red-600">२१६</td>
                    </tr>
                    {/* Total Row */}
                    <tr className="bg-red-50/70 border-t-2 border-red-600 font-extrabold text-sm">
                      <td className="border-r border-red-600 p-1.5 text-left text-[#A30000]">
                        एकूण कर रु.
                      </td>
                      <td className="border-r border-red-600 p-1.5 text-red-600">२१६</td>
                      <td className="border-r border-red-600 p-1.5 text-blue-900">१२८५२</td>
                      <td className="border-r border-red-600 p-1.5 text-green-700">०</td>
                      <td className="p-1.5 text-red-700 text-base">१३०६८</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* RIGHT SIDE: Payment QR Code, Digital Gateway, UPIC & Campaign Banner (4 cols) */}
              <div className="md:col-span-4 flex flex-col justify-between border-2 border-red-600 p-2 rounded bg-white">
                {/* Payment Channel Box */}
                <div className="text-center">
                  <div className="font-bold text-xs text-[#A30000] pb-1 border-b border-gray-300">
                    सुलभ पेमेंट पर्याय
                  </div>
                  {/* Payment Logos Row */}
                  <div className="flex items-center justify-center gap-2 my-2 py-1 bg-gray-50 rounded border border-gray-200">
                    <span className="font-extrabold text-xs tracking-wider text-slate-800">
                      UPI<span className="text-orange-500 font-bold">/</span>GPay
                    </span>
                    <span className="text-purple-700 font-bold text-xs flex items-center">
                      <span className="w-3.5 h-3.5 rounded-full bg-purple-700 text-white text-[9px] flex items-center justify-center mr-0.5">
                        पे
                      </span>
                      PhonePe
                    </span>
                    <span className="text-blue-800 font-bold text-[10px] border border-blue-300 px-1 rounded">
                      Net Banking
                    </span>
                  </div>

                  {/* Top QR Code for Citizen Payment */}
                  <div className="flex flex-col items-center justify-center my-1.5">
                    <div className="p-1.5 bg-white border border-gray-400 rounded shadow-sm">
                      <svg
                        className="w-24 h-24"
                        fill="none"
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect fill="white" height="100" width="100"></rect>
                        <path
                          d="M10 10h30v30h-30zM15 15v20h20v-20zM20 20h10v10h-10zM60 10h30v30h-30zM65 15v20h20v-20zM70 20h10v10h-10zM10 60h30v30h-30zM15 65v20h20v-20zM20 70h10v10h-10zM45 15h10v10h-10zM45 35h10v15h-10zM15 45h10v10h-10zM30 45h15v10h-15zM50 60h10v10h-10zM60 50h15v10h-15zM75 60h15v10h-15zM80 45h10v15h-10zM45 75h10v15h-10zM65 75h10v20h-10zM80 75h10v10h-10z"
                          fill="black"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold text-red-700 mt-1">
                      Scan &amp; Pay (For Citizen)
                    </span>
                  </div>

                  {/* Official Online Portal Red Banner */}
                  <div className="bg-[#A30000] text-white py-1 px-1 rounded shadow-sm text-center my-1">
                    <div className="text-[9px] font-semibold tracking-wide">
                      Pay Property Tax Online On
                    </div>
                    <div className="text-[11px] font-extrabold underline tracking-tight">
                      https://vadgaonmc.org
                    </div>
                  </div>
                  <div className="text-xs font-bold text-gray-800 my-1">
                    (UPIC ID):{" "}
                    <span className="text-[#A30000] font-extrabold text-sm">V01102</span>
                  </div>
                </div>

                {/* Lower Graphic: Swachhta Hi Seva Banner */}
                <div className="mt-2 border border-amber-500 rounded p-1 bg-amber-50/70 flex items-center gap-2">
                  <div className="w-16 h-16 flex items-center justify-center p-1 bg-white border border-gray-300 rounded shrink-0">
                    <svg className="w-full h-full" viewBox="0 0 100 80">
                      <circle cx="30" cy="35" fill="none" r="22" stroke="#ea580c" strokeWidth="4"></circle>
                      <circle cx="70" cy="35" fill="none" r="22" stroke="#ea580c" strokeWidth="4"></circle>
                      <line stroke="#ea580c" strokeWidth="4" x1="52" x2="48" y1="35" y2="35"></line>
                      <text fill="#002B7F" fontSize="14" fontWeight="bold" x="21" y="40">
                        स्वच्छ
                      </text>
                      <text fill="#002B7F" fontSize="14" fontWeight="bold" x="61" y="40">
                        भारत
                      </text>
                      <path d="M10 70 Q 50 55 90 70" fill="none" stroke="#16a34a" strokeWidth="3"></path>
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-[#A30000] font-extrabold text-xs leading-tight">
                      स्वच्छता हीच सेवा
                    </div>
                    <div className="text-[9px] text-gray-700 font-semibold leading-tight mt-0.5">
                      लोकसहभागातून स्वच्छतेकडे
                    </div>
                    <div className="text-[8px] text-gray-500 mt-1">
                      वडगाव नगरपंचायत स्वच्छ भारत अभियान
                    </div>
                  </div>
                </div>

                {/* Office Use Only Stamp Box */}
                <div className="mt-2 text-center border-t border-gray-300 pt-1">
                  <span className="text-[9px] font-mono text-red-600 font-bold border border-red-400 px-2 py-0.5 rounded">
                    Office Use Only
                  </span>
                </div>
              </div>
            </div>

            {/* Statutory Terms and Instructions in Marathi */}
            <footer className="mt-3 border-t border-gray-400 pt-1.5 text-[9px] leading-relaxed text-gray-700 font-medium space-y-1">
              <p>
                <strong className="text-[#A30000]">टिप:- १)</strong> महाराष्ट्र नगरपरिषदा, नगरपंचायती व औद्योगिक नगरी अधिनियम, १९६५ नुसार नगरपरिषदेचा कर आर्थिक वर्षाच्या सुरुवातीला अर्थात १ एप्रिल रोजी देय होतो. आपण त्वरित कर भरणा करून नगरपरिषद विकासात हातभार लावावा ही नम्र विनंती.
              </p>
              <p>
                <strong className="text-[#A30000]">२)</strong> विहित मुदतीत उपरोक्त रक्कम न भरल्यास कलम १५०-ब (१) अन्वये एकूण उर्वरित रक्कमेवर २% प्रमाणे शास्ती आकारण्यात येईल व कर रक्कम वसूल करण्याकरिता पुढील कायदेशीर कारवाई करण्यात येईल.
              </p>
              <p>
                <strong className="text-[#A30000]">३)</strong> सदर बिल मिळण्याबाबत काही तक्रार असल्यास बिल प्राप्त झाल्यापासून १५ दिवसांच्या आत मुख्याधिकारी यांचेकडे लेखी स्वरूपात दाखल करावी, मुदतीनंतर आलेल्या अर्जाची दखल घेतली जाणार नाही.
              </p>

              {/* Signature Section in Lower Bill */}
              <div className="flex justify-between items-end pt-5 text-[10px] text-gray-800 font-bold">
                <div>
                  <span>करदात्याची स्वाक्षरी / अंगठा: .......................................</span>
                </div>
                <div className="text-center">
                  <div className="font-extrabold text-[#A30000]">मुख्याधिकारी / कर निरीक्षक</div>
                  <div className="text-[9px] text-gray-600 font-normal">
                    वडगांव नगरपंचायत, वडगांव जि. पुणे
                  </div>
                </div>
              </div>
            </footer>
          </section>
          {/* END: MainOfficialDemandNotice */}
        </article>
      </main>
      {/* END: DocumentCanvasWrapper */}

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
