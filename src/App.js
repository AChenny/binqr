import './App.css';
import BinEntries from './BinEntries.js'
import AddBinEntry from './components/AddBinEntry';
import { Amplify, API, graphqlOperation } from 'aws-amplify'
import { useEffect, useState } from 'react';
import { createQrEntry, deleteQrEntry } from './graphql/mutations';
import { listQrEntrys } from './graphql/queries';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Button } from '@mui/material';

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

function App() { 
  const [entries, setEntries] = useState([]);
  const [addBinShow, setAddBinShow] = useState(false);

  useEffect(() => {
    fetchEntries()
  }, [])

  // Fetch All Entries
  async function fetchEntries() {
    try {
      const entryData = await API.graphql(graphqlOperation(listQrEntrys))
      const entries = entryData.data.listQrEntrys.items
      setEntries(entries)
    } catch(err) {console.log('Error fetching entries', err)}
  }

  // Add Entry
  async function addEntry(desc, full, latLng) {
    try {
      // Get current time and store as int
      const date = new Date()

      // Add to state
      const entry = {
        desc: desc,
        full: full,
        createdAt: date,
        updatedAt: date,
        location: latLng
      }

      // Call graphQL query
      let response = await API.graphql(graphqlOperation(createQrEntry, {input: entry}))
      setEntries([...entries, response.data.createQrEntry])

      // Save the ID of the bin and create a qr that has a parameter id 

    } catch (err) {
      console.log('error creating entry', err)
    }
  }

  // Delete Entry
  async function deleteEntry(id) {
    try {
      const condition = {
        id: id
      }
      setEntries(entries.filter(entry => entry.id !== id))
      await API.graphql(graphqlOperation(deleteQrEntry, {input: condition}))
    } catch(err) {
      console.log('error deleting entry', err)
    }
  }

  return (
    <Authenticator hideSignUp={true} className="auth">
      {({ signOut, user }) => (
          <div className="App">
            <div className='header'>
              <h1 className='header-title'>QR Bin Admin Dashboard</h1>
              <div className='header-user-logout'>
                <h3 className='header-user-id'>Hello {user.attributes.email}</h3>
                <Button variant='outlined' className='header-logout button1' onClick={signOut}>Sign out</Button>
              </div>
            </div>
            <div className='bin-entries'>
              <BinEntries entries={entries} onDelete={deleteEntry}/>
              <AddBinEntry onAdd={addEntry} entries={entries} addBinShow={addBinShow} setAddBinShow={(obj)=> setAddBinShow(obj) }/>
            </div>
            <div className='add-bin-btn'>
              <Button sx={{ width: 125, height: 75}} variant='contained' onClick={() => {setAddBinShow(true)}}>Add Bin</Button>
            </div>
          </div>
    )}
    </Authenticator> 
  );
}


export default App;