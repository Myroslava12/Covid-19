import React, { FormEvent, useContext, useEffect, useState } from "react";
import { DataCovidContext } from "../../context";
import cx from "classnames";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { daysInMonth, daysToRenderFromFirstDay, daysToRenderToLastDayINMonth } from "../../utils/date";

const countries = [
  {
    value: "ITA",
    label: "Italy",
  },
  {
    value: "POL",
    label: "Poland",
  },
  {
    value: "UKR",
    label: "Ukraine",
  }
];

const months = [
  {
    value: 1,
    label: "Yanuary",
  },
  {
    value: 2, 
    label: "February",
  }, 
  {
    value: 3, 
    label: "March",
  },
  {
    value: 4, 
    label: "April",
  },
  {
    value: 5, 
    label: "May",
  },
  {
    value: 6, 
    label: "June",
  },
  {
    value: 7, 
    label: "July",
  },
  {
    value: 8, 
    label: "August",
  },
  {
    value: 9, 
    label: "September",
  },
  {
    value: 10, 
    label: "October",
  },
  {
    value: 11, 
    label: "November",
  },
  {
    value: 12, 
    label: "December",
  }
]

const Form = () => {
  const { setValues, values, country, setCountry } = useContext(DataCovidContext);
  const [error, setError] = useState(false);
  const [errorData, setErrorData] = useState(false);
  const history = useHistory();

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValues({
      ...values,
      [e.target.name]: Number(e.target.value),
    })
  }

  const valuesIsEmpty = (values.year === 0 && values.month === 0);

  const handleChangeCountry = (e: React.ChangeEvent<HTMLSelectElement>) => 
    setCountry(e.target.value);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (valuesIsEmpty && country === "") {
      setError(true);
      setErrorData(false);
    } else if (values.year === currentYear && values.month > currentMonth) {
        setErrorData(true);
        setError(false);
    } else { 
      setError(false);
      setErrorData(false);
      history.replace(ROUTES.COVID_INFO);
    }
  }

  useEffect(() => {
    if (!valuesIsEmpty) {
      const days = daysInMonth(values.year, values.month-1);
      daysToRenderFromFirstDay(values.year, values.month);
      daysToRenderToLastDayINMonth(values.year, values.month, days);
    }
  }, [values]);

  return (
    <main className="main-section">
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <h1 className="title">Covid-19 Form</h1>
          <label className="year-label label" htmlFor="year">
            <select 
              id="year"
              onChange={handleChange}
              value={values.year} 
              name="year"
              className={cx("year-select select", {
                "error": error
              })}
            >
              <option value={0} disabled className="disable-option">Select the year</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
            </select>
            <i className="fas fa-chevron-down"></i>
          </label>
          <label className="month-label label" htmlFor="month">
            <select
              onChange={handleChange}
              value={values.month} 
              name="month"
              className={cx("month-select select", {
                "error": error
              })}
            >
              <option value={0} disabled className="disable-option">Select a month</option>
              {months.map((month, i) => {
                return <option key={i} value={month.value}>{month.label}</option>
              })}
            </select>
            <i className="fas fa-chevron-down"></i>
          </label>
          <label className="country-label label" htmlFor="country">
            <select
              id="country"
              name="country"
              value={country}
              onChange={handleChangeCountry}
              className={cx("country-select select", {
                "error": error
              })}
            >
              <option value="" disabled className="disable-option">Choose a country</option>
              {countries.map((country, i) => {
                return <option key={i} value={country.value}>{country.label}</option>
              })}
            </select>
            <i className="fas fa-chevron-down"></i>
          </label>
          {errorData && <p className="alert-data">Data not found</p>}
          <button
            className="btn"
            type="submit"
          >Search</button>
        </form>
      </div>
    </main>
  )
}

export default Form;
