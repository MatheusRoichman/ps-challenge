import ImageWithFallback from "@/components/lib/ImageWithFallback";
import { render } from "@testing-library/react";

describe("ImageWithFallback", () => {
  it("should render the component", () => {
    const { container } = render(
      <ImageWithFallback
        src={"https://via.placeholder.com/150"}
        alt="test image"
        fill
      />
    );

    expect(container).toBeInTheDocument();
  });
});
