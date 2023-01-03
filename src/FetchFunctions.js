export const DescribeExecution = async props => {
  const {
    executionId,
    setResult,
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

  await fetch('https://glcnh2cboa.execute-api.ap-northeast-1.amazonaws.com/dev/describe', requestOptions)
    .then(response => response.text())
    .then(result => {
      const resultObject = JSON.parse(result);
      const group = JSON.parse(resultObject.output)[0]['group'];
      setResult(group);
      console.log({result});
    })
    .catch(error => {
      console.log(error);
    });
}

export const StartExecution = async props => {
  const {
    polynomial,
    primeRange,
    setExecutionId,
  } = props;

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

  await fetch('https://glcnh2cboa.execute-api.ap-northeast-1.amazonaws.com/dev/start', requestOptions)
    .then(response => response.text())
    .then(result => {
      const executionId = JSON.parse(result).executionArn.split(':').slice(-1)[0];
      setExecutionId(executionId);
      console.log({result});
    })
    .catch(error => {
      console.log(error);
    });
}
