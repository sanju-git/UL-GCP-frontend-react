import { useState } from "react";
import {
  fetchUCProductMappingData,
  insertUCProductMappingData,
} from "../services/DataService";

const UCData = () => {
  const [ucData, setUCData] = useState(null);

  // Show/hide insert form
  const [showInsertForm, setShowInsertForm] = useState(false);

  // Input values
  const [externalName, setExternalName] = useState("");
  const [globalCode, setGlobalCode] = useState("");

  const getUCData = async () => {
    try {
      const response = await fetchUCProductMappingData();

      if (response?.data?.length >= 1) {
        setUCData(response.data);
      }
    } catch (error) {
      console.error("Error fetching UC Data:", error);
    }
  };

  const handleInsert = async () => {
    try {
      await insertUCProductMappingData({
        external_product_name: externalName,
        global_product_code: globalCode,
      });

      alert("Product inserted successfully!");
      setExternalName("");
      setGlobalCode("");

      setShowInsertForm(false);
      getUCData(); // refresh table after insert
    } catch (err) {
      console.error(err);
      alert("Insert failed");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      {/* Title */}
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        Product Mapping Table
      </h2>

      {/* BUTTONS */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <button
          style={{ background: "black", color: "white", padding: "8px 16px" }}
          onClick={getUCData}
        >
          Get Product Mapping Data
        </button>

        <button
          style={{ background: "green", color: "white", padding: "8px 16px" }}
          // onClick={() => setShowInsertForm(!showInsertForm)}
        >
          Insert Product Mapping
        </button>
      </div>

      {/* INSERT FORM (only visible when button clicked) */}
      {showInsertForm && (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <input
            placeholder="External Product Name"
            value={externalName}
            onChange={(e) => setExternalName(e.target.value)}
            style={{ marginRight: "10px", padding: "5px" }}
          />

          <input
            placeholder="Global Product Code"
            value={globalCode}
            onChange={(e) => setGlobalCode(e.target.value)}
            style={{ marginRight: "10px", padding: "5px" }}
          />

          <button
            style={{ background: "blue", color: "white", padding: "6px 14px" }}
            onClick={handleInsert}
          >
            Insert Product
          </button>
        </div>
      )}

      {/* TABLE */}
      {ucData && ucData.length >= 1 && (
        <div
          style={{
            width: "100%",
            height: "70vh",
            overflow: "auto",
            marginTop: "10px",
          }}
        >
          <table
            border="1"
            cellPadding="6"
            style={{ width: "100%", fontSize: "14px" }}
          >
            <thead>
              <tr>
                {Object.keys(ucData[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {ucData.map((row, index) => (
                <tr key={index}>
                  {Object.keys(row).map((col) => (
                    <td key={col}>{String(row[col])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UCData;
