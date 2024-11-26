export default function Layout({ children }) {
  console.log('layout', typeof window);
  return <main>{children}</main>
}