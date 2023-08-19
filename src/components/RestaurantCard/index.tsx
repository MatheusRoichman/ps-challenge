import { FC, useEffect, useRef } from "react";
import componentsStyles from "../../styles/components.module.scss";
import ImageWithFallback from "../lib/ImageWithFallback";
import styles from "./index.module.scss";
import useIntersectionObserver from "@/hooks/use-intersection-observer";

interface RestaurantCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick" | "className" | "ref"> {
  restaurant: RestaurantModel;
  onVisibilityChange?: (visible: boolean) => void;
}

const RestaurantCard: FC<RestaurantCardProps> = ({ restaurant, onVisibilityChange, ...props }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(elementRef, {});
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    onVisibilityChange?.(isVisible);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return (
    <div
      className={styles.restaurantCard}
      onClick={() => window.open(restaurant.url, "_blank")}
      ref={elementRef}
      {...props}
    >
      <div className={styles.restaurantCard__content}>
        <div className={styles.restaurantCard__image}>
          <ImageWithFallback
            src={restaurant.image_url}
            alt={restaurant.name ? restaurant.name : "No Name"}
            fill
          />
        </div>

        <div className={styles.restaurantCard__infoWrapper}>
          <h2 className={styles.restaurantCard__title}>{restaurant.name ? restaurant.name : "No Name"}</h2>
          <div
            className={`${componentsStyles.divider} ${styles.restaurantCard__divider}`}
          />
          <div className={`${styles.restaurantCard__info}`}>
            <div className={styles.restaurantCard__info__ratingBar}>
              {Array.from({ length: 5 }, (_, index) => (
                <div key={index} className="restaurantCard__ratingBar__star">
                  <span className={`material-icons`}>
                    {index < Math.floor(restaurant.rating ?? 0)
                      ? "star"
                      : index < restaurant.rating
                      ? "star_half"
                      : "star_outline"}
                  </span>
                </div>
              ))}
            </div>
            <div className={styles.restaurantCard__price}>
              {restaurant.price ? restaurant.price : "No price info"}
            </div>
          </div>
          <button className={styles.restaurantCard__button}>
            <p>View</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
