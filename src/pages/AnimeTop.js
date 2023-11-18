// AnimeTop.js

import axios from 'axios';
import { useEffect, useState } from 'react';
import Gap from '../components/Gap';
import CardAnimeTop from '../components/CardAnimeTop';
import Layout from '../components/Layout';
import './AnimeTop.css';

export default function AnimeTop() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchTop = async () => {
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/top/anime?page=${currentPage}`);
      if (response.status === 200) {
        setData(response.data.data); // Assuming the data is in the 'data' field
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

  useEffect(() => {
    fetchData();
  }, [currentPage]); // Trigger fetchData when currentPage changes

  return (
    <Layout>
      <div className="contentTop">
        <h2>Top Anime</h2>
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
        {/* Duplicate the pageButtons section for the buttons at the bottom */}
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
}
