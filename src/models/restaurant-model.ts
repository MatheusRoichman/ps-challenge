interface RestaurantModel {
  id: string;
  alias: string;
  name: string;
  image_url: string;
  is_closed: boolean;
  url: string;
  review_count: number;
  categories: CategoryModel[];
  rating: number;
  coordinates: CoordinatesModel;
  transactions: string[];
  price?: string;
  location: LocationModel;
  phone: string;
  display_phone: string;
  distance?: string;
}