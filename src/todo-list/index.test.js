/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";
import { listTask } from "./request";
import TodoList from "./index";
import { act } from "react-test-renderer";

jest.mock("./request", () => ({
  addTask: jest.fn(),
  deleteTask: jest.fn(),
  updateTask: jest.fn(),
  listTask: jest.fn().mockResolvedValue([
    { id: 1, name: "Task 1" },
    { id: 2, name: "Task 2" },
    { id: 3, name: "Task 3" },
  ]),
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
    render(<TodoList />);

    // Add Task 是否存在于document
    expect(screen.getByText("Add Task")).toBeInTheDocument();

    expect(await screen.findByText("Task 1")).toBeInTheDocument();
    expect(await screen.findByText("Task 2")).toBeInTheDocument();
    expect(await screen.findByText("Task 3")).toBeInTheDocument();
  });

  test("adds new task", async () => {
    await act(async () => {
      render(<TodoList />);

      const input = screen.getByTestId("inputValue");
      const addButton = screen.getByText("Add Task");

      await fireEvent.change(input, { target: { value: "New Task" } });
      await fireEvent.click(addButton);

      expect(await screen.findByText("New Task")).toBeInTheDocument();


      // const data = await listTask();
      // expect(data).toEqual([
      //   { id: 1, name: "Task 1" },
      //   { id: 2, name: "Task 2" },
      //   { id: 3, name: "Task 3" },
      //   { id: 4, name: "New Task" },
      // ]);
    });
  });

  // test("delete task", async () => {
  //   render(<TodoList />);

  //   const deleteButton = screen.getByText("Delete Task");

  //   fireEvent.click(deleteButton);

  //   expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
  // });

  // test("update task", async () => {
  //   render(<TodoList />);

  //   const updateButton = screen.getByText("Update Task");
  //   fireEvent.click(updateButton);

  //   // 更新输入框内容并确定
  //   const input = screen.getByTestId("inputName");
  //   const okButton = screen.getByText("OK");

  //   fireEvent.change(input, { target: { value: "Updated Task" } });
  //   fireEvent.click(okButton);

  //   // 异步等待检查是否更新成功
  //   expect(await screen.findByText("Updated Task")).toBeInTheDocument();
  // });
});