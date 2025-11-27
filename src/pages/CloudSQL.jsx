import { useState, useEffect } from "react";
import { fetchSQLData, fetchProductName, updateProductName } from "../services/DataService";

function CloudSQL() {
  const [codes, setCodes] = useState([]);
  const [selectedCode, setSelectedCode] = useState("");
  const [productName, setProductName] = useState("");

  // Load all codes on mount
  useEffect(() => {
    const load = async () => {
      const products = await fetchSQLData();
      console.log(products.data)
      setCodes(products.data);

    };
    load();
  }, []);

  // On dropdown change → load name
  const handleCodeSelect = async (e) => {
    const code = e.target.value;
    setSelectedCode(code);

    if (code) {
      const name = await fetchProductName(code);
      setProductName(name);
    }
  };

  // Update name in DB
  const handleUpdate = async () => {
    if (!selectedCode) return alert("Select a code first!");

    await updateProductName(selectedCode, productName);
    alert("Product updated!");
  };

  return (
    <div>
      <h1>Product Table Details</h1>

      {/* Dropdown */}
      <select onChange={handleCodeSelect}>
        <option value="">Select product code</option>
        {codes.map((item) => (
          <option key={item.global_product_code} value={item.global_product_code}>
            {item.global_product_code}
          </option>
        ))}
      </select>

      {/* Text input for name */}
      <br /><br />
      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />

      {/* Update button */}
      <br /><br />
      <button onClick={handleUpdate} style={{ background: "black", color: "white" }}>
        Update Product Name
      </button>
    </div>
  );
}

export default CloudSQL;
