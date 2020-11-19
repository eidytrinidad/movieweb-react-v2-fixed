
export const FetchGetData=async()=>{

    const resp = await fetch(`${process.env.REACT_APP_API_URL}`)
    const data = await resp.json()

    return data.peliculas
}