import '../../styles/Notes.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faClose, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { postNote, getAllNotes, putNote, deleteNote } from './NotesServices.js'
import Note from './Note.js'
import Loader from '../GlobalComponents/Loader.js'
import Tag from './Tag.js'

const NotesConatiner = () => {
  const [activeAdd, setActiveAdd] = useState({ status: false, mode: '', id: 0 })

  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState('')
  const [notes, setAllNotes] = useState([])

  const [valuesForm, setValuesForm] = useState({
    title: '',
    description: '',
    limitTime: new Date().toISOString().split('T')[0],
    tags: [],
    select: false
  })

  const [remove, setRemove] = useState(false)
  const [confirmRemove, setConfirmRemove] = useState(false)

  const handleAddNote = () => {
    setActiveAdd({ status: true, mode: 'add' })
  }

  const handleClose = () => {
    setActiveAdd({ status: false, mode: '', id: 0 })
    setTags([])
    setTagInput('')
    setValuesForm({
      title: '',
      description: '',
      limitTime: new Date().toISOString().split('T')[0],
      tags: []
    })
  }
  const handleChangeTitle = (event) => {
    setValuesForm({ ...valuesForm, title: event.target.value })
  }

  const handleChangeDescription = (event) => {
    setValuesForm({ ...valuesForm, description: event.target.value })
  }

  const handleChangeDate = (event) => {
    setValuesForm({ ...valuesForm, limitTime: event.target.value })
  }
  // ! mejorar los antiDuplicados en esta Funcion
  const handleTagInputChange = e => {
    if (e.target.value.endsWith(' ')) {
      if (e.target.value.trim().length) {
        setTags([...tags, { tag: tagInput.trim(), color: '#d70909' }])
        setTagInput('')
      }
    } else {
      setTagInput(e.target.value)
    }
  }

  const handleColorChange = (index, newColor) => {
    setTags(tags.map((tagObj, i) => (i === index ? { ...tagObj, color: newColor } : tagObj)))
    setValuesForm({ ...valuesForm, allTags: [tags] })
  }

  const handleSubmitAdd = (event) => {
    event.preventDefault()

    if (valuesForm.title.length !== 0 && valuesForm.description !== 0) {
      postNote(valuesForm, tags).then(data => data.json()).then(data => {
        setAllNotes([...notes, data])
        setValuesForm([data])
        setTags([])
        setActiveAdd({ status: false, mode: '', id: 0 })
        setTagInput('')
        setValuesForm({
          title: '',
          description: '',
          limitTime: new Date().toISOString().split('T')[0],
          allTags: []
        })
      })
    }
    // reset values
    setTags([])
    setTagInput('')
    setValuesForm({
      title: '',
      description: '',
      limitTime: new Date().toISOString().split('T')[0],
      allTags: []
    })
  }
  useEffect(() => {
    getAllNotes().then(data => data.map(element => {
      element.select = false
      return element
    })).then(data => setAllNotes(data))
  }, [])

  const handleSubmitPut = (event) => {
    event.preventDefault()
    setActiveAdd({ status: false, mode: 'put' })

    putNote(activeAdd.id, valuesForm, tags)
      .then(data => data.json()).then(data => {
        setTags(data.tags)
        setAllNotes(data)
      }).then(() => {
        setTags([])
      })
    setValuesForm({
      title: '',
      description: '',
      limitTime: new Date().toISOString().split('T')[0],
      tags: []
    })
    setActiveAdd({ status: false, mode: '' })
  }

  const handleRemove = () => {
    setRemove(!remove)
  }
  const handleNoteRemove = () => {
    notes.map(element => {
      if (element.select === true) {
        deleteNote(element.id)
        setAllNotes(prev => prev.filter(note => element.id !== note.id))
      }
      return ''
    })

    /*     arr.forEach(element => {
      deleteNote(element)
      setAllNotes(prev => prev.filter(note => element !== note.id))
    }) */
    setConfirmRemove(false)
  }

  const handleCloseRemove = () => {
    setConfirmRemove(false)
  }

  const handleConfirmRemove = () => {
    let counter = 0
    notes.map(element => {
      if (element.select) { counter += 1 } return counter
    })
    if (counter !== 0) { setConfirmRemove(true) }
  }

  return (
    <>
      {/* // & ==================ADD AND PUT FORM =========== */}
      {confirmRemove && (
        <div className='note__remove-confirmation'>
          <div className='remove__close-btn'>
            <button onClick={handleCloseRemove}>
              <FontAwesomeIcon icon={faClose} className='icon-close' />
            </button>
          </div>
          <div className='remove__confirmation-wrapper'>
            <div className='remove__text-advertencia'>
              <span>Advertencia</span>
            </div>
            <div className='remove__text-mensaje'>
              <span>Estas seguro que quieres eliminar las notas no habra forma de recuperarlas en el futuro</span>
            </div>
            <div className='remove__cotainer-bts'>
              <button className='remove__btn cancelar' onClick={handleCloseRemove}>Cancelar</button>
              <button className='remove__btn confirmar' onClick={handleNoteRemove}>Confirmar</button>
            </div>
          </div>
        </div>)}
      {activeAdd.status && (
        <div className='note__add-wrapper add'>
          <div>

            <div className='add__close-btn'>
              <button onClick={handleClose}>
                <FontAwesomeIcon icon={faClose} className='icon-close' />
              </button>
            </div>

            <div className='note__form-wraper'>
              <span className='note__title-page'>{activeAdd.mode === 'add' ? 'Add Note' : 'Edit Note'}</span>

              <form className='add__form-container' onSubmit={activeAdd.mode === 'add' ? handleSubmitAdd : handleSubmitPut}>
                <span className='add__form-span'>{activeAdd.mode === 'add' ? 'Add Title:' : 'Change title:'}</span>
                <input type='text' autoComplete='off' placeholder='Add Title' onChange={handleChangeTitle} value={valuesForm.title} className='add_input' />

                <span className='add__form-span'>{activeAdd.mode === 'add' ? 'Add description:' : 'Change description:'}</span>
                <input type='text' autoComplete='off' placeholder='Add description' onChange={handleChangeDescription} value={valuesForm.description} className='add_input' />

                <span className='add__form-span'>{activeAdd.mode === 'add' ? 'Alert time:' : 'Change Alert time:'}</span>
                <input type='date' placeholder='date' value={valuesForm.limitTime} onChange={handleChangeDate} className='add_input' />

                <span className='add__form-span'>Tags:</span>
                <input
                  type='text'
                  value={tagInput}
                  onChange={handleTagInputChange}
                  placeholder='Use space for add a tag'
                  className='add_input'
                />
                <div className='add_tags-container'>
                  {tags.map((tagObj, index) => (
                    <Tag key={index} {...tagObj} onColorChange={e => handleColorChange(index, e.target.value)} tags={tags} />
                  ))}
                </div>
                <span className='add__tag-explain'>click for delete a tag</span>
                <button className='add__submit-btn'>ADD</button>
              </form>

            </div>
          </div>
        </div>
      )}
      {/* // & ============================================== */}
      <div className='section__notes-wrapper notes'>
        {/* // & ================ NOTES OPTIONS TOP ========== */}
        <div className='notes__option-container'>
          <span>Notas</span>
          <div className='notes__right-options'>

            <button className='notes__options-btn'>
              <FontAwesomeIcon icon={faAdd} className='icon' onClick={handleAddNote} />
            </button>

            <button className='notes__options-btn'>
              <FontAwesomeIcon icon={faTrash} className='remove' onClick={handleRemove} />
            </button>

          </div>
        </div>
        {/* // & ========================================== */}

        {/* // & ================ NOTES CONTAINER ========== */}
        <div className='notes__container'>
          {notes !== undefined
            ? notes.map(element => {
              const { title, description, tags, limitTime, addTime, id, select } = element
              return (
                <Note
                  data={{
                    title, description, tags, limitTime, addTime, id, setActiveAdd, activeAdd, setValuesForm, valuesForm, setTags, select, element, setAllNotes, notes
                  }}
                  all={{ setAllNotes, notes }}
                  remove={{ setRemove, remove }}
                  key={element.id || Math.random()}
                />
              )
            })
            : <Loader />}
        </div>
        {/* // & ======================================= */}
        {remove ? <button onClick={handleConfirmRemove} className='remove-btn'>remove</button> : ''}
      </div>
    </>
  )
}

export default NotesConatiner
