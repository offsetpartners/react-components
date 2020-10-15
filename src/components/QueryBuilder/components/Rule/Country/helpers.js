import { CountryRegionData } from "./data";

export const parseCountryRegion = () => {
  try {
    return CountryRegionData.map((v) => {
      const children = v.regions.map((r) => {
        return {
          label: r.name,
          value: r.shortCode || r.name,
        };
      });
      return {
        children,
        label: v.name,
        value: v.shortCode,
      };
    });
  } catch (e) {}
  return [];
};
