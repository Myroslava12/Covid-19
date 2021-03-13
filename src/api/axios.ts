import axios from "axios";

export const fetchData = async (country: string, start: string, end: string) => {
  try {
    const response = await axios.get(`https://covidapi.info/api/v1/country/${country}/timeseries/${start}/${end}`);
    return response.data;
  } catch (err) {
    console.log(err)
  }
}
