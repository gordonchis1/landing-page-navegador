// ^ proximas: agg un form por si el usuario no quiere dar su localisacion
// ^ proximas: agg el btn de actualizar

import callApi from '../../Services/Weather__service.js'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'
import '../../styles/Weather.css'

const Weather = () => {
  const [weather, setWeather] = useState(undefined)
  const [coords, setCoords] = useState({
    latitude: 0,
    longitude: 0
  })

  // & SE PIDE LA UBICACION Y SE LLAMA A LA API
  const getLocationAndCall = () => {
    const sucess = (location) => {
      setCoords({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
      )
      const { latitude } = location.coords
      const { longitude } = location.coords
      callApi(latitude, longitude).then(data => setWeather(data))
    }

    const err = () => { callApi().then(data => setWeather(data)) }
    navigator.geolocation.getCurrentPosition(sucess, err)
  }
  // & ESTA FUNCION VA A ACTUALIZAR LA HORA
  const handleClick = (e) => {
    e.preventDefault()
    if (coords.longitude || coords.latitude) { callApi(coords.latitude, coords.longitude).then(data => setWeather(data)) } else {
      callApi().then(data => setWeather(data))
    }
  }
  useEffect(() => {
    getLocationAndCall()
  }, [])
  const date = new Date()
  const finallDate = `${date.getHours()}:${date.getMinutes()}`
  return (
    <div className='header__weapper-weather'>
      {weather
        ? (
          <>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='icon' />

            <div className='weather__text-container'>
              <span className='weather__span-tmp'>{String(weather.main.temp).split('', 2)}°C</span>
              <span className='weather__span-country'><small>{weather.sys.country}/{weather.name}</small></span>

              <div className='header__update-wrapper'>
                <span>Last update: {finallDate}</span>
                <button onClick={handleClick} className='weather__button-sync'>
                  <FontAwesomeIcon icon={faSync} className='icon' />
                </button>
              </div>

            </div>
          </>
          )
        : <span>laoding...</span>}
    </div>
  )
}

export default Weather
