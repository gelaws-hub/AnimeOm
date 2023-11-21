import React from "react";
import { Link } from "react-router-dom";
import "./CardAnimeTop.css";

export default function CardAnimeTop({ anime }) {
  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const truncatedTitle = truncateText(anime.title, 20); // Adjust the maximum length as needed

  return (
    <Link to={`/DetailTop/${anime.mal_id}`} className="cardLink">
      <div className="cardContent">
        <div className="thumbnail">
          <img className="thumbnail" src={anime.images.jpg.image_url} alt={anime.title} />
        </div>
        <div className="text">
          <h2 title={anime.title}>{truncatedTitle}</h2>
          <p className="sinopsis">{truncateText(anime.synopsis, 100)}</p>
        </div>
      </div>
    </Link>
  );
}
