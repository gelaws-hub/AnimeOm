import axios from 'axios';
import { useEffect, useState } from 'react';
import Gap from '../components/Gap';
import CardAnimeRec from '../components/CardAnimeRec';
import Layout from '../components/Layout';
import './AnimeRec.css';

export default function AnimeRec() {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchRec() {
      try {
        const response = await axios.get('https://api.npoint.io/3e511211141379ab8949/');
        if (response.status === 200) {
          setData(response.data);
          setFilteredData(response.data);
        }
      } catch (err) {
        console.log('err', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRec();
  }, []);

  const handleSearch = () => {
    const searchTermLower = searchTerm.toLowerCase();
    const filtered = data.filter((item) =>
      item.Judul.toLowerCase().includes(searchTermLower)
    );
    setFilteredData(filtered);
  };


  return (
    <Layout>
      <div className="contentRec">
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {isLoading ? (
          <p className='loadingText'>Tunggu ngab...</p> // Adjust the style as needed
        ) : (
          filteredData.map(function (item, index) {
            return (
              <div key={index}>
                <Gap height={0} />
                <CardAnimeRec Rec={item} />
              </div>
            );
          })
        )}
      </div>
    </Layout>
  );
}
