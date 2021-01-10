import React from "react";
import {IRegisterForm, THandleChange, THandleSubmit} from "./Register.types";
import {Button, TextField} from "@material-ui/core";


interface IProps {
  form: IRegisterForm;
  onChange: THandleChange;
  onSubmit: THandleSubmit;
}

type TRenderFormProp = (key: keyof IRegisterForm, form: IRegisterForm) => JSX.Element;

const formTranslate = {
  first_name: 'Имя',
  last_name: 'Фамилия',
  phone: 'Телефон',
  document_number: 'Номер документа',
  password: 'Пароль',
};

const Register = (props: IProps) => {
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
        {renderFormProp('first_name', form)}<br />
        {renderFormProp('last_name', form)}<br />
        {renderFormProp('phone', form)}<br />
        {renderFormProp('password', form)}<br />
        {renderFormProp('document_number', form)}<br />
        <Button
          type='submit'
          color="primary"
        >
          Регистрация
        </Button>
      </form>
    </div>
  );
};

export default Register;