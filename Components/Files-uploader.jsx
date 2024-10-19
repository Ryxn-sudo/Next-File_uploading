'use client';

import React, { useState } from 'react';

export function FileUploader() {
  const [files, setFiles] = useState([]);  // State to hold selected files
  const [uploading, setUploading] = useState(false); // State to indicate uploading status

  // Handle file selection
  const onDrop = (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  // Handle file removal
  const onRemove = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // Upload the files to the server
  async function uploadFiles() {
    setUploading(true);  // Set uploading state to true

    var formData = new FormData();

    // Append each selected file to FormData
    files.forEach((file) => {
      formData.append('files', file);
    });

    var requestOptions = {
      method: 'POST',
      body: formData,
    };

    try {
      const response = await fetch("/api/upload", requestOptions);
      const result = await response.json();
      console.log(result);
      alert('Files uploaded successfully!')

      // Reset state after successful upload
      setFiles([]);
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('An error occurred during file upload.',error);
    } finally {
      setUploading(false);  // Set uploading state to false
    }
  }

  return (
    <div className="flex flex-col gap-6 px-40">
      <div
        className="flex flex-col items-center justify-center gap-4 border-2 border-dashed rounded-lg p-6 cursor-pointer"
        onClick={() => document.getElementById('file-input').click()}
      >
        <div className="rounded-full border border-dashed p-3">
          <svg
            className="h-10 w-10 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16l4 4m0 0l4-4m-4 4V4m13 0a2 2 0 00-2-2H6a2 2 0 00-2 2v12m15-9h2a2 2 0 012 2v8a2 2 0 01-2 2h-2M16 3h-4m0 0V0m0 0L9 3"
            ></path>
          </svg>
        </div>
        <p className="font-medium text-gray-500">Drop files here or click to upload</p>
        <input
          id="file-input"
          type="file"
          accept=".doc,.docx"
          multiple
          onChange={onDrop}
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          {files.map((file, index) => (
            <div key={index} className="flex justify-between items-center">
              <p>{file.name}</p>
              <button
                onClick={() => onRemove(index)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={uploadFiles}
            className="bg-blue-500 text-white p-2 rounded-lg"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Files'}
          </button>
        </div>
      )}
    </div>
  );
}
