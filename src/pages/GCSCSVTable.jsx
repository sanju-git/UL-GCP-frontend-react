import React, { useState, useEffect } from "react";
import Papa from "papaparse";

const MANUAL_HEADERS = [
  "ID",
  "Country Code",
  "Country",
  "Customer",
  "Channel",
  "Sub-Channel",
  "Rank",
];

function GcsCsvTable({ csvData }) {
  // State for table headers and rows
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if we have valid data to parse
    if (csvData && csvData.length >= 1) {
      setLoading(true);
      setError(null);

      // Parse the CSV string
      Papa.parse(csvData, {
        header: false,
        skipEmptyLines: true, // Skip any blank lines
        complete: (results) => {
          // results.data is now an array of arrays: [ ["val1", "val2"], [...] ]
          if (results.data.length > 0) {
            setHeaders(MANUAL_HEADERS); // Use our manual headers
            setRows(results.data); // Set the rows (which is an array of arrays)
          } else {
            setError("No data found in CSV.");
          }
          setLoading(false);
        },
        error: (err) => {
          setError(`Error parsing CSV: ${err.message}`);
          setLoading(false);
        },
      });
    } else {
      // This handles the initial render before data is passed
      setLoading(false);
    }
  }, [csvData]);

  if (loading) {
    return <div>Parsing CSV data...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <h2>GCS File Data</h2>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4" }}>
            {headers.map((header) => (
              <th
                key={header}
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} style={{ borderBottom: "1px solid #ddd" }}>
              {/* Loop through each cell in the row array */}
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  style={{ border: "1px solid #ddd", padding: "8px" }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GcsCsvTable;
