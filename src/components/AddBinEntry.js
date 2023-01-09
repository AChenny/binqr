import React from 'react'
import {useState} from 'react'
import './styles/AddBinEntry.css'

import { MapView } from '@aws-amplify/ui-react';

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

  // Geolocation props
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [viewState, setviewState] = useState({
    latitude: 40,
    longitude: -100,
    zoom: 14,
  })

  const getLocation = () => {
      if (!navigator.geolocation) {
    setStatus('Geolocation is not supported by your browser');
  } else {
          setStatus('Locating...');
          navigator.geolocation.getCurrentPosition((position) => {
              setStatus(true);
              setLat(position.coords.latitude);
              setLng(position.coords.longitude);
              setviewState({
                latitude: position.coords.latitude, 
                longitude: position.coords.longitude, 
                zoom: 13
              });
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
          {status === true ? 
            <div>
            <MapView 
              {...viewState}
              onMove={evt=> setviewState(evt.viewState)}
              style={{
                width: '50vw', height: '50vh'
              }}
            />
            </div>
            : 
            <div>
              Map not Available
            </div>
          }
        </div>
      </div>
      <input type='submit' value='Add Entry'></input>
    </form>
  )
}

export default AddBinEntry