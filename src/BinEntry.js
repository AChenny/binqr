const BinEntry = ({entry}) => {
  return (
    <tr>
    <td>{entry.link}</td>
    <td>{entry.full ? 'Full' : 'Not Full'}</td>
    </tr>
  )
}

export default BinEntry