"use client";

import { store } from "@/lib/store";
import { Provider } from "react-redux";
import { useRef } from "react";

export default function StoreProvider({ children }) {
  const storeRef = useRef(null);
  if (!storeRef.current) {
    storeRef.current = store;
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
