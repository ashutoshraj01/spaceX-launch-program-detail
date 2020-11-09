import { getApiEndpoints } from './apiEndpoints';

const URL = 'https://api.spaceXdata.com/v3/launches?limit=100';
const endPoints: any = getApiEndpoints(URL);


export const environment = {
  production: true,
  ...endPoints,
};
