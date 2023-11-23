import React from 'react';
import CardAnimeTop from '../components/CardAnimeTop';
import Layout from '../components/Layout';
import { useLocation } from 'react-router-dom';

const AnimeTopSearch = () => {
    const location = useLocation();
    console.log('Location:', location);
    const searchData = location?.state?.searchData;
    console.log('Search Data:', searchData);

  return (
    <Layout>
      <div className="contentTop">
        <h2>Search Results</h2>
        {searchData?.map((item, index) => (
          <div key={index}>
            <CardAnimeTop anime={item} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default AnimeTopSearch;
