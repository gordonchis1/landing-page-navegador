export const postNote = (valuesForm, tags) => {
  const URL = 'http://192.168.100.22:3005/api/notes'
  return fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: valuesForm.title,
      description: valuesForm.description,
      limitTime: String(valuesForm.limitTime),
      tags
    })
  }).catch(err => console.error(err))
}

export const getAllNotes = () => {
  const URL = 'http://192.168.100.22:3005/api/notes'
  return fetch(URL)
    .then(data => data.json())
    .catch(err => console.error(err))
}

export const putNote = (id, valuesForm, tags) => {
  const URL = `http://192.168.100.22:3005/api/notes/${id}`
  return fetch(URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: valuesForm.title,
      description: valuesForm.description,
      limitTime: String(valuesForm.limitTime),
      tags
    })
  }).catch(err => console.error(err))
}

export const deleteNote = (id) => {
  const URL = 'http://192.168.100.22:3005/api/notes'
  return fetch(`${URL}/${id}`, {
    method: 'DELETE'
  })
    .then(response => response)
}
