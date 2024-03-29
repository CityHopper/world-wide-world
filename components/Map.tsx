"use client";

import { MouseEvent, useEffect, useState } from "react";
import { VectorMap } from "@south-paw/react-vector-maps";
import WorldLowRes from "@/public/world-low-res.json";
import "@/styles/map.css";
import { ICountry } from "@/types";
import { Modal } from "@/components/Modal";
import { capitalizeFirst } from "@/lib/functions";
import Image from "next/image";
import Link from "next/link";
import GoogleMapsLogo from "@/public/Google_Maps_Logo.png";
import OSMLogo from "@/public/osm_logo.png";

export default function Map({ data }: { data: ICountry[] }) {
  // const [allSelected, setAllSelected] = useState<string[]>([]);
  const [tooltipId, setTooltipId] = useState<string>();
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const [tooltipY, setTooltipY] = useState<number>(0);
  const [tooltipX, setTooltipX] = useState<number>(0);
  const [tooltipData, setTooltipData] = useState<ICountry | null>(null);
  const [modalCountry, setModalCountry] = useState<ICountry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const onClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const id: string = (target.attributes as any)?.id.value;
    // if (allSelected.includes(id)) {
    //   setAllSelected(allSelected.filter((sid) => sid !== id));
    // } else {
    //   setAllSelected([...allSelected, id]);
    // }
    if (data && id) {
      const matched = data.filter((d) => d.cca2?.toLowerCase() === id)[0];
      setModalCountry(matched || null);
      setIsModalOpen(true);
    }
  };

  const onMouseOver = (event: MouseEvent) => {
    const id: string = ((event.target as HTMLElement).attributes as any)?.id
      .value;
    setTooltipId(id);
    setIsTooltipVisible(true);
  };

  const onMouseMove = (event: MouseEvent) => {
    setTooltipY(event.clientY - 20);
    setTooltipX(event.clientX - 10);
  };

  const onMouseOut = () => {
    setTooltipId("");
    setIsTooltipVisible(false);
  };

  useEffect(() => {
    if (data && tooltipId) {
      const matched = data.filter(
        (d) => d.cca2?.toLowerCase() === tooltipId
      )[0];
      setTooltipData(matched || null);
    }
  }, [data, tooltipId]);

  useEffect(() => {
    console.log("modalCountry", modalCountry);
  }, [modalCountry]);

  return (
    <section className={"map-container h-screen w-screen"}>
      <VectorMap
        {...WorldLowRes}
        // checkedLayers={allSelected}
        layerProps={{ onClick, onMouseOver, onMouseMove, onMouseOut }}
      />
      {isTooltipVisible && (
        <div className="tooltip" style={{ top: tooltipY, left: tooltipX }}>
          <div>{tooltipData?.name?.common}</div>
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {(modalCountry as ICountry) ? (
          <article>
            <section className={"sticky top-0 bg-white pb-4 bg-opacity-80"}>
              <h2 className={"inline-block text-2xl"}>
                {modalCountry?.flag} {modalCountry?.name?.common}&nbsp;
              </h2>
              <span className={"inline-block text-l text-red"}>
                ({modalCountry?.name?.official})
              </span>
              {modalCountry?.name?.nativeName &&
                Object.values(modalCountry?.name?.nativeName)?.map((n, nId) => (
                  <span
                    key={nId}
                    className={"block text-gray-400 text-xs pl-8"}
                  >
                    {n?.common} ({n?.official}) &nbsp;
                  </span>
                ))}
            </section>
            <section
              className={
                "overflow-x-hidden overflow-y-auto shadow-md rounded-lg"
              }
            >
              <table>
                <tbody>
                  <tr>
                    <th>Region</th>
                    <td>
                      {modalCountry?.region} ({modalCountry?.subregion})
                    </td>
                  </tr>
                  <tr>
                    <th>Continents</th>
                    <td>
                      {modalCountry?.continents.map((c, cId) => (
                        <span key={cId}>{cId > 0 ? `, ${c}` : `${c}`}</span>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <th>Area</th>
                    <td>{modalCountry?.area.toLocaleString()} km²</td>
                  </tr>
                  <tr>
                    <th>Population</th>
                    <td>{modalCountry?.population.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <th>Capital</th>
                    <td>{modalCountry?.capital || "-"}</td>
                  </tr>
                  <tr>
                    <th>Languages</th>
                    <td>
                      {Object.values(modalCountry?.languages!)?.map(
                        (l, lId) => (
                          <span key={lId}>{lId > 0 ? `, ${l}` : `${l}`}</span>
                        )
                      ) || "-"}
                    </td>
                  </tr>
                  <tr>
                    <th>Demonyms</th>
                    <td>
                      <div className={"grid grid-cols-4 gap-1"}>
                        <span className={"badge bg-gray-100 col-span-1"}>
                          Female
                        </span>
                        <div className={"col-span-3"}>
                          {modalCountry?.demonyms?.eng?.f || "-"}
                        </div>
                        <span className={"badge bg-gray-100 col-span-1"}>
                          Male
                        </span>{" "}
                        <div className={"col-span-3"}>
                          {modalCountry?.demonyms?.eng?.m || "-"}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>Currencies</th>
                    <td>
                      {modalCountry?.currencies
                        ? Object.values(modalCountry?.currencies!).map(
                            (l, lId) => (
                              <span key={lId}>
                                {lId > 0
                                  ? `, ${l?.name} (${l?.symbol})`
                                  : `${l?.name} (${l?.symbol})`}
                              </span>
                            )
                          )
                        : "-"}
                    </td>
                  </tr>
                  <tr>
                    <th>Timezones</th>
                    <td>
                      {modalCountry?.timezones.map((c, cId) => (
                        <span key={cId}>{cId > 0 ? `, ${c}` : `${c}`}</span>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <th>Gini coefficient</th>
                    <td>
                      {modalCountry?.gini
                        ? Object.entries(modalCountry?.gini).map((g, gId) => (
                            <div key={gId}>
                              {g[1]} ({g[0]})
                            </div>
                          ))
                        : "-"}
                    </td>
                  </tr>
                  <tr>
                    <th>Member of UN</th>
                    <td>
                      {modalCountry?.unMember ? "Member" : "Not a Member"}
                    </td>
                  </tr>
                  <tr>
                    <th>Start Of Week</th>
                    <td>{capitalizeFirst(modalCountry?.startOfWeek) || ""}</td>
                  </tr>
                  <tr>
                    <th>Driving on</th>
                    <td>{capitalizeFirst(modalCountry?.car?.side) || ""}</td>
                  </tr>
                  <tr>
                    <th>Flag</th>
                    <td>
                      <div className={"relative min-h-[120px] w-full"}>
                        <Image
                          className={"object-contain object-left"}
                          src={modalCountry?.flags?.png || ""}
                          alt={modalCountry?.flags?.alt || "Flag"}
                          fill={true}
                          sizes={"100px"}
                          onError={() => alert("Image Error")}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>View on</th>
                    <td className={"flex items-center justify-around"}>
                      <Link
                        href={modalCountry?.maps?.googleMaps || ""}
                        target={"_blank"}
                      >
                        <Image
                          src={GoogleMapsLogo}
                          alt={`View ${modalCountry?.name.common} on OpenStreetMap`}
                          width={100}
                        />
                      </Link>
                      <Link
                        href={modalCountry?.maps?.openStreetMap || ""}
                        target={"_blank"}
                      >
                        <Image
                          src={OSMLogo}
                          alt={`View ${modalCountry?.name.common} on OpenStreetMap`}
                          width={60}
                        />
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          </article>
        ) : (
          <article className={"flex justify-center items-center"}>
            Try again later
          </article>
        )}
      </Modal>
    </section>
  );
}
