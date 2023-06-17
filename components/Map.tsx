"use client";

import { useEffect, useState } from "react";
import { VectorMap } from "@south-paw/react-vector-maps";
import WorldLowRes from "@/public/world-low-res.json";
import "@/styles/map.css";
import "@/types/VectorMapsTypes";
import { ICountry } from "@/types/types";
import { Modal } from "@/components/Modal";

export default function Map({ data }: { data: ICountry[] }) {
  const [allSelected, setAllSelected] = useState<string[]>([]);
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

  const onMouseOver = (e: MouseEvent) => {
    const id: string = ((e.target as HTMLElement).attributes as any)?.id.value;
    setTooltipId(id);
    setIsTooltipVisible(true);
  };

  const onMouseMove = (e: MouseEvent) => {
    setTooltipY(e.clientY - 20);
    setTooltipX(e.clientX - 10);
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
        className={"map"}
        // checkedLayers={allSelected}
        layerProps={{ onClick, onMouseOver, onMouseMove, onMouseOut }}
      />
      {isTooltipVisible && (
        <div className="tooltip" style={{ top: tooltipY, left: tooltipX }}>
          <div>{tooltipData?.name?.common}</div>
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>
          {modalCountry?.flag} {modalCountry?.name?.official}
        </h2>
        <table>
          <tr>
            <th></th>
            <td></td>
          </tr>
        </table>
      </Modal>
    </section>
  );
}
