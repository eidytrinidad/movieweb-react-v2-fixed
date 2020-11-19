import React from "react";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import { Anime } from "../Secciones/Anime";
import { Mas } from "../Secciones/Mas";
import { Nuevo } from "../Secciones/Nuevo";
import { Proximamente } from "../Secciones/Proximamente";
import { Series } from "../Secciones/Series";
import { TrailersContainer} from "../Secciones/Trailers/TrailersContainer";
export const Main = () => {
  return (
    <main>
      <section className="contenedor">
        <article className="MenuBotones">
          <NavLink to='/home/nuevos'>NUEVO</NavLink>
          <NavLink to="/home/proximamente">PROXIMAMENTE</NavLink>
          <NavLink to="/home/anime">ANIME</NavLink>
          <NavLink to="/home/series">SERIES</NavLink>
          <NavLink to="/home/trailers">TRAILERS</NavLink>
          <NavLink to="/home/mas">MAS</NavLink>
        </article>
        <hr />
        
          <Switch>
            <Route exact path="/home/nuevos" component={Nuevo} />
            <Route exact path="/home/proximamente" component={Proximamente} />
            <Route exact path="/home/anime" component={Anime} />
            <Route exact path="/home/series" component={Series} />
            <Route exact path="/home/trailers" component={TrailersContainer} />
            <Route exact path="/home/mas" component={Mas} />
            <Redirect to="/home/nuevos"/>
          </Switch>
      
        <div className="btnBox">
          <button className="btnMas">
            <img src="/images/Dots_Mas.png" alt="mas" />
          </button>
        </div>
      </section>
    </main>
  );
};
