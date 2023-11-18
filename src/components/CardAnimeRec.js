import React from "react";
import { Link } from "react-router-dom";
import "./CardAnimeRec.css";

export default function CardAnimeRec({ Rec }) {
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  const truncatedTitle = truncateText(Rec.Judul, 20); // Adjust the maximum length as needed

  return (
    <Link to={`/DetailRec/${Rec.id_anime}`} className="RecCard">
      <div className="cardContent">
        <img className="thumbnail" src={Rec.Image} alt={Rec.Judul} />
        <div className="text">
          <h2 title={Rec.Judul}>{truncatedTitle}</h2>
          <p className="sinopsis">{truncateText(Rec.Sinopsis, 100)}</p>
        </div>
      </div>
    </Link>
  );
}
