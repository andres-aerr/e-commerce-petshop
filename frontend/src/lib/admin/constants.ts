import type { OrderStatus } from './types';

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pendiente',
  confirmed: 'Confirmado',
  preparing: 'Preparando',
  in_transit: 'En tránsito',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  preparing: 'bg-indigo-100 text-indigo-800',
  in_transit: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export const DELIVERY_STATUS_LABELS: Record<string, string> = {
  pending_assignment: 'Pendiente asignación',
  assigned: 'Asignado',
  in_transit: 'En tránsito',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
};

export const DELIVERY_STATUS_COLORS: Record<string, string> = {
  pending_assignment: 'bg-yellow-100 text-yellow-800',
  assigned: 'bg-blue-100 text-blue-800',
  in_transit: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export const PET_TYPE_LABELS: Record<string, string> = {
  dog: 'Perro',
  cat: 'Gato',
  both: 'Ambos',
};

export const CATEGORY_OPTIONS = [
  { id: 'cat-1', name: 'Perros' },
  { id: 'cat-2', name: 'Gatos' },
  { id: 'cat-3', name: 'Mascotas pequeñas' },
  { id: 'cat-4', name: 'Aves' },
];

export const SUBCATEGORY_OPTIONS: Record<string, { id: string; name: string }[]> = {
  'cat-1': [
    { id: 'subcat-1', name: 'Alimento' },
    { id: 'subcat-2', name: 'Snack' },
    { id: 'subcat-3', name: 'Juguetes' },
    { id: 'subcat-4', name: 'Accesorios' },
  ],
  'cat-2': [
    { id: 'subcat-5', name: 'Alimento' },
    { id: 'subcat-6', name: 'Snack' },
    { id: 'subcat-7', name: 'Juguetes' },
    { id: 'subcat-8', name: 'Accesorios' },
    { id: 'subcat-9', name: 'Areneros' },
  ],
  'cat-3': [
    { id: 'subcat-10', name: 'Alimento' },
    { id: 'subcat-11', name: 'Snack' },
    { id: 'subcat-12', name: 'Juguetes' },
    { id: 'subcat-13', name: 'Accesorios' },
  ],
  'cat-4': [
    { id: 'subcat-14', name: 'Alimento' },
    { id: 'subcat-15', name: 'Snack' },
    { id: 'subcat-16', name: 'Juguetes' },
    { id: 'subcat-17', name: 'Accesorios' },
  ],
};

export const COMMUNE_OPTIONS = [
  'Santiago',
  'Providencia',
  'Las Condes',
  'Vitacura',
  'Lo Barnechea',
  'Ñuñoa',
  'La Reina',
  'Macul',
  'Peñalolén',
  'La Florida',
  'Puente Alto',
  'Maipú',
  'Cerrillos',
  'Estación Central',
  'Quinta Normal',
  'Renca',
  'Independencia',
  'Conchalí',
  'Huechuraba',
  'Recoleta',
  'San Miguel',
  'Pedro Aguirre Cerda',
  'San Joaquín',
  'La Granja',
  'San Ramón',
  'El Bosque',
];
