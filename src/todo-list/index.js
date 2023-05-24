import React, { useEffect, useState } from "react";
import { Button, Card, Space, Input, List, Typography, Modal } from "antd";
import { addTask, deleteTask, updateTask, listTask } from "./request";

const TodoList = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [value, setValue] = useState("");
  const [task, setTask] = useState();
  const [dataSource, setDataSource] = useState([]);

  const fetchTasks = async () => {
    try {
      const data = await listTask();
      setDataSource(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    await addTask(value);
    
    await fetchTasks();
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    await fetchTasks();
  };

  const handleUpdateTask = async (id, name) => {
    setTask({
      id,
      name,
    });
    setModalOpen(true);
  };

  const handleOk = async () => {
    await updateTask(task);
    await fetchTasks();
    setTask(undefined);
    setModalOpen(false);
  };

  const handleCancel = () => {
    setTask(undefined);
    setModalOpen(false);
  };
  return (
    <Card>
      <Space style={{ marginBottom: 10 }}>
        <Input
          data-testid="inputValue"
          value={value}
          onChange={(event) => setValue(event?.target?.value)}
        />
        <Button onClick={handleAddTask}>Add Task</Button>
      </Space>

      <List
        bordered
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Typography.Text mark>{item?.id}</Typography.Text> {item?.name}
              </div>

              <div>
                <Button
                  onClick={() => handleUpdateTask(item?.id, item?.name)}
                  type="primary"
                >
                  Update Task
                </Button>
                &nbsp; &nbsp;
                <Button
                  onClick={() => handleDeleteTask(item?.id)}
                  type="primary"
                  danger
                >
                  Delete Task
                </Button>
              </div>
            </div>
          </List.Item>
        )}
      />

      <Modal
        title="Update Task"
        open={modalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          data-testid="inputName"
          value={task?.name}
          onChange={(event) =>
            setTask({ id: task?.id, name: event?.target?.value })
          }
        />
      </Modal>
    </Card>
  );
};

export default TodoList;
