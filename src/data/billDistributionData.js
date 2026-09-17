// Bill Distribution Table & Summary Data Source
// Serves as the single source of truth for Bill Distribution metrics

export const billDistributionTableData = [
  {
    wardOffice: "वडगाव",
    wardOfficeEn: "Wadgaon",
    totalProperties: 16304,
    totalBillDistribution: 0,
    billsDelivered: 0,
    billsAffixed: 0,
    billRefused: 0,
    propertyNotFound: 0,
    seizureNotice: 0,
    legalDemandNotice: 0,
    mobileNumberUpdated: 0,
    emailIdUpdated: 0,
    alternateMobileNumber: 0,
    alternateAddress: 0,
  },
];

export const getBillDistributionSummary = (data = billDistributionTableData) => {
  return data.reduce(
    (acc, row) => ({
      totalProperties: acc.totalProperties + (row.totalProperties || 0),
      totalBillDistribution:
        acc.totalBillDistribution + (row.totalBillDistribution || 0),
      billsDelivered: acc.billsDelivered + (row.billsDelivered || 0),
      billsAffixed: acc.billsAffixed + (row.billsAffixed || 0),
      billRefused: acc.billRefused + (row.billRefused || 0),
      propertyNotFound: acc.propertyNotFound + (row.propertyNotFound || 0),
      seizureNotice: acc.seizureNotice + (row.seizureNotice || 0),
      legalDemandNotice:
        acc.legalDemandNotice + (row.legalDemandNotice || 0),
      mobileNumberUpdated:
        acc.mobileNumberUpdated + (row.mobileNumberUpdated || 0),
      emailIdUpdated: acc.emailIdUpdated + (row.emailIdUpdated || 0),
      alternateMobileNumber:
        acc.alternateMobileNumber + (row.alternateMobileNumber || 0),
      alternateAddress: acc.alternateAddress + (row.alternateAddress || 0),
    }),
    {
      totalProperties: 0,
      totalBillDistribution: 0,
      billsDelivered: 0,
      billsAffixed: 0,
      billRefused: 0,
      propertyNotFound: 0,
      seizureNotice: 0,
      legalDemandNotice: 0,
      mobileNumberUpdated: 0,
      emailIdUpdated: 0,
      alternateMobileNumber: 0,
      alternateAddress: 0,
    }
  );
};
