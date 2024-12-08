export interface SpaceTrack {
  CREATION_DATE: string;
  COUNTRY_CODE: string;
}

export interface StarLink {
  id: string;
  spaceTrack: SpaceTrack;
  height_km: number;
  launch: string;
}

export interface StarLinkListItem {
  id: string;
  creationDate: string;
  countryCode: string;
  height_km: number;
  launch: string;
}
