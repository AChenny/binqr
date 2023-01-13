import React, {Fragment} from 'react';
import { updateQrEntry } from '../graphql/mutations';
import { Button } from '@mui/material';
import './QrScanPage.css'
import { Amplify, API, graphqlOperation } from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '@aws-amplify/ui-react/styles.css';

import awsExports from "../aws-exports";
Amplify.configure(awsExports);

function QrScanPage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  // Full Reporting Button
  async function fullReport (id, value) {
    try {
      const entry = {
        id: id,
        full: value
      };

      await API.graphql(graphqlOperation(updateQrEntry, {input: entry}));

      if (value) {
        alert('Thank you for reporting!')
      }
      else {
        alert("Bin " + id + " has been reset.")
      }
    } catch (err) {
      console.log("Error reporting full bin", err)
    }
  }
  

  return (
    <Fragment>
    <div class='page-container'>
      <h3>Bin ID: {id}</h3>
      <div>Is this bin full or is this regarding another issue?</div>
      <div>
        <Button variant='contained' sx={{px: 4, py:2, margin: 2}} onClick={()=> fullReport(id, true)} >Full</Button>
        <Button variant='contained' sx={{px: 4, py:2, margin: 2}}>Another Issue</Button>
      </div>
    </div>
    <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
          <Typography>Please expand to access administrative controls</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Authenticator hideSignUp={true}>
          {({ signOut }) => (
            <><Button variant='contained' sx={{ px: 4, py: 2, margin: 2 }} onClick={() => fullReport(id, false)}>Reset</Button><div className='header-user-logout'>
              <Button variant='outlined' style={{ marginRight: 'auto' }} onClick={signOut}>Sign out</Button>
              </div></>
          )} 
          </Authenticator>
        </AccordionDetails>
      </Accordion>
    </Fragment>
    
  )
}

export default QrScanPage