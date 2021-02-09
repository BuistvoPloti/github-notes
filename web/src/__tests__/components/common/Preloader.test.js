import React from "react";
import Preloader from "../../../components/common/Preloader";
import { render, screen } from "@testing-library/react";

describe("components/common/Preloader", () => {
  test("renders Preloader component", () => {
    const show = true;
    render(<Preloader show={ show } />);
    screen.getByRole("img");
  });
  test("renders Preloader as a hoc", () => {
    const show = false;
    const text = "sample";
    render(<Preloader show={ show }><p>{ text }</p></Preloader>);
    screen.getByText(text);
  });
});
