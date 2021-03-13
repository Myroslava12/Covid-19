import React, { useState } from "react";
import { CovidData, Values } from "../../typings";
interface Context {
    data: CovidData, 
    setData: (data: CovidData) => void, 
    values: Values, 
    setValues: (values: Values) => void, 
    country: string, 
    setCountry: (country: string) => void
}

const initialContext: Context = {
  data: { count: 0, result: [] },
  setData: (_: CovidData) => null,
  values: { year: 0, month: 0 },
  setValues: (_: Values) => null,
  country: '',
  setCountry: (_: string) => null,
}

export const DataCovidContext = React.createContext<Context>(initialContext);

export const DataContextProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<CovidData>({ count: 0, result: [] });
  const [values, setValues] = useState({
    year: 0,
    month: 0,
  });
  const [country, setCountry] = useState<string>("");

  return (
    <DataCovidContext.Provider value={{ data, setData, values, setValues, country, setCountry }}>
      {children}
    </DataCovidContext.Provider>
  );
};
