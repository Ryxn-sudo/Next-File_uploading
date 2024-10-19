"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
export default function FileList() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    async function fetchFiles() {
      try {
        const response = await fetch('/api/files');
        const data = await response.json();
        setFiles(data);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    }
    
    fetchFiles();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10; // Number of entries to show per page
  const totalEntries = files.length; // Total number of files
 
 
  // Calculate the starting and ending index for the current page
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = Math.min(startIndex + entriesPerPage, totalEntries);

  // Paginate the files
  const paginatedFiles = files.slice(startIndex, endIndex);

  // Handle Pagination buttons
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };
  const router = useRouter();
    const handleSubmit = () => {
        router.push("/Files/upload");
    };
  return (
    <div className="container mx-auto p-4">
  {/* Header section */}
  <div className="flex justify-between items-center mb-4">
    <h1 className="text-2xl font-bold">Word Files (20)</h1>
    <button  onClick={handleSubmit}
      className="bg-orange-500 text-white px-4 py-2 rounded" 
    >
      + Add New
    </button>
  </div>

  {/* Search and Categories */}
  <div className="flex justify-between items-center mb-4">
    <input 
      type="text" 
      placeholder="Search name..." 
      className="border rounded p-2 w-1/2"
    />
    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Categories</button>
  </div>

  {/* Product Table */}
  <table className="w-full text-left border-collapse">
    <thead>
      <tr>
        <th className="border p-2">NAME</th>

      </tr>
    </thead>
    <tbody>
    {files.map((file, index) => (
          <tr key={index}>
            <td className="border p-2">{file}</td>
          </tr>
    ))}
    </tbody>
  </table>

  {/* Pagination */}
  <div className="flex justify-between items-center mt-4">
        <div>
          Showing {startIndex + 1} to {endIndex} of {totalEntries} entries
        </div>
        <div className="flex space-x-2">
          <button 
            className="bg-gray-200 p-2 rounded" 
            onClick={handleFirstPage} 
            disabled={currentPage === 1}
          >
            &lt;&lt;
          </button>
          <button 
            className="bg-gray-200 p-2 rounded" 
            onClick={handlePreviousPage} 
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <button 
            className="bg-gray-200 p-2 rounded" 
            onClick={handleNextPage} 
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
          <button 
            className="bg-gray-200 p-2 rounded" 
            onClick={handleLastPage} 
            disabled={currentPage === totalPages}
          >
            &gt;&gt;
          </button>
        </div>
      </div>
</div>

  );
}
