import React from "react";
import Home from "./Home";
import { getAirportData } from "../../api/api";
import { TAirportItemData } from "../../api/api.types";
import {TForm, THandleInputChange, THandleSubmit} from "./Home.types";


interface IState {
  airportData: TAirportItemData[];
  form: TForm;
}

const HomeContainer = () => {
  const [state, setState] = React.useState<IState>({
    airportData: [],
    form: {
      fromWhere: { value: '', label: 'Откуда' },
      toWhere: { value: '', label: 'Куда' },
      departing: { value: '', label: 'Туда' },
      returning: { value: '', label: 'Обратно' },
      passengers: { value: '', label: 'Количество пассажиров' },
    },
  });

  const {
    airportData,
  } = state;

  React.useEffect(() => {
    setAirportData();
  }, []);

  const setAirportData = async () => {
    const response = await getAirportData();

    setState({
      ...state,
      airportData: response.data,
    });
  };

  const handleInputChange: THandleInputChange = (key) => (e) => {
    state.form[key].value = e.currentTarget.value;
  };

  const handleSubmit: THandleSubmit = () => {

  };

  return (
    <Home
      form={state.form}
      airports={airportData}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
    />
  )
}

export default HomeContainer;
