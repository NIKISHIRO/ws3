export type TFlightData =  {
  flight_id: number;
  flight_code: string;
  from: TFlightPlace;
  to: TFlightPlace;
  cost: number;
  availability: number;
};

export type TFlightPlace = {
  city: string;
  airport: string;
  iata: string;
  date: string;
  time: string;
};

export type TAirportFlightsResponse = {
  data: {
    flights_to: TFlightData[];
    flights_back: TFlightData[];
  };
};