"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import buildQuery from "@/utilities/buildQuery";
import styles from "./styles.module.scss";

type FilterItemValue = {
  title: string;
  value: string;
  checked: boolean;
  key: string;
};

type BrandItem = {
  value: FilterItemValue;
  children: FilterItemValue[];
};

type TarifItem = {
  value: FilterItemValue;
};

type Props = {
  filters: {
    brands: BrandItem[];
    tarifs: TarifItem[];
  };
  checked: {
    brands: string[];
    models: string[];
    tarifs: string[];
  };
};

type Filters = "brands" | "models" | "tarifs";

const Filter: FC<Props> = ({ filters, checked }) => {
  const { brands, tarifs } = filters;
  const router = useRouter();
  const [selectedFilters, setSelectedFilters] = useState({
    brands: new Set(checked.brands),
    models: new Set(checked.models),
    tarifs: new Set(checked.tarifs),
  });

  const handleFilterChange = (
    filterItem: FilterItemValue,
    key: Filters,
    isChild: boolean = false
  ) => {
    const isChecked = !filterItem.checked;
    filterItem.checked = isChecked;

    setSelectedFilters((prevState) => {
      const updatedFilters = {
        ...prevState,
        [key]: new Set(prevState[key]),
      };

      if (isChecked) {
        updatedFilters[key].add(filterItem.value);
      } else {
        updatedFilters[key].delete(filterItem.value);
      }

      if (key === "brands" && !isChild) {
        const brand = brands.find((b) => b.value.key === filterItem.key);
        if (brand) {
          brand.children.forEach((child) => {
            child.checked = isChecked;
            if (isChecked) {
              updatedFilters.models.add(child.value);
            } else {
              updatedFilters.models.delete(child.value);
            }
          });
        }
      } else if (key === "models" && isChild) {
        const parentBrand = brands.find((b) =>
          b.children.some((c) => c.key === filterItem.key)
        );
        if (parentBrand) {
          const allChildrenChecked = parentBrand.children.every(
            (child) => child.checked
          );
          parentBrand.value.checked = allChildrenChecked;
          if (allChildrenChecked) {
            parentBrand.children.forEach((child) =>
              updatedFilters.models.delete(child.value)
            );
            updatedFilters.brands.add(parentBrand.value.value);
          } else {
            updatedFilters.brands.delete(parentBrand.value.value);
          }
        }
      }

      return updatedFilters;
    });
  };

  const renderOption = (
    filterItems: (BrandItem | TarifItem)[],
    key: Filters
  ) => {
    return filterItems.map((item) => {
      const valueItem = (item as BrandItem).value || (item as TarifItem).value;
      const children = (item as BrandItem).children;

      return (
        <div
          key={valueItem.key}
          className={key === "brands" ? styles.brandItem : ""}
        >
          <label>
            <input
              type="checkbox"
              value={valueItem.value}
              checked={valueItem.checked}
              onChange={() => handleFilterChange(valueItem, key)}
            />
            {valueItem.title}
          </label>
          {children && children.length > 0 && (
            <div className={styles.modelsList}>
              {children.map((child) => (
                <div key={child.key}>
                  <label>
                    <input
                      type="checkbox"
                      value={child.value}
                      checked={child.checked}
                      onChange={() => handleFilterChange(child, "models", true)}
                    />
                    {child.title}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    });
  };

  const applyFilters = () => {
    const brandsQuery = buildQuery("brand", Array.from(selectedFilters.brands));
    const modelsQuery = buildQuery("model", Array.from(selectedFilters.models));
    const tarifQuery = buildQuery("tarif", Array.from(selectedFilters.tarifs));
    router.push(`/?${brandsQuery}${modelsQuery}${tarifQuery}`);
  };

  const resetFilters = () => {
    router.push(`/`);
  };

  return (
    <div className={styles.sidebar}>
      <h2>Filters</h2>

      <div className={styles.filterSection}>
        <h3>Brands</h3>
        {renderOption(brands, "brands")}
      </div>

      <div className={styles.filterSection}>
        <h3>Tarifs</h3>
        {renderOption(tarifs, "tarifs")}
      </div>

      <div className={styles.filterSection}>
        <button onClick={applyFilters}>Apply Filters</button>
        <button onClick={resetFilters}>Reset Filters</button>
      </div>
    </div>
  );
};

export default Filter;
