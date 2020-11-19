
const baseUrl= process.env.REACT_APP_API_URL

export const FetchGetData=async(endpoint,data,method="GET")=>{
     const url=`${baseUrl}/${endpoint}`
    const resp = await fetch(url)
    const data = await resp.json()

    return data.peliculas
}

const fetchSinToken=(endpoint,data,method="GET")=>{

    const url=`${baseUrl}/${endpoint}`

    if (method==='get') {
        return fetch(url)
    }else{
        return fetch(url,{
            method,
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(data)
        })
    }

}

const fetchConToken=(endpoint,data,method="GET")=>{

    const url=`${baseUrl}/${endpoint}`
    const token=localStorage.getItem('token') || ''

    if (method==='get') {
        return fetch(url,{
            method,
            headers:{
                'x-token':token
            }
        })
    }else{
        return fetch(url,{
            method,
            headers:{
                'Content-type':'application/json',
                'x-token':token
                
            },
            body:JSON.stringify(data)
        })
    }

}


export{
    fetchSinToken,
    fetchConToken
}