import React from "react";

export const Trailer = ({ trailers,setTrailerID }) => {
  return (
    
    <div className="trailers">

      {
        trailers.map((data) => (
          <div key={data._id} className="trailer">
            <img src={data.imagen} alt={data.titulo} />
            <a 
            onClick={()=>setTrailerID(data.trailerId)}
            href="#player" className="btnVerTrailer">
              Ver Trailer
            </a>
          </div>
        ))
      }

    </div>

  );
};
