import BinEntry from './BinEntry.js'

const BinEntries = ({entries}) => {
  return (
    <table>
        <thead>
        <tr>
          <th>Link</th>
          <th>Full?</th>
        </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => {
            return [
              <BinEntry key={entry.id} entry={entry}></BinEntry>
            ]
          })}
        </tbody>
      </table>
  )
}

export default BinEntries