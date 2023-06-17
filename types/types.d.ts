import { ReactNode } from "react";

export interface ICountry {
  altSpellings: string[];
  area: number;
  cca2?: string;
  cca3?: string;
  cca4?: string;
  name: {
    common: string;
    official: string;
    nativeName: { [key: string]: { official: string; common: string } };
  };
  population: number;

  capital: string;
  region: string;
  subregion: string;
  timezones: string[];
  currencies: { code: string; name: string; symbol: string }[];
  languages: { [key: string]: string };
  flags: string[];
  borders: string[];
  topLevelDomain: string[];
  callingCodes: string[];
  cioc: string;

  [key: string]: any;
}

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
