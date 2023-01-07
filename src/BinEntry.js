import { FaRegTimesCircle } from 'react-icons/fa';
import { Amplify, Storage } from 'aws-amplify'
import awsExports from "./aws-exports";

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
  return (
    <tr key={id}>
    <td>{entry.desc}</td>
    <td>{entry.full ? 'Full' : 'Not Full'}</td>
    <td>{entry.createdAt ? entry.createdAt : 'N/A'}</td>
    <td>{entry.updatedAt ? entry.updatedAt : 'N/A'}</td>
    <td><button onClick={()=>download(id)}> Download</button></td>
    <td><FaRegTimesCircle onClick={()=>onDelete(id)} /></td>
    </tr>
  )
}

export default BinEntry