import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import safe from "react-safe";
import Layout from "../components/Layout";
import "./DetailTop.css";

export default function DetailTop() {
  const { mal_id } = useParams();
  const [animeDetail, setAnimeDetail] = useState(null);

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      try {
        const response = await axios.get(
          `https://api.jikan.moe/v4/anime/${mal_id}`
        );
        if (response.status === 200) {
          setAnimeDetail(response.data.data); // Use response.data.data to set animeDetail
        }
      } catch (err) {
        console.log("Error fetching details:", err);
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
              <img
                src={animeDetail.images?.jpg?.image_url}
                alt={animeDetail.title}
              />
            </div>
            <div className="topInfo">
              <p>
                <strong className="boldText">Type: </strong>
                {animeDetail.type}, <br />
                <strong className="boldText">Episodes:</strong>{" "}
                {animeDetail.episodes}
              </p>
              <p>
                {" "}
                <strong className="boldText">Status: </strong>{" "}
                {animeDetail.status}
              </p>
              <p>
                {" "}
                <strong className="boldText">Score: </strong>{" "}
                {animeDetail.score}
              </p>
              {animeDetail.aired && (
                <p>
                  <strong className="boldText">Aired: </strong>{" "}
                  {new Date(animeDetail.aired.from).toLocaleDateString()}{" "}
                  {animeDetail.aired.to &&
                    `to ${new Date(animeDetail.aired.to).toLocaleDateString()}`}
                </p>
              )}
              {animeDetail.genres && (
                <p>
                  <strong className="boldText">Genres:</strong>{" "}
                  {animeDetail.genres.map((genre, index) => (
                    <span key={genre.mal_id}>
                      {index > 0 && ", "}
                      {genre.name}
                    </span>
                  ))}
                </p>
              )}
            </div>
            <p className="synopsis">{animeDetail.synopsis}</p>
            {/* Add more details as needed */}
          </>
        ) : (
          <p className="loadingText">Tunggu ngab...</p>
        )}
      </div>
      <div className="disqussThread" id="disqus_thread"></div>
      <safe.script>
        {(function () {
          // DON'T EDIT BELOW THIS LINE
          var d = document,
            s = d.createElement("script");
          s.src = "https://animeom.disqus.com/embed.js";
          s.setAttribute("data-timestamp", +new Date());
          (d.head || d.body).appendChild(s);
        })()}
      </safe.script>
    </Layout>
  );
}
