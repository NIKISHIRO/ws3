import React from "react";
import Booking from "./Booking";
import { ISelectFlights } from "../Flights/Flights.types";
import {
  IPassenger,
  THandleAddPassenger,
  THandleBookingSubmit,
  THandleChangePassenger,
  THandleDeletePassenger
} from "./Booking.types";
import moment from "moment";


interface IProps {
  selectFlights: ISelectFlights;
}

interface IState {
  passengers: IPassenger[];
}

const defaultDate = moment(new Date()).format("YYYY-MM-DD");

const defaultPassenger: IPassenger = {
  first_name: '',
  last_name: '',
  birth_date: defaultDate,
  document_number: '',
};

const BookingContainer = (props: IProps) => {
  const [state, setState] = React.useState<IState>({
    passengers: [{ ...defaultPassenger }],
  });
  const {
    selectFlights,
  } = props;
  const {
    passengers,
  } = state;

  const handleChangePassenger: THandleChangePassenger = (index, passengers, key, value) => {
    const passenger = { ...passengers[index] };
    const newPassengers = [...passengers];

    passenger[key] = value;
    newPassengers[index] = passenger;

    setState({
      ...state,
      passengers: newPassengers,
    });
  };

  const handleAddPassenger: THandleAddPassenger = (passengers) => {
    if (passengers.length === 8) return;

    setState({
      ...state,
      passengers: [
        ...state.passengers,
        { ...defaultPassenger },
      ],
    });
  };

  const handleDeletePassenger: THandleDeletePassenger = (index, passengers) => {
    if (passengers.length === 1) return;

    passengers.splice(index, 1);

    setState({
      ...state,
      passengers,
    });
  };

  const handleSubmit: THandleBookingSubmit = (e) => {
    e.preventDefault();

    console.log('handleSubmit');

  };

  return (
    <Booking
      selectFlights={selectFlights}
      passengers={passengers}
      onChangePassenger={handleChangePassenger}
      onAddPassenger={handleAddPassenger}
      onDeletePassenger={handleDeletePassenger}
      onSubmit={handleSubmit}
    />
  );
};

export default BookingContainer;