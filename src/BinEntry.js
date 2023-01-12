import { useState } from 'react';
import { FaRegTimesCircle } from 'react-icons/fa';
import { Amplify, Storage, API, graphqlOperation  } from 'aws-amplify'
import { updateQrEntry } from './graphql/mutations';
import awsExports from "./aws-exports";
import { Checkbox } from '@mui/material';

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

async function updateBinStatus (id, value) {
  try {
    const entry = {
      id: id,
      full: !value
    };

    await API.graphql(graphqlOperation(updateQrEntry, {input: entry}));

  } catch (err) {
    console.log("Error reporting full bin", err)
  }
}

function BinEntry({id, entry, onDelete}) {
  const [isChecked, setIsChecked] = useState(entry.full);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    updateBinStatus(id, isChecked)
  };

  return (
    <tr key={id}>
    <td>{entry.desc}</td>
    <td><Checkbox checked={isChecked} onChange={handleOnChange}></Checkbox></td>
    <td>{entry.createdAt ? entry.createdAt : 'N/A'}</td>
    <td>{entry.updatedAt ? entry.updatedAt : 'N/A'}</td>
    <td>{entry.location ? entry.location : 'N/A'}</td>
    <td><button onClick={()=>download(id)}> Download</button></td>
    <td><FaRegTimesCircle onClick={()=>onDelete(id)} /></td>
    </tr>
  )
}

export default BinEntry