import React, { useState } from 'react'; // 클라이언트에서 반드시 import React

export default function Counter() {
  const [count, setCount] = useState(1);

  return (
    <React.Fragment>
      <button onClick={() => setCount(count + 1)} type='button'>
        Click
      </button>
      <div>{count}</div>
    </React.Fragment>
  );
}
