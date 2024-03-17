import YouTube from "react-youtube";
import React from "react";

const YoutubePlayer = ({ videoId, className = "" }) => {
  return (
    <div>
      <YouTube
        className={className}
        iframeClassName="w-full h-full"
        videoId={videoId}
      />
    </div>
  );
};

export default YoutubePlayer;
