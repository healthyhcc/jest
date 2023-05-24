/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

test("clicking add button increases count by 1", () => {
  render(<Counter />);

  const addButton = screen.getByText(/add one/i);
  const countElement = screen.getByTestId("countId");

  fireEvent.click(addButton);
  expect(countElement.innerHTML).toBe("1");

  fireEvent.click(addButton);
  expect(countElement.innerHTML).toBe("2");
});
