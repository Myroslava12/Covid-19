import React, { useContext, useEffect, useState } from "react";
import { DataCovidContext } from "../../context";
import { LineChart, XAxis, CartesianGrid, Tooltip, Legend, Line, YAxis } from "recharts";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import cx from "classnames";
import { fetchData } from "../../api/axios";
import { daysInMonth, daysToRenderFromFirstDay, daysToRenderToLastDayINMonth } from "../../utils/date";
import Loader from "react-loader-spinner";

const FIRST_YEAR_OF_COVID_19 = 2019;
const LAST_MONTH = 12; 

const CovidInfo = () => {
  const { data, setData, values, setValues, country } = useContext(DataCovidContext);
  const [loading, setLoading] = useState(false);
  const { month, year } = values;
  const [objectIsEmpty, setObjectIsEmpry] = useState(false);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  
  const getPrevData = () => {
    setValues({
      month: month === 1 ? LAST_MONTH : month - 1,
      year: month === 1 ? year - 1 : year,
    });
  }

  const getNextData = () => {
    setValues({
      month: month === LAST_MONTH ? 1 : month + 1,
      year: month === LAST_MONTH ? year + 1 : year,
    })
  }
  
  useEffect(() => {
    setLoading(true);
    async function getFetchingData() {
      const days = daysInMonth(values.year, values.month - 1);
      const dayStart = daysToRenderFromFirstDay(values.year, values.month);
      const dayEnd = daysToRenderToLastDayINMonth(values.year, values.month, days);
      const covidData = await fetchData(country, dayStart, dayEnd);
      if (Object.keys(covidData).length === 0) {
        setObjectIsEmpry(true);
      } else {
        setData(covidData);
        setObjectIsEmpry(false);
      }
    }
    getFetchingData();
    setLoading(false);
  }, [values]);
  
  const isNextBtnDisabled = (values.year === currentYear && values.month === currentMonth + 1);
  const isPrevBtnDisabled = (values.year === FIRST_YEAR_OF_COVID_19+1 && values.month === 1);

  return (
    <section className="covid-section">
      <div className="container">
        <Link to={ROUTES.FORM} className="link-back">Back to Form</Link>
        {objectIsEmpty ? 
          <h1 className="message">Data not found. Go back to the Form Page and select year and month</h1> : 
          <div className="chart-box">
          <LineChart width={1700} height={600} data={data.result}>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid />
            <Tooltip />
            <Legend  />
            <Line
              type="monotone"
              dataKey="confirmed"
              stroke="red"
              yAxisId={0}
              strokeWidth={2}
              legendType="circle"
            />
            <Line type="monotone" strokeWidth={2} dataKey="deaths" stroke="#ff7300" legendType="circle" yAxisId={0} />
            <Line type="monotone" strokeWidth={2} dataKey="recovered" stroke="green" legendType="circle" yAxisId={0} />
          </LineChart>
        </div>}
        {loading && <div className="loading">
          <Loader
            type="Puff"
            color="#232CC6"
            height={100}
            width={100}
            timeout={3000}
          />
        </div>}
        <div className="btn-box">
          <button
            disabled={isPrevBtnDisabled} 
            onClick={getPrevData} 
            className={cx("chart-btn btn-prev", {
              "disabled": isPrevBtnDisabled,
            })}
          >
            Prev Month
          </button>
          {(isPrevBtnDisabled || isNextBtnDisabled) && <h2 className="title-error">Data not found</h2>}
          <button 
            onClick={getNextData}
            disabled={isNextBtnDisabled}
            className={cx("chart-btn btn-prev", {
              "disabled": isNextBtnDisabled,
            })}
          >
            Next Month
          </button>
        </div>
      </div>
    </section>
  )
}


export default CovidInfo;
