import { act, render, screen } from "@testing-library/react";
import Home from "../../src/app/page";

describe("HomePage", () => {
  it("should render the heading", () => {
    const textToFind = "Restaurants";

    render(<Home />);
    const heading = screen.getByText(textToFind);

    expect(heading).toBeInTheDocument();
  });

  it("should render the categories", () => {
    const textsToFind = ["Food Trucks", "Vegetarian", "Burgers"];

    render(<Home />);
    textsToFind.forEach((text) => {
      const category = screen.getByText(text);
      expect(category).toBeInTheDocument();
    });
  });

  it("should render 15 skeletons at first", () => {
    const { container } = render(<Home />);

    const skeletons = container.querySelectorAll(".react-loading-skeleton");

    expect(skeletons.length).toBe(15);
  });

  it("should have a .categoryTab--selected class when a category is selected", () => {
    const { container } = render(<Home />);

    const category = container.querySelector(".categoryTab");
    
    act(() => {
      category?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(category).toHaveClass("categoryTab--selected");
  });
});
