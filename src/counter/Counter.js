import React, { useState } from "react";
import { Button } from "antd";

const Counter = () => {
  const [count, setCount] = useState(0);
  const addCount = () => {
    setCount(count + 1);
  };
  return (
    <div className="container">
      <div className="box">
        <div className="count" data-testid="countId">{count}</div>

        <Button onClick={addCount} type="primary">
          Add One
        </Button>
      </div>
    </div>
  );
};

export default Counter;
