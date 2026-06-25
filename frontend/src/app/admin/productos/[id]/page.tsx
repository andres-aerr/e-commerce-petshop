import EditarProductoPage from './EditarProductoPage';

export function generateStaticParams() {
  return ['nuevo', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'].map((id) => ({ id }));
}

export default function Page() {
  return <EditarProductoPage />;
}
