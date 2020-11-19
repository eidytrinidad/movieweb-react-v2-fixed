import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { StartGetProximas } from "../../actions/peliculas";


export const Proximamente = () => {

  const dispatch = useDispatch()
  const {peliculas} = useSelector(state => state.peliculas)

  useEffect(() => {
    dispatch( StartGetProximas())
  }, [dispatch])


  return (
    <article className="MovieGrid">
      {peliculas ?  peliculas.map((pelicula) => (
          <div className="movie" key={pelicula._id}>
            <div className="imagen">
              <div className="overlay">
                <div className="info">
                  <p>{pelicula.titulo}</p>
                  <Link to={`/pelicula/${pelicula._id}`} className="btnVerMas">
                    VER MAS
                  </Link>
                </div>
              </div>
              <img src={pelicula.imagen} alt="Proximamente" />
            </div>
            <div className="texto">
              <h4 className="titulo">{pelicula.titulo}</h4>
              <p className="genero">{pelicula.genero}</p>
              <p>
                <b>PROXIMAMENTE</b>
              </p>
            </div>
          </div>
        )) : (

        <h4 className="loading animate__animated animate__flash">
        <i className="fas fa-spinner fa-spin"></i> Loading
      </h4>
       
      )}
    </article>
  );
};
