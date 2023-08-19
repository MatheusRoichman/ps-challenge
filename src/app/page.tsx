"use client";

import CategoryTab from "@/components/CategoryTab";
import RestaurantCard from "@/components/RestaurantCard";
import RestaurantCardSkeleton from "@/components/RestaurantCardSkeleton";
import ThreeDotsLoading from "@/components/lib/ThreeDotsLoading";
import useWindowSize from "@/hooks/use-window-size";
import apiRestClient from "@/services/rest-client/api-rest-client";
import componentsStyles from "@/styles/components.module.scss";
import variables from "@/styles/variables.module.scss";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./page.module.scss";

export default function Home() {
  const [page, setPage] = useState(0);
  const limit: number = 15;
  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState<RestaurantModel[]>([]);
  const [lastResponse, setLastResponse] = useState<RestaurantModel[] | null>(
    null
  );
  const { width } = useWindowSize();
  const isSmallOrMediumScreen: boolean =
    (width ?? 0) < Number(variables.breakpointLg.replace("px", ""));
  const lengthSubtractorToUpdatePage: number = isSmallOrMediumScreen ? 7 : 3;
  const categories: CategoryModel[] = [
    {
      alias: "foodtrucks",
      title: "Food Trucks",
    },
    {
      alias: "vegetarian",
      title: "Vegetarian",
    },
    {
      alias: "burgers",
      title: "Burgers",
    },
  ];
  const [selectedCategory, setSelectedCategory] = useState<CategoryModel>({
    alias: "vegetarian",
    title: "Vegetarian",
  });

  useEffect(() => {
    setLoading(true);

    apiRestClient
      .get<{
        businesses: RestaurantModel[];
      }>(`/businesses/search`, {
        params: {
          location: "San Jose, CA 95127",
          term: "restaurants",
          limit: limit,
          offset: page * limit,
          categories: selectedCategory?.alias,
        },
      })
      .then((response) => {
        setLastResponse(response.data.businesses);
        setRestaurants((prev) => [...prev, ...response.data.businesses]);
      })
      .catch((error) => {
        toast.error(
          (
            error as AxiosError<{
              error: {
                code: string;
                description: string;
              };
            }>
          ).response?.data?.error?.description ?? "An error occurred"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, selectedCategory]);

  useEffect(() => {
    setPage(0);
    setRestaurants([]);
  }, [selectedCategory]);

  return (
    <div>
      <h1 className={componentsStyles.title}>Restaurants</h1>
      <div className={`${styles.categoriesWrapper}`}>
        {categories.map((category) => (
          <CategoryTab
            key={`category_tab_${category.alias}`}
            category={category}
            selected={category.alias === selectedCategory.alias}
            onClick={() => setSelectedCategory(category)}
          />
        ))}
      </div>

      <div className={styles.restaurantsWrapper}>
        <div className={`${componentsStyles.grid}`}>
          {!restaurants.length && loading ? (
            <>
              {Array.from({ length: limit }, (_, index) => (
                <RestaurantCardSkeleton
                  key={`restaurant_card_skeleton_${index}`}
                />
              ))}
            </>
          ) : (
            restaurants.map((restaurant, index) => (
              <>
                <RestaurantCard
                  key={`restaurant_card_${restaurant.id}`}
                  restaurant={restaurant}
                  onVisibilityChange={(isVisible) => {
                    if (
                      isVisible &&
                      index ===
                        restaurants.length - lengthSubtractorToUpdatePage
                    ) {
                      setPage((prev) => prev + 1);
                    }
                  }}
                />
                <div
                  className={`${componentsStyles.divider} ${styles.categoriesWrapper__itemDivider}`}
                ></div>
              </>
            ))
          )}
        </div>
      </div>
      <div className={styles.bottomInfo}>
        {loading ? (
          <ThreeDotsLoading />
        ) : lastResponse && lastResponse.length === 0 ? (
          <div className={styles.noResultsWrapper}>
            <p className={styles.noResultsWrapper__text}>End of results</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
