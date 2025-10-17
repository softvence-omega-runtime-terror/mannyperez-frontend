import React from "react";

const VideoPlayer = () => {
  return (
    <div className="w-full h-full aspect-video">
      <video
        className="w-full h-full rounded-xl shadow-lg"
        controls
        autoPlay={false}
        muted={false}
        poster="/public/videBanner.png"
      >
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
