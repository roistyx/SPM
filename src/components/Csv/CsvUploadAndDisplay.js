import React, { useState, useEffect } from "react";
import axios from "axios";

function CsvUploader() {
  const [file, setFile] = useState(null);
  const [receivedData, setReceivedData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await axios.post("http://localhost:3100/accounts"); // Adjust endpoint as needed
        setAccounts(res.data);
      } catch (err) {
        console.error("Failed to fetch accounts", err);
        setError("Failed to load accounts.");
      }
    };

    fetchAccounts();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadComplete(false);
    setError("");
  };

  const handleAccountChange = (e) => {
    setSelectedAccount(e.target.value);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    if (!selectedAccount) {
      setError("Please select an account first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("accountId", selectedAccount); // Pass account ID to backend

    setLoading(true);
    setUploadComplete(false);

    try {
      const res = await axios.post(
        "http://localhost:3100/csv/upload-csv",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setReceivedData(res.data.data);
      setError("");
      setUploadComplete(true);
    } catch (err) {
      console.error("Upload failed", err);
      setError("Upload failed. Please try again.");
      setUploadComplete(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <label htmlFor="account-select" className="mr-2 font-semibold">
          Select Account:
        </label>
        <select
          id="account-select"
          value={selectedAccount}
          onChange={handleAccountChange}
          className="border rounded px-2 py-1">
          <option value="">-- Select an account --</option>
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name} ({account.id})
            </option>
          ))}
        </select>
      </div>

      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload} className="mt-2 border px-4 py-2 rounded">
        Upload
      </button>

      {loading && <p className="mt-2 text-blue-500">Uploading...</p>}
      {uploadComplete && !loading && (
        <p className="mt-2 text-green-600">Upload Complete ✅</p>
      )}
      {error && <p className="mt-2 text-red-500">{error}</p>}

      {Array.isArray(receivedData) &&
        receivedData.length > 0 &&
        typeof receivedData[0] === "object" && (
          <table className="mt-4 border border-collapse">
            <thead>
              <tr>
                {Object.keys(receivedData[0]).map((key) => (
                  <th key={key} className="border p-2">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {receivedData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((val, idx) => (
                    <td key={idx} className="border p-2">
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div>
  );
}

export default CsvUploader;
