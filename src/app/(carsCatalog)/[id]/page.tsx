import { getCarItem, CarItemExtended } from "@/api";
import { FC } from "react";

import CarInfo from "@/components/CarInfo";

type Props = {
  params: {
    id: number;
  };
};

const Page: FC<Props> = async ({ params }) => {
  const car = await getCarItem(params.id);

  if (!car.item) {
    return <div>Car not found</div>;
  }

  const { brand, model, price, images, tarif } = car.item;

  return (
    <CarInfo
      brand={brand}
      model={model}
      price={price}
      images={images}
      tarif={tarif}
    ></CarInfo>
  );
};

export default Page;
