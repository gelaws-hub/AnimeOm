import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import safe from "react-safe"
import Layout from '../components/Layout';
import './DetailTop.css'; 

export default function DetailTop() {
    const { mal_id } = useParams();
    const [animeDetail, setAnimeDetail] = useState(null);
  
    useEffect(() => {
      const fetchAnimeDetail = async () => {
        try {
          const response = await axios.get(`https://api.jikan.moe/v4/anime/${mal_id}`);
          if (response.status === 200) {
            setAnimeDetail(response.data.data); // Use response.data.data to set animeDetail
          }
        } catch (err) {
          console.log('Error fetching details:', err);
        }
      };
  
      fetchAnimeDetail();
    }, [mal_id]);
  
    return (
      <Layout>
        <div className="contentDetail">
          {animeDetail ? (
            <>
              <h2>{animeDetail.title}</h2>
              <div className="thumbnailContainer">
                <img src={animeDetail.images?.jpg?.image_url} alt={animeDetail.title} />
              </div>
              <p>
                Type: {animeDetail.type}, Episodes: {animeDetail.episodes}
              </p>
              <p>Status: {animeDetail.status}</p>
              <p>Score: {animeDetail.score}</p>
              {animeDetail.aired && (
              <p>
                Aired: {new Date(animeDetail.aired.from).toLocaleDateString()}{' '}
                {animeDetail.aired.to && `to ${new Date(animeDetail.aired.to).toLocaleDateString()}`}
              </p>
            )}
            {animeDetail.genres && (
              <p>
                Genres:{' '}
                {animeDetail.genres.map((genre) => (
                  <span key={genre.mal_id}>{genre.name} </span>
                ))}
              </p>
            )}
              <p className="synopsis">{animeDetail.synopsis}</p>
              {/* Add more details as needed */}
            </>
          ) : (
            <p className="loadingText">Loading...</p>
          )}
        </div>
        <div className="disqussThread" id="disqus_thread"></div>
        <safe.script>
        {
              (function() { // DON'T EDIT BELOW THIS LINE
                var d = document, s = d.createElement('script');
                s.src = 'https://animeom.disqus.com/embed.js';
                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
                })()
        }
      </safe.script>
      </Layout>
    );
  }