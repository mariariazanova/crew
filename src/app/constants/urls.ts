import {CORES, CREW, LAUNCHES, PAYLOADS, STARLINK} from './paths';

const API_URL = 'https://api.spacexdata.com/v4';

export const CREW_MEMBER_URl = `${API_URL}/${CREW}`;
export const STAR_LINK_URL = `${API_URL}/${STARLINK}`;
export const LAUNCH_URL = `${API_URL}/${LAUNCHES}`;
export const PAYLOAD_URL = `${API_URL}/${PAYLOADS}`;
export const CORE_URL = `${API_URL}/${CORES}`;
