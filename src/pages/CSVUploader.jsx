import React, { useState } from "react";
import { uploadCSVToGCS } from "../services/DataService";

function CsvUploader() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      setMessage(`File selected: ${selectedFile.name}`);
    } else {
      setFile(null);
      setMessage("Please select a valid .csv file.");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("No file selected.");
      return;
    }
    const formData = new FormData();
    formData.append("csvFile", file);

    try {
      setMessage("Uploading...");
      await uploadCSVToGCS(formData)
        .then((response) => {
          if (response && response.success) {
            setMessage("File uploaded successfully.");
          }
        })
        .catch((error) => {
          console.error("Error fetching GCS data", error);
        });

      setFile(null); // Clear the file input
    } catch (error) {
      // Handle error
      setMessage(
        `Error uploading file: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div>
        <h2 style={{ textAlign: "center" }}>Upload CSV to GCS</h2>
        <div
          style={{
            border: "1px solid black",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
          <input type="file" accept=".csv" onChange={handleFileChange} />
          <button
            style={{
              border: "1px solid black",
              backgroundColor: "black",
              color: "white",
            }}
            onClick={handleUpload}
          >
            Upload
          </button>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default CsvUploader;
