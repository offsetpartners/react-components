import { useEffect } from "react";

// MARK: Custom Hooks
export const useSelectRef = (breakpoint, selectRef, setSelectWidth) => {
  return useEffect(
    function () {
      if (selectRef.current && selectRef.current.clientWidth) {
        const width = selectRef.current.clientWidth;
        setSelectWidth(width);
      }
    },
    [breakpoint, selectRef.current]
  );
};