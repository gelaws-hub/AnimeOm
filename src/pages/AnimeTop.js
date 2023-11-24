/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import CardAnimeTop from '../components/CardAnimeTop';
import Layout from '../components/Layout';
import './AnimeTop.css';

const AnimeTop = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchTop = async () => {
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/top/anime?page=${currentPage}`);
      if (response.status === 200) {
        setData(response.data.data);
      }
    } catch (err) {
      console.log('err', err);
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

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${searchQuery}`);
      const searchData = response.data?.data; // Adjust this line to match the structure
      console.log('Search Data AnimeTop:', searchData);
      navigate('/AnimeTop/Search', { state: { searchData } });
    } catch (err) {
      console.log('Error:', err);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <Layout>
      <div className="contentTop">
        <h2>Top Anime</h2>
        <div className="searchBar">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for anime..."
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="pageButtons">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous Page
          </button>
          <span className="pageNumber">Page {currentPage}</span>
          <button onClick={() => handlePageChange(currentPage + 1)}>Next Page</button>
        </div>
        {isLoading ? (
          <p>Please wait</p>
        ) : (
          data?.map((item, index) => (
            <div key={index}>
              <CardAnimeTop anime={item} />
            </div>
          ))
        )}
        <div className="pageButtons">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous Page
          </button>
          <span className="pageNumber">Page {currentPage}</span>
          <button onClick={() => handlePageChange(currentPage + 1)}>Next Page</button>
        </div>
      </div>
    </Layout>
  );
};

export default AnimeTop;
