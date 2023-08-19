jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));
const setState = jest.fn();

import CategoryTab from "@/components/CategoryTab";
import { render } from "@testing-library/react";
import { useState } from "react";

describe("CategoryTab", () => {
  beforeEach(() => {
    // @ts-ignore
    useState.mockImplementation((init: any) => [init, setState]);
  });

  it("should render the component", () => {
    const { container } = render(
      <CategoryTab
        category={{
          alias: "test",
          title: "test",
        }}
        selected={false}
        onClick={() => {}}
      />
    );

    expect(container).toBeInTheDocument();
  });

  it("should have a .categoryTab--selected class when the selected prop is true", () => {
    const { container } = render(
      <CategoryTab
        category={{
          alias: "test",
          title: "test",
        }}
        selected={true}
        onClick={() => {}}
      />
    );

    expect(container.querySelector(".categoryTab")).toHaveClass(
      "categoryTab--selected"
    );
  });

  it("should be selected when clicked", () => {
    const [selected, setSelected] = useState(false);

    const { container } = render(
      <CategoryTab
        category={{
          alias: "test",
          title: "test",
        }}
        selected={selected}
        onClick={() => {
          setSelected(true);
        }}
      />
    );

    const categoryTab = container.querySelector(".categoryTab");

    categoryTab?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(setSelected).toHaveBeenCalledWith(true);
  });
});
