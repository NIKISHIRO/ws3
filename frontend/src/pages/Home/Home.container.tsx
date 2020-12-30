import React from "react";
import Home from "./Home";
import {requestAirportData, requestBookingData, requestFlightsData} from "../../api/api";
import {TAirportFlightsResponse, TAirportItemData, TFlightData} from "../../api/api.types";
import {
  IAirportSelect,
  IAirportSelectFormat,
  TForm,
  THandleCheckboxChange,
  THandleInputChangeFactory,
  THandleSelect,
  THandleSubmit,
  TModalClose
} from "./Home.types";
import moment from "moment";
import {ISelectFlights, THandleFlightsSubmit} from "./Flights/Flights.types";
import {IPassenger, THandleBookingSubmit} from "./Booking/Booking.types";


interface IState {
  airports: IAirportSelect;
  flights: TAirportFlightsResponse;
  form: TForm;
  selectFlights: ISelectFlights;
  passengers: IPassenger[];
  isSubmitted: boolean;
  isModalOpen: boolean;
}

const defaultDate = moment(new Date()).format("YYYY-MM-DD");

const HomeContainer = () => {
  const [state, setState] = React.useState<IState>({
    airports: {
      fromWhere:  {
        options: [],
        placeholder: 'Откуда',
        value: null,
      },
      toWhere:  {
        options: [],
        placeholder: 'Куда',
        value: null,
      },
    },
    flights: {
      data: {
        flights_back: [],
        flights_to: [],
      },
    },
    passengers: [],
    form: {
      departing: { value: defaultDate, label: 'Туда', hasDisableButton: false, checkboxValue: true },
      returning: { value: defaultDate, label: 'Обратно', hasDisableButton: true, checkboxValue: false },
      passengers: { value: '1', label: 'Количество пассажиров', hasDisableButton: false, checkboxValue: true },
    },
    selectFlights: {
      flights_back: null,
      flights_to: null,
    },
    isSubmitted: false,
    isModalOpen: false,
  });

  const {
    airports,
    flights,
    selectFlights,
    isSubmitted,
    isModalOpen,
  } = state;

  React.useEffect(() => {
    setAirportData();
  }, []);

  const setAirportData = async () => {
    const response = await requestAirportData();
    const options = convertAirportDataToAirportsSelect(response.data);

    setState({
      ...state,
      airports: {
        fromWhere: {
          ...state.airports.fromWhere,
          options,
          value: null,
        },
        toWhere: {
          ...state.airports.toWhere,
          options,
          value: null,
        },
      },
    });
  };

  const convertAirportDataToAirportsSelect = (value: TAirportItemData[]): IAirportSelectFormat[] =>
    value.map(({ name, iata }) => ({
      label: name,
      value: iata,
    }));

  const handleInputChangeFactory: THandleInputChangeFactory = (type, key) => {
    switch (type) {
      case "number": {
        return (value) => {
          if (Number(value) < 1 || Number(value) > 8) return;

          setState({
            ...state,
            form: {
              ...state.form,
              [key]: {
                ...state.form[key],
                value,
              },
            },
          });
        };
        break;
      }
      default:
        return (value) => {
          setState({
            ...state,
            form: {
              ...state.form,
              [key]: {
                ...state.form[key],
                value,
              },
            },
          });
        };
    }
  };

  const handleCheckboxChange: THandleCheckboxChange  = (key, value) => {
    setState({
      ...state,
      form: {
        ...state.form,
        [key]: {
          ...state.form[key],
          checkboxValue: value,
        },
      },
    });
  };

  const handleSelect: THandleSelect = (key, value) => {
    setState({
      ...state,
      airports: {
        ...state.airports,
        [key]: {
          ...state.airports[key],
          value,
        },
      },
    });
  };

  const handleSubmit: THandleSubmit = async (e, value) => {
    e.preventDefault();

    const response = await requestFlightsData(value);

    setState({
      ...state,
      flights: response.data,
      isSubmitted: true,
    });
  };

  const handleFlightsSubmit: THandleFlightsSubmit = (selectFlights) => {
    console.log('handleSubmit selectFlights', selectFlights);
    setState({
      ...state,
      isModalOpen: true,
      selectFlights,
    });
  };

  const handleBookingSubmit: THandleBookingSubmit = async (passengers) => {
    const {
      selectFlights: {
        flights_back,
        flights_to,
      },
    } = state;

    setState({ ...state, passengers });

    const flights = [flights_back, flights_to]
      .reduce<TFlightData[]>((acc, flight) => {
        if (!flight) return acc;

        return [...acc, flight];
      }, []);

    const bookingResponse = await requestBookingData({ flights, passengers });
    
    localStorage.setItem('bookingCode', bookingResponse.data.code);

    window.location.href = '/booking';
  };

  const handleModalClose: TModalClose = () => {
    setState({
      ...state,
      isModalOpen: false,
    });
  };

  return (
    <Home
      airports={airports}
      form={state.form}
      flights={flights}
      selectFlights={selectFlights}
      isSubmitted={isSubmitted}
      isModalOpen={isModalOpen}
      onInputChange={handleInputChangeFactory}
      onSelect={handleSelect}
      onSubmit={handleSubmit}
      onFlightsSubmit={handleFlightsSubmit}
      onBookingSubmit={handleBookingSubmit}
      onCheckboxChange={handleCheckboxChange}
      onModalClose={handleModalClose}
    />
  )
}

export default HomeContainer;
