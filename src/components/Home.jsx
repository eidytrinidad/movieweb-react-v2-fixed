import React from "react";
import { Route, Switch } from "react-router-dom";
import { Banner } from "./Banner/Banner";
import { Footer } from "./Footer";
import { Main } from "./Main/Main";
import { PeliculaDetails } from "./Pelicula/PeliculaDetails";
export const Home = () => {

  return (
    <>
      <Banner />
        <Switch>
          <Route exact path="/pelicula/:id" component={PeliculaDetails} />
          <Route path="/" component={Main} />
        </Switch>
      <Footer />
    </>
  );
};
