export interface Result {
    confirmed: number;
    date: string;
    deaths: number;
    recovered: number;
}
  
export interface CovidData {
    count: number;
    result: Result[];
}

export interface Values {
    year: number;
    month: number;
}
