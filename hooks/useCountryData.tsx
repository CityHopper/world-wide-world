import { useQuery, UseQueryResult, QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';

const queryClient = new QueryClient()

interface ICountry {
  name: string;
  population: number;
  capital: string;
  area: number;
}
interface ICountryDetail {
  countryName: string;
  population: number;
  capital: string;


  areaInSqKm: number;
}

const fetchCountries = async (): Promise<ICountry[]> => {
  const response = await axios.get('https://restcountries.com/v3/all');
  return response.data;
};

const fetchCountryDetail = async (countryCode: string): Promise<ICountryDetail> => {
  const response = await axios.get(`https://api.geonames.org/countryInfoJSON?country=${countryCode}&username=your-username`);
  return response.data.geonames[0];
};

export const useCountriesData = () => {
  return useQuery<ICountry[], Error>('countries', fetchCountries);
};

export const useCountryDetailData = (countryCode: string) => {
  return useQuery<ICountryDetail, Error>(['countryDetails', countryCode], () => fetchCountryDetail(countryCode), {
    enabled: countryCode !== '',
  });
};