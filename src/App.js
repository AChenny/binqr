import './App.css';
import { useState } from 'react';

function App() {
  const [entries, setEntry] = useState([{id: '1234', link: 'link1', full: true }, {id: '1235', link: 'link2', full: false } ]);

  return (
    <div className="App">
      <h2>TEST</h2>
      <table>
        <tr>
        <th>Link</th>
        <th>Full?</th>
        </tr>
          {entries.map((entry, i) => {
            return [
              <tr>
              <td>{entry.link}</td>
              <td>{entry.full ? 'Full' : 'Not Full'}</td>
              </tr>
            ]
          })}
      </table>
    </div>
  );
}

export default App;