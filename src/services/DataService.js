// const backend_URL = "http://localhost:8080/";
const token = localStorage.getItem("authToken");
const backend_URL =
"https://ul-gcp-backend-node-1076232659917.europe-west3.run.app/";

export const fetchGCSData = async () => {
  const url = backend_URL + "api/get-gcs-data";

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching GCS data: ${response.statusText}`);
  }

  // Get the response body as plain text (the CSV string)
  const csvData = await response.text();
  return { success: true, data: csvData };
};

export const uploadCSVToGCS = async (formData) => {
  const url = backend_URL + "api/upload-csv";
  const response = await fetch(url, {
    method: "POST",
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => null);
    throw new Error(
      `Error uploading CSV to GCS: ${response.status} ${response.statusText}${
        text ? ` - ${text}` : ""
      }`
    );
  }
  return { success: true };
};
