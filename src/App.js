import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import {
  StartExecution,
  DescribeExecution,
} from './FetchFunctions';

import './App.css';

const LinkToSagemath = <Link href="https://www.sagemath.org/" target="_blank" rel="noopener"> SageMath </Link>;

const App = () => {
  const [polynomial, setPolynomial] = useState('');
  const [primeRange, setPrimeRange] = useState('');
  const [executionId, setExecutionId] = useState('');
  const [result, setResult] = useState('None');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {/* left space */}
        <Grid item xs={4}>
          <Button
            variant="contained"
            onClick={() => DescribeExecution({
              "executionId": executionId,
              "setResult": setResult,
          })}
          >
            Describe Execution
          </Button>
        </Grid>
        {/* center space */}
        <Grid item xs={4}>
          <Paper className="paper" elevation={3}>
            <div className="appTitle">
              <Typography variant="h4">Welcome to my app!</Typography>
            </div>
            <Typography variant="body1" className="outline">
              This application is
              {LinkToSagemath}
              application.
            </Typography>
            <Typography variant="body1" className="outline">
              Input irreducible polynomial.
            </Typography>
            <div className="textField">
              <div className="polynomialText">
                <TextField
                  id="outlined-basic"
                  className="polynomialText"
                  label="polynomial"
                  variant="outlined"
                  onChange={(event) => setPolynomial(event.target.value)}
                />
              </div>
              <div className="primeRangeText">
                <TextField
                  id="outlined-basic"
                  className="primeRangeText"
                  label="prime range"
                  variant="outlined"
                  onChange={(event) => setPrimeRange(event.target.value)}
                />
              </div>
            </div>
            <div className="submitButton">
              <Button
                variant="contained"
                onClick={() => StartExecution({
                  "polynomial": polynomial,
                  "primeRange": primeRange,
                  "setExecutionId": setExecutionId,
                })}
              >
                search start
              </Button>
            </div>
            <div>
              <Typography variant="h5" className="outline">Result</Typography>
              {result}
            </div>
          </Paper>
        </Grid>
        {/* right space */}
        <Grid item xs={4}>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
