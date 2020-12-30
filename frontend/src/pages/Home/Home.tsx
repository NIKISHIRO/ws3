import React from "react";
import Select from 'react-select';
import { StyleRules, TextField, WithStyles, withStyles, Button } from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import {
  TForm,
  IAirportSelect,
  THandleInputChangeFactory,
  THandleSelect,
  THandleSubmit,
  THandleCheckboxChange,
  TModalClose,
} from "./Home.types";
import { TAirportFlightsResponse } from "../../api/api.types";
import FlightsContainer from "./Flights/Flights.container";
import { ISelectFlights, THandleFlightsSubmit } from "./Flights/Flights.types";
import { TRenderView } from "../../types";
import Dialog from "@material-ui/core/Dialog";
import BookingContainer from "./Booking/Booking.container";
import {THandleBookingSubmit} from "./Booking/Booking.types";


interface IProps {
  airports: IAirportSelect;
  form: TForm;
  flights: TAirportFlightsResponse;
  selectFlights: ISelectFlights;
  isSubmitted: boolean;
  isModalOpen: boolean;
  onInputChange: THandleInputChangeFactory;
  onSelect: THandleSelect;
  onSubmit: THandleSubmit;
  onFlightsSubmit: THandleFlightsSubmit;
  onBookingSubmit: THandleBookingSubmit;
  onCheckboxChange: THandleCheckboxChange;
  onModalClose: TModalClose;
}

type TProps = IProps & WithStyles;

type TRenderInput = (type: 'number' | 'text' | 'date', key: keyof TForm, form: TForm) => JSX.Element;

type TRenderSelect = (key: keyof IAirportSelect, airportSelect: IAirportSelect) => JSX.Element;

type TRenderDialogProps = {
  selectFlights: ISelectFlights;
  isModalOpen: boolean;
};
type TRenderDialog = (props: TRenderDialogProps) => JSX.Element;

const Home = (props: TProps) => {
  const {
    airports,
    form,
    flights,
    classes,
    selectFlights,
    isSubmitted,
    isModalOpen,
    onSelect,
    onSubmit,
    onFlightsSubmit,
    onBookingSubmit,
    onCheckboxChange,
    onModalClose,
  } = props;

  const renderInput: TRenderInput = (type, key, form) => {
    const { value, label, hasDisableButton, checkboxValue } = form[key];

    return (
      <div className={classes.inputContainer}>
        <TextField
          label={label}
          value={value}
          disabled={!checkboxValue}
          type={type}
          className={classes.input}
          onChange={({ currentTarget: { value } }) => {
            props.onInputChange('number', key)(value);
          }}
        />
        {hasDisableButton &&
          <Checkbox
            value={checkboxValue}
            onChange={({ currentTarget: { checked } }) => onCheckboxChange(key, checked)}
          />
        }
      </div>
    );
  };

  const renderForm: TRenderView = (viewProps) => {
    const {
      form: {
        departing,
        returning,
        passengers,
      },
      airports: {
        fromWhere,
        toWhere,
      },
    } = viewProps;

    const data = {
      date1: departing.value,
      date2: returning.checkboxValue ? returning.value : '',
      from: fromWhere.value ? fromWhere.value.value : '',
      to: toWhere.value ? toWhere.value.value : '',
      passengers: parseInt(passengers.value),
    };

    return (
      <form
        noValidate
        autoComplete="off"
        className={classes.form}
        onSubmit={(e) => onSubmit(e, data)}
      >
        <div>{renderInput('date', 'departing', form)}</div>
        <div>{renderInput('date', 'returning', form)}</div>
        <div>{renderInput('number', 'passengers', form)}</div>
        <Button type="submit" className={classes.submitButton}>Отправить</Button>
      </form>
    );
  };

  const renderSelect: TRenderSelect = (key, airportSelect) => {
    const { value, options, placeholder } = airportSelect[key];

    return (
      <Select
        value={value}
        options={options}
        placeholder={placeholder}
        onChange={(value) => value ? onSelect(key, value) : onSelect(key, null)}
      />
    );
  };

  const renderFlightsContainer: TRenderView = () => (
    <div className={classes.flights}>
      <div className={classes.flightsPrompt}>
        <b>Выберите экипаж "туда" и\или "обратно".</b>
      </div>
      <div>
        <FlightsContainer
          value={flights}
          onSubmit={onFlightsSubmit}
        />
      </div>
    </div>
  );

  const renderDialog: TRenderDialog = (props) => {
    const {
      selectFlights,
      isModalOpen,
    } = props;

    return (
      <Dialog
        open={isModalOpen}
        onClose={onModalClose}
      >
        <BookingContainer
          selectFlights={selectFlights}
          onModalClose={onModalClose}
          onSubmit={onBookingSubmit}
        />
      </Dialog>
    );
  }

  return (
    <div className={classes.airport}>
      <div className={classes.root}>
        <div>
          {renderSelect('fromWhere', airports)}
        </div>
        <div>
          {renderSelect('toWhere', airports)}
        </div>
        <div>
          {renderForm({ airports, form })}
        </div>
      </div>
      {isSubmitted && renderFlightsContainer()}
      {renderDialog({
        selectFlights,
        isModalOpen,
      })}
    </div>
  );
};

const styles: StyleRules = {
  root: {
    border: '1px solid #c0c0c0',
    padding: '25px',
    maxWidth: '400px',
  },
  airport: {
    display: 'flex',
  },
  form: {
    display: 'inline-block',
    border: '1px solid #c0c0c0',
    padding: '25px',
    textAlign: 'left',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginBottom: '15px',
  },
  submitButton: {
    marginTop: '15px',
    textAlign: 'center',
  },
  airports: {
    marginTop: '25px',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  flights: {
    margin: '10px',
  },
  flightsPrompt: {
    margin: '10px',
  },
};

export default withStyles(styles)(Home);
