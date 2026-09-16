import React, { useState, useEffect } from "react";

export default function CounterReceiptModal({
  isOpen,
  onClose,
  receiptData,
}) {
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

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 1.4));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.6));

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    showToast("Generating and downloading Receipt_No_144.pdf...");
    setTimeout(() => {
      const element = document.createElement("a");
      const file = new Blob([document.getElementById("receipt-container")?.innerHTML || ""], {
        type: "text/html",
      });
      element.href = URL.createObjectURL(file);
      element.download = "Receipt_No_144.html";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      showToast("Downloaded: Receipt_No_144.pdf");
    }, 1200);
  };

  // Dynamic values or defaults matching template
  const payerName =
    receiptData?.ownerName ||
    "देवयानी संजय कामत,सिद्धेश संजय कामत,नीता पांडुरंग फुगरे";
  const propNo = receiptData?.propertyNo || "१०४";
  const wardNo = receiptData?.wardNo || "V3";
  const oldPropNo = receiptData?.oldPropNo || "१६२५";
  const paidAmount = receiptData?.amount || "५";
  const amountWords = receiptData?.amountWords || "पाच रुपये फक्त मिळाले.";
  const receiptNo = receiptData?.receiptNo || "१४४";
  const bookNo = receiptData?.bookNo || "२०२६VDC१";

  const renderReceiptContent = (copyType) => (
    <article
      className="w-1/2 border-2 border-blue-900 p-2.5 flex flex-col justify-between text-[11px] leading-tight bg-white"
      data-purpose={copyType === "कार्यालयीन प्रत" ? "office-copy" : "customer-copy"}
    >
      {/* Receipt Header */}
      <div>
        <div className="flex justify-between items-start mb-1">
          {/* Official Emblem Placeholder */}
          <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center p-0.5 border border-slate-200 rounded">
            <svg className="w-full h-full text-amber-700 fill-current" viewBox="0 0 100 100">
              <circle cx="50" cy="50" fill="#fef3c7" r="45" stroke="#b45309" strokeWidth="3"></circle>
              <path
                d="M50 15 L58 35 L80 35 L62 48 L69 70 L50 56 L31 70 L38 48 L20 35 L42 35 Z"
                fill="#d97706"
              ></path>
              <circle cx="50" cy="50" fill="#991b1b" r="14"></circle>
              <text fill="#78350f" fontSize="9" fontWeight="bold" textAnchor="middle" x="50" y="88">
                महाराष्ट्र शासन
              </text>
            </svg>
          </div>
          {/* Central Titles */}
          <div className="text-center flex-1 px-1">
            <p className="font-bold text-[13px] tracking-wide text-slate-900">नमुना क्र.४९</p>
            <p className="text-[9px] text-slate-700">नियम क्र.७४(१), ८३(४), ८५(४) व ९६(४) पहा</p>
            <h2 className="font-bold text-[16px] text-red-700 leading-snug tracking-normal">
              वडगांव नगरपंचायत, वडगांव जि. पुणे
            </h2>
            <h3 className="font-bold text-[13px] text-blue-900">
              करांची पावती (आर्थिक वर्ष २०२६-२०२७ )
            </h3>
          </div>
          {/* QR Code Verification Block */}
          <div className="w-14 h-14 flex-shrink-0 border border-black p-0.5 bg-white flex flex-col items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 25 25">
              <rect fill="black" height="7" width="7" x="0" y="0"></rect>
              <rect fill="white" height="5" width="5" x="1" y="1"></rect>
              <rect fill="black" height="3" width="3" x="2" y="2"></rect>
              <rect fill="black" height="7" width="7" x="18" y="0"></rect>
              <rect fill="white" height="5" width="5" x="19" y="1"></rect>
              <rect fill="black" height="3" width="3" x="20" y="2"></rect>
              <rect fill="black" height="7" width="7" x="0" y="18"></rect>
              <rect fill="white" height="5" width="5" x="1" y="19"></rect>
              <rect fill="black" height="3" width="3" x="2" y="20"></rect>
              <rect fill="black" height="2" width="2" x="9" y="2"></rect>
              <rect fill="black" height="2" width="3" x="13" y="4"></rect>
              <rect fill="black" height="3" width="3" x="9" y="8"></rect>
              <rect fill="black" height="2" width="4" x="14" y="9"></rect>
              <rect fill="black" height="2" width="3" x="3" y="10"></rect>
              <rect fill="black" height="3" width="7" x="9" y="13"></rect>
              <rect fill="black" height="4" width="4" x="18" y="12"></rect>
              <rect fill="black" height="3" width="3" x="10" y="18"></rect>
              <rect fill="black" height="4" width="5" x="15" y="19"></rect>
            </svg>
          </div>
        </div>

        {/* Receipt Meta Bar 1 */}
        <div className="flex justify-between items-center text-[10.5px] border-t border-b border-black py-0.5 mt-1 font-semibold">
          <div>
            <span className="text-red-700">पु.क्र. :-</span> {bookNo}
          </div>
          <div>
            <span className="text-red-700">पा.क्र.:</span> {receiptNo}
          </div>
          <div className="font-bold underline text-black">Counter Payment Receipt</div>
          <div>
            <span className="text-red-700 font-normal">रोख</span>
          </div>
        </div>

        {/* Receipt Meta Bar 2 */}
        <div className="flex justify-between items-center text-[10.5px] py-0.5 border-b border-black font-semibold">
          <div>
            <span className="text-red-700">वॉर्ड क्र.-</span> {wardNo}
          </div>
          <div>
            <span className="text-red-700">मालमत्ता क्र.-</span> {propNo}
          </div>
          <div>
            <span className="text-red-700">भाग क्र.-</span>
          </div>
          <div>
            <span className="text-slate-800">जुना मिळकत क्र.-</span> {oldPropNo}
          </div>
          <div className="text-red-700 font-bold">{copyType}</div>
        </div>

        {/* Tax Payer and Property Details */}
        <div className="space-y-0.5 text-[10px] sm:text-[10.5px] py-1 border-b border-black">
          <div>
            <span className="text-red-700 font-medium">प्राथमिक कर धारकाचे नाव /श्री/श्रीमती:-</span>
            <span className="font-bold text-black ml-1">{payerName}</span>
          </div>
          <div>
            <span className="text-red-700 font-medium">भोगवटाधारकाचे नाव/श्री/श्रीमती:-</span>
          </div>
          <div>
            <span className="text-red-700 font-medium">हस्ते :-</span>
          </div>
          <div>
            <span className="text-red-700 font-medium">पत्ता:-</span>
            <span className="font-bold ml-1">केशव नगर वडगाव मावळ</span>
          </div>
          <div className="leading-tight pt-0.5">
            यांच्याकडून सन <span className="font-semibold">१-एप्रिल २०२६</span> ते{" "}
            <span className="font-semibold">३१-मार्च २०२७</span> या वर्षाच्या पुढील करापोटी रक्कम रु{" "}
            <span className="font-bold">{paidAmount}</span>
          </div>
          <div>
            <span className="text-red-700 font-bold">अक्षरी:-</span>
            <span className="font-bold ml-1">{amountWords}</span>
          </div>
        </div>
      </div>

      {/* Tax Table (18 Rows) */}
      <div className="my-1 border border-black">
        <table className="w-full text-center border-collapse text-[10px]">
          <thead>
            <tr className="font-bold border-b border-black bg-slate-50 text-blue-900">
              <th className="border-r border-black w-9 py-0.5">अ.क्र.</th>
              <th className="border-r border-black text-center py-0.5">कराचे नाव</th>
              <th className="border-r border-black w-24 py-0.5">थकबाकी वसुली</th>
              <th className="border-r border-black w-20 py-0.5">चालू वसुली</th>
              <th className="w-16 py-0.5">एकूण</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black text-black">
            <tr>
              <td className="border-r border-black font-bold">१</td>
              <td className="border-r border-black text-left pl-2 text-red-700 font-medium">
                सामान्य कर रु.
              </td>
              <td className="border-r border-black"></td>
              <td className="border-r border-black font-bold">{paidAmount}</td>
              <td className="font-bold">{paidAmount}</td>
            </tr>
            <tr>
              <td className="border-r border-black font-bold">२</td>
              <td className="border-r border-black text-left pl-2 text-red-700">शिक्षण कर रु.</td>
              <td className="border-r border-black"></td>
              <td className="border-r border-black"></td>
              <td></td>
            </tr>
            <tr>
              <td className="border-r border-black font-bold">३</td>
              <td className="border-r border-black text-left pl-2 text-red-700">रोजगार कर रु.</td>
              <td className="border-r border-black"></td>
              <td className="border-r border-black"></td>
              <td></td>
            </tr>
            <tr>
              <td className="border-r border-black font-bold">४</td>
              <td className="border-r border-black text-left pl-2 text-red-700">
                उपयोगकर्ता शुल्क रु.
              </td>
              <td className="border-r border-black"></td>
              <td className="border-r border-black"></td>
              <td></td>
            </tr>
            <tr>
              <td className="border-r border-black font-bold">५</td>
              <td className="border-r border-black text-left pl-2 text-red-700">पथकर कर रु.</td>
              <td className="border-r border-black"></td>
              <td className="border-r border-black"></td>
              <td></td>
            </tr>
            <tr>
              <td className="border-r border-black font-bold">६</td>
              <td className="border-r border-black text-left pl-2 text-red-700">वृक्ष संवर्धन कर रु</td>
              <td className="border-r border-black"></td>
              <td className="border-r border-black"></td>
              <td></td>
            </tr>
            <tr>
              <td className="border-r border-black font-bold">७</td>
              <td className="border-r border-black text-left pl-2 text-red-700">स्वच्छता कर रु.</td>
              <td className="border-r border-black"></td>
              <td className="border-r border-black"></td>
              <td></td>
            </tr>
            <tr>
              <td className="border-r border-black font-bold">८</td>
              <td className="border-r border-black text-left pl-2 text-red-700">अग्नि शमन कर रु</td>
              <td className="border-r border-black"></td>
              <td className="border-r border-black"></td>
              <td></td>
            </tr>
            <tr>
              <td className="border-r border-black font-bold">९</td>
              <td className="border-r border-black text-left pl-2 text-red-700">दिवाबत्ती कर रु</td>
              <td className="border-r border-black"></td>
              <td className="border-r border-black"></td>
              <td></td>
            </tr>
            <tr>
              <td className="border-r border-black font-bold">१०</td>
              <td className="border-r border-black text-left pl-2 text-red-700">पाणीपट्टी कर रु.</td>
              <td className="border-r border-black"></td>
              <td className="border-r border-black"></td>
              <td></td>
            </tr>
            <tr>
              <td className="border-r border-black font-bold">११</td>
              <td className="border-r border-black text-left pl-2 text-red-700">
                अनाधिकृत शास्ती कर रु.
              </td>
              <td className="border-r border-black"></td>
              <td className="border-r border-black"></td>
              <td></td>
            </tr>
            <tr>
              <td className="border-r border-black font-bold">१२</td>
              <td className="border-r border-black text-left pl-2 text-red-700">
                थकीत रक्कमेवरील शास्ती रु
              </td>
              <td className="border-r border-black"></td>
              <td className="border-r border-black"></td>
              <td></td>
            </tr>
            <tr>
              <td className="border-r border-black font-bold">१३</td>
              <td className="border-r border-black text-left pl-2 text-red-700 font-bold">
                एकूण भरावयाची रक्कम रु
              </td>
              <td className="border-r border-black"></td>
              <td className="border-r border-black font-bold">{paidAmount}</td>
              <td className="font-bold">{paidAmount}</td>
            </tr>
            <tr>
              <td className="border-r border-black font-bold">१४</td>
              <td className="border-r border-black text-left pl-2 text-red-700">एकूण करात सूट</td>
              <td className="border-r border-black"></td>
              <td className="border-r border-black"></td>
              <td></td>
            </tr>
            <tr>
              <td className="border-r border-black font-bold">१५</td>
              <td className="border-r border-black text-left pl-2 text-red-700 font-bold">
                सूट वजा नंतर एकूण रु.
              </td>
              <td className="border-r border-black"></td>
              <td className="border-r border-black font-bold">{paidAmount}</td>
              <td className="font-bold">{paidAmount}</td>
            </tr>
            <tr>
              <td className="border-r border-black font-bold">१६</td>
              <td className="border-r border-black text-left pl-2 text-red-700">
                अग्रीम रक्कम /इतर कर रु.
              </td>
              <td className="border-r border-black"></td>
              <td className="border-r border-black"></td>
              <td></td>
            </tr>
            <tr>
              <td className="border-r border-black font-bold">१७</td>
              <td className="border-r border-black text-left pl-2 text-red-700 font-bold">
                अग्रीम रक्कम नंतर एकूण भरणा
              </td>
              <td className="border-r border-black"></td>
              <td className="border-r border-black font-bold">{paidAmount}</td>
              <td className="font-bold">{paidAmount}</td>
            </tr>
            <tr>
              <td className="border-r border-black font-bold">१८</td>
              <td className="border-r border-black text-left pl-2 text-red-700 font-bold">
                एकूण भरणा रु.
              </td>
              <td className="border-r border-black"></td>
              <td className="border-r border-black font-bold">{paidAmount}</td>
              <td className="font-bold">{paidAmount}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bottom Legal Note and Signatures */}
      <div>
        <div className="border border-black p-1 text-[8px] leading-tight text-slate-800 mb-1">
          <span className="font-bold">टीप:</span> १) सदर वसुली हि २०२६-२०२७ वर्षाच्या थकबाकी व
          करमुल्यांकनाच्या समायोजनाच्या अधीन राहून घेण्यात येत आहे. २) मालमत्ता धारकाचे/भोगवटदाराचे
          नाव हे कलम १११ अन्वये केवळ कर वसुली करिता मर्यादित असून यात मालकी हक्क संबंधातील पुरावा
          अथवा दान म्हणून ग्राह्य धरता येणार नाही.
        </div>
        <div className="flex justify-between items-end text-[9px] pt-1 leading-snug">
          <div>
            <p>
              <span className="font-semibold">दिनांक:</span> ०१-०१-२०२६ १२:५५PM
            </p>
            <p className="font-bold text-black">Printed By - VIJAY BHIMRAO JADHAV</p>
            <p>
              <span className="font-semibold">Printed On -</span> ०१/०१/२०२६ १२:५५:४८
            </p>
          </div>
          <div className="text-right">
            <div className="h-6 flex items-end justify-end">
              <span className="italic text-slate-400 text-[8px]">हस्ताक्षरीत / Verified</span>
            </div>
            <p className="font-bold text-black border-t border-black pt-0.5">
              कर निरीक्षक / कर संकलक - VIJAY BHIMRAO JADHAV
            </p>
          </div>
        </div>
      </div>
    </article>
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-800 overflow-hidden font-mukta text-slate-900 antialiased animate-in fade-in duration-200">
      {/* BEGIN: TopNavigationBar */}
      <header className="no-print sticky top-0 z-50 bg-slate-900 border-b border-slate-700 shadow-md px-4 py-2.5 sm:px-6 flex-shrink-0 select-none">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left: Back Navigation and Document Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-600 transition cursor-pointer"
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
              मागे (Back)
            </button>
            <div className="border-l border-slate-700 pl-3">
              <h1 className="text-sm sm:text-base font-bold text-white leading-tight">
                करांची पावती (Counter Payment Receipt) - नमुना क्र. ४९
              </h1>
              <p className="text-xs text-slate-400">
                वडगाव नगरपंचायत, वडगाव जि. पुणे | आर्थिक वर्ष २०२६-२०२७
              </p>
            </div>
          </div>

          {/* Right: Zoom, Download, and Print Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="hidden md:flex items-center bg-slate-800 rounded-md border border-slate-700 p-0.5 text-xs text-slate-200 mr-2">
              <button
                onClick={handleZoomOut}
                className="px-2 py-1 hover:bg-slate-700 rounded text-slate-300 font-bold cursor-pointer"
                title="Zoom Out"
                type="button"
              >
                -
              </button>
              <span className="px-2 font-mono text-slate-300" id="zoom-level-text">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="px-2 py-1 hover:bg-slate-700 rounded text-slate-300 font-bold cursor-pointer"
                title="Zoom In"
                type="button"
              >
                +
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow transition cursor-pointer"
              type="button"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
              </svg>
              पावती प्रिंट करा (Print Receipt)
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow transition cursor-pointer"
              type="button"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
              </svg>
              PDF डाउनलोड (Download)
            </button>

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
        </div>
      </header>
      {/* END: TopNavigationBar */}

      {/* BEGIN: ReceiptWorkspace */}
      <main className="flex-1 overflow-auto p-3 sm:p-6 flex justify-center items-start bg-slate-900/90 print-document-target">
        <div
          className="transition-transform duration-200 origin-top"
          id="receipt-container"
          style={{ transform: `scale(${zoom})` }}
        >
          {/* Landscape Print Sheet holding both copies (Office Copy & Citizen Copy) */}
          <div className="print-sheet bg-white text-black shadow-2xl rounded-sm p-4 w-[1160px] border border-slate-300 flex flex-row gap-3">
            {/* OFFICE COPY (कार्यालयीन प्रत) */}
            {renderReceiptContent("कार्यालयीन प्रत")}

            {/* CUSTOMER COPY (ग्राहक प्रत) */}
            {renderReceiptContent("ग्राहक प्रत")}
          </div>
        </div>
      </main>
      {/* END: ReceiptWorkspace */}

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
