"use client";

import { NewFundSheet } from "@/feature/funds/components/new-fund-sheet";
import { useMountedState } from "react-use";

export const SheetProvider = () => {
  const isMounted = useMountedState();
  if (!isMounted()) return null;
  return (
    <>
      <NewFundSheet />
    </>
  );
};
