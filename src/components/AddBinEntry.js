import React from 'react'
import {useState} from 'react'



const AddBinEntry = ({onAdd}) => {
  // State of all form elements
  const [link, setLink] = useState('');
  const [full, setFull] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault()

    if (!link) {
      // There's no QR link
      alert('Pleaase add a QR link')
      return
    }

    onAdd(link, full)
    setLink('')
    setFull(false)
  }


  return (
    <form className='add-bin-entry' onSubmit={onSubmit}>
      <div>
        <label>QR Link</label>
        <input type='text' value={link} onChange={(e) =>setLink(e.target.value)} placeholder="Add QR Link"/>
      </div>
      <div>
        <label>Currently Full?</label>
        <input type='checkbox' checked={full} value={full} onChange={(e) => setFull(e.currentTarget.checked)}/>
      </div>
      <input type='submit' value='Add Entry'></input>
    </form>
  )
}

export default AddBinEntry