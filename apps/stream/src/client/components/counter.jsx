import React, { useState } from 'react';

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
