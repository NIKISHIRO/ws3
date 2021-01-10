import React from "react";
import moment from "moment";
import { Card, CardContent, StyleRules, Typography, WithStyles, withStyles } from "@material-ui/core";
import { IBookingSuccess, TBookingPassenger, TFlightData } from "../../api/api.types";


interface IProps {
  booking: IBookingSuccess;
}

type TRenderFlight = (flights: TFlightData[]) => JSX.Element;

const Bookings = (props: IProps & WithStyles) => {
  const {
    classes,
    booking: {
      flights,
      passengers
    },
  } = props;

  const renderPassenger = (passenger: TBookingPassenger, index: number) => {
    const {
      first_name,
      last_name,
      document_number,
      birth_date,
    } = passenger;

    return (
      <div
        key={index}
        className={classes.passenger}
      >
        <div>
          <b>Имя</b> - {first_name}
        </div>
        <div>
          <b>Фамилия</b> - {last_name}
        </div>
        <div>
          <b>Номер документа</b> - {document_number}
        </div>
        <div>
          <b>Дата рождения</b> - {birth_date}
        </div>
      </div>
    );
  };

  const renderFlightBlock = (label: string, value: string) => (
    <Typography>
      <span>{label}</span>
      <span>&nbsp;-&nbsp;</span>
      <strong>{value}</strong>
    </Typography>
  );

  const renderFlight: TRenderFlight = (flights) => {
    const timeFormat = 'HH:mm:ss';

    return (
      <div className={classes.flight}>
        {flights && flights.map((flight) => {
          const {
            flight_id,
            flight_code,
            from,
            to,
            cost,
          } = flight;
          const fromTime = moment(from.time, timeFormat);
          const toTime = moment(to.time, timeFormat);
          const time = moment.utc(toTime.diff(fromTime)).format('H час(ов) mm минут');

          return (
            <div key={flight_id}>
              <Card>
                <CardContent>
                  {renderFlightBlock('Номер рейса', flight_code)}
                  {renderFlightBlock('Дата и время отправления', `${from.date} (${from.time})`)}
                  {renderFlightBlock('Дата и время прибытия', `${to.date} (${to.time})`)}
                  {renderFlightBlock('Время в полете', time)}
                  {renderFlightBlock('Цена', `${cost}RUB`)}
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <div>
        <h1>Сейчас забронировано:</h1>
      </div>
      <div>
        <b>Пассажиры({passengers.length}):</b>
        <br />
        {passengers.map(renderPassenger)}
      </div>
      <div>
        <b>Рейсы({flights.length}):</b>
        <br />
        {renderFlight(flights)}
      </div>
    </div>
  );
}

const styles: StyleRules = {
  passenger: {
    display: 'inline-block',
    border: '1px solid #c0c0c0',
    margin: '15px',
    padding: '15px',
  },
  flight: {
    display: 'inline-block',
    border: '1px solid #c0c0c0',
    margin: '15px',
    padding: '15px',
  },
};

export default withStyles(styles)(Bookings);
