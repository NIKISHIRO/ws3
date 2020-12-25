import React from "react";
import Flights from "./Flights";
import { TAirportFlightsResponse } from "../../../api/api.types";
import { THandleFlightsSubmit } from "./Flights.types";


interface IProps {
  value: TAirportFlightsResponse;
  onSubmit: THandleFlightsSubmit;
}

const FlightsContainer = ({ value, onSubmit }: IProps) => {

  return (
    <Flights
      value={value}
      onSubmit={onSubmit}
    />
  );
};

export default FlightsContainer;
