import React, { useEffect, useState } from "react";
import axios from "axios";
import CardAnimeTop from "../components/CardAnimeTop";
import Layout from "../components/Layout";
import "./AnimeTop.css";

export default function AnimeTop() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const fetchTop = async () => {
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/top/anime?page=${currentPage}`
      );
      if (response.status === 200) {
        setData(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching top anime:", err);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    await fetchTop();
    setIsLoading(false);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const searchAnime = async () => {
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/top/anime?q=title:${searchQuery}`
      );

      setSearchResults(response.data.results || []); // Handle undefined results
    } catch (error) {
      console.error('Error searching for Anime:', error);
    }
  };

  const filteredData = data
    ? data.filter(
        (item) =>
          item.titles.some(
            (title) =>
              title.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : [];

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <Layout>
      <div className="contentTop">
        <h2>Top Anime</h2>

        <form onSubmit={(e) => { e.preventDefault(); searchAnime(); }}>
        <div className="searchBar">
          <input
            id='searchBar'
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" id='searchButton'>Search</button>
        </div>
      </form>

        {searchResults.length > 0 ? (
          <div>
            <h3>Search Results</h3>
            {searchResults.map((result) => (
              <div key={result.mal_id}>
                <CardAnimeTop anime={result} />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="pageButtons">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous Page
              </button>
              <span className="pageNumber">Page {currentPage}</span>
              <button onClick={() => handlePageChange(currentPage + 1)}>
                Next Page
              </button>
            </div>
            {isLoading ? (
              <p className="loadingText">Tunggu ngab...</p>
            ) : (
              filteredData.map((item) => (
                <div key={item.mal_id}>
                  <CardAnimeTop anime={item} />
                </div>
              ))
            )}
            {/* Duplicate the pageButtons section for the buttons at the bottom */}
            <div className="pageButtons">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous Page
              </button>
              <span className="pageNumber">Page {currentPage}</span>
              <button onClick={() => handlePageChange(currentPage + 1)}>
                Next Page
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
