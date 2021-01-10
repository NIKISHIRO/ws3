import {
  ILoginRequest, IProfileRequest,
  IRegisterRequest,
  TAirportFlightsQuery,
  TAirportFlightsResponse,
  TAirportItemData,
  TBookingRequest,
  TBookingResponse
} from "./api.types";
import axios from 'axios';


export const HOST = 'http://localhost:3001';
export const url = `${HOST}/api`;

const additionalHeaders = {
  "Content-type": "application/json; charset=UTF-8",
};

export const requestFlightsData = async (params: TAirportFlightsQuery) => {
  return axios.get<TAirportFlightsResponse>(`${url}/flight`, {
    headers: { ...additionalHeaders },
    params,
  });
};

export const requestAirportData = async () => {
  return axios.get<TAirportItemData[]>(`${url}/airport`, {
    headers: { ...additionalHeaders },
  });
};

export const requestBookingData = async (data: TBookingRequest) => {
  return axios.post<{ code: string }>(`${url}/booking`, data);
};

export const requestBookingsByCode = async (code: string) => {
  return axios.get<TBookingResponse>(`${url}/booking/${code}`, {
    headers: { ...additionalHeaders },
  });
};

export const requestRegister = async (params: IRegisterRequest) => {
  return axios.get(`${url}/register`, {
    headers: { ...additionalHeaders },
    params,
  });
};

export const requestLogin = async (params: ILoginRequest) => {
  return axios.get<{ token: string }>(`${url}/login`, {
    headers: { ...additionalHeaders },
    params,
  });
};

export const requestUser = (token: string) => {
  return axios.get<IProfileRequest>(`${url}/user`, {
    headers: {
      ...additionalHeaders,
      Authorization: `Bearer ${token}`
    },
  });
};