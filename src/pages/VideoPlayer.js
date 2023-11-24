import React, { useState } from 'react';

const VideoPlayer = ({ currentPlatform, data, togglePlatform }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const switchVideo = (index) => {
    setCurrentVideoIndex(index);
  };

  return (
    <>
      {currentPlatform === 'video' ? (
        Array.isArray(data.Video) && data.Video.length > 0 ? (
          <div>
            {currentVideoIndex < data.Video.length && ( //Google Drive
              <iframe
                title="Google Drive Video"
                className="animePlayer"
                src={data.Video[currentVideoIndex]}
                allow="autoplay"
                allowFullScreen
              ></iframe>
            )}
            {data.Video.length > 1 && (
              <div>
                <p>Switch Video:</p>
                {data.Video.map((video, index) => (
                  <button
                    key={index}
                    onClick={() => switchVideo(index)}
                    className={currentVideoIndex === index ? 'activeEpisode' : ''}
                  >
                    Eps {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <iframe
            title="Google Drive Video"
            className="animePlayer"
            src={data.Video}
            allow="autoplay"
            allowFullScreen
          ></iframe>
        )
      ) : ( //Youtube
        Array.isArray(data.Youtube) && data.Youtube.length > 0 ? (
          <div>
            {currentVideoIndex < data.Youtube.length && (
              <iframe
                title="YouTube Video"
                width="560"
                height="315"
                src={data.Youtube[currentVideoIndex]}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
            {data.Youtube.length > 1 && (
              <div>
                <p>Switch Video:</p>
                {data.Youtube.map((video, index) => (
                  <button
                    key={index}
                    onClick={() => switchVideo(index)}
                    className={currentVideoIndex === index ? 'activeEpisode' : ''}
                  >
                    Eps {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <iframe
            title="YouTube Video"
            width="560"
            height="315"
            src={data.Youtube}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )
      )}
      <div className="buttonProps">
        <p className="buttonInfo">
          Ganti Platform kalau tidak bisa diputar <br />
          Current Platform: {currentPlatform === 'video' ? 'Google Drive' : 'YouTube'}
        </p>
        <button onClick={togglePlatform}>Switch Platform</button>
      </div>
    </>
  );
};

export default VideoPlayer;
