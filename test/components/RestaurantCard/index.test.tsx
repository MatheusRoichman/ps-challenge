import RestaurantCard from "@/components/RestaurantCard";
import { act, render } from "@testing-library/react";

const restaurantMock: RestaurantModel = {
  id: "1",
  name: "Restaurant 1",
  image_url: "https://via.placeholder.com/300",
  rating: 4,
  review_count: 100,
  price: "$",
  categories: [
    {
      alias: "vegetarian",
      title: "Vegetarian",
    },
  ],
  alias: "restaurant-1",
  is_closed: false,
  coordinates: {
    latitude: 0,
    longitude: 0,
  },
  location: {
    display_address: ["Address 1", "Address 2"],
  },
  display_phone: "123456789",
  phone: "123456789",
  transactions: ["delivery"],
  url: "https://via.placeholder.com/300",
  distance: "1000",
};

describe("RestaurantCard", () => {
  it("should render the component", () => {
    const { container } = render(
      <RestaurantCard
        restaurant={restaurantMock}
      />
    );

    expect(container).toBeInTheDocument();
  });

  it("should have .restaurantCard__content, and inside it: .restaurantCard__image, .restaurantCard__infoWrapper with: .restaurantCard__title, .restaurantCard__divider, .restaurantCard__info, .restaurantCard__info__ratingBar, .restaurantCard__price, .restaurantCard__button", () => {
    const { container } = render(
      <RestaurantCard
        restaurant={restaurantMock}
      />
    );

    const requiredClasses = [
      ".restaurantCard__content",
      ".restaurantCard__image",
      ".restaurantCard__infoWrapper",
      ".restaurantCard__title",
      ".restaurantCard__divider",
      ".restaurantCard__info",
      ".restaurantCard__info__ratingBar",
      ".restaurantCard__price",
      ".restaurantCard__button",
    ];

    requiredClasses.forEach((requiredClass) => {
      expect(container.querySelector(requiredClass)).toBeInTheDocument();
    });
  });

  it("should show 'No price info' when restaurant.price is invalid", () => {
    const { container } = render(
      <RestaurantCard
        restaurant={{
          ...restaurantMock,
          price: "",
        }}
      />
    );

    const price = container.querySelector(".restaurantCard__price");

    expect(price).toHaveTextContent("No price info");
  });

  it("should have 3 divs '.material-icons with 'star' content, 1 div with 'star_half' and 1 with 'star_outline' when restaurant.rating is 3.5", () => {
    const { container } = render(
      <RestaurantCard
        restaurant={{
          ...restaurantMock,
          rating: 3.5,
        }}
      />
    );

    const stars = container.querySelectorAll(".restaurantCard__ratingBar__star");

    expect(stars.length).toBe(5);

    stars.forEach((star, index) => {
      const starIcon = star.querySelector(".material-icons");

      if (index < 3) {
        expect(starIcon).toHaveTextContent("star");
      } else if (index === 3) {
        expect(starIcon).toHaveTextContent("star_half");
      } else {
        expect(starIcon).toHaveTextContent("star_outline");
      }
    });
  });

  it("should have an image with alt text equal to restaurant.name", () => {
    const { container } = render(
      <RestaurantCard
        restaurant={restaurantMock}
      />
    );

    const image = container.querySelector("img");

    expect(image).toHaveAttribute("alt", restaurantMock.name);
  });

  it("should show 'No Name' when restaurant.name is invalid", () => {
    const { container } = render(
      <RestaurantCard
        restaurant={{
          ...restaurantMock,
          name: "",
        }}
      />
    );

    const title = container.querySelector(".restaurantCard__title");

    expect(title).toHaveTextContent("No Name");
  });

  it("should render 5 divs '.material-icons with 'star_outline' content when restaurant.rating is invalid", () => {
    const { container } = render(
      <RestaurantCard
        restaurant={{
          ...restaurantMock,
          // @ts-ignore
          rating: undefined, 
        }}
      />
    );

    const stars = container.querySelectorAll(".restaurantCard__ratingBar__star");

    expect(stars.length).toBe(5);

    stars.forEach((star) => {
      const starIcon = star.querySelector(".material-icons");

      expect(starIcon).toHaveTextContent("star_outline");
    });
  });

  it("should open the restaurant url in a new tab when clicked", () => {  
    const windowOpenSpy = jest.spyOn(window, "open");
    const { container } = render(
      <RestaurantCard
        restaurant={restaurantMock}
      />
    );

    const restaurantCard = container.querySelector(".restaurantCard");
    const restaurantUrl = restaurantMock.url;

    act(() => {
      restaurantCard?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(windowOpenSpy).toHaveBeenCalledWith(restaurantUrl, "_blank");
  });
});