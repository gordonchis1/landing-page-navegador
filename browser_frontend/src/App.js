import GoogleSearch from './components/Google_search/GoogleSearch.js'
import Scheme from './components/Scheme/Scheme.js'
import Weather from './components/Weather/Weather.js'
import Notes from './components/Notes/NotesConatiner.js'
import './styles/Global.css'
import './styles/Reset.css'
import './styles/Header.css'

const App = () => {
  return (
    <div className='container'>
      <header className='header'>
        <Weather />
        <nav className='header__nav'>
          <Scheme />
        </nav>
      </header>
      <section className='section'>
        <GoogleSearch />
      </section>
      <section className='section-notes'>
        <Notes />
      </section>
      <section className='chatgpt-utils' />
    </div>
  )
}

export default App
