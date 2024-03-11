import { useEffect, useState } from "react";
import "./YoutubeEmbed.css"
import configData from "../../config.json";
import ApiHandler from "../../Hooks/ApiHandler";
import "./YoutubeEmbed.css";



export default function YoutubeEmbed({ selected = false, setSelected }) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videos, setVideos] = useState([]);
  const youtube_logo = `${configData.SERVER_URL}/assets/images/youtube_logo_white_circle.svg`;

  const { data, loading, error, setOp } = ApiHandler();

  useEffect(() => {
    setOp("/api/youtube");
  }, []);

  const getVideos = () => {
    let items = data?.items;
    let videos = items?.map((video) => {
      return {
        id: video.snippet.resourceId.videoId,
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnails: video.snippet.thumbnails,
      };
    });
    return videos;
  };

  useEffect(() => {
    if (!loading) {
      if (!error) {
        setVideos(data);
      } else console.log(error);
    }
  }, [loading]);

  console.log(videos);
  return selected ? (
    <>
      {videos?.length ? (
        <div className="youtube-media-container">
          <div className="youtube-current-video">
            <iframe
              src={`https://www.youtube.com/embed/${videos[currentVideoIndex]?.id}`}
              allowFullScreen
              frameborder="0"
              width="100%"
              height="100%"
            />
          </div>
          <div className="youtube-video-playlist">
            {videos.reduce((a, v, i) => {
              if (i !== currentVideoIndex) {
                let pinkienail = v.thumbnails.default;
                a.push(
                  <div
                    className="playlist-video"
                    key={i}
                    onClick={() => setCurrentVideoIndex(i)}
                  >
                    <img src={pinkienail.url} />
                    <div className="playlist-video-title">{v.title}</div>
                  </div>
                );
              }
              return a;
            }, [])}
          </div>
        </div>
      ) : (
        <div>
          <h1>Failed to Load Videos</h1>
        </div>
      )}
    </>
  ) :
    (<div className="youtube-selector" onClick={() => setSelected()}>
      <img src={youtube_logo} style={{ position: "relative", width: '85%', top: '2%' }} />
    </div>)
}

