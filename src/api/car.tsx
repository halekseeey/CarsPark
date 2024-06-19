import { REVALIDATE_CACHE } from ".";

type Cars = {
  result: number;
  item?: CarItemExtended;
};

export type CarItemExtended = {
  id: number;
  brand: string;
  model: string;
  price: number;
  images: ImageType[];
  tarif: string[];
};
export type ImageType = {
  id: number;
  image: string;
};

export async function getCarItem(id: number): Promise<Cars> {
  const res = await fetch(
    `https://test.taxivoshod.ru/api/test/?w=catalog-car&id=${id}`,
    { next: { revalidate: REVALIDATE_CACHE } }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
