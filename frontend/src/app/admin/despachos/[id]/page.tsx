import DespachoDetailPage from './DespachoDetailPage';

export function generateStaticParams() {
  return [{ id: 'placeholder' }];
}

export default function Page() {
  return <DespachoDetailPage />;
}
