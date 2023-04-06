// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSun } from '@fortawesome/free-solid-svg-icons'
import '../../styles/Scheme.css'

const Scheme = () => {
  // ^ Si el usuario tiene el modo oscuro por defecto regresa TRUE
/*   const schemeUserDefaultDarck = window.matchMedia('(prefers-color-scheme: dark)').matches
  const scheme = schemeUserDefaultDarck ? 'dark-mode' : 'light-mode'
  // ^ definimos el scheme que va a ver el usuario primero
  document.documentElement.setAttribute('scheme', scheme) */

  // & funcion del botton
  const handleClick = () => {
    const selectScheme = document.documentElement.getAttribute('scheme')
    console.log(selectScheme)

    document.documentElement.setAttribute('scheme', selectScheme !== 'light-mode' ? 'light-mode' : 'dark-mode')
    console.log(selectScheme)
  }

  return (
    <>
      <button className='nav__btn-scheme' onClick={handleClick} />
    </>
  )
}

export default Scheme
