"use client";

import { FC, useEffect } from "react";
import { CarItem } from "@/api";
import styles from "./styles.module.scss";
import CarCard from "@/components/CarCard";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

type Props = {
  cars: CarItem[];
  currentPage: number;
  totalPages: number;
};

const CarList: FC<Props> = ({ cars, currentPage, totalPages }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const updatePageQueryParam = () => {
      const newUrl = `${pathname}?${updateQueryStringParameter(
        searchParams.toString(),
        "page",
        currentPage.toString()
      )}`;
      router.push(newUrl);
    };

    if (!searchParams.toString().includes("page")) {
      updatePageQueryParam();
    } else {
      const params = new URLSearchParams(searchParams);
      if (params.get("page") !== currentPage.toString()) {
        updatePageQueryParam();
      }
    }
  }, [currentPage]);

  const updateQueryStringParameter = (
    searchParams: string,
    key: string,
    value: string
  ) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    return params.toString();
  };

  const onPageButtonClick = (page: number) => {
    router.push(
      `${pathname}?${updateQueryStringParameter(
        searchParams.toString(),
        "page",
        page.toString()
      )}`
    );
  };

  const onCardClick = (id: number) => {
    router.push(`/${id}`);
  };

  if (cars.length === 0) {
    return <div>Нет результатов по данному поиску</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.carList}>
        {cars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            onCardClick={() => onCardClick(car.id)}
          />
        ))}
      </div>
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => onPageButtonClick(page)}
              className={currentPage == page ? styles.activePage : ""}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default CarList;
