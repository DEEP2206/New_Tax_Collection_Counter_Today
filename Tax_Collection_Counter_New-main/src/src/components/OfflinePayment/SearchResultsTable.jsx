import React, { useState } from "react";

export const initialMockRecords = [
  {
    id: "1",
    propertyNo: "V1-109-10(A9)",
    flatNo: "-",
    wingNo: "/A9",
    ownerName: "म्हाळसकर योगेश कृष्णा",
    occupierName: "/ भाडेकरू ...",
    societyName: "-",
    address: "Ward 1A, Gaothan, Vadgaon Maval",
    currentYearDues: "₹ 5,200",
    arrears: "₹ 0",
    totalAmount: "₹ 5,200",
  },
  {
    id: "2",
    propertyNo: "V1-109-11(A10)",
    flatNo: "-",
    wingNo: "/A10",
    ownerName: "म्हाळसकर योगेश कृष्णा",
    occupierName: "/ भाडेकरू ...",
    societyName: "-",
    address: "Ward 1A, Gaothan, Vadgaon Maval",
    currentYearDues: "₹ 4,800",
    arrears: "₹ 0",
    totalAmount: "₹ 4,800",
  },
  {
    id: "3",
    propertyNo: "V1-109-12(A11)",
    flatNo: "-",
    wingNo: "/A11",
    ownerName: "म्हाळसकर योगेश कृष्णा",
    occupierName: "/ भाडेकरू ...",
    societyName: "-",
    address: "Ward 1A, Gaothan, Vadgaon Maval",
    currentYearDues: "₹ 6,100",
    arrears: "₹ 1,200",
    totalAmount: "₹ 7,300",
  },
  {
    id: "4",
    propertyNo: "V1-109-13(A12)",
    flatNo: "-",
    wingNo: "/A12",
    ownerName: "म्हाळसकर योगेश कृष्णा",
    occupierName: "/ भाडेकरू ...",
    societyName: "-",
    address: "Ward 1A, Gaothan, Vadgaon Maval",
    currentYearDues: "₹ 3,950",
    arrears: "₹ 0",
    totalAmount: "₹ 3,950",
  },
  {
    id: "5",
    propertyNo: "V1-109-14(A13)",
    flatNo: "-",
    wingNo: "/A13",
    ownerName: "म्हाळसकर योगेश कृष्णा",
    occupierName: "/ भाडेकरू ...",
    societyName: "-",
    address: "Ward 1A, Gaothan, Vadgaon Maval",
    currentYearDues: "₹ 5,200",
    arrears: "₹ 0",
    totalAmount: "₹ 5,200",
  },
];

export default function SearchResultsTable({ onSelectProperty }) {
  const [filterText, setFilterText] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredRecords = initialMockRecords.filter((r) => {
    const q = filterText.toLowerCase();
    return (
      r.propertyNo.toLowerCase().includes(q) ||
      r.ownerName.toLowerCase().includes(q) ||
      r.wingNo.toLowerCase().includes(q) ||
      r.occupierName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-border-default overflow-hidden mt-6 animate-in fade-in duration-300">
      {/* Table Header Bar */}
      <div className="bg-primary text-on-primary px-6 py-3.5 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">
            table_view
          </span>
          <h3 className="font-headline-md text-base font-bold">
            Search Property (शोध निकाल)
          </h3>
        </div>
        <p className="text-xs text-primary-fixed opacity-90">
          Showing matching records for query
        </p>
      </div>

      {/* Controls: Show Entries & Filter */}
      <div className="p-4 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border-default">
        <div className="flex items-center gap-2 text-sm text-on-surface-variant font-body-sm">
          <span>Show</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="px-2 py-1 bg-surface-container-low border border-outline-variant rounded-md text-sm text-on-surface focus:ring-1 focus:ring-primary focus:outline-none cursor-pointer"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
          <span>entries</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-on-surface-variant font-body-sm w-full sm:w-auto">
          <span>Search:</span>
          <input
            type="text"
            placeholder="Filter records..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="px-3 py-1.5 bg-surface-container-low border border-outline-variant rounded-md text-sm text-on-surface focus:ring-2 focus:ring-primary focus:outline-none w-full sm:w-64"
          />
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm font-body-sm">
          <thead className="bg-surface-muted/70 text-on-surface-variant text-[13px] border-b border-border-default">
            <tr>
              <th className="py-3 px-4 font-semibold text-center w-16">Action</th>
              <th className="py-3 px-4 font-semibold">
                Property No. <span className="text-xs opacity-75">(मालमत्ता क्र.)</span>
              </th>
              <th className="py-3 px-4 font-semibold">
                Flat No. <span className="text-xs opacity-75">(फ्लॅट क्र.)</span>
              </th>
              <th className="py-3 px-4 font-semibold">
                Wing No. <span className="text-xs opacity-75">(विंग क्र.)</span>
              </th>
              <th className="py-3 px-4 font-semibold">
                Owner Name <span className="text-xs opacity-75">(मालकाचे नाव)</span>
              </th>
              <th className="py-3 px-4 font-semibold">
                Occupier Name <span className="text-xs opacity-75">(भोगवटदाराचे नाव)</span>
              </th>
              <th className="py-3 px-4 font-semibold">
                Society Name <span className="text-xs opacity-75">(सोसायटीचे नाव)</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default">
            {filteredRecords.length > 0 ? (
              filteredRecords.slice(0, pageSize).map((rec) => (
                <tr
                  key={rec.id}
                  className="hover:bg-primary-fixed/20 transition-colors"
                >
                  <td className="py-3 px-4 text-center">
                    <button
                      type="button"
                      title="Select and Verify Property"
                      onClick={() => onSelectProperty(rec)}
                      className="p-1.5 bg-surface-container rounded-lg hover:bg-primary hover:text-on-primary transition-colors text-primary border border-outline-variant/60 cursor-pointer shadow-xs inline-flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-[17px]">
                        edit
                      </span>
                    </button>
                  </td>
                  <td className="py-3 px-4 font-semibold text-primary">
                    {rec.propertyNo}
                  </td>
                  <td className="py-3 px-4 text-on-surface-variant">
                    {rec.flatNo}
                  </td>
                  <td className="py-3 px-4 text-on-surface-variant">
                    {rec.wingNo}
                  </td>
                  <td className="py-3 px-4 text-on-surface font-medium">
                    {rec.ownerName}
                  </td>
                  <td className="py-3 px-4 text-on-surface-variant">
                    {rec.occupierName}
                  </td>
                  <td className="py-3 px-4 text-on-surface-variant">
                    {rec.societyName}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="py-8 text-center text-on-surface-variant"
                >
                  No matching properties found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 md:p-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-border-default text-xs font-body-sm text-on-surface-variant">
        <div>
          Showing 1 to {Math.min(pageSize, filteredRecords.length)} of 1,038 entries
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="px-3 py-1.5 border border-outline-variant rounded-md hover:bg-surface-container-low transition-colors disabled:opacity-50"
            disabled
          >
            Previous
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-md font-semibold transition-all cursor-pointer ${
                currentPage === page
                  ? "bg-primary text-on-primary"
                  : "border border-outline-variant hover:bg-surface-container-low text-on-surface"
              }`}
            >
              {page}
            </button>
          ))}
          <span className="px-1 text-outline">...</span>
          <button
            type="button"
            className="px-2 py-1.5 border border-outline-variant rounded-md hover:bg-surface-container-low text-on-surface"
          >
            208
          </button>
          <button
            type="button"
            className="px-3 py-1.5 border border-outline-variant rounded-md hover:bg-surface-container-low transition-colors text-on-surface cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
