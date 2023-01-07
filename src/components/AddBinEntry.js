import React from 'react'
import {useState} from 'react'
import BasicMap from './BinMap';
import './styles/AddBinEntry.css'

const AddBinEntry = ({onAdd}) => {
  // State of all form elements
  const [desc, setDesc] = useState('');
  const [full, setFull] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault()

    if (!desc) {
      // There's no QR link
      alert('Pleaase add a QR link')
      return
    }

    onAdd(desc, full)
    setDesc('')
    setFull(false)
  }


  return (
    <form className='add-bin-entry' onSubmit={onSubmit}>
      <div>
        <label>QR Desc</label>
        <input type='text' value={desc} onChange={(e) =>setDesc(e.target.value)} placeholder="Add QR Desc"/>
      </div>
      <div>
        <label>Currently Full?</label>
        <input type='checkbox' checked={full} value={full} onChange={(e) => setFull(e.currentTarget.checked)}/>
      </div>
      <div>
        <div id='bin-map'>
        <label id='location-label'>Location</label>
          <BasicMap></BasicMap>
        </div>
      </div>
      <input type='submit' value='Add Entry'></input>
    </form>
  )
}

export default AddBinEntry