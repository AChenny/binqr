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
              <BinEntry key={entry.id} entry={entry} onDelete={onDelete}></BinEntry>
            ]
          })}
        </tbody>
      </table>
  )
}

export default BinEntries