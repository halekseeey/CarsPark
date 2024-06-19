import { getCars, getFilters } from "@/api";
import { SearchParamsItem } from "@/api/cars";
import CarList from "@/components/CarList";
import Filter from "@/components/Filter";

import { getFilterItems } from "@/utilities/transformToFilterItem";

import { FC } from "react";
import styles from "./styles.module.scss";

type Props = {
  searchParams: {
    brand: SearchParamsItem;
    model: SearchParamsItem;
    tarif: SearchParamsItem;
    page: SearchParamsItem;
  };
};

const Page: FC<Props> = async ({ searchParams }) => {
  const { brand, model, tarif, page } = searchParams;
  const filters = await getFilters();
  const { filterItems, checked } = getFilterItems({
    brand,
    model,
    tarif,
    getRes: filters,
  });

  const cars = await getCars(brand, model, tarif, page);
  console.log(cars);

  return (
    <div className={styles.container}>
      <Filter filters={filterItems} checked={checked}></Filter>
      <CarList
        cars={cars.list}
        currentPage={cars.page}
        totalPages={cars.pages}
      ></CarList>
    </div>
  );
};

export default Page;
