/* eslint-disable react/no-string-refs */
// ^ Add: agragar una serie de funciones para busquedas mas practicas
// ^ Add: agregar personalisacion de navegador
// ^ Add: hacer renderizado condicional depende del prefijo iagen de google
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import '../../styles/GoogleSearch.css'
import google from '../../img/google.png'
import youtube from '../../img/youtube.png'
import mdn from '../../img/mdn.png'
import bing from '../../img/bing.png'

const Button = ({ motor, setInputValue, value, prefix }) => {
  const handleClick = () => {
    const brand = motor.split('/')[3].split('.')[0]

    if (value.value.split('')[0] === '!') {
      const previusPrefix = value.value.slice(0, 2)

      setInputValue((prev) => {
        return {
          ...value,
          motor: brand,
          img: motor,
          value: prev.value.replace(previusPrefix, (prefix || ''))
        }
      })
    } else {
      setInputValue((prev) => {
        return {
          ...value,
          motor: brand,
          img: motor,
          value: (prefix || '') + prev.value
        }
      })
    }
  }

  return (
    <button id='input' className='' onClick={handleClick}><img src={motor} alt={motor} /></button>
  )
}

const GoogleSearch = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setInputValue] = useState({
    value: '',
    motor: 'google',
    prefix: '',
    img: google
  })
  const diccionario = {
    google: {
      url: 'https://www.google.com/search?q=',
      img: google
    },
    youtube: {
      url: 'https://www.youtube.com/results?search_query=',
      prefix: '!y ',
      img: youtube
    },
    mdn: {
      url: 'https://developer.mozilla.org/es/search?q=',
      prefix: '!m ',
      img: mdn
    },
    bing: {
      url: 'https://www.bing.com/search?q=',
      prefix: '!b ',
      img: bing
    }
  }

  // & REDIIRECCIONAMOS A GOOGLE Y EJECUTAMOS ADDPREVIUSSEARCH
  const handleSubmit = (event) => {
    event.preventDefault()

    const filterValue = value.value.replace(diccionario[value.motor].prefix, '')

    const url = diccionario[value.motor].url + filterValue

    if (value.value) {
      window.location.href = url
    }
  }
  // & REGISTRAMOS EN UN ESTADO EL VALOR DE EL INPUT
  const handleChange = (event) => {
    setInputValue({ ...value, value: event.target.value })

    const arrDiccionario = Object.entries(diccionario)

    const prefix = value.value.split('', 2)

    arrDiccionario.forEach((e, i) => {
      if (prefix[0] === '!') {
        if (value.value.includes(e[1].prefix)) {
          setInputValue({
            ...value,
            value: event.target.value,
            motor: e[0],
            img: e[1].img
          })
        }
      } else {
        setInputValue({
          value: event.target.value,
          motor: 'google',
          prefix: '',
          img: google
        })
      }
    })

    // if (value.value.includes()) {}
  }
  // & AGREGAR EVENTOS DEL INPUT
  useEffect(() => {
    const handleClick = (event) => {
      if (event.target.id === 'input') { setIsOpen(true) } else { setIsOpen(false) }
    }
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [])

  // & SSSSSSSSSSSSSSSSSSS

  return (
    <div className='section__google-search-wrapper google-search' id='input'>

      <div className='section-google__form-wrapper' id='input'>
        <img src={value.img} alt='' />
        <form onSubmit={handleSubmit} className='google-search__form' id='input'>
          <input
            type='text'
            onChange={handleChange}
            value={value.value}
            placeholder='Buscar en google'
            autoComplete='off'
            onFocus={() => { setIsOpen(true) }}
            id='input'
          />
          <button type='submit' className='youtube'>
            <FontAwesomeIcon icon={faSearch} className='icon' id='input' />
          </button>
        </form>
      </div>

      {isOpen
        ? (
          <div className='google-search__options search-options' id='input'>
            <span className='options__span'>Fast search:</span>
            <div className='search-options__btn-contaier'>
              <Button motor={google} setInputValue={setInputValue} value={value} prefix={diccionario.google.prefix} />
              <Button motor={youtube} setInputValue={setInputValue} value={value} prefix={diccionario.youtube.prefix} />
              <Button motor={mdn} setInputValue={setInputValue} value={value} prefix={diccionario.mdn.prefix} />
              <Button motor={bing} setInputValue={setInputValue} value={value} prefix={diccionario.bing.prefix} />
            </div>
          </div>
          )
        : ''}

    </div>
  )
}

export default GoogleSearch
