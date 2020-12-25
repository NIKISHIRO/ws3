import {TAirportFlightsQuery, TAirportFlightsResponse, TAirportItemData} from "./api.types";
import axios from 'axios';


export const HOST = 'http://localhost:3001';
export const url = `${HOST}/api`;

export const requestFlightsData = async (params: TAirportFlightsQuery) => {
  return axios.get<TAirportFlightsResponse>(`${url}/flight`, {
    method: 'get',
    params,
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  });
}

export const requestAirportData = async () => {
  return axios.get<TAirportItemData[]>(`${url}/airport`, {
    method: 'get',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
  });
}
