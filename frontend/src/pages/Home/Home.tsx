import React from "react";
import { TAirportItemData } from "../../api/api.types";
import { StyleRules, TextField, WithStyles, withStyles, Button } from "@material-ui/core";
import { TForm, THandleInputChange, THandleSubmit } from "./Home.types";


interface IProps {
  form: TForm;
  airports: TAirportItemData[];
  onInputChange: THandleInputChange;
  onSubmit: THandleSubmit;
}

type TProps = IProps & WithStyles;

type TRenderInput = (key: keyof TForm, form: TForm) => JSX.Element;

const Home = (props: TProps) => {
  const {
    form,
    airports,
    classes,
    onSubmit,
  } = props;

  const renderItems = (airports: TAirportItemData[]) => {
    return airports.map(({ name, iata }, index) => (
      <div key={index}>{name} - {iata}</div>
    ));
  };

  const renderInput: TRenderInput = (key, form) => {
    const { value, label } = form[key];

    return (
      <TextField
        id="standard-basic"
        label={label}
        value={value}
        onChange={(e) => {
          console.log('e', e); // ------------------------------------------ ЕРРОР ИСПРАВИТЬ
          // props.onInputChange(key)(e);
        }}
      />
    );
  };

  const renderForm = (form: TForm) => {
    return (
      <form
        noValidate
        autoComplete="off"
        className={classes.form}
        onSubmit={onSubmit}
      >
        <div>{renderInput('fromWhere', form)}</div>
        <div>{renderInput('toWhere', form)}</div>
        <div>{renderInput('departing', form)}</div>
        <div>{renderInput('returning', form)}</div>
        <div>{renderInput('passengers', form)}</div>
        <Button type="submit">SUBMIT</Button>
      </form>
    );
  }

  return (
    <div className={classes.root}>
      <div>
        {renderForm(form)}
      </div>
      <div>
        {renderItems(airports)}
      </div>
    </div>
  )
}

const styles: StyleRules = {
  root: {
    border: '1px solid #c0c0c0',
    padding: '25px',
  },
  form: {
    display: 'inline-block',
    border: '1px solid #c0c0c0',
    padding: '25px',
  },
};

export default withStyles(styles)(Home);
