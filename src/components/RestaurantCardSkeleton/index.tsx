import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const RestaurantCardSkeleton: FC = () => {
  return (
    <>
      <Skeleton height={200} />
    </>
  )
}

export default RestaurantCardSkeleton;
