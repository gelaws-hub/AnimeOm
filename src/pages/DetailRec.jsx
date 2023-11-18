import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Gap from "../components/Gap";
import "./DetailRec.css";

export default function DetailRec() {
  const { id_anime } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPlatform, setCurrentPlatform] = useState("video"); // "video" or "youtube"

  useEffect(() => {
    async function fetchDetailRec() {
      try {
        const response = await axios.get(
          "https://api.npoint.io/3e511211141379ab8949/",
          {
            params: {
              id_anime,
            },
          }
        );
        if (response.status === 200) {
          setData(response.data[id_anime - 1]);
        }
      } catch (err) {
        console.log("err", err);
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
    setCurrentPlatform((prevPlatform) =>
      prevPlatform === "video" ? "youtube" : "video"
    );
  };

  return (
    <Layout className="layoutStyle">
      <div className="contentDetailRec">
        {isLoading ? (
          <p>Please wait</p>
        ) : (
          <>
            <img className="imageContainer" src={data.Image} alt="Movie Cover" />
            <div className="CardDetailRec">
              <h1 className="contentAnime">{data.Judul}</h1>
              <div className="sinopsisContainer">
                <p className="sinopsisText">
                  {data.Rate}
                  <br/><br/>
                  {data.Sinopsis}</p>
              </div>
              <Gap height={20} />
              {currentPlatform === "video" ? (
                <iframe
                  className="animePlayer"
                  src={data.Video}
                  allow="autoplay"
                  allowFullScreen
                ></iframe>
              ) : (
                <iframe
                  src={data.Youtube}
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  allowfullscreen
                ></iframe>
              )}
              <div className="buttonProps">
              <p className="buttonInfo">Ganti Platform kalau tidak bisa diputar <br/>
                Current Platform: {currentPlatform === "video" ? "Google Drive" : "YouTube"}</p>
              <button onClick={togglePlatform}>Switch Platform</button>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
