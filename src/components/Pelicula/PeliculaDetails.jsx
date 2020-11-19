import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { StartGetPeliculaById } from "../../actions/peliculas";

export const PeliculaDetails = () => {

const {id}=useParams()
const dispatch = useDispatch()
const {pelicula}= useSelector(state => state.peliculas)


useEffect(() => {
dispatch(StartGetPeliculaById(id))
console.log("PeliculaDetails",pelicula);
}, [dispatch,id])

return (
<main>
  {
    pelicula
    &&
    <section className="contenedor">
    <h3 className="tituloPelicula">{pelicula.titulo}</h3>
    <article className="detallePelicula">
      <div className="portada">
        <img src={pelicula.imagen} alt={pelicula.titulo} />
      </div>

      <div className="texto">
        <p className="plot">{pelicula.plot}</p>

        <p className="titulo"><b>Títulos</b>:{pelicula.titulos}</p>

        <p className="generos"><b>Géneros</b>:{pelicula.genero}r</p>

        <p className="audio"><b>Audio:</b>{pelicula.audio}</p>

        <p className="director"><b>Director</b>:{pelicula.director}</p>

        <p className="elenco"><b>Elenco: </b>{pelicula.elenco}</p>
      </div>
    </article>
    <article className="links">
    {(pelicula.descarga==="" || pelicula.descarga===undefined) 
                ?
                <h5 className="mt-5 text-center" >No disponible para descargas por el momento</h5>
                :
                <>
                <h3>VER ONLINE/DESCARGAR</h3>
                <a href={pelicula.online} target="_blank">
                  <img src="/images/veronline.png" alt="ver online" />
                </a>
                <a href={pelicula.descarga} target="_blank">
                  <img src="/images/descargar.png" alt="descargar" />
                </a>
              </>
            }
      
    </article>
  </section> }
</main>
);
};