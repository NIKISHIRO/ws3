import React from "react";
import { ISelectFlights } from "../Flights/Flights.types";
import {Button, StyleRules, TextField, WithStyles, withStyles} from "@material-ui/core";
import {
  IPassenger,
  THandleAddPassenger,
  THandleBookingSubmit,
  THandleChangePassenger,
  THandleDeletePassenger
} from "./Booking.types";


interface IProps {
  selectFlights: ISelectFlights;
  passengers: IPassenger[];
  onSubmit: THandleBookingSubmit;
  onChangePassenger: THandleChangePassenger
  onAddPassenger: THandleAddPassenger;
  onDeletePassenger: THandleDeletePassenger;
}

type TRenderPassenger = (index: number, passenger: IPassenger, passengers: IPassenger[]) => JSX.Element;

type TRenderPassengers = (passenger: IPassenger[]) => JSX.Element[];

const translateFields = {
  first_name: 'Имя',
  last_name: 'Фамилия',
  birth_date: 'Дата рождения',
  document_number: 'Номер документа',
};

const Booking = (props: IProps & WithStyles) => {
  const {
    passengers,
    classes,
    onSubmit,
    onAddPassenger,
    onDeletePassenger,
    onChangePassenger,
  } = props;

  const renderInput = (key: keyof IPassenger, value: string, index: number, type: 'text' | 'date') => (
    <TextField
      value={value}
      type={type}
      placeholder={translateFields[key]}
      onChange={(e) =>
        onChangePassenger(index, passengers, key, e.currentTarget.value)}
    />
  );

  const renderPassenger: TRenderPassenger = (index, passenger, passengers) => {
    const {
      first_name,
      last_name,
      birth_date,
      document_number,
    } = passenger;

    return (
      <div
        key={index}
        className={classes.passenger}
      >
        {renderInput('first_name', first_name, index, 'text')}
        <br />
        {renderInput('last_name', last_name, index, 'text')}
        <br />
        {renderInput('birth_date', birth_date, index, 'date')}
        <br />
        {renderInput('document_number', document_number, index, 'text')}
        <br />
        <div>
          <br />
          <Button
            color="secondary"
            onClick={() => {onDeletePassenger(index, passengers)}}
          >
            Remove
          </Button>
        </div>
      </div>
    );
  };

  const renderPassengers: TRenderPassengers = (passengers) => {
    return passengers.map((passenger, index) => renderPassenger(index, passenger, passengers));
  };

  return (
    <div className={classes.root}>
      <div>
        <b>Добавление пассажира</b>
        <br />
        <br />
      </div>
      <form
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <div>
          <Button
            color="primary"
            onClick={() => {onAddPassenger(passengers)}}
          >
            ADD
          </Button>
        </div>
        {renderPassengers(passengers)}
        <Button
          color="primary"
          type="submit"
        >
          Confirm
        </Button>
      </form>
    </div>
  );
};

const styles: StyleRules = {
  root: {
    padding: '25px',
    width: '500px',
    height: '800px',
  },
  passenger: {
    padding: '10px',
    display: 'inline-block',
    border: '1px solid #c0c0c0',
    color: '#fff',
  },
};


export default withStyles(styles)(Booking);
