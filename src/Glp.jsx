import React, { useState } from 'react';

function LanguageModelInterface() {
  const [query, setQuery] = useState('');
  const [file, setFile] = useState(null);
  const [modelResponse, setModelResponse] = useState('');

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    if (file) {
      // Handle file upload
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/query', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        const modelResponse = data.response;
        setModelResponse(modelResponse);
      } catch (error) {
        console.error('File upload error:', error);
      }
    } else if (query) {
      // Handle text query
      try {
        const response = await fetch('/query', {
          method: 'POST',
          body: new URLSearchParams({ query: query }),
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        const data = await response.json();
        const modelResponse = data.response;
        setModelResponse(modelResponse);
      } catch (error) {
        console.error('Text query error:', error);
      }
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <h1>Welcome to Your Language Model Interface</h1>

      <form method="POST" action="/query" encType="multipart/form-data">
        <label htmlFor="file">Upload a PDF:</label>
        <input type="file" name="file" id="file" onChange={handleFileChange} />
        <button type="submit" onClick={handleQuerySubmit}>Upload PDF</button>
      </form>

      <form method="POST" action="/query">
        <label htmlFor="query">Enter your query:</label>
        <input type="text" name="query" id="query" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button type="submit" onClick={handleQuerySubmit}>Submit Query</button>
      </form>

      <div id="model-response">{modelResponse}</div>

      <a href="/download_report" download>Download PDF Report</a>
    </div>
  );
}

export default LanguageModelInterface;