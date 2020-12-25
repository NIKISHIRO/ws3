import express, {Request} from 'express';
import { flightsData } from "./api/api.data";
import { omit } from 'lodash';


interface IFlightRequest {
  from?: string;
  to?: string;
  date1?: string;
  date2?: string;
  passengers?: number;
}

const PORT = 3001;
const HOST = '/api';
const app = express();

const airports = {
  kazan: { name: 'Kazan', iata: 'KZN' },
  moscow: { name: 'Moscow', iata: 'SVO' },
};

app.get(`${HOST}/airport`, (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');

  console.log(`${HOST}/airport`);

  res.json([
    { name: airports.kazan.name, iata: airports.kazan.iata },
    { name: airports.moscow.name, iata: airports.moscow.iata },
  ]);
});

app.get(`${HOST}/flight`, (request: Request<any, any, any, IFlightRequest>, response) => {
  response.header('Access-Control-Allow-Origin', '*');
  const {
    query,
    query: {
      from,
      to,
      date1,
      date2,
      passengers,
    },
  } = request;

  console.log(`${HOST}/flight`, query);

  /*
  * Если пользователь не указал дату возвращения обратно (Returning),
  * то список рейсов должен включать в себя только перелеты из точки А в точку В.
  * */
  if (!date2) return response.json(omit(flightsData, 'data.flights_back'));

  response.json(flightsData);
});

app.listen(PORT, () => {
  console.log(`Сервер на ${PORT} порту.`);
});
