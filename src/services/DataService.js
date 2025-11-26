const backend_URL = "http://localhost:8080/";
// const backend_URL =
//   "https://ul-gcp-backend-node-1076232659917.europe-west3.run.app/";

export const fetchGCSData = async () => {
  const url = backend_URL + "api/get-gcs-data";

  const response = await fetch(url, {
    method: "GET",
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
  // When sending a FormData object, pass it as the `body` in the options
  // and do NOT set the Content-Type header — the browser will set the
  // correct multipart/form-data boundary automatically.
  const response = await fetch(url, {
    method: "POST",
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

export const fetchSQLData = async () => {
  const url = backend_URL + "api/get-sql-data";

  const response = await fetch(url, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Error fetching GCS data: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

export const fetchProductName = async (productcode) => {
  const url = backend_URL + `api/get-sql-data/${productcode}`;

  const response = await fetch(url, { method: "GET" });

  if (!response.ok) {
    throw new Error("Failed to fetch product name");
  }

  const data = await response.json();
  return data.name;    
};

export const updateProductName = async (productcode, newName) => {
  const url = backend_URL + `api/get-sql-data/${productcode}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ newName }),
  });

  if (!response.ok) {
    throw new Error("Failed to update product");
  }

  return await response.json(); 
};
