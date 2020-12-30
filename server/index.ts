import express, {Request, Response} from 'express';
import {bookingData, flightsData} from "./api/api.data";
import { omit } from 'lodash';
import cors from 'cors';
import shortid from "shortid";


export type TFlightData =  {
  flight_id: number;
  flight_code: string;
  from: TFlightPlace;
  to: TFlightPlace;
  cost: number;
  availability: number;
};

export type TFlightPlace = {
  city: string;
  airport: string;
  iata: string;
  date: string;
  time: string;
};

export type TAirportFlightsResponse = {
  data: {
    flights_to: TFlightData[];
    flights_back: TFlightData[];
  };
};

interface IFlightRequest {
  from?: string;
  to?: string;
  date1?: string;
  date2?: string;
  passengers?: number;
}

interface IStorage {
  booking: {
    [code: string]: TBookingRequest;
  };
  users: Record<string, IStorageUserData>;
}

interface IStorageUserData {
  token: string;
  data: IRegisterRequest;
}

type TFlightData =  {
  flight_id: number;
  flight_code: string;
  from: TFlightPlace;
  to: TFlightPlace;
  cost: number;
  availability: number;
};

type TBookingPassenger = {
  birth_date: string;
  first_name: string;
  last_name: string;
  document_number: string;
};

type TBookingRequest = {
  flights: TFlightData[];
  passengers: TBookingPassenger[];
};

interface IBookingSuccess {
  code: string;
  cost: number;
  flights: TFlightData[];
  passengers: TBookingPassenger[];
}

interface IBookingError {
  error: {
    code: 422;
    message: 'Validation error';
    errors: string[];
  },
}

type TBookingResponse = IBookingSuccess | IBookingError;

interface IRegisterRequest {
  first_name: string;
  last_name: string;
  phone: string;
  document_number: string;
  password: string;
}

interface ILoginRequest {
  phone: string;
  password: string;
}

const PORT = 3001;
const HOST = '/api';
const app = express();

const airports = {
  kazan: { name: 'Kazan', iata: 'KZN' },
  moscow: { name: 'Moscow', iata: 'SVO' },
};

const STORAGE: IStorage = {
  booking: {},
  users: {},
};

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


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

app.post(`${HOST}/booking`, (request: Request<any, any, TBookingRequest, any>, response) => {
  console.log(`${HOST}/booking`, request.body);

  const code = 'QSASE';

  STORAGE.booking = {
    [code]: request.body,
  };

  response.json({
    code,
  });
});

app.get(`${HOST}/booking/:code`, (request, response: Response<TBookingResponse>) => {
  const { code } = request.params;
  const booking = STORAGE.booking[code];

  console.log('STORAGE.booking', STORAGE.booking);

  if (!booking) {
    response.statusCode = 422;
    response.json({
      error: {
        code: 422,
        message: 'Validation error',
        errors: ['Код с таким экипажем не найден!'],
      },
    });
  }

  const cost = booking.flights.reduce((acc, flight) => acc + flight.cost, 0);
  const data = { ...booking, cost, code };

  response.json(data);
});

app.get(`${HOST}/register`, (req: Request<any, any, any, IRegisterRequest>, res) => {
  const {
    query,
    query: { phone },
  } = req;

  if (STORAGE.users[phone]) {
    return res.sendStatus(422);
  }

  STORAGE.users[phone] = {
    token: '',
    data: query,
  };

  res.sendStatus(204);
});

app.get(`${HOST}/login`, (req: Request<any, any, any, ILoginRequest>, res: Response<{ token: string }>) => {
  const {
    query: { phone, password },
  } = req;

  if(!STORAGE.users[phone]) {
    return res.sendStatus(422);
  }

  const token = shortid.generate();

  STORAGE.users[phone] = {
    ...STORAGE.users[phone],
    token,
  };

  res.json({ token });
});

app.get(`${HOST}/user`, (req, res) => {
  console.log('req.headers.authorization', req.headers.authorization);
  const bearerHeader = req.headers.authorization;

  if (!bearerHeader) return res.sendStatus(401);

  const bearerToken = bearerHeader.split(' ')[1];

  console.log('STORAGE.users', STORAGE.users);

  const users = Object
    .keys(STORAGE.users)
    .reduce<IStorageUserData[]>((acc, key) => {

      console.log('STORAGE.users[key]', STORAGE.users[key]);
      if (STORAGE.users[key].token === bearerToken) return [
        ...acc,
        STORAGE.users[key],
      ];

      return acc;
    }, []);

  console.log('users', users);

  if (users.length) {
    return res.json({
      ...users[0].data,
    });
  }

  return res.sendStatus(401);
});

app.listen(PORT, () => {
  console.log(`Сервер на ${PORT} порту.`);
});
