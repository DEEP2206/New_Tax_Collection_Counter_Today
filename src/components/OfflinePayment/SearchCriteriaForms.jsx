import React from "react";

// 1. Quick Pay Form
export function QuickPayForm({
  formData,
  onChange,
  onOpenScanner,
  onSearch,
  onClear,
}) {
  return (
    <div className="flex-1 p-6 md:p-8 flex flex-col">
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
                htmlFor="mobile_no"
                className="text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px] text-slate-500">
                  pin
                </span>
                <span>UPIC ID / Mobile No. / Old Property No.</span>
                <span className="text-rose-500 font-bold">*</span>
              </label>
              <div className="relative">
                <input
                  id="mobile_no"
                  type="text"
                  required
                  maxLength={20}
                  value={formData.quickPayInput || ""}
                  onChange={(e) => onChange("quickPayInput", e.target.value)}
                  placeholder="Enter UPIC ID, 10-digit mobile, or old number"
                  className="w-full pl-3 pr-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-400"
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
export function PropertyNoForm({ formData, onChange, onSearch, onClear }) {
  return (
    <div className="flex-1 p-6 md:p-8 flex flex-col">
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
        className="flex flex-col justify-between flex-1"
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
      >
        <div className="space-y-4">
          {/* Row 1: Zone & Ward */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-slate-500">
                  apartment
                </span>
                <span>Zone / Prabhag</span>
                <span className="text-rose-500 font-bold">*</span>
              </label>
              <select
                value={formData.zone || "Zone 1 - Wadgaon Central"}
                onChange={(e) => onChange("zone", e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white"
              >
                <option value="Zone 1 - Wadgaon Central">
                  Zone 1 - Wadgaon Central
                </option>
                <option value="Zone 2 - Wadgaon East">Zone 2 - Wadgaon East</option>
                <option value="Zone 3 - Wadgaon West">Zone 3 - Wadgaon West</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-slate-500">
                  grid_view
                </span>
                <span>Ward / Gat No.</span>
                <span className="text-rose-500 font-bold">*</span>
              </label>
              <select
                value={formData.ward || "Ward 1A - Main Market / Gaothan"}
                onChange={(e) => onChange("ward", e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white"
              >
                <option value="Ward 1A - Main Market / Gaothan">
                  Ward 1A - Main Market / Gaothan
                </option>
                <option value="Ward 1B - Station Road">
                  Ward 1B - Station Road
                </option>
                <option value="Ward 2A - Shivaji Nagar">
                  Ward 2A - Shivaji Nagar
                </option>
              </select>
            </div>
          </div>

          {/* Row 2: Property Number / UPIC */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-slate-500">
                  credit_card
                </span>
                <span>Property Number / UPIC</span>
                <span className="text-rose-500 font-bold">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.propertyNo || ""}
                onChange={(e) => onChange("propertyNo", e.target.value)}
                placeholder="A3-102()"
                className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              />
              <p className="text-xs text-on-surface-variant mt-1.5">
                Format: Ward-Prefix/Property Sequence
              </p>
            </div>
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
export function OwnerNameForm({ formData, onChange, onSearch, onClear }) {
  return (
    <div className="flex-1 p-6 md:p-8 flex flex-col">
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
        className="flex flex-col justify-between flex-1"
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
      >
        <div className="space-y-4">
          {/* Row 1: Zone & Ward */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-slate-500">
                  apartment
                </span>
                <span>Zone / Prabhag</span>
              </label>
              <select
                value={formData.zone || "Zone 1 - Wadgaon Central"}
                onChange={(e) => onChange("zone", e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white"
              >
                <option value="Zone 1 - Wadgaon Central">
                  Zone 1 - Wadgaon Central
                </option>
                <option value="Zone 2 - Wadgaon East">Zone 2 - Wadgaon East</option>
                <option value="Zone 3 - Wadgaon West">Zone 3 - Wadgaon West</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-slate-500">
                  grid_view
                </span>
                <span>Ward / Gat No.</span>
              </label>
              <select
                value={formData.ward || "Ward 1A - Main Market / Gaothan"}
                onChange={(e) => onChange("ward", e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white"
              >
                <option value="Ward 1A - Main Market / Gaothan">
                  Ward 1A - Main Market / Gaothan
                </option>
                <option value="Ward 1B - Station Road">
                  Ward 1B - Station Road
                </option>
                <option value="Ward 2A - Shivaji Nagar">
                  Ward 2A - Shivaji Nagar
                </option>
              </select>
            </div>
          </div>

          {/* Row 2: Marathi & English Names */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-slate-500">
                  translate
                </span>
                <span>करदाता/भोगवटादाराचे नाव (मराठी)</span>
                <span className="text-rose-500 font-bold">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.marathiName || ""}
                onChange={(e) => onChange("marathiName", e.target.value)}
                placeholder="करदाता/भोगवटादाराचे नाव एंटर करा-मराठी"
                className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              />
              <p className="text-xs text-on-surface-variant mt-1.5">
                देवनागरी लिपीत पूर्ण नाव प्रविष्ट करा
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-slate-500">
                  person
                </span>
                <span>Tax Payer/Occupier Name (English)</span>
              </label>
              <input
                type="text"
                value={formData.englishName || ""}
                onChange={(e) => onChange("englishName", e.target.value)}
                placeholder="Enter Tax Payer/Occupier name-English"
                className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              />
              <p className="text-xs text-on-surface-variant mt-1.5">
                Enter full name in Latin script (e.g. Ramesh Patil)
              </p>
            </div>
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
export function OldPropertyNoForm({ formData, onChange, onSearch, onClear }) {
  return (
    <div className="flex-1 p-6 md:p-8 flex flex-col">
      <div className="mb-6 pb-4 border-b border-border-default flex justify-between items-start">
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
        <div className="flex items-center gap-1 text-xs text-rose-500 font-semibold">
          <span className="material-symbols-outlined text-[16px]">info</span>
          <span>* All Information Is Mandatory</span>
        </div>
      </div>

      <form
        className="flex flex-col justify-between flex-1"
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-slate-500">
                  grid_view
                </span>
                <span>Old Ward No.</span>
                <span className="text-rose-500 font-bold">*</span>
              </label>
              <select
                value={formData.oldWard || "Ward 1 - Gaothan"}
                onChange={(e) => onChange("oldWard", e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white"
              >
                <option value="Ward 1 - Gaothan">Ward 1 - Gaothan</option>
                <option value="Ward 2 - Bazar Peth">Ward 2 - Bazar Peth</option>
                <option value="Ward 3 - Shivaji Road">Ward 3 - Shivaji Road</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-slate-500">
                  tag
                </span>
                <span>Old Property Number</span>
                <span className="text-rose-500 font-bold">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.oldPropertyNo || ""}
                onChange={(e) => onChange("oldPropertyNo", e.target.value)}
                placeholder="Enter Old Property Number (e.g. 102/A)"
                className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              />
            </div>
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

// 5. Etc. Form (Screenshot 4)
export function EtcForm({ formData, onChange, onSearch, onClear }) {
  return (
    <div className="flex-1 p-6 md:p-8 flex flex-col">
      <div className="mb-6 pb-4 border-b border-border-default flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-primary text-[24px]">
              description
            </span>
            <h2 className="text-headline-md font-headline-md font-bold text-on-surface">
              इतर तपशील द्वारे शोधा (Search By Other Details)
            </h2>
          </div>
          <p className="text-body-sm font-body-sm text-on-surface-variant">
            Search official property records using Node, Sector, Society or Building details
          </p>
        </div>
        <div className="flex items-center gap-1 text-xs text-rose-500 font-semibold">
          <span className="material-symbols-outlined text-[16px]">info</span>
          <span>* All Information Is Mandatory</span>
        </div>
      </div>

      <form
        className="flex flex-col justify-between flex-1 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
      >
        {/* Row 1: Node & Sector */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-slate-500">
                domain
              </span>
              <span>नोड क्र.</span>
              <span className="text-rose-500 font-bold">*</span>
            </label>
            <select
              value={formData.node || ""}
              onChange={(e) => onChange("node", e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white"
            >
              <option value="">--Select Node--</option>
              <option value="node1">Node 1 - Central</option>
              <option value="node2">Node 2 - Talegaon Road</option>
              <option value="node3">Node 3 - Kamshet Corridor</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-slate-500">
                public
              </span>
              <span>सेक्टर क्र.</span>
              <span className="text-rose-500 font-bold">*</span>
            </label>
            <select
              value={formData.sector || ""}
              onChange={(e) => onChange("sector", e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white"
            >
              <option value="">--Select Sector--</option>
              <option value="sec1">Sector 1</option>
              <option value="sec2">Sector 2</option>
              <option value="sec3">Sector 3</option>
            </select>
          </div>
        </div>

        {/* Row 2: Society Name Marathi / English with किंवा */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-3 items-center">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-slate-500">
                apartment
              </span>
              <span>सोसायटीचे नाव (मराठी)</span>
            </label>
            <input
              type="text"
              value={formData.societyMarathi || ""}
              onChange={(e) => onChange("societyMarathi", e.target.value)}
              placeholder="Enter Marathi Society Name"
              className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            />
          </div>
          <div className="text-xs font-bold text-slate-500 text-center pt-5">
            किंवा
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-slate-500">
                apartment
              </span>
              <span>सोसायटीचे नाव (इंग्रजी)</span>
            </label>
            <input
              type="text"
              value={formData.societyEnglish || ""}
              onChange={(e) => onChange("societyEnglish", e.target.value)}
              placeholder="Enter English Society Name"
              className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            />
          </div>
        </div>

        {/* Row 3: Shop/Building Name Marathi / English with किंवा */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-3 items-center">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-slate-500">
                store
              </span>
              <span>दुकान/इमारतीचे नाव (मराठी)</span>
            </label>
            <input
              type="text"
              value={formData.shopMarathi || ""}
              onChange={(e) => onChange("shopMarathi", e.target.value)}
              placeholder="Enter Marathi Shop/Building Name"
              className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            />
          </div>
          <div className="text-xs font-bold text-slate-500 text-center pt-5">
            किंवा
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-slate-500">
                storefront
              </span>
              <span>दुकान/इमारतीचे नाव (इंग्रजी)</span>
            </label>
            <input
              type="text"
              value={formData.shopEnglish || ""}
              onChange={(e) => onChange("shopEnglish", e.target.value)}
              placeholder="Enter English Shop/Building Name"
              className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            />
          </div>
        </div>

        {/* Row 4: Plot No & Wing/Flat No with किंवा */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-3 items-center">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-slate-500">
                crop_free
              </span>
              <span>प्लॉट क्र.</span>
            </label>
            <input
              type="text"
              value={formData.plotNo || ""}
              onChange={(e) => onChange("plotNo", e.target.value)}
              placeholder="Enter Plot No"
              className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            />
          </div>
          <div className="text-xs font-bold text-slate-500 text-center pt-5">
            किंवा
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-slate-500">
                door_front
              </span>
              <span>विंग/फ्लॅट क्र.</span>
            </label>
            <input
              type="text"
              value={formData.flatNo || ""}
              onChange={(e) => onChange("flatNo", e.target.value)}
              placeholder="Enter Wing and/or Flat No Name"
              className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
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
