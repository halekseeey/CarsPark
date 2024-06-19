import { REVALIDATE_CACHE } from ".";

type Cars = {
  result: number;
  page: number;
  pages: number;
  per_page: number;
  list: CarItem[];
};

export type CarItem = {
  id: number;
  brand: string;
  model: string;
  number: string;
  price: number;
  image: string;
  tarif: string[];
};

export type SearchParamsItem = string | string[] | undefined;

const addQuery = (url: string, key: string, value: string): string => {
  return url + `&${key}[]=${value}`;
};

const buildUrl = (
  baseUrl: string,
  key: string,
  value: SearchParamsItem
): string => {
  let url = baseUrl;
  if (value) {
    if (typeof value === "string") {
      url = addQuery(url, key, value);
    } else {
      value.forEach((item) => {
        url = addQuery(url, key, item);
      });
    }
  }
  return url;
};

export async function getCars(
  brands: SearchParamsItem,
  models: SearchParamsItem,
  tarif: SearchParamsItem,
  page: SearchParamsItem
): Promise<Cars> {
  let url = "https://test.taxivoshod.ru/api/test/?w=catalog-cars";
  url = buildUrl(url, "brand", brands);
  url = buildUrl(url, "model", models);
  url = buildUrl(url, "tarif", tarif);
  if (page && typeof page === "string") {
    url += `&page=${page}`;
  }
  console.log(url);
  const res = await fetch(url, { next: { revalidate: REVALIDATE_CACHE } });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
