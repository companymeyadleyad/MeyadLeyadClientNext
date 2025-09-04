"use client";

import React, { useState } from "react";
import { PropertyService } from "@/services/propertyService";

const UploadExcelForm: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<null | { type: "ok" | "error"; text: string }>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
    setStatus(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setIsLoading(true);
    setStatus(null);

    try {
      const service = new PropertyService();
      // keep the original method name if your service uses uploadExel:
      const res = await service.uploadExel(selectedFile);
      console.log("File uploaded:", res);
      setStatus({ type: "ok", text: "הקובץ הועלה בהצלחה" });
      setSelectedFile(null);
    } catch (err) {
      console.error("Upload failed:", err);
      setStatus({ type: "error", text: "העלאה נכשלה. נסה שוב." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        color: "#1a1a1a",
        minHeight: "100vh",
        direction: "rtl",
      }}
    >
      <h1 style={{ color: "#1a3b6d", marginBottom: 16 }}>העלאת קובץ אקסל</h1>

      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        style={{
          padding: "10px",
          border: "1px solid #1a3b6d",
          borderRadius: "5px",
          backgroundColor: "#ffffff",
          color: "#1a1a1a",
          cursor: "pointer",
          marginBottom: "10px",
          display: "block",
        }}
      />

      <button
        onClick={handleUpload}
        disabled={!selectedFile || isLoading}
        style={{
          padding: "10px 20px",
          backgroundColor: "#1a3b6d",
          color: "#ffffff",
          border: "none",
          borderRadius: "5px",
          cursor: !selectedFile || isLoading ? "not-allowed" : "pointer",
          marginRight: "10px",
        }}
      >
        {isLoading ? "מעלה..." : "העלה קובץ"}
      </button>

      {status && (
        <div
          style={{
            marginTop: 12,
            color: status.type === "ok" ? "#1f7a1f" : "#a11",
            fontWeight: 600,
          }}
        >
          {status.text}
        </div>
      )}
    </div>
  );
};

export default UploadExcelForm;
