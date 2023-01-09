import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { useMediaQuery } from 'react-responsive';

import {
  StartExecution,
  DescribeExecution,
} from './FetchFunctions';

import './App.css';

const App = () => {
  const [polynomial, setPolynomial] = useState('');
  const [primeRange, setPrimeRange] = useState('');
  const [executionId, setExecutionId] = useState('');
  const [result, setResult] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 844px)'
  })
  const ControleSpace = <>{isDesktopOrLaptop ? <Grid item xs={4}></Grid> : <></>}</>;

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
        {ControleSpace}
        <Grid item xs={isDesktopOrLaptop ? 4 : 12}>
          <Paper className="paper" elevation={3}>
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
                  label="integer"
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
                <RocketLaunchIcon />
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
        {ControleSpace}
      </Grid>
    </Box>
  );
}

export default App;
