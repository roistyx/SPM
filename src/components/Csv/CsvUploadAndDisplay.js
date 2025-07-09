import React, { useState } from "react";
import axios from "axios";

function CsvUploader() {
  const [file, setFile] = useState(null);
  const [receivedData, setReceivedData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  console.log("Upload sent and received successfully", receivedData);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadComplete(false); // Reset completion status when selecting a new file
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ":", pair[1]);
    // }

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
