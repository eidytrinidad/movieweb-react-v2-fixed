import React from "react";
import { Redirect, Route,  Switch } from "react-router-dom";
import { Agregar } from "./Agregar";
import { Editar } from "./Editar";


export const Admin = () => {

  

  return (
    <Switch>
      <Route exact path="/admin/agregar" component={Agregar} />
      <Route exact path="/admin/editar/:id" component={Editar} />
      <Redirect to="/home" />
    </Switch>
  );
};
