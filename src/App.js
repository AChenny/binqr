import './App.css';
import BinEntries from './BinEntries.js'
import AddBinEntry from './components/AddBinEntry';
import { Amplify, API, graphqlOperation } from 'aws-amplify'
import { useEffect, useState } from 'react';
import { createQrEntry, deleteQrEntry } from './graphql/mutations';
import { getQrEntry, listQrEntrys } from './graphql/queries';

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

function App() {
  const [entries, setEntries] = useState([]);

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
  async function addEntry(desc, full) {
    try {
      // Get current time and store as int
      const date = new Date()

      // Add to state
      const entry = {
        desc: desc,
        full: full,
        createdAt: date,
        updatedAt: date
      }
      console.log(entry)
      setEntries([...entries, entry])
      // Call graphQL query
      await API.graphql(graphqlOperation(createQrEntry, {input: entry}))

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
    <div className="App">
    <h2>QR Bin Entry</h2>
      <BinEntries entries={entries} onDelete={deleteEntry}/>
      <AddBinEntry onAdd={addEntry}/>
    </div>  
  );
}


export default App;