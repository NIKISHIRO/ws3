import React from "react";
import {Button, TextField} from "@material-ui/core";
import {ILoginForm, THandleChange, THandleSubmit} from "./Login.types";


interface IProps {
  form: ILoginForm;
  onChange: THandleChange;
  onSubmit: THandleSubmit;
}

type TRenderFormProp = (key: keyof ILoginForm, form: ILoginForm) => JSX.Element;

const formTranslate = {
  first_name: 'Имя',
  last_name: 'Фамилия',
  phone: 'Телефон',
  document_number: 'Номер документа',
  password: 'Пароль',
};

const Login = (props: IProps) => {
  const {
    form,
    onChange,
    onSubmit,
  } = props;

  const renderFormProp: TRenderFormProp = (key, form) => (
    <TextField
      value={form[key]}
      label={formTranslate[key]}
      onChange={({ currentTarget: { value } }) => onChange(key, value)}
    />
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(form);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {renderFormProp('phone', form)}<br />
        {renderFormProp('password', form)}<br />
        <Button
          type='submit'
          color="primary"
        >
          Авторизация
        </Button>
      </form>
    </div>
  );
};

export default Login;