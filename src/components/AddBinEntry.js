import React from 'react'
import {useState} from 'react'
import BasicMap from './BinMap';
import './styles/AddBinEntry.css'
import { useGeolocated } from "react-geolocated";

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

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  const getLocation = () => {
      if (!navigator.geolocation) {
    setStatus('Geolocation is not supported by your browser');
  } else {
          setStatus('Locating...');
          navigator.geolocation.getCurrentPosition((position) => {
              setStatus(null);
              setLat(position.coords.latitude);
              setLng(position.coords.longitude);
          }, () => {
              setStatus('Unable to retrieve your location');
          });
      }
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
          <div>{lat},{lng}, {status}</div>
          <input type='button' value='Add Location' onClick={getLocation}></input>
          <BasicMap></BasicMap>
        </div>
      </div>
      <input type='submit' value='Add Entry'></input>
    </form>
  )
}

export default AddBinEntry