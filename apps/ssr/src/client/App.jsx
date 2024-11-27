import React, { useState } from 'react';

function Post() {
  return <div>post</div>;
}

function Viewer() {
  return <div>viewer</div>;
}

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <React.Fragment>
      <button onClick={() => setCount((prev) => prev + 1)}>
        123 hydration
      </button>
      <div>{count}</div>
      <Post />
      <Viewer />
      {/* <nav>
        <Link to='/'>홈으로</Link>
        <Link to='/post'>포스트로</Link>
        <Link to='/viewer'>뷰어로</Link>
      </nav>
      <Suspense fallback={<div>...loading...</div>}>
        <Routes>
          <Route path='/' element={<div>home</div>} />
          <Route path='/post' element={<Post />} />
          <Route path='/viewer' element={<Viewer />} />
        </Routes>
      </Suspense> */}
    </React.Fragment>
  );
}
