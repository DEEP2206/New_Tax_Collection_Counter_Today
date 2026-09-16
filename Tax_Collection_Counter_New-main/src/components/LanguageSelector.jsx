import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function LanguageSelector({ compact = false }) {
  const { currentLang, setLanguage, languages, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const activeOption = languages.find((l) => l.code === currentLang) || languages[2];

  return (
    <div className="flex items-center gap-2" ref={dropdownRef}>
      {!compact && (
        <span className="text-[13px] md:text-sm font-bold text-slate-800 select-none">
          Language:
        </span>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          className="flex items-center justify-between gap-2 min-w-[130px] px-3 py-1.5 bg-[#f1f3f5] hover:bg-[#e9ecef] text-slate-800 text-[13px] md:text-sm font-normal border border-slate-300 rounded-md shadow-xs transition-colors cursor-pointer"
        >
          <span>{activeOption.label}</span>
          <span className="text-[10px] text-slate-700 leading-none">▼</span>
        </button>

        {isOpen && (
          <div
            role="listbox"
            className="absolute left-0 top-full mt-0.5 w-full bg-white border border-slate-300 rounded-md shadow-lg py-0 z-50 overflow-hidden animate-in fade-in duration-100"
          >
            {languages.map((lang) => {
              const isSelected = lang.code === currentLang;
              return (
                <button
                  key={lang.code}
                  role="option"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-1.5 text-[13px] md:text-sm transition-colors cursor-pointer block ${
                    isSelected
                      ? "bg-[#2563eb] text-white font-medium"
                      : "text-slate-800 hover:bg-slate-100 font-normal"
                  }`}
                >
                  {lang.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
