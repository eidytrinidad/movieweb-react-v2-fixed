import React from "react";

export const Player = ({trailerId}) => {
  return (
    <div className="playerSection">
      <div className="player" id="player">
        <iframe
        title="trailerPlayer"
          id="ytplayer"
          type="text/html"
          width="550"
          height="350"
          src={`https://www.youtube.com/embed/${trailerId}?&origin=http://example.com`}
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </div>
  );
};
