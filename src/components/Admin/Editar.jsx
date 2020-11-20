import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {  useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  StartDelete,

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

export const Editar = ({history}) => {
  const { id } = useParams();
  

  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(initialState);
  const [error, setError] = useState(false);
  const [peliculaInfo, setPeliculaInfo] = useState("");
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
    trailerId,
  } = formValues;

  const cargar = async () => {
    const resp = await fetch(`${process.env.REACT_APP_API_URL}/${id}`);
    const data = await resp.json();
    const pelicula = data.pelicula;
    setPeliculaInfo(pelicula);

    let { ...formValues } = pelicula;
    setFormValues({
      ...formValues,
      imagen: "",
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
    if (photo !== undefined) {
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
          dispatch(StartUpdateMovie(id, formValues, imagen));
        });
    } else {
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
        <div className="row">
          <div className="col-12 col-md-4 col-lg-4">
            <img
              src={peliculaInfo.imagen}
              alt={peliculaInfo.titulo}
              className="img-fluid rounded mb-4"
            />
            <button onClick={handleDelete} className="btn btn-primary">
              Borrar Pelicula
            </button>
          </div>
          <div className="col-12 col-md-8 col-lg-8">
            <form onSubmit={handleSubmit}>
              <section className="row">
                <article className="col-12 col-md-4 col-lg-4">
                  <div className="form-group">
                    <input
                      placeholder={
                        error ? `* Titulo no puede quedar vacio` : "Titulo"
                      }
                      className={error ? "form-control error" : "form-control"}
                      onChange={handleInputChange}
                      type="text"
                      name="titulo"
                      value={titulo}
                    />
                  </div>
                </article>

                <article className="col-12 col-md-4 col-lg-4">
                  <div className="form-group">
                    <input
                      placeholder={
                        error
                          ? `* Titulos no puede quedar vacio`
                          : "Titulos Adicionales"
                      }
                      className={error ? "form-control error" : "form-control"}
                      onChange={handleInputChange}
                      type="text"
                      name="titulos"
                      value={titulos}
                    />
                  </div>
                </article>

                <article className="col-12 col-md-4 col-lg-4">
                  <div className="form-group">
                    <input
                      placeholder={
                        error
                          ? `* Generos no puede quedar vacio`
                          : "Generos Ex:('Accion,Aventura')"
                      }
                      className={error ? "form-control error" : "form-control"}
                      onChange={handleInputChange}
                      type="text"
                      name="genero"
                      value={genero}
                    />
                  </div>
                </article>
              </section>

              <section className="row">
                <article className="col-12 col-md-4 col-lg-4">
                  <div className="form-group">
                    <input
                      placeholder={
                        error ? `* Director no puede quedar vacio` : "director"
                      }
                      className={error ? "form-control error" : "form-control"}
                      onChange={handleInputChange}
                      type="text"
                      name="director"
                      value={director}
                    />
                  </div>
                </article>

                <article className="col-12 col-md-4 col-lg-4">
                  <div className="form-group">
                    <input
                      placeholder={
                        error
                          ? `* Audio no puede quedar vacio`
                          : "Tipos de Audio"
                      }
                      className={error ? "form-control error" : "form-control"}
                      onChange={handleInputChange}
                      type="text"
                      name="audio"
                      value={audio}
                    />
                  </div>
                </article>

                <article className="col-12 col-md-4 col-lg-4">
                  <div className="form-group">
                    <input
                      placeholder={
                        error
                          ? `* Puntuacion no puede quedar vacio`
                          : "Puntuacion o Valoracion"
                      }
                      className={error ? "form-control error" : "form-control"}
                      onChange={handleInputChange}
                      type="text"
                      name="puntuacion"
                      value={puntuacion}
                    />
                  </div>
                </article>
              </section>

              <section className="row">
              <article className="col-12 col-md-3 col-lg-3">
                  <div className="form-group">
                    <input
                      id="actual-btn"
                      ref={fileRef}
                      onChange={handleInputChange}
                      type="file"
                      name="imagen"
                      value={imagen}
                      hidden={true}
                    />
                    <label className="btnImg" htmlFor="actual-btn">
                      Cambiar Imagen
                    </label>
                  </div>
                </article>
                <article className="col-12 col-md-3 col-lg-3">
                  <div className="form-group">
                    <input
                      placeholder="Link Para ver online"
                      className="form-control"
                      onChange={handleInputChange}
                      type="text"
                      name="online"
                      value={online}
                    />
                  </div>
                </article>

                <article className="col-12 col-md-3 col-lg-3">
                  <div className="form-group">
                    <input
                      placeholder="Link de Descarga"
                      className="form-control"
                      onChange={handleInputChange}
                      type="text"
                      name="descarga"
                      value={descarga}
                    />
                  </div>
                </article>

                <article className="col-12 col-md-3 col-lg-3">
                  <div className="form-group">
                    <input
                      placeholder="Id de Youtube Para Trailers"
                      onChange={handleInputChange}
                      type="text"
                      name="trailerId"
                      value={trailerId}
                      className="form-control"
                    />
                  </div>
                </article>

                
              </section>

              <section className="row">
                <div className="form-group col-12 col-md-4 col-lg-4">
                  <textarea
                    placeholder={
                      error
                        ? `* Plot no puede quedar vacio`
                        : "Plot o Trama de la Pelicula/Serie/Anime"
                    }
                    className={error ? "form-control error" : "form-control"}
                    onChange={handleInputChange}
                    name="plot"
                    rows="5"
                    value={plot}
                  ></textarea>
                </div>

                <div className="form-group col-12 col-md-4 col-lg-4">
                  <textarea
                    placeholder={
                      error
                        ? `* Elenco no puede quedar vacio`
                        : "Informacion del Elenco"
                    }
                    className={error ? "form-control error" : "form-control"}
                    onChange={handleInputChange}
                    name="elenco"
                    rows="5"
                    value={elenco}
                  ></textarea>
                </div>
                <div className="form-group col-12 col-md-4 col-lg-4">
                  {error ? (
                    <label htmlFor="seccion" className="text-danger">
                      * Debe Seleccionar Donde Guardar
                    </label>
                  ) : (
                    <label htmlFor="seccion">Tabla donde Guardar</label>
                  )}

                  <select
                    onChange={handleInputChange}
                    name="seccion"
                    className={
                      error ? "form-control error" : "form-control col"
                    }
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
              </section>

              <button className="btnAgregar">Editar</button>
            </form>
          </div>
        </div>
      </article>
    </section>
  );
};
