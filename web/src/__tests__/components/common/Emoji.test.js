import React from "react";
import { Emoji } from "../../../components/common/Emoji";
import { render, screen } from "@testing-library/react";

describe("components/common/Emoji", () => {
  test("renders Emoji component", () => {
    const emojiCharacter = "👠";
    render(<Emoji symbol={ emojiCharacter } />);
    screen.getByText(emojiCharacter);
  });
});
