export const daysInMonth = (year: number, month: number) =>
  32 - new Date(year, month, 32).getDate();

export const daysToRenderFromFirstDay = (year: number, month: number) => 
  month < 10 ? `${year}-0${month}-01`: `${year}-${month}-01`;

export const daysToRenderToLastDayINMonth = (year: number, month: number, days: number) => 
  month < 10 ? `${year}-0${month}-${days}` : `${year}-${month}-${days}`;
  