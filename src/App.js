import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

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
  const [result, setResult] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (isFetching) {
      const intervalID = setInterval(() => DescribeExecution({
        "executionId": executionId,
        "setResult": setResult,
        "setIsFetching": setIsFetching,
      }), 1000);
      return () => clearInterval(intervalID);
    }
  })

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {/* left area */}
        <Grid item xs={4}>
        </Grid>
        {/* center area */}
        <Grid item xs={4}>
          <Paper className="paper" elevation={3}>
            <div className="appTitle">
              <Typography variant="h4">Welcome!</Typography>
            </div>
            <div className="outline">
              <Typography variant="body1">
                Input irreducible polynomial.
              </Typography>
            </div>
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
                  "setResult": setResult,
                  "setExecutionId": setExecutionId,
                  "setIsFetching": setIsFetching,
                })}
              >
                search
              </Button>
            </div>
            <Typography variant="h5">
              {result}
            </Typography>
            <div className="progressArea">
              {isFetching ? <CircularProgress /> : <></>}
            </div>
          </Paper>
        </Grid>
        {/* right area */}
        <Grid item xs={4}>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
