import React from "react";

export interface IPassenger {
  first_name: string;
  last_name: string;
  birth_date: string;
  document_number: string;
}

export type THandleAddPassenger = (passengers: IPassenger[]) => void;

export type THandleDeletePassenger = (index: number, passengers: IPassenger[]) => void;

export type THandleChangePassenger = (
  index: number,
  passengers: IPassenger[],
  key: keyof IPassenger,
  value: string,
) => void;

export type THandleBookingSubmit = (passengers: IPassenger[]) => void;
