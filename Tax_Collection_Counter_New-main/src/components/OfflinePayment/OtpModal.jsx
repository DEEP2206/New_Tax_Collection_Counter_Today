import React, { useState, useEffect, useRef } from "react";

export default function OtpModal({
  isOpen,
  phoneNumber = "9876543210",
  onClose,
  onVerifySuccess,
}) {
  const [digits, setDigits] = useState(["4", "8", "2", "9", "1", "6"]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!isOpen) return;

    setTimeLeft(30);
    setErrorMsg("");
    setIsVerifying(false);

    // Auto-focus first input
    const timer = setTimeout(() => {
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, 100);

    const countdown = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const maskedPhone =
    phoneNumber.length >= 4
      ? `+91 ******${phoneNumber.slice(-4)}`
      : "+91 ******3210";

  const handleDigitChange = (index, value) => {
    const val = value.slice(-1);
    const newDigits = [...digits];
    newDigits[index] = val;
    setDigits(newDigits);
    setErrorMsg("");

    if (val && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const code = digits.join("").trim();
    if (code.length < 6) {
      setErrorMsg("Please enter the complete 6-digit OTP.");
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onVerifySuccess();
      onClose();
    }, 700);
  };

  const handleResend = () => {
    setTimeLeft(30);
    setDigits(["", "", "", "", "", ""]);
    setErrorMsg("");
    if (inputRefs.current[0]) inputRefs.current[0].focus();
  };

  const formattedTime = `00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-border-default transform transition-transform duration-300">
        {/* Header */}
        <div className="p-6 border-b border-border-default flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[24px]">
                verified_user
              </span>
            </div>
            <div>
              <h3 className="text-headline-md font-headline-md font-bold text-on-surface leading-tight">
                OTP Verification
              </h3>
              <p className="text-body-sm font-body-sm text-on-surface-variant mt-0.5">
                Verification code sent to mobile
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close OTP Modal"
            className="text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-full p-2 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="text-center">
            <p className="text-body-sm font-body-sm text-on-surface-variant">
              A 6-digit verification code has been sent to your registered mobile number
            </p>
            <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-surface-muted rounded-full text-on-surface font-semibold text-sm border border-slate-200">
              <span className="material-symbols-outlined text-[16px] text-primary">
                smartphone
              </span>
              <span>{maskedPhone}</span>
            </div>
          </div>

          {/* 6-Digit OTP Input Grid */}
          <div>
            <div className="flex justify-center items-center gap-2.5 sm:gap-3">
              {digits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-11 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold rounded-lg border border-slate-300 bg-surface-container-lowest text-on-surface focus:border-primary focus:ring-2 focus:ring-primary outline-none transition-all shadow-xs"
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-body-sm font-body-sm mt-3 px-1">
              <span className="text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-outline">
                  timer
                </span>
                Expires in{" "}
                <span className="font-semibold text-on-surface">
                  {formattedTime}
                </span>
              </span>
              <button
                type="button"
                onClick={handleResend}
                disabled={timeLeft > 0}
                className="text-primary font-semibold hover:underline text-body-sm disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                Resend OTP
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="text-xs text-error font-medium text-center bg-error-container/30 py-1.5 px-3 rounded-lg border border-error-container">
              {errorMsg}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-border-default">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 justify-center items-center py-2.5 px-4 rounded-lg border border-outline-variant bg-surface-container hover:bg-surface-container-highest text-on-surface font-button-text text-sm transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleVerify}
              disabled={isVerifying}
              className="flex-1 justify-center items-center py-2.5 px-4 rounded-lg bg-primary hover:bg-primary/90 text-on-primary font-button-text text-sm transition-colors shadow-sm flex gap-1.5 cursor-pointer"
            >
              {isVerifying ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">
                    progress_activity
                  </span>
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">
                    check_circle
                  </span>
                  <span>Verify &amp; Proceed</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
