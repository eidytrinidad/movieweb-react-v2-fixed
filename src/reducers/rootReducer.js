import {combineReducers} from 'redux'
import { AuthReducer } from './authReducer'
import { peliculasReducer } from './peliculasReducer'

export const rootReducer=combineReducers({
    peliculas:peliculasReducer,
    auth:AuthReducer,
})