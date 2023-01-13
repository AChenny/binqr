import React from 'react'
import { updateQrEntry } from '../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify'
import { Button } from '@mui/material';
import './QrScanPage.css'

function QrScanPage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  // Full Reporting Button
  async function fullReport (id) {
    try {
      const entry = {
        id: id,
        full: true
      };

      await API.graphql(graphqlOperation(updateQrEntry, {input: entry}));

      alert('Thank you for reporting!')
    } catch (err) {
      console.log("Error reporting full bin", err)
    }
  }
  

  return (
    <div class='page-container'>
      <h3>Bin ID: {id}</h3>
      <h2 className='scan-header'>Is this bin full or is this regarding another issue?</h2>
      <div>
        <Button variant='contained' sx={{px: 4, py:2, margin: 2}} onClick={()=> fullReport(id)} >Full</Button>
        <Button variant='contained' sx={{px: 4, py:2, margin: 2}}>Another Issue</Button>
      </div>
    </div>

    
  )
}

export default QrScanPage