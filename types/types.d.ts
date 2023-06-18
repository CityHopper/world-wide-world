import { ReactNode } from "react";

export interface ICountry {
  altSpellings: string[];
  area: number;
  borders: string[];
  callingCodes: string[];
  capital: string;
  car: { signs: string[]; side: string };
  cca2?: string;
  cca3?: string;
  cca4?: string;
  cioc: string;
  currencies: { code: string; name: string; symbol: string }[];
  demonyms: { [key: string]: { f: string; m: string } };
  flags: { alt: string; png: string; svg: string };
  languages: { [key: string]: string };
  name: {
    common: string;
    official: string;
    nativeName: { [key: string]: { official: string; common: string } };
  };
  population: number;
  region: string;
  subregion: string;
  timezones: string[];
  topLevelDomain: string[];

  [key: string]: any;
}

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
