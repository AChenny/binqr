import { FaRegTimesCircle } from 'react-icons/fa';

const BinEntry = ({entry, onDelete}) => {
  return (
    <tr>
    <td>{entry.link}</td>
    <td>{entry.full ? 'Full' : 'Not Full'}</td>
    <td><FaRegTimesCircle onClick={onDelete} /></td>
    </tr>
  )
}

export default BinEntry