import PedidoDetailPage from './PedidoDetailPage';

export function generateStaticParams() {
  return ['ord-001', 'ord-002', 'ord-003', 'ord-004', 'ord-005', 'ord-006'].map((id) => ({ id }));
}

export default function Page() {
  return <PedidoDetailPage />;
}
