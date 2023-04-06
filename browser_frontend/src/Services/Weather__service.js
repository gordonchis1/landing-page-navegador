// ^ proximas: agg un form por si el usuario no quiere dar su localisacion

const callApi = (lat, long) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=7ba732b1efe2a0f43a1738c039013294`

  if (lat === undefined || long === undefined) {
    return fetch('https://api.openweathermap.org/data/2.5/weather?q=Mexico&appid=7ba732b1efe2a0f43a1738c039013294').then(data => data.json()).then(data => data)
  } else {
    return fetch(URL).then(data => data.json()).then(data => data)
  }
}

export default callApi
