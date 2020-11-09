// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import { getApiEndpoints } from './apiEndpoints';

const URL = 'https://api.spaceXdata.com/v3/launches?limit=100';
const endPoints: any = getApiEndpoints(URL);


export const environment = {
  production: false,
  ...endPoints,
};




