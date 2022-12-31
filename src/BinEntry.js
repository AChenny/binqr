import { FaRegTimesCircle } from 'react-icons/fa';

const BinEntry = ({id, entry, onDelete}) => {
  return (
    <tr key={id}>
    <td>{entry.link}</td>
    <td>{entry.full ? 'Full' : 'Not Full'}</td>
    <td><FaRegTimesCircle onClick={()=>onDelete(id)} /></td>
    </tr>
  )
}

export default BinEntry