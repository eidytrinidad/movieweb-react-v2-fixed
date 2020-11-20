import { types } from "../types/types"
import Swal from 'sweetalert2'
import {firebase} from '../firebase/config'

export const StartLogin=(email,password)=>{

    return (dispatch)=>{
        
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(({user})=>{
                
            dispatch(login(user.uid,user.email))
           
        }).catch(err=>{
            console.log(err)
            Swal.fire('Error',err.message,'error')
        })
    }
}

export const login=(uid,displayName)=>({
    type:types.login,
    payload:{
        uid,
        displayName
    }
})

export const loggout=()=>({
    type:types.logout
})
