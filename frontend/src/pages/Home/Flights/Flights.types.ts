import {TFlightData} from "../../../api/api.types";

export interface ISelectFlights {
  flights_to: TFlightData | null;
  flights_back: TFlightData | null;
}

export type THandleFlightsSubmit = (value: ISelectFlights) => void;
