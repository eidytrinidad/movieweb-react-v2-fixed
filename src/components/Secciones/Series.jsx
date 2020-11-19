import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { StartGetSeries } from '../../actions/peliculas';

import { MovieGrid } from '../Main/MovieGrid';

export const Series = () => {
  const dispatch = useDispatch()
  const {peliculas} = useSelector(state => state.peliculas)

  useEffect(() => {
    dispatch( StartGetSeries())
  }, [dispatch])

  return (
    <article className="MovieGrid">
      {
      
      !peliculas
      ?
    
      <h4 className="loading animate__animated animate__flash">
      <i className="fas fa-spinner fa-spin"></i> Loading
  </h4> 
      :
      <MovieGrid peliculas={peliculas}/>
 

    }
    </article>
  );
}
