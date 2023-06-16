"use client";

import { useEffect, useState } from "react";
import { VectorMap } from "@south-paw/react-vector-maps";
import WorldLowRes from "@/public/world-low-res.json";
import "@/styles/map.css";
import "@/types/VectorMapsTypes";
import { ICountry } from "@/types/types";

export default function Map({ data }: { data: ICountry[] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [clicked, setClicked] = useState<ICountry | null>(null);
  const [tooltipId, setTooltipId] = useState<string>();
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const [tooltipY, setTooltipY] = useState<number>(0);
  const [tooltipX, setTooltipX] = useState<number>(0);
  const [tooltipData, setTooltipData] = useState<ICountry | null>(null);
  const onClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const id: string = (target.attributes as any)?.id.value;
    if (selected.includes(id)) {
      setSelected(selected.filter((sid) => sid !== id));
    } else {
      setSelected([...selected, id]);
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

  return (
    <div className={"map-container"}>
      <VectorMap
        {...WorldLowRes}
        checkedLayers={selected}
        layerProps={{ onClick, onMouseOver, onMouseMove, onMouseOut }}
      />
      {isTooltipVisible && (
        <div className="tooltip" style={{ top: tooltipY, left: tooltipX }}>
          <div>{tooltipData?.name?.common}</div>
        </div>
      )}
      <div>tooltipData: {tooltipData && JSON.stringify(tooltipData)}</div>
    </div>
  );
}
