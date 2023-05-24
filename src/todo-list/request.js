export const taskList = [
  {
    id: 1,
    name: "早晨起床洗漱",
  },
  {
    id: 2,
    name: "吃饭上午工作",
  },
  {
    id: 3,
    name: "吃饭午休工作",
  },
  {
    id: 4,
    name: "下班吃饭洗漱睡觉",
  },
];

export const addTask = (name) => {
  return new Promise((resolve, reject) => {
    taskList.push({
      id: taskList.length + 1,
      name,
    });

    const index = taskList.findIndex((item) => item.name === name);
    if (index !== -1) {
      resolve("success");
    } else {
      reject("fail");
    }
  });
};

export const deleteTask = (id) => {
  return new Promise((resolve, reject) => {
    const index = taskList.findIndex((item) => item.id === id);
    if (index !== -1) {
      taskList.splice(index, 1);
      resolve("success");
    } else {
      reject("fail");
    }
  });
};

export const updateTask = (task) => {
  return new Promise((resolve, reject) => {
    const { id, name } = task;
    const index = taskList.findIndex((item) => item.id === id);
    if (index !== -1) {
      taskList[index] = { id, name };
      resolve("success");
    } else {
      reject("fail");
    }
  });
};

export const listTask = () => {
  return new Promise((resolve, reject) => {
    taskList ? resolve([...taskList]) : reject("fail");
  });
};
