export type TAirportResponse = {
  data: {
    items: TAirportItemData[]
  };
};

export type TAirportItemData = {
  name: string;
  iata: string;
};

export type TAirportFlightsQuery = {
  from: string;
  to: string;
  date1: string;
  date2: string;
  passengers: number;
};

export type TAirportFlightsResponse = {
  data: {
    flights_to: TFlightData[];
    flights_back?: TFlightData[];
  };
};

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

export type TFlightResponseError = {
  error: {
    code: 422;
    message: 'Validation error';
    errors: {
      [key: number]: string[];
    };
  };
};

export type TBookingRequest = {
  flight_from: TBookingFlightPlace;
  flight_back: TBookingFlightPlace;
  passengers: TBookingPassenger[];
};

export type TBookingPassenger = {
  birth_date: Date;
  first_name: string;
  last_name: string;
  document_number: number;
};

export type TBookingFlightPlace = {
  id: number;
  date: Date;
};

export type TBookingInfoResponse = {
  data: {
    code: string;
    cost: number;
    flights: TFlightData[];
    passengers: TBookingInfoPassenger[];
  };
};

export type TBookingInfoPassenger = {
  id: number;
  first_name: string;
  last_name: string;
  birth_date: Date;
  document_number: number;
  place_from: string | null;
  place_back: string | null;
};
