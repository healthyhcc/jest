/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import TodoList from "./index";
import { listTask } from "./request";

jest.mock("./request", () => ({
  addTask: jest.fn(),
  deleteTask: jest.fn(),
  updateTask: jest.fn(),
  listTask: jest.fn(),
}));

describe("TodoList", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  test("renders TodoList component", async () => {
    listTask.mockResolvedValueOnce([
      { id: 1, name: "Task 1" },
      { id: 2, name: "Task 2" },
      { id: 3, name: "Task 3" },
    ]);

    render(<TodoList />);

    // Add Task 是否存在于document
    expect(screen.getByText("Add Task")).toBeInTheDocument();

    expect(await screen.findByText("Task 1")).toBeInTheDocument();
    expect(await screen.findByText("Task 2")).toBeInTheDocument();
    expect(await screen.findByText("Task 3")).toBeInTheDocument();
  });

  test("adds new task", async () => {
    listTask.mockResolvedValueOnce([
      { id: 1, name: "Task 1" },
      { id: 2, name: "Task 2" },
      { id: 3, name: "Task 3" },
      { id: 3, name: "New Task" },
    ]);

    render(<TodoList />);

    const input = screen.getByTestId("inputValue");
    const addButton = screen.getByText("Add Task");
    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText("New Task")).toBeInTheDocument();
    });
  });

  test("delete task", async () => {
    listTask.mockResolvedValueOnce([
      { id: 1, name: "Task 1" },
      { id: 2, name: "Task 2" },
      { id: 3, name: "Task 3" },
    ]);

    render(<TodoList />);

    const deleteButtons = await screen.findAllByRole("button", {
      name: /Delete Task/i,
    });
    // console.log(deleteButtons.length);
    fireEvent.click(deleteButtons[2]);

    await waitFor(() => {
      expect(screen.queryByText("Task 3")).not.toBeInTheDocument();
    });
  });

  test("update task", async () => {
    listTask.mockResolvedValueOnce([
      { id: 1, name: "Task 1" },
      { id: 2, name: "Task 2" },
      { id: 3, name: "Task 3" },
      { id: 4, name: "Updated Task" },
    ]);

    render(<TodoList />);

    const updateButtons = await screen.findAllByRole("button", {
      name: /Update Task/i,
    });
    // console.log(updateButtons.length);
    fireEvent.click(updateButtons[1]);

    // 更新输入框内容并确定, find
    const input = await screen.findByTestId("inputName");
    const okButton = await screen.findByText("OK");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.change(input, { target: { value: "Updated Task" } });
      fireEvent.click(okButton);
      // 异步等待检查是否更新成功
      await waitFor(() => {
        expect(screen.getByText("Updated Task")).toBeInTheDocument();
      });
    });
  });
});
