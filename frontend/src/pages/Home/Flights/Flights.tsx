import React from "react";
import moment from "moment";
import {Button, Card, CardContent, StyleRules, Typography, WithStyles, withStyles} from "@material-ui/core";
import { TAirportFlightsResponse, TFlightData } from "../../../api/api.types";
// @ts-ignore
import { NotificationContainer, NotificationManager } from 'react-notifications';
import classNames from "classnames";
import {ISelectFlights, THandleFlightsSubmit} from "./Flights.types";
import {  } from "../Home.types";


interface IProps {
  value: TAirportFlightsResponse;
  onSubmit: THandleFlightsSubmit;
}

interface IState {
  select: ISelectFlights;
}

type THandleSelect = (type: keyof TAirportFlightsResponse['data'], flightData: TFlightData) => void;

type TRenderButtonProps = {
  selectFlights: ISelectFlights;
  onSubmit: THandleFlightsSubmit;
};
type TRenderButton = (props: TRenderButtonProps) => JSX.Element;

type TRenderFlight = (key: keyof TAirportFlightsResponse['data'], flights: TAirportFlightsResponse['data']) => JSX.Element;

const Flights = (props: IProps & WithStyles) => {
  const [state, setState] = React.useState<IState>({
    select: {
      flights_back: null,
      flights_to: null,
    },
  });
  const {
    value,
    classes,
    onSubmit
  } = props;
  const {
    select,
  } = state;
  const isSelectedFlight = state.select.flights_back || state.select.flights_to;

  const handleSelect: THandleSelect = (type, flightData) => {
    const {
      select,
    } = state;

    // NotificationManager.error('Вы уже добавили этот экипаж');

    const selectFlight = select[type];

    if (selectFlight && selectFlight.flight_id === flightData.flight_id) {}

    setState({
      ...state,
      select: {
        ...select,
        [type]: (selectFlight && selectFlight.flight_id === flightData.flight_id) ? null : flightData,
      },
    });
  };

  const renderFlightBlock = (label: string, value: string) => (
    <Typography>
      <span>{label}</span>
      <span>&nbsp;-&nbsp;</span>
      <strong>{value}</strong>
    </Typography>
  );

  const renderFlight: TRenderFlight = (type, flightsData) => {
    const { select } = state;
    const flights = flightsData[type];
    const timeFormat = 'HH:mm:ss';

    return (
      <div>
        {flights && flights.map((flight) => {
          const {
            flight_id,
            flight_code,
            from,
            to,
            cost,
            availability,
          } = flight;
          const toTime = moment(to.time, timeFormat);
          const fromTime = moment(from.time, timeFormat);
          const time = moment.utc(toTime.diff(fromTime)).format('H час(ов) mm минут');

          const selectFlight = select[type];
          const isActive = selectFlight && selectFlight.flight_id === flight.flight_id;

          return (
            <div
              key={flight_id}
              className={classes.cardContainer}
              onClick={() => handleSelect(type, flight)}
            >
              <Card
                className={classNames([classes.card, isActive ? classes.cardActive : ''])}
              >
                <CardContent>
                  {renderFlightBlock('Номер рейса', flight_code)}
                  {renderFlightBlock('Дата и время отправления', `${from.date} (${from.time})`)}
                  {renderFlightBlock('Дата и время прибытия', `${to.date} (${to.time})`)}
                  {renderFlightBlock('Время в полете', time)}
                  {renderFlightBlock('Цена', `${cost}RUB`)}
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>
    );
  };

  const renderButton: TRenderButton = ({ selectFlights, onSubmit }) => (
    <Button
      variant="contained"
      color="primary"
      onClick={() => onSubmit(selectFlights)}
    >
      Go to booking
    </Button>
  );

  const handleSubmit: THandleFlightsSubmit = (value) => {
    onSubmit(value);
  };

  return (
    <div className={classes.root}>
      <div>
        <div>
          <div>Туда</div>
          <div>
            {renderFlight('flights_to', value.data)}
          </div>
        </div>
        <div>
          <div>Обратно</div>
          <div>
            {renderFlight('flights_back', value.data)}
          </div>
        </div>
      </div>
      <div>
        {isSelectedFlight && renderButton({
          selectFlights: select,
          onSubmit,
        })}
      </div>
      <NotificationContainer />
    </div>
  )
};

const styles: StyleRules = {
  root: {
    margin: '0 10px',
  },
  cardContainer: {
    margin: '5px',
    display: 'inline-block',
  },
  card: {
    border: '1px solid #c0c0c0',
    '&:hover': {
      border: '1px solid green',
      cursor: 'pointer',
    },
  },
  cardActive: {
    background: 'green',
    color: '#fff',
  },
};

export default withStyles(styles)(Flights);