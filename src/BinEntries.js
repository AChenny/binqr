import BinEntry from './BinEntry.js'

const BinEntries = ({entries, onDelete}) => {
  return (
    <table>
        <thead>
        <tr>
          <th>Link</th>
          <th>Full?</th>
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
  )
}

export default BinEntries