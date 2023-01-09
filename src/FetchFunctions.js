import {
  StartExecutionUrl,
  DescribeExecutionUrl,
} from './Constants';

export const StartExecution = async props => {
  const {
    polynomial,
    primeRange,
    setResult,
    setExecutionId,
    setIsFetching,
  } = props;

  if (polynomial === '' && primeRange === '') {
    return;
  }

  setResult('');

  const uuid = crypto.randomUUID();

  const requestBody = JSON.stringify({
    'inputPolynomial': polynomial,
    'primeRange': primeRange,
    'analysisId': uuid,
  });

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: requestBody,
    redirect: 'follow',
  };

  setIsFetching(true);

  await fetch(StartExecutionUrl, requestOptions)
    .then(response => response.text())
    .then(result => {
      const executionId = JSON.parse(result).executionArn.split(':').slice(-1)[0];
      setExecutionId(executionId);
    })
    .catch(error => {
      setResult('error');
      setIsFetching(false);
      console.log({error});
    });
}

export const DescribeExecution = async props => {
  const {
    executionId,
    setResult,
    setIsFetching,
  } = props;

  const requestBody = JSON.stringify({
    'executionId': executionId,
  });

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: requestBody,
    redirect: 'follow',
  };

  await fetch(DescribeExecutionUrl, requestOptions)
    .then(response => response.text())
    .then(result => {
      const resultObject = JSON.parse(result);
      if (resultObject.hasOwnProperty('output')) {
        const group = JSON.parse(resultObject.output)[0]['group'];
        setResult(group);
        setIsFetching(false);
      }
    })
    .catch(error => {
      setResult('error');
      setIsFetching(false);
      console.log({error});
    });
}
