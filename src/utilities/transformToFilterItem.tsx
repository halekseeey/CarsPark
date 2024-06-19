import { GetFilters } from "@/api";
import { SearchParamsItem } from "@/api/cars";

export type FilterItem = {
  value: { title: string; value: string; checked: boolean; key: string };
  children?: FilterItem[];
};

const checkFilter = (value: string, searchItem: string[]): boolean => {
  const item = searchItem.find((item) => item === value);
  if (item) {
    return true;
  }

  return false;
};

const transformToArray = (searchItem: SearchParamsItem) => {
  return searchItem
    ? Array.isArray(searchItem)
      ? searchItem
      : [searchItem]
    : [];
};

export function getFilterItems(checkedParams: {
  brand: SearchParamsItem;
  model: SearchParamsItem;
  tarif: SearchParamsItem;
  getRes: GetFilters;
}) {
  const getRes = checkedParams.getRes;
  const checkedBrands = transformToArray(checkedParams.brand);
  const checkedModels = transformToArray(checkedParams.model);
  const checkedTarifs = transformToArray(checkedParams.tarif);

  const brands = getRes.brands.values.map((brand, index) => {
    const checkBrand = checkFilter(brand, checkedBrands);
    const brandModels = getRes.models.values
      .filter((modelGroup) => modelGroup.brand === brand)
      .flatMap((modelGroup) =>
        modelGroup.models.map((model, modelIndex) => ({
          title: model,
          value: model,
          checked: checkBrand || checkFilter(model, checkedModels),
          key: `model-${index}-${modelIndex}`,
        }))
      );

    return {
      value: {
        title: brand,
        value: brand,
        checked: checkBrand,
        key: `brand-${index}`,
      },
      children: brandModels,
    };
  });

  const tarifs = Object.entries(getRes.tarif.values).map(
    ([key, value], index) => ({
      value: {
        title: value,
        value: key,
        checked: checkFilter(key, checkedTarifs),
        key: `tarif-${index}`,
      },
    })
  );

  return {
    filterItems: {
      brands,
      tarifs,
    },
    checked: {
      brands: checkedBrands,
      models: checkedModels,
      tarifs: checkedTarifs,
    },
  };
}
