import React from "react";
import {TAirportFlightsQuery} from "../../api/api.types";


export interface IAirportSelectFormat {
  value: string;
  label: string;
}

export interface IAirportSelect {
  fromWhere: IAiportSelectData;
  toWhere: IAiportSelectData;
}

export interface IAiportSelectData {
  options: IAirportSelectFormat[];
  value: IAirportSelectValue;
  placeholder: string;
}

export type TFormProp = {
  value: string;
  label: string;
  hasDisableButton: boolean;
  checkboxValue: boolean;
};

export type TForm = {
  departing: TFormProp;
  returning: TFormProp;
  passengers: TFormProp;
};

export type THandleSubmit = (e: React.FormEvent, value: TAirportFlightsQuery) => void;

export type THandleInputChangeFactory = (type: 'number' | 'text', key: keyof TForm) => (value: string) => void;

export type IAirportSelectValue = IAirportSelectFormat | null;

export type THandleSelect = (key: keyof IAirportSelect, value: IAirportSelectValue) => void;

export type THandleCheckboxChange = (key: keyof TForm, value: boolean) => void;

export type TModalClose = () => void;