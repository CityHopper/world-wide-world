import Map from "@/components/Map";
import { use } from "react";
import { ICountry } from "@/types/types";
// import 'server-only' // 이걸 import 하면 무조건 서버컴포넌트 역할
export default function Home() {
  const data: ICountry[] = use(fetchCountries());
  return (
    <main>
      <Map data={data} />
    </main>
  );
}

export async function fetchCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  return await response.json();
}
