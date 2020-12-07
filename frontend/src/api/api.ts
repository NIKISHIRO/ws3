import { TAirportItemData } from "./api.types";
import axios from 'axios';


export const HOST = 'http://localhost:3001';
export const url = `${HOST}/api`;

// Получить список аэропортов по введенном запросу.
export const getAirportData = async () => {
  return axios.get<TAirportItemData[]>(`${url}/airport`, {});
}
