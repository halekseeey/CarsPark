import { FC } from "react";
import { CarItem } from "@/api";
import styles from "./styles.module.scss";

type Props = {
  car: CarItem;
  onCardClick: () => void;
};

const CarCard: FC<Props> = ({ car, onCardClick }) => {
  return (
    <a className={styles.carCard} onClick={onCardClick}>
      <img src={car.image} alt={`${car.brand} ${car.model}`} />
      <div className={styles.carDetails}>
        <h3>
          {car.brand} {car.model}
        </h3>
        <p>Number: {car.number}</p>
        <p>Price: {car.price}</p>
        <p>Tarif: {car.tarif.join(", ")}</p>
      </div>
    </a>
  );
};

export default CarCard;
