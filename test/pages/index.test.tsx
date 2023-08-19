import Home from "../../src/app/page";
import { render, screen } from "@testing-library/react";

describe("HomePage", () => {
  it("should render the heading", () => {
    const textToFind = "Restaurants";

    render(<Home />);
    const heading = screen.getByText(textToFind);

    expect(heading).toBeInTheDocument();
  });
});
