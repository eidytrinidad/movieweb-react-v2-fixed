import React, { useEffect, useState } from "react";
import { Player } from "./Player";
import { Trailer } from "./Trailer";
import { useDispatch, useSelector } from "react-redux";
import { StartGetTrailers } from "../../../actions/peliculas";

export const TrailersContainer= () => {
  const dispatch = useDispatch();
  const { trailers } = useSelector((state) => state.peliculas);

  const [trailerID, setTrailerID] = useState("KK8FHdFluOQ");

  useEffect(() => {
    dispatch(StartGetTrailers());
  }, [dispatch,trailerID]);

  return (
    <article className="MovieGrid">
      {trailers && (
        <>
          <Player trailerId={trailerID} />
          <Trailer trailers={trailers} setTrailerID={setTrailerID} />
        </>
      )}
    </article>
  );
};
