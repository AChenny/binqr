import BinEntry from './BinEntry.js'
import './styles/BinEntries.css'

const BinEntries = ({entries, onDelete}) => {
  return (
    <div className='bin-table-container'>
      <table >
        <thead>
        <tr>
          <th>Desc</th>
          <th>Full?</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Location</th>
          <th>QRCode</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => {
            return [
              <BinEntry key={i} id={entry.id} entry={entry} onDelete={onDelete}/>
            ]
          })}
        </tbody>
      </table>
    </div>
  )
}

export default BinEntries