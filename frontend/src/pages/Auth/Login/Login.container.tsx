import React from "react";
import Login from "./Login";
import { requestLogin } from "../../../api/api";
import { ILoginForm, THandleChange, THandleSubmit } from "./Login.types";
// @ts-ignore
import { NotificationContainer, NotificationManager } from 'react-notifications';


interface IState {
  form: ILoginForm;
}

const LoginContainer = () => {
  const [state, setState] = React.useState<IState>({
    form: {
      phone: '',
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
      const response = await requestLogin(params);
      const { token } = response.data;

      if (!token) return;

      localStorage.setItem('token', token);

      window.location.href = '/profile';
    } catch (e) {
      NotificationManager.error(`Не верный телефон или пароль`);
    }
  };

  return (
    <>
      <NotificationContainer />
      <Login
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default LoginContainer;