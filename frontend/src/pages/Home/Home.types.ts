import React from "react";

export type TFormProp = {
  value: string;
  label: string;
};

export type TForm = {
  fromWhere: TFormProp;
  toWhere: TFormProp;
  departing: TFormProp;
  returning: TFormProp;
  passengers: TFormProp;
};

export type THandleSubmit = () => void;

export type THandleInputChange = (key: keyof TForm) => (value: string) => void;
