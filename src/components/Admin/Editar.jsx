import React, { useEffect, useRef, useState } from "react";
import { useDispatch} from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  StartDelete,
  StartGetPeliculaById,
  StartUpdateMovie,
} from "../../actions/peliculas";
import { projectStorage } from "../../firebase/config";


const initialState = {
  titulo: "",
  genero: "",
  director: "",
  audio: "",
  elenco: "",
  imagen: "",
  plot: "",
  puntuacion: "",
  descarga: "",
  online: "",
  titulos: "",
  seccion: "",
};

export const Editar = () => {
  const { id } = useParams();

  
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(initialState);
  const fileRef = useRef();
  
  const {
    titulo,
    genero,
    director,
    audio,
    elenco,
    imagen,
    plot,
    puntuacion,
    descarga,
    online,
    titulos,
    seccion,
  } = formValues;

  const cargar = async () => {
    const resp = await fetch(
      `${process.env.REACT_APP_API_URL}/${id}`
    );
    const data = await resp.json();
    const pelicula =  data.pelicula;


    let { ...formValues } = pelicula;
    setFormValues({
      ...formValues,
      imagen:""
    });
  };
  useEffect(() => {

    cargar();
  }, [dispatch]);

  const handleSubmit = (e) => {

    if (titulo == "") {
      return setError(true);
    }
    if (genero == "") {
      return setError(true);
    }
    if (director == "") {
      return setError(true);
    }
    if (audio == "") {
      return setError(true);
    }
    if (elenco == "") {
      return setError(true);
    }
    if (plot == "") {
      return setError(true);
    }
    if (puntuacion == "") {
      return setError(true);
    }
    if (titulos == "") {
      return setError(true);
    }
    if (seccion == "") {
      return setError(true);
    }

    Swal.fire({
      text: "Espere...",
      allowOutsideClick: false,
      icon: "info",
    });
    Swal.showLoading();


    e.preventDefault();
    const storageRef = projectStorage.ref();
    const photo = fileRef.current.files[0];
    if (photo!==undefined) {
      const imagen = photo.name;
      const metadata = {
        contentType: photo.type,
      };
  
      storageRef
        .child(imagen)
        .put(photo, metadata)
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then(async (url) => {
          const imagen = url;
          dispatch(StartUpdateMovie(id, formValues,imagen));
        });
    }else{
      dispatch(StartUpdateMovie(id, formValues));
  
     
    }
   
  };

  const handleDelete = () => {
    dispatch(StartDelete(id));
  };

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
  
      [target.name]: target.value,
    });
  };

  return (
    <section className="AdminGrid">
      <article className="contenedor">
        <h3>Formulario Editar </h3>
        <form onSubmit={handleSubmit}>
          <section className="row">
            <article className="col-12 col-md-4 col-lg-4">
              <div className="form-group">
                <label htmlFor="titulo">Titulo</label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="titulo"
                  value={titulo}
                  className="form-control"
                />
              </div>
            </article>

            <article className="col-12 col-md-4 col-lg-4">
              <div className="form-group">
                <label htmlFor="titulos">Titulos Adicionales</label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="titulos"
                  value={titulos}
                  className="form-control"
                />
              </div>
            </article>

            <article className="col-12 col-md-4 col-lg-4">
              <div className="form-group">
                <label htmlFor="genero">Genero</label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="genero"
                  value={genero}
                  className="form-control"
                />
              </div>
            </article>
          </section>

          <section className="row">
            <article className="col-12 col-md-4 col-lg-4">
              <div className="form-group">
                <label htmlFor="director">Director</label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="director"
                  value={director}
                  className="form-control"
                />
              </div>
            </article>

            <article className="col-12 col-md-4 col-lg-4">
              <div className="form-group">
                <label htmlFor="audio">Audio</label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="audio"
                  value={audio}
                  className="form-control"
                />
              </div>
            </article>

            <article className="col-12 col-md-4 col-lg-4">
              <div className="form-group">
                <label htmlFor="puntuacion">Puntuacion</label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="puntuacion"
                  value={puntuacion}
                  className="form-control"
                />
              </div>
            </article>
          </section>

          <section className="row">
            <article className="col-12 col-md-6 col-lg-6">
              <div className="form-group">
                <label htmlFor="imagen">Imagen</label>
                <input
                
                  id="imagen"
                  ref={fileRef}
                  onChange={handleInputChange}
                  type="file"
                  name="imagen"
                  value={imagen}
                 
                />
              </div>
            </article>

            <article className="col-12 col-md-3 col-lg-3">
              <div className="form-group">
                <label htmlFor="online">Link(Ver Online)</label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="online"
                  value={online}
                  className="form-control"
                />
              </div>
            </article>

            <article className="col-12 col-md-3 col-lg-3">
              <div className="form-group">
                <label htmlFor="descarga">Link(Descarga)</label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="descarga"
                  value={descarga}
                  className="form-control"
                />
              </div>
            </article>
          </section>

          <section className="row">
            <div className="form-group col-12 col-md-4 col-lg-4">
              <label htmlFor="seccion">Tabla donde Guardar</label>
              <select
                onChange={handleInputChange}
                name="seccion"
                className="form-control col"
                value={seccion}
              >
                <option value=""></option>
                <option value="banner">Banner</option>
                <option value="nuevas">Nuevas</option>
                <option value="proximas">Proximamente</option>
                <option value="series">Series</option>
                <option value="anime">Animes</option>
                <option value="mas">Mas</option>
              </select>
            </div>

            <div className="form-group col-12 col-md-4 col-lg-4">
              <label htmlFor="plot">Plot</label>
              <textarea
                onChange={handleInputChange}
                name="plot"
                rows="5"
                className="form-control"
                value={plot}
              >
                {" "}
              </textarea>
            </div>

            <div className="form-group col-12 col-md-4 col-lg-4">
              <label htmlFor="elenco">Elenco</label>
              <textarea
                onChange={handleInputChange}
                name="elenco"
                rows="5"
                className="form-control"
                value={elenco}
              >
                {" "}
              </textarea>
            </div>
          </section>

          <button className="btnAgregar">Agregar</button>
        </form>

        <button onClick={handleDelete} className="btn btn-danger">
          Borrar
        </button>
      </article>
    </section>
  );
};
