import React from 'react'
import { updateQrEntry } from '../graphql/mutations';
import { Amplify, API, graphqlOperation } from 'aws-amplify'

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
    <div>
      <h2>Bin ID: {id}</h2>
      <div>Is this bin full or is this regarding another issue?</div>
      <div>
        <button type="button" onClick={()=> fullReport(id)} >Full</button>
        <button type="button">Another Issue</button>
      </div>
    </div>

    
  )
}

export default QrScanPage