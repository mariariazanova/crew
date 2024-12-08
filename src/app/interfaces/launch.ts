import {Core} from './core';

export interface Launch {
  success: boolean;
  details: string,
  // launchDate: string,
  date_utc: string,
  payloads: string[],
  cores: Core[],
}

// export interface LaunchItem {
//   success: boolean;
//   details: string,
//   launchDate: string,
// }
