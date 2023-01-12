import BinEntry from './BinEntry.js'
import './styles/BinEntries.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const BinEntries = ({entries, onDelete}) => {
  return (
    <TableContainer className='entries-table' component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight: 'bold'}}>Desc</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Full?</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Created At</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Updated At</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Location</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>QRCode</TableCell>
            <TableCell align='center' sx={{fontWeight: 'bold'}}>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {entries.map((entry, i) => {
            return [
              <BinEntry key={i} id={entry.id} entry={entry} onDelete={onDelete}/>
            ]
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BinEntries