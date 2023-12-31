// DetailRec.js

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import safe from 'react-safe';
import Layout from '../components/Layout';
import Gap from '../components/Gap';
import VideoPlayer from './VideoPlayer'; // Import the VideoPlayer component
import './DetailRec.css';

export default function DetailRec() {
  const { id_anime } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPlatform, setCurrentPlatform] = useState('video'); // 'video' or 'youtube'

  useEffect(() => {
    async function fetchDetailRec() {
      try {
        const response = await axios.get('https://api.npoint.io/3e511211141379ab8949/', {
          params: {
            id_anime,
          },
        });
        if (response.status === 200) {
          setData(response.data[id_anime - 1]);
        }
      } catch (err) {
        console.log('err', err);
      }
    }

    async function fetchData() {
      setIsLoading(true);
      await fetchDetailRec();
      setIsLoading(false);
    }

    fetchData();
  }, [id_anime]);

  const togglePlatform = () => {
    setCurrentPlatform((prevPlatform) => (prevPlatform === 'video' ? 'youtube' : 'video'));
  };

  const newLocal = <div className="disqussThread" id="disqus_thread"></div>;

  return (
    <Layout className="layoutStyle">
      <div className="contentDetailRec">
        {isLoading ? (
          <p className="loadingText">Tunggu ngab...</p>
        ) : (
          <>
            <img className="imageContainer" src={data.Image} alt="Movie Cover" />
            <div className="CardDetailRec">
              <h1 className="contentAnime">{data.Judul}</h1>
              <div className="sinopsisContainer">
                <p className="sinopsisText">
                  {data.Rate}
                  <br />
                  <br />
                  {data.Sinopsis}
                </p>
              </div>
              <Gap height={20} />
              {/* Use the VideoPlayer component */}
              <VideoPlayer currentPlatform={currentPlatform} data={data} togglePlatform={togglePlatform} />
              {newLocal}
            </div>
          </>
        )}
      </div>
      <safe.script>
        {(function () {
          // DON'T EDIT BELOW THIS LINE
          var d = document,
            s = d.createElement('script');
          s.src = 'https://animeom.disqus.com/embed.js';
          s.setAttribute('data-timestamp', +new Date());
          (d.head || d.body).appendChild(s);
        })()}
      </safe.script>
    </Layout>
  );
}
