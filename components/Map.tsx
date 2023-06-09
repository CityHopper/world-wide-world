"use client";
import { VectorMap } from "@south-paw/react-vector-maps";
import WorldLowRes from "@/public/world-low-res.json";
import { useCountriesData, useCountryDetailData } from "@/hooks/useCountryData";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
export default function Map() {
  const countriesQuery = useCountriesData();

  //   const countryDetailQuery = useCountryDetailData(countryCode);

  return <VectorMap {...WorldLowRes} />;
}
