import React, { useState,useEffect } from "react";
import { BannerModal } from "./BannerModal";
import { useDispatch, useSelector } from "react-redux";
import { StartGetBannerMovie } from "../../actions/peliculas";
import { Header } from "./Header";
import { MovieInfo } from "./MovieInfo";

export const Banner = () => {

  const [modal, setModal] = useState(false)

const handleModal=()=>{
  setModal(!modal)
}

const { banner } = useSelector((state) => state.peliculas);
const dispatch = useDispatch();

useEffect(() => {
  dispatch(StartGetBannerMovie());
}, [dispatch]);

  return (
    <section className="banner" onClick={handleModal}>
      {
        banner &&
        <div className="contenedor">
        {
          modal
          ?
          <BannerModal banner={banner} />
          :
          null
        }
        <Header />
        <MovieInfo banner={banner} />
      </div>
      }
    </section>
  );
};
