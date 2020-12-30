import { ILoginRequest } from "../../../../api/api.types";

export interface ILoginForm {
  phone: string;
  password: string;
}

export type THandleChange = (key: keyof ILoginForm, value: string) => void;

export type THandleSubmit = (params: ILoginRequest) => {};