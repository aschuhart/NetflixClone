import React, { useState, useRef, useEffect }  from 'react'
import './Titlecards.css'
import cards_data from '../../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'



const Titlecards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);

  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjQ4YzU4NjFjMjYxNzg5NzRhOTAxNzA0MTYxMTViNiIsIm5iZiI6MTczNDk5NTg2Mi4yMzgwMDAyLCJzdWIiOiI2NzY5ZWY5NjI2NTM2OTdmN2Y2NGE0NGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.2P30d_okCCuhuC1ft-t2oopE-wQmYu33TUux0AROgoI'
    }
  };
  
 


  const handleWheel = (event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }
  
  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', handleWheel);
  },{});

  return (
    <div className='titlecards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default Titlecards
