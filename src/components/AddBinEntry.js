import React from 'react'
import {useState} from 'react'
import '../styles/AddBinEntry.css'

import { MapView } from '@aws-amplify/ui-react';
import { Marker } from 'react-map-gl';

const AddBinEntry = ({onAdd, entries, addBinShow, setAddBinShow}) => {
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
    
    let latLng = (lat && lng) ? `${lat},${lng}` : null;

    onAdd(desc, full, latLng);
    setDesc('');
    setFull(false);
    setLat(null);
    setLng(null);
    setStatus(null)
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
  // const [markers, setMarkers] = useState([]);
  const [lastMarked, setLastMarked] = useState('');

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
            setLastMarked({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            })
        }, () => {
            setStatus('Unable to retrieve your location');
        });
    }
  }

  const mapClick = (evt) => {
    let newMarker = {
      lat: evt.lngLat.lat,
      lng: evt.lngLat.lng 
    }
    setLastMarked(newMarker);
    setviewState({
      latitude: evt.lngLat.lat, 
      longitude: evt.lngLat.lng,
      zoom: 14
    })
    setLat(evt.lngLat.lat)
    setLng(evt.lngLat.lng)
  }

  return (addBinShow) && (
    <div className='popup'>
      <div className='popup-inner'>
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
              <input type='button' value='Use Current Location' onClick={getLocation}></input>
              {status === true ? 
                <div>
                <MapView 
                  {...viewState}
                  onMove={evt=> setviewState(evt.viewState)}
                  onClick={evt=> mapClick(evt)}
                  style={{
                    width: '50vw', height: '50vh'
                  }}
                >
                { lastMarked && (<Marker longitude={lastMarked.lng} latitude={lastMarked.lat} color='#F70C0C'></Marker>) }
                { entries.map((entry, i) => {
                  return [
                    entry.location && (<Marker latitude={entry.location.split(',')[0]} longitude={entry.location.split(',')[1]} ></Marker>) 
                  ]
                })}
                </MapView>
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
        <button className='close-btn' onClick={()=>{setAddBinShow(false)}}>Cancel</button>
      </div>
    </div>
  )
}

export default AddBinEntry