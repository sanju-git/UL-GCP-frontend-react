import { useState } from "react";
import { fetchGCSData } from "../services/DataService";
import GcsCsvTable from "./GCSCSVTable";
import CsvUploader from "./CSVUploader";

const GCS = () => {
  const [csvData, setCSVData] = useState(null);
  const [showUpload, setShowUpload] = useState(false);

  const getGCSData = async () => {
    setShowUpload(false);
    await fetchGCSData()
      .then((response) => {
        if (response && response.success && response.data.length >= 1) {
          setCSVData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching GCS data", error);
      });
  };

  return (
    <div>
      {showUpload ? (
        <CsvUploader />
      ) : (
        <>
          <div className="d-flex align-items-center justify-content-center">
            <button
              style={{ background: "black", color: "white" }}
              onClick={() => getGCSData()}
            >
              Get Data
            </button>
            &nbsp;
            <button
              style={{ background: "black", color: "white" }}
              onClick={() => {
                setShowUpload(true);
              }}
            >
              Upload Data
            </button>
          </div>
          {csvData && csvData.length >= 1 && (
            <div style={{ marginTop: "1rem", width: "100%", height: "80vh" }}>
              <GcsCsvTable csvData={csvData} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GCS;
