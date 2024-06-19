"use client";

import { ImageType } from "@/api";
import { FC } from "react";
import { useRouter } from "next/navigation";
import Slider from "@/components/Slider";

type Props = {
  brand: string;
  model: string;
  price: number;
  images: ImageType[];
  tarif: string[];
};

const CarInfo: FC<Props> = async ({ brand, model, price, images, tarif }) => {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.back()}>Back</button>
      <h1>
        {brand} {model}
      </h1>
      <p>Price: {price}</p>
      <p>Tarifs: {tarif.join(", ")}</p>
      <Slider images={images} />
    </div>
  );
};

export default CarInfo;
