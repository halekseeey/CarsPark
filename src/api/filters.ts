import { REVALIDATE_CACHE } from ".";
import { SearchParamsItem } from "./cars";

export type GetFilters = {
  result: number;
  brands: {
    name: string;
    code: "brand";
    values: string[];
  };
  models: {
    name: string;
    type: "model";
    values: Models[];
  };
  tarif: {
    name: string;
    type: "tarif";
    values: Record<string, string>;
  };
};

type Models = {
  brand: string;
  models: string[];
};

export async function getFilters(): Promise<GetFilters> {
  const res = await fetch(
    "https://test.taxivoshod.ru/api/test/?w=catalog-filter",
    { next: { revalidate: REVALIDATE_CACHE } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
