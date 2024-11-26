import Layout from './layout';
import Html from './html';
import Counter from './components/counter';

export default function App() {
  return (
    <Html>
      <Layout>
        <Counter />
      </Layout>
    </Html>
  );
}
