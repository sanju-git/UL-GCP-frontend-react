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
          <div
            style={{ height: "100%" }}
            className="d-flex align-items-center justify-content-center"
          >
            <button onClick={() => getGCSData()}>Get Data</button>
            &nbsp;
            <button
              onClick={() => {
                setShowUpload(true);
              }}
            >
              Upload Data
            </button>
          </div>
          {csvData && csvData.length >= 1 && <GcsCsvTable csvData={csvData} />}
        </>
      )}
    </div>
  );
};

export default GCS;
