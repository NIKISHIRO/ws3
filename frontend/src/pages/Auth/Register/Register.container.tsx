import React from "react";
import Register from "./Register";
import {IRegisterForm, THandleChange, THandleSubmit} from "./Register.types";
import {requestRegister} from "../../../api/api";
import {IRegisterRequest} from "../../../api/api.types";
// @ts-ignore
import { NotificationContainer, NotificationManager } from 'react-notifications';


interface IState {
  form: IRegisterForm;
}

const RegisterContainer = () => {
  const [state, setState] = React.useState<IState>({
    form: {
      first_name: '',
      last_name: '',
      phone: '',
      document_number: '',
      password: '',
    },
  });
  const {
    form,
  } = state;

  const handleChange: THandleChange = (key, value) => {
    setState({
      ...state,
      form: {
        ...state.form,
        [key]: value,
      },
    });
  };

  const handleSubmit: THandleSubmit = async (params) => {
    try {
      await requestRegister(params);

      NotificationManager.success('Вы успешно зарегистрированы.');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
    } catch (e) {
      NotificationManager.error('Телефон уже занят.');
    }
  };

  return (
    <>
      <NotificationContainer />
      <Register
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default RegisterContainer;