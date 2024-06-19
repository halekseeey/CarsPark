import { CarItemExtended, ImageType, getCarItem } from "./car";
import { getCars, CarItem } from "./cars";
import { GetFilters, getFilters } from "./filters";

const REVALIDATE_CACHE = 3600;

export { REVALIDATE_CACHE, getFilters, getCars, getCarItem };
export type { GetFilters, CarItem, CarItemExtended, ImageType };
