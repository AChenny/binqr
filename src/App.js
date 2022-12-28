import './App.css';
import BinEntries from './BinEntries.js'
import { useState } from 'react';


function App() {
  const [entries, setEntry] = useState([{id: '1234', link: 'link1', full: true }, {id: '1235', link: 'link2', full: false } ]);

  return (
    <div className="App">
      <h2>TEST</h2>
      <BinEntries entries={entries}/>
    </div>
  );
}

export default App;