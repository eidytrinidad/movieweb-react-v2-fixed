import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StartGetNuevas } from "../../actions/peliculas";
import { MovieGrid } from "../Main/MovieGrid";

export const Nuevo = () => {
  const dispatch = useDispatch();
  const { peliculas } = useSelector((state) => state.peliculas);

  useEffect(() => {
    dispatch(StartGetNuevas());
  }, [dispatch]);

  return (
    <article className="MovieGrid">
      {peliculas ? (
        <MovieGrid peliculas={peliculas} />
      ) : (
        <h4 className="loading animate__animated animate__flash">
          <i className="fas fa-spinner fa-spin"></i> Loading
        </h4>
      )}
    </article>
  );
};
