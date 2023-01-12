import { FaRegTimesCircle } from 'react-icons/fa';
import { Amplify, Storage } from 'aws-amplify'
import awsExports from "./aws-exports";
import { Button } from '@mui/material'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

Amplify.configure(awsExports);

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'download';
  const clickHandler = () => {
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.removeEventListener('click', clickHandler);
    }, 150);
  };
  a.addEventListener('click', clickHandler, false);
  a.click();
  return a;
}

async function download(id) {
  const result = await Storage.get( id + ".png", {download: true});
  downloadBlob(result.Body,  id + ".png");
}

const BinEntry = ({id, entry, onDelete}) => {
  const dateFormat = (dateString) => {
    let dateObject = new Date(Date.parse(dateString));
    let newDateString = `${dateObject.getMonth() + 1}/${dateObject.getDate() + 1}/${dateObject.getFullYear()} ${dateObject.getHours()}:${(dateObject.getMinutes() < 10) ? '0' + dateObject.getMinutes() : dateObject.getMinutes()}`;

    return newDateString;
  }


  return (
    <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={id}>
      <TableCell>{entry.desc}</TableCell>
      <TableCell>{entry.full ? 'Full' : 'Not Full'}</TableCell>
      <TableCell>{entry.createdAt ? dateFormat(entry.createdAt) : 'N/A'}</TableCell>
      <TableCell>{entry.updatedAt ? dateFormat(entry.updatedAt) : 'N/A'}</TableCell>
      <TableCell>{entry.location ? entry.location : 'N/A'}</TableCell>
      <TableCell><Button variant='contained' onClick={()=>download(id)}> Download</Button></TableCell>
      <TableCell align='center' size='small'><FaRegTimesCircle className='entries-delete-btn' onClick={()=>onDelete(id)} /></TableCell>
    </TableRow>
  )
}

export default BinEntry