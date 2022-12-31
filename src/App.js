import './App.css';
import BinEntries from './BinEntries.js'
import AddBinEntry from './components/AddBinEntry';
import { Amplify, API, graphqlOperation } from 'aws-amplify'
import { useEffect, useState } from 'react';
import { createQrEntry } from './graphql/mutations';
import { listQrEntrys } from './graphql/queries';

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

function App() {
  // const [entries, setEntries] = useState([{id: '1234', link: 'link1', full: true }, {id: '1235', link: 'link2', full: false } ]);
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
    } catch(err) {console.log('Error fetching entries')}
  }

  // Add Entry
  async function addEntry(link, full) {
    try {
      // Add to state
      const entry = {
        link: link,
        full: full
      }
      setEntries([...entries, entry])
      // Call graphQL query
      await API.graphql(graphqlOperation(createQrEntry, {input: entry}))
    } catch (err) {
      console.log('error creating entry', err)
    }
  }

  // Delete Entry
  async function deleteEntry(id) {
    try {
      setEntries(entries.filter(entry => entry.id !== id))
    } catch(err) {
      console.log('error deleting entry', err)
    }
  }
  
  return (
    <div className="App">
      <h2>TEST</h2>
      <BinEntries entries={entries} onDelete={deleteEntry}/>
      <AddBinEntry onAdd={addEntry}/>
    </div>
  );
}

export default App;