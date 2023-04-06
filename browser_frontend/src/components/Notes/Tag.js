const Tag = ({ tag, color, onColorChange }) => {
  // ! agregar un onClick para eliminar obj
  return (
    <div
      className='add_tag '
      style={{ background: `${color}60`, border: `1px solid ${color}` }}
    >
      <input type='color' value={color} onChange={onColorChange} className='add__input-color' />
      <span>{tag}</span>
    </div>
  )
}

export default Tag
