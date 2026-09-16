import React from "react";

// 1. Quick Pay Form (Online)
export function OnlineQuickPayForm({
  formData,
  onChange,
  onOpenScanner,
  onSearch,
  onClear,
}) {
  return (
    <div className="flex-1 p-6 md:p-8 flex flex-col animate-in fade-in duration-200">
      <div className="mb-6 pb-4 border-b border-border-default">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-secondary-container text-[24px]">
            bolt
          </span>
          <h2 className="text-headline-md font-headline-md font-bold text-on-surface">
            Quick Pay
          </h2>
        </div>
        <p className="text-body-sm font-body-sm text-on-surface-variant">
          Search via QR / Barcode Scan or identification numbers
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 flex-1 items-stretch">
        {/* Barcode / QR Scan Box */}
        <div className="flex-1 bg-surface-muted rounded-xl p-6 flex flex-col items-center justify-center text-center border border-border-default min-h-[220px]">
          <div className="w-14 h-14 rounded-full bg-primary-fixed/50 text-primary flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-[28px]">
              qr_code_scanner
            </span>
          </div>
          <h3 className="text-body-md font-bold text-on-surface mb-1">
            Quick Barcode / QR
          </h3>
          <p className="text-body-sm font-body-sm text-on-surface-variant mb-5 max-w-xs">
            Scan bill barcode, property tax card QR code, or digital receipt for instant lookup.
          </p>
          <button
            type="button"
            onClick={onOpenScanner}
            className="flex items-center justify-center gap-2 bg-surface-container-lowest border border-border-default hover:border-primary text-primary px-5 py-2.5 rounded-lg font-button-text text-sm font-semibold transition-colors shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">
              document_scanner
            </span>
            Scan Barcode / QR
          </button>
        </div>

        {/* Desktop Divider: Thin grayish vertical line with 'Or' text */}
        <div className="hidden md:flex flex-col items-center justify-center self-stretch px-1">
          <div className="w-[1px] bg-border-default flex-1"></div>
          <span className="my-3 px-2.5 py-1 text-xs font-semibold text-on-surface-variant bg-surface-container-lowest border border-border-default rounded-full shadow-xs tracking-wider">
            Or
          </span>
          <div className="w-[1px] bg-border-default flex-1"></div>
        </div>

        {/* Mobile Divider with 'Or' */}
        <div className="flex md:hidden items-center justify-center gap-3 my-2">
          <div className="h-[1px] bg-border-default flex-1"></div>
          <span className="px-2.5 py-0.5 text-xs font-semibold text-on-surface-variant bg-surface-container-lowest border border-border-default rounded-full shadow-xs tracking-wider">
            Or
          </span>
          <div className="h-[1px] bg-border-default flex-1"></div>
        </div>

        {/* Search Form Inputs */}
        <form
          className="flex-1 flex flex-col justify-between"
          onSubmit={(e) => {
            e.preventDefault();
            onSearch();
          }}
        >
          <div className="space-y-4">
            <div>
              <label
                className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5"
                htmlFor="online_quick_input"
              >
                <span className="material-symbols-outlined text-[16px] text-slate-500">
                  pin
                </span>
                <span>UPIC ID / Mobile No. / Old Property No.</span>
                <span className="text-rose-500 font-bold">*</span>
              </label>
              <div className="relative">
                <input
                  id="online_quick_input"
                  type="text"
                  name="quickPayInput"
                  value={formData.quickPayInput}
                  onChange={onChange}
                  maxLength={20}
                  placeholder="Enter UPIC ID, 10-digit mobile, or old number"
                  required
                  className="w-full pl-3 pr-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all placeholder:text-slate-400 bg-white"
                />
              </div>
              <p className="text-xs text-on-surface-variant mt-1.5">
                Example: 1100249823 or 9876543210
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-6 mt-6 border-t border-border-default">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-on-primary px-6 py-2.5 rounded-lg font-button-text text-sm font-semibold transition-colors shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
              Search Property
            </button>
            <button
              type="button"
              onClick={onClear}
              className="flex items-center justify-center gap-2 bg-surface-container border border-outline-variant hover:bg-surface-container-highest text-on-surface px-6 py-2.5 rounded-lg font-button-text text-sm font-medium transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                clear_all
              </span>
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 2. # Property No. Form (Screenshot 1)
export function OnlinePropertyNoForm({
  formData,
  onChange,
  onSearch,
  onClear,
}) {
  return (
    <div className="flex-1 p-6 md:p-8 flex flex-col animate-in fade-in duration-200">
      <div className="mb-6 pb-4 border-b border-border-default">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-primary text-[24px]">
            tag
          </span>
          <h2 className="text-headline-md font-headline-md font-bold text-on-surface">
            Property Number Search
          </h2>
        </div>
        <p className="text-body-sm font-body-sm text-on-surface-variant">
          Search official property records by municipal zone, ward, and property identification number
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
        className="flex flex-col justify-between flex-1"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          {/* Zone / Prabhag */}
          <div>
            <label
              className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5"
              htmlFor="online_prop_zone"
            >
              <span className="material-symbols-outlined text-[16px] text-slate-500">
                apartment
              </span>
              <span>Zone / Prabhag</span>
              <span className="text-rose-500 font-bold">*</span>
            </label>
            <select
              id="online_prop_zone"
              name="zone"
              value={formData.zone}
              onChange={onChange}
              required
              className="w-full pl-3 pr-8 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-white"
            >
              <option value="Zone 1 - Wadgaon Central">
                Zone 1 - Wadgaon Central
              </option>
              <option value="Zone 2 - Wadgaon East">Zone 2 - Wadgaon East</option>
              <option value="Zone 3 - Wadgaon West">Zone 3 - Wadgaon West</option>
            </select>
          </div>

          {/* Ward / Gat No. */}
          <div>
            <label
              className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5"
              htmlFor="online_prop_ward"
            >
              <span className="material-symbols-outlined text-[16px] text-slate-500">
                map
              </span>
              <span>Ward / Gat No.</span>
              <span className="text-rose-500 font-bold">*</span>
            </label>
            <select
              id="online_prop_ward"
              name="ward"
              value={formData.ward}
              onChange={onChange}
              required
              className="w-full pl-3 pr-8 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-white"
            >
              <option value="Ward 1A - Main Market / Gaothan">
                Ward 1A - Main Market / Gaothan
              </option>
              <option value="Ward 1B - Station Road">Ward 1B - Station Road</option>
              <option value="Ward 2A - Shivaji Nagar">
                Ward 2A - Shivaji Nagar
              </option>
            </select>
          </div>

          {/* Property Number / UPIC */}
          <div>
            <label
              className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5"
              htmlFor="online_prop_number"
            >
              <span className="material-symbols-outlined text-[16px] text-slate-500">
                badge
              </span>
              <span>Property Number / UPIC</span>
              <span className="text-rose-500 font-bold">*</span>
            </label>
            <input
              id="online_prop_number"
              type="text"
              name="propertyNo"
              value={formData.propertyNo}
              onChange={onChange}
              placeholder="A3-102()"
              required
              className="w-full pl-3 pr-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-white"
            />
            <p className="text-[11px] text-on-surface-variant mt-1">
              Format: Ward-Prefix/Property Sequence
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-6 mt-6 border-t border-border-default">
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-on-primary px-6 py-2.5 rounded-lg font-button-text text-sm font-semibold transition-colors shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">search</span>
            Search Property
          </button>
          <button
            type="button"
            onClick={onClear}
            className="flex items-center justify-center gap-2 bg-surface-container border border-outline-variant hover:bg-surface-container-highest text-on-surface px-6 py-2.5 rounded-lg font-button-text text-sm font-medium transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">
              clear_all
            </span>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

// 3. Owner / Occupier Name Form (Screenshot 2)
export function OnlineOwnerNameForm({
  formData,
  onChange,
  onSearch,
  onClear,
}) {
  return (
    <div className="flex-1 p-6 md:p-8 flex flex-col animate-in fade-in duration-200">
      <div className="mb-6 pb-4 border-b border-border-default">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-primary text-[24px]">
            person
          </span>
          <h2 className="text-headline-md font-headline-md font-bold text-on-surface">
            Owner / Occupier Name Search
          </h2>
        </div>
        <p className="text-body-sm font-body-sm text-on-surface-variant">
          Search official property records by owner or occupier name
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
        className="flex flex-col justify-between flex-1"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          {/* Zone / Prabhag */}
          <div>
            <label
              className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5"
              htmlFor="online_owner_zone"
            >
              <span className="material-symbols-outlined text-[16px] text-slate-500">
                apartment
              </span>
              <span>Zone / Prabhag</span>
              <span className="text-rose-500 font-bold">*</span>
            </label>
            <select
              id="online_owner_zone"
              name="zone"
              value={formData.zone}
              onChange={onChange}
              required
              className="w-full pl-3 pr-8 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-white"
            >
              <option value="Zone 1 - Wadgaon Central">
                Zone 1 - Wadgaon Central
              </option>
              <option value="Zone 2 - Wadgaon East">Zone 2 - Wadgaon East</option>
              <option value="Zone 3 - Wadgaon West">Zone 3 - Wadgaon West</option>
            </select>
          </div>

          {/* Ward / Gat No. */}
          <div>
            <label
              className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5"
              htmlFor="online_owner_ward"
            >
              <span className="material-symbols-outlined text-[16px] text-slate-500">
                map
              </span>
              <span>Ward / Gat No.</span>
              <span className="text-rose-500 font-bold">*</span>
            </label>
            <select
              id="online_owner_ward"
              name="ward"
              value={formData.ward}
              onChange={onChange}
              required
              className="w-full pl-3 pr-8 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-white"
            >
              <option value="Ward 1A - Main Market / Gaothan">
                Ward 1A - Main Market / Gaothan
              </option>
              <option value="Ward 1B - Station Road">Ward 1B - Station Road</option>
              <option value="Ward 2A - Shivaji Nagar">
                Ward 2A - Shivaji Nagar
              </option>
            </select>
          </div>

          {/* Owner Name Marathi */}
          <div>
            <label
              className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5"
              htmlFor="online_owner_marathi"
            >
              <span className="material-symbols-outlined text-[16px] text-slate-500">
                translate
              </span>
              <span>करदाता/भोगवटादाराचे नाव (मराठी)</span>
              <span className="text-rose-500 font-bold">*</span>
            </label>
            <input
              id="online_owner_marathi"
              type="text"
              name="ownerNameMarathi"
              value={formData.ownerNameMarathi}
              onChange={onChange}
              placeholder="करदाता/भोगवटादाराचे नाव एंटर करा-मराठी"
              required
              className="w-full pl-3 pr-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-white font-devanagari"
            />
            <p className="text-[11px] text-on-surface-variant mt-1 font-devanagari">
              देवनागरी लिपीत पूर्ण नाव प्रविष्ट करा
            </p>
          </div>

          {/* Owner Name English */}
          <div>
            <label
              className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between"
              htmlFor="online_owner_english"
            >
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-slate-500">
                  person
                </span>
                <span>Tax Payer/Occupier Name (English)</span>
              </span>
              <span
                className="material-symbols-outlined text-[14px] text-slate-400 cursor-help"
                title="Enter full legal name in English"
              >
                help
              </span>
            </label>
            <input
              id="online_owner_english"
              type="text"
              name="ownerNameEnglish"
              value={formData.ownerNameEnglish}
              onChange={onChange}
              placeholder="Enter Tax Payer/Occupier name-English"
              className="w-full pl-3 pr-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-white"
            />
            <p className="text-[11px] text-on-surface-variant mt-1">
              Enter full name in Latin script (e.g. Ramesh Patil)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-6 mt-6 border-t border-border-default">
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-on-primary px-6 py-2.5 rounded-lg font-button-text text-sm font-semibold transition-colors shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">search</span>
            Search Property
          </button>
          <button
            type="button"
            onClick={onClear}
            className="flex items-center justify-center gap-2 bg-surface-container border border-outline-variant hover:bg-surface-container-highest text-on-surface px-6 py-2.5 rounded-lg font-button-text text-sm font-medium transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">
              clear_all
            </span>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

// 4. Old Property No. Form (Screenshot 3)
export function OnlineOldPropertyNoForm({
  formData,
  onChange,
  onSearch,
  onClear,
}) {
  return (
    <div className="flex-1 p-6 md:p-8 flex flex-col animate-in fade-in duration-200">
      <div className="mb-6 pb-4 border-b border-border-default flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-primary text-[24px]">
              history
            </span>
            <h2 className="text-headline-md font-headline-md font-bold text-on-surface">
              Search By Old Property Details
            </h2>
          </div>
          <p className="text-body-sm font-body-sm text-on-surface-variant">
            Search official property records using legacy property and ward identifiers
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
          <span className="material-symbols-outlined text-sm">info</span>
          <span>* All Information Is Mandatory</span>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
        className="flex flex-col justify-between flex-1"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          {/* Old Ward No. */}
          <div>
            <label
              className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5"
              htmlFor="online_old_ward"
            >
              <span className="material-symbols-outlined text-[16px] text-slate-500">
                map
              </span>
              <span>Old Ward No.</span>
              <span className="text-rose-500 font-bold">*</span>
            </label>
            <select
              id="online_old_ward"
              name="oldWard"
              value={formData.oldWard}
              onChange={onChange}
              required
              className="w-full pl-3 pr-8 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-white"
            >
              <option value="Ward 1 - Gaothan">Ward 1 - Gaothan</option>
              <option value="Ward 2 - Market Area">Ward 2 - Market Area</option>
              <option value="Ward 3 - Station Area">Ward 3 - Station Area</option>
            </select>
          </div>

          {/* # Old Property Number */}
          <div>
            <label
              className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5"
              htmlFor="online_old_prop_no"
            >
              <span className="material-symbols-outlined text-[16px] text-slate-500">
                tag
              </span>
              <span>Old Property Number</span>
              <span className="text-rose-500 font-bold">*</span>
            </label>
            <input
              id="online_old_prop_no"
              type="text"
              name="oldPropertyNo"
              value={formData.oldPropertyNo}
              onChange={onChange}
              placeholder="Enter Old Property Number (e.g. 102/A)"
              required
              className="w-full pl-3 pr-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-6 mt-6 border-t border-border-default">
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-on-primary px-6 py-2.5 rounded-lg font-button-text text-sm font-semibold transition-colors shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">search</span>
            Search Property
          </button>
          <button
            type="button"
            onClick={onClear}
            className="flex items-center justify-center gap-2 bg-surface-container border border-outline-variant hover:bg-surface-container-highest text-on-surface px-6 py-2.5 rounded-lg font-button-text text-sm font-medium transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">
              clear_all
            </span>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
