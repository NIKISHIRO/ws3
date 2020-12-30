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
import {TModalClose} from "../Home.types";


interface IProps {
  selectFlights: ISelectFlights;
  onModalClose: TModalClose;
  onSubmit: THandleBookingSubmit;
}

interface IState {
  passengers: IPassenger[];
  buttonDisabled: boolean;
}

type THandleSubmit = (e: React.FormEvent, passengers: IPassenger[]) => void;

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
    buttonDisabled: false,
  });
  const {
    selectFlights,
    onModalClose,
    onSubmit,
  } = props;
  const {
    passengers,
    buttonDisabled,
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

  const handleSubmit: THandleSubmit = (e, passengers) => {
    e.preventDefault();

    setState({ ...state, buttonDisabled: true });

    onSubmit(passengers);

    onModalClose();
  };

  return (
    <Booking
      selectFlights={selectFlights}
      passengers={passengers}
      buttonDisabled={buttonDisabled}
      onChangePassenger={handleChangePassenger}
      onAddPassenger={handleAddPassenger}
      onDeletePassenger={handleDeletePassenger}
      onSubmit={handleSubmit}
    />
  );
};

export default BookingContainer;