import React, { createContext, useContext, useState, useEffect } from "react";

export const translations = {
  en: {
    // TopNav & Common
    language: "Language:",
    orgName: "वडगाव मावळ नगरपंचायत",
    adminName: "VIJAY BHIMRAO JADHAV",
    adminRole: "Admin",
    dashboard: "Dashboard",
    govTechPortal: "GovTech Portal",
    
    // Sidebar items
    propertyTax: "Property Tax",
    offlinePayment: "Offline Payment",
    onlinePayment: "Online Payment",
    otherServices: "Other Services",
    waterTax: "Water Tax",
    tradeLicense: "Trade License",
    system: "SYSTEM",
    reports: "Reports",
    settings: "Settings",
    help: "Help & Support",
    logout: "Logout",
    
    // Dashboard submenus
    propertytax_dashboard: "PropertyTax Dashboard",
    payment_mode_wise: "Payment Mode wise",
    use_type_wise: "Use Type Wise",
    zone_wise_collection: "Zone Wise Collection",
    bill_distribution_dashboard: "Bill Distribution Dashboard",
    analytics_dashboard: "Analytics Dashboard",
    collection_trend: "Collection Trend",

    // Submenu descriptions
    desc_propertytax_dashboard: "Monitor revenue performance and tax collection metrics.",
    desc_payment_mode_wise: "Breakdown of property tax collection across payment instruments & modes.",
    desc_use_type_wise: "Property tax revenue segmented by usage: Residential, Commercial, Industrial, and Mixed.",
    desc_zone_wise_collection: "Geographic performance analysis across municipal zones and prabhags.",
    desc_bill_distribution_dashboard: "Tracking property tax demand notices, deliveries, and digital dispatch status.",
    desc_analytics_dashboard: "High-level municipal KPIs, target compliance, and collection efficiency trends.",
    desc_collection_trend: "Time-series revenue trends, hourly collection cadence, and forecasting.",

    // Search Tabs
    searchCriteria: "SEARCH CRITERIA",
    quickPay: "Quick Pay",
    propertyNo: "Property No.",
    ownerOccupierName: "Owner / Occupier Name",
    oldPropertyNo: "Old Property No.",
    etc: "Etc.",

    // Form fields & actions
    searchProperty: "Search Property",
    clear: "Clear",
    zonePrabhag: "Zone / Prabhag",
    wardGatNo: "Ward / Gat No.",
    marathiNameLabel: "करदाता/भोगवटादाराचे नाव (मराठी)",
    englishNameLabel: "Tax Payer/Occupier Name (English)",
    propertyNumberSearch: "Property Number Search",
    ownerNameSearch: "Owner / Occupier Name Search",
    quickPaySearch: "Quick Pay / Citizen Search",
    oldPropertySearch: "Old Property Number Search",
    etcSearch: "Additional Property Search (Etc.)",

    // Steps
    step1: "Search Property",
    step2: "Verify Details",
    step3: "Collect Payment",
    step4: "Receipt",

    // KPI & Filters
    totalCollection: "Total Collection",
    totalReceipts: "Total Receipts",
    chequePending: "Cheque / DD Pending",
    collectionTarget: "Collection Target",
    today: "Today",
    thisWeek: "This Week",
    thisMonth: "This Month",
    custom: "Custom",
    export: "Export",
  },
  mr: {
    // TopNav & Common
    language: "भाषा:",
    orgName: "वडगाव मावळ नगरपंचायत",
    adminName: "विजय भीमराव जाधव",
    adminRole: "प्रशासक",
    dashboard: "डॅशबोर्ड",
    govTechPortal: "शासकीय पोर्टल",
    
    // Sidebar items
    propertyTax: "मालमत्ता कर",
    offlinePayment: "ऑफलाइन पेमेंट",
    onlinePayment: "ऑनलाइन पेमेंट",
    otherServices: "इतर सेवा",
    waterTax: "पाणीपट्टी कर",
    tradeLicense: "व्यवसाय परवाना",
    system: "प्रणाली",
    reports: "अहवाल",
    settings: "सेटिंग्ज",
    help: "मदत आणि सहाय्य",
    logout: "बाहेर पडा",
    
    // Dashboard submenus
    propertytax_dashboard: "मालमत्ता कर डॅशबोर्ड",
    payment_mode_wise: "पेमेंट पद्धतीनुसार",
    use_type_wise: "वापर प्रकारानुसार",
    zone_wise_collection: "झोन निहाय वसुली",
    bill_distribution_dashboard: "बिल वाटप डॅशबोर्ड",
    analytics_dashboard: "विश्लेषण डॅशबोर्ड",
    collection_trend: "वसुली कल",

    // Submenu descriptions
    desc_propertytax_dashboard: "महसूल कामगिरी आणि कर वसुली मेट्रिक्सचे निरीक्षण करा.",
    desc_payment_mode_wise: "पेमेंट साधने आणि पद्धतींद्वारे मालमत्ता कर वसुलीचे विश्लेषण.",
    desc_use_type_wise: "वापरानुसार कर महसूल: निवासी, व्यावसायिक, औद्योगिक आणि मिश्र.",
    desc_zone_wise_collection: "महानगरपालिका झोन आणि प्रभागांमधील भौगोलिक कामगिरी विश्लेषण.",
    desc_bill_distribution_dashboard: "मालमत्ता कर मागणी नोटिसा, वितरण आणि डिजिटल पाठवणे स्थिती.",
    desc_analytics_dashboard: "उच्च-स्तरीय महापालिका उद्दिष्टे, पूर्तता आणि वसुली कार्यक्षमता कल.",
    desc_collection_trend: "वेळ-मालिका महसूल कल, तासांनुसार वसुली गती आणि अंदाज.",

    // Search Tabs
    searchCriteria: "शोध निकष",
    quickPay: "क्विक पे",
    propertyNo: "मालमत्ता क्र.",
    ownerOccupierName: "मालक / भोगवटादार नाव",
    oldPropertyNo: "जुना मालमत्ता क्र.",
    etc: "इतर",

    // Form fields & actions
    searchProperty: "मालमत्ता शोधा",
    clear: "साफ करा",
    zonePrabhag: "झोन / प्रभाग",
    wardGatNo: "प्रभाग / गट क्र.",
    marathiNameLabel: "करदाता/भोगवटादाराचे नाव (मराठी)",
    englishNameLabel: "करदाता/भोगवटादाराचे नाव (इंग्रजी)",
    propertyNumberSearch: "मालमत्ता क्रमांक शोध",
    ownerNameSearch: "मालक / भोगवटादार नाव शोध",
    quickPaySearch: "क्विक पे / नागरिक शोध",
    oldPropertySearch: "जुना मालमत्ता क्रमांक शोध",
    etcSearch: "अतिरिक्त मालमत्ता शोध (इतर)",

    // Steps
    step1: "मालमत्ता शोधा",
    step2: "तपशील पडताळणी",
    step3: "पेमेंट स्वीकारा",
    step4: "पावती",

    // KPI & Filters
    totalCollection: "एकूण वसुली",
    totalReceipts: "एकूण पावत्या",
    chequePending: "चेक / डीडी प्रलंबित",
    collectionTarget: "वसुली उद्दिष्ट",
    today: "आज",
    thisWeek: "या आठवड्यात",
    thisMonth: "या महिन्यात",
    custom: "सानुकूल",
    export: "निर्यात करा",
  },
  hi: {
    // TopNav & Common
    language: "भाषा:",
    orgName: "वडगाव मावळ नगरपंचायत",
    adminName: "विजय भीमराव जाधव",
    adminRole: "व्यवस्थापक",
    dashboard: "डैशबोर्ड",
    govTechPortal: "शासकीय पोर्टल",
    
    // Sidebar items
    propertyTax: "संपत्ति कर",
    offlinePayment: "ऑफलाइन भुगतान",
    onlinePayment: "ऑनलाइन भुगतान",
    otherServices: "अन्य सेवाएं",
    waterTax: "जल कर",
    tradeLicense: "व्यापार लाइसेंस",
    system: "प्रणाली",
    reports: "रिपोर्ट्स",
    settings: "सेटिंग्स",
    help: "मदद एवं सहायता",
    logout: "लॉगआउट",
    
    // Dashboard submenus
    propertytax_dashboard: "संपत्ति कर डैशबोर्ड",
    payment_mode_wise: "भुगतान माध्यम अनुसार",
    use_type_wise: "उपयोग प्रकार अनुसार",
    zone_wise_collection: "जोन अनुसार वसूली",
    bill_distribution_dashboard: "बिल वितरण डैशबोर्ड",
    analytics_dashboard: "विश्लेषण डैशबोर्ड",
    collection_trend: "वसूली रुझान",

    // Submenu descriptions
    desc_propertytax_dashboard: "राजस्व प्रदर्शन और कर वसूली मेट्रिक्स की निगरानी करें।",
    desc_payment_mode_wise: "भुगतान साधनों और माध्यमों के आधार पर संपत्ति कर वसूली का विवरण।",
    desc_use_type_wise: "उपयोग के आधार पर कर राजस्व: आवासीय, व्यावसायिक, औद्योगिक और मिश्रित।",
    desc_zone_wise_collection: "नगरपालिका क्षेत्रों और प्रभागों में भौगोलिक प्रदर्शन विश्लेषण।",
    desc_bill_distribution_dashboard: "संपत्ति कर मांग नोटिस, वितरण और डिजिटल प्रेषण स्थिति ट्रैकिंग।",
    desc_analytics_dashboard: "उच्च-स्तरीय नगर निगम लक्ष्य, अनुपालन और वसूली दक्षता रुझान।",
    desc_collection_trend: "समय-श्रृंखला राजस्व रुझान, प्रति घंटा वसूली गति और पूर्वानुमान।",

    // Search Tabs
    searchCriteria: "खोज मापदंड",
    quickPay: "त्वरित भुगतान",
    propertyNo: "संपत्ति सं.",
    ownerOccupierName: "स्वामी / अधिभोगी नाम",
    oldPropertyNo: "पुरानी संपत्ति सं.",
    etc: "अन्य",

    // Form fields & actions
    searchProperty: "संपत्ति खोजें",
    clear: "साफ़ करें",
    zonePrabhag: "जोन / प्रभाग",
    wardGatNo: "वार्ड / गट सं.",
    marathiNameLabel: "करदाता/भोगवटादार का नाम (मराठी)",
    englishNameLabel: "करदाता/भोगवटादार का नाम (अंग्रेज़ी)",
    propertyNumberSearch: "संपत्ति संख्या खोज",
    ownerNameSearch: "स्वामी / अधिभोगी नाम खोज",
    quickPaySearch: "त्वरित भुगतान / नागरिक खोज",
    oldPropertySearch: "पुरानी संपत्ति संख्या खोज",
    etcSearch: "अतिरिक्त संपत्ति खोज (अन्य)",

    // Steps
    step1: "संपत्ति खोजें",
    step2: "विवरण सत्यापन",
    step3: "भुगतान एकत्र करें",
    step4: "रसीद",

    // KPI & Filters
    totalCollection: "कुल वसूली",
    totalReceipts: "कुल रसीदें",
    chequePending: "चेक / डीडी लंबित",
    collectionTarget: "वसूली लक्ष्य",
    today: "आज",
    thisWeek: "इस सप्ताह",
    thisMonth: "इस महीने",
    custom: "कस्टम",
    export: "निर्यात करें",
  },
};

export const LANGUAGE_OPTIONS = [
  { code: "mr", label: "मराठी", nativeName: "मराठी" },
  { code: "hi", label: "हिंदी", nativeName: "हिंदी" },
  { code: "en", label: "English", nativeName: "English" },
];

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem("preferred_lang") || "en";
  });

  useEffect(() => {
    localStorage.setItem("preferred_lang", currentLang);
  }, [currentLang]);

  const t = (key, fallback = "") => {
    return translations[currentLang]?.[key] || translations.en?.[key] || fallback || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLang,
        setLanguage: setCurrentLang,
        t,
        languages: LANGUAGE_OPTIONS,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      currentLang: "en",
      setLanguage: () => {},
      t: (k, fb) => fb || k,
      languages: LANGUAGE_OPTIONS,
    };
  }
  return context;
}
