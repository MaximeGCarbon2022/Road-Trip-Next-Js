export type CountryCode = string;

export type CountryName = {
  common: string;
  official: string;
};

export type Currency = {
  name: string;
  symbol?: string;
};

export type LatLng = [number, number];

export type Flag = {
  svg?: string;
  png?: string;
  alt?: string;
};

export type MapLinks = {
  googleMaps?: string;
  openStreetMaps?: string;
};

export type Translation = {
  official: string;
  common: string;
};

export type CapitalInfo = {
  latlng?: LatLng;
};

export type PostalCode = {
  format?: string;
  regex?: string;
};

export type Country = {
  symbol: unknown;
  name: CountryName;
  cca3: CountryCode;
  independent?: boolean;
  status?: string;
  unMember?: boolean;
  currencies?: Record<string, Currency>;
  capital?: string[];
  capitalInfo?: CapitalInfo;
  region?: string;
  subregion?: string;
  continents?: string[];
  languages?: Record<string, string>;
  translations?: Record<string, Translation>;
  latlng?: LatLng;
  landlocked?: boolean;
  borders?: CountryCode[];
  area?: number;
  flag?: string;
  flags?: Flag;
  coatOfArms?: Flag;
  population?: number;
  maps?: MapLinks;
  postalCode?: PostalCode;
  startOfWeek?: string;
  timezones?: string[];
};
