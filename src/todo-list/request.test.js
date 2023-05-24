/**
 * @jest-environment jsdom
 */

import { taskList, addTask, deleteTask, updateTask, listTask } from "./request";

describe("测试request文件", () => {
  beforeEach(() => {
    // 每个测试用例执行前，重置 taskList 数组
    taskList.length = 0;
    taskList.push(
      { id: 1, name: "早晨起床洗漱" },
      { id: 2, name: "吃饭上午工作" },
      { id: 3, name: "吃饭午休工作" },
      { id: 4, name: "下班吃饭洗漱睡觉" }
    );
  });

  test("addTask should add a new task to the taskList", () => {
    addTask("新任务");
    expect(taskList.length).toBe(5);
    expect(taskList[4]).toEqual({ id: 5, name: "新任务" });
  });

  test("deleteTask should remove the task with given id from taskList", async () => {
    await deleteTask(2);
    expect(taskList.length).toBe(3);
    expect(taskList.map((task) => task.id)).toEqual([1, 3, 4]);
  });

  test("updateTask should update the task with given id in taskList", async () => {
    const task = { id: 3, name: "午休时间" };
    await updateTask(task);
    expect(taskList.length).toBe(4);
    expect(taskList[2]).toEqual({ id: 3, name: "午休时间" });
  });

  test("listTask should return the taskList", async () => {
    const tasks = await listTask();
    expect(tasks).toEqual(taskList);
  });
});
