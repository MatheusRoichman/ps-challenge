import ThreeDotsLoading from "@/components/lib/ThreeDotsLoading";
import { render } from "@testing-library/react";

describe("ThreeDotsLoading", () => {
  it("should render the component", () => {
    const { container } = render(<ThreeDotsLoading />);

    expect(container).toBeInTheDocument();
  });

  it("should have a div with the class 'dot-flashing'", () => {
    const { container } = render(<ThreeDotsLoading />);

    expect(container.querySelector(".dot-flashing")).toBeInTheDocument();
  });
});
