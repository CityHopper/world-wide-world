import React from "react";

interface VectorMapLayer {
  /** Unique ID of each layer. */
  id: string;
  /** Name of the layer. */
  name: string;
  /** SVG path for the layer. */
  d: string;
}

declare module "@south-paw/react-vector-maps" {
  interface VectorMapProps {
    children?: React.ReactNode;
    /** Unique ID of the SVG element. */
    id: string;
    /** Name of the map. */
    name: string;
    /** View box for the map. */
    viewBox: string;
    /** Layers that represent the regions of the map. */
    layers: VectorMapLayer[];
    /** Tab index for each layer. Set to '-1' to disable layer focusing. */
    tabIndex?: number;
    /** Props to spread onto each layer. */
    layerProps?: any;
    /** Layer IDs to 'select' with the 'aria-checked' attribute. */
    checkedLayers?: string[];
    /** Layer IDs to 'select' with the 'aria-current' attribute. */
    currentLayers?: string[];
  }
}

export {};
