import React from 'react'

import { Redirect, Route } from 'react-router-dom'

export const PrivateRoute = ({
    isLoggedIn,
    component:Component,
    ...rest
}) => {
    

    localStorage.setItem('lastPath',rest.location.pathname)
    return (
    <Route {...rest}
    component={(props)=>(
        
            (isLoggedIn)
            ?
            (<Component {...props}/>)
            :(<Redirect to='/login'/>)
        
    )}
    />
    )
}
