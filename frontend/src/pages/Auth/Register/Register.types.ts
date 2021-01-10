import {IRegisterRequest} from "../../../api/api.types";

export interface IRegisterForm {
  first_name: string;
  last_name: string;
  phone: string;
  document_number: string;
  password: string;
}

export type THandleChange = (key: keyof IRegisterForm, value: string) => void;

export type THandleSubmit = (params: IRegisterRequest) => {};