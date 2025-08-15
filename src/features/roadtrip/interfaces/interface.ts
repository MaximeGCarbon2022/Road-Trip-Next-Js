type CountryCode = string;

export type RoadTrip = {
  countries: CountryCode[];
};

export type NewRoadTrip = RoadTrip;

export type OrderedCountry = {
  cca3: CountryCode;
  order: number;
};

export type RoadTripWithOrder = {
  countries: OrderedCountry[];
};
