import {
    FetchGetData
} from "../helpers/fetch";
import Swal from 'sweetalert2'
const {
    types
} = require("../types/types");

export const StartGetAllMovies = () => {

    return async (dispatch) => {
        try {
            const resp = await fetch("https://movieweb-react.herokuapp.com/peliculas")
            const data = await resp.json()
            // console.log(data.peliculas)
            const peliculas = data.peliculas
            dispatch(getAllMovies(peliculas))
        } catch (error) {
            console.log(error)
        }
    }

}

const getAllMovies = (peliculas) => ({
    type: types.getAllMovies,
    payload: peliculas
})

export const StartGetProximas = () => {

    return async (dispatch) => {
        const data = await FetchGetData()
        const proximas = data.filter(pelicula => pelicula.seccion === "proximas")
        dispatch(getProximas(proximas))
    }
}

const getProximas = (peliculas) => ({
    type: types.getProximas,
    payload: peliculas
})

export const StartGetAnimes = () => {

    return async (dispatch) => {
        const data = await FetchGetData()
        const anime = data.filter(pelicula => pelicula.seccion === "anime")
        dispatch(getAnime(anime))
    }
}

const getAnime = (peliculas) => ({
    type: types.getAnimes,
    payload: peliculas
})

export const StartGetSeries = () => {

    return async (dispatch) => {
        const data = await FetchGetData()
        const series = data.filter(pelicula => pelicula.seccion === "series")
        dispatch(getSeries(series))
    }
}

const getSeries = (series) => ({
    type: types.getSeries,
    payload: series
})

export const StartGetNuevas = () => {

    return async (dispatch) => {
        const data = await FetchGetData()
        const peliculas = data.filter(pelicula => pelicula.seccion === "nuevas")
        dispatch(getNuevas(peliculas))
    }
}

const getNuevas = (peliculas) => ({
    type: types.getNuevas,
    payload: peliculas
})

export const StartGetMas = () => {

    return async (dispatch) => {
        const data = await FetchGetData()
        const peliculas = data.filter(pelicula => pelicula.seccion === "mas")
        dispatch(getMas(peliculas))
    }
}

const getMas = (peliculas) => ({
    type: types.getSeries,
    payload: peliculas
})

export const StartGetTrailers = () => {
    return async (dispatch) => {

        try {

            const data = await FetchGetData()
            const trailers = data.filter(trailers => trailers.trailerId)

            // console.log(trailers)
            dispatch(getTrailers(trailers))


        } catch (error) {
            console.log(error)
        }
    }
}

const getTrailers = (trailers) => ({
    type: types.getTrailers,
    payload: trailers
})

export const StartGetPeliculaById = (id) => {
    return async (dispatch) => {
        const resp = await fetch(`${process.env.REACT_APP_API_URL}/${id}`)
        const data = await resp.json()
        const pelicula = data.pelicula


        dispatch(getPeliculaById(pelicula))
    }
}

const getPeliculaById = (pelicula) => ({
    type: types.getOneMovie,
    payload: pelicula
})

export const StartGetBannerMovie = () => {
    return async (dispatch) => {
        try {
            const data = await FetchGetData()
            const pelicula = data.filter(pelicula => pelicula.seccion === "banner")

            dispatch(getBannerMovie(pelicula))
        } catch (error) {
            console.log(error)
        }
    }
}

const getBannerMovie = (bannerMovie) => ({
    type: types.getBanner,
    payload: bannerMovie
})

export const StartCreateMovie = (imagen, data) => {

    return async (dispatch) => {

        try {

            data.imagen = imagen
          
            const resp = await fetch(`${process.env.REACT_APP_API_URL}/nueva`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            
            const body = await resp.json()
            
                dispatch(createMovie(data))
                Swal.fire({
                    icon: 'success',
                    title: body.msg,
                    showConfirmButton: false,
                    timer: 1500
                })
        
        } catch (error) {
            console.log(error)
        }
    }
}

const createMovie = () => ({
    type: types.createMovie
})

export const StartDelete = (id) => {
    return (dispatch) => {
        try {

            Swal.fire({
                title: 'Esta Seguro?',
                text: "Si es borrado esta accion no se puede revertir!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si,Borrar!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const resp = await fetch(`${process.env.REACT_APP_API_URL}/delete/${id}`, {
                        method: "DELETE"
                    })
                    const body = await resp.json()
                    
                    dispatch(deleteMovie)

                    Swal.fire(
                        'Borrado!',
                        'Se ha borrado satisfactoriamente.',
                        'success'
                    )
                }
            })

        } catch (error) {
            console.log(error)
        }

    }
}

const deleteMovie = () => ({
    type: types.deleteMovie
})

export const StartUpdateMovie=(id,data,imagen)=>{
    return async(dispatch)=>{

        try {
            data.imagen = imagen
            const resp = await fetch(`${process.env.REACT_APP_API_URL}/update/${id}`,{
                method:"PUT",
                headers: {
                    'Content-type': 'application/json'
                },
                body:JSON.stringify(data)
            })

            const body= await resp.json()
        
            Swal.fire({
                icon: "success",
                title: "Pelicula Actualizada con Exito",
                showConfirmButton: false,
                timer: 1500,
              });
          
            dispatch(updateMovie())
           

        } catch (error) {
            console.log(error)
        }
    }
}

const updateMovie=()=>({
    type:types.updateMovie,
    
})