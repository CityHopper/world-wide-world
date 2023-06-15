"use client";
import "@/lib/VectorMapsTypes";
import { VectorMap } from "@south-paw/react-vector-maps";
import WorldLowRes from "@/public/world-low-res.json";
import "@/styles/map.css";
import { useEffect, useState } from "react";

export default function Map() {
  const [selected, setSelected] = useState<string[]>([]);
  const [tooltipName, setTooltipName] = useState<string>();
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const [tooltipY, setTooltipY] = useState<number>(0);
  const [tooltipX, setTooltipX] = useState<number>(0);
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
    const target = e.target as HTMLElement;
    const name: string = (target.attributes as any)?.name.value;
    setTooltipName(name);
    setIsTooltipVisible(true);
  };

  const onMouseMove = (e: MouseEvent) => {
    setTooltipY(e.clientY - 20);
    setTooltipX(e.clientX - 10);
  };

  const onMouseOut = () => {
    setTooltipName("");
    setIsTooltipVisible(false);
  };

  useEffect(() => {
    console.log("selected", selected);
  }, [selected]);
  return (
    <div className={"map-container"}>
      <VectorMap
        {...WorldLowRes}
        checkedLayers={selected}
        layerProps={{ onClick, onMouseOver, onMouseMove, onMouseOut }}
      />
      {isTooltipVisible && (
        <div className="tooltip" style={{ top: tooltipY, left: tooltipX }}>
          {tooltipName}
        </div>
      )}
    </div>
  );
}
