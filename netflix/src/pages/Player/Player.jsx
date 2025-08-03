import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name:'',
    published:'',
    type: '',
    url: 'https://www.youtube.com/embed/'
  })
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTFjYmNlYjk3NzEyMDc5YzZkYTFhZWRlZjIzYTcwZCIsIm5iZiI6MTc1NDEyNzM4OS4zNzUsInN1YiI6IjY4OGRkYzFkYjM5MDM2MjNhNmIyMjg2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ImvIhdZ7PdKnL2kKO0Sfv2ZiWUK5CdUhIysfwdLQu5Q'
  }
};

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData({
      name: res.results[0].name,
      published: res.results[0].published_at,
      type: res.results[0].type,
      url: apiData.url + res.results[0].key
    }))
    .catch(err => console.error(err));
  },[])

  console.log(apiData)

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate('/')}} />
      <iframe src={apiData.url}width='90%' height='90%' frameborder="0" allowFullScreen title='trailer'></iframe>
      <div className="player-info">
        <p>{apiData.published.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
