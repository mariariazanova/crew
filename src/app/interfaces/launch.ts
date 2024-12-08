import {Core} from './core';

export interface Launch {
  success: boolean;
  details: string,
  date_utc: string,
  payloads: string[],
  cores: Core[],
}
