import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

function Post() {
  return <div>post</div>
}

function Viewer() {
  return <div>viewer</div>
}

export default function App() {
  return (
    <BrowserRouter>
      <nav>
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
      </Suspense>
    </BrowserRouter>
  );
}
