import "@testing-library/jest-dom";
import { getByRole, render, screen, waitFor } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import Form from "./page";

describe("formTest", () => {
  it("renders the correct amount of errors", async () => {
    render(<Form />);
    userEvent.click(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(2);
  }),
    it("throws an error when the number of characters is greater than the max characters limit", async () => {
      render(<Form />);
      userEvent.type(screen.getByRole("textbox", { name: /name/i }), "nomelongocompossivelmentetemaisdetrintacaracteres");
      userEvent.type(screen.getByRole("textbox", { name: /image/i }), VALID_URL);
      userEvent.click(screen.getByRole("button"));

      expect(await screen.findAllByRole("alert")).toHaveLength(1);
    }),
    it("renders the 'required name' error", async () => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
    }),
    it("throws an error when the regex is not matched", async () => {
      render(<Form />);
      userEvent.type(screen.getByRole("textbox", { name: /name/i }), "Paulina Cozinha Vol.II");
      userEvent.type(screen.getByRole("textbox", { name: /image/i }), "image-that-does-not-match");
      userEvent.click(screen.getByRole("button"));

      expect(await screen.findAllByRole("alert")).toHaveLength(1);
    }),
    it("renders the 'must be a valid img' error", async () => {
      expect(screen.getByText("Must be a valid img")).toBeInTheDocument();
    });
});
