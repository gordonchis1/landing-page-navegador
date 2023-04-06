import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

const Note = ({ data, remove, all }) => {
  const handleClick = (event) => {
    const date = data.limitTime.split(',', [1])[0].split('/')
    const dateUpdate = `${date[2]}-${date[1].length !== 2 ? 0 + date[1] : date[1]}-${date[0].length !== 2 ? 0 + date[0] : date[0]}`
    data.setTags(data.tags)
    data.setActiveAdd({ status: true, mode: 'put', id: data.id })
    data.setValuesForm({
      title: data.title,
      description: data.description,
      limitTime: dateUpdate,
      tags: data.tags

    })
  }

  const handleRemove = () => {
    remove.setListRemove(prev => [...prev, data.id])
    all.notes.map(element => {
      if (element.id === data.id) {
        const newProp = { ...element, select: !element.select }
        const newAllNotes = all.notes.filter(element => { return element.id !== data.id })
        all.setAllNotes([newProp, ...newAllNotes])
      }
      return '.'
    })
  }
  console.log(all.notes)

  return (
    <div className='note__container-each-note each-note'>
      {remove.remove ? (<div className='each-note__select-note' style={data.select ? { background: 'rgb(206, 0, 0, .50)', borderRadius: '7px', border: '1px solid red' } : null} onClick={remove.remove ? handleRemove : null} />) : ''}

      {/* // & ========TEXT CONTAINER============ */}
      <div className='each-note__text-container'>
        <span className='each-note__title'>{data.title}</span>
        <span className='each-note__description'>{data.description}</span>
        <span className='each-note__addtime'>{data.limitTime.split(',', [1])}</span>
        <div className='each-note__container-tags'>
          {data.tags.map((element, index) => {
            return (
              <span
                className='add_tag'
                key={index}
                style={{
                  background: `${element.color}60`,
                  border: `1px solid ${element.color}`
                }}
              >
                {element.tag}
              </span>
            )
          })}
        </div>
      </div>
      {/* // & =================================== */}
      <div className='each-note__put-container' onClick={handleClick}>
        <FontAwesomeIcon icon={faPen} className='icon' />
      </div>
    </div>
  )
}

export default Note
