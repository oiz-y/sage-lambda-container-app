const apiGatewayId = 'glcnh2cboa';
const stage = 'prd';
const startExecutionResource = 'start';
const describeExecutionResource = 'describe';

export const StartExecutionUrl = `https://${apiGatewayId}.execute-api.ap-northeast-1.amazonaws.com/${stage}/${startExecutionResource}`;
export const DescribeExecutionUrl = `https://${apiGatewayId}.execute-api.ap-northeast-1.amazonaws.com/${stage}/${describeExecutionResource}`;
