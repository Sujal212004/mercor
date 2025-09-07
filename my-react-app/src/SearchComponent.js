import React, { useState, useEffect } from "react";

// Mock API search function
const mockSearch = (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = ["Apple", "Banana", "Orange", "Grapes", "Mango"];
      const filtered = data.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      resolve(filtered);
    }, 1000);
  });
};

const SearchComponent = () => {
  const [query, setQuery] = useState("");      // 1. Search
  const [results, setResults] = useState([]);  // 3. Display
  const [loading, setLoading] = useState(false); // 2. Loading

  useEffect(() => {
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timeoutId = setTimeout(async () => {
      const data = await mockSearch(query);
      setResults(data);
      setLoading(false);
    }, 500); // debounce search

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", textAlign: "center" }}>
      {/* 1. Search */}
      <input
        type="text"
        placeholder="Type to search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "8px", width: "100%" }}
      />

      {/* 2. Loading */}
      {loading && <p>Loading results...</p>}

      {/* 3. Display */}
      {!loading && results.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {results.map((item, index) => (
            <li key={index} style={{ padding: "5px 0", borderBottom: "1px solid #ccc" }}>
              {item}
            </li>
          ))}
        </ul>
      )}

      {!loading && query && results.length === 0 && <p>No results found.</p>}
    </div>
  );
};

export default SearchComponent;
