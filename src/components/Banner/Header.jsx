import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loggout } from "../../actions/auth";
import {firebase} from '../../firebase/config'

export const Header = () => {
  const [value, setValue] = useState(true);
  const btnBurgerClick = () => {
    setValue(!value);
  };

  const { uid } = useSelector((state) => state.auth);
  if (uid) {
    
  }


  const handleLogout=()=>{
    firebase.auth().signOut()
    .then(() => {
    
    })
    .catch((err)=>{
      console.log(err)
    })
    window.location.reload(false);
  }

  return (
    <header>
      <div
        style={value ? { display: "none" } : { display: "flex" }}
        className="animate__animated animate__fadeInDown burgerMenu"
      >
        <Link to="/home">INICIO</Link>
        <a href="">NOSOTROS</a>
        <Link to="/login">LOGIN <i className="fas fa-sign-in-alt"></i></Link>
        <i className="fas fa-ticket-alt"></i>
      </div>

      <nav className="menu">
        <button className="btnBurger" onClick={btnBurgerClick}>
          <i className={value ? "fas fa-bars" : "fas fa-times"}></i>
        </button>
      </nav>

      <article className="busqueda">
        <button className="btnSearch">
          <i className="fas fa-search"></i>
        </button>
        {
          uid&&
          <>
              
        <Link to="/admin/agregar" className="btnAgregar">
          <i className="fas fa-plus"></i>
        </Link>

        <button 
        onClick={handleLogout}
        className="btnLogout">
        <i className="fas fa-sign-out-alt"></i>
        </button>
          </>
        }
      </article>
    </header>
  );
};
